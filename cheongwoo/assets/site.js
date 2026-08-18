/* ==========================================================================
   청우해장 — 화면 동작
   외부 라이브러리 없이 순수 자바스크립트로 씁니다. 의존성이 없으면
   깨질 일도 없고, 느린 모바일 회선에서도 먼저 뜹니다.
   ========================================================================== */
(function () {
  'use strict';
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return [].slice.call((c || document).querySelectorAll(s)); };

  /* ---- 상단바: 스크롤하면 배경을 채웁니다 ---- */
  var bar = $('#topbar');
  var hero = $('.hero');
  function onScroll() {
    var trigger = hero ? hero.offsetHeight * 0.72 : 120;
    bar.classList.toggle('solid', window.scrollY > trigger);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- 모바일 메뉴 ---- */
  var toggle = $('#menubtn'), gnb = $('#gnb');
  if (toggle && gnb) {
    toggle.addEventListener('click', function () {
      var open = gnb.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    $$('a', gnb).forEach(function (a) {
      a.addEventListener('click', function () {
        gnb.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- 스크롤 등장 ---- */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    $$('.rv').forEach(function (el, i) {
      el.style.transitionDelay = (Math.min(i % 4, 3) * 70) + 'ms';
      io.observe(el);
    });
  } else {
    $$('.rv').forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- 주소 복사 ---- */
  $$('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      var done = function () {
        var old = btn.getAttribute('data-label-copied');
        var span = $('span', btn) || btn;
        var prev = span.textContent;
        span.textContent = old;
        setTimeout(function () { span.textContent = prev; }, 2000);
        if (window.cwTrack) window.cwTrack('copyaddress', { label: text });
      };
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(done, done);
      } else {
        var ta = document.createElement('textarea');
        ta.value = text; document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); } catch (e) {}
        document.body.removeChild(ta); done();
      }
    });
  });

  /* ---- 갤러리 라이트박스 ---- */
  var lb = $('#lightbox');
  if (lb) {
    var lbImg = $('img', lb), lbCap = $('.lb-cap', lb);
    var figs = $$('.gal figure'), idx = 0;

    function show(i) {
      idx = (i + figs.length) % figs.length;
      var im = $('img', figs[idx]);
      lbImg.src = im.getAttribute('data-full') || im.src;
      lbImg.alt = im.alt;
      lbCap.textContent = im.alt;
      lb.classList.add('on');
      document.body.style.overflow = 'hidden';
    }
    function hide() { lb.classList.remove('on'); document.body.style.overflow = ''; lbImg.src = ''; }

    figs.forEach(function (f, i) {
      f.addEventListener('click', function () {
        show(i);
        if (window.cwTrack) window.cwTrack('gallery', { label: 'photo-' + (i + 1) }, { once: true });
      });
    });
    $('.lb-close', lb).addEventListener('click', hide);
    $('.lb-prev', lb).addEventListener('click', function (e) { e.stopPropagation(); show(idx - 1); });
    $('.lb-next', lb).addEventListener('click', function (e) { e.stopPropagation(); show(idx + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) hide(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('on')) return;
      if (e.key === 'Escape') hide();
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
    });
  }

  /* ---- 지도는 스크롤이 닿았을 때 불러옵니다 (첫 화면 속도 확보) ---- */
  var mapFrame = $('#map-frame');
  if (mapFrame && 'IntersectionObserver' in window) {
    var mio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.src = en.target.getAttribute('data-src');
          mio.unobserve(en.target);
        }
      });
    }, { rootMargin: '300px' });
    mio.observe(mapFrame);
  } else if (mapFrame) {
    mapFrame.src = mapFrame.getAttribute('data-src');
  }

  /* ---- 지금 영업 중인지 표시 (한국 시간 기준) ---- */
  var badge = $('#open-now');
  if (badge) {
    var kstNow = new Date(Date.now() + (new Date().getTimezoneOffset() * 60000) + 9 * 3600000);
    var mins = kstNow.getHours() * 60 + kstNow.getMinutes();
    var open = mins >= 11 * 60 && mins < 22 * 60;
    var onBreak = mins >= 15 * 60 && mins < 17 * 60;
    var state = onBreak ? 'break' : (open ? 'open' : 'closed');
    badge.textContent = badge.getAttribute('data-' + state) || '';
    badge.setAttribute('data-state', state);
  }
})();
