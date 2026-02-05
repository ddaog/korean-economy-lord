
import imgPresident from '../assets/character_president_1770304085131.png';
import imgChaebol from '../assets/character_chaebol_1770304108828.png';
import imgAnt from '../assets/character_ant_1770304129316.png';
import imgForeign from '../assets/character_foreign_1770304152541.png';

export const EVENTS = [
  {
    id: 1,
    character: "도람푸 (미국 대통령)",
    image: imgForeign,
    text: "이런! 도람푸가 갑자기 '한국은 부자나라인데 방위비 더 내라!'며 관세 폭탄을 예고했습니다. 어떻게 할까요?",
    left: {
      text: "강경 대응한다 (미국산 소고기 수입 금지!)",
      diff: { stock: -15, realEstate: 0, approval: 10, liquidity: -5 },
      narrative: "당당한 태도에 국민들은 환호했지만, 외국인 투자자들이 썰물처럼 빠져나갑니다."
    },
    right: {
      text: "협상한다 (미국 무기 대량 구매)",
      diff: { stock: 5, realEstate: 0, approval: -10, liquidity: -20 },
      narrative: "증시는 안도했지만, 곳간이 비어가고 굴욕 외교라는 비난을 받습니다."
    }
  },
  {
    id: 2,
    character: "김개미 (주식 투자자)",
    image: imgAnt,
    text: "총재님! 공매도 세력 때문에 우리 개미들 다 죽습니다! 공매도 금지해주세요!",
    left: {
      text: "공매도 전면 금지!",
      diff: { stock: 15, realEstate: 5, approval: 20, liquidity: -5 },
      narrative: "코스피가 폭등했습니다! 하지만 MSCI 선진국 편입은 물 건너갔군요."
    },
    right: {
      text: "시장의 원리를 따라야...",
      diff: { stock: -10, realEstate: 0, approval: -15, liquidity: 5 },
      narrative: "개미들이 당신의 화형식을 거행하고 있습니다. 외국인들은 좋아하네요."
    }
  },
  {
    id: 3,
    character: "이건물 (강남 건물주)",
    image: imgChaebol,
    text: "내 집값이 얼만데! 종부세 때문에 살 수가 없어! 금리 좀 낮춰서 이자 부담 좀 줄여줘요!",
    left: {
      text: "금리 인하 (부양책 가동)",
      diff: { stock: 10, realEstate: 20, approval: 5, liquidity: 5 },
      narrative: "부동산 불장이 다시 시작됩니다. 영끌족들이 환호합니다."
    },
    right: {
      text: "금리 인상 (물가 안정)",
      diff: { stock: -10, realEstate: -15, approval: -5, liquidity: 5 },
      narrative: "집값이 떨어지기 시작했습니다. 건물주들이 당신을 저주합니다."
    }
  },
  {
    id: 4,
    character: "IMF 총재",
    image: imgForeign,
    text: "한국의 가계부채가 위험 수위입니다. 당장 금리를 올리고 유동성을 회수하십시오.",
    left: {
      text: "내정 간섭 하지마!",
      diff: { stock: 5, realEstate: 5, approval: 10, liquidity: -15 },
      narrative: "자주적인 태도를 보였지만, 국가 신용등급 강등 위기입니다."
    },
    right: {
      text: "시키는 대로 한다 (긴축)",
      diff: { stock: -20, realEstate: -20, approval: -20, liquidity: 15 },
      narrative: "경기가 얼어붙었습니다. '제2의 IMF'라는 소리가 들립니다."
    }
  },
  {
    id: 5,
    character: "MZ 세대",
    image: imgAnt,
    text: "월급만으로는 집 못 사요! 비트코인이 유일한 희망인데 채굴장 좀 지원해주시죠?",
    left: {
      text: "가상화폐는 도박이다! (규제)",
      diff: { stock: 5, realEstate: 0, approval: -15, liquidity: 0 },
      narrative: "2030 세대의 지지율이 폭락했습니다."
    },
    right: {
      text: "블록체인은 미래다! (지원)",
      diff: { stock: -5, realEstate: 0, approval: 15, liquidity: -5 },
      narrative: "청년들의 영웅이 되셨군요. 하지만 코인판이 과열됩니다."
    }
  },
  {
    id: 6,
    character: "재벌 회장",
    image: imgChaebol,
    text: "반도체 공장 지을 돈이 부족합니다. 저리로 대출 좀 해주시죠. 낙수효과 아시죠?",
    left: {
      text: "특혜 대출 승인",
      diff: { stock: 10, realEstate: 0, approval: -10, liquidity: -10 },
      narrative: "대기업 주가는 올랐지만, 정경유착 의혹이 불거집니다."
    },
    right: {
      text: "원칙대로 하세요",
      diff: { stock: -10, realEstate: 0, approval: 5, liquidity: 5 },
      narrative: "대기업 투자가 위축되어 경기 침체 우려가 나옵니다."
    }
  },
  {
    id: 7,
    character: "기자",
    image: imgPresident,
    text: "총재님, 오늘 점심에 짜장면 드셨나요 짬뽕 드셨나요? 이것도 시장에 신호를 줄 수 있습니다.",
    left: {
      text: "짜장면 (서민적)",
      diff: { stock: 0, realEstate: 0, approval: 5, liquidity: 0 },
      narrative: "소탈한 모습에 호감을 샀습니다."
    },
    right: {
      text: "호텔 코스 요리",
      diff: { stock: 0, realEstate: 0, approval: -5, liquidity: 0 },
      narrative: "서민들은 굶고 있는데 호화 식사라니요!"
    }
  }
];

export const PASSIVE_CARDS = [
  {
    id: 'p1',
    name: '저출산 고령화',
    description: '매년 유동성과 지지율이 조금씩 감소합니다.',
    effect: (stats) => ({ ...stats, liquidity: stats.liquidity - 2, approval: stats.approval - 1 })
  }
];

export const CHARACTERS = {
  pres: "대통령",
  investor: "외국인 투자자",
  ant: "김개미",
  chaebol: "재벌 회장"
};
