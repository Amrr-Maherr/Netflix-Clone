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
  "https://videocdn.cdnpk.net/videos/4d5f7233-e330-44a7-8f74-4c0de406ab61/horizontal/previews/clear/small.mp4?token=exp=1745594040~hmac=fae4c6ae588695963e0e5bd672398491d469ccf38e8c24317ce4c3c2f71a5aea";
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
