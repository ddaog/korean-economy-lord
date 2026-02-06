import imgPresident from '../assets/korean_db_president_1770344680843.png';
import imgChaebol from '../assets/korean_db_chaebol_1770344695294.png';
import imgAnt from '../assets/korean_db_ant_1770344711922.png';
import imgForeign from '../assets/korean_db_foreign_1770344727449.png';
import imgMentor from '../assets/char_mentor_scholar_1770304939917.png'; // Keep mentor as "Ghost" for now
import imgUnion from '../assets/korean_db_union_1770344816296.png'; // Updated to Korean Union Leader
import imgPoliticianSlick from '../assets/korean_db_politician_1770344772080.png';
import imgReporterFrantic from '../assets/korean_db_reporter_1770344755475.png';
import imgSME from '../assets/korean_db_sme_1770344788709.png'; // New SME asset

// Character mapping for consistency
const CHAR = {
  PRESIDENT: { name: "대통령", img: imgPresident },
  CHAEBOL: { name: "재벌 회장", img: imgChaebol },
  ANT: { name: "개미 투자자", img: imgAnt },
  FOREIGN: { name: "외국인 투자자 / IMF", img: imgForeign },
  MENTOR: { name: "전임 총재", img: imgForeign }, // Use 'Cold Foreign' look for Mentor effectively? Or just keep old one? Let's use Foreign for "Cold Advisor" style as planned.
  UNION: { name: "노조 위원장", img: imgUnion },
  POLITICIAN: { name: "여당 원내대표", img: imgPoliticianSlick },
  OPPOSITION: { name: "야당 의원", img: imgPoliticianSlick },
  REPORTER: { name: "경제부 기자", img: imgReporterFrantic },
  SME: { name: "중소기업 사장", img: imgSME }
};

// Event Types for Schedule Logic
export const EVENT_TYPES = {
  MPC: 'MPC',       // Monetary Policy Committee (Interest Rates, Inflation) - Jan, Feb, Apr, May, Jul, Aug, Oct, Nov
  FSM: 'FSM',       // Financial Stability Meeting (Debt, Macro-prudential) - Mar, Jun, Sep, Dec
  GENERAL: 'GENERAL', // Random events
  URGENT: 'URGENT', // High priority overrides
  CHAIN: 'CHAIN'    // Triggered by previous choices
};

