import { useEffect, useRef } from "react";

interface KakaoAdFitProps {
  unit: string;
  width: number;
  height: number;
  className?: string;
}

const KakaoAdFit: React.FC<KakaoAdFitProps> = ({
  unit,
  width,
  height,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const script = document.createElement("script");
    script.src = "https://t1.daumcdn.net/kas/static/ba.min.js";
    script.async = true;
    containerRef.current?.appendChild(script);

    return () => {
      initialized.current = false;
    };
  }, []);

  return (
    <div ref={containerRef} className={className}>
      <ins
        className="kakao_ad_area"
        style={{ display: "none" }}
        data-ad-unit={unit}
        data-ad-width={width.toString()}
        data-ad-height={height.toString()}
      />
    </div>
  );
};

export default KakaoAdFit;
