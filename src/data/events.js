
import imgPresident from '../assets/character_president_1770304085131.png';
import imgChaebol from '../assets/character_chaebol_1770304108828.png';
import imgAnt from '../assets/character_ant_1770304129316.png';
import imgForeign from '../assets/character_foreign_1770304152541.png';
import imgMentor from '../assets/char_mentor_scholar_1770304939917.png';

// Placeholder for missing images if generation failed
const imgSpeculator = imgChaebol; // Fallback
const imgPolitician = imgPresident; // Fallback
const imgReporter = imgAnt; // Fallback

export const EVENTS = [
  // --- ACT 1: DEPARTURE (The Call) ---
  {
    id: 'act1_call',
    act: 1,
    character: "기자 (The Herald)",
    image: imgReporter,
    text: "[뉴스 속보] 신임 한국은행 총재 취임! '물가와의 전쟁' 선포하시겠습니까?",
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
    character: "닥터 J (The Mentor)",
    image: imgMentor,
    text: "자네, 이 그래프를 보게. 지금 금리를 올리지 않으면 나중에 더 큰 고통이 따를 걸세. 인기는 마약일세.",
    left: {
      text: "조언 감사합니다 (금리 인상)",
      diff: { stock: -5, realEstate: -5, approval: -10, liquidity: -5 },
      narrative: "스승의 조언대로 쓴 약을 삼켰습니다. 욕은 먹겠지만 기초 체력은 다졌습니다."
    },
    right: {
      text: "시대가 변했습니다 (금리 동결)",
      diff: { stock: 5, realEstate: 5, approval: 5, liquidity: 5 },
      narrative: "스승이 고개를 젓습니다. '그럼 자네 방식대로 해보게나.'"
    }
  },

  // --- ACT 2: INITIATION (The Trials) ---
  {
    id: 'act2_shadow',
    act: 2,
    character: "그림자 투기꾼 (The Shadow)",
    image: imgSpeculator,
    text: "크크크... 총재님, 저희가 강남 아파트 좀 사들이려는데 대출 규제 좀 풀어주시죠? 뒷돈은 섭섭지 않게...",
    left: {
      text: "썩 꺼져라! (규제 강화)",
      diff: { stock: 0, realEstate: -15, approval: 10, liquidity: -5 },
      narrative: "투기 세력과의 전쟁을 선포했습니다. 당신의 정의감에 지지율이 오릅니다."
    },
    right: {
      text: "좋은 게 좋은 거지 (규제 완화)",
      diff: { stock: 5, realEstate: 20, approval: -20, liquidity: 10 },
      narrative: "부동산 폭등의 주범이 되셨군요. 지갑은 두둑해졌지만 영혼을 팔았습니다."
    }
  },
  {
    id: 'act2_shapeshifter',
    act: 2,
    character: "김의원 (The Shapeshifter)",
    image: imgPolitician,
    text: "총재님~ 이번 총선 아시죠? 경기 부양책 조금만 써주시면 제가 국회에서 예산 방어해드릴게.",
    left: {
      text: "중앙은행은 독립적이다!",
      diff: { stock: -5, realEstate: 0, approval: 5, liquidity: 0 },
      narrative: "의원의 표정이 차갑게 변합니다. '두고 봅시다.'"
    },
    right: {
      text: "알겠습니다 (돈 풀기)",
      diff: { stock: 10, realEstate: 5, approval: 10, liquidity: 10 },
      narrative: "정치적 야합! 당장은 좋지만 나중에 독화살로 돌아올 겁니다."
    }
  },

  // --- ACT 3: RETURN (The Legacy) ---
  {
    id: 'act3_abyss',
    act: 3,
    character: "IMF 총재 (The Judge)",
    image: imgForeign,
    text: "[최후의 심판] 한국 경제의 펀더멘털이 흔들립니다. 구조조정 하시겠습니까, 아니면 파산하시겠습니까?",
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
    image: imgForeign,
    text: "이런! 도람푸가 갑자기 '한국은 부자나라인데 방위비 더 내라!'며 관세 폭탄을 예고했습니다.",
    left: {
      text: "강경 대응한다",
      diff: { stock: -15, realEstate: 0, approval: 10, liquidity: -5 },
      narrative: "당당한 태도에 국민들은 환호했지만, 외국인 투자자들이 썰물처럼 빠져나갑니다."
    },
    right: {
      text: "협상한다",
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
    text: "내 집값이 얼만데! 종부세 때문에 살 수가 없어! 금리 좀 낮춰요!",
    left: {
      text: "금리 인하",
      diff: { stock: 10, realEstate: 20, approval: 5, liquidity: 5 },
      narrative: "부동산 불장이 다시 시작됩니다. 영끌족들이 환호합니다."
    },
    right: {
      text: "금리 인상",
      diff: { stock: -10, realEstate: -15, approval: -5, liquidity: 5 },
      narrative: "집값이 떨어지기 시작했습니다. 건물주들이 당신을 저주합니다."
    }
  },
  {
    id: 5,
    character: "MZ 세대",
    image: imgAnt,
    text: "월급만으로는 집 못 사요! 비트코인이 유일한 희망인데 채굴장 좀 지원해주시죠?",
    left: {
      text: "가상화폐는 도박이다!",
      diff: { stock: 5, realEstate: 0, approval: -15, liquidity: 0 },
      narrative: "2030 세대의 지지율이 폭락했습니다."
    },
    right: {
      text: "블록체인은 미래다!",
      diff: { stock: -5, realEstate: 0, approval: 15, liquidity: -5 },
      narrative: "청년들의 영웅이 되셨군요. 하지만 코인판이 과열됩니다."
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
