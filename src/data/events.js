import imgPresident from '../assets/clay_president_1770346924340.png';
import imgChaebol from '../assets/clay_chaebol_1770346938273.png';
import imgAnt from '../assets/clay_ant_investor_1770346965403.png';
import imgForeign from '../assets/clay_foreign_investor_1770346980559.png';
import imgMentor from '../assets/char_mentor_scholar_1770304939917.png';
import imgUnion from '../assets/korean_db_union_1770344816296.png';
import imgPoliticianSlick from '../assets/korean_db_politician_1770344772080.png';
import imgReporterFrantic from '../assets/clay_reporter_1770347027963.png';
import imgSME from '../assets/korean_db_sme_1770344788709.png';

// Character mapping for consistency
const CHAR = {
  PRESIDENT: { name: "대통령", img: imgPresident },
  CHAEBOL: { name: "재벌 회장", img: imgChaebol },
  ANT: { name: "개미 투자자", img: imgAnt },
  FOREIGN: { name: "외국인 투자자 / IMF", img: imgForeign },
  MENTOR: { name: "전임 총재", img: imgMentor },
  UNION: { name: "노조 위원장", img: imgUnion },
  POLITICIAN: { name: "여당 원내대표", img: imgPoliticianSlick },
  OPPOSITION: { name: "야당 의원", img: imgPoliticianSlick },
  REPORTER: { name: "경제부 기자", img: imgReporterFrantic },
  SME: { name: "중소기업 사장", img: imgSME }
};

// Event Types for Schedule Logic
export const EVENT_TYPES = {
  MPC: 'MPC',
  FSM: 'FSM',
  GENERAL: 'GENERAL',
  URGENT: 'URGENT',
  CHAIN: 'CHAIN'
};

