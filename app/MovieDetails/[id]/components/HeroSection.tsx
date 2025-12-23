"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Star,
  Clock,
  Calendar,
  Globe,
  Play,
  ExternalLink,
  Volume2,
  VolumeX,
  Plus,
  Check,
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
import { useSelector, useDispatch } from "react-redux";
import { addToList, removeFromList } from "@/Store/myListSlice";
import toast from "react-hot-toast";

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
  const [isMobile, setIsMobile] = useState(false);

  const myList = useSelector((state: any) => state.myList);
  const dispatch = useDispatch();

  const isInList = myList.some((item: any) => item.id === data.id);

  const handleAddToList = () => {
    if (isInList) {
      dispatch(removeFromList(data.id));
      toast.success("Removed from your list!");
    } else {
      const item = {
        ...data,
        media_type: movie ? "movie" : "tv",
      };
      dispatch(addToList(item));
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

  const backgroundImage = isMobile ? posterUrl : backdropUrl || posterUrl;

  return (
    <div className="relative flex items-end md:items-center justify-start w-full h-dvh bg-black overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={backgroundImage}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/10  md:via-black/20 to-transparent z-10"></div>

      {/* Content */}
      <div className="z-40 container py-10">
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
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span>{data.vote_average.toFixed(1)}</span>
              </div>
            )}
            {date && (
              <span>{new Date(date).getFullYear()}</span>
            )}
            {runtime && (
              <span>{runtime} min</span>
            )}
            {data.genres?.length > 0 && (
              <span className="bg-black/50 px-2 py-1 rounded">
                {data.genres[0].name}
              </span>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 flex-wrap">
            {trailerKey && (
              <Button
                className="inline-flex items-center gap-3 bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-lg font-bold text-lg transition transform hover:scale-105"
                onClick={() => setIsDialogOpen(true)}
              >
                <Play className="w-6 h-6 fill-current" />
                Play Trailer
              </Button>
            )}
            <Button
              className={`inline-flex items-center gap-3 bg-gray-500/70 text-white hover:bg-gray-500/90 px-8 py-4 rounded-lg font-bold text-lg transition transform hover:scale-105`}
              onClick={handleAddToList}
            >
              {isInList ? <Check className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
              {isInList ? "My List" : "My List"}
            </Button>
          </div>
        </div>
      </div>

      {/* Trailer Dialog */}
      {trailerKey && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent
            data-slot="dialog-content"
            className={cn(
              "bg-black/95 data-[state=open]:animate-in data-[state=closed]:animate-out " +
                "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 " +
                "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 " +
                "fixed top-[50%] left-[50%] z-50 grid w-full sm:max-w-2xl " +
                "translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg p-6 shadow-lg duration-200 border-0 mt-5"
            )}
          >
            <DialogHeader>
              <DialogTitle className="text-white text-xl font-bold">
                {title} - Trailer
              </DialogTitle>
            </DialogHeader>

            <div className="relative w-full h-[70dvh] rounded-md overflow-hidden shadow-2xl">
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
