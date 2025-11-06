"use client";

import Slider from "@/app/Components/Slider/Slider";
import { SwiperSlide } from "swiper/react";
import { Play } from "lucide-react";

export default function VideosSection({ videos }: { videos: any[] }) {
  if (!videos?.length) return null;

  return (
    <div className="mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Videos</h2>
      <Slider slidesPerView={3} slidesPerViewMobile={1} spaceBetween={12}>
        {videos.map((video) => (
          <SwiperSlide key={video.id}>
            <div className="relative group cursor-pointer rounded-lg overflow-hidden shadow-lg">
              <img
                src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                alt={video.name}
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                <Play className="w-12 h-12 text-white" />
              </div>
              <p className="text-white mt-2 text-center font-medium">
                {video.name}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Slider>
    </div>
  );
}
