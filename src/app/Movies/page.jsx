"use client";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer/page";
import VideoBackground from "../Components/Section/VideoBackground";
import HeadingSection from "../Components/HeadingSection";
import useFetchPopularMovies from "../Hooks/useFetchMovies";
import Loader from "../Components/Loader/Loader";
import MoviesCard from "../Components/MoviesCard";
import Title from "../Components/Title";


const videoSource =
  "https://videocdn.cdnpk.net/videos/3f3d24f8-7025-47fc-b139-7bf933d1201b/horizontal/previews/clear/small.mp4?token=exp=1745594040~hmac=cb3788f5f446abd6ea6f43e329bf198ba49c1cbc18944f338951d34e76a96d49";

export default function Movies() {
  const { data, isLoading, error } = useFetchPopularMovies();
  console.log(data);
  console.log(isLoading);
  console.log(error);
  
  return (
    <>
      <Navbar />
      <VideoBackground src={videoSource}>
        <HeadingSection
          title="Top Movies & TV Shows"
          description="Discover your next favorite movie or show."
          buttonText="Start Watching"
        />
      </VideoBackground>
      <Title
        title="Watch What Everyone’s Watching"
        subTitle="Top picks. No limits. Just hit play."
      />
      <div className="flex items-center justify-center flex-wrap my-3">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="flex overflow-x-auto px-4">
            {data.map((movie) => (
              <MoviesCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
