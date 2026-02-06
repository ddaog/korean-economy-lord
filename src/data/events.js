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
    act: 1,
    type: EVENT_TYPES.GENERAL,
    character: CHAR.REPORTER.name,
    image: CHAR.REPORTER.img,
    text: "당신은 한국은행 총재로 첫 출근을 했습니다. 로비에는 축하 꽃다발과 함께 직원들이 줄지어 서 있고, 기자들은 플래시 세례를 퍼붓습니다. 경제는 이미 심상치 않습니다 – 물가는 꿈틀대고 환율은 요동치는데, 이제 모든 책임은 당신의 몫입니다.",
    left: {
      text: "조용히 사무실로 들어가 내부 보고부터 챙긴다",
      diff: { infl: 0, growth: 0, stability: 0, trust: -5 },
      narrative: "대중의 존재감이 낮아졌습니다.",
      chains: [{ eventId: 'C-003', delay: 0 }]
    },
    right: {
      text: "\"경제 안정 최우선!\" 취임 연설을 힘차게 발표한다",
      diff: { infl: 0, growth: 0, stability: 0, trust: 5 },
      narrative: "대중의 기대가 상승했습니다!",
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
  }
];

