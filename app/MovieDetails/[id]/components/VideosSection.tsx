"use client";

import Slider from "@/app/Components/Slider/Slider";
import React from "react";

interface Video {
  id: string;
  name: string;
  key: string;
  site: string;
  type?: string;
}

export default function VideosSection({ videos }: { videos: Video[] }) {
  if (!videos?.length) return null;

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-6">Videos & Trailers</h2>

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"> */}
      <Slider slidesPerView={1}>
        {videos.map((video) => (
          <div
            key={video.id}
            className="relative group bg-gray-900 rounded-xl overflow-hidden shadow-lg"
          >
            {/* Video Thumbnail */}
            <iframe
              className="w-full h-[70dvh]"
              src={`https://www.youtube.com/embed/${video.key}`}
              title={video.name}
              allowFullScreen
            ></iframe>

            {/* Video Title */}
            <div className="absolute bottom-0 w-full bg-black/70 p-3 text-sm text-center opacity-0 group-hover:opacity-100 transition">
              {video.name}
            </div>
          </div>
        ))}
      </Slider>
      {/* </div> */}
    </section>
  );
}
