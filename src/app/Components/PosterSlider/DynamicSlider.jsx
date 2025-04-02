"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import Button from "../ui/Button";
import Link from "next/link";
import Image from "next/image";

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
            <div className="relative w-full h-dvh flex flex-col justify-center items-center text-white text-center p-5 overflow-hidden">
              <Image
                src={movie.image}
                alt={movie.title || "Movie poster"}
                layout="fill"
                objectFit="cover"
                className="-z-10"
              />
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
