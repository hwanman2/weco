/* ===================================================================
   카드셀 원고 — 「Pick Your Brain」 7장 압축본
   9장본(pickyourbrain)과 같은 원문. 순서만 바꿨다.

   바꾼 이유
   - 커버를 용어 소개("Pick Your Brain이란")에서 상황("커피 한잔하시죠")으로 교체.
     피드에서 스치는 사람을 잡는 건 정보가 아니라 겪어본 장면이다.
   - 질문 나열 카드를 02로 끌어올렸다. 태그와 공유가 터진다면 여기서 터진다.
   - 킬러 문장(커피값/경험값)을 08 → 05 로 당겼다. 뒤로 갈수록 이탈하니까.
   - 용어 설명은 캡션 첫 줄로 내린다.
   =================================================================== */

window.CARD_SET = {
  name: 'pickyourbrain-short',
  ratio: [1080, 1350],
  cards: [
    {
      theme: 'dark', layout: 'cover', art: 'twoPeople',
      lines: ['“커피 한잔하시죠”', '<em>“술 한잔하시죠”</em>'],
      sub: '처음엔 가볍게 만나는 자리인 줄 알았다',
    },
    {
      theme: 'cream', layout: 'standard', art: null,
      lines: ['어느 순간부터 대화가 아니라', '<em>질문</em>만 이어진다'],
      items: [
        '“그건 어떻게 시작했어요?”',
        '“그쪽에서는 보통 어떻게 해요?”',
        '“이런 상황에서는 어떻게 해야 돼요?”',
        '“그 사람은 어떻게 알게 됐어요?”',
        '“저라면 뭘 먼저 하는 게 좋을까요?”',
      ],
    },
    {
      theme: 'dark', layout: 'tick', art: 'askFirst',
      lines: ['물론 질문하는 게', '<em>잘못은 아니다</em>'],
      sub: '다만, 그 대답의 무게가 다를 뿐이다.',
    },
    {
      theme: 'cream', layout: 'standard', art: 'hourglass', tags: ['시간', '실수'],
      lines: ['쉽게 대답해주는 그 한마디에', '<em>몇 년</em>이 들어 있다'],
      sub: '시간을 쓰고, 돈을 쓰고, 실수하고, 직접 부딪히며 알게 된 것들.',
    },
    {
      // 이 세트의 킬러 문장. 캡처해서 퍼가는 장이 여기다.
      theme: 'dark', layout: 'standard', art: 'balanced',
      lines: ['커피값을 냈다고', '<em>경험값</em>까지 낸 건 아니다'],
      sub: '',
    },
    {
      theme: 'cream', layout: 'standard', art: 'table',
      lines: ['네트워킹은 <em>관계</em>를 만드는 것이지', '정보만 꺼내가는 자리가 아니다'],
      sub: '',
    },
    {
      theme: 'dark', layout: 'cover', art: 'boundary',
      lines: ['네트워킹과 <em>지식 구걸</em>', '어디서부터 다를까?'],
      sub: '여러분은 어떻게 생각하시나요',
    },
  ],
};
