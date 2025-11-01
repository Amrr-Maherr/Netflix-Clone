"use client";
import React, { ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Pagination, Autoplay, Navigation, EffectFade } from "swiper/modules";
import { SwiperOptions } from "swiper/types";

interface SliderProps {
  children: ReactNode;
  slidesPerView?: number;
  slidesPerViewMobile?: number;
  spaceBetween?: number;
  className?: string;
  swiperOptions?: SwiperOptions;
  modules?: any[];
}

export default function Slider({
  children,
  slidesPerView = 4,
  spaceBetween = 20,
  slidesPerViewMobile = 1,
  className,
  swiperOptions = {},
  modules = [Pagination, Autoplay],
}: SliderProps) {
  return (
    <Swiper
      slidesPerView={slidesPerViewMobile}
      spaceBetween={spaceBetween}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
        ...(swiperOptions.autoplay as any),
      }}
      loop={swiperOptions.loop ?? true}
      pagination={swiperOptions.pagination ?? false}
      speed={swiperOptions.speed ?? 800} // مدة التحول
      effect={swiperOptions.effect ?? "fade"} // fade effect
      fadeEffect={{ crossFade: true }} // الانتقال السلس
      modules={[...modules, EffectFade]} // إضافة موديل fade
      breakpoints={{
        640: { slidesPerView: Math.min(slidesPerView, 2), spaceBetween },
        768: { slidesPerView: Math.min(slidesPerView, 3), spaceBetween },
        1024: { slidesPerView, spaceBetween },
        ...swiperOptions.breakpoints,
      }}
      className={`mySwiper ${className || ""}`}
      {...swiperOptions}
    >
      {React.Children.map(children, (child, index) => (
        <SwiperSlide key={index} className="flex justify-center">
          {child}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
