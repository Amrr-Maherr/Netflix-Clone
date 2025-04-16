"use client";
import ActorsCard from "../Components/ActorsCard";
import Footer from "../Components/Footer/page";
import HeadingSection from "../Components/HeadingSection";
import Loader from "../Components/Loader/Loader";
import Navbar from "../Components/Navbar";
import VideoBackground from "../Components/Section/VideoBackground";
import Title from "../Components/Title";
import useFetchPopularMovies from "../Hooks/useFetchActors";
const videoSource =
  "/Assets/Netflix Intro 1080p (Highest Quality)(1080P_HD).mp4";
export default function Actors() {
  const { data, isLoading, error } = useFetchPopularMovies();
  console.log(data);
  console.log(isLoading);
  console.log(error);
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
      <Title
        title="Meet the Stars of the Screen"
        subTitle="Discover the most popular actors and actresses. Get to know the faces behind your favorite movies and shows."
      />
      <div className="flex items-center justify-center flex-wrap my-3">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="flex overflow-x-auto px-4">
            {data.map((actor) => (
              <ActorsCard key={actor.id} actor={actor} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
