"use client";

import FetchSeasonDetails from "@/Api/FetchSeasonDetails";
import CardTvShow from "@/app/Components/CardTvShow/CardTvShow";
import Image from "next/image";
import { Star, Calendar, Clock, Play, Info, Users } from "lucide-react";
import Slider from "@/app/Components/Slider/Slider";
import ErrorMessage from "@/app/Components/ErrorHandel/ErrorMessage";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import PageHead from "@/app/Components/PageHead";
import NetflixIntroLoader from "@/app/Components/Loading/NetflixIntroLoader";
import ShareButton from "@/app/Components/ShareButton/ShareButton";

interface SeasonDetailsPageProps {
  params: Promise<{
    tvId: string;
    seasonNumber: string;
  }>;
}

interface SeasonData {
  season_number: number;
  name: string;
  overview: string;
  air_date: string;
  poster_path: string;
  vote_average: number;
  episodes: Array<{
    id: number;
    runtime: number;
    [key: string]: any; // For other properties like name, overview, etc.
  }>;
}

const Page = ({ params }: SeasonDetailsPageProps) => {
  const [seasonData, setSeasonData] = useState<SeasonData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const resolvedParams = await params;
      const { tvId, seasonNumber } = resolvedParams;
      const data = await FetchSeasonDetails(tvId, Number(seasonNumber));
      setSeasonData(data);
      setLoading(false);
    };

    fetchData();
  }, [params]);

  if (loading) return (
    <NetflixIntroLoader/>
  );
  if (!seasonData) return <ErrorMessage />;

  return (
    <>  
       <PageHead title={seasonData.name} description={seasonData.overview} image={`https://image.tmdb.org/t/p/w500${seasonData.poster_path}`} />
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 container py-12 md:py-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* Poster Image */}
          <div className="flex-shrink-0 mx-auto lg:mx-0">
            <div className="relative">
              {seasonData.poster_path && (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${seasonData.poster_path}`}
                  alt={`Season ${seasonData.season_number} Poster`}
                  width={400}
                  height={600}
                  quality={100}
                  placeholder="blur"
                  blurDataURL="/Netflix_Symbol_RGB.png"
                  priority
                  className="w-64 md:w-80 lg:w-96 rounded-2xl shadow-2xl border-4 border-white/10"
                />
              )}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>

          {/* Season Info */}
          <div className="flex-1 text-center lg:text-left max-w-4xl">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Season {seasonData.season_number}
            </h1>

            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 mb-8">
              {seasonData.vote_average && (
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-full border border-white/20">
                  <Star className="w-6 h-6 text-yellow-500 fill-current" />
                  <span className="font-bold text-lg">{seasonData.vote_average.toFixed(1)}</span>
                  <span className="text-gray-300">Rating</span>
                </div>
              )}
              {seasonData.episodes?.length && (
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-full border border-white/20">
                  <Users className="w-6 h-6 text-blue-400" />
                  <span className="font-bold text-lg">{seasonData.episodes.length}</span>
                  <span className="text-gray-300">Episodes</span>
                </div>
              )}
              <ShareButton
                title={`Season ${seasonData.season_number} - ${seasonData.name}`}
                description={seasonData.overview || `Watch Season ${seasonData.season_number} on Netflix Clone`}
                className="ml-auto lg:ml-0"
              />
            </div>

            {/* Season Details Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
              {seasonData.air_date && (
                <div className="group bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-600/20 rounded-lg">
                      <Calendar className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm uppercase tracking-wider font-medium">Air Date</p>
                      <p className="font-semibold text-lg mt-1">
                        {new Date(seasonData.air_date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {seasonData.episodes?.length && seasonData.episodes[0]?.runtime && (
                <div className="group bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-600/20 rounded-lg">
                      <Clock className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm uppercase tracking-wider font-medium">Episode Runtime</p>
                      <p className="font-semibold text-lg mt-1">{seasonData.episodes[0].runtime} min</p>
                    </div>
                  </div>
                </div>
              )}

              {seasonData.name && (
                <div className="group bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105 md:col-span-2 xl:col-span-1">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-orange-600/20 rounded-lg">
                      <Info className="w-6 h-6 text-orange-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm uppercase tracking-wider font-medium">Season Name</p>
                      <p className="font-semibold text-lg mt-1">{seasonData.name}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Overview */}
            {seasonData.overview && (
              <div className="mb-10">
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl">
                  {seasonData.overview}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-12">
              <Button className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-600/25">
                <Play className="w-6 h-6" />
                Play Season
              </Button>

              <Button className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-white/20 shadow-lg">
                <Info className="w-6 h-6" />
                More Info
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Episodes Section */}
      <div className="relative z-10 container px-4 md:px-6 py-12">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Episodes</h2>
          <p className="text-gray-400 text-lg">All episodes from Season {seasonData.season_number}</p>
        </div>

        <div className="space-y-6">
          {seasonData.episodes?.map((episode, index) => (
            <div
              key={episode.id}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Episode Number & Image */}
                <div className="flex-shrink-0 flex items-center gap-4">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                    {index + 1}
                  </div>
                  {episode.still_path && (
                    <div className="relative w-32 h-20 md:w-40 md:h-24 rounded-lg overflow-hidden shadow-lg">
                      <Image
                        src={`https://image.tmdb.org/t/p/w300${episode.still_path}`}
                        alt={episode.name || `Episode ${index + 1}`}
                        fill
                        className="object-cover"
                        quality={100}
                        placeholder="blur"
                        blurDataURL="/Netflix_Symbol_RGB.png"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                          <Play className="w-4 h-4 mr-2" />
                          Play
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Episode Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold mb-2 text-white group-hover:text-red-400 transition-colors duration-300">
                        {episode.name || `Episode ${index + 1}`}
                      </h3>

                      {episode.overview && (
                        <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-4 line-clamp-3">
                          {episode.overview}
                        </p>
                      )}

                      {/* Episode Details */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                        {episode.air_date && (
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(episode.air_date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}</span>
                          </div>
                        )}
                        {episode.runtime && (
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{episode.runtime} min</span>
                          </div>
                        )}
                        {episode.vote_average && (
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span>{episode.vote_average.toFixed(1)}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex-shrink-0">
                      <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-600/25">
                        <Play className="w-5 h-5 mr-2" />
                        Watch Episode
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
      </>
  );
};

export default Page;
