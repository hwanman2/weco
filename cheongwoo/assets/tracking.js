/* ==========================================================================
   청우해장 — 통합 전환 추적
   --------------------------------------------------------------------------
   한 번의 cwTrack() 호출로 메타 픽셀 · 구글 광고 · GA4 · 카카오에 동시에
   같은 이벤트를 보냅니다. 플랫폼별 이벤트 이름은 아래 EVENTS 표에서 매핑합니다.

   HTML 쪽에서는 버튼에 data-track="call" 만 붙이면 자동으로 잡힙니다.
   ========================================================================== */
(function () {
  'use strict';

  var CFG = window.CW_CONFIG || {};
  var log = function () {
    if (CFG.debug && window.console) console.log.apply(console, ['[cw]'].concat([].slice.call(arguments)));
  };

  /* ---------------------------------------------------------------------
     1. 이벤트 매핑표
     내부 이벤트 이름 → 각 광고 플랫폼의 표준 이벤트 이름
     --------------------------------------------------------------------- */
  var EVENTS = {
    // 전화 걸기 — 이 업종에서 가장 중요한 전환입니다.
    call:        { meta: 'Contact',       ga4: 'click_to_call',      kakao: 'completeRegistration', label: 'call',       value: 30000 },
    // 길찾기 — 실제 방문 의도가 매우 높은 신호입니다.
    directions:  { meta: 'FindLocation',  ga4: 'get_directions',     kakao: 'search',               label: 'directions', value: 25000 },
    // 예약 시도(네이버 예약 등 외부 예약 링크 클릭)
    reserve:     { meta: 'Schedule',      ga4: 'reservation_intent', kakao: 'purchase',             label: 'reserve',    value: 40000 },
    // 메뉴 열람 — 보조 전환. 리마케팅 모수 만들 때 씁니다.
    menu:        { meta: 'ViewContent',   ga4: 'view_menu',          kakao: 'viewContent',          label: 'menu',       value: 0 },
    // 갤러리 확대 / 주소 복사 / 언어 전환 / 깊은 스크롤 — 관심도 신호
    gallery:     { meta: 'ViewContent',   ga4: 'view_gallery',       kakao: null,                   label: null,         value: 0 },
    copyaddress: { meta: 'FindLocation',  ga4: 'copy_address',       kakao: null,                   label: null,         value: 0 },
    language:    { meta: null,            ga4: 'language_switch',    kakao: null,                   label: null,         value: 0 },
    engaged:     { meta: null,            ga4: 'scroll_deep',        kakao: null,                   label: null,         value: 0 },
    blog:        { meta: null,            ga4: 'outbound_blog',      kakao: null,                   label: null,         value: 0 },
  };

  /* ---------------------------------------------------------------------
     2. 유틸 — 스크립트 주입
     --------------------------------------------------------------------- */
  function inject(src, attrs) {
    var s = document.createElement('script');
    s.async = true;
    s.src = src;
    if (attrs) Object.keys(attrs).forEach(function (k) { s.setAttribute(k, attrs[k]); });
    document.head.appendChild(s);
    return s;
  }

  /* ---------------------------------------------------------------------
     3. 구글 (Consent Mode v2 → gtag → GA4 + Google Ads)
     --------------------------------------------------------------------- */
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  var hasGoogle = !!(CFG.ga4Id || CFG.googleAdsId);

  // 동의 기본값은 스크립트가 로드되기 전에 선언해야 효력이 있습니다.
  if (hasGoogle || CFG.gtmId) {
    gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
      region: CFG.consentRegions || [],
      wait_for_update: 500,
    });
    // 그 외 지역(한국 등)은 기본 허용
    gtag('consent', 'default', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted',
    });
    gtag('js', new Date());
  }

  if (hasGoogle) {
    inject('https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(CFG.ga4Id || CFG.googleAdsId));
    if (CFG.ga4Id) gtag('config', CFG.ga4Id, { send_page_view: true });
    if (CFG.googleAdsId) gtag('config', CFG.googleAdsId, { allow_enhanced_conversions: true });
    log('google loaded', CFG.ga4Id, CFG.googleAdsId);
  }

  // 구글 태그 매니저 (별도로 쓰는 경우)
  if (CFG.gtmId) {
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    inject('https://www.googletagmanager.com/gtm.js?id=' + encodeURIComponent(CFG.gtmId));
  }

  /* ---------------------------------------------------------------------
     4. 메타 픽셀
     --------------------------------------------------------------------- */
  if (CFG.metaPixelId) {
    (function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = true; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', CFG.metaPixelId);
    window.fbq('track', 'PageView');
    log('meta pixel loaded', CFG.metaPixelId);
  }

  /* ---------------------------------------------------------------------
     5. 카카오 픽셀 (선택)
     --------------------------------------------------------------------- */
  if (CFG.kakaoPixelId) {
    var ks = inject('//t1.daumcdn.net/adfit/static/kp.js');
    ks.onload = function () {
      try { window.kakaoPixel(CFG.kakaoPixelId).pageView(); } catch (e) { log('kakao init failed', e); }
    };
  }

  /* ---------------------------------------------------------------------
     6. 네이버 공통 측정 (선택)
     --------------------------------------------------------------------- */
  if (CFG.naverCommonId) {
    var nw = inject('//wcs.naver.net/wcslog.js');
    nw.onload = function () {
      try {
        if (!window.wcs_add) window.wcs_add = {};
        window.wcs_add.wa = CFG.naverCommonId;
        if (window.wcs) window.wcs_do();
      } catch (e) { log('naver init failed', e); }
    };
  }

  /* ---------------------------------------------------------------------
     7. 공개 API — cwTrack('call', {...})
     --------------------------------------------------------------------- */
  var fired = {};   // 같은 이벤트가 스크롤 등으로 중복 발사되는 것을 막습니다.

  function cwTrack(name, params, opts) {
    var map = EVENTS[name];
    if (!map) { log('unknown event', name); return; }
    params = params || {};
    opts = opts || {};

    if (opts.once) {
      if (fired[name]) return;
      fired[name] = true;
    }

    var payload = Object.assign({
      event_category: 'engagement',
      page_language: document.documentElement.lang || 'ko',
    }, params);

    // --- GA4 ---
    if (CFG.ga4Id && map.ga4) {
      gtag('event', map.ga4, payload);
    }

    // --- 구글 광고 전환 ---
    if (CFG.googleAdsId && map.label && CFG.googleAdsLabels && CFG.googleAdsLabels[map.label]) {
      gtag('event', 'conversion', {
        send_to: CFG.googleAdsId + '/' + CFG.googleAdsLabels[map.label],
        value: map.value || 0,
        currency: 'KRW',
      });
    }

    // --- 메타 픽셀 ---
    if (CFG.metaPixelId && map.meta && window.fbq) {
      var metaPayload = { content_name: params.label || name, content_category: 'restaurant' };
      if (map.value) { metaPayload.value = map.value; metaPayload.currency = 'KRW'; }
      window.fbq('track', map.meta, metaPayload);
    }

    // --- 카카오 ---
    if (CFG.kakaoPixelId && map.kakao && window.kakaoPixel) {
      try { window.kakaoPixel(CFG.kakaoPixelId)[map.kakao](); } catch (e) { /* noop */ }
    }

    log('track', name, payload);
  }
  window.cwTrack = cwTrack;

  /* ---------------------------------------------------------------------
     8. 자동 바인딩 — data-track 속성이 붙은 요소의 클릭을 잡습니다.
     --------------------------------------------------------------------- */
  document.addEventListener('click', function (e) {
    var el = e.target.closest && e.target.closest('[data-track]');
    if (!el) return;
    cwTrack(el.getAttribute('data-track'), {
      label: el.getAttribute('data-track-label') || el.textContent.trim().slice(0, 60),
      link_url: el.getAttribute('href') || '',
    });
  }, { passive: true });

  /* ---------------------------------------------------------------------
     9. 관심도 신호 — 75% 스크롤과 30초 체류를 각각 한 번씩 보냅니다.
     리마케팅 모수를 '진짜 관심 있는 방문자'로 좁히는 데 씁니다.
     --------------------------------------------------------------------- */
  var scrollBound = false;
  function onScroll() {
    var h = document.documentElement;
    var pct = (h.scrollTop + window.innerHeight) / h.scrollHeight;
    if (pct >= 0.75) {
      cwTrack('engaged', { depth: '75%' }, { once: true });
      window.removeEventListener('scroll', onScroll);
    }
  }
  if (!scrollBound) { window.addEventListener('scroll', onScroll, { passive: true }); scrollBound = true; }

  setTimeout(function () {
    if (!document.hidden) cwTrack('engaged', { depth: '30s' }, { once: false });
  }, 30000);
})();
