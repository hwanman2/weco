/* ===================================================================
   카드셀 원고 — 「네트워킹을 착각하는 사람들」 (7장)
   문구만 고치면 그대로 다시 뽑힌다. <em>…</em> 안의 글자가 빨강 강조.
   theme  : dark | cream          (교차 배치가 기본)
   layout : cover | standard | tick
   art    : art.js 의 ART 키
   =================================================================== */

window.CARD_SET = {
  name: 'networking',
  ratio: [1080, 1350],
  cards: [
    {
      theme: 'dark', layout: 'cover', art: 'scale',
      lines: ['커피 한 잔에', '<em>몇 년의 경험</em>이 넘어올까?'],
      sub: '네트워킹을 착각하는 사람들',
    },
    {
      theme: 'cream', layout: 'standard', art: 'brokenFlow',
      lines: ['밥 한 끼, 술 한 잔이면', '<em>다 알려줄 거라</em> 생각한다'],
      sub: '그게 가장 흔한 착각이다.',
    },
    {
      theme: 'dark', layout: 'standard', art: 'hourglass',
      lines: ['그 한마디에는', '<em>돈과 시간</em>이 들어 있다'],
      sub: '몇 년을 써서 겨우 얻어낸 답이다.',
    },
    {
      theme: 'cream', layout: 'standard', art: 'oneWay',
      lines: ['받기만 하는 사이엔', '<em>두 번째 만남</em>이 없다'],
      sub: '한 번은 호의, 두 번은 부담이 된다.',
    },
    {
      theme: 'dark', layout: 'standard', art: 'table',
      lines: ['네트워킹은', '<em>지식을 얻는 자리</em>가 아니다'],
      sub: '서로 줄 게 있는 사람들이 모이는 자리다.',
    },
    {
      theme: 'cream', layout: 'tick', art: 'openBag',
      lines: ['먼저 물어야 할 건', '“<em>나는 뭘 줄 수 있나</em>”'],
      sub: '줄 게 있어야 관계가 시작된다.',
    },
    {
      theme: 'dark', layout: 'standard', art: 'exchange',
      lines: ['얻으러 가지 말고', '<em>줄 것을 들고</em> 가라'],
      sub: '그때부터 네트워킹이 된다.',
    },
  ],
};
