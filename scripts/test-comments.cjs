const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");

function load(file, mocks = {}) {
  const exports = {};
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText, { exports, process, FormData, require: name => Object.hasOwn(mocks, name) ? mocks[name] : require(name) });
  return exports;
}

const carId = "0123456789abcdef01234567";
const validation = load("src/lib/commentValidation.ts");
let authenticated = true;
const adminAuth = load("src/lib/adminAuth.ts", {
  "server-only": {},
  "@/lib/session": { verifySession: async () => ({ username: authenticated ? process.env.ADMIN_USERNAME : "not-the-admin" }) },
});
const auth = load("src/lib/commentAdmin.ts", {
  "server-only": {},
  "@/lib/adminAuth": adminAuth,
});
const records = [];
let carExists = true, databaseAvailable = true, dbCalls = 0;
const match = filter => records.filter(record => Object.entries(filter).every(([key, value]) => record[key] === value));
const model = {
  create: async data => records.push({ ...data, _id: "abcdef0123456789abcdef01", createdAt: "2026-10-25T12:00:00Z" }),
  countDocuments: async filter => match(filter).length,
  find(filter) {
    let skip = 0, limit = Infinity, fields;
    const query = {
      select(value) { fields = value.split(" "); return this; },
      populate() { return this; }, sort() { return this; },
      skip(value) { skip = value; return this; }, limit(value) { limit = value; return this; },
      async lean() { return match(filter).slice(skip, skip + limit).map(record => fields ? Object.fromEntries(["_id", ...fields].map(key => [key, record[key]])) : record); },
    };
    return query;
  },
  findByIdAndUpdate(id, update) {
    const record = records.find(record => record._id === id);
    if (record) record.status = update.$set.status;
    return { select() { return this; }, lean: async () => record || null };
  },
  findByIdAndDelete(id) {
    const index = records.findIndex(record => record._id === id);
    const record = index >= 0 ? records.splice(index, 1)[0] : null;
    return { select() { return this; }, lean: async () => record };
  },
};
const services = load("src/services/apiComments.ts", {
  "server-only": {},
  "@/lib/mongoose": async () => { dbCalls++; if (!databaseAvailable) throw new Error("offline"); },
  "@/models/commentModel": model,
  "@/models/carModel": { exists: async () => carExists },
  "@/lib/commentAdmin": auth,
  "@/lib/commentValidation": validation,
});
const revalidated = [];
const actions = load("src/lib/actions/comments.ts", {
  "@/services/apiComments": services,
  "@/lib/commentValidation": validation,
  "next/cache": { revalidatePath: path => revalidated.push(path) },
});
function form(values) {
  const data = new FormData();
  for (const [key, value] of Object.entries(values)) data.set(key, value);
  return data;
}

