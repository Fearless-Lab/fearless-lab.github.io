import { getStoreUrl } from "@utils/getStoreUrl";

function SoraBanner() {
  const handleClick = () => {
    if (typeof window.gtag !== "undefined") {
      window.gtag("event", "sora_banner_click", {
        event_category: "Promo",
        event_label: "Sora Banner Click",
      });
    }
  };

  return (
    <div className="mt-8 px-4">
      <a
        href={getStoreUrl()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="group relative block max-w-6xl mx-auto overflow-hidden rounded-lg shadow-lg"
      >
        <img
          src="/sora_banner.webp"
          alt="소라(sora) - 함께 찍는 카메라 앱 다운로드"
          width={2304}
          height={287}
          loading="lazy"
          className="block w-full h-auto aspect-[3548/442] object-cover transition-[filter] duration-200 group-hover:blur-[2px] group-hover:brightness-75 group-active:blur-[2px] group-active:brightness-75"
        />
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-active:opacity-100">
          <span className="text-base font-semibold text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
            클릭하여 자세히 보기
          </span>
        </span>
      </a>
    </div>
  );
}

export default SoraBanner;
