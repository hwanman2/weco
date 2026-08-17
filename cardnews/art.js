/* ===================================================================
   페이퍼컷 스타일 일러스트 라이브러리 (인라인 SVG)
   - 색은 카드 테마 변수(--paper/--coal/--red ...)를 그대로 상속받는다
   - 새 그림을 추가하려면 ART에 함수 하나만 더 붙이면 된다
   =================================================================== */

/* 종이 오려붙인 느낌 :
   ds = 들뜬 종이 그림자 / rg = 손으로 오린 거친 가장자리 */
const shadow = (id) => `
  <filter id="ds${id}" x="-40%" y="-40%" width="200%" height="200%">
    <feDropShadow dx="7" dy="10" stdDeviation="7" flood-color="#000" flood-opacity=".30"/>
    <feDropShadow dx="2" dy="3" stdDeviation="1" flood-color="#000" flood-opacity=".22"/>
  </filter>
  <filter id="rg${id}" x="-15%" y="-15%" width="130%" height="130%">
    <feTurbulence type="fractalNoise" baseFrequency="0.014 0.019" numOctaves="3"
                  seed="${id * 7}" result="warp"/>
    <feDisplacementMap in="SourceGraphic" in2="warp" scale="5"
                       xChannelSelector="R" yChannelSelector="G"/>
  </filter>`;

/* 커피잔 (cx = 중심, by = 바닥선, s = 배율) */
const cup = (cx, by, s = 1) => `
  <g transform="translate(${cx} ${by}) scale(${s})">
    <ellipse cx="0" cy="0" rx="86" ry="17" fill="var(--paper-sh)"/>
    <path d="M-78 -8 h156 a10 10 0 0 1 0 16 h-156 a10 10 0 0 1 0 -16z" fill="var(--paper)"/>
    <path d="M-52 -86 h104 l-13 74 a10 10 0 0 1 -10 8 h-58 a10 10 0 0 1 -10 -8z" fill="var(--paper)"/>
    <path d="M-52 -86 h104 l-3 17 h-98z" fill="var(--paper-sh)"/>
    <path d="M52 -76 a30 30 0 0 1 4 52" stroke="var(--paper)" stroke-width="13" fill="none" stroke-linecap="round"/>
    <path d="M-52 -86 l14 82 a10 10 0 0 0 6 6" stroke="var(--paper-sh)" stroke-width="6"
          fill="none" opacity=".7"/>
    <g stroke="var(--paper)" stroke-width="7" stroke-linecap="round" opacity=".55" fill="none">
      <path d="M-24 -108 q-13 -19 0 -36"/>
      <path d="M2 -118 q-13 -19 0 -36"/>
      <path d="M26 -106 q-13 -19 0 -36"/>
    </g>
  </g>`;

/* 책 한 권 (가로 폭 w, 높이 h) — 빨강 표지 + 크림 책배 */
const book = (cx, by, w, h, tone = 'red') => {
  const f = tone === 'red' ? 'var(--red)' : 'var(--coal)';
  const d = tone === 'red' ? 'var(--red-sh)' : '#000';
  return `
  <g>
    <rect x="${cx - w / 2}" y="${by - h}" width="${w}" height="${h}" rx="5" fill="${f}"/>
    <rect x="${cx - w / 2 + 12}" y="${by - h + 6}" width="${w - 24}" height="${h - 12}" rx="3" fill="var(--paper)"/>
    <rect x="${cx - w / 2}" y="${by - h}" width="18" height="${h}" rx="4" fill="${d}"/>
    <rect x="${cx + w / 2 - 8}" y="${by - h}" width="8" height="${h}" fill="${d}" opacity=".55"/>
  </g>`;
};

/* 폴더 */
const folder = (x, y, w, h, fill = 'var(--red)') => `
  <g>
    <path d="M${x} ${y + 26} a12 12 0 0 1 12 -12 h${w * 0.32} l22 -22 h${w * 0.6} a12 12 0 0 1 12 12 v${h} a12 12 0 0 1 -12 12 h-${w} a12 12 0 0 1 -12 -12z" fill="${fill}"/>
    <rect x="${x + 26}" y="${y + 6}" width="${w - 60}" height="26" rx="6" fill="var(--paper)"/>
  </g>`;

