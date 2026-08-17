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

const ART = {

  /* 01 — 저울: 커피 한 잔 vs 몇 년의 경험 */
  scale: () => `
  <svg viewBox="0 0 900 640" preserveAspectRatio="xMidYMid meet">
    ${shadow(1)}
    <g filter="url(#ds1)"><g filter="url(#rg1)">
      <!-- 받침 -->
      <path d="M356 600 h188 l-30 -46 h-128z" fill="var(--paper)"/>
      <rect x="330" y="596" width="240" height="22" rx="11" fill="var(--paper)"/>
      <rect x="434" y="262" width="32" height="300" rx="8" fill="var(--paper)"/>
      <!-- 빔 (13도 기울어짐 : 왼쪽↑ 오른쪽↓) -->
      <g transform="rotate(13 450 250)">
        <rect x="140" y="238" width="620" height="24" rx="12" fill="var(--paper)"/>
        <circle cx="450" cy="250" r="26" fill="var(--paper-sh)"/>
      </g>
      <!-- 왼쪽(높은 쪽) 트레이 : 커피 한 잔 -->
      <rect x="72" y="176" width="176" height="16" rx="8" fill="var(--paper-sh)"/>
      ${cup(160, 176, 0.86)}
      <!-- 오른쪽(무거운 쪽) 트레이 : 쌓인 책 -->
      <rect x="640" y="312" width="204" height="16" rx="8" fill="var(--paper-sh)"/>
      ${book(742, 312, 196, 34)}
      ${book(742, 278, 210, 32)}
      ${book(742, 246, 184, 34)}
      ${book(742, 212, 204, 32)}
      ${book(742, 180, 190, 34)}
    </g></g>
  </svg>`,

  /* 02 — 커피는 건네지지만 지식은 넘어오지 않는다 */
  brokenFlow: () => `
  <svg viewBox="0 0 900 620" preserveAspectRatio="xMidYMid meet">
    ${shadow(2)}
    <g filter="url(#ds2)"><g filter="url(#rg2)">
      <!-- 커피를 내미는 사람 -->
      ${person(168, 580, 1)}
      <g stroke="var(--figure)" stroke-width="28" stroke-linecap="round">
        <path d="M232 494 h94"/>
      </g>
      ${cup(392, 548, 0.8)}
      <!-- 막힘 -->
      <g stroke="var(--red)" stroke-width="17" stroke-linecap="round">
        <path d="M496 470 l58 58"/>
        <path d="M554 470 l-58 58"/>
      </g>
      <!-- 지식을 안고 있는 사람 -->
      ${person(756, 580, 1)}
      <g>
        ${folder(626, 436, 176, 96)}
        <g transform="translate(748 516)">
          <rect x="-40" y="-12" width="80" height="66" rx="13" fill="var(--coal)"/>
          <path d="M-23 -12 v-22 a23 23 0 0 1 46 0 v22" stroke="var(--coal)" stroke-width="13" fill="none"/>
          <circle cx="0" cy="18" r="9" fill="var(--paper)"/>
        </g>
      </g>
    </g></g>
  </svg>`,

  /* 03 — 모래시계: 아래에 쌓인 돈과 시간 */
  hourglass: (c = {}) => `
  <svg viewBox="0 0 900 620" preserveAspectRatio="xMidYMid meet">
    ${shadow(3)}
    <g filter="url(#ds3)"><g filter="url(#rg3)">
      <rect x="300" y="40" width="300" height="26" rx="13" fill="var(--paper)"/>
      <rect x="300" y="554" width="300" height="26" rx="13" fill="var(--paper)"/>
      <path d="M330 66 h240 v42 l-96 186 v14 l96 186 v42 h-240 v-42 l96 -186 v-14 l-96 -186z"
            fill="none" stroke="var(--paper)" stroke-width="20" stroke-linejoin="round"/>
      <!-- 위쪽 남은 모래 -->
      <path d="M356 92 h188 l-72 140 h-44z" fill="var(--red)" opacity=".9"/>
      <!-- 떨어지는 줄기 -->
      <rect x="444" y="250" width="12" height="150" rx="6" fill="var(--red)"/>
      <!-- 아래 쌓인 것 : 모래 + 동전 -->
      <path d="M368 528 h164 l-52 -96 h-60z" fill="var(--red)"/>
      <g fill="var(--paper)">
        <ellipse cx="404" cy="512" rx="34" ry="12"/>
        <ellipse cx="404" cy="496" rx="34" ry="12"/>
        <ellipse cx="500" cy="518" rx="30" ry="11"/>
      </g>
      <!-- 연차 태그 -->
      <g transform="rotate(-8 690 210)">
        <rect x="612" y="168" width="184" height="84" rx="14" fill="var(--paper)"/>
        <text x="704" y="226" text-anchor="middle" font-family="PT" font-weight="900"
              font-size="54" fill="var(--coal)">${(c.tags || ['5년', '10년'])[0]}</text>
      </g>
      <g transform="rotate(7 200 380)">
        <rect x="112" y="338" width="184" height="84" rx="14" fill="var(--paper)"/>
        <text x="204" y="396" text-anchor="middle" font-family="PT" font-weight="900"
              font-size="54" fill="var(--coal)">${(c.tags || ['5년', '10년'])[1]}</text>
      </g>
    </g></g>
  </svg>`,

  /* 04 — 한 방향으로만 흐르는 관계, 사라지는 상대 */
  oneWay: () => `
  <svg viewBox="0 0 900 620" preserveAspectRatio="xMidYMid meet">
    ${shadow(4)}
    <g filter="url(#ds4)"><g filter="url(#rg4)">
      <!-- 받기만 하는 사람 -->
      ${person(180, 580, 1)}
      <!-- 품에 안은 상자 -->
      <g>
        <rect x="94" y="504" width="172" height="76" rx="12" fill="var(--red)"/>
        <rect x="94" y="504" width="172" height="22" rx="10" fill="var(--red-sh)"/>
      </g>
      <!-- 옆에 쌓인 상자 -->
      <g>
        <rect x="288" y="518" width="124" height="62" rx="10" fill="var(--red)" opacity=".8"/>
        <rect x="300" y="466" width="100" height="52" rx="10" fill="var(--red)" opacity=".55"/>
      </g>
      <!-- 한 방향 화살표 (점점 흐려짐) -->
      <g stroke="var(--figure)" fill="none" stroke-width="14" stroke-linecap="round" stroke-linejoin="round">
        <g opacity=".9"><path d="M700 322 h-236"/><path d="M506 296 l-42 26 l42 26"/></g>
        <g opacity=".5"><path d="M700 424 h-236"/><path d="M506 398 l-42 26 l42 26"/></g>
        <g opacity=".2"><path d="M700 526 h-236"/><path d="M506 500 l-42 26 l42 26"/></g>
      </g>
      <!-- 사라지는 사람 -->
      ${ghost(790, 580, 0.9)}
    </g></g>
  </svg>`,

  /* 05 — 각자 가진 것을 테이블에 올려놓는 자리 */
  table: () => `
  <svg viewBox="0 0 900 560" preserveAspectRatio="xMidYMid meet">
    ${shadow(5)}
    <g filter="url(#ds5)"><g filter="url(#rg5)">
      <!-- 테이블 뒤에 선 세 사람 -->
      ${person(158, 436, 0.9)}
      ${person(450, 436, 0.98)}
      ${person(742, 436, 0.9)}
      <!-- 테이블 -->
      <rect x="46" y="430" width="808" height="32" rx="16" fill="var(--paper)"/>
      <rect x="126" y="462" width="28" height="86" rx="10" fill="var(--paper-sh)"/>
      <rect x="746" y="462" width="28" height="86" rx="10" fill="var(--paper-sh)"/>
      <!-- 각자 테이블에 올려놓은 상자 -->
      <g>
        <rect x="104" y="356" width="108" height="74" rx="10" fill="var(--red)"/>
        <rect x="104" y="356" width="108" height="20" rx="8" fill="var(--red-sh)"/>
        <rect x="392" y="342" width="116" height="88" rx="10" fill="var(--red)"/>
        <rect x="392" y="342" width="116" height="22" rx="8" fill="var(--red-sh)"/>
        <rect x="690" y="362" width="104" height="68" rx="10" fill="var(--red)"/>
        <rect x="690" y="362" width="104" height="18" rx="8" fill="var(--red-sh)"/>
      </g>
    </g></g>
  </svg>`,

  /* 06 — 내 상자를 열어보는 사람 : 나는 무엇을 줄 수 있나 */
  openBag: () => `
  <svg viewBox="0 0 900 620" preserveAspectRatio="xMidYMid meet">
    ${shadow(6)}
    <g filter="url(#ds6)"><g filter="url(#rg6)">
      ${person(206, 580, 1.24)}
      <!-- 열린 상자 -->
      <g transform="translate(626 0)">
        <path d="M-150 434 h300 l-26 146 h-248z" fill="var(--coal)"/>
        <path d="M-150 434 h300 l30 -30 h-360z" fill="var(--paper-sh)"/>
        <path d="M-150 434 l-74 -46 l38 -30 l70 46z" fill="var(--paper-sh)"/>
        <path d="M150 434 l74 -46 l-38 -30 l-70 46z" fill="var(--paper-sh)"/>
      </g>
      <!-- 상자에서 떠오르는 것들 -->
      <g fill="var(--red)">
        <path d="M608 236 l22 46 l50 7 l-36 35 l9 50 l-45 -24 l-45 24 l9 -50 l-36 -35 l50 -7z"/>
        <circle cx="452" cy="286" r="24"/>
        <rect x="740" y="252" width="52" height="52" rx="11" transform="rotate(20 766 278)"/>
      </g>
    </g></g>
  </svg>`,

  /* 07 — 서로 주고받는 교환 */
  exchange: () => `
  <svg viewBox="0 0 900 620" preserveAspectRatio="xMidYMid meet">
    ${shadow(7)}
    <g filter="url(#ds7)"><g filter="url(#rg7)">
      ${person(150, 580, 0.92)}
      ${person(750, 580, 0.92)}
      <!-- 서로 뻗은 팔 -->
      <g stroke="var(--figure)" stroke-width="30" stroke-linecap="round">
        <path d="M206 498 h116"/>
        <path d="M694 498 h-116"/>
      </g>
      <!-- 주고받는 상자 -->
      <g>
        <rect x="306" y="446" width="140" height="96" rx="12" fill="var(--red)"/>
        <rect x="306" y="446" width="140" height="26" rx="10" fill="var(--red-sh)"/>
        <rect x="454" y="446" width="140" height="96" rx="12" fill="var(--paper)"/>
        <rect x="454" y="446" width="140" height="26" rx="10" fill="var(--paper-sh)"/>
      </g>
      <!-- 양방향 화살표 -->
      <g stroke="var(--red)" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path d="M318 588 h264"/>
        <path d="M360 562 l-42 26 l42 26"/>
        <path d="M540 562 l42 26 l-42 26"/>
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
