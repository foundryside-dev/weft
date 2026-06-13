// verify.mjs — runtime render + interactivity check against the static preview.
// Dev-only; not part of the shipped app. Run: node verify.mjs (preview must be up).
import { chromium } from 'playwright';

const BASE = process.env.BASE || 'http://localhost:4319';
const routes = [
  '/',
  '/members/loomweave',
  '/members/charter',
  '/members/warpline',
  '/members/lacuna',
  '/demos',
  '/demos/lacuna',
  '/demos/cli',
  '/build',
];

let failures = 0;
const fail = (m) => { console.log('  FAIL:', m); failures++; };

const browser = await chromium.launch();
const page = await browser.newPage();

for (const r of routes) {
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(`${BASE}/#${r}`, { waitUntil: 'networkidle' });
  const rootKids = await page.evaluate(() => document.getElementById('root').childElementCount);
  const h1 = (await page.locator('h1').first().textContent().catch(() => '')) || '';
  console.log(`route ${r}  root-children=${rootKids}  h1="${h1.trim().slice(0, 40)}"  console-errors=${errors.length}`);
  if (rootKids === 0) fail(`${r} did not mount`);
  if (errors.length) fail(`${r} console errors: ${errors.slice(0, 2).join(' | ')}`);
  page.removeAllListeners('console');
  page.removeAllListeners('pageerror');
}

// --- interactivity 1: composition-law pill switches text (landing) ---
await page.goto(`${BASE}/#/`, { waitUntil: 'networkidle' });
const soloBtn = page.getByRole('tab', { name: 'Solo' });
if (await soloBtn.count()) {
  await soloBtn.first().click();
  const txt = await page.locator('body').textContent();
  if (!txt.includes('Each core tool has a useful standalone workflow')) fail('Solo pill did not show solo text');
  else console.log('interact: composition-law Solo pill switches text  OK');
} else fail('Solo tab not found');

// --- interactivity 2: dashboard kanban card opens the detail panel ---
await page.goto(`${BASE}/#/demos`, { waitUntil: 'networkidle' });
let bodyText = await page.locator('body').textContent();
if (!bodyText.includes('Start with Lacuna') || !bodyText.includes('target: Lacuna')) fail('/demos did not default to the Lacuna tour');
else console.log('route: /demos defaults to Lacuna tour  OK');
await page.goto(`${BASE}/#/demos/dashboard`, { waitUntil: 'networkidle' });
await page.waitForTimeout(300);
const card = page.getByText('Stable identity for issue links').first();
if (await card.count()) {
  await card.click();
  const dialog = page.getByRole('dialog');
  await dialog.waitFor({ state: 'visible', timeout: 2000 }).catch(() => {});
  const opened = await page.getByRole('button', { name: 'Advance state' }).count();
  if (!opened) fail('detail panel did not open on card click');
  else console.log('interact: kanban card opens detail panel  OK');
} else fail('kanban card not found');

// --- interactivity 3: /build copy button flips to "copied" ---
await page.goto(`${BASE}/#/build`, { waitUntil: 'networkidle' });
await browser.close().then(() => {}).catch(() => {});
// reopen with clipboard permission for the copy check
const b2 = await chromium.launch();
const ctx = await b2.newContext({ permissions: ['clipboard-read', 'clipboard-write'] });
const p2 = await ctx.newPage();
await p2.goto(`${BASE}/#/build`, { waitUntil: 'networkidle' });
const copyBtn = p2.getByRole('button', { name: 'Copy code to clipboard' }).first();
if (await copyBtn.count()) {
  await copyBtn.click();
  await p2.waitForTimeout(150);
  const label = await copyBtn.textContent();
  if (!/copied/i.test(label || '')) fail(`copy button did not flip (got "${label}")`);
  else console.log('interact: /build copy button flips to "copied ✓"  OK');
} else fail('copy button not found');

// --- highlighting: Rust sample actually tokenizes (multiple colored spans) ---
const spanColors = await p2.evaluate(() => {
  const pre = document.querySelector('pre');
  if (!pre) return 0;
  const colors = new Set();
  pre.querySelectorAll('span').forEach((s) => colors.add(getComputedStyle(s).color));
  return colors.size;
});
if (spanColors < 3) fail(`Rust sample not syntax-highlighted (only ${spanColors} colors)`);
else console.log(`highlight: Rust sample tokenizes (${spanColors} distinct span colors)  OK`);

await b2.close();
console.log(failures === 0 ? '\nALL RUNTIME CHECKS PASSED' : `\n${failures} RUNTIME FAILURE(S)`);
process.exit(failures ? 1 : 0);
