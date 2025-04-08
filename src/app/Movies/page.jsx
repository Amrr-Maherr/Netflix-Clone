import React from "react";
import Navbar from "../Components/Navbar";
// تأكد من أن هذا المسار صحيح إذا كنت ستستخدمه لاحقاً
import VideoBackground from "../Components/Section/VideoBackground";
import Footer from "../Components/Footer/page"; // تأكد من مسار Footer
import { Button } from "@/components/ui/button"; // تأكد من مسار Button

// تأكد من مسار الفيديو إذا كنت ستستخدمه
const videoSource = "/Assets/Netflix Intro 1080p (Highest Quality)(1080P_HD).mp4";

export default function Movies() {
  return (
    <>
      <Navbar />
      <VideoBackground src={videoSource} />
      <Footer />
    </>
  );
}
