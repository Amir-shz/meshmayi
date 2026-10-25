const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");

function loadComponent(file, mocks) {
  const compiled = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
  }).outputText;
  const exports = {};
  vm.runInNewContext(compiled, {
    exports,
    require: (name) =>
      Object.hasOwn(mocks, name) ? mocks[name] : require(name),
    console: { error() {} },
  });
  return exports.default;
}

const Link = ({ children, ...props }) =>
  React.createElement("a", props, children);
const car = {
  _id: "0123456789abcdef01234567",
  name: "خودروی آزمایشی",
  model: 2025,
  price: 0,
  pictures: [],
  labels: [],
  options: [],
};

async function run() {
  for (const scenario of ["populated", "empty", "failed"]) {
    const Products = loadComponent(
      "src/features/home/components/ProductsSection.tsx",
      {
        "next/link": Link,
        "@/services/apiCars": {
          getHomeCars: async () => {
            if (scenario === "failed") throw new Error("database unavailable");
            return scenario === "populated" ? [car] : [];
          },
        },
        "./HomeCarCard": ({ car }) =>
          React.createElement("a", { href: "/products/" + car._id }, car.name),
      },
    );
    const html = renderToStaticMarkup(await Products());
    assert.match(html, /id="products"/);
    if (scenario === "populated") {
      assert.ok(html.includes(car.name));
      assert.ok(html.includes("/products/" + car._id));
      assert.ok(!html.includes("منتظر انتخاب‌های تازه"));
    } else {
      assert.ok(
        html.includes(
          scenario === "failed"
            ? "موقتاً در دسترس نیست"
            : "منتظر انتخاب‌های تازه",
        ),
      );
      assert.ok(html.includes('href="#contact-us"'));
    }
  }
  const Card = loadComponent("src/features/home/components/HomeCarCard.tsx", {
    "next/link": Link,
    "next/image": () => null,
  });
  const html = renderToStaticMarkup(React.createElement(Card, { car }));
  assert.ok(html.includes("تماس برای قیمت"));
  assert.ok(html.includes("/products/" + car._id));
  assert.ok(html.includes(car.name));
  console.log(
    "Homepage: populated, empty, failed and missing-photo/price scenarios passed. No database writes.",
  );
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
