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
  "https://videocdn.cdnpk.net/videos/1bfe204d-86ac-42b2-9ee5-842542bcb71d/horizontal/previews/clear/small.mp4?token=exp=1745594427~hmac=3d002c342c38d946ad02fed5d50aa51ce10083676619bc67f9e40dade3925eba";
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