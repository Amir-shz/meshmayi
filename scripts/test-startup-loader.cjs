const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");

// Run the actual component effects against a deterministic browser clock.
function mount({
  seen = false,
  reduced = false,
  loaded = true,
  preview = false,
} = {}) {
  let phase = "visible",
    effects = [],
    previous = [],
    stableCallback;
  let id = 0;
  const timers = new Map(),
    listeners = new Map();
  const shell = { inert: false };
  const style = { overflow: "auto" };
  const hooks = {
    useState: () => [
      phase,
      (value) => {
        phase = value;
      },
    ],
    useCallback: (callback) => (stableCallback ??= callback),
    useEffect: (run, deps) => effects.push({ run, deps }),
  };
  const exports = {};
  vm.runInNewContext(
    ts.transpileModule(
      fs.readFileSync("src/components/website/StartupLoader.tsx", "utf8"),
      {
        compilerOptions: {
          module: ts.ModuleKind.CommonJS,
          jsx: ts.JsxEmit.ReactJSX,
          esModuleInterop: true,
        },
      },
    ).outputText,
    {
      exports,
      require: (name) =>
        name === "react"
          ? hooks
          : name === "next/image"
            ? () => null
            : require(name),
      sessionStorage: {
        getItem: () => (seen ? "1" : null),
        setItem: () => {
          seen = true;
        },
      },
      window: {
        location: { search: preview ? "?intro=preview" : "" },
        matchMedia: () => ({ matches: reduced }),
        addEventListener: (name, callback) => listeners.set(name, callback),
        removeEventListener: (name) => listeners.delete(name),
      },
      document: {
        readyState: loaded ? "complete" : "loading",
        querySelector: () => shell,
        documentElement: { style },
      },
      performance: { now: () => 0 },
      URLSearchParams,
      setTimeout: (callback, delay) => {
        timers.set(++id, { callback, delay });
        return id;
      },
      clearTimeout: (timer) => timers.delete(timer),
    },
  );
  function render() {
    const before = phase;
    effects = [];
    exports.default();
    previous = effects.map((effect, i) => {
      const old = previous[i];
      if (
        old &&
        effect.deps.length === old.deps.length &&
        effect.deps.every((dep, j) => Object.is(dep, old.deps[j]))
      )
        return old;
      old?.cleanup?.();
      return { ...effect, cleanup: effect.run() };
    });
    if (before !== phase) render();
  }
  render();
  return {
    get phase() {
      return phase;
    },
    timers,
    shell,
    style,
    listeners,
    skip() {
      stableCallback();
      render();
    },
    fire(delay) {
      const timer = [...timers].find(([, value]) => value.delay === delay);
      assert.ok(timer, "Expected a timer at " + delay);
      timers.delete(timer[0]);
      timer[1].callback();
      render();
    },
  };
}

const intro = mount();
assert.equal(intro.shell.inert, true);
intro.fire(1800);
assert.equal(intro.phase, "leaving");
assert.ok(
  ![...intro.timers.values()].some((timer) => timer.delay === 2800),
  "Ready completion must cancel the deadline so the intro cannot reopen",
);
intro.fire(420);
assert.equal(intro.phase, "hidden");
assert.equal(intro.shell.inert, false);
assert.equal(intro.style.overflow, "auto");
assert.equal(intro.timers.size, 0);
const repeat = mount({ seen: true });
assert.equal(repeat.phase, "hidden");
assert.equal(repeat.shell.inert, false);
assert.equal(repeat.timers.size, 0);
const reduced = mount({ reduced: true });
reduced.fire(350);
assert.equal(reduced.phase, "hidden");
assert.equal(reduced.timers.size, 0);
const slow = mount({ loaded: false });
slow.fire(2800);
slow.fire(420);
assert.equal(slow.phase, "hidden");
assert.equal(slow.listeners.size, 0);
const review = mount({ seen: true, preview: true });
assert.equal(review.phase, "visible");
assert.equal(review.timers.size, 0);
review.skip();
review.fire(420);
assert.equal(review.phase, "hidden");
console.log(
  "Startup intro: first visit, repeat visit, deadline, reduced motion and scroll/focus cleanup passed.",
);