/* 페이퍼컷 인물 — 머리(위) + 목 + 어깨선 몸통 */
const person = (cx, by, s = 1, body = 'var(--figure)', skin = 'var(--figure-skin)') => `
  <g transform="translate(${cx} ${by}) scale(${s})">
    <rect x="-17" y="-176" width="34" height="38" fill="${skin}"/>
    <path d="M-78 0 v-84 a78 58 0 0 1 156 0 V0z" fill="${body}"/>
    <path d="M-26 -130 l26 26 l26 -26 l-9 -12 l-17 17 l-17 -17z" fill="${skin}" opacity=".9"/>
    <path d="M-78 -34 a78 40 0 0 0 156 0" fill="none" stroke="var(--figure-hair)"
          stroke-width="3" opacity=".22"/>
    <circle cx="0" cy="-208" r="56" fill="${skin}"/>
    <ellipse cx="-56" cy="-200" rx="11" ry="15" fill="${skin}"/>
    <ellipse cx="56" cy="-200" rx="11" ry="15" fill="${skin}"/>
    <circle cx="-19" cy="-207" r="6" fill="var(--figure-hair)" opacity=".85"/>
    <circle cx="19" cy="-207" r="6" fill="var(--figure-hair)" opacity=".85"/>
    <path d="M-57 -210 a57 57 0 0 1 114 0 l-17 0 a40 40 0 0 0 -80 0z" fill="var(--figure-hair)"/>
  </g>`;

/* 점선 실루엣 인물 (사라지는 사람) */
const ghost = (cx, by, s = 1) => `
  <g transform="translate(${cx} ${by}) scale(${s})" fill="none" stroke="var(--figure)"
     stroke-width="11" stroke-dasharray="24 21" stroke-linecap="round" opacity=".45">
    <path d="M-78 0 v-84 a78 58 0 0 1 156 0 V0"/>
    <circle cx="0" cy="-208" r="56"/>
  </g>`;


/* ── 표정 있는 얼굴 ────────────────────────────────────────────────
   emo: 'tired' 지침 | 'firm' 단호 | 'smug' 뻔뻔 | 'plead' 아쉬운소리
   썸네일이 먹히는 이유는 얼굴과 감정이다. 무표정 실루엣은 넘어간다.  */
const face = (cx, cy, r = 100, emo = 'tired', skin = 'var(--figure-skin)') => {
  const ink = 'var(--figure-hair)';
  const k = r / 100;
  const brow = {
    tired: `M-58 -34 l44 14 M58 -34 l-44 14`,      // 八 자로 처진 눈썹
    firm:  `M-60 -28 l46 -8 M60 -28 l-46 -8`,      // 안쪽이 내려온 단호한 눈썹
    smug:  `M-58 -40 l44 -4 M58 -30 l-44 6`,       // 한쪽만 올라간 눈썹
    plead: `M-56 -40 l42 18 M56 -40 l-42 18`,
  }[emo];
  const mouth = {
    tired: `M-30 46 h60`,                           // 꾹 다문 일자
    firm:  `M-28 44 q28 -12 56 0`,                  // 살짝 다문 곡선
    smug:  `M-26 40 q26 26 52 -6`,                  // 능글맞은 미소
    plead: `M-24 52 q24 -22 48 0`,
  }[emo];
  const eyes = emo === 'firm'
    ? `<path d="M-40 4 h26 M14 4 h26" stroke="${ink}" stroke-width="${11 * k}" stroke-linecap="round"/>`
    : `<circle cx="-27" cy="4" r="11" fill="${ink}"/><circle cx="27" cy="4" r="11" fill="${ink}"/>`;
  return `
  <g transform="translate(${cx} ${cy}) scale(${k})">
    <circle cx="0" cy="0" r="100" fill="${skin}"/>
    <ellipse cx="-99" cy="6" rx="15" ry="21" fill="${skin}"/>
    <ellipse cx="99" cy="6" rx="15" ry="21" fill="${skin}"/>
    <path d="M-101 -18 a101 101 0 0 1 202 0 l-30 2 a72 72 0 0 0 -142 0z" fill="${ink}"/>
    ${eyes}
    <g stroke="${ink}" stroke-width="${10 * k}" stroke-linecap="round" fill="none">
      <path d="${brow}"/>
      <path d="${mouth}"/>
    </g>
  </g>`;
};

