// src/Components/VideoBackground.jsx
import React from "react";
function VideoBackground() {
    const videoSource =
      "/Assets/Netflix Intro 1080p (Highest Quality)(1080P_HD).mp4";
    
  return (
    <div className="fixed top-0 left-0 w-full h-screen -z-10 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover"
      >
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default VideoBackground;
