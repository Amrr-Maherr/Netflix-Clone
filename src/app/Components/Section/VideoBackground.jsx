import React from "react";

function VideoBackground({ children, src }) {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="min-w-full min-h-full w-auto h-auto object-cover"
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}

export default VideoBackground;
