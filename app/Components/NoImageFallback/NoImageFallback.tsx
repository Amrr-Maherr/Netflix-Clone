"use client";

import Image from "next/image";
import React from "react";

interface NoImageFallbackProps {
  className?: string;
  text?: string;
}

export default function NoImageFallback({
  className = "absolute inset-0 w-full h-full bg-zinc-800 flex items-center justify-center rounded-lg",
  text = "No Image Found",
}: NoImageFallbackProps) {
  return (
    <div className={"flex items-center justify-center flex-col"}>
      <Image
        width={200}
        height={200}
        src="/Netflix_Symbol_RGB.png"
        alt="Netflix Logo"
        priority
        quality={100}
        placeholder="blur"
        blurDataURL="/Netflix_Symbol_RGB.png"
        className="drop-shadow-md"
      />
    </div>
  );
}
