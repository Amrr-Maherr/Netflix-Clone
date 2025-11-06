"use client";
import Slider from "@/app/Components/Slider/Slider";
import Image from "next/image";
import { SwiperSlide } from "swiper/react";

export default function ImagesGallery({
  images,
}: {
  images: { file_path: string }[];
}) {
  if (!images?.length) return null;

  return (
    <div className="mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
        Gallery
      </h2>
      <Slider slidesPerView={6} slidesPerViewMobile={1.5} spaceBetween={12}>
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <Image
              width={100}
              height={100}
              quality={100}
              priority
              src={`https://image.tmdb.org/t/p/w300${img.file_path}`}
              alt={`Profile ${i}`}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </SwiperSlide>
        ))}
      </Slider>
    </div>
  );
}
