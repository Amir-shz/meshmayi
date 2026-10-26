const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");

const source = ts.transpileModule(fs.readFileSync("src/lib/mongoose.js", "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
}).outputText;

async function main() {
  let attempts = 0, rejectFirst;
  const connection = { connection: { readyState: 1 } };
  const exports = {};
  const connect = () => {
    attempts++;
    return attempts === 1 ? new Promise((_resolve, reject) => { rejectFirst = reject; }) : Promise.resolve(connection);
  };
  vm.runInNewContext(source, {
    exports, global: {}, process: { env: { DATABASE: "mongodb://127.0.0.1:27017/isolated_test" } },
    console: { log() {} }, require: () => ({ connect }),
  });
  const first = exports.default(), concurrent = exports.default();
  assert.equal(attempts, 1, "Concurrent requests share one connection attempt");
  const results = Promise.allSettled([first, concurrent]);
  rejectFirst(new Error("offline"));
  assert.ok((await results).every(result => result.status === "rejected"));
  assert.equal(await exports.default(), connection, "A failed connection can be retried");
  assert.equal(await exports.default(), connection, "A successful connection is cached");
  assert.equal(attempts, 2);
  console.log("Database connection: failed attempt, concurrent requests, retry and successful cache passed. No database writes.");
}
main().catch(error => { console.error(error); process.exitCode = 1; });
