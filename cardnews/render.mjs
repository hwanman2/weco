/* ===================================================================
   카드셀 PNG 렌더러
   사용법:  node cardnews/render.mjs [세트이름]
   결과:    cardnews/out/<세트이름>-01.png ... (1080x1350)
   =================================================================== */

import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { mkdirSync, rmSync, readdirSync } from 'node:fs';

/* Playwright 는 설치 위치가 환경마다 다르다.
   일반 해석 → 전역 설치 경로 순으로 찾는다. */
async function loadChromium() {
  const candidates = [
    'playwright',
    'playwright-core',
    '/opt/node22/lib/node_modules/playwright/index.mjs',
    '/usr/lib/node_modules/playwright/index.mjs',
    '/usr/local/lib/node_modules/playwright/index.mjs',
  ];
  for (const c of candidates) {
    try {
      const mod = await import(c);
      if (mod.chromium) return mod.chromium;
    } catch {
      /* 다음 후보로 */
    }
  }
  console.error(
    'Playwright 를 찾지 못했습니다.\n' +
      '  npm i -D playwright && npx playwright install chromium\n' +
      '을 실행한 뒤 다시 시도하세요.'
  );
  process.exit(1);
}
const chromium = await loadChromium();

const here = dirname(fileURLToPath(import.meta.url));
const setName = process.argv[2] || 'networking';
const outDir = join(here, 'out');

mkdirSync(outDir, { recursive: true });
for (const f of readdirSync(outDir)) {
  if (f.startsWith(setName + '-') && f.endsWith('.png')) rmSync(join(outDir, f));
}

const browser = await chromium.launch({ args: ['--no-sandbox', '--force-color-profile=srgb'] });
const page = await browser.newPage({ viewport: { width: 1180, height: 1400 }, deviceScaleFactor: 1 });

await page.goto('file://' + join(here, 'index.html') + '?set=' + setName, { waitUntil: 'load' });
await page.waitForFunction(() => document.documentElement.dataset.ready === '1', { timeout: 15000 });

const cards = await page.locator('.card').all();
let n = 0;
for (const card of cards) {
  n += 1;
  const file = join(outDir, `${setName}-${String(n).padStart(2, '0')}.png`);
  await card.screenshot({ path: file });
  console.log('rendered', file);
}

await browser.close();
console.log(`\n${n}장 완료 → cardnews/out/`);
