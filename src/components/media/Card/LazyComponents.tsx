"use client";

import React, { lazy, Suspense, memo } from "react";
import { Star, Loader2 } from "lucide-react";
import { motion } from "motion/react";

/**
 * Lazy-loaded internal components for Card and CardModal
 * These components are code-split to reduce initial bundle size
 */

// ============== Loading Fallbacks ==============

const GenreBadgesFallback = () => (
  <div className="flex flex-wrap gap-1">
    {[1, 2].map((i) => (
      <div
        key={i}
        className="px-2 py-1 rounded-full text-xs bg-zinc-800 animate-pulse w-16 h-6"
      />
    ))}
  </div>
);

const RatingBadgeFallback = () => (
  <div className="w-12 h-6 bg-zinc-800 rounded animate-pulse" />
);

const LanguageFlagFallback = () => (
  <div className="w-10 h-5 bg-zinc-800 rounded animate-pulse" />
);

const ModalContentFallback = () => (
  <div className="flex-1 p-6 space-y-4">
    <div className="h-8 bg-zinc-800 rounded w-3/4 animate-pulse" />
    <div className="h-4 bg-zinc-800 rounded w-1/2 animate-pulse" />
    <div className="space-y-2">
      <div className="h-3 bg-zinc-800 rounded animate-pulse" />
      <div className="h-3 bg-zinc-800 rounded w-5/6 animate-pulse" />
      <div className="h-3 bg-zinc-800 rounded w-4/6 animate-pulse" />
    </div>
  </div>
);

// ============== Genre Badges Component ==============

interface GenreBadgesProps {
  genres: string[];
  maxDisplay?: number;
  delay?: number;
}

