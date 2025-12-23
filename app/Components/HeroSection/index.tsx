"use client";

import { Button } from "@/components/ui/button";
import Slider from "../Slider/Slider";
import { Autoplay, EffectFade } from "swiper/modules";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Play, Info } from "lucide-react";

interface HeroSlide {
  id?: number;
  title?: string;
  name?: string;
  overview?: string;
  backdrop_path?: string;
  poster_path?: string;
  media_type: "movie" | "tv" | "person";
}

interface HeroSectionProps {
  movies: HeroSlide[];
}

export default function HeroSection({ movies }: HeroSectionProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        {movies.map((movie, index) => {
          const imageUrl = `https://image.tmdb.org/t/p/original${
            isMobile ? movie.poster_path : movie.backdrop_path
          }`;

          return (
            <div
              key={index}
              className="relative w-full h-screen flex items-center justify-center text-white"
              style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent z-10"></div>

              {/* Content */}
              <div className="relative z-20 w-full h-full flex items-center">
                <div className="container">
                  <div className="max-w-2xl text-white">
                    <h1 className="text-4xl md:text-7xl font-bold mb-4 drop-shadow-lg">
                      {movie.title || movie.name || "No Title"}
                    </h1>

                    {movie.overview && (
                      <p className="text-base md:text-lg text-gray-200 mb-6 leading-relaxed max-w-xl drop-shadow">
                        {movie.overview.length > 200 ? `${movie.overview.substring(0, 200)}...` : movie.overview}
                      </p>
                    )}

                    <div className="flex gap-4 flex-wrap">
                      <Link
                        href={
                          movie.media_type === "movie"
                            ? `/MovieDetails/${movie.id}`
                            : movie.media_type === "tv"
                            ? `/TvShowDetails/${movie.id}`
                            : `#`
                        }
                      >
                        <Button className="bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-lg font-bold text-lg transition transform hover:scale-105 flex items-center gap-2">
                          <Play className="w-6 h-6" />
                          Play
                        </Button>
                      </Link>
                      <Button className="bg-white/20 text-white hover:bg-white/30 border border-white/50 px-8 py-4 rounded-lg font-bold text-lg transition transform hover:scale-105 backdrop-blur-sm flex items-center gap-2">
                        <Info className="w-6 h-6" />
                        More Info
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