export const EVENTS = [
  // ===== C-001: 취임 첫날 =====
  {
    id: 'C-001',
    deck: 'CORE',
    weight: 100,  // Always want this as first card
    cooldown: 999, // Never repeat
    tags: ['inauguration', 'media', 'first_day'],
    conditions: {
      metrics: {
        infl: [0, 100],
        growth: [0, 100],
        stability: [0, 100],
        trust: [0, 100]
      },
      turn: { min: 1, max: 1 }  // Only on turn 1
    },

    act: 1,
    type: EVENT_TYPES.GENERAL,
    character: CHAR.REPORTER.name,
    image: CHAR.REPORTER.img,
    text: "한국은행 총재 첫 출근. 기자들의 플래시 세례. 물가는 꿈틀대고 환율은 요동친다. 모든 책임은 이제 당신의 몫.",
    left: {
      text: "조용히 사무실로",
      diff: { infl: 0, growth: 0, stability: 0, trust: -5 },
      narrative: "존재감 ↓",
      chains: [{ eventId: 'C-003', delay: 0 }]
    },
    right: {
      text: "\"안정 최우선!\" 연설",
      diff: { infl: 0, growth: 0, stability: 0, trust: 5 },
      narrative: "기대 ↑",
      chains: [{ eventId: 'C-002', delay: 0 }]
    }
  },

  // ===== C-002: 자신만만한 취임 연설의 여파 =====
  {
    id: 'C-002',
    act: 1,
    type: EVENT_TYPES.GENERAL,
    character: CHAR.REPORTER.name,
    image: CHAR.REPORTER.img,
    text: "당신은 취임 연설에서 \"물가 안정을 위해 어떠한 고통도 감내하겠다\"고 선언했습니다. 언론은 \"매파 총재의 등장\"이라 평하며 기대를 표합니다. 그러나 일부 정치인은 \"성장도 중요하다\"며 견제구를 날립니다.",
    left: {
      text: "\"성장도 유념하겠다.\" 유연한 태도를 보인다",
      diff: { infl: 0, growth: 1, stability: 0, trust: -3 },
      narrative: "신뢰가 다소 감소했지만 완화 기대감이 생겼습니다.",
      chains: [{ eventId: 'C-004', delay: 0 }]
    },
    right: {
      text: "\"물가가 최우선이다.\" 초심을 강조하며 일축한다",
      diff: { infl: 0, growth: -2, stability: 0, trust: 5 },
      narrative: "시장의 신뢰가 상승했지만 경기 둔화 우려가 커졌습니다.",
      chains: [{ eventId: 'C-004', delay: 0 }]
    }
  },

  // ===== C-003: 조용한 출발, 퍼지는 소문 =====
  {
    id: 'C-003',
    act: 1,
    type: EVENT_TYPES.GENERAL,
    character: CHAR.REPORTER.name,
    image: CHAR.REPORTER.img,
    text: "당신은 별다른 공식 발언 없이 조용히 업무 파악에 집중했습니다. 대중은 새 총재의 침묵에 궁금증을 표합니다. \"총재가 자신감이 없는 것 아니냐\"는 소문이 돌고, 일부 언론은 당신의 정책 방향을 추측하며 설왕설래합니다.",
    left: {
      text: "계속 침묵하며 정보를 더 모은다",
      diff: { infl: 0, growth: 0, stability: 0, trust: -3 },
      narrative: "불확실성이 증가했습니다.",
      chains: [{ eventId: 'C-004', delay: 0 }]
    },
    right: {
      text: "\"시기가 오면 말하겠다.\" 언론에 신중한 입장을 전한다",
      diff: { infl: 0, growth: 0, stability: 0, trust: -2 },
      narrative: "투명성에 대한 불만이 있지만 신중함은 평가받았습니다.",
      chains: [{ eventId: 'C-004', delay: 0 }]
    }
  },

  // ===== C-004: 첫 번째 금통위 – 기준금리를 올릴까? =====
  {
    id: 'C-004',
    act: 1,
    type: EVENT_TYPES.MPC,
    character: CHAR.POLITICIAN.name,
    image: CHAR.POLITICIAN.img,
    text: "취임 후 첫 금융통화위원회가 열렸습니다. 물가상승률이 목표치를 넘어서고 있지만 경기는 불안합니다. 일부 위원은 선제 금리인상이 필요하다고 주장하는 반면, 다른 이들은 더 지켜보자고 합니다. 당신의 선택은 온 나라의 이목을 끕니다.",
    left: {
      text: "동결하여 상황을 더 지켜본다",
      diff: { infl: 3, growth: 2, stability: 0, trust: 0 },
      narrative: "경기를 방어했지만 인플레 우려가 커졌습니다.",
      chains: [{ eventId: 'C-019', delay: 0 }]
    },
    right: {
      text: "기준금리를 0.25%p 인상한다",
      diff: { infl: -5, growth: -3, stability: 0, trust: 0 },
      narrative: "물가 상승률 억제 기대가 생겼지만 성장 둔화가 우려됩니다.",
      chains: [{ eventId: 'C-005', delay: 0 }]
    }
  },

  // ===== C-005: 금리 인상 후 기자회견 (긴축 노선) =====
  {
    id: 'C-005',
    act: 2,
    type: EVENT_TYPES.MPC,
    character: CHAR.REPORTER.name,
    image: CHAR.REPORTER.img,
    text: "당신은 금리를 올린 직후 첫 기자회견에 섰습니다. 한 경제 기자가 \"경기 침체 우려에도 금리를 올린 이유\"를 묻습니다. 다른 기자는 \"가계부채 부담이 커질 텐데 대책이 있는가요?\"라고 압박합니다.",
    left: {
      text: "\"완만한 경기 대응도 병행하겠습니다.\" 유연하게 답변",
      diff: { infl: 0, growth: 1, stability: 0, trust: -1 },
      narrative: "의지 약화로 인한 의구심이 생겼지만 완화 기대가 생겼습니다.",
      chains: [{ eventId: 'C-006', delay: 0 }]
    },
    right: {
      text: "\"물가 안정이 최선의 길입니다.\" 단호하게 답변",
      diff: { infl: 0, growth: -2, stability: 0, trust: 3 },
      narrative: "중앙은행 의지에 대한 신뢰가 높아졌지만 경기 우려가 지속됩니다.",
      chains: [{ eventId: 'C-006', delay: 0 }]
    }
  },

  // ===== C-006: \"금리 내려 달라\" – 자영업자들의 청원 =====
  {
    id: 'C-006',
    act: 2,
    type: EVENT_TYPES.GENERAL,
    character: CHAR.SME.name,
    image: CHAR.SME.img,
    text: "금리 인상 소식에 자영업자들과 영끌족이 온라인 청원을 시작했습니다. \"살려주세요! 이자 감당이 안 됩니다\"라는 제목으로 수만 명의 서명이 모였습니다. 거리에는 \"고금리 반대\" 피켓을 든 소상공인들의 시위 사진이 뉴스에 보도됩니다.",
    left: {
      text: "상환 유예나 지원책을 약속하며 달랜다",
      diff: { infl: 0, growth: 0, stability: -2, trust: 3 },
      narrative: "민심을 달랬지만 부채 구조조정 부담이 증가했습니다.",
      chains: [{ eventId: 'C-007', delay: 0 }]
    },
    right: {
      text: "\"고통은 일시적\"이라며 정책을 고수한다",
      diff: { infl: -1, growth: 0, stability: 0, trust: -2 },
      narrative: "서민층 불만이 커졌지만 물가 안정 기대는 유지되었습니다.",
      chains: [{ eventId: 'C-007', delay: 0 }]
    }
  },

  // ===== C-007: 얼어붙은 부동산 시장 =====
  {
    id: 'C-007',
    act: 2,
    type: EVENT_TYPES.FSM,
    character: CHAR.CHAEBOL.name,
    image: CHAR.CHAEBOL.img,
    text: "금리 인상 여파로 부동산 거래가 급냉했습니다. \"거래 절벽\"으로 중개업소들은 개점휴업이고, 집값이 하락하며 건설사 자금줄도 마르고 있습니다. 한편, 주택 실수요자들은 집값 하락을 반기지만, 금융권에선 부동산 PF 부실을 우려합니다.",
    left: {
      text: "부동산 연착륙 대책을 마련한다 (건설사 지원펀드)",
      diff: { infl: 1, growth: 2, stability: -2, trust: 0 },
      narrative: "경기를 방어했지만 정책비용이 증가하고 자산가격이 방어되었습니다.",
      chains: [{ eventId: 'C-008', delay: 0 }]
    },
    right: {
      text: "시장에 개입하지 않는다. \"거품 조정은 필요하다\"",
      diff: { infl: -1, growth: -3, stability: 0, trust: 2 },
      narrative: "건설 경기가 위축되었지만 자산 가격이 안정되고 원칙을 고수했다는 평가를 받았습니다.",
      chains: [{ eventId: 'C-018', delay: 0 }]
    }
  },

  // ===== C-008: \"연착륙 지원\"의 명암 =====
  {
    id: 'C-008',
    act: 2,
    type: EVENT_TYPES.FSM,
    character: CHAR.CHAEBOL.name,
    image: CHAR.CHAEBOL.img,
    text: "당신은 부동산 시장 연착륙을 위해 건설사 대출 만기연장, 주택담보대출 규제 완화 등의 지원책을 내놓았습니다. 덕분에 부동산 급락세는 진정되고 건설사 부도는 막았지만, 일부 투자자들은 다시 투기를 꿈꾸기 시작했습니다.",
    left: {
      text: "당분간 지켜본다. \"과열 조짐은 없다\"",
      diff: { infl: 2, growth: 1, stability: 0, trust: -2 },
      narrative: "자산 가격 재상승 우려가 커지고 경기는 방어되었지만 투기 용인 비판을 받았습니다.",
      chains: [{ eventId: 'C-011', delay: 1 }]
    },
    right: {
      text: "규제를 다시 조인다. \"투기 차단\" 메시지",
      diff: { infl: -1, growth: -2, stability: 0, trust: 2 },
      narrative: "자산가격이 안정되고 일관성에 대한 신뢰가 상승했지만 경기 불안이 커졌습니다.",
      chains: [{ eventId: 'C-011', delay: 1 }]
    }
  },

  // ===== C-011: 글로벌 경제위기 발발! =====
  {
    id: 'C-011',
    act: 3,
    type: EVENT_TYPES.URGENT,
    character: CHAR.FOREIGN.name,
    image: CHAR.FOREIGN.img,
    text: "해외에서 날아온 충격파! 주요국 금융위기가 터지고 세계 증시가 폭락했습니다. \"글로벌 경제위기\"라는 단어가 신문 1면을 장식하고, 수출 의존도가 높은 한국 경제에도 빨간불이 켜졌습니다. 갑자기 찾아온 폭풍에 당신의 정책 방향도 재점검이 필요합니다.",
    left: {
      text: "기준금리 유지로 상황을 지켜본다",
      diff: { infl: 0, growth: -4, stability: 0, trust: 3 },
      narrative: "경기 악화 우려가 커졌지만 원칙 유지로 시장이 안정되었습니다.",
      chains: [{ eventId: 'C-013', delay: 0 }]
    },
    right: {
      text: "신속한 금리인하로 경기 방어에 나선다",
      diff: { infl: 2, growth: 4, stability: 0, trust: 0 },
      narrative: "경기 부양 기대가 생겼지만 물가 상승 압력이 커졌습니다.",
      chains: [{ eventId: 'C-012', delay: 0 }]
    }
  },

  // ===== C-012: 선제 완화의 효과와 부작용 =====
  {
    id: 'C-012',
    act: 3,
    type: EVENT_TYPES.MPC,
    character: CHAR.FOREIGN.name,
    image: CHAR.FOREIGN.img,
    text: "당신은 기민하게 금리인하를 단행했습니다. 시장에 유동성이 공급되며 금융 붕괴는 막았고, \"한은의 신속 대응\"이라는 평가가 나옵니다. 덕분에 실업률 상승세가 둔화되고 경기 하강을 방어했지만, 일각에서는 인플레이션 재발을 우려하기 시작합니다.",
    left: {
      text: "경기부양 기조 유지를 시사하며 낮은 금리 지속",
      diff: { infl: 2, growth: 3, stability: 0, trust: -1 },
      narrative: "경기반등 기대가 커졌지만 인플레 우려와 물가관리 의지 의문이 생겼습니다.",
      chains: [{ eventId: 'C-014', delay: 1 }]
    },
    right: {
      text: "\"물가도 주시 중\"이라고 강조하며 추가 완화에 신중",
      diff: { infl: 0, growth: 1, stability: 0, trust: 2 },
      narrative: "정책 신뢰가 일부 회복되고 경기 회복이 지속되었습니다.",
      chains: [{ eventId: 'C-014', delay: 1 }]
    }
  },

  // ===== C-013: 긴축 고수의 대가 =====
  {
    id: 'C-013',
    act: 3,
    type: EVENT_TYPES.MPC,
    character: CHAR.POLITICIAN.name,
    image: CHAR.POLITICIAN.img,
    text: "글로벌 위기 속에서도 당신은 금리를 함부로 내리지 않았습니다. \"금융안정기금 등 다른 수단을 우선 활용하겠다\"는 입장입니다. 일부에서는 중앙은행의 원칙을 지켰다고 평가하지만, 현실 경제는 급랭 중입니다. 중소기업 연쇄 도산과 은행 연체율 급등 소식이 들려옵니다.",
    left: {
      text: "늦었지만 이제야 금리인하에 나선다",
      diff: { infl: 0, growth: 1, stability: 0, trust: -3 },
      narrative: "소폭 완화를 시도했지만 뒤늦은 대응에 신뢰가 하락했습니다.",
      chains: [{ eventId: 'C-014', delay: 1 }]
    },
    right: {
      text: "\"견딜 수 있다\"며 버틴다",
      diff: { infl: 0, growth: -4, stability: 0, trust: 1 },
      narrative: "원칙주의에 대한 칭찬과 비판이 혼재하지만 심각한 경기 침체가 왔습니다.",
      chains: [{ eventId: 'C-014', delay: 1 }]
    }
  },

  // ===== C-014: 국정감사 증인 출석 – 정치권의 문책 =====
  {
    id: 'C-014',
    act: 3,
    type: EVENT_TYPES.GENERAL,
    character: CHAR.POLITICIAN.name,
    image: CHAR.POLITICIAN.img,
    text: "경제 상황이 심각해지자 국회에서 당신을 국정감사 증인으로 불렀습니다. 여야 의원들이 번갈아 가며 호통을 칩니다. 한 의원: \"총재님, 이렇게 경기 망가뜨릴 거면 금리는 왜 올렸습니까?\" 다른 의원은 정반대로 \"물가 이 모양인데 도대체 뭐 하셨습니까?\"",
    left: {
      text: "유감의 뜻을 표하며 고개를 숙인다",
      diff: { infl: 0, growth: 0, stability: 0, trust: -2 },
      narrative: "리더십에 의구심이 생겼지만 정치권은 일시적으로 만족했습니다.",
      chains: [{ eventId: 'C-015', delay: 0 }]
    },
    right: {
      text: "차분히 설명하며 원론을 고수한다",
      diff: { infl: 0, growth: 0, stability: 0, trust: 1 },
      narrative: "전문성에 일부 공감을 얻었지만 정치권 불만은 지속됩니다.",
      chains: [{ eventId: 'C-015', delay: 0 }]
    }
  },

  // ===== C-015: 청와대의 압력 – \"금리 좀 내려요\" =====
  {
    id: 'C-015',
    act: 3,
    type: EVENT_TYPES.URGENT,
    character: CHAR.PRESIDENT.name,
    image: CHAR.PRESIDENT.img,
    text: "선거를 몇 달 앞두고, 청와대 경제수석이 조용히 전화를 걸어옵니다. \"총재님, 경기 부양이 시급합니다. 금리 인하나 유동성 공급을 적극 검토해주시면…\"라는 은근한 압력입니다. 대통령의 의중임을 당신도 느낄 수 있습니다. 중앙은행의 독립성과 현실 정치 사이에서 고민이 깊어집니다.",
    left: {
      text: "정치적 요구를 수용한다. 금리 인하 쪽으로 기조 선회",
      diff: { infl: 2, growth: 2, stability: 0, trust: -4 },
      narrative: "정권과 공조를 강화했지만 중앙은행 신뢰가 훼손되었습니다.",
      chains: [{ eventId: 'C-017', delay: 1 }]
    },
    right: {
      text: "정책 독립을 지킨다. \"물가 안정이 우선\"",
      diff: { infl: 0, growth: 0, stability: 0, trust: 3 },
      narrative: "원칙 준수에 대한 신뢰를 얻었지만 정권의 눈밖에 났습니다.",
      chains: [{ eventId: 'C-016', delay: 1 }]
    }
  },

  // ===== C-016: 원칙 사수 – 쓸쓸한 영광 (ENDING) =====
  {
    id: 'C-016',
    act: 4,
    type: EVENT_TYPES.GENERAL,
    character: CHAR.MENTOR.name,
    image: CHAR.MENTOR.img,
    text: "당신은 끝내 정치권 요구를 뿌리치고 금리를 함부로 내리지 않았습니다. 선거를 앞둔 정부와 갈등이 깊어졌고, 언론에는 \"정부 vs 한은 충돌\" 기사가 연일 보도되었습니다. 결과적으로 물가는 안정 궤도에 들었고 장기적 금융안정이 확보되었다는 평가를 받았습니다. 그러나 정권 교체 후, 신임 대통령은 당신의 연임을 반대하고 있습니다.",
    left: {
      text: "\"끝까지 싸운다.\" 사임 거부 및 항의 발언",
      diff: { infl: 0, growth: 0, stability: 0, trust: 2 },
      narrative: "지지자들의 응원을 받았지만 정치적 고립이 심화되었습니다.",
      isEnding: true,
      endingType: 'INDEPENDENCE_DEFIANT'
    },
    right: {
      text: "\"소신은 후회 없다.\" 담담히 퇴임한다",
      diff: { infl: 0, growth: 0, stability: 0, trust: 5 },
      narrative: "역사의 긍정적 평가와 국제적 명성을 얻었습니다.",
      isEnding: true,
      endingType: 'INDEPENDENCE_HONORED'
    }
  },

  // ===== C-017: 영광 없는 타협 – 총재의 최후 (ENDING) =====
  {
    id: 'C-017',
    act: 4,
    type: EVENT_TYPES.GENERAL,
    character: CHAR.PRESIDENT.name,
    image: CHAR.PRESIDENT.img,
    text: "당신은 정부 요구대로 금리를 인하하고 시중에 자금을 풀었습니다. 선거 직전 경기가 일시 반등하며 여당은 승리를 거뒀지만, 몇 달 후 물가와 부채가 다시 문제가 됩니다. 선거 후 당신은 희생양이 됩니다. \"물가 폭등은 한은 탓\"이라는 비난 여론 속에, 청와대는 슬그머니 당신의 사의를 표명했다고 발표했습니다.",
    left: {
      text: "\"제가 왜 물러납니까.\" 버티며 책임을 반박",
      diff: { infl: 0, growth: 0, stability: 0, trust: -3 },
      narrative: "결국 압력을 면하기 어려웠고 혼란이 가중되었습니다.",
      isEnding: true,
      endingType: 'POLITICAL_COLLAPSE_DEFIANT'
    },
    right: {
      text: "\"책임지겠습니다.\" 스스로 자리에서 물러난다",
      diff: { infl: 0, growth: 0, stability: 0, trust: -5 },
      narrative: "중앙은행 신뢰가 추락했지만 정치권은 만족했습니다.",
      isEnding: true,
      endingType: 'POLITICAL_COLLAPSE_RESIGNED'
    }
  },

  // ===== C-018: 깊어지는 불황, 총재의 고민 (매파 극단 경로) =====
  {
    id: 'C-018',
    act: 3,
    type: EVENT_TYPES.URGENT,
    character: CHAR.SME.name,
    image: CHAR.SME.img,
    text: "부동산 시장에 개입하지 않고 고금리 기조를 이어가자 부동산발 경제위기가 현실화됐습니다. 건설 현장은 멈추고 중소 건설사들이 도산 직전입니다. 은행 대출 부실률이 치솟고, 실업자 수가 급증합니다. 언론은 연일 \"최악의 경기 침체\"를 보도하며 한국은행을 향해 비난을 퍼붓습니다.",
    left: {
      text: "방향 전환을 모색. \"필요하다면 완화로 전환 검토\"",
      diff: { infl: 0, growth: 0, stability: 0, trust: 1 },
      narrative: "일부 기대가 생겼지만 일관성 상실 우려가 있습니다.",
      chains: [{ eventId: 'C-034', delay: 0 }]
    },
    right: {
      text: "끝까지 긴축 기조를 유지한다",
      diff: { infl: -2, growth: -5, stability: 0, trust: -4 },
      narrative: "물가는 하락했지만 경제가 심각하게 악화되고 여론이 악화되었습니다.",
      chains: [{ eventId: 'C-034', delay: 0 }]
    }
  },

  // ===== C-019: 금리 동결 후 기자회견 (완화 노선) =====
  {
    id: 'C-019',
    act: 2,
    type: EVENT_TYPES.MPC,
    character: CHAR.REPORTER.name,
    image: CHAR.REPORTER.img,
    text: "당신은 첫 회의에서 금리를 동결했습니다. 기자회견에서 몇몇 기자들은 \"물가 상승이 뚜렷한데 안이한 것 아니냐\"라는 날카로운 질문을 던집니다. 반면 일부 경제지는 \"경기 고려 적절한 결정\"이라 평가했습니다. 원/달러 환율은 즉각 반응하여 상승했고, 수입물가가 오를 거란 우려가 나옵니다.",
    left: {
      text: "\"상황을 면밀히 주시하겠다\" 신중한 입장",
      diff: { infl: 0, growth: 0, stability: 0, trust: -1 },
      narrative: "약간의 불안이 지속되고 있습니다.",
      chains: [{ eventId: 'C-020', delay: 0 }]
    },
    right: {
      text: "\"인플레는 일시적일 것\" 낙관한다",
      diff: { infl: 1, growth: 0, stability: 0, trust: -3 },
      narrative: "안일하다는 비판과 대외 신뢰도 하락, 인플레 기대 상승이 있었습니다.",
      chains: [{ eventId: 'C-020', delay: 0 }]
    }
  },

  // ===== C-020: 뜨거운 돈, 자산시장 과열 =====
  {
    id: 'C-020',
    act: 2,
    type: EVENT_TYPES.GENERAL,
    character: CHAR.ANT.name,
    image: CHAR.ANT.img,
    text: "저금리가 이어지자 시중의 자금이 부동산, 주식, 가상자산으로 몰려들고 있습니다. \"영끌\"하여 집을 사는 2030 세대가 속출하고, 코스피와 코인 가격이 연일 신고가입니다. 한편 인터넷에는 \"원화 휴지조각설\" 같은 자극적 루머까지 나돌며 사람들이 불안해하기 시작했습니다.",
    left: {
      text: "\"시장에 맡긴다\" 개입을 자제",
      diff: { infl: 2, growth: 1, stability: 0, trust: -2 },
      narrative: "거품 지속 우려와 방관 비판이 있지만 자유시장 선호층 평가는 상승했습니다.",
      chains: [{ eventId: 'C-021', delay: 1 }]
    },
    right: {
      text: "투기 경고 메시지를 내고 감독강화를 주문",
      diff: { infl: -1, growth: 0, stability: 0, trust: 2 },
      narrative: "중앙은행 역할 기대가 커지고 일부 과열이 진정되었습니다.",
      chains: [{ eventId: 'C-021', delay: 1 }]
    }
  },

  // ===== C-021: 물가 비상! 인플레이션 급등 =====
  {
    id: 'C-021',
    act: 3,
    type: EVENT_TYPES.URGENT,
    character: CHAR.SME.name,
    image: CHAR.SME.img,
    text: "소비자물가 상승률이 두 자릿수에 근접하며 국민 생활비가 크게 올랐습니다. 장바구니 물가가 치솟자 뉴스에서는 \"생필품 가격 폭등, 한국은행 뭐하나\"라는 비판이 쏟아집니다. 길거리 인터뷰마다 시민들은 \"월급 빼고 다 올랐다\"며 한숨입니다. 급기야 원/달러 환율이 1500원을 넘어서며 수입 물가까지 자극하고 있습니다.",
    left: {
      text: "\"일시적 현상\"이라며 기다린다",
      diff: { infl: 3, growth: 0, stability: 0, trust: -5 },
      narrative: "물가상승이 지속되고 한은 불신이 증폭되며 대외 신인도가 추락했습니다.",
      chains: [{ eventId: 'C-022', delay: 0 }]
    },
    right: {
      text: "긴급 금리인상으로 인플레이션 잡기에 나선다",
      diff: { infl: -5, growth: -4, stability: 0, trust: 0 },
      narrative: "인플레 억제 기대가 생겼지만 경기 급랭 우려가 커졌습니다.",
      chains: [{ eventId: 'C-023', delay: 0 }]
    }
  },

  // ===== C-022: 폭주하는 인플레이션 (비둘기 극단 경로) =====
  {
    id: 'C-022',
    act: 3,
    type: EVENT_TYPES.URGENT,
    character: CHAR.ANT.name,
    image: CHAR.ANT.img,
    text: "결국 조치를 미루는 사이 인플레이션이 통제 불능 상태에 이르렀습니다. 시민들은 마트를 가도 사재기를 하고, 원화 가치는 급락하여 달러를 구하려는 행렬이 은행에 늘어섭니다. \"하이퍼인플레이션 오나?\" 언론은 공포 분위기를 조성합니다. 시중에선 금과 달러를 사재기하는 모습까지 포착됩니다.",
    left: {
      text: "유동성 공급으로 금융시장 붕괴를 막는 데 주력",
      diff: { infl: 1, growth: 0, stability: -5, trust: -5 },
      narrative: "물가가 추가 상승하고 원화 신용 위험과 정책 실패에 대한 절망이 커졌습니다.",
      chains: [{ eventId: 'C-034', delay: 0 }]
    },
    right: {
      text: "긴급 금리인상 카드를 꺼내들지만…",
      diff: { infl: -2, growth: 0, stability: 0, trust: -4 },
      narrative: "물가잡기엔 역부족이고 뒤늦은 대응에 신뢰를 상실했습니다.",
      chains: [{ eventId: 'C-034', delay: 0 }]
    }
  },

  // ===== C-023: 빅스텝 – 늦은 대응의 충격 =====
  {
    id: 'C-023',
    act: 3,
    type: EVENT_TYPES.MPC,
    character: CHAR.FOREIGN.name,
    image: CHAR.FOREIGN.img,
    text: "당신은 결국 금리를 큰 폭으로 인상했습니다. 시장에서는 \"뒤늦은 빅스텝\"이라며 충격을 받았고, 주식과 부동산 시장이 급락했습니다. 가까스로 물가상승률은 정점에 달한 듯 보이지만 경제에는 깊은 상처가 남았습니다. 중소기업들은 급격한 자금 부담으로 아우성이고, 가계대출 연체율도 상승세입니다.",
    left: {
      text: "\"상황을 보며 조정\" 완화적 신호를 준다",
      diff: { infl: 1, growth: 1, stability: 0, trust: -2 },
      narrative: "인플레 둔화가 더디고 약간의 안도가 있지만 일관성에 의문이 생겼습니다.",
      chains: [{ eventId: 'C-024', delay: 0 }]
    },
    right: {
      text: "\"물가 안정이 우선\" 추가 인상 여지도 열어둔다",
      diff: { infl: -2, growth: -3, stability: 0, trust: 1 },
      narrative: "인플레가 빠르게 진정되고 정책 의지를 평가받았지만 경기 침체가 심화되었습니다.",
      chains: [{ eventId: 'C-024', delay: 0 }]
    }
  },

  // ===== C-024: 금융권 위기 조짐 – 중소은행 경영 악화 =====
  {
    id: 'C-024',
    act: 3,
    type: EVENT_TYPES.FSM,
    character: CHAR.CHAEBOL.name,
    image: CHAR.CHAEBOL.img,
    text: "급격한 금리 인상 여파로 일부 지방은행과 저축은행에 위기설이 돌고 있습니다. 대출자들이 높은 이자를 못 견디고 연체하면서, A저축은행에서는 뱅크런(예금 인출 사태)까지 벌어졌습니다. 금융당국이 부랴부랴 예금 보호를 강조하지만 시민들의 불안은 커져갑니다.",
    left: {
      text: "시장 논리에 맡긴다. \"필요시 정부와 협조\"",
      diff: { infl: 0, growth: 0, stability: 0, trust: -3 },
      narrative: "불안이 증폭되었습니다.",
      chains: [{ eventId: 'C-026', delay: 0 }]
    },
    right: {
      text: "한은이 긴급 자금지원에 나선다",
      diff: { infl: 0, growth: 0, stability: -3, trust: 2 },
      narrative: "중앙은행 대출이 증가하고 금융안정 기대가 생겼습니다.",
      chains: [{ eventId: 'C-025', delay: 0 }]
    }
  },

  // ===== C-025: 구제금융의 딜레마 =====
  {
    id: 'C-025',
    act: 3,
    type: EVENT_TYPES.FSM,
    character: CHAR.CHAEBOL.name,
    image: CHAR.CHAEBOL.img,
    text: "위기에 처한 금융기관들에 한국은행이 뒷문으로 자금을 지원했습니다. A저축은행 사태는 진정되었지만 \"모럴해저드\" 논란이 일었습니다. 국민 세금은 아니지만 중앙은행 돈으로 부실을 막았다는 비판입니다. 한편 은행들은 안도했지만, 향후 금융회사들이 위험을 가볍게 볼 수 있다는 우려가 제기됩니다.",
    left: {
      text: "금융 규제 강화를 예고하며 도덕적 해이 차단",
      diff: { infl: 0, growth: -1, stability: 0, trust: 2 },
      narrative: "단호함에 대한 안도와 금융안정 의지를 보였지만 대출심사가 보수화되었습니다.",
      chains: [{ eventId: 'C-027', delay: 0 }]
    },
    right: {
      text: "\"예외적인 조치\"였음을 강조하며 재발 방지 촉구",
      diff: { infl: 0, growth: 0, stability: 0, trust: 1 },
      narrative: "불가피성을 일부 수용받았습니다.",
      chains: [{ eventId: 'C-027', delay: 0 }]
    }
  },

  // ===== C-026: 시장 자정에 맡긴 후폭풍 =====
  {
    id: 'C-026',
    act: 3,
    type: EVENT_TYPES.FSM,
    character: CHAR.ANT.name,
    image: CHAR.ANT.img,
    text: "취약 금융기관을 방치한 결과, A저축은행은 결국 영업정지에 들어갔습니다. 예금자 일부는 예금보험 한도를 넘는 돈을 잃었고 거리로 나와 눈물로 항의했습니다. 다른 중소 금융사들도 불안에 떨며 서로 돈 빌리길 꺼려 유동성 경색 조짐이 보입니다. \"한은, lender of last resort 역할 포기했나\"라는 비판이 나옵니다.",
    left: {
      text: "요지부동, 정부에 공을 넘기고 구조조정 유도",
      diff: { infl: 0, growth: 0, stability: 0, trust: -4 },
      narrative: "중앙은행 역할 포기 비난과 국제적 평판 하락이 있었습니다.",
      chains: [{ eventId: 'C-027', delay: 0 }]
    },
    right: {
      text: "이제라도 뒤늦게 긴급유동성 공급 조치",
      diff: { infl: 0, growth: 0, stability: -2, trust: -1 },
      narrative: "뒷북 대응이라는 평가를 받았습니다.",
      chains: [{ eventId: 'C-027', delay: 0 }]
    }
  },

  // ===== C-027: IMF의 충고 =====
  {
    id: 'C-027',
    act: 3,
    type: EVENT_TYPES.GENERAL,
    character: CHAR.FOREIGN.name,
    image: CHAR.FOREIGN.img,
    text: "아시아 지역을 담당하는 IMF 이사가 긴급 방문해 당신을 만났습니다. IMF는 최근 한국의 높은 물가와 금융 불안에 우려를 표하며 \"결단력 있는 통화긴축으로 신뢰를 회복하라\"고 권고했습니다. 한편 국내에선 \"더 조이면 경제 주저앉는다\"는 반발이 있습니다. 국제권고와 국내상황 사이에서 고민이 깊습니다.",
    left: {
      text: "완만한 대응. \"국내 상황을 고려한 단계적 조정\"",
      diff: { infl: 0, growth: 1, stability: 0, trust: -2 },
      narrative: "경기를 방어했지만 국제신뢰가 저하되고 국제평가가 미흡했습니다.",
      chains: [{ eventId: 'C-029', delay: 0 }]
    },
    right: {
      text: "권고 수용. 추가 금리인상 등 강경 대응 예고",
      diff: { infl: 0, growth: -3, stability: 0, trust: 3 },
      narrative: "국제신뢰를 회복하고 대외 평판이 개선되었지만 국내 경기가 추가 위축되었습니다.",
      chains: [{ eventId: 'C-028', delay: 0 }]
    }
  },

  // ===== C-028: 최후의 긴축 – 인플레 잡았지만… =====
  {
    id: 'C-028',
    act: 3,
    type: EVENT_TYPES.MPC,
    character: CHAR.FOREIGN.name,
    image: CHAR.FOREIGN.img,
    text: "당신은 IMF도 인정할 만큼 강력한 긴축을 단행했습니다. 정책금리를 큰 폭으로 추가 인상하고 시중 유동성을 급격히 축소했습니다. 덕분에 치솟던 물가상승률은 뚝 떨어져 목표치에 근접했습니다. 그러나 경제는 혹독한 대가를 치렀습니다. 실업률 최고치, 소상공인 폐업 속출… \"물가는 잡혔으나 국민 삶이 무너져\"라는 탄식이 나옵니다.",
    left: {
      text: "완화 전환을 신중히 고려하기 시작",
      diff: { infl: 0, growth: 1, stability: 0, trust: 1 },
      narrative: "정책 전환 기대와 늦었지만 변화 기대가 생겼습니다.",
      chains: [{ eventId: 'C-030', delay: 0 }]
    },
    right: {
      text: "\"고통은 과도기적인 것\"이라며 버틴다",
      diff: { infl: -1, growth: 0, stability: 0, trust: -2 },
      narrative: "국민원성이 지속되지만 저물가를 유지했습니다.",
      chains: [{ eventId: 'C-030', delay: 0 }]
    }
  },

  // ===== C-029: 애매한 대응 – 스태그플레이션 경고 =====
  {
    id: 'C-029',
    act: 3,
    type: EVENT_TYPES.URGENT,
    character: CHAR.REPORTER.name,
    image: CHAR.REPORTER.img,
    text: "당신은 급한 불은 끄지 못한 채 완만한 대응을 유지했습니다. 물가상승률은 여전히 목표치보다 높고, 경제성장률은 떨어지는 스태그플레이션 조짐이 보입니다. 언론은 \"한은 갈팡질팡 대처, 최악 시나리오 우려\"라고 지적합니다. 국민들의 불만은 계속되고 있고 중앙은행의 전문성에 의문부호가 붙었습니다.",
    left: {
      text: "경기 부양책을 병행하며 균형 잡기 시도",
      diff: { infl: 1, growth: 1, stability: 0, trust: -1 },
      narrative: "경기가 약간 개선되었지만 물가 안정은 지연되고 우유부단 지적을 받았습니다.",
      chains: [{ eventId: 'C-030', delay: 0 }]
    },
    right: {
      text: "방향 재설정을 선언하고 물가 안정에 올인",
      diff: { infl: -2, growth: -1, stability: 0, trust: 1 },
      narrative: "뒤늦은 결단을 평가받고 인플레를 추가 억제했지만 경기 회복이 지연되었습니다.",
      chains: [{ eventId: 'C-030', delay: 0 }]
    }
  },

  // ===== C-030: 국정감사 증인 출석 (비둘기 완화 노선) =====
  {
    id: 'C-030',
    act: 3,
    type: EVENT_TYPES.GENERAL,
    character: CHAR.POLITICIAN.name,
    image: CHAR.POLITICIAN.img,
    text: "국회에서 당신을 불러 세웠습니다. 여야 할 것 없이 \"물가 폭등을 왜 못 막았냐\"는 호통이 이어집니다. 한 여당 의원은 \"서민들이 고통받는데 한국은행은 직무유기\"라고 공격하고, 야당 의원은 \"경기침체까지 오니 이게 최악\"이라고 꼬집습니다. 당황한 당신에게 정치권의 질타는 사방에서 날아듭니다.",
    left: {
      text: "정책적 불가피성을 강조하며 반박",
      diff: { infl: 0, growth: 0, stability: 0, trust: 1 },
      narrative: "일부 공감을 얻었지만 정치권 반발이 지속됩니다.",
      chains: [{ eventId: 'C-031', delay: 0 }]
    },
    right: {
      text: "책임 인정과 사과로 자세를 낮춘다",
      diff: { infl: 0, growth: 0, stability: 0, trust: -2 },
      narrative: "전문성에 의심을 받았지만 정치권을 일시 달랬습니다.",
      chains: [{ eventId: 'C-031', delay: 0 }]
    }
  },

  // ===== C-031: 청와대의 압력 (비둘기 노선) =====
  {
    id: 'C-031',
    act: 3,
    type: EVENT_TYPES.URGENT,
    character: CHAR.PRESIDENT.name,
    image: CHAR.PRESIDENT.img,
    text: "물가 폭등으로 지지율이 흔들리자 청와대가 본격적으로 행동에 나섰습니다. 대통령 비서실장은 당신에게 \"당장 경기 부양을 위한 특단의 조치를 취하라\"는 메시지를 전합니다. 심지어 일부 여당 의원들은 한국은행법 개정 움직임까지 보이고 있습니다. 중앙은행의 최후 보루인 독립성이 시험대에 올랐습니다.",
    left: {
      text: "요구를 수용하고 적극적으로 유동성 공급과 금리인하",
      diff: { infl: 2, growth: 2, stability: 0, trust: -4 },
      narrative: "정권과 공조했지만 중앙은행 신뢰도가 타격을 입었습니다.",
      chains: [{ eventId: 'C-033', delay: 1 }]
    },
    right: {
      text: "완강히 거부. \"통화정책은 우리의 소관\"",
      diff: { infl: 0, growth: 0, stability: 0, trust: 2 },
      narrative: "원칙 수호를 평가받았지만 정권과 극한 갈등이 생겼습니다.",
      chains: [{ eventId: 'C-032', delay: 1 }]
    }
  },

  // ===== C-032: 신뢰 회복 – 가시밭길의 승리 (ENDING) =====
  {
    id: 'C-032',
    act: 4,
    type: EVENT_TYPES.GENERAL,
    character: CHAR.MENTOR.name,
    image: CHAR.MENTOR.img,
    text: "당신은 끝내 정치권 압력에도 굴하지 않았습니다. 물가는 서서히 잡혀갔고, 뒤늦게나마 국민들은 안정의 중요성을 깨닫기 시작했습니다. 임기 말, 당신은 \"초기 대응은 미흡했으나 끝내 신뢰를 지켰다\"는 평가를 받았습니다. 하지만 정권과 틀어진 관계 탓에 연임 제의는 없었습니다. 퇴임일, 일부 시민들이 \"수고했다\" 플래카드를 들고 배웅합니다.",
    left: {
      text: "\"후회는 없다\" 소회를 밝히고 연구소로 간다",
      diff: { infl: 0, growth: 0, stability: 0, trust: 3 },
      narrative: "경험 전수로 국제활동을 이어갑니다.",
      isEnding: true,
      endingType: 'DOVE_TRUST_RECOVERED_SCHOLAR'
    },
    right: {
      text: "담담히 미소 짓고 퇴임한다",
      diff: { infl: 0, growth: 0, stability: 0, trust: 5 },
      narrative: "역사에 긍정적 평가와 국제사회 신뢰를 얻었습니다.",
      isEnding: true,
      endingType: 'DOVE_TRUST_RECOVERED_HONORED'
    }
  },

  // ===== C-033: 되풀이되는 악순환 (ENDING) =====
  {
    id: 'C-033',
    act: 4,
    type: EVENT_TYPES.GENERAL,
    character: CHAR.PRESIDENT.name,
    image: CHAR.PRESIDENT.img,
    text: "당신은 정치권 요구대로 유동성을 쏟아부었습니다. 일시적으로 경기는 나아졌지만 물가는 또다시 꿈틀댔습니다. 선거 후 정부는 태도를 바꾸어 \"중앙은행이 실기했다\"고 비난했습니다. 당신은 결국 책임을 지고 임기 도중에 사퇴했습니다. 후임 총재가 부임했지만, 시장의 신뢰는 바닥이라 그는 시작부터 어려운 숙제를 안고 있습니다.",
    left: {
      text: "언론에 억울함을 토로한다",
      diff: { infl: 0, growth: 0, stability: 0, trust: -3 },
      narrative: "변명으로 받아들여졌습니다.",
      isEnding: true,
      endingType: 'DOVE_POLICY_FAILURE_DEFIANT'
    },
    right: {
      text: "조용히 물러나며 후임에게 행운을 빈다",
      diff: { infl: 0, growth: 0, stability: 0, trust: -5 },
      narrative: "중앙은행 신뢰 회복에 긴 시간이 필요합니다.",
      isEnding: true,
      endingType: 'DOVE_POLICY_FAILURE_RESIGNED'
    }
  },

  // ===== C-034: 봉투 #1 – \"금리를 내리시오\" =====
  {
    id: 'C-034',
    act: 4,
    type: EVENT_TYPES.URGENT,
    character: CHAR.MENTOR.name,
    image: CHAR.MENTOR.img,
    text: "경제가 파국으로 치닫자, 당신은 책상 서랍 속 첫 번째 봉투를 뜯었습니다. 전임 총재가 남긴 편지에는 단 한 줄이 쓰여 있습니다. \"금리를 내리시오\" 라는 조언입니다. 이 조언대로 급한 불을 끌 것인가, 망설이는 사이 시장은 아수라장입니다. 언론은 \"최악의 상황, 한은 결단 촉구\" 헤드라인을 내보냅니다.",
    left: {
      text: "조언을 무시하고 버틴다",
      diff: { infl: -1, growth: -2, stability: 0, trust: -3 },
      narrative: "물가 잡기 시도를 지속했지만 시장 실망과 경기 악화가 있었습니다.",
      chains: [{ eventId: 'C-035', delay: 0 }]
    },
    right: {
      text: "편지대로 금리 인하를 단행한다",
      diff: { infl: 3, growth: 1, stability: 0, trust: 0 },
      narrative: "급격한 완화로 일시적 경기 숨통이 트였지만 물가 상승이 가속화되었습니다.",
      chains: [{ eventId: 'C-035', delay: 0 }]
    }
  },

  // ===== C-035: 봉투 #2 – \"금리를 올리시오\" =====
  {
    id: 'C-035',
    act: 4,
    type: EVENT_TYPES.URGENT,
    character: CHAR.MENTOR.name,
    image: CHAR.MENTOR.img,
    text: "첫 번째 조언의 효과는 미미했습니다. 위기는 계속되고 오히려 다른 부작용이 나타났습니다. 결국 두 번째 봉투를 뜯어봅니다. 그 안에는 놀랍게도 \"금리를 올리시오\" 라는 반대의 조언이 적혀 있습니다. 앞뒤가 맞지 않는 편지들에 당황스럽지만, 이제 와서 정책 방향을 바꾸는 게 능사인지 고민됩니다.",
    left: {
      text: "그래도 완화기조 유지, 편지 조언을 무시",
      diff: { infl: 1, growth: 0, stability: 0, trust: -3 },
      narrative: "인플레가 지속되고 시장 혼란이 지속되었습니다.",
      chains: [{ eventId: 'C-036', delay: 0 }]
    },
    right: {
      text: "급히 금리인상으로 선회한다",
      diff: { infl: -2, growth: 0, stability: 0, trust: -4 },
      narrative: "갈팡질팡 정책으로 물가 진정은 미미하고 신뢰도가 급추락했습니다.",
      chains: [{ eventId: 'C-036', delay: 0 }]
    }
  },

  // ===== C-036: 봉투 #3 – \"후임자를 위해 봉투를 준비하시오\" (ENDING) =====
  {
    id: 'C-036',
    act: 4,
    type: EVENT_TYPES.URGENT,
    character: CHAR.MENTOR.name,
    image: CHAR.MENTOR.img,
    text: "결국 상황은 통제불능입니다. 마지막 세 번째 봉투를 열어봅니다. \"후임자를 위해 봉투 세 개를 준비하시오.\" 전임자가 남긴 마지막 농담 어린 조언입니다. 스튜디오에선 당신의 사퇴설이 흘러나오고, 시민들은 분노와 실의에 찬 눈으로 한은을 바라봅니다.",
    left: {
      text: "끝까지 자리를 지킨다 해도 이미 게임 오버...",
      diff: { infl: 0, growth: 0, stability: -5, trust: -5 },
      narrative: "결과는 동일합니다. 경제가 붕괴했습니다.",
      isEnding: true,
      endingType: 'ECONOMIC_COLLAPSE_STUBBORN'
    },
    right: {
      text: "책임을 지고 사퇴한다",
      diff: { infl: 0, growth: 0, stability: -5, trust: -5 },
      narrative: "중앙은행 신뢰가 바닥이고 국제적 망신을 당했습니다.",
      isEnding: true,
      endingType: 'ECONOMIC_COLLAPSE_RESIGNED'
    }
  },

  // ===== PHASE A+: SATIRICAL SIDE EVENTS (C-037~C-050) =====

  // C-037: 대기업 회장의 요청 – "금리 좀 낮춰주세요"
  {
    id: 'C-037',
    deck: 'DAILY',
    weight: 40,
    cooldown: 15,
    tags: ['chaebol', 'lobbying'],
    conditions: {
      metrics: { growth: [0, 50] },
      turn: { min: 5 }
    },
    type: EVENT_TYPES.GENERAL,
    character: CHAR.CHAEBOL.name,
    image: CHAR.CHAEBOL.img,
    text: "한 재벌 그룹 회장이 비공식 만남을 요청해왔습니다. 그는 \"환율도 안정되고 있으니 금리 좀 내려 기업활동을 도와달라\"고 읍소합니다. 수출기업들은 원화 강세와 고금리로 채산성이 악화되었다며 로비를 강화하고 있습니다.",
    left: {
      text: "유연한 태도. 기업대출 금리인하 등 우회 지원책 모색",
      diff: { infl: 0, growth: 2, stability: -1, trust: -1 },
      narrative: "기업 활력을 도모했지만 부채 증가 소지와 원칙 후퇴 지적이 있었습니다."
    },
    right: {
      text: "원칙 고수. \"물가안정이 먼저입니다\"",
      diff: { infl: 0, growth: -1, stability: 0, trust: 2 },
      narrative: "소신에 대한 신뢰를 얻었지만 기업 투자 위축 우려가 있습니다."
    }
  },

  // C-038: 뜻밖의 부도 – "레고랜드 사태"
  {
    id: 'C-038',
    deck: 'CRISIS',
    weight: 70,
    cooldown: 999,
    tags: ['crisis', 'real_estate', 'local_gov'],
    conditions: {
      metrics: { stability: [0, 40] },
      turn: { min: 8 }
    },
    type: EVENT_TYPES.URGENT,
    character: CHAR.CHAEBOL.name,
    image: CHAR.CHAEBOL.img,
    text: "강원도의 한 지방공사가 추진하던 레고랜드 테마파크 사업이 자금난으로 채무 불이행을 선언했습니다. '레고랜드 사태'로 불린 이 사건은 국내 채권시장에 충격을 주며 회사채 금리 폭등과 자금 경색을 불렀습니다. 지방정부의 모럴해저드까지 겹쳐 신용경색 우려가 커집니다.",
    left: {
      text: "시장 자율 – 정부와 기업에 맡기고 한발 물러선다",
      diff: { infl: 0, growth: 0, stability: 0, trust: -2 },
      narrative: "대응 부족 평가와 시장 불안이 지속되었습니다."
    },
    right: {
      text: "한은 개입 – 채권시장안정펀드 등 긴급조치",
      diff: { infl: 0, growth: 0, stability: -2, trust: 1 },
      narrative: "위기대응 호평을 받았지만 중앙은행 재정 부담이 증가했습니다."
    }
  },

  // C-039: "이자 좀 주세요" – 은퇴자들의 분노
  {
    id: 'C-039',
    deck: 'DAILY',
    weight: 45,
    cooldown: 12,
    tags: ['inflation', 'elderly'],
    conditions: {
      metrics: { infl: [60, 100] },
      turn: { min: 6 }
    },
    type: EVENT_TYPES.GENERAL,
    character: CHAR.ANT.name,
    image: CHAR.ANT.img,
    text: "물가는 오르고 예금 금리는 따라가지 못하자, 은퇴자들이 청와대 앞에 모였습니다. \"30년 저축했더니 휴지조각\"이라며, 한 노인은 폭등한 밥상물가 영수증을 흔듭니다. 연금 생활자들의 실질 소득이 급감하면서 언론에서는 \"은퇴자 빈곤, 한국은행 책임\" 기사가 나옵니다.",
    left: {
      text: "정부와 공조해 노인 지원대책 마련",
      diff: { infl: 0, growth: 0, stability: -1, trust: 0 },
      narrative: "정책 노력을 평가받았지만 재정 부담이 증가했습니다."
    },
    right: {
      text: "정책 사과와 함께 물가안정 의지를 거듭 밝힌다",
      diff: { infl: 0, growth: 0, stability: 0, trust: 1 },
      narrative: "동정 여론이 일부 호전되었습니다."
    }
  },

  // C-040: "임금 인상 파업" – 노조의 최후통첩
  {
    id: 'C-040',
    deck: 'DAILY',
    weight: 50,
    cooldown: 12,
    tags: ['labor', 'inflation'],
    conditions: {
      metrics: { infl: [65, 100] },
      turn: { min: 7 }
    },
    type: EVENT_TYPES.GENERAL,
    character: CHAR.UNION.name,
    image: CHAR.UNION.img,
    text: "물가 폭등으로 실질임금이 줄자 주요 산별노조들이 공동 총파업을 예고했습니다. 그들은 \"임금 최소 10% 인상\"을 요구하며, 임금-물가 악순환이 현실화될 조짐입니다. 정부는 노조에 자제를 요청하지만 노동계는 물러설 생각이 없습니다.",
    left: {
      text: "중재 노력 – 노정 대화를 촉구하며 한발 물러선다",
      diff: { infl: 0, growth: 0, stability: 0, trust: -1 },
      narrative: "미온적 대응 비판을 받았지만 갈등 완화 기대가 생겼습니다."
    },
    right: {
      text: "강경 입장 – \"임금과 물가 연동은 위험\"이라며 공개 경고",
      diff: { infl: 0, growth: 0, stability: 0, trust: 1 },
      narrative: "물가안정 의지를 피력했지만 노동계 반발이 있었습니다."
    }
  },

  // C-041: 디플레이션의 그림자
  {
    id: 'C-041',
    deck: 'CRISIS',
    weight: 65,
    cooldown: 15,
    tags: ['deflation', 'crisis'],
    conditions: {
      metrics: { infl: [0, 30], growth: [0, 25] },
      turn: { min: 10 }
    },
    type: EVENT_TYPES.URGENT,
    character: CHAR.REPORTER.name,
    image: CHAR.REPORTER.img,
    text: "지속된 고금리로 경기가 꽁꽁 얼어붙자, 이번엔 물가가 하락하기 시작했습니다. \"디플레이션 우려\"라는 말이 나오며 소비자들이 지갑을 닫고 있습니다. 기업들은 재고를 떠안고 투자를 더 줄였습니다. \"일본식 장기불황 오는가\" 언론에서 난리지만, 일부는 \"물가 안정 성과\"라고 평가하기도 합니다.",
    left: {
      text: "방향 전환 모색. \"필요시 완화 전환 검토\"",
      diff: { infl: 0, growth: 1, stability: 0, trust: -1 },
      narrative: "시장 기대가 소폭 생겼지만 정책 일관성에 의구심이 생겼습니다."
    },
    right: {
      text: "신중 기조 유지. \"아직 성급한 완화는 이르다\"",
      diff: { infl: -2, growth: -3, stability: 0, trust: 1 },
      narrative: "물가가 더 하락하고 침체가 심화되었지만 원칙 고수를 평가받았습니다."
    }
  },

  // C-042: 유류세 인하 – 정부의 물가잡기 묘수?
  {
    id: 'C-042',
    deck: 'DAILY',
    weight: 40,
    cooldown: 10,
    tags: ['inflation', 'politics'],
    conditions: {
      metrics: { infl: [55, 100] },
      turn: { min: 6 }
    },
    type: EVENT_TYPES.GENERAL,
    character: CHAR.PRESIDENT.name,
    image: CHAR.PRESIDENT.img,
    text: "치솟는 물가에 정부가 유류세 한시 인하 카드를 꺼냈습니다. 기름값이 워낙 올라 민심이 흉흉해지자 세금을 내려 가격을 낮추겠다는 취지입니다. 단기적으로 체감 물가를 낮출 순 있지만 재정 부담이 크고 본질적 해결은 아니라는 지적도 있습니다.",
    left: {
      text: "신중 입장. \"근본대책은 아니다\"라고 우회 비판",
      diff: { infl: 0, growth: 0, stability: 0, trust: 1 },
      narrative: "전문성 이미지를 얻었지만 미묘한 갈등이 생겼습니다."
    },
    right: {
      text: "환영 입장. \"서민 부담 경감에 도움 될 것\"",
      diff: { infl: -1, growth: 0, stability: 0, trust: 0 },
      narrative: "정부와 협조하고 단기 물가가 안정되었습니다."
    }
  },

  // C-043: 국제적 찬사 – "올해의 중앙은행 총재"
  {
    id: 'C-043',
    deck: 'DAILY',
    weight: 30,
    cooldown: 999,
    tags: ['award', 'global'],
    conditions: {
      metrics: { trust: [60, 100] },
      turn: { min: 12 }
    },
    type: EVENT_TYPES.GENERAL,
    character: CHAR.FOREIGN.name,
    image: CHAR.FOREIGN.img,
    text: "경제 전문지로부터 편지가 도착했습니다. 당신이 \"올해의 중앙은행장상\" 수상자로 선정되었다는 소식입니다. 어려운 상황 속에서 정책을 운영한 노력을 국제적으로 인정받은 것입니다. 국내에서는 체감하기 어렵지만, 대외 신뢰도는 높다는 뜻이기도 합니다.",
    left: {
      text: "수상을 고사하고 조용히 넘어간다",
      diff: { infl: 0, growth: 0, stability: 0, trust: 2 },
      narrative: "겸손한 태도에 호감을 얻었습니다."
    },
    right: {
      text: "겸손하게 수상. \"국민 덕분\"이라며 공을 돌린다",
      diff: { infl: 0, growth: 0, stability: 0, trust: 1 },
      narrative: "국제신인도가 향상되고 국민 자부심이 약간 상승했습니다."
    }
  },

  // C-044: 디지털 화폐 시대 – CBDC 도입 시도
  {
    id: 'C-044',
    deck: 'DAILY',
    weight: 35,
    cooldown: 999,
    tags: ['cbdc', 'innovation'],
    conditions: {
      metrics: { stability: [50, 100] },
      turn: { min: 15 }
    },
    type: EVENT_TYPES.GENERAL,
    character: CHAR.REPORTER.name,
    image: CHAR.REPORTER.img,
    text: "한국은행 내 젊은 직원들을 중심으로 CBDC(중앙은행 디지털화폐) 도입 논의가 한창입니다. \"디지털 원화\" 파일럿 결과가 긍정적이어서, 이제 총재의 결단만 남았습니다. 보수적인 간부들은 신중론을 펼치며 \"금융안정 해칠 수 있다\"고 우려합니다.",
    left: {
      text: "도입 보류, 연구를 이어간다",
      diff: { infl: 0, growth: 0, stability: 0, trust: 1 },
      narrative: "신중함에 안도했지만 혁신 지연 평가를 받았습니다."
    },
    right: {
      text: "CBDC 도입 추진을 선언한다",
      diff: { infl: 0, growth: 0, stability: 0, trust: -1 },
      narrative: "혁신국 이미지를 얻었지만 은행권 우려가 있었습니다."
    }
  },

  // C-045: "김치코인 대폭락" – 눈물의 개미투자자들
  {
    id: 'C-045',
    deck: 'DAILY',
    weight: 50,
    cooldown: 12,
    tags: ['crypto', 'market'],
    conditions: {
      metrics: { stability: [0, 50] },
      turn: { min: 8 }
    },
    type: EVENT_TYPES.GENERAL,
    character: CHAR.ANT.name,
    image: CHAR.ANT.img,
    text: "한때 광풍이었던 가상화폐 시장이 금리 인상 이후 거품이 꺼졌습니다. 국내 토종코인인 \"김치코인\"이 90% 폭락하며, 빚내서 투자했던 청년들이 큰 손실을 봤습니다. 일부는 한은의 급격한 금리인상을 원망하며 \"우리 미래를 망쳤다\"고 분통을 터뜨립니다.",
    left: {
      text: "정부와 함께 피해 지원책을 검토한다",
      diff: { infl: 0, growth: 0, stability: 0, trust: -2 },
      narrative: "청년층을 달랬지만 투기 개입 비판을 받았습니다."
    },
    right: {
      text: "투자 경고 메시지를 다시 강조한다",
      diff: { infl: 0, growth: 0, stability: 0, trust: 1 },
      narrative: "원칙적 태도를 유지했지만 청년층 불만이 있었습니다."
    }
  },

  // C-046: 풍자의 표적 – 신문 만평
  {
    id: 'C-046',
    deck: 'DAILY',
    weight: 35,
    cooldown: 10,
    tags: ['media', 'satire'],
    conditions: {
      metrics: { trust: [0, 40] },
      turn: { min: 10 }
    },
    type: EVENT_TYPES.GENERAL,
    character: CHAR.REPORTER.name,
    image: CHAR.REPORTER.img,
    text: "한 신문의 시사 만평에 당신이 그려졌습니다. 그림 속 당신은 난로에 불을 지피는 아궁이처럼 돈을 태우거나, 혹은 물가 괴물에게 쫓겨 달아나는 모습입니다. 시민들은 웃프다는 반응을 보입니다. 중앙은행 총재로서 대중의 조롱거리가 된 상황에 씁쓸함이 밀려옵니다.",
    left: {
      text: "민감하게 반응. 언론에 유감 표명을 검토",
      diff: { infl: 0, growth: 0, stability: 0, trust: -1 },
      narrative: "소심하다는 평가를 받았습니다."
    },
    right: {
      text: "유머로 넘긴다. \"쓴소리도 경청하겠다\"",
      diff: { infl: 0, growth: 0, stability: 0, trust: 2 },
      narrative: "인간적 면모를 보였습니다."
    }
  },

  // C-047: 경제학자들의 공개비판
  {
    id: 'C-047',
    deck: 'CRISIS',
    weight: 60,
    cooldown: 15,
    tags: ['criticism', 'experts'],
    conditions: {
      metrics: { trust: [0, 35] },
      turn: { min: 12 }
    },
    type: EVENT_TYPES.URGENT,
    character: CHAR.REPORTER.name,
    image: CHAR.REPORTER.img,
    text: "저명한 경제학자 20여 명이 공동 성명을 냈습니다. \"한국은행 총재의 정책 실책을 지적한다\"는 제목으로, 당신의 대응이 적기적절하지 못했다는 날 선 비판입니다. 방송 토론에서도 전문가들이 연일 한은을 성토합니다. 동료 중앙은행장들마저 우려를 표하고 있습니다.",
    left: {
      text: "강하게 반박하며 자신의 소신을 옹호",
      diff: { infl: 0, growth: 0, stability: 0, trust: -2 },
      narrative: "아집 비판과 정부 불편이 있었습니다."
    },
    right: {
      text: "겸허히 수용하고 정책 개선 의지를 밝힌다",
      diff: { infl: 0, growth: 0, stability: 0, trust: 1 },
      narrative: "소통 노력을 평가받고 정책 협조 기대가 생겼습니다."
    }
  },

  // C-048: "한은법 개정" 추진 소동
  {
    id: 'C-048',
    deck: 'CRISIS',
    weight: 75,
    cooldown: 999,
    tags: ['politics', 'independence', 'crisis'],
    conditions: {
      metrics: { trust: [0, 30] },
      turn: { min: 15 }
    },
    type: EVENT_TYPES.URGENT,
    character: CHAR.POLITICIAN.name,
    image: CHAR.POLITICIAN.img,
    text: "일부 여당 의원들이 한국은행법 개정안을 발의했습니다. \"물가안정 외에 고용안정도 목표에 포함\"한다는 내용입니다. 사실상 중앙은행 독립성을 약화시키려는 시도로 받아들여집니다. 경제신문 사설들은 이에 반발하며 \"중앙은행 길들이기\"라고 비판합니다.",
    left: {
      text: "조용히 물밑대응. 정부 설득과 여론전",
      diff: { infl: 0, growth: 0, stability: 0, trust: 1 },
      narrative: "갈등을 최소화하고 은근한 지지가 확산되었습니다."
    },
    right: {
      text: "공개 반대 입장. \"중앙은행 독립성은 훼손될 수 없다\"",
      diff: { infl: 0, growth: 0, stability: 0, trust: 3 },
      narrative: "전문성에 대한 지지를 얻었지만 여권 반발이 있었습니다."
    }
  },

  // C-049: "금리 동결 축하 파티?" – 언론의 빈정댐
  {
    id: 'C-049',
    deck: 'DAILY',
    weight: 40,
    cooldown: 10,
    tags: ['media', 'satire'],
    conditions: {
      metrics: { infl: [65, 100] },
      turn: { min: 8 }
    },
    type: EVENT_TYPES.GENERAL,
    character: CHAR.REPORTER.name,
    image: CHAR.REPORTER.img,
    text: "일부 언론이 당신을 향해 비꼬는 기사를 냈습니다. \"저금리 파티의 후유증, 총재는 즐거웠나\" 등의 제목으로, 초기 완화정책을 풍자한 것입니다. 당신의 이전 발언들을 끄집어내어 \"낙관론을 펴더니 결국 상황 악화\"라고 꼬집습니다.",
    left: {
      text: "해명자료 배포 등 적극 반박",
      diff: { infl: 0, growth: 0, stability: 0, trust: -1 },
      narrative: "변명으로 비쳤지만 소속 조직 사기는 유지되었습니다."
    },
    right: {
      text: "억울하지만 침묵한다",
      diff: { infl: 0, growth: 0, stability: 0, trust: 0 },
      narrative: "시간이 해결할 것입니다."
    }
  },

  // C-050: 가족의 한마디 (완화 경로)
  {
    id: 'C-050',
    deck: 'DAILY',
    weight: 30,
    cooldown: 999,
    tags: ['family', 'personal'],
    conditions: {
      metrics: { infl: [60, 100] },
      turn: { min: 10 }
    },
    type: EVENT_TYPES.GENERAL,
    character: CHAR.ANT.name,
    image: CHAR.ANT.img,
    text: "늦은 밤 집에 들어간 당신에게 배우자가 푸념합니다. \"마트 장보기가 무서워요. 물가 좀 어떻게 해봐요\"라며 한숨을 쉽니다. 한편 대학생 아들은 \"등록금 대출이자 너무 올라서 힘들다\"고 투덜댑니다. 가족들마저 당신의 정책으로 직접적 타격을 받고 있습니다.",
    left: {
      text: "\"나도 힘들어\" 투정을 부리듯 하소연",
      diff: { infl: 0, growth: 0, stability: 0, trust: 0 },
      narrative: "분위기가 악화되었습니다."
    },
    right: {
      text: "\"미안하다\" 진심으로 사과하고 이해를 구한다",
      diff: { infl: 0, growth: 0, stability: 0, trust: 0 },
      narrative: "심리적 안도를 얻었습니다."
    }
  },

  // ===== PHASE A+: SIDE EVENTS =====


  // S-001: 재벌 로비
  {
    id: 'S-001',
    deck: 'DAILY',
    weight: 40,
    cooldown: 10,
    tags: ['chaebol', 'politics'],
    conditions: {
      metrics: { trust: [0, 60] }
    },
    type: EVENT_TYPES.GENERAL,
    character: CHAR.CHAEBOL.name,
    image: CHAR.CHAEBOL.img,
    text: "재벌 총수가 은밀히 접촉. \"금리 인상은 기업 투자를 막습니다.\"",
    left: {
      text: "\"시장 원리 존중\"",
      diff: { infl: 0, growth: -1, stability: 0, trust: 3 },
      narrative: "독립성 ↑"
    },
    right: {
      text: "\"고려하겠다\"",
      diff: { infl: 1, growth: 2, stability: 0, trust: -2 },
      narrative: "유착 의혹"
    }
  },

  // S-002: 언론 압박
  {
    id: 'S-002',
    deck: 'DAILY',
    weight: 50,
    cooldown: 8,
    tags: ['media', 'trust'],
    conditions: {
      metrics: { trust: [0, 50] }
    },
    type: EVENT_TYPES.GENERAL,
    character: CHAR.REPORTER.name,
    image: CHAR.REPORTER.img,
    text: "\"총재 무능론\" 기사 확산. 사퇴 압박 여론.",
    left: {
      text: "반박 성명",
      diff: { infl: 0, growth: 0, stability: 0, trust: -3 },
      narrative: "논쟁 격화"
    },
    right: {
      text: "침묵",
      diff: { infl: 0, growth: 0, stability: 0, trust: 2 },
      narrative: "의연함 평가"
    }
  },

  // S-003: 환율 급등
  {
    id: 'S-003',
    deck: 'CRISIS',
    weight: 70,
    cooldown: 12,
    tags: ['crisis', 'inflation'],
    conditions: {
      metrics: { infl: [60, 100], stability: [0, 40] }
    },
    type: EVENT_TYPES.URGENT,
    character: CHAR.FOREIGN.name,
    image: CHAR.FOREIGN.img,
    text: "원/달러 1600원 돌파! 수입물가 폭등 우려.",
    left: {
      text: "외환 개입",
      diff: { infl: -2, growth: 0, stability: -3, trust: 0 },
      narrative: "외환보유액 ↓"
    },
    right: {
      text: "시장 맡김",
      diff: { infl: 3, growth: 0, stability: 0, trust: -2 },
      narrative: "물가 압력 ↑"
    }
  },

  // S-004: 청년 실업
  {
    id: 'S-004',
    deck: 'DAILY',
    weight: 45,
    cooldown: 10,
    tags: ['growth', 'politics'],
    conditions: {
      metrics: { growth: [0, 35] }
    },
    type: EVENT_TYPES.GENERAL,
    character: CHAR.ANT.name,
    image: CHAR.ANT.img,
    text: "청년 실업률 사상 최고. \"금리 때문에 일자리가 없다\"",
    left: {
      text: "\"구조적 문제\"",
      diff: { infl: 0, growth: 0, stability: 0, trust: -2 },
      narrative: "책임 회피 비판"
    },
    right: {
      text: "완화 시사",
      diff: { infl: 1, growth: 1, stability: 0, trust: 1 },
      narrative: "기대감 형성"
    }
  },

  // S-005: 부동산 PF 부실
  {
    id: 'S-005',
    deck: 'CRISIS',
    weight: 60,
    cooldown: 15,
    tags: ['stability', 'real_estate', 'crisis'],
    conditions: {
      metrics: { stability: [0, 30] }
    },
    type: EVENT_TYPES.FSM,
    character: CHAR.CHAEBOL.name,
    image: CHAR.CHAEBOL.img,
    text: "건설사 PF 대출 부실화. 연쇄 도산 우려.",
    left: {
      text: "긴급 유동성",
      diff: { infl: 1, growth: 0, stability: -2, trust: -1 },
      narrative: "모럴해저드",
      effects: {
        openSubDecks: [{ id: 'SUB_PF', duration: 5 }]
      }
    },
    right: {
      text: "시장 정리",
      diff: { infl: 0, growth: -2, stability: 0, trust: 2 },
      narrative: "구조조정 시작"
    }
  },

  // S-006: 가계부채 폭탄
  {
    id: 'S-006',
    deck: 'DAILY',
    weight: 55,
    cooldown: 10,
    tags: ['stability', 'interest_rate'],
    conditions: {
      metrics: { infl: [0, 100], stability: [0, 50] }
    },
    type: EVENT_TYPES.FSM,
    character: CHAR.SME.name,
    image: CHAR.SME.img,
    text: "가계부채 2000조 돌파. 연체율 급증.",
    left: {
      text: "금리 동결",
      diff: { infl: 2, growth: 1, stability: -1, trust: 0 },
      narrative: "부채 부담 완화"
    },
    right: {
      text: "긴축 유지",
      diff: { infl: -1, growth: -1, stability: 0, trust: 1 },
      narrative: "부실 증가"
    }
  },

  // S-007: 노조 총파업
  {
    id: 'S-007',
    deck: 'DAILY',
    weight: 40,
    cooldown: 12,
    tags: ['labor', 'growth'],
    conditions: {
      metrics: { growth: [0, 40] }
    },
    type: EVENT_TYPES.GENERAL,
    character: CHAR.UNION.name,
    image: CHAR.UNION.img,
    text: "전국 노조 총파업. \"고금리가 서민 죽인다\"",
    left: {
      text: "대화 제안",
      diff: { infl: 0, growth: 0, stability: 0, trust: 1 },
      narrative: "소통 노력"
    },
    right: {
      text: "정책 고수",
      diff: { infl: 0, growth: -1, stability: 0, trust: -2 },
      narrative: "갈등 심화"
    }
  },

  // S-008: 중소기업 연쇄 도산
  {
    id: 'S-008',
    deck: 'CRISIS',
    weight: 65,
    cooldown: 10,
    tags: ['sme', 'growth', 'crisis'],
    conditions: {
      metrics: { growth: [0, 30], stability: [0, 40] }
    },
    type: EVENT_TYPES.URGENT,
    character: CHAR.SME.name,
    image: CHAR.SME.img,
    text: "중소기업 월 1000개 폐업. \"이자 감당 못해\"",
    left: {
      text: "특별 지원책",
      diff: { infl: 1, growth: 1, stability: -1, trust: 0 },
      narrative: "재정 부담 ↑"
    },
    right: {
      text: "구조조정 필요",
      diff: { infl: 0, growth: -2, stability: 0, trust: -3 },
      narrative: "냉혈 비판"
    }
  },

  // S-009: 외국인 자금 이탈
  {
    id: 'S-009',
    deck: 'CRISIS',
    weight: 70,
    cooldown: 15,
    tags: ['market', 'stability', 'crisis'],
    conditions: {
      metrics: { stability: [0, 35], trust: [0, 40] }
    },
    type: EVENT_TYPES.URGENT,
    character: CHAR.FOREIGN.name,
    image: CHAR.FOREIGN.img,
    text: "외국인 투자자 대규모 이탈. 코스피 급락.",
    left: {
      text: "안정 메시지",
      diff: { infl: 0, growth: 0, stability: 0, trust: 2 },
      narrative: "일시 진정"
    },
    right: {
      text: "금리 인상",
      diff: { infl: -2, growth: -2, stability: 1, trust: 0 },
      narrative: "자금 유입 유도"
    }
  },

  // S-010: 정치권 한은법 개정 시도
  {
    id: 'S-010',
    deck: 'CRISIS',
    weight: 80,
    cooldown: 999,
    tags: ['politics', 'trust', 'crisis'],
    conditions: {
      metrics: { trust: [0, 30] },
      turn: { min: 15 }
    },
    type: EVENT_TYPES.URGENT,
    character: CHAR.POLITICIAN.name,
    image: CHAR.POLITICIAN.img,
    text: "여당, 한은법 개정안 발의. \"총재 임명권 강화\"",
    left: {
      text: "강력 반발",
      diff: { infl: 0, growth: 0, stability: 0, trust: 3 },
      narrative: "독립성 사수",
      effects: {
        setFlags: ['independence_fight']
      }
    },
    right: {
      text: "타협 모색",
      diff: { infl: 0, growth: 0, stability: 0, trust: -5 },
      narrative: "굴복으로 인식"
    }
  },

  // S-011~S-064: Additional variety cards
  { id: 'S-011', deck: 'DAILY', weight: 35, cooldown: 8, tags: ['media'], conditions: { metrics: { infl: [40, 100] } }, type: EVENT_TYPES.GENERAL, character: CHAR.REPORTER.name, image: CHAR.REPORTER.img, text: "\"물가 폭등 책임은?\" 기자회견 요청", left: { text: "회견 응함", diff: { infl: 0, growth: 0, stability: 0, trust: 1 }, narrative: "소통 ↑" }, right: { text: "거부", diff: { infl: 0, growth: 0, stability: 0, trust: -2 }, narrative: "회피 비판" } },
  { id: 'S-012', deck: 'DAILY', weight: 40, cooldown: 7, tags: ['chaebol'], conditions: { metrics: { growth: [30, 100] } }, type: EVENT_TYPES.GENERAL, character: CHAR.CHAEBOL.name, image: CHAR.CHAEBOL.img, text: "대기업 투자 확대 발표", left: { text: "환영", diff: { infl: 0, growth: 2, stability: 0, trust: 0 }, narrative: "경기 기대" }, right: { text: "견제", diff: { infl: 0, growth: 0, stability: 0, trust: 1 }, narrative: "독립성 유지" } },
  { id: 'S-013', deck: 'DAILY', weight: 45, cooldown: 9, tags: ['market'], conditions: { metrics: { stability: [40, 100] } }, type: EVENT_TYPES.GENERAL, character: CHAR.ANT.name, image: CHAR.ANT.img, text: "주식 투자 열풍", left: { text: "경고 메시지", diff: { infl: 0, growth: 0, stability: 1, trust: 0 }, narrative: "리스크 관리" }, right: { text: "방관", diff: { infl: 0, growth: 1, stability: -1, trust: 0 }, narrative: "버블 우려" } },
  { id: 'S-014', deck: 'CRISIS', weight: 60, cooldown: 12, tags: ['crisis', 'inflation'], conditions: { metrics: { infl: [70, 100] } }, type: EVENT_TYPES.URGENT, character: CHAR.ANT.name, image: CHAR.ANT.img, text: "생필품 가격 30% 폭등", left: { text: "긴급 금리 인상", diff: { infl: -3, growth: -2, stability: 0, trust: 0 }, narrative: "강력 대응" }, right: { text: "점진 대응", diff: { infl: 1, growth: 0, stability: 0, trust: -1 }, narrative: "미온적 비판" } },
  { id: 'S-015', deck: 'DAILY', weight: 30, cooldown: 10, tags: ['politics'], conditions: { metrics: { trust: [50, 100] } }, type: EVENT_TYPES.GENERAL, character: CHAR.PRESIDENT.name, image: CHAR.PRESIDENT.img, text: "대통령 격려 전화", left: { text: "감사 표명", diff: { infl: 0, growth: 0, stability: 0, trust: 1 }, narrative: "우호 관계" }, right: { text: "거리 유지", diff: { infl: 0, growth: 0, stability: 0, trust: 2 }, narrative: "독립성 강조" } },

  { id: 'S-016', deck: 'DAILY', weight: 40, cooldown: 8, tags: ['real_estate'], conditions: { metrics: { stability: [0, 60] } }, type: EVENT_TYPES.GENERAL, character: CHAR.ANT.name, image: CHAR.ANT.img, text: "집값 급락, 영끌족 패닉", left: { text: "시장 안정 메시지", diff: { infl: 0, growth: 0, stability: 1, trust: 0 }, narrative: "불안 진정" }, right: { text: "구조조정 필요", diff: { infl: 0, growth: 0, stability: 0, trust: -1 }, narrative: "냉정 대응" } },
  { id: 'S-017', deck: 'DAILY', weight: 35, cooldown: 7, tags: ['labor'], conditions: { metrics: { growth: [0, 50] } }, type: EVENT_TYPES.GENERAL, character: CHAR.UNION.name, image: CHAR.UNION.img, text: "임금 동결 압박", left: { text: "중립 유지", diff: { infl: 0, growth: 0, stability: 0, trust: 1 }, narrative: "독립성" }, right: { text: "동결 지지", diff: { infl: -1, growth: 0, stability: 0, trust: -2 }, narrative: "노조 반발" } },
  { id: 'S-018', deck: 'CRISIS', weight: 65, cooldown: 15, tags: ['crisis', 'stability'], conditions: { metrics: { stability: [0, 25] } }, type: EVENT_TYPES.URGENT, character: CHAR.CHAEBOL.name, image: CHAR.CHAEBOL.img, text: "시중은행 뱅크런 조짐", left: { text: "긴급 유동성", diff: { infl: 2, growth: 0, stability: -3, trust: 0 }, narrative: "위기 대응" }, right: { text: "시장 신뢰", diff: { infl: 0, growth: 0, stability: 0, trust: 2 }, narrative: "도덕적 해이 방지" } },
  { id: 'S-019', deck: 'DAILY', weight: 40, cooldown: 9, tags: ['sme'], conditions: { metrics: { growth: [20, 60] } }, type: EVENT_TYPES.GENERAL, character: CHAR.SME.name, image: CHAR.SME.img, text: "중소기업 금리 인하 요청", left: { text: "검토 약속", diff: { infl: 1, growth: 1, stability: 0, trust: 0 }, narrative: "기대감" }, right: { text: "거절", diff: { infl: 0, growth: -1, stability: 0, trust: 1 }, narrative: "원칙 고수" } },
  { id: 'S-020', deck: 'DAILY', weight: 45, cooldown: 8, tags: ['market'], conditions: { metrics: { infl: [0, 50] } }, type: EVENT_TYPES.GENERAL, character: CHAR.FOREIGN.name, image: CHAR.FOREIGN.img, text: "외국인 매수 증가", left: { text: "환영", diff: { infl: 0, growth: 0, stability: 1, trust: 0 }, narrative: "자본 유입" }, right: { text: "경계", diff: { infl: 0, growth: 0, stability: 0, trust: 0 }, narrative: "신중 대응" } },

  { id: 'S-021', deck: 'DAILY', weight: 35, cooldown: 10, tags: ['media', 'trust'], conditions: { metrics: { trust: [30, 70] } }, type: EVENT_TYPES.GENERAL, character: CHAR.REPORTER.name, image: CHAR.REPORTER.img, text: "총재 지지율 조사 결과", left: { text: "무시", diff: { infl: 0, growth: 0, stability: 0, trust: 1 }, narrative: "의연함" }, right: { text: "개선 약속", diff: { infl: 0, growth: 0, stability: 0, trust: -1 }, narrative: "인기영합 비판" } },
  { id: 'S-022', deck: 'CRISIS', weight: 70, cooldown: 12, tags: ['crisis', 'growth'], conditions: { metrics: { growth: [0, 20] } }, type: EVENT_TYPES.URGENT, character: CHAR.POLITICIAN.name, image: CHAR.POLITICIAN.img, text: "경기 침체 공식화", left: { text: "금리 인하", diff: { infl: 2, growth: 2, stability: 0, trust: 0 }, narrative: "경기 부양" }, right: { text: "인내 요청", diff: { infl: 0, growth: -1, stability: 0, trust: -2 }, narrative: "비난 집중" } },
  { id: 'S-023', deck: 'DAILY', weight: 40, cooldown: 7, tags: ['chaebol'], conditions: { metrics: { stability: [30, 100] } }, type: EVENT_TYPES.GENERAL, character: CHAR.CHAEBOL.name, image: CHAR.CHAEBOL.img, text: "재벌 사내유보금 논란", left: { text: "투자 권고", diff: { infl: 0, growth: 1, stability: 0, trust: 0 }, narrative: "협조 요청" }, right: { text: "불간섭", diff: { infl: 0, growth: 0, stability: 0, trust: 1 }, narrative: "시장 존중" } },
  { id: 'S-024', deck: 'DAILY', weight: 45, cooldown: 9, tags: ['inflation'], conditions: { metrics: { infl: [50, 80] } }, type: EVENT_TYPES.MPC, character: CHAR.REPORTER.name, image: CHAR.REPORTER.img, text: "금통위 앞두고 시장 긴장", left: { text: "매파 시그널", diff: { infl: -1, growth: -1, stability: 0, trust: 1 }, narrative: "긴축 기대" }, right: { text: "중립 유지", diff: { infl: 0, growth: 0, stability: 0, trust: 0 }, narrative: "관망" } },
  { id: 'S-025', deck: 'DAILY', weight: 35, cooldown: 8, tags: ['market'], conditions: { metrics: { stability: [50, 100] } }, type: EVENT_TYPES.GENERAL, character: CHAR.ANT.name, image: CHAR.ANT.img, text: "코인 투자 열풍", left: { text: "경고", diff: { infl: 0, growth: 0, stability: 1, trust: 0 }, narrative: "리스크 알림" }, right: { text: "방관", diff: { infl: 0, growth: 0, stability: -1, trust: 0 }, narrative: "투기 확산" } },

  { id: 'S-026', deck: 'CRISIS', weight: 60, cooldown: 15, tags: ['crisis', 'real_estate'], conditions: { metrics: { stability: [0, 35], infl: [60, 100] } }, type: EVENT_TYPES.URGENT, character: CHAR.CHAEBOL.name, image: CHAR.CHAEBOL.img, text: "건설사 줄도산 시작", left: { text: "구제금융", diff: { infl: 1, growth: 0, stability: -2, trust: -1 }, narrative: "모럴해저드" }, right: { text: "시장 정리", diff: { infl: 0, growth: -2, stability: 0, trust: 2 }, narrative: "구조조정" } },
  { id: 'S-027', deck: 'DAILY', weight: 40, cooldown: 7, tags: ['politics'], conditions: { metrics: { trust: [0, 50] } }, type: EVENT_TYPES.GENERAL, character: CHAR.POLITICIAN.name, image: CHAR.POLITICIAN.img, text: "야당 총재 청문회 요구", left: { text: "응함", diff: { infl: 0, growth: 0, stability: 0, trust: 1 }, narrative: "투명성" }, right: { text: "거부", diff: { infl: 0, growth: 0, stability: 0, trust: -2 }, narrative: "은폐 의혹" } },
  { id: 'S-028', deck: 'DAILY', weight: 45, cooldown: 9, tags: ['labor'], conditions: { metrics: { growth: [0, 40] } }, type: EVENT_TYPES.GENERAL, character: CHAR.UNION.name, image: CHAR.UNION.img, text: "최저임금 인상 압박", left: { text: "중립", diff: { infl: 0, growth: 0, stability: 0, trust: 1 }, narrative: "독립성" }, right: { text: "반대 의견", diff: { infl: -1, growth: 0, stability: 0, trust: -2 }, narrative: "노조 적대" } },
  { id: 'S-029', deck: 'DAILY', weight: 35, cooldown: 8, tags: ['sme'], conditions: { metrics: { growth: [30, 70] } }, type: EVENT_TYPES.GENERAL, character: CHAR.SME.name, image: CHAR.SME.img, text: "소상공인 대출 연장 요청", left: { text: "지원", diff: { infl: 1, growth: 1, stability: 0, trust: 0 }, narrative: "민생 배려" }, right: { text: "거절", diff: { infl: 0, growth: -1, stability: 0, trust: 1 }, narrative: "원칙 고수" } },
  { id: 'S-030', deck: 'CRISIS', weight: 65, cooldown: 12, tags: ['crisis', 'market'], conditions: { metrics: { stability: [0, 30] } }, type: EVENT_TYPES.URGENT, character: CHAR.FOREIGN.name, image: CHAR.FOREIGN.img, text: "국채 금리 급등", left: { text: "시장 개입", diff: { infl: 1, growth: 0, stability: -1, trust: 0 }, narrative: "안정화" }, right: { text: "시장 맡김", diff: { infl: 0, growth: 0, stability: 0, trust: 1 }, narrative: "시장 원리" } },

  { id: 'S-031', deck: 'DAILY', weight: 40, cooldown: 10, tags: ['media'], conditions: { metrics: { infl: [30, 70] } }, type: EVENT_TYPES.GENERAL, character: CHAR.REPORTER.name, image: CHAR.REPORTER.img, text: "총재 인터뷰 요청", left: { text: "수락", diff: { infl: 0, growth: 0, stability: 0, trust: 1 }, narrative: "소통" }, right: { text: "거절", diff: { infl: 0, growth: 0, stability: 0, trust: -1 }, narrative: "폐쇄적" } },
  { id: 'S-032', deck: 'DAILY', weight: 35, cooldown: 8, tags: ['chaebol'], conditions: { metrics: { growth: [40, 100] } }, type: EVENT_TYPES.GENERAL, character: CHAR.CHAEBOL.name, image: CHAR.CHAEBOL.img, text: "대기업 고용 확대 발표", left: { text: "환영", diff: { infl: 0, growth: 1, stability: 0, trust: 0 }, narrative: "고용 개선" }, right: { text: "관망", diff: { infl: 0, growth: 0, stability: 0, trust: 0 }, narrative: "중립" } },
  { id: 'S-033', deck: 'DAILY', weight: 45, cooldown: 7, tags: ['inflation'], conditions: { metrics: { infl: [40, 70] } }, type: EVENT_TYPES.GENERAL, character: CHAR.ANT.name, image: CHAR.ANT.img, text: "식료품 가격 상승", left: { text: "금리 인상 시사", diff: { infl: -1, growth: -1, stability: 0, trust: 0 }, narrative: "긴축" }, right: { text: "일시적 현상", diff: { infl: 1, growth: 0, stability: 0, trust: -1 }, narrative: "안일 비판" } },
  { id: 'S-034', deck: 'CRISIS', weight: 70, cooldown: 15, tags: ['crisis', 'stability'], conditions: { metrics: { stability: [0, 25], trust: [0, 30] } }, type: EVENT_TYPES.URGENT, character: CHAR.POLITICIAN.name, image: CHAR.POLITICIAN.img, text: "금융위기 경고음", left: { text: "비상대책", diff: { infl: 1, growth: 0, stability: -2, trust: 0 }, narrative: "위기 대응" }, right: { text: "시장 신뢰", diff: { infl: 0, growth: 0, stability: 0, trust: 2 }, narrative: "침착 대응" } },
  { id: 'S-035', deck: 'DAILY', weight: 40, cooldown: 9, tags: ['real_estate'], conditions: { metrics: { stability: [30, 70] } }, type: EVENT_TYPES.GENERAL, character: CHAR.ANT.name, image: CHAR.ANT.img, text: "전세 사기 급증", left: { text: "대책 마련", diff: { infl: 0, growth: 0, stability: 1, trust: 0 }, narrative: "민생 대응" }, right: { text: "관할 아님", diff: { infl: 0, growth: 0, stability: 0, trust: -1 }, narrative: "책임 회피" } },

  { id: 'S-036', deck: 'DAILY', weight: 35, cooldown: 8, tags: ['market'], conditions: { metrics: { growth: [50, 100] } }, type: EVENT_TYPES.GENERAL, character: CHAR.FOREIGN.name, image: CHAR.FOREIGN.img, text: "외국인 투자 호조", left: { text: "환영", diff: { infl: 0, growth: 1, stability: 0, trust: 0 }, narrative: "긍정적" }, right: { text: "경계", diff: { infl: 0, growth: 0, stability: 0, trust: 0 }, narrative: "신중" } },
  { id: 'S-037', deck: 'DAILY', weight: 40, cooldown: 7, tags: ['labor'], conditions: { metrics: { growth: [20, 60] } }, type: EVENT_TYPES.GENERAL, character: CHAR.UNION.name, image: CHAR.UNION.img, text: "비정규직 처우 개선 요구", left: { text: "지지", diff: { infl: 0, growth: 0, stability: 0, trust: 0 }, narrative: "민생" }, right: { text: "중립", diff: { infl: 0, growth: 0, stability: 0, trust: 1 }, narrative: "독립성" } },
  { id: 'S-038', deck: 'CRISIS', weight: 60, cooldown: 12, tags: ['crisis', 'inflation'], conditions: { metrics: { infl: [75, 100] } }, type: EVENT_TYPES.URGENT, character: CHAR.REPORTER.name, image: CHAR.REPORTER.img, text: "인플레 공포 확산", left: { text: "강력 긴축", diff: { infl: -3, growth: -2, stability: 0, trust: 1 }, narrative: "단호 대응" }, right: { text: "점진 대응", diff: { infl: 1, growth: 0, stability: 0, trust: -2 }, narrative: "미온적" } },
  { id: 'S-039', deck: 'DAILY', weight: 45, cooldown: 9, tags: ['sme'], conditions: { metrics: { growth: [0, 50] } }, type: EVENT_TYPES.GENERAL, character: CHAR.SME.name, image: CHAR.SME.img, text: "자영업자 폐업률 증가", left: { text: "지원책", diff: { infl: 1, growth: 1, stability: 0, trust: 0 }, narrative: "민생" }, right: { text: "구조조정", diff: { infl: 0, growth: -1, stability: 0, trust: -2 }, narrative: "냉혈" } },
  { id: 'S-040', deck: 'DAILY', weight: 35, cooldown: 8, tags: ['politics'], conditions: { metrics: { trust: [40, 80] } }, type: EVENT_TYPES.GENERAL, character: CHAR.PRESIDENT.name, image: CHAR.PRESIDENT.img, text: "대통령 정책 협조 요청", left: { text: "협조", diff: { infl: 0, growth: 0, stability: 0, trust: -1 }, narrative: "유착 의혹" }, right: { text: "독립성 강조", diff: { infl: 0, growth: 0, stability: 0, trust: 2 }, narrative: "원칙" } },

  { id: 'S-041', deck: 'DAILY', weight: 40, cooldown: 10, tags: ['media'], conditions: { metrics: { trust: [20, 60] } }, type: EVENT_TYPES.GENERAL, character: CHAR.REPORTER.name, image: CHAR.REPORTER.img, text: "총재 스캔들 루머", left: { text: "법적 대응", diff: { infl: 0, growth: 0, stability: 0, trust: 1 }, narrative: "강경" }, right: { text: "무시", diff: { infl: 0, growth: 0, stability: 0, trust: -1 }, narrative: "소극적" } },
  { id: 'S-042', deck: 'CRISIS', weight: 65, cooldown: 15, tags: ['crisis', 'growth'], conditions: { metrics: { growth: [0, 25], stability: [0, 35] } }, type: EVENT_TYPES.URGENT, character: CHAR.CHAEBOL.name, image: CHAR.CHAEBOL.img, text: "대기업 구조조정 발표", left: { text: "지원", diff: { infl: 1, growth: 0, stability: -1, trust: 0 }, narrative: "고용 유지" }, right: { text: "시장 맡김", diff: { infl: 0, growth: -2, stability: 0, trust: 1 }, narrative: "원칙" } },
  { id: 'S-043', deck: 'DAILY', weight: 35, cooldown: 7, tags: ['chaebol'], conditions: { metrics: { stability: [40, 100] } }, type: EVENT_TYPES.GENERAL, character: CHAR.CHAEBOL.name, image: CHAR.CHAEBOL.img, text: "재벌 총수 구속", left: { text: "논평 거부", diff: { infl: 0, growth: 0, stability: 0, trust: 1 }, narrative: "중립" }, right: { text: "우려 표명", diff: { infl: 0, growth: -1, stability: 0, trust: 0 }, narrative: "경제 우려" } },
  { id: 'S-044', deck: 'DAILY', weight: 45, cooldown: 9, tags: ['market'], conditions: { metrics: { stability: [20, 60] } }, type: EVENT_TYPES.GENERAL, character: CHAR.FOREIGN.name, image: CHAR.FOREIGN.img, text: "환율 변동성 확대", left: { text: "개입", diff: { infl: 0, growth: 0, stability: -1, trust: 0 }, narrative: "안정화" }, right: { text: "관망", diff: { infl: 1, growth: 0, stability: 0, trust: 0 }, narrative: "시장 맡김" } },
  { id: 'S-045', deck: 'DAILY', weight: 40, cooldown: 8, tags: ['inflation'], conditions: { metrics: { infl: [55, 85] } }, type: EVENT_TYPES.MPC, character: CHAR.REPORTER.name, image: CHAR.REPORTER.img, text: "금통위 결정 임박", left: { text: "인상 시사", diff: { infl: -1, growth: -1, stability: 0, trust: 0 }, narrative: "긴축" }, right: { text: "동결 시사", diff: { infl: 1, growth: 0, stability: 0, trust: 0 }, narrative: "완화" } },

  { id: 'S-046', deck: 'CRISIS', weight: 70, cooldown: 12, tags: ['crisis', 'stability'], conditions: { metrics: { stability: [0, 20] } }, type: EVENT_TYPES.URGENT, character: CHAR.POLITICIAN.name, image: CHAR.POLITICIAN.img, text: "금융시장 패닉", left: { text: "비상 유동성", diff: { infl: 2, growth: 0, stability: -3, trust: 0 }, narrative: "위기 대응" }, right: { text: "시장 신뢰", diff: { infl: 0, growth: 0, stability: 0, trust: 2 }, narrative: "침착" } },
  { id: 'S-047', deck: 'DAILY', weight: 35, cooldown: 10, tags: ['labor'], conditions: { metrics: { growth: [0, 45] } }, type: EVENT_TYPES.GENERAL, character: CHAR.UNION.name, image: CHAR.UNION.img, text: "대규모 해고 예고", left: { text: "우려", diff: { infl: 0, growth: 0, stability: 0, trust: 0 }, narrative: "민생" }, right: { text: "불간섭", diff: { infl: 0, growth: 0, stability: 0, trust: 1 }, narrative: "시장" } },
  { id: 'S-048', deck: 'DAILY', weight: 40, cooldown: 7, tags: ['sme'], conditions: { metrics: { growth: [25, 65] } }, type: EVENT_TYPES.GENERAL, character: CHAR.SME.name, image: CHAR.SME.img, text: "중소기업 수출 증가", left: { text: "축하", diff: { infl: 0, growth: 1, stability: 0, trust: 0 }, narrative: "긍정적" }, right: { text: "관망", diff: { infl: 0, growth: 0, stability: 0, trust: 0 }, narrative: "중립" } },
  { id: 'S-049', deck: 'DAILY', weight: 45, cooldown: 9, tags: ['real_estate'], conditions: { metrics: { stability: [0, 50] } }, type: EVENT_TYPES.GENERAL, character: CHAR.ANT.name, image: CHAR.ANT.img, text: "전세 대란 우려", left: { text: "대책 촉구", diff: { infl: 0, growth: 0, stability: 1, trust: 0 }, narrative: "민생" }, right: { text: "시장 맡김", diff: { infl: 0, growth: 0, stability: 0, trust: -1 }, narrative: "방관" } },
  { id: 'S-050', deck: 'DAILY', weight: 35, cooldown: 8, tags: ['media'], conditions: { metrics: { trust: [35, 75] } }, type: EVENT_TYPES.GENERAL, character: CHAR.REPORTER.name, image: CHAR.REPORTER.img, text: "총재 업무 평가 보도", left: { text: "감사", diff: { infl: 0, growth: 0, stability: 0, trust: 0 }, narrative: "긍정적" }, right: { text: "무시", diff: { infl: 0, growth: 0, stability: 0, trust: 0 }, narrative: "의연" } },

  { id: 'S-051', deck: 'CRISIS', weight: 60, cooldown: 15, tags: ['crisis', 'market'], conditions: { metrics: { stability: [0, 30], infl: [65, 100] } }, type: EVENT_TYPES.URGENT, character: CHAR.FOREIGN.name, image: CHAR.FOREIGN.img, text: "외환보유액 급감", left: { text: "긴급 조치", diff: { infl: 0, growth: 0, stability: -2, trust: 0 }, narrative: "위기" }, right: { text: "침착 대응", diff: { infl: 0, growth: 0, stability: 0, trust: 1 }, narrative: "신뢰" } },
  { id: 'S-052', deck: 'DAILY', weight: 40, cooldown: 7, tags: ['politics'], conditions: { metrics: { trust: [0, 55] } }, type: EVENT_TYPES.GENERAL, character: CHAR.POLITICIAN.name, image: CHAR.POLITICIAN.img, text: "국회 예산 심의", left: { text: "협조", diff: { infl: 0, growth: 0, stability: 0, trust: 0 }, narrative: "협력" }, right: { text: "독립성", diff: { infl: 0, growth: 0, stability: 0, trust: 1 }, narrative: "원칙" } },
  { id: 'S-053', deck: 'DAILY', weight: 35, cooldown: 9, tags: ['chaebol'], conditions: { metrics: { growth: [35, 100] } }, type: EVENT_TYPES.GENERAL, character: CHAR.CHAEBOL.name, image: CHAR.CHAEBOL.img, text: "대기업 R&D 투자 확대", left: { text: "환영", diff: { infl: 0, growth: 1, stability: 0, trust: 0 }, narrative: "긍정적" }, right: { text: "중립", diff: { infl: 0, growth: 0, stability: 0, trust: 0 }, narrative: "관망" } },
  { id: 'S-054', deck: 'DAILY', weight: 45, cooldown: 8, tags: ['inflation'], conditions: { metrics: { infl: [45, 75] } }, type: EVENT_TYPES.GENERAL, character: CHAR.ANT.name, image: CHAR.ANT.img, text: "유가 급등", left: { text: "우려 표명", diff: { infl: 1, growth: 0, stability: 0, trust: 0 }, narrative: "경고" }, right: { text: "관망", diff: { infl: 0, growth: 0, stability: 0, trust: 0 }, narrative: "중립" } },
  { id: 'S-055', deck: 'CRISIS', weight: 65, cooldown: 12, tags: ['crisis', 'growth'], conditions: { metrics: { growth: [0, 22] } }, type: EVENT_TYPES.URGENT, character: CHAR.UNION.name, image: CHAR.UNION.img, text: "실업률 급증", left: { text: "완화 정책", diff: { infl: 2, growth: 2, stability: 0, trust: 0 }, narrative: "부양" }, right: { text: "구조 개혁", diff: { infl: 0, growth: -1, stability: 0, trust: -2 }, narrative: "냉혈" } },

  { id: 'S-056', deck: 'DAILY', weight: 40, cooldown: 10, tags: ['sme'], conditions: { metrics: { growth: [30, 70] } }, type: EVENT_TYPES.GENERAL, character: CHAR.SME.name, image: CHAR.SME.img, text: "소상공인 지원 요청", left: { text: "검토", diff: { infl: 0, growth: 1, stability: 0, trust: 0 }, narrative: "민생" }, right: { text: "거절", diff: { infl: 0, growth: 0, stability: 0, trust: 1 }, narrative: "원칙" } },
  { id: 'S-057', deck: 'DAILY', weight: 35, cooldown: 7, tags: ['market'], conditions: { metrics: { stability: [45, 100] } }, type: EVENT_TYPES.GENERAL, character: CHAR.FOREIGN.name, image: CHAR.FOREIGN.img, text: "신용등급 전망 긍정적", left: { text: "환영", diff: { infl: 0, growth: 0, stability: 1, trust: 0 }, narrative: "긍정" }, right: { text: "겸손", diff: { infl: 0, growth: 0, stability: 0, trust: 1 }, narrative: "신중" } },
  { id: 'S-058', deck: 'DAILY', weight: 45, cooldown: 9, tags: ['real_estate'], conditions: { metrics: { stability: [25, 65] } }, type: EVENT_TYPES.GENERAL, character: CHAR.ANT.name, image: CHAR.ANT.img, text: "청약 경쟁률 급등", left: { text: "경고", diff: { infl: 0, growth: 0, stability: 0, trust: 0 }, narrative: "과열 우려" }, right: { text: "방관", diff: { infl: 0, growth: 0, stability: -1, trust: 0 }, narrative: "버블" } },
  { id: 'S-059', deck: 'DAILY', weight: 40, cooldown: 8, tags: ['labor'], conditions: { metrics: { growth: [15, 55] } }, type: EVENT_TYPES.GENERAL, character: CHAR.UNION.name, image: CHAR.UNION.img, text: "노사 갈등 심화", left: { text: "중재", diff: { infl: 0, growth: 0, stability: 0, trust: 0 }, narrative: "개입" }, right: { text: "불간섭", diff: { infl: 0, growth: 0, stability: 0, trust: 1 }, narrative: "중립" } },
  { id: 'S-060', deck: 'CRISIS', weight: 70, cooldown: 15, tags: ['crisis', 'inflation'], conditions: { metrics: { infl: [80, 100] } }, type: EVENT_TYPES.URGENT, character: CHAR.REPORTER.name, image: CHAR.REPORTER.img, text: "초인플레 경고", left: { text: "초강력 긴축", diff: { infl: -4, growth: -3, stability: 0, trust: 1 }, narrative: "단호" }, right: { text: "점진 대응", diff: { infl: 2, growth: 0, stability: 0, trust: -3 }, narrative: "무능" } },

  { id: 'S-061', deck: 'DAILY', weight: 35, cooldown: 10, tags: ['media'], conditions: { metrics: { trust: [25, 65] } }, type: EVENT_TYPES.GENERAL, character: CHAR.REPORTER.name, image: CHAR.REPORTER.img, text: "총재 사생활 보도", left: { text: "법적 대응", diff: { infl: 0, growth: 0, stability: 0, trust: 0 }, narrative: "강경" }, right: { text: "무시", diff: { infl: 0, growth: 0, stability: 0, trust: 1 }, narrative: "의연" } },
  { id: 'S-062', deck: 'DAILY', weight: 40, cooldown: 7, tags: ['politics'], conditions: { metrics: { trust: [45, 85] } }, type: EVENT_TYPES.GENERAL, character: CHAR.PRESIDENT.name, image: CHAR.PRESIDENT.img, text: "대통령 신년 인사", left: { text: "화답", diff: { infl: 0, growth: 0, stability: 0, trust: 0 }, narrative: "우호" }, right: { text: "간단 답례", diff: { infl: 0, growth: 0, stability: 0, trust: 1 }, narrative: "거리" } },
  { id: 'S-063', deck: 'DAILY', weight: 45, cooldown: 9, tags: ['chaebol'], conditions: { metrics: { growth: [20, 80] } }, type: EVENT_TYPES.GENERAL, character: CHAR.CHAEBOL.name, image: CHAR.CHAEBOL.img, text: "재벌 사회 환원 발표", left: { text: "환영", diff: { infl: 0, growth: 0, stability: 0, trust: 0 }, narrative: "긍정" }, right: { text: "중립", diff: { infl: 0, growth: 0, stability: 0, trust: 1 }, narrative: "독립성" } },
  { id: 'S-064', deck: 'DAILY', weight: 35, cooldown: 8, tags: ['market'], conditions: { metrics: { stability: [35, 75] } }, type: EVENT_TYPES.GENERAL, character: CHAR.FOREIGN.name, image: CHAR.FOREIGN.img, text: "국제 투자 포럼 초청", left: { text: "참석", diff: { infl: 0, growth: 0, stability: 1, trust: 0 }, narrative: "홍보" }, right: { text: "불참", diff: { infl: 0, growth: 0, stability: 0, trust: 0 }, narrative: "내실" } }
];

