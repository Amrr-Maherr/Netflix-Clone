import Slider from "@/app/Components/Slider/Slider";
import Image from "next/image";

export default function SeasonsSection({ seasons }: { seasons: any[] }) {
  if (!seasons?.length) return null;

  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold">Seasons</h2>

      <Slider>
        {seasons.map((season) => (
          <div
            key={season.id}
            className="group relative rounded-xl overflow-hidden bg-zinc-900 transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
          >
            {/* Poster */}
            <div className="relative w-full aspect-[2/3]">
              <Image
                src={
                  season.poster_path
                    ? `https://image.tmdb.org/t/p/w500${season.poster_path}`
                    : "/placeholder-poster.jpg"
                }
                alt={season.name}
                fill
                className="object-cover"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-70 group-hover:opacity-90 transition" />
            </div>

            {/* Info overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 space-y-1">
              <h3 className="text-lg font-semibold">{season.name}</h3>
              <p className="text-gray-400 text-sm">
                {season.air_date
                  ? new Date(season.air_date).getFullYear()
                  : "—"}{" "}
                • {season.episode_count} Ep
                {season.episode_count > 1 && "s"}
              </p>

              {season.vote_average > 0 && (
                <p className="text-yellow-400 font-semibold text-sm">
                  ⭐ {season.vote_average.toFixed(1)}
                </p>
              )}
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
