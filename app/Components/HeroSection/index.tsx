"use client";

import { Button } from "@/components/ui/button";
import SplitText from "../Animations/SplitText";
import Slider from "../Slider/Slider";
import { Autoplay, EffectFade } from "swiper/modules";

interface HeroSlide {
  title: string;
  overview?: string;
  backdrop_path?: string;
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
          autoplay: { delay: 3000, disableOnInteraction: false },
          speed: 4000,
          effect: "fade",
          fadeEffect: { crossFade: true },
        }}
        modules={[Autoplay, EffectFade]}
      >
        {movies.map((movie, index) => (
          <div
            key={index}
            className="relative w-full min-h-screen flex items-center justify-center bg-black/50 text-white"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent"></div>
            <div className="text-center px-4 max-w-2xl z-50">
              <SplitText
                text={movie.title}
                className="text-3xl md:text-5xl font-bold mb-4"
                delay={100}
                duration={0.6}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
              />
              {movie.overview && (
                <p className="text-lg md:text-2xl font-medium mb-8">
                  {movie.overview.slice(0, 100)}...
                </p>
              )}
              <div className="flex flex-wrap gap-4 justify-center">
                <Button className="cursor-pointer bg-red-600 hover:bg-red-700 text-white text-base md:text-lg px-8 py-6 rounded-lg transition-all duration-200">
                  Watch Now
                </Button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
