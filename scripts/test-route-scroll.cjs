const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
let pathname = '/products';
const refs = [];
let cursor = 0;
let effects = [];
const listeners = new Map();
const scrolls = [];
const browser = {
  location: { pathname, hash: '' },
  addEventListener: (event, listener) => listeners.set(event, listener),
  removeEventListener: (event, listener) => { if (listeners.get(event) === listener) listeners.delete(event); },
  scrollTo: options => scrolls.push(options),
};
const exportsObject = {};
const source = ts.transpileModule(fs.readFileSync('src/components/website/RouteScrollReset.tsx', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
vm.runInNewContext(source, { exports: exportsObject, window: browser, require: name => {
  if (name === 'next/navigation') return { usePathname: () => pathname };
  if (name === 'react') return {
    useRef: initial => { const index = cursor++; return refs[index] ?? (refs[index] = { current: initial }); },
    useEffect: (effect, dependencies) => effects.push({ effect, dependencies }),
  };
  throw new Error(name);
} });
function render(nextPath, hash = '', pop = false) {
  browser.location = { pathname: nextPath, hash };
  if (pop) listeners.get('popstate')();
  pathname = nextPath;
  cursor = 0;
  effects = [];
  exportsObject.default();
  return effects;
}
let initial = render(pathname);
const cleanup = initial[0].effect();
initial[1].effect();
assert.equal(scrolls.length, 0, 'Initial loads keep native restoration');
render('/products/car')[1].effect();
assert.equal(scrolls.length, 1);
assert.equal(scrolls[0].top, 0);
assert.equal(scrolls[0].behavior, 'instant', 'Route reset must bypass global smooth scrolling');
render('/', '#contact-us')[1].effect();
assert.equal(scrolls.length, 1, 'Cross-page anchors keep their target');
render('/', '#products')[1].effect();
assert.equal(scrolls.length, 1, 'Same-page anchors and query changes do not reset scroll');
render('/products/car', '', true)[1].effect();
assert.equal(scrolls.length, 1, 'Back and forward retain native restoration');
render('/blog')[1].effect();
assert.equal(scrolls.length, 2, 'A normal link after history navigation resets again');
render('/blog', '', true)[1].effect();
render('/products')[1].effect();
assert.equal(scrolls.length, 3, 'Same-path history must not suppress the next route reset');
cleanup();
assert.equal(listeners.size, 0);
console.log('Route scroll passed: top reset, instant behavior, anchors, query changes, history restoration and cleanup.');
