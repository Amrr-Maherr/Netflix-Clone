import Slider from "@/app/Components/Slider/Slider";
import Image from "next/image";

export default function CastSection({ cast }: { cast: any[] }) {
  if (!cast?.length) return null;
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Cast</h2>
      <Slider slidesPerView={6} slidesPerViewMobile={1.5}>
        {cast.map((actor) => (
          <div
            key={actor.cast_id}
            className="bg-zinc-900 rounded-xl overflow-hidden transition-transform duration-300 cursor-pointer"
          >
            {actor.profile_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                alt={actor.name}
                width={300}
                height={450}
                quality={100}
                priority
                className="w-full h-48 sm:h-56 md:h-64 object-cover"
              />
            ) : (
              <div className="bg-zinc-800 h-48 sm:h-56 md:h-64 flex items-center justify-center">
                <span className="text-gray-500 text-sm">No Image</span>
              </div>
            )}

            <div className="p-3 text-center">
              <p className="font-semibold text-sm text-white truncate">
                {actor.name}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {actor.character}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
