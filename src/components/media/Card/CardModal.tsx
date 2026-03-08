"use client";

import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";
import { Play, Plus, Loader2, X } from "lucide-react";
// TODO: Framer Motion animation removed
// import { motion, AnimatePresence } from "motion/react";
import {
  LazyRatingBadge,
  LazyModalMetaInfo,
  LazyModalOverview,
  LazyGenreBadges,
  LazyYouTubeTrailer,
} from "./LazyComponents";

/**
 * ============================================================================
 * CardModal Component - Lazy-loaded Modal for Movie/TV Show Details
 * ============================================================================
 *
 * Features:
 * - React.lazy + Suspense for code-splitting modal content
 * - Responsive design (mobile & desktop)
 * - Smooth animations (fade, scale)
 * - YouTube trailer support with lazy loading
 * - Focus trap (handled by Radix UI Dialog)
 * - Keyboard accessibility (ESC to close, tab navigation)
 * - Conditional rendering based on available data
 *
 * Usage:
 * ```tsx
 * <CardModal
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   data={cardData}
 *   onPlay={handlePlay}
 *   onAddToList={handleAddToList}
 * />
 * ```
 */

/**
 * Modal data interface - matches CardProps for seamless integration
 */
export interface CardModalData {
  /** Unique identifier for the media item */
  id: number;
  /** Type of media: 'movie' or 'tv' */
  type: "movie" | "tv";
  /** Title of the media */
  title: string;
  /** URL of the poster image (can be null for fallback) */
  posterUrl: string | null;
  /** Release date for movies (YYYY-MM-DD format) */
  releaseDate?: string;
  /** First air date for TV shows (YYYY-MM-DD format) */
  firstAirDate?: string;
  /** Rating score (0-10 scale) */
  rating: number;
  /** Array of genre names */
  genres: string[];
  /** Original language code (e.g., 'en', 'es') */
  language?: string;
  /** Plot overview/description */
  overview?: string;
  /** YouTube video key for trailer (optional) */
  trailerKey?: string;
}

/**
 * Modal props interface
 */
interface CardModalProps {
  /** Whether the modal is open */
  open: boolean;
  /** Callback for open state change */
  onOpenChange: (v: boolean) => void;
  /** Data to display in the modal */
  data: CardModalData;
  /** Callback for play button click */
  onPlay?: () => void;
  /** Callback for add to list button click */
  onAddToList?: () => void;
  /** Whether the item is already in the list */
  isInList?: boolean;
  /** Whether the add to list operation is in progress */
  addingToList?: boolean;
}

/**
 * Loading fallback for modal content
 */
const ModalContentFallback: React.FC = () => (
  <div className="flex flex-col md:flex-row w-full h-full max-h-[85vh]">
    {/* Poster placeholder */}
    <div className="relative w-full md:w-2/5 h-48 md:h-auto bg-zinc-800 animate-pulse" />
    {/* Content placeholder */}
    <div className="w-full md:w-3/5 p-8 space-y-4">
      <div className="h-8 bg-zinc-800 rounded w-3/4 animate-pulse" />
      <div className="h-6 bg-zinc-800 rounded w-1/2 animate-pulse" />
      <div className="space-y-2">
        <div className="h-3 bg-zinc-800 rounded animate-pulse" />
        <div className="h-3 bg-zinc-800 rounded w-5/6 animate-pulse" />
        <div className="h-3 bg-zinc-800 rounded w-4/6 animate-pulse" />
      </div>
      <div className="flex gap-3 pt-4">
        <div className="h-10 bg-zinc-800 rounded flex-1 animate-pulse" />
        <div className="h-10 bg-zinc-800 rounded flex-1 animate-pulse" />
      </div>
    </div>
  </div>
);

/**
 * Main modal content component (lazy-loaded)
 */
