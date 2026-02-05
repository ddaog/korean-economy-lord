import imgPresident from '../assets/dumb_blob_president_1770308141782.png';
import imgChaebol from '../assets/dumb_blob_chaebol_1770308167998.png';
import imgAnt from '../assets/dumb_blob_ant_1770308193364.png';
import imgForeign from '../assets/dumb_blob_foreign_1770308259696.png';
import imgMentor from '../assets/char_mentor_scholar_1770304939917.png'; // Keep mentor as "Ghost" or reuse Foreign? Let's hide him or keep old for now.
import imgUnion from '../assets/char_union_leader_1770305640637.png'; // No dumb blob for union yet, fallback to Ant? Or just use Foreign? Let's use Ant for now.
import imgPoliticianSlick from '../assets/dumb_blob_politician_1770308306137.png';
import imgReporterFrantic from '../assets/dumb_blob_reporter_1770308334577.png';

// Character mapping for consistency
const CHAR = {
  PRESIDENT: { name: "대통령", img: imgPresident },
  CHAEBOL: { name: "재벌 회장", img: imgChaebol },
  ANT: { name: "개미 투자자", img: imgAnt },
  FOREIGN: { name: "외국인 투자자 / IMF", img: imgForeign },
  MENTOR: { name: "전임 총재", img: imgForeign }, // Use 'Reaper' look for Mentor too? Or Chaebol? Let's use Foreign for "Cold Advisor"
  UNION: { name: "노조 위원장", img: imgAnt }, // Use Ant (Worker) look
  POLITICIAN: { name: "여당 원내대표", img: imgPoliticianSlick },
  OPPOSITION: { name: "야당 의원", img: imgPoliticianSlick },
  REPORTER: { name: "경제부 기자", img: imgReporterFrantic }
};

export const EVENTS = [
  // --- ACT 1: INAUGURATION (The Call) ---
  {
    id: 'act1_call',
    act: 1,
    character: CHAR.REPORTER.name,
    image: CHAR.REPORTER.img,
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
  {
    id: 'act2_chicken_index',
    act: 2,
    character: CHAR.REPORTER.name,
    image: CHAR.REPORTER.img,
    text: "[현장 연결] 치킨 한 마리에 3만원 시대! 국민들의 분노가 폭발 직전입니다! '치킨 지수'를 관리하시겠습니까?",
    left: {
      text: "치킨 가격 통제 (행정명령)",
      diff: { stock: -5, realEstate: 0, approval: 20, liquidity: 0 },
      narrative: "국민들은 환호하지만, 시장 왜곡이 발생합니다."
    },
    right: {
      text: "시장 가격 존중",
      diff: { stock: 5, realEstate: 0, approval: -15, liquidity: 0 },
      narrative: "치킨값은 계속 오르고 당신은 '치킨 적'으로 찍혔습니다."
    }
  },
  {
    id: 'act2_birth_rate',
    act: 2,
    character: CHAR.POLITICIAN.name,
    image: CHAR.POLITICIAN.img,
    text: "출산율 0.6명 붕괴! 국가 소멸 위기입니다. 돈을 찍어서라도 출산 지원금을 뿌려야 합니다!",
    left: {
      text: "찬성 (무제한 양적완화)",
      diff: { stock: 15, realEstate: 10, approval: 15, liquidity: 20 },
      narrative: "아이 한 명당 1억! 하지만 초인플레이션이 옵니다."
    },
    right: {
      text: "반대 (재정 건전성)",
      diff: { stock: -5, realEstate: -5, approval: -10, liquidity: -5 },
      narrative: "나라 꼴이 말이 아니군요. 미래 세대가 사라지고 있습니다."
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
  {
    id: 'act3_medical',
    act: 3,
    character: CHAR.UNION.name,
    image: CHAR.UNION.img,
    text: "의사들이 파업을 선언했습니다! '수가 인상' 없이는 돌아가지 않겠다고 합니다. 건보 재정이 파탄 날 텐데요?",
    left: {
      text: "수가 대폭 인상 (타협)",
      diff: { stock: 0, realEstate: 0, approval: 5, liquidity: -15 },
      narrative: "파업은 멈췄지만, 국가 재정에 구멍이 뚫렸습니다."
    },
    right: {
      text: "법적 대응 (원칙)",
      diff: { stock: -5, realEstate: 0, approval: -10, liquidity: 0 },
      narrative: "의료 대란이 장기화되며 국민들의 고통이 극에 달합니다."
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
    text: "월급만으로는 집 못 사요! 비트코인이 유일한 희망인데 채굴장 좀 지원해주시죠?",
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
  },
  {
    id: 'onion_scandal',
    character: CHAR.REPORTER.name,
    image: CHAR.REPORTER.img,
    text: "[특종] 대통령이 마트에서 '대파 한 단에 875원이면 합리적'이라고 발언했습니다. 민심이 들끓고 있습니다!",
    left: {
      text: "물가 관리 실패 인정 (사과)",
      diff: { stock: 0, realEstate: 0, approval: -10, liquidity: 0 },
      narrative: "솔직한 사과에도 불구하고 '대파 챌린지'가 유행합니다."
    },
    right: {
      text: "그건 할인 행사 가격! (해명)",
      diff: { stock: 0, realEstate: 0, approval: -20, liquidity: 0 },
      narrative: "변명이 불난 집에 기름을 부었습니다. 지지율이 수직 낙하합니다."
    }
  }
];
