import React from "react";
import Navbar from "../Components/Navbar";
import VideoBackground from "../Components/Section/VideoBackground";
import Footer from "../Components/Footer/page";

const videoSource = "/Assets/Netflix Intro 1080p (Highest Quality)(1080P_HD).mp4";


export default function Movies() {
  return (
    <>
    <Navbar/>
    <VideoBackground/>
    <Footer/>
    </>
  );
}
