"use client";

import React, { memo, useState, useCallback, useMemo, lazy } from "react";
import Image from "next/image";
import { Play, Plus, Info, Loader2} from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
// TODO: Framer Motion animation removed
// import { motion, AnimatePresence } from "motion/react";
import { addToList, removeFromList } from "@/store/slices/myListSlice";
import type { RootState, MyListItem } from "@/types";
const NoImageFallback = lazy(() => {
  return import("@/app/Components/NoImageFallback/NoImageFallback");
});
const CardModal = lazy(() => {
  return import("./CardModal");
});
import {
  LazyGenreBadges,
  LazyRatingBadge,
  LazyLanguageFlag,
} from "./LazyComponents";

/**
 * ============================================================================
 * Card Component - Unified Card for Movies and TV Shows
 * ============================================================================
 *
 * Features:
 * - React.memo for preventing unnecessary re-renders
 * - Lazy-loaded internal components (GenreBadges, RatingBadge, LanguageFlag)
 * - Hover effects with scale, shadow, overlay, and action buttons
 * - Modal popup for detailed view
 * - Responsive design with Tailwind CSS
 * - Accessibility: keyboard navigation, ARIA labels, semantic HTML
 *
 * Usage:
 * ```tsx
 * <Card {...movieData} />
 * <Card {...tvData} />
 * ```
 *
 * @param {CardProps} props - Card properties
 * @returns {JSX.Element} Rendered Card component
 */

export interface CardProps {
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
  /** Optional click handler */
  onClick?: () => void;
}

/**
 * Memoized Card component to prevent unnecessary re-renders
 * Uses deep comparison for props to optimize performance
 */
