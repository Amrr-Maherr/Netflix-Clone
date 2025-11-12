"use client";

import React from "react";

interface NoImageFallbackProps {
  className?: string;
  text?: string;
}

export default function NoImageFallback({
  className = "absolute inset-0 w-full h-full bg-gray-800 flex items-center justify-center rounded-lg",
  text = "No Image Found",
}: NoImageFallbackProps) {
  return (
    <div className={className}>
      <span className="text-white text-sm text-center px-2">{text}</span>
    </div>
  );
}
