const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const cache = new Map();
function load(file) {
  if (cache.has(file)) return cache.get(file);
  const exports = {};
  cache.set(file, exports);
  const source = fs.readFileSync(file, 'utf8');
  const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
  vm.runInNewContext(output, { exports, require(name) {
    if (name.endsWith('.css')) return {};
    if (name === 'next/link') return { __esModule: true, default: ({children, ...props}) => React.createElement('a', props, children) };
    if (name.startsWith('@/') || name.startsWith('.')) {
      const base = name.startsWith('@/') ? path.join('src', name.slice(2)) : path.join(path.dirname(file), name);
      const target = ['.tsx', '.ts'].map(ext => base + ext).find(candidate => fs.existsSync(candidate));
      return load(target);
    }
    return require(name);
  } });
  return exports;
}
function render(file) { return renderToStaticMarkup(React.createElement(load(file).default)); }
const home = render('src/features/home/components/HomeProductsLoading.tsx');
const catalog = render('src/app/(website)/products/loading.tsx');
const blog = render('src/app/(website)/blog/loading.tsx');
const homeBlog = render('src/features/blog/components/HomeBlogLoading.tsx');
const article = render('src/app/(website)/blog/[slug]/loading.tsx');
assert.equal((blog.match(/class="blog-card(?: blog-featured)?"/g) || []).length, 9);
assert.equal((homeBlog.match(/class="blog-card"/g) || []).length, 3);
assert.ok(blog.includes('blog-index') && blog.includes('blog-masthead'));
assert.ok(homeBlog.includes('id="journal"') && homeBlog.includes('همه مقاله‌ها'));
assert.ok(article.includes('blog-article-cover') && article.includes('blog-toc') && article.includes('comments-layout'));
for (const html of [blog, homeBlog, article]) {
  assert.ok(html.includes('aria-busy="true"'));
  assert.ok(!/<(?:button|input|select|textarea)\b/.test(html), 'Blog loading placeholders must not accept input');
}
assert.equal((home.match(/class="vehicle-card"/g) || []).length, 4);
assert.equal((catalog.match(/class="vehicle-card"/g) || []).length, 8);
assert.ok(home.includes('همه خودروها') && home.includes('id="products"'));
for (const file of [
  'src/app/(website)/products/loading.tsx',
  'src/app/(website)/products/[id]/loading.tsx',
  'src/app/(dashboard)/dashboard/cars/loading.tsx',
  'src/app/(dashboard)/dashboard/cars/[id]/loading.tsx',
  'src/app/(dashboard)/dashboard/cars/new/loading.tsx',
  'src/app/(dashboard)/dashboard/comments/loading.tsx',
]) {
  const html = render(file);
  assert.ok(html.includes('aria-busy="true"'), file);
  assert.ok(!/class="(?:spinner|loaderDot)/.test(html), file);
  assert.ok(!/<(?:button|input|textarea)\b/.test(html), 'Loading placeholders must not accept input: ' + file);
}
const product = render('src/app/(website)/products/[id]/loading.tsx');
for (const className of ['product-layout', 'product-photo skeleton', 'product-purchase-card', 'product-specs', 'comments-layout', 'comment-compose']) assert.ok(product.includes(className));
// The live form stays outside Suspense, so resolving comments never replaces it.
const Comments = loadWithComments();
function loadWithComments() {
  const exports = {};
  const source = ts.transpileModule(fs.readFileSync('src/features/comments/components/ProductComments.tsx', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
  vm.runInNewContext(source, { exports, require(name) {
    if (name === '@/services/apiComments') return { getProductComments: () => new Promise(() => {}) };
    if (name.startsWith('./')) return { __esModule: true, default: () => null };
    return require(name);
  } });
  return exports.default;
}
const tree = Comments({ carId: 'test', page: 1 });
const layout = tree.props.children[1];
assert.equal(layout.props.children[0].type, React.Suspense);
assert.notEqual(layout.props.children[1].type, React.Suspense);
const css = fs.readFileSync('src/styles/skeleton.css', 'utf8');
assert.ok(css.includes('prefers-reduced-motion: reduce'));
assert.ok(css.includes('.vehicle-gallery.skeleton { height: auto; }'));
console.log('Loading checks passed: card counts, route fallbacks, shared layout classes, passive placeholders, persistent comment form, reduced motion.');