const ModalContent: React.FC<{
  data: CardModalData;
  onPlay?: () => void;
  onAddToList?: () => void;
  isInList?: boolean;
  addingToList?: boolean;
  onOpenTrailer?: () => void;
}> = React.memo(
  ({ data, onPlay, onAddToList, isInList, addingToList, onOpenTrailer }) => {
    const displayDate = data.releaseDate || data.firstAirDate || "";
    const year = displayDate ? new Date(displayDate).getFullYear() : null;
    const hasTrailer = !!data.trailerKey;

    return (
      <div className="flex flex-col md:flex-row w-full h-full max-h-[85vh]">
        {/* Left Side - Poster Image */}
        {/* TODO: Framer Motion animation removed - replaced motion.div with plain div */}
        <div
          // TODO: Framer Motion animation removed - initial, animate props removed
          // initial={{ opacity: 0, x: -20 }}
          // animate={{ opacity: 1, x: 0 }}
          // transition={{ duration: 0.3, delay: 0.1 }}
          className="relative w-full md:w-2/5 h-48 md:h-auto md:flex-shrink-0"
        >
          {data.posterUrl ? (
            <>
              <Image
                src={data.posterUrl}
                alt={data.title}
                fill
                className="object-cover"
                quality={90}
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
              />
              {/* Gradient Overlay for seamless transition */}
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/50 to-transparent md:bg-gradient-to-t md:from-transparent md:via-transparent md:to-zinc-900" />
            </>
          ) : (
            <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
              <span className="text-gray-500 text-sm text-center px-4">
                No Poster Available
              </span>
            </div>
          )}

          {/* Type Badge */}
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 rounded-md text-xs font-bold bg-red-600 text-white uppercase tracking-wider shadow-lg">
              {data.type}
            </span>
          </div>
        </div>

        {/* Right Side - Content */}
        {/* TODO: Framer Motion animation removed - replaced motion.div with plain div */}
        <div
          // TODO: Framer Motion animation removed - initial, animate props removed
          // initial={{ opacity: 0, x: 20 }}
          // animate={{ opacity: 1, x: 0 }}
          // transition={{ duration: 0.3, delay: 0.2 }}
          className="w-full md:w-3/5 p-5 md:p-8 flex flex-col overflow-y-auto text-white scrollbar-thin scrollbar-thumb-zinc-700"
        >
          <div className="flex-1 min-h-0">
            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold mb-3 leading-tight">
              {data.title}
            </h1>

            {/* Meta Info Row - Lazy loaded */}
            <LazyModalMetaInfo year={year} rating={data.rating} language={data.language} />

            {/* Genre Badges - Lazy loaded */}
            {data.genres && data.genres.length > 0 && (
              <div className="mb-5 flex flex-wrap gap-2">
                <LazyGenreBadges genres={data.genres} maxDisplay={data.genres.length} delay={0.1} />
              </div>
            )}

            {/* Overview/Description - Lazy loaded */}
            {data.overview ? (
              <LazyModalOverview overview={data.overview} />
            ) : (
              <div className="mb-6 p-4 bg-zinc-800/50 rounded-lg border border-zinc-700">
                <p className="text-gray-500 text-sm italic">No overview available</p>
              </div>
            )}

            {/* Trailer Button (if available) */}
            {hasTrailer && (
              /* TODO: Framer Motion animation removed - replaced motion.div with plain div */
              <div
                // TODO: Framer Motion animation removed - initial, animate props removed
                // initial={{ opacity: 0, y: 10 }}
                // animate={{ opacity: 1, y: 0 }}
                // transition={{ duration: 0.3, delay: 0.3 }}
                className="mb-6"
              >
                {/* TODO: Framer Motion animation removed - replaced motion.button with plain button */}
                <button
                  onClick={onOpenTrailer}
                  // TODO: Framer Motion animation removed - whileHover, whileTap props removed
                  // whileHover={{ scale: 1.02 }}
                  // whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 rounded-lg text-white text-sm font-medium transition-all duration-200 hover:scale-102 active:scale-98"
                >
                  <span className="text-red-500">▶</span>
                  Watch Trailer
                </button>
              </div>
            )}
          </div>

          {/* Action Buttons - Sticky at bottom */}
          {/* TODO: Framer Motion animation removed - replaced motion.div with plain div */}
          <div
            // TODO: Framer Motion animation removed - initial, animate props removed
            // initial={{ opacity: 0, y: 20 }}
            // animate={{ opacity: 1, y: 0 }}
            // transition={{ duration: 0.3, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 mt-auto pt-5 border-t border-zinc-700"
          >
            {/* Add to List Button */}
            {onAddToList && (
              /* TODO: Framer Motion animation removed - replaced motion.button with plain button */
              <button
                onClick={onAddToList}
                disabled={addingToList}
                // TODO: Framer Motion animation removed - whileHover, whileTap props removed
                // whileHover={{ scale: 1.02 }}
                // whileTap={{ scale: 0.98 }}
                className="flex-1 bg-zinc-800/80 backdrop-blur-sm border border-zinc-600 hover:bg-zinc-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm hover:scale-102 active:scale-98"
              >
                {addingToList ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Plus
                    size={16}
                    className={isInList ? "rotate-45 transition-transform" : ""}
                  />
                )}
                <span>{isInList ? "In My List" : "Add to My List"}</span>
              </button>
            )}

            {/* Play Button */}
            {onPlay && (
              /* TODO: Framer Motion animation removed - replaced motion.button with plain button */
              <button
                onClick={onPlay}
                // TODO: Framer Motion animation removed - whileHover, whileTap props removed
                // whileHover={{ scale: 1.02 }}
                // whileTap={{ scale: 0.98 }}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 text-sm shadow-lg shadow-red-900/30 hover:scale-102 active:scale-98"
              >
                <Play size={16} fill="currentColor" />
                <span>{data.type === "movie" ? "Watch Movie" : "Watch Series"}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
);

ModalContent.displayName = "ModalContent";

/**
 * Create a lazy-loaded version of ModalContent
 * This enables code-splitting for the modal content
 */
const createLazyModalContent = () => {
  return lazy(async () => ({
    default: ModalContent,
  }));
};

/**
 * Main CardModal component
 */
export default function CardModal({
  open,
  onOpenChange,
  data,
  onPlay,
  onAddToList,
  isInList,
  addingToList,
}: CardModalProps) {
  const [showTrailer, setShowTrailer] = useState(false);
  const [LazyContent] = useState(() => createLazyModalContent());
  const modalContentRef = useRef<HTMLDivElement>(null);

  // Close trailer when modal closes
  useEffect(() => {
    if (!open) {
      setShowTrailer(false);
    }
  }, [open]);

  // Handle ESC key to close trailer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showTrailer) {
        setShowTrailer(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showTrailer]);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className="!max-w-4xl w-full !max-h-[90vh] !p-0 !overflow-hidden !rounded-lg scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent"
          showCloseButton={true}
        >
          <DialogTitle className="sr-only">{data.title}</DialogTitle>

          <div ref={modalContentRef} className="w-full h-full">
            {/* Lazy-loaded modal content with Suspense */}
            <Suspense fallback={<ModalContentFallback />}>
              <LazyContent
                data={data}
                onPlay={onPlay}
                onAddToList={onAddToList}
                isInList={isInList}
                addingToList={addingToList}
                onOpenTrailer={() => setShowTrailer(true)}
              />
            </Suspense>
          </div>
        </DialogContent>
      </Dialog>

      {/* YouTube Trailer Modal Overlay - Lazy loaded */}
      {/* TODO: Framer Motion animation removed - AnimatePresence removed */}
      {showTrailer && data.trailerKey && (
        <LazyYouTubeTrailer
          videoKey={data.trailerKey}
          onClose={() => setShowTrailer(false)}
        />
      )}
    </>
  );
}
