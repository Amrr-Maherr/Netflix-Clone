// src/Components/VideoBackground.jsx
import React from "react";
function VideoBackground() {
    const videoSource =
      "/Assets/Netflix Intro 1080p (Highest Quality)(1080P_HD).mp4";
    
  return (
    <div className=" w-full h-screen  overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="min-w-full min-h-full w-auto h-auto object-cover"
      >
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default VideoBackground;
