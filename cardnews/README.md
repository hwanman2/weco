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
  // sign: '브랜드명',      // 넣으면 하단에 서명이 붙는다 (기본은 없음)
}
```

- 일부 그림은 원고에서 라벨을 바꿀 수 있다. 예) `art: 'hourglass'` 에
  `tags: ['30분', '또 30분']` 을 함께 주면 모래시계 옆 태그가 바뀐다.
- 헤드라인은 **줄 단위로 직접 끊는다.** 가로폭을 넘으면 자동으로 글자 크기가 줄어든다.
- 장수는 `cards` 배열 길이대로 잡히고 `01/07` 표기도 자동 계산된다.

## 지금 들어 있는 원고

| 세트 | 내용 |
|---|---|
| `networking` | 네트워킹을 착각하는 사람들 (7장) |
| `brainpick` | "노하우 좀 알려주세요" 거절법 (7장) |
| `givefirst-en` | Give first — your knowledge has a price (영문 7장) |
| `fifthtime` | 다섯 번째 "잠깐만 물어봐도 돼요?" (7장) |
| `coffeechat` | 커피챗 요청, 다 받아주고 계신가요? (7장) |

## 새 카드셀 만들기

1. `cardnews/sets/새이름.js` 를 만들고 `window.CARD_SET = { ... }` 작성
2. `node cardnews/render.mjs 새이름`

영문 원고는 세트에 `lang: 'en'` 을 넣는다. 크림 카드 헤드라인이
Black Han Sans 대신 Anton 으로 바뀌고 자간이 라틴에 맞게 조정된다.

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

## 영상에서 자료 뽑기

이 환경은 유튜브 도메인이 네트워크 정책으로 막혀 있다(프록시 경유·직접 연결 모두 403).
대신 **화면 녹화 파일을 받아 프레임을 뽑아 읽는** 경로가 열려 있다.

```bash
pip install imageio-ffmpeg
python3 - <<'EOF'
import imageio_ffmpeg, subprocess, os
FF = imageio_ffmpeg.get_ffmpeg_exe()
os.makedirs('frames', exist_ok=True)
# 3초에 한 장씩 뽑기 (자막을 켜고 녹화했다면 프레임에서 자막이 읽힌다)
subprocess.run([FF, '-y', '-i', '녹화파일.mp4', '-vf', 'fps=1/3', 'frames/f_%03d.png'], check=True)
EOF
```

뽑힌 PNG를 Read 로 열면 화면의 글자까지 그대로 읽을 수 있다.
**녹화할 때 자막(CC)을 켜두는 것이 핵심** — 말로만 나온 내용은 프레임에 남지 않는다.

## 인물 일러스트 (오픈소스)

도형으로 그린 사람은 표정도 자세도 없어서 공감이 안 붙는다.
그래서 **Humaaans** 를 가져다 쓴다.

- 패키지 : [`humaaans`](https://www.npmjs.com/package/humaaans) (MIT)
- 원작 아트워크 : **Humaaans by Pablo Stanley** — CC BY 4.0
  (상업적 사용 가능, **출처 표기 필요**)
- 조합 가능 수 : 머리 18종 × 상의 10종 × 하의 8종

`React.createElement` 로 컴파일된 모듈을 SVG 문자열로 뽑아
`cardnews/figures/*.svg` 와 `cardnews/figures.js` 로 저장한다.

```bash
cd /tmp && npm i humaaans
node cardnews/tools/extract-humaaans.mjs /tmp/node_modules/humaaans
```

색은 부위별로 팔레트 변수에 매핑된다 —
머리는 `--figure-hair`, 피부는 `--figure-skin`, 상의의 주된 색만 `--red`,
나머지 옷은 `--figure`. 그래서 다크·크림 카드 양쪽에서 자동으로 맞는다.

일러스트 안에서 쓰려면:

```js
figure('tired', 490, 620, 560)        // 이름, 가로중심, 발밑, 키
figure('listener', 720, 560, 500, true)  // 마지막 인자 true = 좌우반전
```

새 조합이 필요하면 `tools/extract-humaaans.mjs` 의 `FIGURES` 에 추가한다.

## 폰트

`cardnews/fonts/` 의 woff2는 KS X 1001 한글 2350자 + 라틴으로 서브셋한 것.
- Pretendard (OFL) — Black / Bold / Medium / Regular
- Black Han Sans (OFL) — 국문 크림 카드 헤드라인
- Anton (OFL) — 영문 크림 카드 헤드라인 (라틴 서브셋)

한글 상용 글자는 전부 들어 있어 문구를 바꿔도 그대로 쓸 수 있다.
