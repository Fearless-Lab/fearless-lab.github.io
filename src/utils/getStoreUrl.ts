export const APP_STORE_URL =
  "https://apps.apple.com/kr/app/%EC%86%8C%EB%9D%BC-sora-%ED%95%A8%EA%BB%98-%EC%B0%8D%EB%8A%94-%EC%B9%B4%EB%A9%94%EB%9D%BC/id6800674248";
export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.picTrip.pictrip&hl=ko";

export function getStoreUrl() {
  const ua = navigator.userAgent;

  if (/iPhone|iPad|iPod|Macintosh/.test(ua)) return APP_STORE_URL;
  return PLAY_STORE_URL;
}