// Helper function to enrich cards with default metadata
function enrichCardWithMetadata(card) {
  // If card already has deck, assume it's fully configured
  if (card.deck) return card;

  // Add default metadata
  return {
    ...card,
    deck: 'CORE',  // Default to CORE deck
    weight: 50,    // Default weight
    cooldown: 6,   // Default cooldown
    tags: inferTags(card),
    conditions: {
      metrics: {
        infl: [0, 100],
        growth: [0, 100],
        stability: [0, 100],
        trust: [0, 100]
      }
    }
  };
}

// Infer tags from card content
function inferTags(card) {
  const tags = [];

  // Infer from character
  if (card.character) {
    if (card.character.includes('기자')) tags.push('media');
    if (card.character.includes('대통령')) tags.push('politics');
    if (card.character.includes('재벌')) tags.push('chaebol');
    if (card.character.includes('투자자')) tags.push('market');
    if (card.character.includes('노조')) tags.push('labor');
    if (card.character.includes('중소기업')) tags.push('sme');
  }

  // Infer from text content
  const text = card.text?.toLowerCase() || '';
  if (text.includes('물가') || text.includes('인플레')) tags.push('inflation');
  if (text.includes('금리') || text.includes('금통위')) tags.push('interest_rate');
  if (text.includes('부동산')) tags.push('real_estate');
  if (text.includes('경기') || text.includes('성장')) tags.push('growth');
  if (text.includes('금융') || text.includes('은행')) tags.push('stability');
  if (text.includes('위기')) tags.push('crisis');

  // Infer from type
  if (card.type === EVENT_TYPES.MPC) tags.push('mpc');
  if (card.type === EVENT_TYPES.FSM) tags.push('fsm');
  if (card.type === EVENT_TYPES.URGENT) tags.push('urgent');

  // Infer from endings
  if (card.left?.isEnding || card.right?.isEnding) tags.push('ending');

  return tags.length > 0 ? tags : ['general'];
}

// Export enriched events
export const ENRICHED_EVENTS = EVENTS.map(enrichCardWithMetadata);


