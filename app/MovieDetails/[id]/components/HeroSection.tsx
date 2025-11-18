"use client";
import Image from "next/image";
import { useState } from "react";
import {
  Star,
  Clock,
  Calendar,
  Globe,
  Play,
  ExternalLink,
  Volume2,
  VolumeX,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  movie?: any;
  tv?: any;
  backdropUrl: string | null;
  posterUrl: string;
  trailer: any;
}

export default function HeroSection({
  movie,
  tv,
  backdropUrl,
  posterUrl,
  trailer,
}: HeroSectionProps) {
  const data = movie || tv;
  const trailerKey = trailer?.key;
  const title = data.title || data.name;
  const tagline = data.tagline;
  const date = data.release_date || data.first_air_date;
  const runtime =
    data.runtime ||
    (Array.isArray(data.episode_run_time) ? data.episode_run_time[0] : null);

  const [isMute, setIsMute] = useState(1); // 1 = muted, 0 = unmuted
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="relative flex items-end md:items-center justify-start w-full h-dvh bg-black overflow-hidden">
      {/* Background Video / Image */}
      {backdropUrl ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backdropUrl})` }}
        ></div>
      ) : (
        trailerKey && (
          <div className="absolute inset-0 w-full h-full">
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=${isMute}&loop=1&playlist=${trailerKey}&controls=0&modestbranding=1&showinfo=0`}
              title="Trailer"
              className="absolute inset-0 w-full h-full object-cover"
              allow="autoplay; fullscreen"
            ></iframe>
          </div>
        )
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>

      {/* Content */}
      <div className="z-40 container py-10">
        <div className="flex flex-col md:flex-row gap-8 items-end">
          {/* Poster */}
          {/* <div className="relative w-48 h-72 md:w-64 md:h-96 shadow-2xl rounded-lg overflow-hidden border border-gray-700 transform transition hidden md:block">
            <Image src={posterUrl} alt={title} fill className="object-cover" />
          </div> */}

          {/* Info */}
          <div className="flex-1 text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-2 drop-shadow-lg">
              {title}
            </h1>
            {tagline && (
              <p className="text-lg md:text-xl text-gray-300 mb-4 italic drop-shadow">
                {tagline}
              </p>
            )}

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-4 text-sm md:text-base mb-4">
              {data.vote_average && (
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span>
                    {data.vote_average.toFixed(1)} ({data.vote_count} votes)
                  </span>
                </div>
              )}
              {date && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-5 h-5" />
                  <span>{new Date(date).toLocaleDateString()}</span>
                </div>
              )}
              {runtime && (
                <div className="flex items-center gap-1">
                  <Clock className="w-5 h-5" />
                  <span>{runtime} min</span>
                </div>
              )}
              {data.spoken_languages?.length > 0 && (
                <div className="flex items-center gap-1">
                  <Globe className="w-5 h-5" />
                  <span>{data.spoken_languages[0]?.name ?? "Unknown"}</span>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="mt-4 flex gap-3">
              {trailerKey && (
                <Button
                  className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white p-3 md:px-6 md:py-3 rounded-lg font-semibold text-sm md:text-base transition transform hover:scale-105"
                  onClick={() => setIsDialogOpen(true)}
                >
                  <Play className="w-5 h-5" />
                  Watch Trailer
                </Button>
              )}
              {data.homepage && (
                <Button className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white p-3 md:px-6 md:py-3 rounded-lg font-semibold text-sm md:text-base transition transform hover:scale-105">
                  <a
                    href={data.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Official Site
                  </a>
                </Button>
              )}
              {/* {trailerKey && (
                <button
                  onClick={() => setIsMute(isMute === 1 ? 0 : 1)}
                  className="z-999 cursor-pointer bg-black/50 border border-white text-white p-2 rounded-full hover:bg-black/70 transition flex items-center justify-center"
                >
                  {isMute ? (
                    <VolumeX className="w-4 h-4 cursor-pointer" />
                  ) : (
                    <Volume2 className="w-4 h-4 cursor-pointer" />
                  )}
                </button>
              )} */}
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Dialog */}
      {trailerKey && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent
            data-slot="dialog-content"
            className={cn(
              "bg-black data-[state=open]:animate-in data-[state=closed]:animate-out " +
                "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 " +
                "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 " +
                "fixed top-[50%] left-[50%] z-50 grid w-full max-w-[90%] " +
                "translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg p-6 shadow-lg duration-200 border-0"
            )}
          >
            <DialogHeader>
              <DialogTitle className="text-white text-lg md:text-xl">
                {title} - Trailer
              </DialogTitle>
            </DialogHeader>

            <div className="relative w-full aspect-video rounded-md overflow-hidden shadow-2xl">
              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=${isMute}`}
                title="Trailer"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <DialogClose asChild>
              <Button className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white">
                Close
              </Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