const GenreBadgesImpl: React.FC<GenreBadgesProps> = memo(
  ({ genres, maxDisplay = 2, delay = 0 }) => {
    if (!genres || genres.length === 0) return null;

    const displayGenres = genres.slice(0, maxDisplay);
    const remaining = genres.length - maxDisplay;

    return (
      <div className="flex flex-wrap gap-1">
        {displayGenres.map((genre, index) => (
          <motion.span
            key={`${genre}-${index}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: delay + index * 0.05 }}
            className="px-2 py-1 rounded-full text-xs font-medium bg-red-600/80 text-white border border-red-500/50"
          >
            {genre}
          </motion.span>
        ))}
        {remaining > 0 && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: delay + displayGenres.length * 0.05 }}
            className="px-2 py-1 rounded-full text-xs font-medium bg-zinc-700/80 text-gray-300"
          >
            +{remaining}
          </motion.span>
        )}
      </div>
    );
  }
);

GenreBadgesImpl.displayName = "GenreBadgesImpl";

export const LazyGenreBadges: React.FC<GenreBadgesProps> = (props) => (
  <Suspense fallback={<GenreBadgesFallback />}>
    <GenreBadgesImpl {...props} />
  </Suspense>
);

// ============== Rating Badge Component ==============

interface RatingBadgeProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
}

const RatingBadgeImpl: React.FC<RatingBadgeProps> = memo(
  ({ rating, size = "sm", showValue = true }) => {
    if (typeof rating !== "number" || rating <= 0) return null;

    const normalizedRating = Math.min(Math.max(rating, 0), 10);
    const percentage = (normalizedRating / 10) * 100;

    const sizeClasses = {
      sm: { container: "w-8 h-8", circle: "w-8 h-8", text: "text-xs", star: 10 },
      md: { container: "w-10 h-10", circle: "w-10 h-10", text: "text-sm", star: 12 },
      lg: { container: "w-12 h-12", circle: "w-12 h-12", text: "text-base", star: 14 },
    };

    const sizes = sizeClasses[size];

    return (
      <div
        className={`inline-flex items-center gap-2 ${sizes.text} text-gray-300`}
        title={`Rating: ${rating.toFixed(1)}/10`}
      >
        <div className={`relative ${sizes.container} flex-shrink-0`}>
          <svg className={`${sizes.circle} transform -rotate-90`}>
            <circle
              cx="50%"
              cy="50%"
              r="36%"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-zinc-700"
            />
            <circle
              cx="50%"
              cy="50%"
              r="36%"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${(percentage / 100) * 100.53} 100.53`}
              className="text-yellow-400 transition-all duration-500"
            />
          </svg>
          <Star
            size={sizes.star}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-400 fill-yellow-400"
          />
        </div>
        {showValue && <span className="font-semibold">{rating.toFixed(1)}</span>}
      </div>
    );
  }
);

RatingBadgeImpl.displayName = "RatingBadgeImpl";

export const LazyRatingBadge: React.FC<RatingBadgeProps> = (props) => (
  <Suspense fallback={<RatingBadgeFallback />}>
    <RatingBadgeImpl {...props} />
  </Suspense>
);

// ============== Language Flag Component ==============

interface LanguageFlagProps {
  language: string;
  showFull?: boolean;
}

const LanguageFlagImpl: React.FC<LanguageFlagProps> = memo(({ language, showFull = false }) => {
  if (!language) return null;

  const langCode = language.toUpperCase();

  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs text-gray-300 bg-black/40 border border-gray-600/30 ${
        showFull ? "px-2 py-1" : ""
      }`}
      title={`Language: ${language}`}
    >
      {langCode}
    </span>
  );
});

LanguageFlagImpl.displayName = "LanguageFlagImpl";

export const LazyLanguageFlag: React.FC<LanguageFlagProps> = (props) => (
  <Suspense fallback={<LanguageFlagFallback />}>
    <LanguageFlagImpl {...props} />
  </Suspense>
);

// ============== Action Buttons Component ==============

interface ActionButtonsProps {
  onPlay: (e: React.MouseEvent) => void;
  onAddToList: (e: React.MouseEvent) => void;
  onMoreInfo: (e: React.MouseEvent) => void;
  isInList: boolean;
  addingToList: boolean;
  disabled?: boolean;
}

const ActionButtonsImpl: React.FC<ActionButtonsProps> = memo(
  ({ onPlay, onAddToList, onMoreInfo, isInList, addingToList, disabled = false }) => {
    return (
      <div className="flex items-center gap-2 pt-1">
        <motion.button
          onClick={onPlay}
          aria-label="Play"
          disabled={disabled}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white/20 backdrop-blur-sm text-white rounded-full p-2 hover:bg-white/30 transition-colors border border-white/30 disabled:opacity-50"
        >
          <Star size={18} fill="currentColor" />
        </motion.button>
        <motion.button
          onClick={onAddToList}
          disabled={addingToList || disabled}
          aria-label={isInList ? "Remove from My List" : "Add to My List"}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="border-2 border-white/50 text-white rounded-full p-2 hover:border-white/80 transition-colors disabled:opacity-50 backdrop-blur-sm bg-black/20"
        >
          {addingToList ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Plus size={18} className={isInList ? "rotate-45 transition-transform" : ""} />
          )}
        </motion.button>
        <motion.button
          onClick={onMoreInfo}
          aria-label="More info"
          disabled={disabled}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="border-2 border-white/50 text-white rounded-full p-2 hover:border-white/80 transition-colors backdrop-blur-sm bg-black/20"
        >
          <Info size={18} />
        </motion.button>
      </div>
    );
  }
);

ActionButtonsImpl.displayName = "ActionButtonsImpl";

// Need to import these icons for ActionButtonsImpl
import { Plus, Info } from "lucide-react";

export const LazyActionButtons: React.FC<ActionButtonsProps> = (props) => (
  <Suspense fallback={<div className="flex gap-2 h-8" />}>
    <ActionButtonsImpl {...props} />
  </Suspense>
);

// ============== Modal Overview Component ==============

interface ModalOverviewProps {
  overview: string;
  title?: string;
}

const ModalOverviewImpl: React.FC<ModalOverviewProps> = memo(({ overview, title = "Overview" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="mb-6"
    >
      <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
        {title}
      </h2>
      <p className="text-gray-300 text-sm md:text-base leading-relaxed">{overview}</p>
    </motion.div>
  );
});

ModalOverviewImpl.displayName = "ModalOverviewImpl";

export const LazyModalOverview: React.FC<ModalOverviewProps> = (props) => (
  <Suspense fallback={<div className="h-20 bg-zinc-800/50 rounded animate-pulse mb-6" />}>
    <ModalOverviewImpl {...props} />
  </Suspense>
);

// ============== Modal Meta Info Component ==============

interface ModalMetaInfoProps {
  year?: number | null;
  rating?: number;
  language?: string;
}

const ModalMetaInfoImpl: React.FC<ModalMetaInfoProps> = memo(({ year, rating, language }) => {
  const hasAnyInfo = year || (typeof rating === "number" && rating > 0) || language;
  if (!hasAnyInfo) return null;

  return (
    <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
      {typeof rating === "number" && rating > 0 && (
        <LazyRatingBadge rating={rating} size="md" />
      )}
      {year && (
        <span className="text-gray-300 flex items-center gap-1">
          <span className="w-1 h-1 bg-gray-500 rounded-full" />
          {year}
        </span>
      )}
      {language && (
        <span className="text-gray-300 flex items-center gap-1">
          <span className="w-1 h-1 bg-gray-500 rounded-full" />
          {language.toUpperCase()}
        </span>
      )}
    </div>
  );
});

ModalMetaInfoImpl.displayName = "ModalMetaInfoImpl";

export const LazyModalMetaInfo: React.FC<ModalMetaInfoProps> = (props) => (
  <Suspense fallback={<div className="h-8 bg-zinc-800 rounded animate-pulse mb-4" />}>
    <ModalMetaInfoImpl {...props} />
  </Suspense>
);

// ============== YouTube Trailer Component (Lazy) ==============

interface YouTubeTrailerProps {
  videoKey: string;
  onClose: () => void;
}

const YouTubeTrailerImpl: React.FC<YouTubeTrailerProps> = ({ videoKey, onClose }) => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/95 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Video trailer"
    >
      <div className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-4 right-4 z-10 bg-black/60 backdrop-blur-sm text-white rounded-full p-2 hover:bg-black/80 transition-colors"
          aria-label="Close trailer"
        >
          <X size={20} />
        </motion.button>

        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
            <Loader2 size={40} className="animate-spin text-red-600" />
          </div>
        )}

        <iframe
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0&modestbranding=1`}
          title="Trailer"
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setIsLoaded(true)}
        />
      </div>
    </motion.div>
  );
};

YouTubeTrailerImpl.displayName = "YouTubeTrailerImpl";

import { X } from "lucide-react";

export const LazyYouTubeTrailer: React.FC<YouTubeTrailerProps> = (props) => (
  <Suspense
    fallback={
      <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/95">
        <Loader2 size={40} className="animate-spin text-red-600" />
      </div>
    }
  >
    <YouTubeTrailerImpl {...props} />
  </Suspense>
);
