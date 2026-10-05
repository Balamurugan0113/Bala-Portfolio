/**
 * Headless full-app render test.
 * Boots the real app (via Vite's SSR module loader) inside jsdom, flushes
 * effects/animations, and asserts that every section renders with its content.
 *
 * Usage: node scripts/render-test.mjs
 */
import { createServer } from 'vite';
import { JSDOM } from 'jsdom';
import React from 'react';
import { createRoot } from 'react-dom/client';

const dom = new JSDOM('<!DOCTYPE html><html><body><div id="root"></div></body></html>', {
  url: 'http://localhost:5173/',
  pretendToBeVisual: true,
});

const { window } = dom;

// ---- browser polyfills -------------------------------------------------
const MODE = process.env.MODE ?? 'desktop'; // desktop | mobile | reduced
window.matchMedia = window.matchMedia || ((q) => {
  let matches = false;
  if (MODE === 'mobile' && /max-width/.test(q)) matches = true;
  if (MODE === 'mobile' && /hover: none|pointer: coarse/.test(q)) matches = true;
  if (MODE === 'reduced' && /prefers-reduced-motion/.test(q)) matches = true;
  return {
    matches, media: q, onchange: null,
    addListener: () => {}, removeListener: () => {},
    addEventListener: () => {}, removeEventListener: () => {}, dispatchEvent: () => false,
  };
});
window.innerWidth = MODE === 'mobile' ? 390 : 1440;
window.IntersectionObserver = class {
  constructor(cb) { this.cb = cb; }
  observe(el) { this.cb([{ isIntersecting: true, target: el, intersectionRatio: 1 }], this); }
  unobserve() {} disconnect() {} takeRecords() { return []; }
};
window.ResizeObserver = window.ResizeObserver || class { observe() {} unobserve() {} disconnect() {} };
window.scrollTo = window.scrollTo || (() => {});
window.scrollIntoView = window.Element.prototype.scrollIntoView || (window.Element.prototype.scrollIntoView = () => {});
window.HTMLMediaElement.prototype.play = () => Promise.resolve();
window.HTMLMediaElement.prototype.pause = () => {};
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (cb) => setTimeout(() => cb(performance.now()), 16);
  window.cancelAnimationFrame = clearTimeout;
}
window.HTMLElement.prototype.scrollBy = window.HTMLElement.prototype.scrollBy || (() => {});

for (const key of ['window', 'document', 'navigator', 'location', 'localStorage', 'matchMedia',
  'IntersectionObserver', 'ResizeObserver', 'requestAnimationFrame', 'cancelAnimationFrame',
  'getComputedStyle', 'performance', 'CustomEvent', 'Event', 'MouseEvent', 'PointerEvent',
  'KeyboardEvent', 'HTMLElement', 'HTMLCanvasElement', 'SVGElement', 'URL', 'console', 'setTimeout', 'clearTimeout',
  'addEventListener', 'removeEventListener', 'dispatchEvent', 'history', 'innerWidth', 'innerHeight', 'devicePixelRatio']) {
  if (window[key] !== undefined && globalThis[key] === undefined) {
    globalThis[key] = window[key];
  }
}
globalThis.window = window;
globalThis.document = window.document;

// jsdom lacks canvas → force WebGL path to fail fast inside the local SceneBoundary
window.HTMLCanvasElement.prototype.getContext = () => null;
// Minimal WAAPI stub so framer-motion exit animations complete instantly in jsdom
if (!window.Element.prototype.animate) {
  window.Element.prototype.animate = function () {
    return {
      finished: Promise.resolve(),
      cancel() {}, pause() {}, play() {}, commitStyles() {},
      currentTime: null, startTime: null, playbackRate: 1, effect: null, onfinish: null,
    };
  };
}

// ---- load the app through vite -----------------------------------------
const vite = await createServer({
  logLevel: 'error',
  server: { middlewareMode: true, hmr: false },
  appType: 'custom',
});