const Card: React.FC<CardProps> = memo(
  ({
    id,
    type,
    title,
    posterUrl,
    releaseDate,
    firstAirDate,
    rating,
    genres,
    language,
    overview,
    onClick,
  }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const myList = useSelector((state: RootState) => state.myList);

    // Memoized check if item is in list
    const isInList = useMemo(
      () => myList.some((item) => item.id === id),
      [myList, id]
    );

    const [isOpen, setIsOpen] = useState(false);
    const [addingToList, setAddingToList] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Memoized handlers to prevent re-creation on each render
    const handleOpen = useCallback(() => {
      onClick?.();
      setIsOpen(true);
    }, [onClick]);

    const handlePlay = useCallback(
      (e?: React.MouseEvent) => {
        e?.stopPropagation();
        router.push(type === "movie" ? `/movies/${id}` : `/tv/${id}`);
      },
      [router, type, id]
    );

    const handleAddToList = useCallback(
      async (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setAddingToList(true);
        // Simulate async operation
        await new Promise((r) => setTimeout(r, 300));

        if (isInList) {
          dispatch(removeFromList(id));
        } else {
          const item: MyListItem =
            type === "movie"
              ? ({
                  id,
                  title,
                  original_title: title,
                  release_date: releaseDate || "",
                  overview: overview || "",
                  poster_path: posterUrl,
                  media_type: "movie",
                  popularity: 0,
                  vote_average: rating,
                  vote_count: 0,
                  adult: false,
                  video: false,
                  genre_ids: [],
                  original_language: language || "en",
                } as unknown as MyListItem)
              : ({
                  id,
                  name: title,
                  original_name: title,
                  first_air_date: firstAirDate || "",
                  origin_country: [],
                  overview: overview || "",
                  poster_path: posterUrl,
                  media_type: "tv",
                  popularity: 0,
                  vote_average: rating,
                  vote_count: 0,
                  adult: false,
                  original_language: language || "en",
                  genre_ids: [],
                } as unknown as MyListItem);
          dispatch(addToList(item));
        }
        setAddingToList(false);
      },
      [dispatch, id, isInList, type, title, releaseDate, firstAirDate, overview, posterUrl, rating, language]
    );

    const handleMoreInfo = useCallback(
      (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setIsOpen(true);
      },
      []
    );

    // Memoized computed values
    const displayDate = useMemo(
      () => releaseDate || firstAirDate || "",
      [releaseDate, firstAirDate]
    );
    const year = useMemo(
      () => (displayDate ? new Date(displayDate).getFullYear() : null),
      [displayDate]
    );

    return (
      <>
        {/* TODO: Framer Motion animation removed - replaced motion.div with plain div */}
        <div
          onClick={handleOpen}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          // TODO: Framer Motion animation removed - initial, animate, whileHover props removed
          // initial={{ opacity: 0, scale: 0.95 }}
          // animate={{ opacity: 1, scale: 1 }}
          // whileHover={{ scale: 1.03, zIndex: 10 }}
          // transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative bg-zinc-900 rounded-lg overflow-hidden cursor-pointer group shadow-lg hover:shadow-2xl hover:shadow-red-900/20 transition-all duration-300"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleOpen();
            }
          }}
          aria-label={`View details for ${title}`}
        >
          {/* Poster Image with lazy loading */}
          <div className="relative aspect-[2/3] w-full overflow-hidden">
            {posterUrl ? (
              <Image
                src={posterUrl}
                alt={title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                quality={80}
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                placeholder="blur"
                blurDataURL="/Netflix_Symbol_RGB.png"
                priority={false}
                loading="lazy"
              />
            ) : (
              <NoImageFallback text="No Image Available" />
            )}
          </div>

          {/* Hover Overlay with Action Buttons */}
          {/* TODO: Framer Motion animation removed - AnimatePresence removed */}
          {isHovered && (
            <div
              // TODO: Framer Motion animation removed - initial, animate, exit props removed
              // initial={{ opacity: 0 }}
              // animate={{ opacity: 1 }}
              // exit={{ opacity: 0 }}
              // transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/40 flex flex-col justify-end p-3"
            >
              <div className="space-y-2">
                {/* Title */}
                <h3 className="text-sm font-bold leading-tight line-clamp-2 text-white">
                  {title}
                </h3>

                {/* Meta Info: Year, Rating, Language */}
                <div className="flex items-center gap-2 text-xs text-gray-300 flex-wrap">
                  {year && <span>{year}</span>}
                  <LazyRatingBadge rating={rating} size="sm" />
                  <LazyLanguageFlag language={language || ""} />
                </div>

                {/* Genre Badges - Lazy loaded */}
                <LazyGenreBadges genres={genres} maxDisplay={2} />

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-1">
                  {/* TODO: Framer Motion animation removed - replaced motion.button with plain button */}
                  <button
                    onClick={(e) => handlePlay(e)}
                    aria-label="Play"
                    // TODO: Framer Motion animation removed - whileHover, whileTap props removed
                    // whileHover={{ scale: 1.1 }}
                    // whileTap={{ scale: 0.95 }}
                    className="bg-white/20 backdrop-blur-sm text-white rounded-full p-2 hover:bg-white/30 transition-colors border border-white/30 hover:scale-110 active:scale-95"
                  >
                    <Play size={18} fill="currentColor" />
                  </button>
                  <button
                    onClick={(e) => handleAddToList(e)}
                    disabled={addingToList}
                    aria-label={isInList ? "Remove from My List" : "Add to My List"}
                    // TODO: Framer Motion animation removed - whileHover, whileTap props removed
                    // whileHover={{ scale: 1.1 }}
                    // whileTap={{ scale: 0.95 }}
                    className="border-2 border-white/50 text-white rounded-full p-2 hover:border-white/80 transition-colors disabled:opacity-50 backdrop-blur-sm bg-black/20 hover:scale-110 active:scale-95"
                  >
                    {addingToList ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <Plus
                        size={18}
                        className={isInList ? "rotate-45 transition-transform" : ""}
                      />
                    )}
                  </button>
                  <button
                    onClick={(e) => handleMoreInfo(e)}
                    aria-label="More info"
                    // TODO: Framer Motion animation removed - whileHover, whileTap props removed
                    // whileHover={{ scale: 1.1 }}
                    // whileTap={{ scale: 0.95 }}
                    className="border-2 border-white/50 text-white rounded-full p-2 hover:border-white/80 transition-colors backdrop-blur-sm bg-black/20 hover:scale-110 active:scale-95"
                  >
                    <Info size={18} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Popup - Lazy loaded content inside */}
        <CardModal
          open={isOpen}
          onOpenChange={setIsOpen}
          data={{
            id,
            type,
            title,
            posterUrl,
            releaseDate,
            firstAirDate,
            rating,
            genres,
            language,
            overview,
          }}
          onPlay={handlePlay}
          onAddToList={handleAddToList}
          isInList={isInList}
          addingToList={addingToList}
        />
      </>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison function for React.memo
    // Only re-render if essential props change
    return (
      prevProps.id === nextProps.id &&
      prevProps.title === nextProps.title &&
      prevProps.posterUrl === nextProps.posterUrl &&
      prevProps.rating === nextProps.rating &&
      prevProps.type === nextProps.type &&
      prevProps.releaseDate === nextProps.releaseDate &&
      prevProps.firstAirDate === nextProps.firstAirDate &&
      prevProps.language === nextProps.language &&
      JSON.stringify(prevProps.genres) === JSON.stringify(nextProps.genres)
    );
  }
);

Card.displayName = "Card";

export default Card;
