"use client";

import Slider from "@/app/Components/Slider/Slider";
import { useState } from "react";
import { Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

interface Video {
  id: string;
  name: string;
  key: string;
  site: string;
  type?: string;
}

export default function VideosSection({ videos }: { videos: Video[] }) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  if (!videos?.length) return null;

  return (
    <section className="py-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Videos & Trailers</h2>

      <Slider slidesPerView={4} slidesPerViewMobile={1.5} spaceBetween={16}>
        {videos.map((video) => (
          <div
            key={video.id}
            className="relative group cursor-pointer transform hover:scale-105 transition-all duration-300"
            onClick={() => setSelectedVideo(video)}
          >
            {/* Video Thumbnail */}
            <div className="relative w-full h-32 md:h-40 rounded-lg overflow-hidden shadow-lg">
              <img
                src={`https://img.youtube.com/vi/${video.key}/maxresdefault.jpg`}
                alt={video.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to hqdefault if maxresdefault fails
                  (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.key}/hqdefault.jpg`;
                }}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-6 h-6 text-black fill-current" />
                </div>
              </div>
            </div>

            {/* Video Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 rounded-b-lg">
              <h3 className="text-white font-semibold text-sm line-clamp-2">
                {video.name}
              </h3>
            </div>
          </div>
        ))}
      </Slider>

      {/* Video Modal */}
      {selectedVideo && (
        <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
          <DialogContent className="max-w-4xl w-full bg-black/95 backdrop-blur-lg border border-white/10">
            <DialogHeader>
              <DialogTitle className="text-white text-xl font-bold flex items-center gap-3">
                <Play className="w-6 h-6 text-red-500" />
                {selectedVideo.name}
              </DialogTitle>
            </DialogHeader>

            <div className="relative w-full aspect-video rounded-lg overflow-hidden">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${selectedVideo.key}?autoplay=1&rel=0`}
                title={selectedVideo.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <DialogClose asChild>
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                Close Video
              </Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}
