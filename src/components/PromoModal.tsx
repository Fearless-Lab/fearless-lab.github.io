import { XIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getStoreUrl } from "@utils/getStoreUrl";

interface PromoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function PromoModal({ open, onOpenChange }: PromoModalProps) {
  const handleImageClick = () => {
    if (typeof window.gtag !== "undefined") {
      window.gtag("event", "promo_modal_click", {
        event_category: "Promo",
        event_label: "Promo Modal Image Click",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="z-[110] w-[94vw] max-w-[min(94vw,44rem,calc(62vh*1.3333))] sm:max-w-[min(94vw,44rem,calc(62vh*1.3333))] max-h-[66vh] overflow-hidden rounded-lg bg-[#19191c] p-0 gap-0 border-0 shadow-2xl"
      >
        <DialogHeader className="sr-only">
          <DialogTitle>홍보용 모달 제목</DialogTitle>
          <DialogDescription>여기에 홍보 문구가 들어갑니다.</DialogDescription>
        </DialogHeader>

        <button
          type="button"
          onClick={() => onOpenChange(false)}
          aria-label="닫기"
          className="absolute right-3 top-3 z-10 inline-flex items-center justify-center rounded-full bg-black/50 p-1.5 text-white backdrop-blur-sm transition-colors hover:bg-black/70 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          <XIcon className="size-5" />
        </button>

        <a
          href={getStoreUrl()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleImageClick}
          className="group relative block"
        >
          <img
            src="/sora_modal.webp"
            alt="홍보 이미지"
            width={1448}
            height={1086}
            className="block w-full h-auto aspect-[4/3] object-cover cursor-pointer transition-[filter] duration-200 group-hover:blur-[2px] group-hover:brightness-75 group-active:blur-[2px] group-active:brightness-75"
          />
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-active:opacity-100">
            <span className="text-base font-semibold text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
              클릭하여 자세히 보기
            </span>
          </span>
        </a>
      </DialogContent>
    </Dialog>
  );
}

export default PromoModal;
