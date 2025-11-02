import CardMovie from "@/app/Components/CardMovie/CardMovie";
import Slider from "@/app/Components/Slider/Slider";


export default function SimilarMoviesSection({ movies }: { movies: any[] }) {
  if (!movies?.length) return null;
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Similar Movies</h2>

      {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"> */}
      <Slider
        slidesPerView={6}
        spaceBetween={20}
        swiperOptions={{ autoplay: { delay: 3000 }, loop: true }}
      >
        {movies.map((movie) => (
          <CardMovie key={movie.id} movie={movie} />
        ))}
      </Slider>
      {/* </div> */}
    </section>
  );
}
