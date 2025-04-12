import Footer from "../Components/Footer/page";
import HeadingSection from "../Components/HeadingSection";
import Navbar from "../Components/Navbar";
import VideoBackground from "../Components/Section/VideoBackground";
const videoSource =
  "/Assets/Netflix Intro 1080p (Highest Quality)(1080P_HD).mp4";
export default function Shows() {
    return (
      <>
        <Navbar />
        <VideoBackground src={videoSource}>
          <HeadingSection
            title="Top Series & Shows"
            description="Find your next binge-worthy show. Explore top-rated series now."
            buttonText="Browse Shows"
          />
        </VideoBackground>
        <Footer />
      </>
    );
}