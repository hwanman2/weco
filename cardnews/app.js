/* 카드 DOM 생성 + 헤드라인 자동 맞춤 */

(function () {
  const set = window.CARD_SET;
  const total = String(set.cards.length).padStart(2, '0');
  const stage = document.getElementById('stage');

  set.cards.forEach((c, i) => {
    const el = document.createElement('section');
    el.className = 'card';
    el.dataset.theme = c.theme;
    el.dataset.index = i + 1;

    const headline = c.lines.map((l) => `<span class="ln">${l}</span>`).join('');

    let subBlock;
    if (c.layout === 'cover') {
      subBlock = `<div class="rule-block">
          <div class="bar"></div>
          <p class="sub">${c.sub}</p>
          <div class="bar"></div>
        </div>`;
    } else if (c.layout === 'tick') {
      subBlock = `<div class="tick"></div><p class="sub sub-only">${c.sub}</p>`;
    } else {
      subBlock = `<p class="sub sub-only">${c.sub}</p>`;
    }

    el.innerHTML = `
      <div class="fiber"></div>
      <div class="grain"></div>
      <div class="vignette"></div>
      <div class="inner">
        <div class="head">
          <h1>${headline}</h1>
          ${subBlock}
        </div>
        <div class="art">${window.ART[c.art]()}</div>
        <div class="page"><b>${String(i + 1).padStart(2, '0')}</b>/${total}</div>
        ${c.sign ? `<div class="sign">${c.sign}</div>` : ''}
      </div>`;

    stage.appendChild(el);
  });

  /* 일러스트 뷰박스를 실제 그림 경계에 맞춘다 (여백 없이 꽉 차게) */
  function fitArt() {
    document.querySelectorAll('.art svg').forEach((svg) => {
      const bb = svg.getBBox();
      const pad = 16;
      svg.setAttribute(
        'viewBox',
        `${bb.x - pad} ${bb.y - pad} ${bb.width + pad * 2} ${bb.height + pad * 2}`
      );
    });
  }

  /* 헤드라인이 가로폭을 넘으면 자동으로 줄인다 */
  function fit() {
    fitArt();
    document.querySelectorAll('.card h1').forEach((h1) => {
      const max = h1.clientWidth;
      let size = parseFloat(getComputedStyle(h1).fontSize);
      const widest = () => {
        let w = 0;
        h1.querySelectorAll('.ln').forEach((ln) => {
          const r = document.createRange();
          r.selectNodeContents(ln);
          w = Math.max(w, r.getBoundingClientRect().width);
        });
        return w;
      };
      let guard = 0;
      while (widest() > max && size > 40 && guard++ < 90) {
        size -= 2;
        h1.style.fontSize = size + 'px';
      }
    });
    document.documentElement.dataset.ready = '1';
  }

  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  else window.addEventListener('load', fit);
})();
