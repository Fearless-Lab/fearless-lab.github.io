export const category = [
  { key: "scrim", label: "스크림" },
  { key: "duo", label: "듀오" },
  { key: "flexQueue", label: "자유 랭크" },
  { key: "free", label: "자유" },
];

export const categoryOptions: Record<string, string[]> = {
  scrim: ["일반", "피어리스", "하드피어리스"],
  duo: [
    "아이언",
    "브론즈",
    "실버",
    "골드",
    "플래티넘",
    "에메랄드",
    "다이아몬드",
  ],
  flexQueue: ["자유랭크"],
  free: ["자유"],
};

export const categoryGuideText = {
  scrim: `함께 연습할 스크림 팀을 구해보세요!
진지한 대결, 스크림 상대 팀을 모집 중!`,

  duo: `비슷한 티어의 든든한 듀오를 찾아보세요!
같은 목표를 가진 파트너와 함께 하세요!`,

  flexQueue: `자유랭크 팀원을 모집해보세요!
포지션별 역할을 나눠 팀플레이를 경험해봐요!`,

  free: `자유롭게 이야기를 나눠보세요.
게임에 대한 잡담이나 일상 공유도 환영이에요!`,
};

export const PAGE_SIZE = 7;

export const gameMode = [
  "토너먼트 드래프트",
  "소프트 피어리스",
  "하드 피어리스",
];

export const modeDescription: Record<(typeof gameMode)[number], string> = {
  "토너먼트 드래프트": "자유롭게 선택할 수 있는 모드에요.",
  "소프트 피어리스":
    "이전 세트에서 우리 팀이 썼던 챔피언은 다시 고를 수 없어요.",
  "하드 피어리스":
    "이전 세트에서 양 팀이 썼던 챔피언 모두 다시 고를 수 없어요.",
};

export const koreanModeToEnglish: Record<string, string> = {
  "토너먼트 드래프트": "normal",
  "소프트 피어리스": "fearless",
  "하드 피어리스": "hardFearless",
};

export const modalDescription = {
  error: [
    "제한 시간 내 밴픽을 완료하지 않으면 자동으로 랜덤한 챔피언이 선택됩니다.",
    //     `밴픽 실수 시에는 해당 세트를 초기화하고 처음부터 다시 진행해야 합니다.
    // 특정 밴 혹은 픽만 바꿀 수 없어요!`,
  ],
};
