import Slider from "@/app/Components/Slider/Slider";
import CastCard from "./CastCard";

export default function CastSection({ cast }: { cast: any[] }) {
  if (!cast?.length) return null;
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Cast</h2>
      <Slider slidesPerView={6} slidesPerViewMobile={1.5}>
        {cast.map((actor) => (
          <CastCard key={actor.cast_id} actor={actor} />
        ))}
      </Slider>
    </section>
  );
}
