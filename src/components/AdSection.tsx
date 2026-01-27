import KakaoAdFit from "./KakaoAdFit";
import CoupangBanner from "./CoupangBanner";

interface AdSectionProps {
  showSearchBanner?: boolean;
}

const AdSection: React.FC<AdSectionProps> = ({ showSearchBanner = true }) => {
  return (
    <section className="w-full py-8 flex flex-col items-center gap-4">
      {/* 쿠팡파트너스 캐러셀 - 모바일: 320x100 */}
      <div className="block md:hidden">
        <CoupangBanner
          id={960818}
          trackingCode="AF9767684"
          width={320}
          height={100}
        />
      </div>
      {/* 쿠팡파트너스 캐러셀 - PC: 728x90 */}
      <div className="hidden md:block">
        <CoupangBanner
          id={960818}
          trackingCode="AF9767684"
          width={728}
          height={90}
        />
      </div>

      {/* 쿠팡파트너스 검색 배너 */}
      {showSearchBanner && (
        <div className="w-full max-w-3xl px-4">
          <iframe
            src="https://coupa.ng/clrh4M"
            width="100%"
            height="44"
            referrerPolicy="unsafe-url"
            style={{ border: "none" }}
          />
        </div>
      )}

      {/* 쿠팡파트너스 공시 문구 */}
      <p className="text-xs text-gray-500 text-center">
        이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를
        제공받습니다.
      </p>

      {/* 카카오 애드핏 - 모바일: 320x100 */}
      <div className="block md:hidden">
        <KakaoAdFit unit="DAN-Ji3L2DE01O29h5RC" width={320} height={100} />
      </div>
      {/* 카카오 애드핏 - PC: 728x90 */}
      <div className="hidden md:block">
        <KakaoAdFit unit="DAN-YYwQ2W6dSwtLkMpt" width={728} height={90} />
      </div>
    </section>
  );
};

export default AdSection;
