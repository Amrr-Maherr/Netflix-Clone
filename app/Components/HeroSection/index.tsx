"use client";

import { Button } from "@/components/ui/button";
import Slider from "../Slider/Slider";
import { Autoplay, EffectFade } from "swiper/modules";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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
  const user = useSelector((state: any) => state.user);

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
              <div className="relative z-20 text-center px-4 max-w-3xl">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-wide drop-shadow-lg">
                  {movie.title || movie.name || "No Title"}
                </h1>

                {movie.overview && (
                  <p className="text-lg md:text-2xl font-medium mb-8 text-gray-200 drop-shadow-md">
                    {movie.overview.slice(0, 150)}...
                  </p>
                )}

                <div className="flex justify-center gap-4">
                  <Link
                    href={
                      movie.media_type === "movie"
                        ? `/MovieDetails/${movie.id}`
                        : movie.media_type === "tv"
                        ? `/TvShowDetails/${movie.id}`
                        : `#`
                    }
                  >
                    <Button className="bg-red-600/90 hover:bg-red-700/95 text-white text-lg md:text-xl px-10 py-4 rounded-lg backdrop-blur-sm shadow-lg transition-all duration-300">
                      Watch Now
                    </Button>
                  </Link>
                  {!user && (
                    <Link href="/Login">
                      <Button className="bg-transparent border-2 border-white/50 hover:bg-white/10 text-white text-lg md:text-xl px-10 py-4 rounded-lg backdrop-blur-sm shadow-lg transition-all duration-300">
                        Sign In
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
