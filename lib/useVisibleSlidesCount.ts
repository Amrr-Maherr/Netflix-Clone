import { useWindowWidth } from '@react-hook/window-size';

/**
 * Custom hook that returns the number of visible slides based on screen width
 * @returns number - The count of visible slides that should be displayed in the slider
 */
export const useVisibleSlidesCount = (): number => {
  const onlyWidth = useWindowWidth();

  if (onlyWidth >= 2560) {
    return 7; // 4K Ultra HD
  } else if (onlyWidth >= 1920) {
    return 6; // Desktop large
  } else if (onlyWidth >= 1440) {
    return 5; // Desktop medium
  } else if (onlyWidth >= 1280) {
    return 4; // Desktop small / Laptop
  } else if (onlyWidth >= 1024) {
    return 3; // Tablet landscape
  } else if (onlyWidth >= 768) {
    return 2.5; // Tablet portrait (2 full + half next)
  } else if (onlyWidth >= 480) {
    return 2; // Large mobile
  } else if (onlyWidth >= 360) {
    return 1.5; // Mobile standard (1 full + half next)
  } else {
    return 1; // Extra small mobile
  }
};