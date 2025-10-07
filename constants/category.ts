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
  "하드 피어리스",
  // "소프트 피어리스",
  "토너먼트 드래프트",
];

export const modeDescription: Record<(typeof gameMode)[number], string> = {
  "토너먼트 드래프트": "자유롭게 선택할 수 있는 모드에요.",
  "소프트 피어리스":
    "이전 세트들에서 우리 팀이 사용했던 챔피언은 다시 고를 수 없어요.",
  "하드 피어리스":
    "이전 세트들에서 양 팀이 사용했던 챔피언을 다시 고를 수 없어요.",
};

export const modeExtraDescription: Record<(typeof gameMode)[number], string> = {
  "토너먼트 드래프트": " \n",
  "소프트 피어리스":
    "밴 페이즈에서는 상대가 이전 세트에서 사용했던 챔피언이 자동으로 비활성화돼요.\n" +
    "사용할 수 없는 챔피언을 다시 밴하는 실수를 막기 위한 처리예요.",
  "하드 피어리스":
    "밴 페이즈에서도 이전 세트에서 사용했던 챔피언은 자동으로 비활성화돼요.\n" +
    "즉, 한 번이라도 쓰인 챔피언은 이후 세트에서 다시 사용할 수 없고 밴도 불필요해요.",
};

export const koreanModeToEnglish: Record<string, string> = {
  "하드 피어리스": "hardFearless",
  "소프트 피어리스": "fearless",
  "토너먼트 드래프트": "normal",
};

export const modalDescription = {
  error: [
    "제한 시간 내 픽을 완료하지 않으면 자동으로 랜덤한 챔피언이 선택됩니다.",
    "제한 시간 내 밴을 완료하지 않으면 해당 차례는 건너뜁니다.",
    `밴픽 대표자는 반드시 해당 링크에 접속한 상태를 유지해 주십시오.
브라우저를 닫거나 비활성화하면 진행에 문제가 발생할 수 있습니다.`,
  ],
};
