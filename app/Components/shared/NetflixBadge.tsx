"use client";

import Image from "next/image";

interface NetflixBadgeProps {
  size?: number;
  className?: string;
  priority?: boolean;
  alt?: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  zIndex?: string;
}

export default function NetflixBadge({ 
  size = 40,
  className = "",
  priority = true,
  alt = "Netflix Logo",
  top = "top-3",
  left = "left-3",
  right,
  bottom,
  zIndex = "z-50"
}: NetflixBadgeProps) {
  return (
    <div 
      className={`absolute ${top} ${left} ${right || ""} ${bottom || ""} ${zIndex} ${className}`}
    >
      <Image
        width={size}
        height={size}
        src="/Netflix_Symbol_RGB.png"
        alt={alt}
        priority={priority}
        className="drop-shadow-md"
      />
    </div>
  );
}
