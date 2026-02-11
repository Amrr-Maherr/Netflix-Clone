"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Star, Calendar, Clock, Play, Info, Volume2, VolumeX, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSelector, useDispatch } from "react-redux";
import { addToList, removeFromList } from "@/Store/myListSlice";
import toast from "react-hot-toast";
import ShareButton from "@/app/Components/ShareButton/ShareButton";
import type { RootState, HeroSectionProps, MyListItem } from "@/Types";

export default function HeroSection({
  movie,
  tv,
  backdropUrl,
  posterUrl,
  trailer,
}: HeroSectionProps) {
  const data = movie || tv;
  const trailerKey = trailer?.key;
  const title = movie ? movie.title : tv ? tv.name : "";
  const tagline = data?.tagline;
  const date = movie ? movie.release_date : tv ? tv.first_air_date : "";
  const runtime = movie 
    ? movie.runtime 
    : tv && Array.isArray(tv.episode_run_time) 
      ? tv.episode_run_time[0] 
      : null;

  const [isMobile, setIsMobile] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Start muted by default

  const myList = useSelector((state: RootState) => state.myList);
  const dispatch = useDispatch();

  const isInList = myList.some((item) => item.id === data?.id);

  const handleAddToList = () => {
    if (!data) return;
    
    if (isInList) {
      dispatch(removeFromList(data.id));
      toast.success("Removed from your list!");
    } else {
      const item = {
        ...data,
        media_type: movie ? ("movie" as const) : ("tv" as const),
      };
      dispatch(addToList(item as MyListItem));
      toast.success("Added to your list!");
    }
  };

  // Detect screen size on client-side
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const backgroundImage = isMobile ? posterUrl : backdropUrl || posterUrl;

  if (!data) return null;

  return (
    <div className="relative flex items-end md:items-center justify-start w-full h-dvh bg-black overflow-hidden">
      {/* Background Video - Trailer for Desktop */}
      {trailerKey && !isMobile && (
        <div className="absolute inset-0 w-full h-full z-0">
          <div className="relative w-full h-full">
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=${trailerKey}&controls=0&modestbranding=1&iv_load_policy=3&disablekb=1&start=30&rel=0`}
              title={`${title} Trailer Background`}
              className="absolute inset-0 w-full h-full object-cover"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            {/* Dark overlay to ensure text is readable over the video */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          </div>
        </div>
      )}

      {/* Background Video - Trailer for Mobile (with different parameters) */}
      {trailerKey && isMobile && (
        <div className="absolute inset-0 w-full h-full z-0">
          <div className="relative w-full h-full">
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=${trailerKey}&controls=0&modestbranding=1&iv_load_policy=3&disablekb=1&playsinline=1&rel=0`}
              title={`${title} Trailer Background`}
              className="absolute inset-0 w-full h-full object-cover"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
            ></iframe>
            {/* Dark overlay to ensure text is readable over the video */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          </div>
        </div>
      )}

      {/* Fallback Background Image when no trailer */}
      {!trailerKey && (
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src={backgroundImage}
            alt={title}
            fill
            className="object-cover"
            quality={100}
            placeholder="blur"
            blurDataURL="/Netflix_Symbol_RGB.png"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        </div>
      )}

      {/* Content */}
      <div className="z-40 container py-10 relative">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-7xl font-bold mb-4 drop-shadow-lg">
            {title}
          </h1>
          {tagline && (
            <p className="text-lg md:text-xl text-gray-300 mb-6 italic drop-shadow">
              {tagline}
            </p>
          )}

          {/* Overview */}
          {data.overview && (
            <p className="text-base md:text-lg text-gray-200 mb-6 leading-relaxed max-w-xl drop-shadow">
              {data.overview.length > 200 ? `${data.overview.substring(0, 200)}...` : data.overview}
            </p>
          )}

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-4 text-sm md:text-base mb-8">
            {data.vote_average && (
              <div className="flex items-center gap-1">
                <Star className="w-6 h-6 text-yellow-500 fill-current" />
                <span className="text-lg">{data.vote_average.toFixed(1)}</span>
              </div>
            )}
            {date && (
              <span className="text-lg">{new Date(date).getFullYear()}</span>
            )}
            {runtime && (
              <span className="text-lg">{runtime} min</span>
            )}
            {data.genres?.length > 0 && (
              <span className="bg-black/50 px-3 py-1 rounded text-lg">
                {data.genres[0].name}
              </span>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 flex-wrap items-center">
            {trailerKey && (
              <Button
                className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 px-8 py-4 rounded-lg font-bold text-lg transition transform hover:scale-105 border border-white/30"
                disabled
              >
                <Play className="w-6 h-6 fill-current" />
                Play
              </Button>
            )}
            {trailerKey && (
              <Button
                className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 px-4 py-3 rounded-lg font-bold text-lg transition transform hover:scale-105 border border-white/30"
                onClick={toggleMute}
              >
                {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
              </Button>
            )}
            <Button
              className={`inline-flex items-center gap-3 bg-gray-500/70 text-white hover:bg-gray-500/90 px-8 py-4 rounded-lg font-bold text-lg transition transform hover:scale-105`}
              onClick={handleAddToList}
            >
              {isInList ? <Check className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
              {isInList ? "My List" : "My List"}
            </Button>
            <ShareButton
              title={title}
              description={data.overview || `Watch ${title} on Netflix Clone`}
              className="ml-auto sm:ml-0"
            />
          </div>
        </div>
      </div>

      {/* Note: Trailer is playing in the background */}
    </div>
  );
}
