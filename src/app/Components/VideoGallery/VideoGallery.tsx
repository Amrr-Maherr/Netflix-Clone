"use client";

import React, { useState } from "react";
import { Play, Volume2, VolumeX, Maximize2 } from "lucide-react";
import Image from "next/image";

interface Video {
  id: string;
  iso_639_1?: string;
  iso_3166_1?: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}

interface VideoGalleryProps {
  videos: Video[];
  className?: string;
}

export default function VideoGallery({ videos, className = "" }: VideoGalleryProps) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Filter for trailers and teasers
  const filteredVideos = videos?.filter(
    (video) => video.type === "Trailer" || video.type === "Teaser"
  ) || [];

  if (!filteredVideos.length) return null;

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
  };

  const getThumbnailUrl = (key: string) => {
    return `https://img.youtube.com/vi/${key}/mqdefault.jpg`;
  };

  const getVideoUrl = (key: string) => {
    return `https://www.youtube.com/embed/${key}?autoplay=1&mute=${isMuted ? 1 : 0}`;
  };

  return (
    <section className={`mb-8 ${className}`}>
      <h2 className="text-2xl font-bold mb-6">Trailers & Clips</h2>
      
      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-10 bg-black/60 backdrop-blur-sm text-white rounded-full p-2 hover:bg-black/80 transition-colors"
            >
              ×
            </button>
            
            <iframe
              src={getVideoUrl(selectedVideo.key)}
              title={selectedVideo.name}
              className="w-full h-full"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
            
            {/* Video Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
              <h3 className="text-white text-lg font-semibold">{selectedVideo.name}</h3>
              <p className="text-gray-300 text-sm">
                {selectedVideo.type} • {new Date(selectedVideo.published_at).getFullYear()}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Video Thumbnails Carousel */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            onClick={() => handleVideoSelect(video)}
            className="relative aspect-video bg-zinc-900 rounded-lg overflow-hidden cursor-pointer group transition-all duration-300 hover:scale-105 hover:z-10"
          >
            {/* Thumbnail */}
            <Image
              src={getThumbnailUrl(video.key)}
              alt={video.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
            />
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="bg-white/90 rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                <Play size={20} className="text-black fill-current ml-1" />
              </div>
            </div>
            
            {/* Video Type Badge */}
            <div className="absolute top-2 left-2">
              <span className="px-2 py-1 bg-red-600 text-white text-xs font-medium rounded">
                {video.type}
              </span>
            </div>
            
            {/* Duration/Size Info */}
            <div className="absolute bottom-2 right-2">
              <span className="px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-xs rounded">
                {video.site}
              </span>
            </div>
            
            {/* Video Title */}
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
              <p className="text-white text-xs font-medium line-clamp-2">
                {video.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
