"use client";
import Image from "next/image";

export default function NetflixIntroLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-9999">
      <div className="relative">
        <div className="animate-netflix-zoom">
          <Image
            src="/Netflix_Symbol_RGB.png"
            alt="Netflix Intro"
            width={300}
            height={300}
            priority
            quality={100}
            className="w-48 sm:w-64 md:w-80 object-contain mx-auto select-none pointer-events-none animate-pulse"
          />
        </div>
        {/* <div className="absolute inset-0 bg-red-700 blur-3xl opacity-30 animate-pulse rounded-full"></div> */}
      </div>
    </div>
  );
}
