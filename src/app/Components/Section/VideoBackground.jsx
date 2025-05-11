import React from "react";
import AltImg from "../../../../public/Assets/Netflix_Logo_PMS.png"
function VideoBackground({ children, src }) {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video Element */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={AltImg.src}
        className="min-w-full min-h-full w-auto h-auto object-cover"
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Content */}
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}

export default VideoBackground;
