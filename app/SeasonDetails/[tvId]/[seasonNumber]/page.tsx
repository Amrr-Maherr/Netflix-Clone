import FetchSeasonDetails from "@/Api/FetchSeasonDetails";
import CardTvShow from "@/app/Components/CardTvShow/CardTvShow";
import Image from "next/image";
import { Star } from "lucide-react";
import Slider from "@/app/Components/Slider/Slider";
import ErrorMessage from "@/app/Components/ErrorHandel/ErrorMessage";
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

  if (!seasonData)
    return (
      <ErrorMessage/>
    );

  const network = seasonData.networks?.[0];

  return (
    <div className="text-white container">
      {/* Hero Section */}
      <div className="relative w-full h-[90dvh] text-white">
        {/* Poster */}
        {seasonData.poster_path && (
          <Image
            src={`https://image.tmdb.org/t/p/original${seasonData.poster_path}`}
            alt={`Season ${seasonNumber} Poster`}
            fill
            className="object-contain"
            style={{ objectPosition: "top" }}
          />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80"></div>

        {/* Network info */}
        {network && (
          <div className="absolute top-6 left-6 flex items-center space-x-4">
            {network.logo_path && (
              <Image
                src={`https://image.tmdb.org/t/p/w300${network.logo_path}`}
                alt={network.name}
                width={128}
                height={64}
                className="object-contain"
              />
            )}
            <span className="text-white text-lg font-semibold">
              {network.name}
            </span>
          </div>
        )}

        {/* Season info */}
        <div className="absolute bottom-16 left-6 max-w-lg space-y-4">
          <h1 className="text-5xl sm:text-6xl font-extrabold drop-shadow-lg">
            Season {seasonNumber}
          </h1>

          {/* Overview */}
          {seasonData.overview && (
            <p className="text-white/90 text-lg sm:text-xl line-clamp-3">
              {seasonData.overview}
            </p>
          )}

          {/* Vote Average */}
          {seasonData.vote_average && (
            <div className="inline-flex items-center px-3 py-1 bg-yellow-500 text-black font-semibold rounded-full text-sm space-x-1">
              <Star className="w-4 h-4" />
              <span>{seasonData.vote_average.toFixed(1)}</span>
            </div>
          )}

          {/* Buttons */}
          <div className="flex space-x-4 mt-4">
            <button className="bg-red-500 text-white px-6 py-2 font-semibold rounded transition">
              Play
            </button>
            <button className="bg-gray-700 bg-opacity-70 text-white px-6 py-2 font-semibold rounded hover:bg-gray-700/90 transition">
              More Info
            </button>
          </div>
        </div>
      </div>

      {/* Episodes Section */}
      <div className="px-6 py-6 space-y-6">
        <h2 className="text-2xl font-semibold mb-3">Episodes</h2>

        {/* <div
          className="
            grid 
            gap-6
            grid-cols-2
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4 
            xl:grid-cols-5
          "
        > */}
        <Slider slidesPerView={6} slidesPerViewMobile={1.5}>
          {seasonData.episodes?.map((episode: any) => (
            <CardTvShow key={episode.id} TvShow={episode} />
          ))}
        </Slider>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Page;
