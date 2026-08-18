# 청우해장 홈페이지

대구 중구 남성로 11 · 한식당 청우해장의 다국어 홈페이지입니다.
GitHub Pages 로 그대로 서비스됩니다 — 별도 서버도, 도메인 구매도 필요 없습니다.

**주소** https://hwanman2.github.io/weco/cheongwoo/

| 언어 | 파일 | 대상 |
|---|---|---|
| 한국어 | `index.html` | 국내 손님 · 네이버 검색 |
| English | `en.html` | 영어권 관광객 |
| 日本語 | `ja.html` | 일본 관광객 |
| 简体中文 | `zh.html` | 중국 본토 |
| 繁體中文 | `tw.html` | **대만 · 홍콩** |

---

## 1. 내용을 고치는 방법

HTML 을 직접 고치지 마세요. `src/` 안의 데이터 파일을 고치고 다시 빌드하면
다섯 개 언어가 한 번에 맞춰집니다.

```bash
cd cheongwoo
node build.mjs        # Node 18 이상이면 그대로 실행됩니다. 설치할 패키지 없음.
```

| 무엇을 바꾸려면 | 어느 파일을 |
|---|---|
| 전화번호 · 주소 · 영업시간 · 좌표 · 네이버 예약 링크 | `src/store.mjs` |
| 메뉴 이름 · 설명 · 가격 | `src/store.mjs`(가격) + `src/i18n.mjs`(이름·설명) |
| 한국어/영어/일본어/중국어 문안 | `src/i18n.mjs` |
| 대만(번체) 문안 | `src/i18n.tw.mjs` |
| 약전골목·근대골목 이야기, 주변 관광지 | `src/hood.mjs` |
| 광고 픽셀 ID | `assets/config.js` (빌드 불필요) |
| 디자인 | `assets/site.css` (빌드 불필요) |

빌드하면 `sitemap.xml` 도 같이 다시 만들어집니다.

---

## 2. 지금 바로 채워야 할 값

`src/store.mjs` 에 비어 있는 항목입니다. 채우면 해당 버튼이 자동으로 나타납니다.

```js
naverPlaceId:    '',   // 네이버 스마트플레이스 ID → 지도 버튼이 플레이스로 직행
naverBookingUrl: '',   // 네이버 예약 URL → 「네이버 예약」 버튼 생성
instagramUrl:    '',   // 인스타그램
```

네이버 플레이스 ID 는 네이버지도에서 매장을 검색했을 때 주소창의
`map.naver.com/p/entry/place/**1234567890**` 숫자입니다.

---

## 3. 사진

지금 홈페이지에 쓰인 사진은 위코컴퍼니가 시공·촬영한 **매장 사진 10장**입니다
(`../images/cheongwoo-01.jpg` ~ `-10.jpg`).

**음식 사진은 아직 없습니다.** 맥에 있는 사진이나 매장에서 새로 찍은 사진을 넣으려면:

1. `weco/images/` 폴더에 `cheongwoo-food-01.jpg` 같은 이름으로 넣습니다
   (가로 1600px 정도, 1장당 500KB 이하 권장).
2. `src/store.mjs` 의 `menu` 배열에서 해당 메뉴의 `img: null` 을
   `img: 'images/cheongwoo-food-01.jpg'` 로 바꿉니다.
3. `node build.mjs` 를 다시 돌립니다.

메뉴는 현재 사진 없이 글자만으로 조판돼 있습니다. 음식 사진이 없는데
인테리어 사진을 음식 자리에 넣으면 손님이 헷갈리고, 구글 구조화 데이터에도
잘못된 정보가 들어가기 때문에 일부러 비워 두었습니다.

---

## 4. 광고 픽셀 붙이기

`assets/config.js` 하나만 고치면 됩니다. 값이 비어 있으면 그 플랫폼 스크립트는
아예 로드되지 않으므로, 쓰는 것만 채우면 됩니다.

```js
metaPixelId: '1234567890',          // 메타(페이스북·인스타) 픽셀
googleAdsId: 'AW-1234567890',       // 구글 광고
googleAdsLabels: { call:'AbC...', directions:'DeF...', reserve:'GhI...' },
ga4Id: 'G-XXXXXXXXXX',              // 구글 애널리틱스 4
```

자세한 전환 설계와 캠페인 운영법은 **`MARKETING.md`** 를 보세요.

