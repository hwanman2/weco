/* ===================================================================
   humaaans (MIT, https://www.npmjs.com/package/humaaans)
   원작 아트워크 : Humaaans by Pablo Stanley (CC BY 4.0)

   React.createElement 로 컴파일된 body-part 모듈을 SVG 문자열로 뽑아
   cardnews/figures/*.svg 로 저장한다. 색은 팔레트 변수로 치환해서
   다크/크림 카드 양쪽에 자동으로 맞는다.

   사용법:
     npm i humaaans          (임시 디렉터리에서)
     node cardnews/tools/extract-humaaans.mjs <humaaans 패키지 경로>
   =================================================================== */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const here = dirname(fileURLToPath(import.meta.url));
const PKG = process.argv[2];
if (!PKG) {
  console.error('사용법: node extract-humaaans.mjs <humaaans 패키지 경로>');
  process.exit(1);
}
const OUT = join(here, '..', 'figures');
mkdirSync(OUT, { recursive: true });

/* React.createElement 를 SVG 문자열 빌더로 대체 */
const SKIP = new Set(['key', 'ref', 'className', 'xmlns', 'version']);
const kebab = (k) =>
  ({ fillRule: 'fill-rule', strokeWidth: 'stroke-width', strokeLinecap: 'stroke-linecap',
     strokeLinejoin: 'stroke-linejoin', clipPath: 'clip-path', clipRule: 'clip-rule',
     strokeDasharray: 'stroke-dasharray', fillOpacity: 'fill-opacity',
     strokeOpacity: 'stroke-opacity', xlinkHref: 'xlink:href' }[k] || k);

const React = {
  createElement(tag, props, ...children) {
    const kids = children.flat(Infinity).filter((c) => c != null && c !== false).join('');
    const attrs = Object.entries(props || {})
      .filter(([k, v]) => !SKIP.has(k) && v != null && typeof v !== 'function')
      .map(([k, v]) => `${kebab(k)}="${String(v).replace(/"/g, '&quot;')}"`)
      .join(' ');
    if (typeof tag !== 'string') return kids; // 컴포넌트는 이 파일들에 없음
    return `<${tag}${attrs ? ' ' + attrs : ''}>${kids}</${tag}>`;
  },
};

/* body-part 모듈 하나를 SVG 조각으로 평가 */
function evalPart(file) {
  let src = readFileSync(file, 'utf8')
    .replace(/^\s*import[^;]+;/gm, '')
    .replace(/export\s+default\s+(\w+);?/, 'module.exports = $1;');
  const module = { exports: {} };
  vm.runInNewContext(src, { React, module, exports: module.exports });
  const Comp = module.exports;
  return typeof Comp === 'function' ? Comp({}) : String(Comp);
}

/* humaaans 원본 고정 색 → 카드 팔레트 변수

   부위별로 다르게 칠한다. 하나의 표로 일괄 치환하면
   - 어두운 옷이 다크 카드 배경에 묻히고
   - 머리카락과 신발이 같은 색이라 구분이 안 된다.                     */

const SKIN = /#(B28B67|997659|A56A43|7A4E36|E4B08A|D4A181|8C5A3C|AA6A45)/gi;
const hexes = (svg) => [...svg.matchAll(/#[0-9A-Fa-f]{6}/g)].map((m) => m[0].toUpperCase());

/* 머리 : 피부 외 전부 머리카락 색 */
const paintHead = (svg) =>
  svg.replace(SKIN, 'var(--figure-skin)').replace(/#[0-9A-Fa-f]{6}/g, 'var(--figure-hair)');

/* 상의 : 가장 넓게 쓰인 옷 색 하나만 빨강, 나머지는 실루엣 색 */
const paintTorso = (svg) => {
  let out = svg.replace(SKIN, 'var(--figure-skin)');
  const count = {};
  for (const h of hexes(out)) count[h] = (count[h] || 0) + 1;
  const [main] = Object.entries(count).sort((a, b) => b[1] - a[1])[0] || [];
  if (main) out = out.replaceAll(new RegExp(main, 'gi'), 'var(--red)');
  return out.replace(/#[0-9A-Fa-f]{6}/g, 'var(--figure)');
};

/* 하의 · 신발 : 실루엣 색, 신발만 살짝 어둡게 */
const paintBottom = (svg) => {
  let out = svg.replace(SKIN, 'var(--figure-skin)');
  const count = {};
  for (const h of hexes(out)) count[h] = (count[h] || 0) + 1;
  const dark = Object.keys(count).find((h) => parseInt(h.slice(1), 16) < 0x404040);
  if (dark) out = out.replaceAll(new RegExp(dark, 'gi'), 'var(--figure-hair)');
  return out.replace(/#[0-9A-Fa-f]{6}/g, 'var(--figure)');
};

/* 머리 + 하체 + 상체를 human.js 와 같은 좌표계로 합성 */
function compose({ head, torso, bottom }) {
  const P = join(PKG, 'lib', 'body-parts');
  const body = `
  <g fill-rule="evenodd" stroke-width="1">
    <g transform="translate(40, 31)">
      <g transform="translate(82, 0)">${paintHead(evalPart(join(P, 'head', head + '.js')))}</g>
      <g transform="translate(0, 187)">${paintBottom(evalPart(join(P, 'standing', bottom + '.js')))}</g>
      <g transform="translate(22, 82)">${paintTorso(evalPart(join(P, 'torso', torso + '.js')))}</g>
    </g>
  </g>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 480">${body}</svg>`;
}

/* 카드에서 쓸 인물 조합 */
const FIGURES = {
  'asker':      { head: 'Short',      torso: 'PointingForward', bottom: 'SkinnyJeans' },
  'listener':   { head: 'Pony',       torso: 'Jacket',          bottom: 'Skirt' },
  'tired':      { head: 'Long',       torso: 'LongSleeve',      bottom: 'BaggyPants' },
  'walkingaway':{ head: 'Afro',       torso: 'Hoodie',          bottom: 'SkinnyJeansWalk' },
  'expert':     { head: 'ShortBeard', torso: 'LabCoat',         bottom: 'SweatPants' },
  'pointingup': { head: 'Curly',      torso: 'PointingUp',      bottom: 'SkinnyJeans' },
};

let n = 0;
const bundle = {};
for (const [name, parts] of Object.entries(FIGURES)) {
  try {
    const svg = compose(parts);
    writeFileSync(join(OUT, name + '.svg'), svg);
    // 카드 렌더러는 file:// 에서 도니 fetch 를 못 쓴다 → JS 로 묶어둔다
    bundle[name] = svg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
    n += 1;
    console.log('추출', name);
  } catch (e) {
    console.error('실패', name, '-', e.message.split('\n')[0]);
  }
}

const js = `/* 자동 생성 파일 — 직접 고치지 말 것.
   humaaans (MIT) / 원작 아트워크 Humaaans by Pablo Stanley (CC BY 4.0)
   다시 만들려면: node cardnews/tools/extract-humaaans.mjs <humaaans 경로> */

window.FIGURES = ${JSON.stringify(bundle, null, 0)};
window.FIGURE_BOX = { w: 380, h: 480 };
`;
writeFileSync(join(here, '..', 'figures.js'), js);
console.log(`\n${n}개 → cardnews/figures/ 및 figures.js`);
