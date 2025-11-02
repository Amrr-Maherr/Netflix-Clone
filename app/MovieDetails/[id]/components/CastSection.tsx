import Slider from "@/app/Components/Slider/Slider";
import Image from "next/image";

export default function CastSection({ cast }: { cast: any[] }) {
  if (!cast?.length) return null;
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Cast</h2>
      {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"> */}
      <Slider>
        {cast.map((actor) => (
          <div
            key={actor.cast_id}
            className="bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition duration-300"
          >
            {actor.profile_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
                width={200}
                height={300}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="bg-gray-700 h-48 flex items-center justify-center">
                <span className="text-gray-500">No image</span>
              </div>
            )}
            <div className="p-3">
              <p className="font-semibold text-sm truncate">{actor.name}</p>
              <p className="text-xs text-gray-400 truncate">
                {actor.character}
              </p>
            </div>
          </div>
        ))}
      </Slider>
      {/* </div> */}
    </section>
  );
}
