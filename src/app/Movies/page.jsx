"use client";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer/page";
import VideoBackground from "../Components/Section/VideoBackground";
import HeadingSection from "../Components/HeadingSection";


const videoSource =
  "/Assets/Netflix Intro 1080p (Highest Quality)(1080P_HD).mp4";

export default function Movies() {
  return (
    <>
      <Navbar />
      <VideoBackground src={videoSource}>
        <HeadingSection
          title="Top Movies & TV Shows"
          description="Discover your next favorite movie or show."
          buttonText="Start Watching"
        />
      </VideoBackground>
      <Footer />
    </>
  );
}
