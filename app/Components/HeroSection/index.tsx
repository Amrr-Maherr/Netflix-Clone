"use client";

import { Button } from "@/components/ui/button";
import Slider from "../Slider/Slider";
import { Autoplay, EffectFade } from "swiper/modules";
import Link from "next/link";
import { motion } from "framer-motion";

interface HeroSlide {
  id?: number;
  title?: string;
  name?: string;
  overview?: string;
  backdrop_path?: string;
  media_type: "movie" | "tv" | "person";
}

interface HeroSectionProps {
  movies: HeroSlide[];
}

export default function HeroSection({ movies }: HeroSectionProps) {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Slider
        slidesPerView={1}
        slidesPerViewMobile={1}
        spaceBetween={0}
        swiperOptions={{
          autoplay: { delay: 4000, disableOnInteraction: false },
          speed: 4000,
          effect: "fade",
          fadeEffect: { crossFade: true },
        }}
        modules={[Autoplay, EffectFade]}
      >
        {movies.map((movie, index) => (
          <div
            key={index}
            className="relative w-full h-screen flex items-center justify-center text-white"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10"></div>

            {/* Content with Framer Motion */}
            <div
              className="relative z-20 text-center px-4 max-w-3xl"
              key={movie.id || index}
            >
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-wide drop-shadow-lg">
                {movie.title || movie.name || "No Title"}
              </h1>

              {movie.overview && (
                <p className="text-lg md:text-2xl font-medium mb-8 text-gray-200 drop-shadow-md">
                  {movie.overview.slice(0, 150)}...
                </p>
              )}

              <div
                className="flex justify-center"
              >
                <Link
                  className="cursor-pointer"
                  href={
                    movie.media_type === "movie"
                      ? `/MovieDetails/${movie.id}`
                      : movie.media_type === "tv"
                      ? `/TvShowDetails/${movie.id}`
                      : `#`
                  }
                >
                  <Button className="bg-red-600/90 cursor-pointer hover:bg-red-700/95 text-white text-lg md:text-xl px-10 py-4 rounded-lg backdrop-blur-sm shadow-lg transition-all duration-300">
                    Watch Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
