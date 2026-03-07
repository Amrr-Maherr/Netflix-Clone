"use client";
import { Clapperboard, ListVideo } from "lucide-react";

export default function SeasonsOverviewSection({
  numberOfSeasons,
  numberOfEpisodes,
}: {
  numberOfSeasons: number;
  numberOfEpisodes: number;
}) {
  if (!numberOfSeasons) return null;

  return (
    <section className="relative bg-black/90 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
      <div className="text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white drop-shadow">
          Seasons & Episodes
        </h2>
        <p className="text-gray-400 text-lg md:text-xl">
          Explore all available seasons and episodes of this series.
        </p>
      </div>

      <div className="flex gap-10 text-center">
        <div className="bg-gray-900/80 rounded-xl p-5 flex flex-col items-center hover:scale-105 transition-transform cursor-pointer">
          <Clapperboard className="w-10 h-10 text-red-600 mb-2" />
          <p className="text-3xl md:text-4xl font-bold text-white drop-shadow">
            {numberOfSeasons}
          </p>
          <p className="text-gray-400 text-sm md:text-base">
            Season{numberOfSeasons > 1 && "s"}
          </p>
        </div>

        <div className="bg-gray-900/80 rounded-xl p-5 flex flex-col items-center hover:scale-105 transition-transform cursor-pointer">
          <ListVideo className="w-10 h-10 text-red-600 mb-2" />
          <p className="text-3xl md:text-4xl font-bold text-white drop-shadow">
            {numberOfEpisodes}
          </p>
          <p className="text-gray-400 text-sm md:text-base">
            Episode{numberOfEpisodes > 1 && "s"}
          </p>
        </div>
      </div>
    </section>
  );
}
