/**
 * ============================================================================
 * Card Component Exports
 * ============================================================================
 *
 * Unified Card and Modal components for Movies and TV Shows
 * with performance optimizations (React.memo, React.lazy, Suspense)
 *
 * @example
 * ```tsx
 * // Basic usage
 * import { Card, CardModal, type CardProps } from '@/components/media/Card';
 *
 * // Movie card
 * <Card
 *   id={123}
 *   type="movie"
 *   title="The Matrix"
 *   posterUrl="/path/to/poster.jpg"
 *   releaseDate="1999-03-31"
 *   rating={8.7}
 *   genres={['Action', 'Sci-Fi']}
 *   language="en"
 *   overview="A computer hacker learns about the true nature of reality..."
 * />
 *
 * // TV Show card
 * <Card
 *   id={456}
 *   type="tv"
 *   title="Breaking Bad"
 *   posterUrl="/path/to/poster.jpg"
 *   firstAirDate="2008-01-20"
 *   rating={9.5}
 *   genres={['Crime', 'Drama', 'Thriller']}
 *   language="en"
 *   overview="A high school chemistry teacher turned methamphetamine producer..."
 * />
 * ```
 */

export { default as Card } from "./Card";
export { default as CardModal } from "./CardModal";
export type { CardProps } from "./Card";
export type { CardModalData } from "./CardModal";

// Lazy-loaded internal components (can be used independently)
export {
  LazyGenreBadges,
  LazyRatingBadge,
  LazyLanguageFlag,
  LazyActionButtons,
  LazyModalOverview,
  LazyModalMetaInfo,
  LazyYouTubeTrailer,
} from "./LazyComponents";
