// Uses a temporary MongoDB directory and database; never reads the project's DATABASE variable.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const vm = require("node:vm");
const net = require("node:net");
const { spawn } = require("node:child_process");
const mongoose = require("mongoose");
const ts = require("typescript");

async function freePort() {
  return new Promise(resolve => { const server = net.createServer(); server.listen(0, "127.0.0.1", () => { const port = server.address().port; server.close(() => resolve(port)); }); });
}

async function main() {
  const binary = process.env.MONGOD_BINARY || "C:/Program Files/MongoDB/Server/8.0/bin/mongod.exe";
  if (!fs.existsSync(binary)) throw new Error("Set MONGOD_BINARY to an installed mongod executable.");
  const folder = fs.mkdtempSync(path.join(os.tmpdir(), "meshmayi-blog-test-"));
  const port = await freePort();
  const log = fs.openSync(path.join(folder, "mongod.log"), "a");
  const mongo = spawn(binary, ["--dbpath", folder, "--bind_ip", "127.0.0.1", "--port", String(port), "--quiet"], { windowsHide: true, stdio: ["ignore", log, log] });
  const uri = `mongodb://127.0.0.1:${port}/blog_isolated_test`;
  let next;
  const cleanup = async () => { next?.kill(); await mongoose.disconnect(); mongo.kill(); fs.closeSync(log); };
  try {
    for (let attempt = 0; ; attempt++) {
      try { await mongoose.connect(uri, { serverSelectionTimeoutMS: 500 }); break; }
      catch (error) { if (attempt >= 20) throw error; await new Promise(resolve => setTimeout(resolve, 250)); }
    }
    const modules = new Map();
    let voter = "real-test-browser";
    const mocks = { "server-only": {}, "@/lib/mongoose": async () => {}, "@/lib/adminAuth": { requireAdmin: async () => {} }, "@/lib/blogVisitor": { blogVisitor: async () => voter }, "next/cache": { revalidatePath() {} } };
    function load(file) {
      file = path.resolve(file);
      if (modules.has(file)) return modules.get(file);
      const exports = {}; modules.set(file, exports);
      const code = ts.transpileModule(fs.readFileSync(file, "utf8"), { compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS, esModuleInterop: true } }).outputText;
      vm.runInNewContext(code, { exports, process, Buffer, FormData, URL, console, require(name) {
        if (Object.hasOwn(mocks, name)) return mocks[name];
        if (name.startsWith("@/")) { const base = path.resolve("src", name.slice(2)); for (const ext of [".ts", ".js"]) if (fs.existsSync(base + ext)) return load(base + ext); }
        return require(name);
      } });
      return exports;
    }
    const api = load("src/services/apiBlog.ts"), voting = load("src/services/apiBlogVotes.ts"), actions = load("src/lib/actions/blog.ts");
    const Post = load("src/models/blogPostModel.ts").default, Vote = load("src/models/blogVoteModel.ts").default;
    const doc = { type: "doc", content: [{ type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "شروع یک مسیر تازه" }] }, { type: "paragraph", content: [{ type: "text", text: "شناخت جزئیات خودرو، اولین قدم برای انتخابی آگاهانه است. در این مقاله به ویژگی‌هایی می‌پردازیم که تجربهٔ رانندگی را متفاوت می‌کنند." }] }, { type: "blockquote", content: [{ type: "paragraph", content: [{ type: "text", text: "هر انتخاب خوب با یک پرسش درست شروع می‌شود." }] }] }] };
    function form(values) { const data = new FormData(); for (const [key, value] of Object.entries(values)) data.set(key, value); return data; }
    const fields = { title: "راهنمای انتخاب خودروی وارداتی", slug: "راهنمای-انتخاب-خودروی-وارداتی", summary: "پیش از انتخاب خودروی بعدی، با جزئیاتی آشنا شوید که تفاوت واقعی را در تجربهٔ رانندگی ایجاد می‌کنند.", category: "راهنمای خرید", cover: "https://zarsazan.storage.c2.liara.space/blog/integration.webp", coverAlt: "خودروی وارداتی", content: JSON.stringify(doc), status: "draft" };
    let result = await actions.saveBlog({}, form(fields));
    assert.equal(result.success, true, result.message);
    const id = result.id;
    assert.equal(await api.getPublicBlog(result.slug), null);
    result = await actions.saveBlog({}, form({ ...fields, id, version: result.updatedAt, status: "published" }));
    assert.equal(result.success, true, result.message);
    const stale = result.updatedAt;
    const saved = await actions.saveBlog({}, form({ ...fields, id, version: stale, status: "published", slug: "cannot-change", title: "نسخهٔ تازهٔ راهنمای خودرو" }));
    assert.equal(saved.slug, fields.slug);
    assert.equal((await actions.saveBlog({}, form({ ...fields, id, version: stale }))).success, undefined);
    assert.equal((await api.listBlogPosts({ q: "راهنمای", category: fields.category })).count, 1);
    const results = await Promise.all(Array.from({ length: 8 }, () => voting.writeBlogVote(id, "concurrent-voter", 5)));
    assert.ok(results.every(r => r.count === 1));
    assert.equal(await Vote.countDocuments({ post: id, voter: "concurrent-voter" }), 1);
    await voting.writeBlogVote(id, "concurrent-voter", 3);
    voter = "another-voter";
    assert.equal((await actions.rateBlog(id, 5)).average, 4);
    assert.equal((await actions.rateBlog(id, 4)).count, 2);
    await api.createBlogComment(id, "خوانندهٔ آزمایشی", "مقالهٔ مفیدی بود؛ ممنون از راهنمایی شما.");
    assert.equal((await api.getBlogComments(id)).count, 0);
    const pending = await api.getAdminBlogComments("pending", 1);
    assert.equal(pending.count, 1);
    await api.changeBlogComment(pending.comments[0]._id, "approved");
    assert.equal((await api.getBlogComments(id)).count, 1);
    await api.changeBlogComment(pending.comments[0]._id, "delete");
    assert.equal((await api.getBlogComments(id)).count, 0);
    if (!process.argv.includes("--preview")) {
      await api.removeBlogPost(id);
      assert.equal(await api.getAdminBlog(id), null);
      assert.equal((await api.listBlogPosts()).count, 0);
      console.log("Real MongoDB integration passed: CRUD, private drafts, optimistic edits, unique concurrent votes, averages, moderation, pagination filters and soft deletion. Temporary database only.");
      return;
    }
    // Fixtures exist only in this temporary database and use existing local photographs.
    await Post.updateOne({ _id: id }, { $set: { title: fields.title, cover: "/images/hero-mercedes.jpg" } });
    for (const [index, [title, category, cover]] of [["جزئیاتی که تجربهٔ رانندگی را متفاوت می‌کنند", "تجربه رانندگی", "/images/consultation-mercedes.jpg"], ["نگهداری هوشمندانه؛ همراهی طولانی‌تر", "نگهداری خودرو", "/images/demo/bmw-detail.jpg"]].entries()) {
      await Post.create({ ...fields, title, category, cover, slug: `preview-${index}`, content: doc, status: "published", publishedAt: new Date(Date.now() - (index + 1) * 86400000), readMinutes: 3 });
    }
    await api.createBlogComment(id, "امیر", "راهنمای خوبی برای شروع انتخاب خودرو بود. درباره هزینه‌های نگهداری هم بیشتر بنویسید.");
    const comment = (await api.getAdminBlogComments("pending", 1)).comments[0];
    await api.changeBlogComment(comment._id, "approved");
    next = spawn(process.execPath, ["--max-old-space-size=3072", "node_modules/next/dist/bin/next", "dev", "--port", "3100"], { windowsHide: true, stdio: "inherit", env: { ...process.env, NEXT_DIST_DIR: ".next-blog-preview", DATABASE: uri, DATABASE_PASSWORD: "", ADMIN_USERNAME: "blog-preview-admin", ADMIN_PASSWORD: "blog-preview-local-only", JWT_SECRET: "isolated-blog-preview-local-key-not-for-production", NEXT_PUBLIC_BASE_URL: "http://127.0.0.1:3100/api" } });
    console.log("Isolated blog preview: http://127.0.0.1:3100/blog (temporary database, local test admin). Ctrl+C stops it.");
    await new Promise(resolve => { next.on("exit", resolve); process.once("SIGINT", resolve); process.once("SIGTERM", resolve); });
  } finally { await cleanup(); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
