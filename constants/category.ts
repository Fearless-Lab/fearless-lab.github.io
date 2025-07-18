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
