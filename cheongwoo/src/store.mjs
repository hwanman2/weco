// ---------------------------------------------------------------------------
// 청우해장 — 매장 원본 데이터 (Single Source of Truth)
// 이 파일만 고치고 `node build.mjs` 를 돌리면 4개 언어 페이지가 전부 갱신됩니다.
// ---------------------------------------------------------------------------

export const site = {
  // GitHub Pages 로 배포되는 실제 주소. 도메인을 새로 사면 이 값만 바꾸세요.
  baseUrl: 'https://hwanman2.github.io/weco/cheongwoo/',
  parentUrl: 'https://hwanman2.github.io/weco/',
  defaultLang: 'ko',
  langs: ['ko', 'en', 'ja', 'zh', 'tw'],
  // 언어별 파일명. 기본 언어는 index.html 로 뽑습니다.
  file: { ko: 'index.html', en: 'en.html', ja: 'ja.html', zh: 'zh.html', tw: 'tw.html' },
  // 검색엔진에 노출할 hreflang 코드
  hreflang: { ko: 'ko-KR', en: 'en', ja: 'ja', zh: 'zh-Hans', tw: 'zh-Hant' },
};

export const store = {
  nameKo: '청우해장',
  nameHanja: '靑友解酲',
  legalKo: '한식당 청우해장',
  branchKo: '진청우해장 종로본점',

  // 연락처 — 간판 번호(053)를 대표로, 안심번호(0507)는 예비로 둡니다.
  telDisplay: '053-255-7052',
  telHref: '+82532557052',
  telSafeDisplay: '0507-1380-7052',
  telSafeHref: '+8250713807052',

  // 주소
  roadKo: '대구광역시 중구 남성로 11',
  roadEn: '11 Namseong-ro, Jung-gu, Daegu, South Korea',
  jibunKo: '대구광역시 중구 남성로 82',
  areaKo: '약령시·약전골목 / 반월당역 도보권',
  postalCode: '41945',
  region: 'KR-27',

  // 좌표 (네이버 지역검색 API 기준)
  lat: 35.8687847,
  lng: 128.5884600,

  // 외부 플레이스 식별자
  kakaoPlaceId: '983201124',
  // 아래 두 값은 사장님 계정에서 확인 후 채우면 버튼이 자동으로 살아납니다.
  naverPlaceId: '',        // 네이버 스마트플레이스 ID (예: '1234567890')
  naverBookingUrl: '',     // 네이버 예약 URL
  instagramUrl: '',
  naverBlogUrl: 'https://blog.naver.com/zzyy004',

  // 영업 정보
  hours: { open: '11:00', close: '22:00', breakStart: '15:00', breakEnd: '17:00', lastOrder: '21:00' },
  openDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],

  priceRange: '₩₩',
  currency: 'KRW',
  seats: 40,          // 40명 이하 단체 예약 가능
  parking: false,     // 전용 주차장 없음 → 인근 공영주차장
};

// 대표 메뉴. price 가 null 이면 "가격 문의" 로 표시됩니다.
// 사진(매장 벽면 메뉴 포스터)에서 확인된 가격만 숫자로 넣었습니다.
// img 는 음식 사진을 확보하면 채우세요. 지금은 매장 사진밖에 없어 비워 둡니다.
export const menu = [
  { id: 'clear',    price: 12000, img: null, signature: true },
  { id: 'spicy',    price: 12000, img: null, signature: true },
  { id: 'galbitang',price: 12000, img: null, signature: true },
  { id: 'kalguksu', price: 12000, img: null, signature: false },
  { id: 'ribs',     price: 47000, img: null, signature: true },
  { id: 'oxtail',   price: null,  img: null, signature: false },
  { id: 'suyuk',    price: null,  img: null, signature: false },
  { id: 'naengmyeon',price: null, img: null, signature: false },
];

// 갤러리 — 위코컴퍼니가 시공/촬영한 실제 매장 사진
export const gallery = [
  { src: 'images/cheongwoo-02.jpg', key: 'exterior',  w: 1600, h: 1067 },
  { src: 'images/cheongwoo-01.jpg', key: 'hall',      w: 1600, h: 1067 },
  { src: 'images/cheongwoo-05.jpg', key: 'counter',   w: 1600, h: 1067 },
  { src: 'images/cheongwoo-07.jpg', key: 'menuwall',  w: 1067, h: 1600 },
  { src: 'images/cheongwoo-03.jpg', key: 'window',    w: 1600, h: 1067 },
  { src: 'images/cheongwoo-04.jpg', key: 'aisle',     w: 1067, h: 1600 },
  { src: 'images/cheongwoo-06.jpg', key: 'kitchen',   w: 1600, h: 1067 },
  { src: 'images/cheongwoo-08.jpg', key: 'through',   w: 1600, h: 1067 },
  { src: 'images/cheongwoo-09.jpg', key: 'table',     w: 1067, h: 1600 },
  { src: 'images/cheongwoo-10.jpg', key: 'door',      w: 1067, h: 1600 },
];

export const hero = 'images/cheongwoo-02.jpg';
export const ogImage = 'images/cheongwoo-02.jpg';

// 이미지가 상위 폴더(/weco/images/)에 있으므로 경로 앞에 ../ 를 붙입니다.
export const imgBase = '../';
