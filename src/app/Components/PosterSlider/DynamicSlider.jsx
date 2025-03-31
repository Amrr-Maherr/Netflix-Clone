"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules"; // Import Autoplay
import Button from "../ui/Button";
import Link from "next/link";

export default function DynamicSlider({ moviesPoster }) {
  return (
    <>
      <Swiper
        loop={true}
        pagination={{
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]} 
        className="mySwiper"
      >
        {moviesPoster.map((movie, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full h-dvh flex flex-col justify-center items-center text-white text-center p-5"
              style={{
                backgroundImage: `url(${movie.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black opacity-40"></div>
              <div className="relative z-10">
                <h1 className="text-3xl font-bold mb-5">{movie.title}</h1>
                <p className="text-lg mb-5">{movie.teaser}</p>
                  <Button ButtonText={movie.buttonText} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
