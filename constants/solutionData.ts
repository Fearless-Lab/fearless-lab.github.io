export const solutionCategory = ["스크림", "듀오", "자유 랭크", "자유"];

export type TSolutionData = {
  title: string;
  detail: string;
  results: { explanation: string; amount: string }[];
};

export const solutionData = [
  {
    title: "Lorem ipsum dolor sit amet",
    detail:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    results: [
      { explanation: "Lorem ipsum dolor", amount: "10%+ lorem" },
      { explanation: "Dolor sit amet", amount: "3%+ ipsum" },
    ],
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Etiam blandit quam a mauris efficitur, in rhoncus sem rutrum.",
  },
  {
    title: "Consectetur adipiscing elit",
    detail:
      "Aliquam erat volutpat. Etiam nec ipsum sed nulla tempor viverra. Vivamus suscipit felis nec lectus tincidunt, ac porttitor sapien volutpat.",
    results: [
      { explanation: "Velit esse cillum dolore", amount: "1000x" },
      { explanation: "Excepteur sint occaecat", amount: "20%" },
    ],
    review:
      "Mauris euismod, justo non viverra pretium, libero lorem lobortis nunc, ac condimentum orci sapien in orci. Integer scelerisque dignissim lorem.",
  },
  {
    title: "Ut enim ad minim veniam",
    detail:
      "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.",
    results: [
      { explanation: "Excepteur sint occaecat", amount: "20%+ lorem" },
      { explanation: "Non proident system", amount: "on-premise GUI" },
    ],
    review:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Nemo enim ipsam voluptatem.",
  },
  {
    title: "Duis aute irure dolor",
    detail:
      "In reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    results: [
      { explanation: "Lorem detection accuracy", amount: "68 cases at 100%" },
      { explanation: "Dolor detection accuracy", amount: "48 cases at 97.9%" },
      { explanation: "AUROC", amount: "0.92 (0.85–0.98)" },
    ],
    review:
      "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur. Vel illum qui dolorem.",
  },
  {
    title: "Sed ut perspiciatis unde",
    detail:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit. Sed quia consequuntur magni dolores eos.",
    results: [{ explanation: "Prediction accuracy", amount: "70–90%" }],
    review:
      "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam. Nisi ut aliquid ex ea commodi consequatur.",
  },
];
