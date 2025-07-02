export const solutionCategory = ["제조", "에너지", "물류", "헬스케어", "금융"];

export type TSolutionData = {
  title: string;
  detail: string;
  results: { explanation: string; amount: string }[];
};

export const solutionData = [
  {
    title: "펄프 생산 시설 최적화",
    detail:
      "회사는 설비 제어 최적화를 통해 비용 절감과 제품 품질 향상을 목표로 합니다",
    results: [
      { explanation: "에너지 소비 절감", amount: "10%+ 절감" },
      { explanation: "생산성 향상", amount: "3%+ 향상" },
    ],
    review:
      "이 솔루션을 통해 품질 관리의 중요성을 깨달았으며, 품질과 에너지 사용량을 동시에 개선할 수 있다는 점이 인상적입니다.",
  },
  {
    title: "AI 기반 태양광 패널 견적 최적화",
    detail:
      "AI가 사이트 조건과 전력 요구 사항을 분석하여 최적의 태양광 패널 설치 견적을 생성합니다.",
    results: [
      { explanation: "AI 기반 태양광 견적 속도 향상", amount: "1000배" },
      { explanation: "AI 최적화를 통한 전기 요금 절감", amount: "20%" },
    ],
    review:
      "현장에서 미팅하면서 리얼타임으로 시뮬레이션이 가능하여 안건 수주가 확실히 늘어났습니다.",
  },
  {
    title: "화물 물류 조합 최적화",
    detail:
      "회사는 RFP에 대응해야 하며, 화물 조합 최적화를 통해 경쟁력 있는 비용을 제시해야 합니다.",
    results: [
      { explanation: "비용 절감", amount: "20%+ 절감" },
      { explanation: "사용자 시스템", amount: "온프레미스 GUI 시스템" },
    ],
    review:
      "이전에는 TF 팀을 구성하고 방대한 데이터를 수작업으로 분석해야 했습니다. 이제는 솔루션을 통해 최적의 조합을 쉽게 찾을 수 있습니다.",
  },
  {
    title: "오처방 감지 시스템",
    detail:
      "소아 대상 약물의 과다 복용 및 부족 복용을 방지하는 오처방 감지 시스템.",
    results: [
      { explanation: "과다 복용 감지 정확도", amount: "68건의 처방에서 100%" },
      { explanation: "부족 복용 감지 정확도", amount: "48건의 처방에서 97.9%" },
      { explanation: "AUROC", amount: "0.92 (0.85-0.98)" },
    ],
    review:
      "이 시스템을 통해 어린이 약물 과다·과소 투여를 방지하여 더욱 안전한 처방이 가능해졌습니다.",
  },
  {
    title: "AI 기반 원자재 가격 예측",
    detail:
      "AI가 장기적인 원자재 가격을 예측하고 분석 보고서를 제공하여 조달 및 시장 전략 결정을 지원합니다.",
    results: [{ explanation: "가격 예측 정확도", amount: "70~90%" }],
    review:
      "한눈에 가격흐름과 예측 근거 레포트를 확인할 수 있고, 언제든 로그인하여 바로 파악이 가능합니다. 누구나 쉽게 접근 가능합니다.",
  },
];
