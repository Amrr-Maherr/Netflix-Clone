"use client";
import { useState } from "react";
import DynamicSlider from "./Components/PosterSlider/DynamicSlider";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer/page";
import VideoBackground from "./Components/Section/VideoBackground";
import HeadingSection from "./Components/HeadingSection";

const videoSource =
  "/Assets/Netflix Intro 1080p (Highest Quality)(1080P_HD).mp4";

export default function Home() {
  return (
    <>
      <Navbar />
      <VideoBackground src={videoSource}>
        <HeadingSection
          title="Unlimited Streaming"
          description="Movies, TV shows, and more. Watch anytime, anywhere."
          buttonText="Start Free Trial"
        />
      </VideoBackground>
      <Footer />
    </>
  );
}