/* 화면 밖에서 들어오는 팔 + 내미는 서류 (각도 deg 로 배치) */
const pushingHand = (x, y, deg, len = 210) => `
  <g transform="translate(${x} ${y}) rotate(${deg})">
    <rect x="0" y="-26" width="${len}" height="52" rx="26" fill="var(--figure)"/>
    <rect x="${len - 40}" y="-40" width="86" height="80" rx="22" fill="var(--figure-skin)"/>
    <g transform="translate(${len + 40} 0) rotate(${-deg})">
      <path d="M0 -58 a10 10 0 0 1 10 -10 h44 l16 -16 h62 a10 10 0 0 1 10 10 v92
               a10 10 0 0 1 -10 10 h-122 a10 10 0 0 1 -10 -10z" fill="var(--red)"/>
      <rect x="18" y="-40" width="76" height="18" rx="8" fill="var(--paper)" opacity=".85"/>
    </g>
  </g>`;


/* humaaans 인물 배치 — cx=가로중심, by=발밑, h=키(px), flip=좌우반전 */
const figure = (name, cx, by, h = 460, flip = false) => {
  const box = (typeof window !== 'undefined' && window.FIGURE_BOX) || { w: 380, h: 480 };
  const art = (typeof window !== 'undefined' && window.FIGURES && window.FIGURES[name]) || '';
  const s = h / box.h;
  return `<g transform="translate(${cx} ${by}) scale(${flip ? -s : s} ${s}) translate(${-box.w / 2} ${-box.h})">${art}</g>`;
};


/* ── 납작한 소품 : humaaans 의 평면 스타일에 맞춘다 ─────────────── */

/* 서류철 한 권 */
const doc = (x, y, w, h, red = true) => `
  <g>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4"
          fill="${red ? 'var(--red)' : 'var(--figure)'}"/>
    <rect x="${x + w * 0.14}" y="${y + h * 0.34}" width="${w * 0.6}" height="${Math.max(4, h * 0.14)}"
          rx="3" fill="var(--figure-skin)" opacity=".75"/>
  </g>`;

/* 서류 더미 (바닥 by 에서 위로 n 칸) */
const docStack = (cx, by, w, n, gap = 30) => {
  let out = '';
  for (let i = 0; i < n; i += 1) {
    const jitter = (i % 3 - 1) * 14;
    out += doc(cx - w / 2 + jitter, by - (i + 1) * gap, w, gap - 6, true);
  }
  return `<g>${out}</g>`;
};

/* 상자 */
const box = (x, y, w, h) => `
  <g>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="var(--red)"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h * 0.26}" rx="6" fill="var(--red-sh)"/>
  </g>`;

/* 납작한 커피잔 */
const mug = (cx, by, s = 1) => `
  <g transform="translate(${cx} ${by}) scale(${s})">
    <rect x="-46" y="-70" width="92" height="70" rx="10" fill="var(--figure)"/>
    <rect x="-46" y="-70" width="92" height="16" rx="8" fill="var(--red)"/>
    <path d="M46 -56 a26 26 0 0 1 0 44" stroke="var(--figure)" stroke-width="12" fill="none"/>
    <ellipse cx="0" cy="2" rx="62" ry="10" fill="var(--figure)" opacity=".55"/>
  </g>`;

