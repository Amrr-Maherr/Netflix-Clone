"use client";
import Slider from "@/app/Components/Slider/Slider";
import Image from "next/image";
import { SwiperSlide } from "swiper/react";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function ImagesGallery({
  images,
}: {
  images: { file_path: string }[];
}) {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  if (!images?.length) return null;

  const slides = images.map((img) => ({
    src: `https://image.tmdb.org/t/p/original${img.file_path}`,
    alt: "Profile image",
  }));

  return (
    <>
      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        slides={slides}
        index={lightboxIndex}
      />
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
                quality={75}
                priority
                src={`https://image.tmdb.org/t/p/w300${img.file_path}`}
                alt={`Profile ${i}`}
                className="w-full h-full object-cover rounded-lg shadow-lg cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => setLightboxIndex(i)}
              />
            </SwiperSlide>
          ))}
        </Slider>
      </div>
    </>
  );
}