export const EVENTS = [
  // --- ACT 1: INAUGURATION (The Call) ---
  {
    id: 'act1_call',
    act: 1,
    type: EVENT_TYPES.MPC, // First rate decision
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
      narrative: "단호한 의지에 시장이 긴장합니다. 고난의 시작입니다.",
      chains: [{ eventId: 'act1_tightening_protest', delay: 2 }] // Trigger protest in 2 months
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
      narrative: "전임 총재가 혀를 찹니다. '자네 방식대로 해보게나.'",
      chains: [{ eventId: 'act1_inflation_warning', delay: 3 }] // Trigger inflation warning later
    }
  },
  {
    id: 'act1_union_wage',
    act: 1,
    type: EVENT_TYPES.GENERAL,
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
    type: EVENT_TYPES.FSM, // PF is a stability issue
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
    type: EVENT_TYPES.FSM, // Fiscal/Monetary coordination
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
    type: EVENT_TYPES.GENERAL,
    character: CHAR.SME.name,
    image: CHAR.SME.img,
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
    type: EVENT_TYPES.MPC, // Inflation target
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
    type: EVENT_TYPES.FSM, // Structural issue
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
    type: EVENT_TYPES.URGENT,
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
    type: EVENT_TYPES.GENERAL,
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
  },
  // --- NEW KOREAN SATIRE EVENTS ---
  {
    id: 'real_estate_pf',
    act: 2,
    type: EVENT_TYPES.FSM,
    character: CHAR.CHAEBOL.name,
    image: CHAR.CHAEBOL.img,
    text: "부동산 PF 사태가 터졌습니다! 10조 규모 부실채권... 금융기관들이 살려달라고 아우성입니다!",
    left: {
      text: "공적자금 투입 (구제금융)",
      diff: { stock: 5, realEstate: 10, approval: -15, liquidity: -20 },
      narrative: "'부자 감싸기'라는 비난이 쏟아집니다. 재정 건전성도 악화되었습니다."
    },
    right: {
      text: "시장 원리에 맡긴다 (방치)",
      diff: { stock: -20, realEstate: -25, approval: 5, liquidity: -10 },
      narrative: "건설사 파산 도미노... 부동산 시장이 얼어붙었습니다."
    }
  },
  {
    id: 'kchips_law',
    act: 1,
    character: CHAR.CHAEBOL.name,
    image: CHAR.CHAEBOL.img,
    text: "반도체 업계가 'K-칩스법' 지원을 요청합니다. 20조 세제 지원해주시면 미국 따라잡겠습니다!",
    left: {
      text: "전폭 지원 (세제 혜택)",
      diff: { stock: 20, realEstate: 0, approval: 5, liquidity: -15 },
      narrative: "삼성과 SK가 환호합니다. 하지만 재정 적자가 심각해졌습니다."
    },
    right: {
      text: "선별 지원 (조건부)",
      diff: { stock: 5, realEstate: 0, approval: -10, liquidity: -5 },
      narrative: "반도체 업계가 실망했습니다. '중국에 추월당한다'는 경고가 나옵니다."
    }
  },
  {
    id: 'delivery_fee',
    act: 1,
    character: CHAR.ANT.name,
    image: CHAR.ANT.img,
    text: "배달앱 수수료 논란! 자영업자들은 '배달앱이 갑질'이라 하고, 배달기사들은 '수수료 올려야 산다'고 합니다.",
    left: {
      text: "수수료 상한제 (규제)",
      diff: { stock: -5, realEstate: 0, approval: 15, liquidity: 0 },
      narrative: "자영업자들은 환호하지만, 배달앱 주가가 폭락했습니다."
    },
    right: {
      text: "시장 자율에 맡긴다",
      diff: { stock: 5, realEstate: 0, approval: -15, liquidity: 0 },
      narrative: "'서민 외면'이라는 비난이 쏟아집니다. 치킨집 사장님들이 울고 있습니다."
    }
  },
  {
    id: 'seoul_housing_boom',
    act: 2,
    character: "강남 부동산 중개인",
    image: CHAR.CHAEBOL.img,
    text: "강남 아파트값이 30%나 올랐습니다! 영끌족들이 '지금 안 사면 평생 못 산다'며 대출 받으려 합니다.",
    left: {
      text: "DSR 규제 강화 (대출 억제)",
      diff: { stock: -5, realEstate: -20, approval: -20, liquidity: 5 },
      narrative: "'영혼까지 끌어모아도 집을 못 산다'는 절규가 들립니다."
    },
    right: {
      text: "대출 규제 완화",
      diff: { stock: 10, realEstate: 25, approval: 10, liquidity: -15 },
      narrative: "집값이 폭등합니다. 가계부채 폭탄이 째깍째깍..."
    }
  },
  {
    id: 'youth_unemployment',
    act: 2,
    character: "청년 구직자",
    image: CHAR.ANT.img,
    text: "청년 실업률 역대 최고! '공시생 100만 시대'라는데 일자리 좀 만들어주세요!",
    left: {
      text: "공공일자리 확대",
      diff: { stock: -5, realEstate: 0, approval: 15, liquidity: -15 },
      narrative: "청년들은 환호하지만, '세금 낭비' 비판도 나옵니다."
    },
    right: {
      text: "민간 주도 (규제 완화)",
      diff: { stock: 10, realEstate: 0, approval: -10, liquidity: 5 },
      narrative: "'청년을 버렸다'는 비난이 쏟아집니다. 투표율이 걱정되는데요..."
    }
  },
  {
    id: 'electricity_bill',
    act: 2,
    type: EVENT_TYPES.GENERAL,
    character: CHAR.PRESIDENT.name,
    image: CHAR.PRESIDENT.img,
    text: "전기요금 적자가 20조입니다! 한전이 망하기 직전인데, 요금 인상하시겠습니까?",
    left: {
      text: "전기요금 대폭 인상",
      diff: { stock: -10, realEstate: 0, approval: -25, liquidity: 10 },
      narrative: "'서민 죽이기'라는 비난에 지지율이 폭락합니다."
    },
    right: {
      text: "동결 (적자 방치)",
      diff: { stock: 5, realEstate: 0, approval: 10, liquidity: -20 },
      narrative: "한전 부채가 눈덩이처럼 불어납니다. 다음 정부가 수습하겠죠..."
    }
  },
  {
    id: 'pension_crisis',
    act: 3,
    type: EVENT_TYPES.URGENT,
    character: CHAR.FOREIGN.name,
    image: CHAR.FOREIGN.img,
    text: "국민연금 고갈 D-3년! 연금 개혁 안 하면 2040년에는 한 푼도 못 받습니다!",
    left: {
      text: "연금 개혁 단행 (보험료↑ 수령액↓)",
      diff: { stock: 5, realEstate: 0, approval: -30, liquidity: 10 },
      narrative: "'연금 도둑'이라는 성토가 빗발칩니다. 정치적 자살이군요."
    },
    right: {
      text: "다음 정부로 미룬다",
      diff: { stock: 0, realEstate: 0, approval: 5, liquidity: -10 },
      narrative: "'무책임'이라는 비난을 받지만, 일단 임기는 버틸 수 있겠네요."
    }
  },
  {
    id: 'regional_extinction',
    act: 3,
    character: "지방 군수",
    image: CHAR.POLITICIAN.img,
    text: "지방 소멸이 가속화됩니다! 전남·북의 절반이 사라질 위기인데 대책이 있습니까?",
    left: {
      text: "지방 이전 인센티브 (보조금)",
      diff: { stock: -5, realEstate: -10, approval: 10, liquidity: -15 },
      narrative: "지방은 살아났지만, 서울 집값은 더 올랐습니다."
    },
    right: {
      text: "수도권 집중 (방치)",
      diff: { stock: 10, realEstate: 15, approval: -10, liquidity: 5 },
      narrative: "'지방은 버렸다'는 목소리가 커집니다. 지역 균형 발전은 먼 얘기네요."
    }
  },
  {
    id: 'real_estate_speculation',
    character: "부동산 유튜버",
    image: CHAR.CHAEBOL.img,
    text: "'영끌하면 부자 된다!' 부동산 유튜버들이 부동산 붐을 부채질합니다. 규제하시겠습니까?",
    left: {
      text: "허위정보 규제 (단속)",
      diff: { stock: 0, realEstate: -10, approval: 5, liquidity: 0 },
      narrative: "투기과열이 진정되었지만, '언론 탄압'이라는 비난도 나옵니다."
    },
    right: {
      text: "표현의 자유 존중",
      diff: { stock: 5, realEstate: 20, approval: -10, liquidity: -10 },
      narrative: "영끌족이 급증합니다. 집값 폭등의 뇌관이 되었습니다."
    }
  },
  {
    id: 'crypto_boom',
    character: "코인 개미",
    image: CHAR.ANT.img,
    text: "비트코인이 1억 돌파! '이번엔 다르다'며 월급 전액 코인 올인하는 사람들이 속출합니다!",
    left: {
      text: "가상자산 거래 중단 (강경)",
      diff: { stock: -10, realEstate: 0, approval: -25, liquidity: 5 },
      narrative: "'재산권 침해'라는 비난과 함께 촛불집회가 열립니다."
    },
    right: {
      text: "제도권 편입 (과세)",
      diff: { stock: 10, realEstate: 0, approval: 10, liquidity: 10 },
      narrative: "코인 투자자들은 환호하지만, 버블 붕괴의 위험도 커졌습니다."
    }
  },
  {
    id: 'crypto_crash',
    character: CHAR.ANT.name,
    image: CHAR.ANT.img,
    text: "[긴급] 코인 대폭락! '루나 사태' 재현... 수십만 명이 영혼까지 날렸습니다! 구제해주십시오!",
    left: {
      text: "피해자 구제 (보상)",
      diff: { stock: -10, realEstate: 0, approval: 10, liquidity: -20 },
      narrative: "'투기 조장'이라는 비난과 함께 재정 부담만 커졌습니다."
    },
    right: {
      text: "자기 책임 원칙",
      diff: { stock: 5, realEstate: 0, approval: -20, liquidity: 0 },
      narrative: "'냉혈한'이라는 비난이 쏟아집니다. 2030 지지율 바닥 찍었네요."
    }
  },
  {
    id: 'young_broke',
    character: "영끌족",
    image: CHAR.ANT.img,
    text: "금리 인상으로 '영끌족' 파산 속출! 하루에 100명씩 파산 신청... 어떻게 하시겠습니까?",
    left: {
      text: "긴급 대출 유예 (구제)",
      diff: { stock: -5, realEstate: 5, approval: 15, liquidity: -10 },
      narrative: "일단 급한 불은 껐지만, 부실 대출이 쌓여갑니다."
    },
    right: {
      text: "원칙대로 처리 (냉정)",
      diff: { stock: 5, realEstate: -15, approval: -20, liquidity: 5 },
      narrative: "'집 없는 서른'들의 눈물이 쏟아집니다. 지지율도 같이 추락하네요."
    }
  },
  {
    id: 'kimchi_premium',
    character: "코인 트레이더",
    image: CHAR.CHAEBOL.img,
    text: "김치 프리미엄 20% 돌파! 한국 코인값이 전 세계보다 비쌉니다. 외국인들이 웃고 있어요!",
    left: {
      text: "해외 송금 규제 강화",
      diff: { stock: -5, realEstate: 0, approval: -10, liquidity: -5 },
      narrative: "'폐쇄 경제냐'는 비판에 시장이 위축되었습니다."
    },
    right: {
      text: "자유거래 허용",
      diff: { stock: 5, realEstate: 0, approval: 5, liquidity: -15 },
      narrative: "외화가 줄줄 새나갑니다. 환율 방어가 걱정되네요."
    }
  },
  {
    id: 'small_business_hell',
    act: 2,
    character: CHAR.SME.name,
    image: CHAR.SME.img,
    text: "자영업자 폐업률 역대 최고! '치킨집 1년 생존율 30%'라는데 최저임금까지 오르면 다 망해요!",
    left: {
      text: "최저임금 동결",
      diff: { stock: 5, realEstate: 0, approval: -15, liquidity: 5 },
      narrative: "자영업자는 안도했지만, 노동계가 들고 일어났습니다."
    },
    right: {
      text: "최저임금 인상 강행",
      diff: { stock: -5, realEstate: 0, approval: 10, liquidity: -10 },
      narrative: "'골목상권 몰살'이라는 비명이 들립니다. 폐업 도미노가 시작되었습니다."
    }
  },
  {
    id: 'kpop_military',
    act: 2,
    character: CHAR.POLITICIAN.name,
    image: CHAR.POLITICIAN.img,
    text: "BTS 병역 특례 논란! '국위 선양했으니 면제해야' vs '특권 아니냐'... 결정해주십시오!",
    left: {
      text: "병역 특례 부여",
      diff: { stock: 10, realEstate: 0, approval: -10, liquidity: 5 },
      narrative: "팬들은 환호하지만, '특권 논란'에 공정성 지적이 거셉니다."
    },
    right: {
      text: "원칙 고수 (현역 입대)",
      diff: { stock: -5, realEstate: 0, approval: 10, liquidity: 0 },
      narrative: "공정하지만, K-팝 산업이 타격을 받았습니다."
    }
  },
  // --- CHAINED EVENTS (Triggered by choices) ---
  {
    id: 'act1_tightening_protest',
    type: EVENT_TYPES.CHAIN,
    character: CHAR.SME.name,
    image: CHAR.SME.img,
    text: "총재님! 지난번 금리 인상 때문에 이자가 두 배가 됐습니다! 우리 다 죽으라는 겁니까?",
    left: {
      text: "고통 분담 부탁드립니다",
      diff: { stock: -5, realEstate: -5, approval: -10, liquidity: -5 },
      narrative: "시위대가 계란을 던집니다. 하지만 물가는 잡히고 있습니다."
    },
    right: {
      text: "지원책 마련 (완화)",
      diff: { stock: 5, realEstate: 5, approval: 10, liquidity: 5 },
      narrative: "긴축 기조가 흔들립니다. 시장이 혼란스러워합니다."
    }
  },
  {
    id: 'act1_inflation_warning',
    type: EVENT_TYPES.CHAIN,
    character: CHAR.FOREIGN.name,
    image: CHAR.FOREIGN.img,
    text: "금리 동결 여파로 기대인플레이션이 4%를 넘었습니다. 원화 가치가 폭락 중입니다.",
    left: {
      text: "빅스텝 단행 (0.5%p↑)",
      diff: { stock: -20, realEstate: -10, approval: -15, liquidity: -20 },
      narrative: "늦었지만 불을 끕니다. 충격 요법에 시장이 발작합니다."
    },
    right: {
      text: "점진적 인상",
      diff: { stock: -5, realEstate: 5, approval: -5, liquidity: -5 },
      narrative: "미지근한 대응에 자본 유출이 가속화됩니다."
    }
  }
];
