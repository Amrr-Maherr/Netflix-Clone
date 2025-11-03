import CardMovie from "@/app/Components/CardMovie/CardMovie";
import CardTvShow from "@/app/Components/CardTvShow/CardTvShow";
import Slider from "@/app/Components/Slider/Slider";

export default function SimilarMoviesSection({
  movies,
  title,
  shows,
}: {
  movies: any[];
  title: string;
  shows:any[]
}) {
   if (!movies?.length && !shows?.length) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>

      <Slider
        slidesPerView={6}
        spaceBetween={20}
        swiperOptions={{ autoplay: { delay: 3000 }, loop: true }}
      >
        {movies &&
          movies.map((movie) => <CardMovie key={movie.id} movie={movie} />)}
        {shows &&
          shows.map((shows) => <CardTvShow key={shows.id} TvShow={shows} />)}
      </Slider>
    </section>
  );
}
