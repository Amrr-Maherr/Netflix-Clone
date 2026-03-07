import { Card } from "@/components/media/Card";
import Slider from "@/app/Components/Slider/Slider";
import { useVisibleSlidesCount } from "@/hooks/use-visible-slides";

export default function SimilarMoviesSection({
  movies,
  title,
  shows,
}: {
  movies: any[];
  title: string;
  shows:any[]
}) {
  const slidesCount = useVisibleSlidesCount();

  if (!movies?.length && !shows?.length) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>

      <Slider
        slidesPerView={slidesCount}
        slidesPerViewMobile={1.5}
        spaceBetween={20}
        swiperOptions={{ autoplay: { delay: 3000 }, loop: true }}
      >
        {movies &&
          movies.map((movie) => (
            <Card
              key={movie.id}
              id={movie.id}
              type="movie"
              title={movie.title}
              posterUrl={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null}
              releaseDate={movie.release_date}
              rating={movie.vote_average || 0}
              genres={movie.genres?.map((g: any) => g.name) || []}
              language={movie.original_language}
              overview={movie.overview}
            />
          ))}
        {shows &&
          shows.map((show) => (
            <Card
              key={show.id}
              id={show.id}
              type="tv"
              title={show.name}
              posterUrl={show.poster_path ? `https://image.tmdb.org/t/p/w500${show.poster_path}` : null}
              firstAirDate={show.first_air_date}
              rating={show.vote_average || 0}
              genres={show.genres?.map((g: any) => g.name) || []}
              language={show.original_language}
              overview={show.overview}
            />
          ))}
      </Slider>
    </section>
  );
}
