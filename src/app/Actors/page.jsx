import Footer from "../Components/Footer/page";
import HeadingSection from "../Components/HeadingSection";
import Navbar from "../Components/Navbar";
import VideoBackground from "../Components/Section/VideoBackground";
const videoSource =
  "/Assets/Netflix Intro 1080p (Highest Quality)(1080P_HD).mp4";
export default function Actors() {
    return (
      <>
        <Navbar />
        <VideoBackground src={videoSource}>
          <HeadingSection
            title="Meet the Stars"
            description="Explore the talent behind your favorite movies and TV shows."
            buttonText="See Actors"
          />
        </VideoBackground>
        <Footer />
      </>
    );
}