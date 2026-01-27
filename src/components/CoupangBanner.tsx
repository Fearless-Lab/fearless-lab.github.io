interface CoupangBannerProps {
  id: number;
  trackingCode: string;
  width: number;
  height: number;
  className?: string;
}

const CoupangBanner: React.FC<CoupangBannerProps> = ({
  id,
  trackingCode,
  width,
  height,
  className,
}) => {
  const src = `https://ads-partners.coupang.com/widgets.html?id=${id}&template=carousel&trackingCode=${trackingCode}&subId=&width=${width}&height=${height}&tsource=`;

  return (
    <div className={className}>
      <iframe
        src={src}
        width={width}
        height={height}
        referrerPolicy="unsafe-url"
        style={{ border: "none", overflow: "hidden" }}
      />
    </div>
  );
};

export default CoupangBanner;
