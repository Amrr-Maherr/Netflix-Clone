"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import FetchPersonDetails from "@/Api/FetchPersonDetails";
import Slider from "@/app/Components/Slider/Slider";
import { SwiperSlide } from "swiper/react";
import { Play, Info } from "lucide-react";
import CardMovie from "@/app/Components/CardMovie/CardMovie";
import CardTvShow from "@/app/Components/CardTvShow/CardTvShow";

export default function Page() {
  const { id } = useParams();
  const {
    data: person,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["person", id],
    queryFn: () => FetchPersonDetails({ id: id as string }),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 border-4 border-t-red-600 border-gray-800 rounded-full animate-spin"></div>
          <p className="text-2xl text-white font-sans">Loading...</p>
        </div>
      </div>
    );

  if (!person || isError)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-red-600 text-2xl">
        Person not found
      </div>
    );

  const birthday = person.birthday
    ? new Date(person.birthday).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const deathday = person.deathday
    ? new Date(person.deathday).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const age = person.birthday
    ? person.deathday
      ? new Date(person.deathday).getFullYear() -
        new Date(person.birthday).getFullYear()
      : new Date().getFullYear() - new Date(person.birthday).getFullYear()
    : null;

  const combinedCredits = [
    ...(person.combined_credits?.cast || []),
    ...(person.combined_credits?.crew || []),
  ].sort(
    (a, b) =>
      new Date(b.release_date || b.first_air_date || 0).getTime() -
      new Date(a.release_date || a.first_air_date || 0).getTime()
  );

  const importantCredits = combinedCredits.slice(0, 12);

  return (
    <>
      {/* Hero */}
      <div
        className="relative h-screen bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to top, #000 0%, transparent 50%), url(https://image.tmdb.org/t/p/original${person.profile_path})`,
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 max-w-screen-2xl mx-auto flex flex-col md:flex-row items-end gap-10">
          <img
            src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
            alt={person.name}
            className="w-64 md:w-80 rounded-lg shadow-2xl border-4 border-gray-900"
          />
          <div className="text-white">
            <h1 className="text-6xl md:text-8xl font-extrabold drop-shadow-2xl">
              {person.name}
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 mt-2">
              {person.known_for_department}
            </p>

            <div className="mt-6 flex flex-wrap gap-6 text-lg">
              {person.place_of_birth && (
                <div>
                  <span className="text-gray-500">Born in</span>
                  <p className="font-medium">{person.place_of_birth}</p>
                </div>
              )}
              {birthday && (
                <div>
                  <span className="text-gray-500">Birthday</span>
                  <p className="font-medium">{birthday}</p>
                </div>
              )}
              {deathday && (
                <div>
                  <span className="text-gray-500">Deathday</span>
                  <p className="font-medium">{deathday}</p>
                </div>
              )}
              {age && (
                <div>
                  <span className="text-gray-500">Age</span>
                  <p className="font-medium">{age}</p>
                </div>
              )}
            </div>

            <div className="mt-8 flex gap-4">
              <button className="bg-white text-black px-8 py-4 rounded font-bold text-lg flex items-center gap-3 hover:bg-gray-200 transition">
                <Play className="w-6 h-6 fill-current" />
                Play Reel
              </button>
              <button className="border-2 border-white px-8 py-4 rounded font-bold text-lg hover:bg-white hover:text-black transition flex items-center gap-3">
                <Info className="w-6 h-6" />
                More Info
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-black -mt-32 relative z-10 pb-20">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          {/* Biography */}
          <div className="bg-gray-900 rounded-lg p-8 mb-12 shadow-2xl">
            <h2 className="text-4xl font-bold text-white mb-6">Biography</h2>
            <p className="text-gray-300 text-lg leading-relaxed max-w-4xl">
              {person.biography || "No biography available."}
            </p>
          </div>

          {/* Combined Credits */}
          {combinedCredits.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Combined Credits ({combinedCredits.length})
              </h2>
              <Slider
                slidesPerView={6}
                slidesPerViewMobile={1.5}
                spaceBetween={16}
                className="netflix-slider"
              >
                {combinedCredits.map((item) => (
                  <SwiperSlide key={item.credit_id || item.id}>
                    {item.media_type === "movie" ? (
                      <CardMovie movie={item} />
                    ) : (
                      <CardTvShow TvShow={item} />
                    )}
                  </SwiperSlide>
                ))}
              </Slider>
            </div>
          )}

          {/* Important / Appears In */}
          {importantCredits.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Appears In
              </h2>
              <Slider
                slidesPerView={6}
                slidesPerViewMobile={1.5}
                spaceBetween={16}
                className="netflix-slider"
              >
                {importantCredits.map((item) => (
                  <SwiperSlide key={item.credit_id || item.id}>
                    {item.media_type === "movie" ? (
                      <CardMovie movie={item} />
                    ) : (
                      <CardTvShow TvShow={item} />
                    )}
                  </SwiperSlide>
                ))}
              </Slider>
            </div>
          )}

          {/* Also Known As */}
          {person.also_known_as?.length > 0 && (
            <div className="bg-gray-900 rounded-lg p-8 mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">
                Also Known As
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {person.also_known_as.map((name: string, i: number) => (
                  <div
                    key={i}
                    className="bg-gray-800 px-4 py-3 rounded text-center text-gray-300 hover:bg-red-600 transition"
                  >
                    {name}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Images / Gallery */}
          {person.images?.profiles?.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Gallery
              </h2>
              <Slider
                slidesPerView={5}
                slidesPerViewMobile={1.5}
                spaceBetween={12}
                className="netflix-slider"
              >
                {person.images.profiles.map((img, i) => (
                  <SwiperSlide key={i}>
                    <img
                      src={`https://image.tmdb.org/t/p/w300${img.file_path}`}
                      alt={`Profile ${i}`}
                      className="w-full h-full object-cover rounded-lg shadow-lg"
                    />
                  </SwiperSlide>
                ))}
              </Slider>
            </div>
          )}

          {/* Videos / Trailers */}
          {person.videos?.results?.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Videos
              </h2>
              <Slider
                slidesPerView={3}
                slidesPerViewMobile={1}
                spaceBetween={12}
                className="netflix-slider"
              >
                {person.videos.results.map((video: any) => (
                  <SwiperSlide key={video.id}>
                    <div className="relative group cursor-pointer rounded-lg overflow-hidden shadow-lg">
                      <img
                        src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                        alt={video.name}
                        className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                        <Play className="w-12 h-12 text-white" />
                      </div>
                      <p className="text-white mt-2 text-center font-medium">
                        {video.name}
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
              </Slider>
            </div>
          )}

          {/* Social Links */}
          {(person.external_ids?.imdb_id ||
            person.external_ids?.facebook_id ||
            person.external_ids?.instagram_id ||
            person.external_ids?.twitter_id) && (
            <div className="mb-16 bg-gray-900 rounded-lg p-8 flex gap-6 items-center">
              {person.external_ids.imdb_id && (
                <a
                  href={`https://www.imdb.com/name/${person.external_ids.imdb_id}`}
                  target="_blank"
                  className="text-yellow-400 font-bold hover:underline"
                >
                  IMDb
                </a>
              )}
              {person.external_ids.facebook_id && (
                <a
                  href={`https://www.facebook.com/${person.external_ids.facebook_id}`}
                  target="_blank"
                  className="text-blue-600 font-bold hover:underline"
                >
                  Facebook
                </a>
              )}
              {person.external_ids.instagram_id && (
                <a
                  href={`https://www.instagram.com/${person.external_ids.instagram_id}`}
                  target="_blank"
                  className="text-pink-500 font-bold hover:underline"
                >
                  Instagram
                </a>
              )}
              {person.external_ids.twitter_id && (
                <a
                  href={`https://twitter.com/${person.external_ids.twitter_id}`}
                  target="_blank"
                  className="text-blue-400 font-bold hover:underline"
                >
                  Twitter
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
