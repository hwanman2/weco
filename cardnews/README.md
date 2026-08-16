# 카드뉴스 제작 템플릿

인스타 캐러셀용 카드셀을 HTML/CSS로 만들고 PNG(1080×1350)로 뽑아내는 도구.
문구만 바꾸면 같은 디자인으로 다음 카드셀이 계속 나온다.

## 디자인 규칙

| 항목 | 값 |
|---|---|
| 캔버스 | 1080 × 1350 (4:5) |
| 배경 | 다크 `#17140f` ↔ 크림 `#f1e8d9` 교차 |
| 포인트 | 버밀리언 `#ee4f31` / `#e8492c` |
| 헤드라인 | 다크 = Pretendard Black · 크림 = Black Han Sans |
| 서브카피 | Pretendard Medium 38px |
| 질감 | 종이 그레인 + 섬유결 + 비네트 (CSS 레이어) |
| 하단 | `01/07` 인디케이터 (앞 숫자만 빨강) |

## 뽑는 법

```bash
node cardnews/render.mjs networking
# → cardnews/out/networking-01.png … -07.png
```

브라우저에서 눈으로 확인하려면:

```bash
npx http-server . -p 8080     # http://localhost:8080/cardnews/?set=networking
```

## 문구 고치기

`cardnews/sets/<이름>.js` 하나만 건드리면 된다.

```js
{
  theme: 'dark',            // dark | cream  (교차 배치가 기본)
  layout: 'standard',       // cover(헤어라인) | standard | tick(빨강 밑줄)
  art: 'scale',             // art.js 의 ART 키
  lines: ['커피 한 잔에', '<em>몇 년의 경험</em>이 넘어올까?'],   // <em> 안이 빨강
  sub: '네트워킹을 착각하는 사람들',
  sign: '위코컴퍼니',        // 있으면 하단에 브랜드 서명 (보통 마지막 장만)
}
```

- 헤드라인은 **줄 단위로 직접 끊는다.** 가로폭을 넘으면 자동으로 글자 크기가 줄어든다.
- 장수는 `cards` 배열 길이대로 잡히고 `01/07` 표기도 자동 계산된다.

## 지금 들어 있는 원고

| 세트 | 내용 |
|---|---|
| `networking` | 네트워킹을 착각하는 사람들 (7장) |
| `brainpick` | "노하우 좀 알려주세요" 거절법 (7장) |

## 새 카드셀 만들기

1. `cardnews/sets/새이름.js` 를 만들고 `window.CARD_SET = { ... }` 작성
2. `node cardnews/render.mjs 새이름`

## 그림 추가하기

`cardnews/art.js` 의 `ART` 객체에 SVG를 반환하는 함수를 추가한다.
색은 `var(--paper)` `var(--coal)` `var(--red)` 등 테마 변수를 쓰면
다크/크림 카드 양쪽에서 알아서 맞는 색으로 나온다.
뷰박스는 렌더할 때 그림 실제 경계에 맞춰 자동 보정되므로 대충 잡아도 된다.

재사용 부품: `cup()` 커피잔 · `book()` 책 · `folder()` 폴더 ·
`person()` 인물 · `ghost()` 점선 인물

**색 고르는 기준**
- `--figure` : 배경 위에 바로 놓이는 실루엣·팔·화살표 (다크=크림 / 크림=차콜, 자동 반전)
- `--paper` `--paper-sh` : 종이·컵·서류 같은 밝은 오브젝트
- `--coal` : 밝은 오브젝트 **위에** 얹는 글자와 아이콘 (양쪽 테마 모두 어두운 색)
- `--red` `--red-sh` : 포인트

## 폰트

`cardnews/fonts/` 의 woff2는 KS X 1001 한글 2350자 + 라틴으로 서브셋한 것.
- Pretendard (OFL) — Black / Bold / Medium / Regular
- Black Han Sans (OFL)

한글 상용 글자는 전부 들어 있어 문구를 바꿔도 그대로 쓸 수 있다.
