/* ===================================================================
   카드셀 원고 — 「커피챗 요청, 다 받아주고 계신가요?」 (7장)

   출처 참고 : Marie Forleo, "How To Say No To People Who Want To
   Pick Your Brain" (2013, 조회 20.7만). 영어권에서 'coffee to pick
   your brain' 이라 부르는 것이 한국에서는 '커피챗'이다.
   원문 스크립트를 옮긴 것이 아니라 한국어로 새로 썼다.

   키워드를 '네트워킹'이 아니라 '커피챗'으로 잡은 이유 :
   유튜브 커피챗 콘텐츠(최대 7,774회)는 전부 요청하는 쪽 관점이라
   받는 쪽 이야기가 이 키워드에 비어 있다.
   =================================================================== */

window.CARD_SET = {
  name: 'coffeechat',
  ratio: [1080, 1350],
  cards: [
    {
      theme: 'dark', layout: 'cover', art: 'pickBrain',
      lines: ['“커피챗 한번 하실래요?”', '<em>다 받아주고</em> 계신가요?'],
      sub: '거절해도 되는 요청입니다',
    },
    {
      theme: 'cream', layout: 'standard', art: 'scale',
      lines: ['커피 한 잔에', '<em>몇 년의 경험</em>을 꺼내준다'],
      sub: '요청은 가볍고, 대답은 무겁다.',
    },
    {
      theme: 'dark', layout: 'standard', art: 'hourglass', tags: ['30분', '또 30분'],
      lines: ['한 달에 세 번이면', '<em>하루</em>가 통째로 사라진다'],
      sub: '30분짜리 커피챗은 그렇게 쌓인다.',
    },
    {
      theme: 'cream', layout: 'tick', art: 'askFirst',
      lines: ['하나. 만나기 전에 <em>되묻는다</em>', '“정확히 뭐가 궁금하세요?”'],
      sub: '용건을 먼저 물으면 절반은 여기서 정리된다.',
    },
    {
      theme: 'dark', layout: 'tick', art: 'linkOut',
      lines: ['둘. <em>자료로</em> 돌린다', '“그건 여기 정리해 뒀어요”'],
      sub: '세 번 넘게 받은 질문은 글로 써두고 링크만 보낸다.',
    },
    {
      theme: 'cream', layout: 'tick', art: 'priceTag',
      lines: ['셋. <em>값을</em> 매긴다', '“제대로 보려면 한 시간 잡죠”'],
      sub: '값이 붙는 순간 진짜 필요한 사람만 남는다.',
    },
    {
      theme: 'dark', layout: 'standard', art: 'boundary',
      lines: ['거절이 아니라', '<em>조건</em>을 말하는 것이다'],
      sub: '기준이 있는 사람에게 사람이 모인다.',
    },
  ],
};
