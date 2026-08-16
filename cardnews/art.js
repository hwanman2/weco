/* ===================================================================
   페이퍼컷 스타일 일러스트 라이브러리 (인라인 SVG)
   - 색은 카드 테마 변수(--paper/--coal/--red ...)를 그대로 상속받는다
   - 새 그림을 추가하려면 ART에 함수 하나만 더 붙이면 된다
   =================================================================== */

/* 종이 오려붙인 느낌의 그림자 필터 */
const shadow = (id) => `
  <filter id="ds${id}" x="-40%" y="-40%" width="200%" height="200%">
    <feDropShadow dx="8" dy="11" stdDeviation="8" flood-color="#000" flood-opacity=".34"/>
  </filter>`;

/* 커피잔 (cx = 중심, by = 바닥선, s = 배율) */
const cup = (cx, by, s = 1) => `
  <g transform="translate(${cx} ${by}) scale(${s})">
    <ellipse cx="0" cy="0" rx="86" ry="17" fill="var(--paper-sh)"/>
    <path d="M-78 -8 h156 a10 10 0 0 1 0 16 h-156 a10 10 0 0 1 0 -16z" fill="var(--paper)"/>
    <path d="M-52 -86 h104 l-13 74 a10 10 0 0 1 -10 8 h-58 a10 10 0 0 1 -10 -8z" fill="var(--paper)"/>
    <path d="M-52 -86 h104 l-3 17 h-98z" fill="var(--paper-sh)"/>
    <path d="M52 -76 a30 30 0 0 1 4 52" stroke="var(--paper)" stroke-width="13" fill="none" stroke-linecap="round"/>
    <g stroke="var(--paper)" stroke-width="7" stroke-linecap="round" opacity=".55" fill="none">
      <path d="M-20 -110 q-12 -18 0 -34"/>
      <path d="M6 -116 q-12 -18 0 -34"/>
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
const person = (cx, by, s = 1, body = 'var(--coal)', skin = 'var(--paper)') => `
  <g transform="translate(${cx} ${by}) scale(${s})">
    <rect x="-17" y="-176" width="34" height="38" fill="${skin}"/>
    <path d="M-78 0 v-84 a78 58 0 0 1 156 0 V0z" fill="${body}"/>
    <circle cx="0" cy="-208" r="56" fill="${skin}"/>
    <path d="M-57 -210 a57 57 0 0 1 114 0 l-17 0 a40 40 0 0 0 -80 0z" fill="${body}"/>
  </g>`;

/* 점선 실루엣 인물 (사라지는 사람) */
const ghost = (cx, by, s = 1) => `
  <g transform="translate(${cx} ${by}) scale(${s})" fill="none" stroke="var(--coal)"
     stroke-width="11" stroke-dasharray="24 21" stroke-linecap="round" opacity=".45">
    <path d="M-78 0 v-84 a78 58 0 0 1 156 0 V0"/>
    <circle cx="0" cy="-208" r="56"/>
  </g>`;

const ART = {

  /* 01 — 저울: 커피 한 잔 vs 몇 년의 경험 */
  scale: () => `
  <svg viewBox="0 0 900 640" preserveAspectRatio="xMidYMid meet">
    ${shadow(1)}
    <g filter="url(#ds1)">
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
    </g>
  </svg>`,

  /* 02 — 커피는 건네지지만 지식은 넘어오지 않는다 */
  brokenFlow: () => `
  <svg viewBox="0 0 900 620" preserveAspectRatio="xMidYMid meet">
    ${shadow(2)}
    <g filter="url(#ds2)">
      <!-- 커피를 내미는 사람 -->
      ${person(168, 580, 1)}
      <g stroke="var(--coal)" stroke-width="28" stroke-linecap="round">
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
    </g>
  </svg>`,

  /* 03 — 모래시계: 아래에 쌓인 돈과 시간 */
  hourglass: () => `
  <svg viewBox="0 0 900 620" preserveAspectRatio="xMidYMid meet">
    ${shadow(3)}
    <g filter="url(#ds3)">
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
              font-size="54" fill="var(--coal)">5년</text>
      </g>
      <g transform="rotate(7 200 380)">
        <rect x="112" y="338" width="184" height="84" rx="14" fill="var(--paper)"/>
        <text x="204" y="396" text-anchor="middle" font-family="PT" font-weight="900"
              font-size="54" fill="var(--coal)">10년</text>
      </g>
    </g>
  </svg>`,

  /* 04 — 한 방향으로만 흐르는 관계, 사라지는 상대 */
  oneWay: () => `
  <svg viewBox="0 0 900 620" preserveAspectRatio="xMidYMid meet">
    ${shadow(4)}
    <g filter="url(#ds4)">
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
      <g stroke="var(--coal)" fill="none" stroke-width="14" stroke-linecap="round" stroke-linejoin="round">
        <g opacity=".9"><path d="M700 322 h-236"/><path d="M506 296 l-42 26 l42 26"/></g>
        <g opacity=".5"><path d="M700 424 h-236"/><path d="M506 398 l-42 26 l42 26"/></g>
        <g opacity=".2"><path d="M700 526 h-236"/><path d="M506 500 l-42 26 l42 26"/></g>
      </g>
      <!-- 사라지는 사람 -->
      ${ghost(790, 580, 0.9)}
    </g>
  </svg>`,

  /* 05 — 각자 가진 것을 테이블에 올려놓는 자리 */
  table: () => `
  <svg viewBox="0 0 900 560" preserveAspectRatio="xMidYMid meet">
    ${shadow(5)}
    <g filter="url(#ds5)">
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
    </g>
  </svg>`,

  /* 06 — 내 상자를 열어보는 사람 : 나는 무엇을 줄 수 있나 */
  openBag: () => `
  <svg viewBox="0 0 900 620" preserveAspectRatio="xMidYMid meet">
    ${shadow(6)}
    <g filter="url(#ds6)">
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
    </g>
  </svg>`,

  /* 07 — 서로 주고받는 교환 */
  exchange: () => `
  <svg viewBox="0 0 900 620" preserveAspectRatio="xMidYMid meet">
    ${shadow(7)}
    <g filter="url(#ds7)">
      ${person(150, 580, 0.92)}
      ${person(750, 580, 0.92)}
      <!-- 서로 뻗은 팔 -->
      <g stroke="var(--coal)" stroke-width="30" stroke-linecap="round">
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
    </g>
  </svg>`,
};

if (typeof window !== 'undefined') window.ART = ART;
