const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup: render } = require('react-dom/server');
function load(file, mocks = {}) {
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
  vm.runInNewContext(code, { exports, require: name => Object.hasOwn(mocks, name) ? mocks[name] : require(name) });
  return exports;
}
const constants = load('src/utils/utils.ts');
const Purchase = load('src/features/product/components/ProductPurchase.tsx', { '@/utils/utils': constants }).default;
let html = render(React.createElement(Purchase, { price: 32000, colors: ['white', 'unknown'] }));
assert.ok(html.includes('۳۲,۰۰۰'));
assert.ok(html.includes('سفید') && html.includes('unknown'));
assert.ok(html.includes('tel:' + constants.PHONE_NUMBER));
assert.ok(html.includes(constants.WHATSAPP_LINK));
html = render(React.createElement(Purchase, { price: 0, colors: [] }));
assert.ok(html.includes('تماس بگیرید'));
assert.ok(!html.includes('یورو'));
const Details = load('src/features/product/components/ProductDetails.tsx').default;
html = render(React.createElement(Details, { car: { name: 'تست', technicalSpecifications: [], options: [], descriptions: [] } }));
assert.ok(html.includes('به‌زودی تکمیل'));
for (const id of ['specifications', 'equipment', 'description']) assert.ok(html.includes('id="' + id + '"'));
let dbCalls = 0;
let record = { _id: '0123456789abcdef01234567', name: 'تست' };
const { getCar } = load('src/services/apiCars.ts', {
  'server-only': {},
  '@/lib/mongoose': async () => { dbCalls++; },
  '@/models/carModel': { findById: () => ({ lean: async () => record }) },
});
(async () => {
  assert.equal(await getCar('invalid'), null);
  assert.equal(dbCalls, 0);
  assert.equal((await getCar(record._id)).name, record.name);
  record = null;
  assert.equal(await getCar('0123456789abcdef01234567'), null);
  console.log('Product detail checks passed: price, colors, contacts, empty content, valid/missing/invalid IDs.');
})().catch(error => { console.error(error); process.exitCode = 1; });

// Exercise Swiper integration and image-error recovery without a browser runtime.
let galleryState = [0, []];
let hook = 0;
const calls = [];
const instance = { realIndex: 0, slidePrev: () => calls.push('prev'), slideNext: () => calls.push('next'), slideToLoop: index => calls.push(index) };
const sliderRef = { current: null };
const Gallery = load('src/features/product/components/ProductImageSlider.tsx', {
  react: { ...React, useRef: () => sliderRef, useState: initial => {
    const index = hook++;
    return [galleryState[index] ?? initial, value => { galleryState[index] = typeof value === 'function' ? value(galleryState[index]) : value; }];
  } },
  'next/image': 'img',
  'swiper/react': { Swiper: 'swiper', SwiperSlide: 'slide' },
  'swiper/modules': { A11y: {} },
  'swiper/css': {},
  'swiper/css/a11y': {},
}).default;
const pictures = [{ _id: '1', src: '/one.jpg' }, { _id: '2', src: '/two.jpg' }];
const changes = [];
function nodes(pics = pictures) {
  hook = 0;
  const result = [];
  function visit(node) {
    if (Array.isArray(node)) return node.forEach(visit);
    if (!node || typeof node !== 'object') return;
    result.push(node);
    visit(node.props?.children);
  }
  visit(Gallery({ pictures: pics, name: 'تست', onActiveChange: index => changes.push(index) }));
  return result;
}
const swiper = nodes().find(node => node.type === 'swiper');
assert.equal(swiper.props.loop, true);
assert.equal(nodes(pictures.slice(0, 1)).find(node => node.type === 'swiper').props.loop, false);
swiper.props.onSwiper(instance);
nodes().find(node => node.props?.['aria-label'] === 'تصویر قبلی').props.onClick();
nodes().find(node => node.props?.['aria-label'] === 'تصویر بعدی').props.onClick();
nodes().find(node => node.props?.['aria-label'] === 'نمایش تصویر ۲').props.onClick();
assert.deepEqual(calls, ['prev', 'next', 1]);
swiper.props.onSlideChange({ activeIndex: 7, realIndex: 1 });
assert.equal(galleryState[0], 1);
assert.deepEqual(changes, [1]);
assert.equal(nodes().find(node => node.props?.['aria-label'] === 'نمایش تصویر ۲').props['aria-pressed'], true);
nodes().find(node => node.props?.onError).props.onError();
assert.ok(nodes().some(node => node.props?.children === 'تصویر خودرو در دسترس نیست'));
assert.ok(!nodes([]).some(node => node.type === 'swiper'));
for (const pics of [[], pictures.slice(0, 1), pictures]) {
  assert.ok(nodes(pics).some(node => node.props?.className === 'product-thumbnails'), 'Reserve the thumbnail row for every gallery state');
}
console.log('Gallery checks passed: Swiper controls, active slide, thumbnail selection, failed-image and empty fallbacks.');

// Editing a picture must still target the original image after loop rearranges slides.
const SharedSlider = load('src/components/Slider.tsx', {
  'swiper/react': { Swiper: 'swiper', SwiperSlide: 'slide' },
  'swiper/modules': { Autoplay: {}, Navigation: {}, Pagination: {} },
  'swiper/css': {},
  '@/components/SliderButton': { NextSliderButton: 'next-button', PrevSliderButton: 'previous-button' },
  'next/image': 'img',
}).default;
let editedImage;
const shared = SharedSlider({ pictures, onChangeSlide: index => { editedImage = index; } }).props.children;
assert.equal(shared.props.loop, true);
shared.props.onSlideChange({ activeIndex: 8, realIndex: 0 });
assert.equal(editedImage, 0);
assert.equal(SharedSlider({ pictures: [] }).props.children.props.loop, false);
console.log('Shared slider passed: infinite loop and original image index for picture editing.');
