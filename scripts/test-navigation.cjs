const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");
const exportsObject = {};
vm.runInNewContext(
  ts.transpileModule(fs.readFileSync("src/lib/navigation.ts", "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText,
  { exports: exportsObject },
);
const { getActiveSection } = exportsObject;
assert.equal(getActiveSection([], 200), null);
assert.equal(
  getActiveSection(
    [
      { id: "home", top: 100 },
      { id: "products", top: 800 },
    ],
    200,
  ),
  "home",
);
assert.equal(
  getActiveSection(
    [
      { id: "home", top: -500 },
      { id: "products", top: 200 },
    ],
    200,
  ),
  "products",
);
assert.equal(
  getActiveSection(
    [
      { id: "products", top: -300 },
      { id: "about-us", top: 220 },
    ],
    200,
  ),
  "products",
);
assert.equal(
  getActiveSection(
    [
      { id: "contact-us", top: -500 },
      { id: "faq", top: -100 },
    ],
    200,
  ),
  "faq",
);
console.log(
  "Navigation: initial section, header boundary, section gaps and final section passed.",
);
