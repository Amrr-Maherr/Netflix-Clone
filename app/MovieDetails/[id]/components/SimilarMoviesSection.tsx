import CardMovie from "@/app/Components/CardMovie/CardMovie";
import Slider from "@/app/Components/Slider/Slider";

export default function SimilarMoviesSection({
  movies,
  title,
}: {
  movies: any[];
  title: string;
}) {
  if (!movies?.length) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>

      <Slider
        slidesPerView={6}
        spaceBetween={20}
        swiperOptions={{ autoplay: { delay: 3000 }, loop: true }}
      >
        {movies.map((movie) => (
          <CardMovie key={movie.id} movie={movie} />
        ))}
      </Slider>
    </section>
  );
}
