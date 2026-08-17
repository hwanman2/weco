/* ===================================================================
   카드셀 원고 — 「Pick Your Brain」 (9장)
   글: 사용자 원문을 카드 호흡에 맞춰 끊은 것. 문장은 원문 그대로다.
   =================================================================== */

window.CARD_SET = {
  name: 'pickyourbrain',
  ratio: [1080, 1350],
  cards: [
    {
      theme: 'dark', layout: 'cover', art: 'pickBrain',
      lines: ['해외엔 이런 말이 있다', '<em>Pick Your Brain</em>'],
      sub: '네 머릿속 지식 좀 나눠달라는 뜻',
    },
    {
      theme: 'cream', layout: 'standard', art: 'twoPeople',
      lines: ['“커피 한잔하시죠”', '“<em>술 한잔</em>하시죠”'],
      sub: '처음엔 가볍게 만나는 자리인 줄 알았다.',
    },
    {
      theme: 'dark', layout: 'standard', art: null,
      lines: ['그런데 어느 순간부터', '대화가 아니라 <em>질문</em>만 이어진다'],
      items: [
        '“그건 어떻게 시작했어요?”',
        '“그쪽에서는 보통 어떻게 해요?”',
        '“이런 상황에서는 어떻게 해야 돼요?”',
        '“그 사람은 어떻게 알게 됐어요?”',
        '“저라면 뭘 먼저 하는 게 좋을까요?”',
      ],
    },
    {
      theme: 'cream', layout: 'tick', art: 'askFirst',
      lines: ['물론 질문하는 게', '<em>잘못은 아니다</em>'],
      sub: '다만, 그 대답의 무게가 다를 뿐이다.',
    },
    {
      theme: 'dark', layout: 'standard', art: 'hourglass', tags: ['시간', '실수'],
      lines: ['쉽게 대답해주는 그 한마디에', '<em>몇 년</em>이 들어 있다'],
      sub: '시간을 쓰고, 돈을 쓰고, 실수하고, 직접 부딪히며 알게 된 것들.',
    },
    {
      theme: 'cream', layout: 'standard', art: 'scale',
      lines: ['그걸 커피 한잔으로', '<em>쉽게 얻어가는</em> 순간'],
      sub: '과연 그걸 네트워킹이라고 할 수 있을까.',
    },
    {
      theme: 'dark', layout: 'standard', art: 'table',
      lines: ['네트워킹은 <em>관계</em>를 만드는 것이지', '정보만 꺼내가는 자리가 아니다'],
      sub: '',
    },
    {
      theme: 'cream', layout: 'standard', art: 'balanced',
      lines: ['커피값을 냈다고', '<em>경험값</em>까지 낸 건 아니다'],
      sub: '',
    },
    {
      theme: 'dark', layout: 'cover', art: 'boundary',
      lines: ['네트워킹과 <em>지식 구걸</em>', '어디서부터 다를까?'],
      sub: '여러분은 어떻게 생각하시나요',
    },
  ],
};