### 잘 붙었는지 확인하는 법
- `config.js` 에서 `debug: true` 로 바꾸면 브라우저 콘솔에 이벤트가 찍힙니다.
- 메타: Chrome 확장 **Meta Pixel Helper**
- 구글: **Google Tag Assistant** 또는 GA4 실시간 보고서

---

## 5. 검색엔진 등록 (한 번만 하면 됩니다)

1. **네이버 서치어드바이저** (searchadvisor.naver.com)
   - 사이트 등록 → `https://hwanman2.github.io/weco/cheongwoo/`
   - 소유확인 코드를 받으면 `assets/config.js` 의 `naverSiteVerification` 에 넣고
     `node build.mjs` 재실행
   - 사이트맵 제출: `https://hwanman2.github.io/weco/cheongwoo/sitemap.xml`
2. **구글 서치콘솔** (search.google.com/search-console)
   - 같은 방식. 코드는 `googleSiteVerification` 에.
   - 리치 결과 테스트로 구조화 데이터 확인:
     search.google.com/test/rich-results
3. **네이버 스마트플레이스 · 구글 비즈니스 프로필**
   - 두 곳 모두 「웹사이트」 칸에 위 주소를 넣어 주세요.
     지도에서 홈페이지로 들어오는 경로가 생기고, 검색엔진이 두 정보를
     같은 가게로 묶어 인식합니다. 이게 지역 검색에서 제일 큰 한 방입니다.

---

## 6. 구조

```
cheongwoo/
├─ build.mjs           빌드 스크립트 (의존성 없음)
├─ src/
│  ├─ store.mjs        매장 정보 원본 — 전화·주소·시간·메뉴·좌표
│  ├─ i18n.mjs         한국어/영어/일본어/중국어 문안
│  ├─ i18n.tw.mjs      대만(번체) 문안
│  └─ hood.mjs         약전골목·근대골목 역사와 주변 관광 코스
├─ assets/
│  ├─ site.css         스타일
│  ├─ site.js          화면 동작 (외부 라이브러리 없음)
│  ├─ config.js        ★ 광고·측정 ID — 여기만 고치면 픽셀이 붙습니다
│  └─ tracking.js      메타·구글·카카오·네이버 통합 전환 추적
├─ index.html en.html ja.html zh.html tw.html    ← 생성물
└─ sitemap.xml                                    ← 생성물
```

외부 라이브러리는 **글꼴 두 개**(Pretendard, Noto Serif KR)뿐이고
자바스크립트 라이브러리는 하나도 쓰지 않습니다. 느린 모바일 회선에서도
먼저 뜨고, 라이브러리가 깨져서 사이트가 죽는 일도 없습니다.

---

## 7. 지도에 대해

지도 임베드는 **OpenStreetMap**(오픈소스, API 키 불필요)을 씁니다.
어느 나라에서 접속해도 뜨고, 키 만료로 지도가 깨질 일이 없습니다.

손님이 실제로 누르는 **길찾기 버튼은 네이버지도 · 카카오맵 · 구글지도**
세 곳으로 각각 직행합니다. 한국 손님은 네이버/카카오, 외국인은 구글을 씁니다.

> 카카오맵을 홈페이지 안에 직접 띄우고 싶다면 developers.kakao.com 에서
> JavaScript 키를 발급받고 `hwanman2.github.io` 를 플랫폼 도메인으로 등록한 뒤
> `assets/site.js` 의 지도 로딩부를 카카오 SDK 로 교체하면 됩니다.
> 다만 지금 방식이 관리가 편하고 고장이 없습니다.

---

## 8. 알아 둘 것

- **가격**: 12,000원 / 47,000원은 매장 벽면 메뉴 포스터 사진에서 읽은 값입니다.
  바뀌었으면 `src/store.mjs` 에서 고쳐 주세요. 확인되지 않은 메뉴는
  「가격 문의」로 표시됩니다.
- **영업시간**: 11:00–22:00, 브레이크 15:00–17:00, 라스트오더 21:00
  (2026년 8월 블로그 후기 기준). 바뀌면 `src/store.mjs` 의 `hours` 를 고치세요.
  홈페이지 상단의 「영업 중 / 브레이크타임 / 영업 종료」 배지는
  이 값이 아니라 `assets/site.js` 안에 적힌 시간을 봅니다 — 시간이 바뀌면
  두 곳을 같이 고쳐 주세요.
- **휴무일**: 확인된 정보가 없어 연중무휴로 적었습니다. 정기 휴무가 있으면
  꼭 알려 주세요. 헛걸음한 손님은 리뷰로 돌아옵니다.
