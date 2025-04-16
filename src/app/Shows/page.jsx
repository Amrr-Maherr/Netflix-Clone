"use client"
import Footer from "../Components/Footer/page";
import HeadingSection from "../Components/HeadingSection";
import Loader from "../Components/Loader/Loader";
import Navbar from "../Components/Navbar";
import VideoBackground from "../Components/Section/VideoBackground";
import Title from "../Components/Title";
import TVShowCard from "../Components/TVShowCard";
import useFetchPopularTv from "../Hooks/useFetchTv";
const videoSource =
  "/Assets/Netflix Intro 1080p (Highest Quality)(1080P_HD).mp4";
export default function Shows() {
  const { data, isLoading, error } = useFetchPopularTv();
    console.log(data);
    console.log(isLoading);
    console.log(error);
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
        <Title
          title="Discover the Best TV Shows"
          subTitle="Explore the most popular TV series. Find your next binge-worthy show from a wide range of genres."
        />
        <div className="flex items-center justify-center flex-wrap my-3">
          {isLoading ? (
            <Loader />
          ) : (
            <div className="flex overflow-x-auto px-4">
              {data.map((show) => (
                <TVShowCard key={show.id} show={show} />
              ))}
            </div>
          )}
        </div>
        <Footer />
      </>
    );
}