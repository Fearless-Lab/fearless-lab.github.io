import img1 from "@/assets/Position_Diamond-Top.png";
import img2 from "@/assets/Position_Diamond-Jungle.png";
import img3 from "@/assets/Position_Diamond-Mid.png";
import img4 from "@/assets/Position_Diamond-Bot.png";
import img5 from "@/assets/Position_Diamond-Support.png";

const images = [img1, img2, img3, img4, img5];

export default function PositionRow() {
  return (
    <div className="flex gap-2">
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`img-${i}`}
          className="w-6 h-6 cursor-pointer"
        />
      ))}
    </div>
  );
}