const ART = {

  /* 01 — 커피 한 잔 내미는 사람 vs 사람 키만 한 서류탑 (커버) */
  scale: () => `
  <svg viewBox="0 0 1000 660" preserveAspectRatio="xMidYMid meet">
    ${shadow(1)}
    <g filter="url(#ds1)"><g filter="url(#rg1)">
      ${figure('offering', 250, 660, 520)}
      ${mug(392, 352, 0.72)}
      ${docStack(770, 660, 210, 13, 46)}
    </g></g>
  </svg>`,

  /* 02 — 묻는 사람, 그리고 안고만 있는 사람 */
  brokenFlow: () => `
  <svg viewBox="0 0 1000 620" preserveAspectRatio="xMidYMid meet">
    ${shadow(2)}
    <g filter="url(#ds2)"><g filter="url(#rg2)">
      ${figure('asker', 240, 620, 520)}
      <g stroke="var(--red)" stroke-width="18" stroke-linecap="round">
        <path d="M470 300 l70 70"/>
        <path d="M540 300 l-70 70"/>
      </g>
      ${figure('holder', 760, 620, 520, true)}
      ${doc(690, 380, 150, 108)}
    </g></g>
  </svg>`,

  /* 03 — 모래시계 : 쌓인 시간과 돈 */
  hourglass: (c = {}) => `
  <svg viewBox="0 0 900 620" preserveAspectRatio="xMidYMid meet">
    ${shadow(3)}
    <g filter="url(#ds3)"><g filter="url(#rg3)">
      <rect x="300" y="40" width="300" height="26" rx="13" fill="var(--figure)"/>
      <rect x="300" y="554" width="300" height="26" rx="13" fill="var(--figure)"/>
      <path d="M330 66 h240 v42 l-96 186 v14 l96 186 v42 h-240 v-42 l96 -186 v-14 l-96 -186z"
            fill="none" stroke="var(--figure)" stroke-width="20" stroke-linejoin="round"/>
      <path d="M356 92 h188 l-72 140 h-44z" fill="var(--red)" opacity=".9"/>
      <rect x="444" y="250" width="12" height="150" rx="6" fill="var(--red)"/>
      <path d="M368 528 h164 l-52 -96 h-60z" fill="var(--red)"/>
      <g transform="rotate(-8 690 210)">
        <rect x="612" y="168" width="184" height="84" rx="14" fill="var(--figure)"/>
        <text x="704" y="226" text-anchor="middle" font-family="PT" font-weight="900"
              font-size="54" fill="var(--bg)">${(c.tags || ['5년', '10년'])[0]}</text>
      </g>
      <g transform="rotate(7 200 380)">
        <rect x="112" y="338" width="184" height="84" rx="14" fill="var(--figure)"/>
        <text x="204" y="396" text-anchor="middle" font-family="PT" font-weight="900"
              font-size="54" fill="var(--bg)">${(c.tags || ['5년', '10년'])[1]}</text>
      </g>
    </g></g>
  </svg>`,

  /* 04 — 받기만 하는 사람과 돌아서 가버린 사람 */
  oneWay: () => `
  <svg viewBox="0 0 1000 620" preserveAspectRatio="xMidYMid meet">
    ${shadow(4)}
    <g filter="url(#ds4)"><g filter="url(#rg4)">
      ${figure('tired', 230, 620, 520)}
      ${box(120, 470, 170, 78)}
      ${box(140, 396, 130, 70)}
      <g stroke="var(--figure)" fill="none" stroke-width="14"
         stroke-linecap="round" stroke-linejoin="round" opacity=".55">
        <path d="M690 300 h-190"/>
        <path d="M540 274 l-40 26 l40 26"/>
      </g>
      <g opacity=".38">${figure('walkingaway', 810, 620, 500)}</g>
    </g></g>
  </svg>`,

  /* 05 — 각자 가진 것을 내려놓는 자리 */
  table: () => `
  <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMid meet">
    ${shadow(5)}
    <g filter="url(#ds5)"><g filter="url(#rg5)">
      ${figure('expert', 200, 540, 470)}
      ${figure('holder', 540, 540, 490)}
      ${figure('guest', 880, 540, 470, true)}
      <rect x="60" y="540" width="960" height="26" rx="13" fill="var(--figure)"/>
      ${box(140, 466, 120, 74)}
      ${box(480, 452, 130, 88)}
      ${box(830, 472, 116, 68)}
    </g></g>
  </svg>`,

  /* 06 — 내가 가진 것을 들여다보는 사람 */
  openBag: () => `
  <svg viewBox="0 0 1000 620" preserveAspectRatio="xMidYMid meet">
    ${shadow(6)}
    <g filter="url(#ds6)"><g filter="url(#rg6)">
      ${figure('thinker', 260, 620, 520)}
      <g transform="translate(700 0)">
        <path d="M-160 452 h320 l-28 168 h-264z" fill="var(--figure)"/>
        <path d="M-160 452 h320 l32 -32 h-384z" fill="var(--figure-hair)" opacity=".55"/>
      </g>
      <g fill="var(--red)">
        <path d="M700 236 l24 50 l54 8 l-39 38 l9 54 l-48 -26 l-48 26 l9 -54 l-39 -38 l54 -8z"/>
        <circle cx="540" cy="300" r="26"/>
        <rect x="820" y="268" width="56" height="56" rx="12" transform="rotate(20 848 296)"/>
      </g>
    </g></g>
  </svg>`,

  /* 07 — 서로 내놓는 교환 */
  exchange: () => `
  <svg viewBox="0 0 1000 620" preserveAspectRatio="xMidYMid meet">
    ${shadow(7)}
    <g filter="url(#ds7)"><g filter="url(#rg7)">
      ${figure('giver', 210, 620, 520)}
      ${figure('offering', 790, 620, 520, true)}
      ${box(380, 330, 110, 96)}
      ${box(510, 330, 110, 96)}
      <g stroke="var(--red)" stroke-width="14" fill="none"
         stroke-linecap="round" stroke-linejoin="round">
        <path d="M400 500 h200"/>
        <path d="M436 474 l-36 26 l36 26"/>
        <path d="M564 474 l36 26 l-36 26"/>
      </g>
    </g></g>
  </svg>`,

  /* 08 — 머리에서 지식만 빼가려는 커피 한 잔 */
  pickBrain: () => `
  <svg viewBox="0 0 900 620" preserveAspectRatio="xMidYMid meet">
    ${shadow(8)}
    <g filter="url(#ds8)"><g filter="url(#rg8)">
      <!-- 머리 옆모습 -->
      <circle cx="220" cy="330" r="152" fill="var(--figure)"/>
      <rect x="150" y="466" width="140" height="114" fill="var(--figure)"/>
      <!-- 머릿속 서류 -->
      <g>
        <rect x="150" y="256" width="104" height="66" rx="8" fill="var(--figure-hair)" opacity=".5"/>
        <rect x="168" y="336" width="104" height="66" rx="8" fill="var(--figure-hair)" opacity=".3"/>
        <rect x="246" y="292" width="104" height="66" rx="8" fill="var(--red)"/>
      </g>
      <!-- 빠져나가는 궤적 -->
      <path d="M366 320 q116 -60 214 22" fill="none" stroke="var(--red)" stroke-width="11"
            stroke-linecap="round" stroke-dasharray="4 30"/>
      <path d="M556 306 l32 40 l-50 12" fill="none" stroke="var(--red)" stroke-width="11"
            stroke-linecap="round" stroke-linejoin="round"/>
      ${cup(700, 560, 1.15)}
    </g></g>
  </svg>`,

  /* 09 — 되묻기 : 질문을 그대로 돌려준다 */
  askFirst: () => `
  <svg viewBox="0 0 900 600" preserveAspectRatio="xMidYMid meet">
    ${shadow(9)}
    <g filter="url(#ds9)"><g filter="url(#rg9)">
      <!-- 들어온 질문 -->
      <g>
        <rect x="60" y="150" width="330" height="220" rx="30" fill="var(--paper)"/>
        <path d="M132 366 l14 74 l86 -70z" fill="var(--paper)"/>
        <text x="225" y="304" text-anchor="middle" font-family="PT" font-weight="900"
              font-size="150" fill="var(--coal)">?</text>
      </g>
      <!-- 되돌려주는 질문 -->
      <g>
        <rect x="470" y="228" width="374" height="238" rx="30" fill="var(--red)"/>
        <path d="M772 462 l-16 82 l-92 -78z" fill="var(--red)"/>
        <text x="657" y="392" text-anchor="middle" font-family="PT" font-weight="900"
              font-size="162" fill="var(--paper)">?</text>
      </g>
    </g></g>
  </svg>`,

  /* 10 — 반복되는 질문은 자료로 넘긴다 */
  linkOut: () => `
  <svg viewBox="0 0 900 600" preserveAspectRatio="xMidYMid meet">
    ${shadow(10)}
    <g filter="url(#ds10)"><g filter="url(#rg10)">
      <!-- 쌓아둔 자료 -->
      <g>
        <rect x="72" y="200" width="230" height="300" rx="14" fill="var(--paper-sh)"/>
        <rect x="102" y="170" width="230" height="300" rx="14" fill="var(--paper)"/>
        <g fill="var(--coal)" opacity=".8">
          <rect x="140" y="216" width="154" height="16" rx="8"/>
          <rect x="140" y="256" width="120" height="16" rx="8"/>
          <rect x="140" y="296" width="146" height="16" rx="8"/>
          <rect x="140" y="336" width="96" height="16" rx="8"/>
        </g>
        <rect x="102" y="170" width="230" height="34" rx="14" fill="var(--red)"/>
      </g>
      <!-- 링크로 전달 -->
      <g stroke="var(--red)" stroke-width="15" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path d="M392 322 h214"/>
        <path d="M560 282 l46 40 l-46 40"/>
      </g>
      ${person(760, 500, 0.98)}
    </g></g>
  </svg>`,

  /* 11 — 값을 매기면 진짜 필요한 사람만 남는다 */
  priceTag: () => `
  <svg viewBox="0 0 900 620" preserveAspectRatio="xMidYMid meet">
    ${shadow(11)}
    <g filter="url(#ds11)"><g filter="url(#rg11)">
      <!-- 시간 -->
      <circle cx="256" cy="330" r="150" fill="none" stroke="var(--figure)" stroke-width="26"/>
      <g stroke="var(--figure)" stroke-width="22" stroke-linecap="round">
        <path d="M256 240 v96"/>
        <path d="M256 336 l68 40"/>
      </g>
      <!-- 가격표 -->
      <g transform="rotate(-12 620 340)">
        <path d="M470 226 h250 a30 30 0 0 1 30 30 v168 a30 30 0 0 1 -30 30 h-250 l-92 -114z" fill="var(--red)"/>
        <circle cx="452" cy="340" r="30" fill="var(--paper)"/>
        <g fill="var(--paper)">
          <rect x="512" y="292" width="190" height="22" rx="11"/>
          <rect x="512" y="342" width="140" height="22" rx="11"/>
        </g>
      </g>
    </g></g>
  </svg>`,

  /* 12 — 경계를 사이에 둔 관계 */
  boundary: () => `
  <svg viewBox="0 0 900 620" preserveAspectRatio="xMidYMid meet">
    ${shadow(12)}
    <g filter="url(#ds12)"><g filter="url(#rg12)">
      ${person(190, 580, 1)}
      ${person(710, 580, 1)}
      <!-- 가운데 경계선 -->
      <path d="M450 190 V580" stroke="var(--red)" stroke-width="14"
            stroke-linecap="round" stroke-dasharray="30 26"/>
      <!-- 경계를 넘어 이어지는 악수 -->
      <g stroke="var(--figure)" stroke-width="30" stroke-linecap="round">
        <path d="M252 486 h130"/>
        <path d="M648 486 h-130"/>
      </g>
      <g>
        <rect x="378" y="452" width="144" height="68" rx="22" fill="var(--red)"/>
      </g>
    </g></g>
  </svg>`,

  /* 13 — 사방에서 들이미는 요청, 가운데서 받아내는 사람 (커버용) */
  swamped: () => `
  <svg viewBox="0 0 980 620" preserveAspectRatio="xMidYMid meet">
    ${shadow(13)}
    <g filter="url(#ds13)"><g filter="url(#rg13)">
      ${pushingHand(-60, 150, 14)}
      ${pushingHand(-50, 470, -12)}
      ${pushingHand(1040, 140, 166)}
      ${pushingHand(1030, 500, 194)}
      ${figure('tired', 490, 620, 560)}
    </g></g>
  </svg>`,

  /* 14 — 묻는 사람과 답해야 하는 사람 */
  twoPeople: () => `
  <svg viewBox="0 0 980 560" preserveAspectRatio="xMidYMid meet">
    ${shadow(14)}
    <g filter="url(#ds14)"><g filter="url(#rg14)">
      ${figure('asker', 250, 560, 500)}
      ${figure('listener', 720, 560, 500, true)}
    </g></g>
  </svg>`,

  /* 15 — 등 돌리고 떠나는 사람 */
  leaving: () => `
  <svg viewBox="0 0 980 560" preserveAspectRatio="xMidYMid meet">
    ${shadow(15)}
    <g filter="url(#ds15)"><g filter="url(#rg15)">
      ${figure('tired', 240, 560, 500)}
      <g opacity=".45">${figure('walkingaway', 740, 560, 500)}</g>
    </g></g>
  </svg>`,

  /* 16 — 기준을 말하는 사람 */
  standing: () => `
  <svg viewBox="0 0 980 560" preserveAspectRatio="xMidYMid meet">
    ${shadow(16)}
    <g filter="url(#ds16)"><g filter="url(#rg16)">
      ${figure('pointingup', 490, 560, 520)}
    </g></g>
  </svg>`,

};

if (typeof window !== 'undefined') window.ART = ART;