async function run() {
  const previousAdmin = process.env.ADMIN_USERNAME;
  process.env.ADMIN_USERNAME = "comments-test-admin";
  try {
    // Exercise the actual button actions without a submitter name/value in FormData.
    let dispatched, uiPending = false, confirmDelete = false;
    const Moderation = load("src/features/comments/components/CommentModeration.tsx", {
      react: { ...React, useActionState: () => [{}, data => { dispatched = data; }, uiPending], useState: () => [confirmDelete, value => { confirmDelete = value; }] },
      "@/lib/actions/comments": actions,
    }).default;
    function buttons(node, result = []) {
      if (Array.isArray(node)) node.forEach(child => buttons(child, result));
      else if (node && typeof node === "object") {
        if (node.type === "button") result.push(node);
        buttons(node.props?.children, result);
      }
      return result;
    }
    for (const current of ["pending", "approved", "rejected"]) {
      const expected = ["approved", "rejected", "pending"].filter(status => status !== current);
      const controls = buttons(Moderation({ id: carId, status: current })).filter(button => button.props.type === "submit");
      assert.equal(controls.length, expected.length);
      controls.forEach((button, index) => {
        assert.equal(typeof button.props.formAction, "function");
        button.props.formAction(new FormData());
        assert.equal(dispatched.get("id"), carId);
        assert.equal(dispatched.get("status"), expected[index]);
      });
    }
    let controls = buttons(Moderation({ id: carId, status: "pending" }));
    assert.ok(!controls.some(button => button.props.children === "بله، حذف شود"), "Deletion requires confirmation first");
    controls.find(button => button.props.type === "button").props.onClick();
    assert.equal(confirmDelete, true);
    controls = buttons(Moderation({ id: carId, status: "pending" }));
    controls.find(button => button.props.children === "بله، حذف شود").props.formAction(new FormData());
    assert.equal(dispatched.get("status"), "delete");
    assert.equal(dispatched.get("id"), carId);
    controls.find(button => button.props.children === "انصراف").props.onClick();
    assert.equal(confirmDelete, false);
    uiPending = true;
    assert.ok(buttons(Moderation({ id: carId, status: "pending" })).every(button => button.props.disabled));

    for (const fields of [{ name: " ", text: "hello" }, { name: "Amir", text: " " }, { name: "a".repeat(61), text: "hello" }, { name: "Amir", text: "x".repeat(2001) }, { name: new Blob(["bad"]), text: "hello" }]) {
      const result = await actions.submitComment(carId, {}, form(fields));
      assert.ok(result.errors);
    }
    assert.equal(dbCalls, 0, "Invalid input must not reach the database");
    assert.equal((await actions.submitComment("bad-id", {}, form({}))).success, undefined);
    await actions.submitComment(carId, {}, form({ name: "Amir", text: "hello", website: "spam.example" }));
    assert.equal(records.length, 0);
    carExists = false;
    assert.equal((await actions.submitComment(carId, {}, form({ name: "Amir", text: "hello" }))).success, undefined);
    assert.equal(records.length, 0, "Missing products cannot receive comments");
    carExists = true;
    const submitted = await actions.submitComment(carId, {}, form({ name: " Amir ", text: " <script>alert(1)</script> ", status: "approved", car: "forged-id" }));
    assert.equal(submitted.success, true);
    assert.equal(records[0].name, "Amir");
    assert.equal(records[0].status, "pending", "Public callers cannot approve their own comment");
    assert.equal(records[0].car, carId, "Public callers cannot override the selected product");
    assert.equal((await services.getProductComments(carId, 1)).count, 0);
    assert.equal((await services.getAdminComments("pending", 1)).count, 1);

    authenticated = false;
    await assert.rejects(services.getAdminComments("pending", 1));
    const rejectedAccess = await actions.moderateComment({}, form({ id: records[0]._id, status: "approved" }));
    assert.equal(rejectedAccess.success, undefined);
    assert.equal(records[0].status, "pending", "Unauthorized mutation must not reach the model");
    authenticated = true;
    assert.equal((await actions.moderateComment({}, form({ id: records[0]._id, status: "arbitrary" }))).success, undefined);
    assert.equal((await actions.moderateComment({}, form({ id: "abcdef0123456789abcdef02", status: "approved" }))).success, undefined);
    assert.equal((await actions.moderateComment({}, form({ id: records[0]._id, status: "approved" }))).success, true);
    const published = await services.getProductComments(carId, 1);
    assert.equal(published.comments.length, 1);
    assert.equal(published.comments[0].status, undefined, "Public projection exposes only display fields");
    assert.equal((await services.getProductComments("abcdef0123456789abcdef02", 1)).count, 0, "Comments belong to one product");
    assert.ok(revalidated.includes(`/products/${carId}`));

    const CommentList = load("src/features/comments/components/ProductCommentList.tsx", {
      "next/link": ({ children, ...props }) => React.createElement("a", props, children),
    }).default;
    const Comments = async ({ carId, page }) => CommentList({ carId, result: services.getProductComments(carId, page).catch(() => undefined) });
    let html = renderToStaticMarkup(await Comments({ carId, page: 1 }));
    assert.ok(html.includes("&lt;script&gt;"));
    assert.ok(!html.includes("<script>"), "Comment content must render as escaped text");
    await actions.moderateComment({}, form({ id: records[0]._id, status: "rejected" }));
    assert.equal((await services.getProductComments(carId, 1)).count, 0, "Revoking approval removes the comment from public results");
    html = renderToStaticMarkup(await Comments({ carId, page: 1 }));
    assert.ok(html.includes("این گفت‌وگو با شما شروع می‌شود"));
    for (let i = 0; i < 14; i++) records.push({ ...records[0], _id: `test-${i}`, status: "approved" });
    assert.equal((await services.getProductComments(carId, 1)).comments.length, 12);
    assert.equal((await services.getProductComments(carId, 2)).comments.length, 2);
    assert.equal((await services.getProductComments(carId, 100)).page, 2);
    assert.equal(validation.commentPage("NaN"), 1);
    assert.equal(validation.commentPage("-1"), 1);
    assert.equal(validation.commentPage("1.5"), 1);

    const deleteId = "abcdef0123456789abcdef03";
    records.push({ ...records[0], _id: deleteId, status: "approved" });
    authenticated = false;
    assert.equal((await actions.moderateComment({}, form({ id: deleteId, status: "delete" }))).success, undefined);
    assert.ok(records.some(record => record._id === deleteId), "Non-admins cannot delete comments");
    authenticated = true;
    const beforeDelete = dbCalls;
    assert.equal((await actions.moderateComment({}, form({ id: "invalid", status: "delete" }))).success, undefined);
    assert.equal(dbCalls, beforeDelete);
    revalidated.length = 0;
    const removed = await actions.moderateComment({}, form({ id: deleteId, status: "delete" }));
    assert.equal(removed.success, true);
    assert.equal(removed.message, "نظر حذف شد.");
    assert.ok(!records.some(record => record._id === deleteId));
    assert.ok(!(await services.getProductComments(carId, 1)).comments.some(record => record._id === deleteId));
    assert.deepEqual(revalidated, ["/dashboard/comments", `/products/${carId}`]);
    assert.equal((await actions.moderateComment({}, form({ id: deleteId, status: "delete" }))).success, undefined);

    databaseAvailable = false;
    assert.equal((await actions.moderateComment({}, form({ id: records[0]._id, status: "delete" }))).success, undefined);
    assert.equal((await actions.submitComment(carId, {}, form({ name: "Amir", text: "hello" }))).success, undefined);
    html = renderToStaticMarkup(await Comments({ carId, page: 1 }));
    assert.ok(html.includes("فعلاً در دسترس نیستند"));

    const Comment = load("src/models/commentModel.ts").default;
    assert.equal(new Comment({ car: carId, name: "Amir", text: "Hello world" }).status, "pending");
    assert.ok(new Comment({ car: carId, name: "a", text: "tiny", status: "other" }).validateSync());
    console.log("Comments passed: validation, pending submission, admin authorization, approval/revocation, product isolation, escaping, pagination and database failures. No live database used.");
  } finally {
    if (previousAdmin === undefined) delete process.env.ADMIN_USERNAME;
    else process.env.ADMIN_USERNAME = previousAdmin;
  }
}
run().catch(error => { console.error(error); process.exitCode = 1; });
