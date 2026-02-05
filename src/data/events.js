
import imgPresident from '../assets/character_president_1770304085131.png';
import imgChaebol from '../assets/character_chaebol_1770304108828.png';
import imgAnt from '../assets/character_ant_1770304129316.png';
import imgForeign from '../assets/character_foreign_1770304152541.png';
import imgMentor from '../assets/char_mentor_scholar_1770304939917.png';
import imgUnion from '../assets/char_union_leader_1770305640637.png';
import imgPoliticianSlick from '../assets/char_politician_slick_1770305659022.png';

// Character mapping for consistency
const CHAR = {
  PRESIDENT: { name: "대통령", img: imgPresident },
  CHAEBOL: { name: "재벌 회장", img: imgChaebol },
  ANT: { name: "개미 투자자", img: imgAnt },
  FOREIGN: { name: "외국인 투자자 / IMF", img: imgForeign },
  MENTOR: { name: "전임 총재", img: imgMentor },
  UNION: { name: "노조 위원장", img: imgUnion },
  POLITICIAN: { name: "여당 원내대표", img: imgPoliticianSlick },
  OPPOSITION: { name: "야당 의원", img: imgPoliticianSlick }, // Reuse slick politician for now
};

export const EVENTS = [
  // --- ACT 1: INAUGURATION (The Call) ---
  {
    id: 'act1_call',
    act: 1,
    character: "경제부 기자",
    image: imgAnt,
    text: "[속보] 신임 한국은행 총재 취임! '물가와의 전쟁' 선포하시겠습니까?",
    left: {
      text: "아니요, 성장이 우선입니다.",
      diff: { stock: 10, realEstate: 5, approval: 10, liquidity: 5 },
      narrative: "시장은 환호했지만, 물가 상승의 불씨를 남겼습니다."
    },
    right: {
      text: "네, 긴축이 필요합니다.",
      diff: { stock: -10, realEstate: -5, approval: -5, liquidity: -10 },
      narrative: "단호한 의지에 시장이 긴장합니다. 고난의 시작입니다."
    }
  },
  {
    id: 'act1_mentor',
    act: 1,
    character: CHAR.MENTOR.name,
    image: CHAR.MENTOR.img,
    text: "이보게, 지금 금리를 올리지 않으면 나중에 더 큰 고통이 따를 걸세. 인기는 마약일세.",
    left: {
      text: "조언 감사합니다 (금리 인상)",
      diff: { stock: -5, realEstate: -5, approval: -10, liquidity: -5 },
      narrative: "전임 총재의 조언대로 쓴 약을 삼켰습니다."
    },
    right: {
      text: "시대가 변했습니다 (금리 동결)",
      diff: { stock: 5, realEstate: 5, approval: 5, liquidity: 5 },
      narrative: "전임 총재가 혀를 찹니다. '자네 방식대로 해보게나.'"
    }
  },
  {
    id: 'act1_union_wage',
    act: 1,
    character: CHAR.UNION.name,
    image: CHAR.UNION.img,
    text: "물가가 너무 올랐습니다! 최저임금 대폭 인상 지지해주십시오! 우리도 살아야 할 거 아닙니까!",
    left: {
      text: "임금 인상 지지 (물가 상승)",
      diff: { stock: -5, realEstate: 0, approval: 10, liquidity: 5 },
      narrative: "노동자들은 환호하지만, 인플레이션 압력이 커집니다."
    },
    right: {
      text: "자제 부탁드립니다 (동결)",
      diff: { stock: 5, realEstate: 0, approval: -15, liquidity: -5 },
      narrative: "기업들은 안도하지만, 광화문에서 대규모 시위가 열립니다."
    }
  },

  // --- ACT 2: TURBULENCE (The Trials) ---
  {
    id: 'act2_shadow',
    act: 2,
    character: "강남 큰손",
    image: imgChaebol,
    text: "총재님, 우리가 아파트 좀 사들이려는데 대출 규제 좀 풀어주시죠? 뒷돈은 섭섭지 않게...",
    left: {
      text: "썩 꺼져라! (규제 강화)",
      diff: { stock: 0, realEstate: -15, approval: 10, liquidity: -5 },
      narrative: "투기 세력과의 전쟁을 선포했습니다."
    },
    right: {
      text: "좋은 게 좋은 거지 (규제 완화)",
      diff: { stock: 5, realEstate: 20, approval: -20, liquidity: 10 },
      narrative: "부동산 폭등의 주범이 되셨군요."
    }
  },
  {
    id: 'act2_politician_budget',
    act: 2,
    character: CHAR.POLITICIAN.name,
    image: CHAR.POLITICIAN.img,
    text: "총재님~ 내년 총선인데 추경 예산 좀 편성하게 국채 좀 사주시죠? 서로 돕고 살아야죠.",
    left: {
      text: "중앙은행은 독립적입니다!",
      diff: { stock: -5, realEstate: 0, approval: 5, liquidity: 0 },
      narrative: "원내대표의 표정이 차갑게 변합니다. '두고 봅시다.'"
    },
    right: {
      text: "알겠습니다 (양적 완화)",
      diff: { stock: 10, realEstate: 5, approval: 10, liquidity: 10 },
      narrative: "돈을 풀어 경기를 부양합니다. 하지만 당신은 '정권의 하수인'이라 불립니다."
    }
  },
  {
    id: 'act2_sme_crisis',
    act: 2,
    character: "중소기업 사장",
    image: imgAnt, // Reusing relatable image
    text: "금리가 너무 높아서 이자 갚다가 다 망하게 생겼습니다! 제발 살려주십시오!",
    left: {
      text: "어쩔 수 없습니다 (원칙 고수)",
      diff: { stock: 0, realEstate: 0, approval: -10, liquidity: -5 },
      narrative: "한계기업들이 줄도산합니다. 경제의 기초가 흔들립니다."
    },
    right: {
      text: "특별 금융 지원 (구제)",
      diff: { stock: 5, realEstate: 0, approval: 10, liquidity: 5 },
      narrative: "급한 불은 껐지만, 좀비 기업들도 연명하게 되었습니다."
    }
  },

  // --- ACT 3: JUDGMENT (The Legacy) ---
  {
    id: 'act3_imf',
    act: 3,
    character: CHAR.FOREIGN.name,
    image: CHAR.FOREIGN.img,
    text: "[최후의 통첩] 한국 경제의 부채가 한계입니다. 구조조정 하시겠습니까, 아니면 파산하시겠습니까?",
    left: {
      text: "뼈를 깎는 구조조정",
      diff: { stock: -30, realEstate: -30, approval: -30, liquidity: 30 },
      narrative: "당신은 '저승사자'라 불리며 역사에 남겠지만, 나라는 살렸습니다."
    },
    right: {
      text: "우린 망하지 않아!",
      diff: { stock: -50, realEstate: -50, approval: -50, liquidity: -50 },
      narrative: "오만함이 파국을 불렀습니다. 국가 부도의 날이 밝았습니다."
    }
  },

  // --- RANDOM EVENTS (All Acts) ---
  {
    id: 1,
    character: "도람푸 (미국 대통령)",
    image: CHAR.FOREIGN.img,
    text: "이런! 도람푸가 갑자기 '한국은 부자나라인데 방위비 더 내라!'며 관세 폭탄을 예고했습니다.",
    left: {
      text: "강경 대응한다",
      diff: { stock: -15, realEstate: 0, approval: 10, liquidity: -5 },
      narrative: "당당한 태도에 국민들은 환호했지만, 외국인 투자자들이 빠져나갑니다."
    },
    right: {
      text: "협상한다",
      diff: { stock: 5, realEstate: 0, approval: -10, liquidity: -20 },
      narrative: "증시는 안도했지만, 굴욕 외교라는 비난을 받습니다."
    }
  },
  {
    id: 2,
    character: CHAR.ANT.name,
    image: CHAR.ANT.img,
    text: "총재님! 공매도 세력 때문에 우리 개미들 다 죽습니다! 공매도 금지해주세요!",
    left: {
      text: "공매도 전면 금지!",
      diff: { stock: 15, realEstate: 5, approval: 20, liquidity: -5 },
      narrative: "코스피가 폭등했습니다! MSCI 선진국 편입은 멀어졌군요."
    },
    right: {
      text: "시장 원리 준수",
      diff: { stock: -10, realEstate: 0, approval: -15, liquidity: 5 },
      narrative: "개미들이 당신의 화형식을 거행하고 있습니다."
    }
  },
  {
    id: 3,
    character: CHAR.CHAEBOL.name,
    image: CHAR.CHAEBOL.img,
    text: "내 집값이 얼만데! 종부세 때문에 살 수가 없어! 금리 좀 낮춰요!",
    left: {
      text: "금리 인하",
      diff: { stock: 10, realEstate: 20, approval: 5, liquidity: 5 },
      narrative: "부동산 불장이 다시 시작됩니다. 영끌족들이 환호합니다."
    },
    right: {
      text: "금리 인상",
      diff: { stock: -10, realEstate: -15, approval: -5, liquidity: 5 },
      narrative: "집값이 떨어지기 시작했습니다. 당신을 저주합니다."
    }
  },
  {
    id: 5,
    character: "MZ 세대",
    image: CHAR.ANT.img,
    text: "월급만으로는 집 못 사요! 비트코인만이 살 길입니다! 거래소 규제 풀어주세요!",
    left: {
      text: "가상화폐는 도박이다!",
      diff: { stock: 5, realEstate: 0, approval: -15, liquidity: 0 },
      narrative: "2030 세대의 지지율이 폭락했습니다."
    },
    right: {
      text: "규제 완화",
      diff: { stock: -5, realEstate: 0, approval: 15, liquidity: -5 },
      narrative: "청년들의 영웅이 되셨군요. 하지만 투기판이 되었습니다."
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
