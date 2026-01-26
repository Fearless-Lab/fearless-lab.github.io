import KakaoAdFit from "./KakaoAdFit";

const AdSection: React.FC = () => {
  return (
    <section className="w-full py-8 flex flex-col items-center gap-6">
      {/* 모바일: 320x100 */}
      <div className="block md:hidden">
        <KakaoAdFit unit="DAN-Ji3L2DE01O29h5RC" width={320} height={100} />
      </div>
      {/* PC: 728x90 */}
      <div className="hidden md:block">
        <KakaoAdFit unit="DAN-YYwQ2W6dSwtLkMpt" width={728} height={90} />
      </div>
    </section>
  );
};

export default AdSection;
