# 이어서 할 일 (인수인계)

> 이 파일은 **맥 로컬에서 새로 연 Claude Code 세션**이 바로 이어받도록 쓴 것입니다.
> 앞선 작업은 전부 `claude/cheongwoo-haejang-website-n1gwvt` 브랜치에 있습니다.

---

## 지금까지 된 것

대구 중구 남성로 11 **한식당 청우해장**의 다국어 홈페이지를 만들었습니다.
`cheongwoo/` 폴더 안에 전부 들어 있고, `node build.mjs` 하나로 5개 언어가 나옵니다.

- 한국어 · English · 日本語 · 简体中文 · **繁體中文(대만)** — 각각 독립 HTML + hreflang
- 전화 예약 / 네이버·카카오·구글 길찾기 / OpenStreetMap 임베드
- 메타 픽셀 · 구글 광고 · GA4 · 카카오 통합 추적 (`assets/config.js` 에 ID만 넣으면 작동)
  - 세션당 1회 전환 집계, 캠페인 파라미터 동봉, 내부 트래픽 제외
- 구조화 데이터 5종, 약전골목·근대골목 역사 섹션, FAQ
- 상세 문서: `README.md`(운영) `MARKETING.md`(키워드·광고) `DOMAIN.md`(도메인)

---

## 남은 일 — 이 순서대로

### 1. GitHub 저장소 만들고 홈페이지 옮기기 ★ 지금 여기

**도메인 `cheongwoohaejang.com` 을 가비아에서 이미 구매했습니다.**

GitHub Pages 는 저장소 하나당 커스텀 도메인 하나입니다. 지금 `weco` 저장소에
도메인을 붙이면 위코컴퍼니 사이트까지 통째로 옮겨가므로, 청우해장만 떼어냅니다.

준비는 끝나 있습니다 — `cheongwoo/` 폴더는 상위 폴더에 의존하지 않습니다
(사진이 `cheongwoo/images/` 안에 있고 `imgBase` 가 비어 있음).

```bash
# 1) 저장소 생성 (로컬에서 gh CLI 가 인증돼 있으면 바로 됩니다)
gh repo create hwanman2/cheongwoo-haejang --public \
  --description "청우해장 — 대구 중구 약전골목 한식당 공식 홈페이지"

# 2) 폴더만 떼어 새 저장소로
cd /경로/weco/cheongwoo
python3 - <<'PY'
p='src/store.mjs'; s=open(p,encoding='utf-8').read()
s=s.replace("  customDomain: '',", "  customDomain: 'cheongwoohaejang.com',")
open(p,'w',encoding='utf-8').write(s)
PY
node build.mjs          # CNAME · robots.txt · sitemap 이 새 도메인으로 갱신됩니다

# 3) 새 저장소에 첫 커밋
rm -rf /tmp/cwh && cp -r . /tmp/cwh && cd /tmp/cwh && rm -rf .git
git init -b main && git add -A
git commit -m "청우해장 공식 홈페이지 (5개 언어)"
git remote add origin https://github.com/hwanman2/cheongwoo-haejang.git
git push -u origin main
```

그 다음 **저장소 Settings → Pages → Custom domain** 에 `cheongwoohaejang.com`
입력하고 **Enforce HTTPS** 체크. (인증서 발급에 최대 24시간)

**가비아 DNS 설정** — `DOMAIN.md` 3번에 값이 있습니다. A 레코드 4개 + www CNAME.

옮긴 뒤 `weco` 저장소에서는 `cheongwoo/` 폴더를 지우고,
`index.html` 의 포트폴리오 카드 링크를 `https://cheongwoohaejang.com` 으로,
`sitemap.xml`·`robots.txt` 의 `/weco/cheongwoo/` 항목도 정리해야 합니다.

### 2. 네이버 플레이스에서 영업시간·가격 확정본 가져오기 ★ 중요

**클라우드 세션에서는 네이버·카카오·다이닝코드 접속이 전부 차단돼 못 했습니다.
로컬에서는 됩니다.**

현재 홈페이지 값은 블로그 후기와 매장 벽면 포스터 사진에서 읽은 **임시값**입니다.
출처마다 어긋납니다 — 마감이 22시 vs 23시, 갈비탕이 12,000원 vs 13,000원.
자세한 비교표는 `README.md` 8번에 있습니다.

플레이스에서 확인해 `src/store.mjs` 의 `hours` 와 `menu` 를 고치고 다시 빌드하면
5개 언어와 구조화 데이터가 한 번에 맞춰집니다.
받을 항목은 `PLACE-정보-붙여넣기.md` 에 정리돼 있습니다.

같이 채울 것: `naverPlaceId`, `googleCid`, `naverBookingUrl`

### 3. 음식 사진 넣기 ★ 효과 큼

지금 첫 화면은 **매장 외관**입니다. 음식 사진이 하나도 없어서입니다.
식당 홈페이지는 첫 화면이 음식일 때 가장 강합니다.

```js
// src/store.mjs
export const hero = {
  src: 'images/cheongwoo-food-01.jpg',
  kind: 'food',            // 'food' 로 두면 어둠이 왼쪽으로 쏠려 요리가 안 가려집니다
  position: 'center 55%',
  width: 1600, height: 1067,
};
```

사진 출처 주의 — `README.md` 3번에 정리돼 있습니다.
- ✅ 스마트플레이스에 사장님이 올린 사진 (가게가 저작권자)
- ✅ 맥에 있는 원본
- ❌ 손님·블로거 후기 사진 (저작권 문제)

메뉴별 사진은 `menu` 배열의 `img: null` 을 채우면 됩니다.

### 4. 검색엔진 등록

`README.md` 5번 절차대로. 소유확인 코드는 `assets/config.js` 가 아니라
**`src/store.mjs`** 에 넣어야 `<meta>` 태그가 됩니다.

### 5. 광고 픽셀 ID 입력 후 캠페인

`assets/config.js` 에 메타 픽셀 · 구글 광고 · GA4 ID 입력.
캠페인 설계와 제외 키워드는 `MARKETING.md`.

**도메인 연결을 끝낸 뒤에 광고를 시작해야 합니다.** 먼저 돌리고 나중에 옮기면
전환 학습이 초기화되고 리마케팅 모수를 잃습니다.

---

## 확인이 필요한 사항 (사장님께)

`README.md` 8번에 표로 정리돼 있습니다. 요약하면:

- 영업시간 22시 vs 23시 — 출처 불일치
- 갈비탕 12,000 vs 13,000원, 「청우 보약 갈비탕」이 실제 있는 메뉴인지
- 정기 휴무일 (확인된 정보 없음 → 현재 연중무휴로 표기)
- 가게 앞 주차 1~2대 가능 여부
- 간판 한자 — 사진 확대로는 **靑友解酲**, 인스타 계정명은 淸友解酲
- 인스타 `instagram.com/chungwoo.official` 이 공식 계정 맞는지

---

## 작업 원칙 (앞 세션에서 지킨 것)

- HTML 을 직접 고치지 말 것. `src/` 데이터를 고치고 `node build.mjs`.
- 확인되지 않은 가격은 넣지 말 것. 「가격 문의」로 두는 편이 낫습니다.
  틀린 가격은 계산대에서 손님과 분쟁이 됩니다.
- 음식 사진이 없다고 인테리어 사진을 음식 자리에 넣지 말 것.
  손님이 헷갈리고 구조화 데이터도 틀어집니다.
- 외부 JS 라이브러리를 쓰지 않습니다. 글꼴 두 개(Pretendard, Noto Serif KR)뿐입니다.
