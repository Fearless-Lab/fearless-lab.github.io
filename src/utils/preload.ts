export const preloadSplash = (champId: string) => {
  const img = new Image();
  img.src = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champId}_0.jpg`;
};
