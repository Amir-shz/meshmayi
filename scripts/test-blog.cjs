const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const cache = new Map();
const mocks = { "server-only": {} };
function load(file) {
  file = path.resolve(file);
  if (cache.has(file)) return cache.get(file);
  const exports = {};
  cache.set(file, exports);
  const code = ts.transpileModule(fs.readFileSync(file, "utf8"), { compilerOptions: { target: ts.ScriptTarget.ES2017, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
  vm.runInNewContext(code, { exports, process, Buffer, FormData, File, URL, Request, Response, TextEncoder, TextDecoder, console, require(name) {
    if (Object.hasOwn(mocks, name)) return mocks[name];
    if (name.startsWith("@/")) {
      const base = path.resolve("src", name.slice(2));
      for (const ext of [".ts", ".tsx", ".js"]) if (fs.existsSync(base + ext)) return load(base + ext);
    }
    return require(name);
  } });
  return exports;
}
let admin = true, online = true, dbCalls = 0, sequence = 0, tick = Date.now();
const tables = {};
function matches(record, filter) {
  return Object.entries(filter).every(([key, value]) => {
    if (value === null) return record[key] == null;
    if (value && typeof value === "object" && "$in" in value) return value.$in.some(v => String(v) === String(record[key]));
    if (value && typeof value === "object" && "$regex" in value) return new RegExp(value.$regex, value.$options).test(record[key]);
    if (Object.prototype.toString.call(value) === "[object Date]") return new Date(record[key]).getTime() === value.getTime();
    return String(record[key]) === String(value);
  });
}
function collection(name) {
  const rows = tables[name] = [];
  function query(value) {
    let skip = 0, limit = Infinity, populate;
    return {
      select() { return this; }, sort() { if (Array.isArray(value)) value.reverse(); return this; },
      skip(n) { skip = n; return this; }, limit(n) { limit = n; return this; },
      populate(options) { populate = options; return this; },
      async lean() {
        let result = Array.isArray(value) ? value.slice(skip, skip + limit) : value;
        if (populate && Array.isArray(result)) result = result.map(row => ({ ...row, post: tables.posts.find(p => p._id === row.post) ?? null }));
        return result == null ? null : structuredClone(result);
      },
    };
  }
  function duplicate() { return Object.assign(new Error("duplicate"), { code: 11000 }); }
  function checkUnique(data, except) {
    if (name === "posts" && rows.some(r => r !== except && r.slug === data.slug)) throw duplicate();
    if (name === "votes" && rows.some(r => r !== except && r.post === data.post && r.voter === data.voter)) throw duplicate();
  }
  return {
    async init() {},
    async create(data) { checkUnique(data); const stamp = new Date(++tick); const row = { _id: (++sequence).toString(16).padStart(24, "0"), status: "pending", deletedAt: null, createdAt: stamp, updatedAt: stamp, ...data }; rows.push(row); return structuredClone(row); },
    async exists(filter) { return rows.find(r => matches(r, filter)) ? { _id: "exists" } : null; },
    async countDocuments(filter) { return rows.filter(r => matches(r, filter)).length; },
    async distinct(key, filter) { return [...new Set(rows.filter(r => matches(r, filter)).map(r => r[key]))]; },
    find(filter) { return query(rows.filter(r => matches(r, filter))); },
    findOne(filter) { return query(rows.find(r => matches(r, filter)) ?? null); },
    findById(id) { return query(rows.find(r => r._id === String(id)) ?? null); },
    findByIdAndUpdate(id, update, options) { return this.findOneAndUpdate({ _id: id }, update, options); },
    findByIdAndDelete(id) { const index = rows.findIndex(r => r._id === id); return query(index < 0 ? null : rows.splice(index, 1)[0]); },
    findOneAndUpdate(filter, update, options = {}) {
      let row = rows.find(r => matches(r, filter));
      if (!row && options.upsert) { row = { ...filter, ...update.$setOnInsert, count: 0 }; rows.push(row); }
      if (!row) return query(null);
      checkUnique({ ...row, ...update.$set }, row);
      Object.assign(row, update.$set);
      for (const [key, value] of Object.entries(update.$inc ?? {})) row[key] = (row[key] || 0) + value;
      row.updatedAt = new Date(++tick);
      return query(row);
    },
    async updateOne(filter, update, options = {}) {
      let row = rows.find(r => matches(r, filter));
      if (!row && options.upsert) { row = { ...filter }; checkUnique(row); rows.push(row); }
      if (row) Object.assign(row, update.$set);
    },
    async aggregate(pipeline) { const records = rows.filter(r => matches(r, pipeline[0].$match)); return records.length ? [{ count: records.length, average: records.reduce((sum, r) => sum + r.rating, 0) / records.length }] : []; },
  };
}
for (const [module, table] of [["blogPostModel", "posts"], ["blogCommentModel", "comments"], ["blogVoteModel", "votes"], ["blogRateLimitModel", "limits"]]) mocks[`@/models/${module}`] = collection(table);
mocks["@/lib/mongoose"] = async () => { dbCalls++; if (!online) throw new Error("offline"); };
mocks["@/lib/adminAuth"] = { requireAdmin: async () => { if (!admin) throw new Error("unauthorized"); } };
let voter = "browser-a";
mocks["@/lib/blogVisitor"] = { blogVisitor: async () => voter };
const revalidated = [];
mocks["next/cache"] = { revalidatePath: value => revalidated.push(value) };
mocks["next/image"] = ({ priority, fill, ...props }) => React.createElement("img", props);

const content = load("src/lib/blogContent.ts");
const validation = load("src/lib/blogValidation.ts");
const api = load("src/services/apiBlog.ts");
const votes = load("src/services/apiBlogVotes.ts");
const actions = load("src/lib/actions/blog.ts");
const imageUrl = "https://zarsazan.storage.c2.liara.space/blog/test.webp";
const doc = { type: "doc", content: [
  { type: "heading", attrs: { level: 2, textAlign: "center", dir: "rtl" }, content: [{ type: "text", text: "عنوان نمونه", marks: [{ type: "bold" }] }] },
  { type: "paragraph", content: [{ type: "text", text: "این یک مقالهٔ کامل درباره خودرو است. <script>alert(1)</script>", marks: [{ type: "textStyle", attrs: { color: "#701c1c", fontSize: "20px", fontFamily: "Tahoma" } }, { type: "link", attrs: { href: "https://example.com" } }, { type: "highlight", attrs: { color: "#ffeebb" } }] }] },
  { type: "image", attrs: { src: imageUrl, alt: "خودرو", caption: "کپشن تصویر", width: 600, align: "right" } },
  { type: "table", content: [{ type: "tableRow", content: [{ type: "tableHeader", content: [{ type: "paragraph", content: [{ type: "text", text: "مدل" }] }] }, { type: "tableCell", content: [{ type: "paragraph", content: [{ type: "text", text: "۲۰۲۶" }] }] }] }] },
] };
function form(values) { const data = new FormData(); for (const [key, value] of Object.entries(values)) data.set(key, value); return data; }
function postForm(overrides = {}) { return form({ title: "راهنمای انتخاب خودرو", slug: "راهنمای-خودرو", summary: "نگاهی دقیق به انتخاب خودروهای وارداتی", category: "راهنما", cover: imageUrl, coverAlt: "خودرو در جاده", content: JSON.stringify(doc), status: "draft", ...overrides }); }
function invalidDocument(change) { const value = structuredClone(doc); change(value); assert.throws(() => content.validateBlogContent(value)); }

async function run() {
  assert.equal(content.blogSlug("  راهنمای  خرید خودرو! "), "راهنمای-خرید-خودرو");
  for (const url of ["javascript:alert(1)", "data:text/html,x", "//evil.test", "https://a.test/\njavascript:x"]) assert.equal(content.safeBlogLink(url), false);
  for (const url of ["https://evil.test/blog/a.jpg", "data:image/png;base64,a", "https://zarsazan.storage.c2.liara.space/other/x.jpg"]) assert.equal(content.safeBlogImage(url), false);
  invalidDocument(d => { d.content[0].type = "script"; });
  invalidDocument(d => { d.content[1].content[0].marks[1].attrs.href = "javascript:alert(1)"; });
  invalidDocument(d => { d.content[1].content[0].marks[0].attrs.fontSize = "9999px"; });
  invalidDocument(d => { d.content[2].attrs.src = "https://evil.test/a.jpg"; });
  invalidDocument(d => { d.content[2].attrs.uploadId = "unfinished"; });
  invalidDocument(d => { d.content[0].attrs.level = 1; });
  invalidDocument(d => { d.content[0].content = [{ type: "table" }]; });
  assert.deepEqual(JSON.parse(JSON.stringify(content.validateBlogContent(content.validateBlogContent(doc)))), JSON.parse(JSON.stringify(content.validateBlogContent(doc))), "JSON round trips retain styles, image attributes and tables");
  const schema = require("@tiptap/core").getSchema(load("src/lib/blogEditorExtensions.ts").blogEditorExtensions());
  const editorDoc = schema.nodeFromJSON(content.validateBlogContent(doc));
  editorDoc.check();
  assert.equal(content.blogText(content.validateBlogContent(editorDoc.toJSON())).includes("مقالهٔ کامل"), true, "Saved content can reopen in the actual editor schema");
  const Body = load("src/features/blog/components/BlogContent.tsx").default;
  const html = renderToStaticMarkup(React.createElement(Body, { content: doc }));
  for (const expected of ["&lt;script&gt;", "کپشن تصویر", "<table", "heading-1", "600px", "font-size:20px", "font-family:Tahoma", "#701c1c"]) assert.ok(html.includes(expected), expected);
  assert.ok(!html.includes("<script>"));
  assert.throws(() => validation.parseBlogForm(postForm({ status: "published", cover: "" })));
  assert.throws(() => validation.parseBlogForm(postForm({ content: "invalid" })));
  assert.equal(validation.parseBlogForm(postForm({ slug: "manual-address" })).slug, content.blogSlug("راهنمای انتخاب خودرو"), "Submitted slugs cannot override the title-derived address");

  admin = false;
  const before = dbCalls;
  await assert.rejects(actions.saveBlog({}, postForm()));
  await assert.rejects(api.listBlogPosts({ admin: true }));
  assert.equal(dbCalls, before, "Admin authorization precedes database access");
  admin = true;
  let saved = await actions.saveBlog({}, postForm());
  assert.equal(saved.success, true);
  const id = saved.id;
  assert.equal(await api.getPublicBlog(saved.slug), null, "Drafts are private");
  assert.equal((await api.listBlogPosts()).count, 0);
  assert.equal((await api.getAdminBlog(id)).title, "راهنمای انتخاب خودرو");
  assert.equal((await actions.rateBlog(id, 5)).success, undefined, "Drafts cannot be rated");
  assert.equal((await actions.submitBlogComment(id, {}, form({ name: "Amir", text: "دیدگاه نمونه" }))).success, undefined);

  saved = await actions.saveBlog({}, postForm({ id, version: saved.updatedAt, status: "published" }));
  assert.equal(saved.success, true);
  const slug = saved.slug;
  assert.ok((await api.getPublicBlog(slug)).publishedAt);
  assert.equal((await api.listBlogPosts({ q: "انتخاب", category: "راهنما" })).count, 1);
  assert.equal((await api.listBlogPosts({ q: ".*" })).count, 0, "Search treats regex metacharacters literally");
  const staleVersion = saved.updatedAt;
  saved = await actions.saveBlog({}, postForm({ id, version: saved.updatedAt, status: "published", slug: "changed-slug", title: "عنوان تازهٔ مقاله" }));
  assert.equal(saved.slug, slug, "Published URLs cannot change");
  assert.equal((await actions.saveBlog({}, postForm({ id, version: staleVersion }))).success, undefined, "Stale edits cannot overwrite newer content");
  assert.equal((await api.getPublicBlog(slug)).title, "عنوان تازهٔ مقاله");

  assert.equal((await actions.rateBlog(id, 0)).success, undefined);
  assert.equal((await actions.rateBlog(id, 2.5)).success, undefined);
  let rating = await actions.rateBlog(id, 5);
  assert.equal(rating.count, 1); assert.equal(rating.average, 5);
  rating = await actions.rateBlog(id, 3);
  assert.equal(rating.count, 1); assert.equal(rating.average, 3, "Updating a vote does not add another vote");
  voter = "browser-b";
  rating = await actions.rateBlog(id, 5);
  assert.equal(rating.count, 2); assert.equal(rating.average, 4);
  await Promise.all(Array.from({ length: 6 }, () => votes.writeBlogVote(id, "parallel-browser", 4)));
  assert.equal((await votes.blogRatingSummary(id)).count, 3, "Concurrent votes share a unique browser/article key");
  for (let i = 0; i < 10; i++) await votes.blogRateLimit("limit-browser", "test");
  await assert.rejects(votes.blogRateLimit("limit-browser", "test"));

  assert.ok((await actions.submitBlogComment(id, {}, form({ name: "x", text: "a" }))).errors);
  assert.equal((await actions.submitBlogComment(id, {}, form({ name: "Amir", text: "این مقاله خوب بود", status: "approved", website: "bot" }))).success, undefined);
  assert.equal((await actions.submitBlogComment(id, {}, form({ name: "Amir", text: "این مقاله خوب بود", status: "approved" }))).success, true);
  const comment = tables.comments[0];
  assert.equal(comment.status, "pending");
  assert.equal((await api.getBlogComments(id)).count, 0);
  admin = false;
  await assert.rejects(actions.moderateBlogComment({}, form({ id: comment._id, status: "approved" })));
  admin = true;
  assert.equal((await actions.moderateBlogComment({}, form({ id: comment._id, status: "approved" }))).success, true);
  assert.equal((await api.getBlogComments(id)).count, 1);
  assert.equal((await actions.moderateBlogComment({}, form({ id: comment._id, status: "rejected" }))).success, true);
  assert.equal((await api.getBlogComments(id)).count, 0);
  assert.equal((await actions.moderateBlogComment({}, form({ id: comment._id, status: "delete" }))).success, true);
  assert.equal(tables.comments.length, 0);

  const second = await actions.saveBlog({}, postForm());
  assert.notEqual(second.slug, slug, "Duplicate title-derived slugs are resolved");
  const repeated = await actions.saveBlog({}, postForm({ id: second.id, version: second.updatedAt }));
  assert.equal(repeated.slug, second.slug, "Resaving a draft preserves its unique generated suffix");
  const renamed = await actions.saveBlog({}, postForm({ id: second.id, version: repeated.updatedAt, title: "راهنمای انتخاب خودرو!" }));
  assert.equal(renamed.success, true, "Draft title changes also resolve generated URL collisions");
  assert.notEqual(renamed.slug, slug);
  saved = await actions.saveBlog({}, postForm({ id, version: saved.updatedAt, status: "draft" }));
  assert.equal(saved.success, true);
  assert.equal(await api.getPublicBlog(slug), null, "Unpublishing removes public access");
  assert.equal((await actions.rateBlog(id, 5)).success, undefined);
  admin = false;
  await assert.rejects(actions.deleteBlog({}, form({ id })));
  admin = true;
  assert.equal((await actions.deleteBlog({}, form({ id }))).success, true);
  assert.equal(await api.getAdminBlog(id), null);
  assert.equal(await api.getPublicBlog(slug), null);
  assert.equal((await api.getBlogComments(id)).count, 0);
  assert.ok(tables.posts.find(p => p._id === id).deletedAt);
  assert.ok(revalidated.includes("/") && revalidated.includes("/blog") && revalidated.includes("/sitemap.xml"));
  online = false;
  const failed = await actions.saveBlog({}, postForm({ title: "بدون اتصال" }));
  assert.equal(failed.success, undefined); assert.ok(!failed.message.includes("offline"));
  online = true;

  let storageFailure, uploadedImage;
  mocks["aws-sdk"] = { S3: class { putObject(params) { uploadedImage = params; return { promise: async () => { if (storageFailure) throw storageFailure; return {}; } }; } } };
  const { prepareBlogImage, uploadBlogImage } = load("src/services/blogImageUpload.ts");
  const sharp = require("sharp");
  const png = await sharp({ create: { width: 40, height: 30, channels: 3, background: "red" } }).png().toBuffer();
  assert.equal((await sharp(await prepareBlogImage(png)).metadata()).format, "webp");
  await assert.rejects(prepareBlogImage(Buffer.alloc(5 * 1024 * 1024 + 1)));
  await assert.rejects(prepareBlogImage(Buffer.from("not an image")));
  await assert.rejects(prepareBlogImage(Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"></svg>')));

  const storageKeys = ["LIARA_ACCESS_KEY", "LIARA_SECRET_KEY", "LIARA_ENDPOINT", "LIARA_BUCKET_NAME"];
  const originalStorage = Object.fromEntries(storageKeys.map(key => [key, process.env[key]]));
  for (const key of storageKeys) process.env[key] = "isolated-test-value";
  assert.match(await uploadBlogImage(png), /^https:\/\/zarsazan\.storage\.c2\.liara\.space\/blog\/.+\.webp$/);
  assert.equal(uploadedImage.ContentType, "image/webp");
  storageFailure = Object.assign(new Error("private provider details"), { code: "TimeoutError", originalError: { code: "ECONNRESET" } });
  await assert.rejects(uploadBlogImage(png), error => error.status === 503 && error.message.includes("ارتباط سرور") && !error.message.includes("private"));
  storageFailure = { code: "AccessDenied", statusCode: 403 };
  await assert.rejects(uploadBlogImage(png), error => error.status === 502 && error.message.includes("اجازهٔ آپلود"));
  delete process.env.LIARA_SECRET_KEY;
  await assert.rejects(uploadBlogImage(png), error => error.status === 500 && error.message.includes("تنظیمات"));
  for (const key of storageKeys) { if (originalStorage[key] === undefined) delete process.env[key]; else process.env[key] = originalStorage[key]; }

  let uploads = 0, uploadFailure;
  mocks["@/services/blogImageUpload"] = { uploadBlogImage: async () => { uploads++; if (uploadFailure) throw uploadFailure; return imageUrl; } };
  const route = load("src/app/api/blog/images/route.ts");
  function uploadRequest(origin = "http://localhost:3000") {
    const data = new FormData(); data.set("image", new File([png], "test.png", { type: "image/png" }));
    return new Request("http://localhost:3000/api/blog/images", { method: "POST", headers: { origin, host: "localhost:3000" }, body: data });
  }
  admin = false;
  assert.equal((await route.POST(uploadRequest())).status, 401);
  admin = true;
  assert.equal((await route.POST(uploadRequest("https://evil.test"))).status, 403);
  assert.equal((await route.POST(uploadRequest("malformed"))).status, 403);
  assert.equal(uploads, 0);
  assert.equal((await route.POST(uploadRequest())).status, 200);
  assert.equal(uploads, 1);
  uploadFailure = new (load("src/lib/blogErrors.ts").BlogError)("ارتباط سرور با لیارا برقرار نشد.", 503);
  const unavailableUpload = await route.POST(uploadRequest());
  assert.equal(unavailableUpload.status, 503);
  assert.match((await unavailableUpload.json()).message, /لیارا/);
  uploadFailure = undefined;
  const tooLarge = new Request("http://localhost:3000/api/blog/images", { method: "POST", headers: { origin: "http://localhost:3000", host: "localhost:3000", "content-type": "multipart/form-data; boundary=test" }, body: Buffer.alloc(6 * 1024 * 1024) });
  assert.equal((await route.POST(tooLarge)).status, 400, "Oversized bodies are rejected even without Content-Length");
  assert.equal(uploads, 2);

  const previousSecret = process.env.JWT_SECRET;
  process.env.JWT_SECRET = "isolated-blog-test-secret-do-not-use-in-production";
  const jar = new Map(); let cookieOptions;
  mocks["next/headers"] = { cookies: async () => ({ get: key => jar.has(key) ? { value: jar.get(key) } : undefined, set: (key, value, options) => { jar.set(key, value); cookieOptions = options; } }) };
  const visitor = load("src/lib/blogVisitor.ts");
  await assert.rejects(visitor.blogVisitor(true), /کوکی/);
  const firstVoter = await visitor.blogVisitor();
  assert.equal(await visitor.blogVisitor(true), firstVoter);
  assert.equal(await visitor.blogVisitor(), firstVoter);
  assert.equal(cookieOptions.httpOnly, true); assert.equal(cookieOptions.sameSite, "lax");
  const { payload } = await require("jose").jwtVerify(jar.get("blog-voter"), new TextEncoder().encode(process.env.JWT_SECRET), { audience: "blog-voter" });
  assert.equal(payload.username, undefined, "Anonymous voter tokens do not grant admin access");
  jar.set("blog-voter", "forged-token");
  assert.notEqual(await visitor.blogVisitor(), firstVoter);
  if (previousSecret === undefined) delete process.env.JWT_SECRET; else process.env.JWT_SECRET = previousSecret;
  console.log("Blog checks passed: CRUD, drafts, immutable URLs, stale edits, content safety/rendering, comments, voting, concurrency, rate limits and real image decoding. No live database used.");
}
run().catch(error => { console.error(error); process.exitCode = 1; });