const { default: App } = await vite.ssrLoadModule('/src/app/App.tsx');

const root = createRoot(document.getElementById('root'));
root.render(React.createElement(App));

// ---- early sample: loading screen must be present shortly after boot -----
await new Promise((r) => setTimeout(r, 400));
const earlyHtml = document.body.innerHTML;

// let lazy chunks + effects + raf + loader exit flush
await new Promise((r) => setTimeout(r, 3300));

// ---- assertions ---------------------------------------------------------
const html = document.body.innerHTML;
let failures = 0;
const check = (name, cond, extra = '') => {
  const ok = !!cond;
  if (!ok) failures++;
  console.log(`${ok ? '✓' : '✗'} ${name}${extra ? ` — ${extra}` : ''}`);
};

check('No global ErrorBoundary crash', !html.includes('Unexpected Error'));
check('Loader: present early (boot sequence)', earlyHtml.includes('BALA PORTFOLIO') && earlyHtml.includes('SYS.BOOT'));
check('Loader: gone after boot', !html.includes('BALA PORTFOLIO') && !html.includes('SYS.BOOT'));
check('Hero: name lockup', html.includes('BALAMURUGAN') && /Balamurugan C/i.test(html));
check('Hero: label', /B\.TECH/i.test(html) && /DATA SCIENCE ENGINEER/i.test(html));
check('Hero: spec strip', /SECURITY/.test(html) && /ENGINEERING/.test(html));
check('Hero: typewriter role', /Ethical Hacker|AI &amp; Data Science/i.test(html));
check('Hero: resume CTA', html.includes('Resume'));
const navEl = document.querySelector('nav[aria-label="Main navigation"]');
const navText = navEl ? navEl.textContent : '';
check('Navbar: BALA brand + items', navText.includes('BALA') && navText.includes('Projects') && navText.includes('Resume'));
check('Navbar: Home link dropped', !navText.includes('Home'));
check('About: heading', html.includes('The Engineer Behind The Terminal'));
check('About: stats', html.includes('Security Lab Audits') && html.includes('AI Models Developed'));
check('About: education', html.includes('Info Institute of Engineering'));
check('Skills: heading', html.includes('Technical Arsenal'));
check('Skills: categories', html.includes('Cybersecurity') && html.includes('Cloud &amp; Infrastructure'));
check('Skills: certs', html.includes('Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate'));
check('Skills: proficiency', html.includes('Penetration Testing'));
check('Projects: heading', html.includes('Featured Projects &amp; Systems') || html.includes('Featured Projects'));
check('Projects: cards', (html.match(/Inspect Case Study/g) || []).length >= 9, `${(html.match(/Inspect Case Study/g) || []).length} cards`);
check('Projects: rotor controls', html.includes('ROTOR') || html.includes('ROTATING'));
check('Projects: filters', html.includes('Computer Vision'));
check('Experience: timeline', html.includes('Engineering Journey') && html.includes('Accent Techno Soft'));
check('Experience: achievements added', html.includes('Smart India Hackathon 2025') && html.includes('Trisquadathon 2024'));
check('Contact: form', html.includes('POST /api/contact') && html.includes('Message Payload'));
check('Contact: FAQ', html.includes('What is a penetration test'));
check('Footer: copyright', html.includes('B.TECH AI'));
check('BackToTop present', html.includes('Scroll back to top'));
check('Tech icons rendered', (html.match(/tech-chip/g) || []).length > 20, `${(html.match(/tech-chip/g) || []).length} chips`);

// count section landmarks
const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'].filter((id) => document.getElementById(id));
check('All 6 section ids present', sections.length === 6, sections.join(','));

console.log(failures === 0 ? '\nALL RENDER TESTS PASSED' : `\n${failures} TEST(S) FAILED`);
await vite.close();
dom.window.close();
process.exit(failures === 0 ? 0 : 1);
