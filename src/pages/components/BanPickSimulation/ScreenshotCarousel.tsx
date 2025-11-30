import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

const screenshots = [
  "/screenshots/sim-1.png",
  "/screenshots/sim-2.png",
  "/screenshots/sim-3.png",
  "/screenshots/sim-4.png",
];

const ScreenshotCarousel = () => {
  return (
    <div className="hidden sm:block relative w-full mt-4">
      <Swiper
        modules={[Navigation, Pagination]}
        grabCursor={true}
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet !bg-white/30",
          bulletActiveClass: "swiper-pagination-bullet-active !bg-cyan-400",
        }}
        navigation={{
          prevEl: ".swiper-button-prev-custom",
          nextEl: ".swiper-button-next-custom",
        }}
        className="!pb-12"
      >
        {screenshots.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="rounded-lg overflow-hidden">
              <img
                src={src}
                alt={`screenshot-${index + 1}`}
                className="w-full h-auto object-contain bg-black"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button className="swiper-button-prev-custom absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 p-2 rounded-full cursor-pointer transition-all">
        <ArrowLeftIcon className="w-6 h-6 text-white" />
      </button>
      <button className="swiper-button-next-custom absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 p-2 rounded-full cursor-pointer transition-all">
        <ArrowRightIcon className="w-6 h-6 text-white" />
      </button>
    </div>
  );
};

export default ScreenshotCarousel;
