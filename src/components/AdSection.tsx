import KakaoAdFit from "./KakaoAdFit";

const AdSection: React.FC = () => {
  return (
    <section className="w-full py-8 flex flex-col items-center gap-6">
      <KakaoAdFit unit="DAN-Ji3L2DE01O29h5RC" width={320} height={100} />
    </section>
  );
};

export default AdSection;
