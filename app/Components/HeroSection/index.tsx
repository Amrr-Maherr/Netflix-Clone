"use client";

import { Button } from "@/components/ui/button";
import SplitText from "../Animations/SplitText";

export default function Index() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/Videos/NetflixLogo.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full bg-black/50 text-center text-white px-4">
        <SplitText
          text="Unlimited movies, TV shows, and more."
          className="text-3xl md:text-5xl font-bold mb-4"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
        />

        <p className="text-lg md:text-2xl font-medium mb-8">
          Watch anywhere. Cancel anytime.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button className="cursor-pointer bg-red-600 hover:bg-red-700 text-white text-base md:text-lg px-8 py-6 rounded-lg transition-all duration-200">
            Get Started
          </Button>
          <Button
            variant="outline"
            className="bg-white cursor-pointer hover:bg-gray-100 text-black text-base md:text-lg px-8 py-6 rounded-lg border-none transition-all duration-200"
          >
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
}
