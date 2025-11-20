// "use client";

import FetchSeasonDetails from "@/Api/FetchSeasonDetails";
import CardTvShow from "@/app/Components/CardTvShow/CardTvShow";
import Image from "next/image";
import { Star } from "lucide-react";
import Slider from "@/app/Components/Slider/Slider";
import ErrorMessage from "@/app/Components/ErrorHandel/ErrorMessage";
import { Button } from "@/components/ui/button";

interface SeasonDetailsPageProps {
  params: Promise<{
    tvId: string;
    seasonNumber: string;
  }>;
}

const Page = async ({ params }: SeasonDetailsPageProps) => {
  const resolvedParams = await params;
  const { tvId, seasonNumber } = resolvedParams;

  const seasonData = await FetchSeasonDetails(tvId, Number(seasonNumber));

  if (!seasonData) return <ErrorMessage />;

  return (
    <div className="text-white container mx-auto px-4">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mt-15">
        {/* Poster Card */}
        {seasonData.poster_path && (
          <div className="w-full md:w-1/4 rounded-xl overflow-hidden shadow-lg flex-shrink-0">
            <Image
              src={`https://image.tmdb.org/t/p/original${seasonData.poster_path}`}
              alt={`Season ${seasonNumber} Poster`}
              width={200}
              height={300}
              className="object-cover w-full h-full"
            />
          </div>
        )}

        {/* Season Info */}
        <div className="flex-1 space-y-4">
          {seasonNumber && (
            <h1 className="text-4xl sm:text-5xl font-extrabold drop-shadow-lg">
              Season {seasonNumber}
            </h1>
          )}

          {seasonData.overview && (
            <p className="text-white/90 text-lg sm:text-xl line-clamp-4">
              {seasonData.overview}
            </p>
          )}

          {seasonData.vote_average && (
            <div className="inline-flex items-center px-3 py-1 text-white font-semibold rounded-full text-sm space-x-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>{seasonData.vote_average}</span>
            </div>
          )}

          <div className="flex space-x-4 mt-4">
            <Button className="bg-red-500 hover:bg-red-800 text-white px-6 py-2 font-semibold rounded transition">
              Play
            </Button>
            <Button className="text-white px-6 py-2 font-semibold rounded hover:bg-gray-700/90 transition">
              More Info
            </Button>
          </div>
        </div>
      </div>

      {/* Episodes Section */}
      <div className="px-2 md:px-6 py-6 space-y-6 mt-10">
        <h2 className="text-2xl font-semibold mb-3">Episodes</h2>

        <Slider slidesPerView={6} slidesPerViewMobile={1.5}>
          {seasonData.episodes?.map((episode: any) => (
            <div
              key={episode.id}
              className="group relative cursor-pointer overflow-hidden rounded-lg"
            >
              <CardTvShow TvShow={episode} />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <Button className="bg-red-600 px-4 py-2 rounded font-semibold">
                  Play
                </Button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Page;
