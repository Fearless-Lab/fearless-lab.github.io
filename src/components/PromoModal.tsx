import { XIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const HIDE_UNTIL_KEY = "promoModalHideUntil";
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

const APP_STORE_URL =
  "https://apps.apple.com/kr/app/%EB%94%94%EB%9E%99%ED%8A%B8-diract-%EC%95%88%EB%AC%B4-%EC%97%B0%EC%8A%B5-%EA%B3%B5%EA%B0%84/id6754757174";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.baek.diract&hl=ko";

function getStoreUrl() {
  const ua = navigator.userAgent;

  if (/iPhone|iPad|iPod|Macintosh/.test(ua)) return APP_STORE_URL;
  return PLAY_STORE_URL;
}

interface PromoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function PromoModal({ open, onOpenChange }: PromoModalProps) {
  const handleHideForAWeek = () => {
    localStorage.setItem(HIDE_UNTIL_KEY, String(Date.now() + WEEK_MS));
    onOpenChange(false);
  };

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
        className="z-[110] w-fit max-w-[90vw] sm:max-w-xl max-h-[90vh] overflow-hidden rounded-none rounded-b-2xl bg-[#19191c] p-0 gap-0 border-0 shadow-2xl"
      >
        <DialogHeader className="sr-only">
          <DialogTitle>홍보용 모달 제목</DialogTitle>
          <DialogDescription>여기에 홍보 문구가 들어갑니다.</DialogDescription>
        </DialogHeader>

        <a
          href={getStoreUrl()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleImageClick}
        >
          <img
            src="/diract.svg"
            alt="홍보 이미지"
            className="block w-full h-auto max-h-[70vh] object-contain cursor-pointer"
          />
        </a>

        <DialogFooter className="flex-row items-center justify-between bg-neutral-100 px-6 py-4 sm:justify-between">
          <button
            type="button"
            onClick={handleHideForAWeek}
            className="text-sm text-neutral-700 hover:text-neutral-900 underline-offset-4 hover:underline cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded"
          >
            일주일간 보지 않기
          </button>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="inline-flex items-center gap-1 text-sm text-neutral-700 hover:text-neutral-900 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded"
          >
            닫기
            <XIcon className="size-4" />
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { HIDE_UNTIL_KEY };
export default PromoModal;
