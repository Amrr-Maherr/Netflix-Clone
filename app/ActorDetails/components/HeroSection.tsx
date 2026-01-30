"use client";
import { useState, useEffect } from "react";
import { Heart, Image as ImageIcon, Play, Info, Star, MapPin, Calendar, Users } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import CardMovie from "@/app/Components/CardMovie/CardMovie";
import CardTvShow from "@/app/Components/CardTvShow/CardTvShow";
import Link from "next/link";

export default function HeroSection({ person }: { person: any }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);

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

  // Get background image - prefer backdrop from known works, fallback to profile
  const getBackgroundImage = () => {
    if (person.known_for && person.known_for.length > 0) {
      const backdropItem = person.known_for.find((item: any) =>
        item.backdrop_path || item.poster_path
      );
      if (backdropItem) {
        return `https://image.tmdb.org/t/p/original${backdropItem.backdrop_path || backdropItem.poster_path}`;
      }
    }
    return `https://image.tmdb.org/t/p/original${person.profile_path}`;
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleFollow = () => {
    setIsFollowed(!isFollowed);
    // Here you could add logic to save to localStorage or API
  };

  const knownForPreview = person.known_for?.slice(0, 3) || [];

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container py-12 md:py-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* Profile Image */}
          <div className="flex-shrink-0 mx-auto lg:mx-0">
            <div className="relative">
              <Image
                width={400}
                height={600}
                quality={100}
                placeholder="blur"
                blurDataURL="/Netflix_Symbol_RGB.png"
                priority
                src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                alt={person.name}
                className="w-64 md:w-80 lg:w-96 rounded-2xl shadow-2xl border-4 border-white/10"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>

          {/* Info Section */}
          <div className="flex-1 text-white text-center lg:text-left max-w-4xl">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {person.name}
            </h1>

            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 mb-8">
              <span className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-full font-bold text-lg transition-colors duration-300">
                {person.known_for_department}
              </span>
              {person.popularity && (
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-full border border-white/20">
                  <Star className="w-6 h-6 text-yellow-500 fill-current" />
                  <span className="font-bold text-lg">{person.popularity.toFixed(1)}</span>
                  <span className="text-gray-300">Popularity</span>
                </div>
              )}
            </div>

            {/* Personal Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
              {person.place_of_birth && (
                <div className="group bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-red-600/20 rounded-lg">
                      <MapPin className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm uppercase tracking-wider font-medium">Born in</p>
                      <p className="font-semibold text-lg mt-1">{person.place_of_birth}</p>
                    </div>
                  </div>
                </div>
              )}

              {birthday && (
                <div className="group bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-600/20 rounded-lg">
                      <Calendar className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm uppercase tracking-wider font-medium">
                        {deathday ? "Born" : "Birthday"}
                      </p>
                      <p className="font-semibold text-lg mt-1">{birthday}</p>
                      {age && !deathday && (
                        <p className="text-sm text-gray-300 mt-1">Age {age}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {deathday && (
                <div className="group bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gray-600/20 rounded-lg">
                      <Calendar className="w-6 h-6 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm uppercase tracking-wider font-medium">Died</p>
                      <p className="font-semibold text-lg mt-1">{deathday}</p>
                      {age && <p className="text-sm text-gray-300 mt-1">Age {age}</p>}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-12">
              <Button
                onClick={handleFollow}
                className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${
                  isFollowed
                    ? "bg-red-600 hover:bg-red-700 text-white shadow-red-600/25"
                    : "bg-white text-black hover:bg-gray-100 shadow-white/25"
                }`}
              >
                <Heart className={`w-6 h-6 ${isFollowed ? "fill-current" : ""}`} />
                {isFollowed ? "Following" : "Follow"}
              </Button>

              <Button
                className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-white/20 shadow-lg"
              >
                <ImageIcon className="w-6 h-6" />
                View Gallery
              </Button>

              {person.videos?.results?.length > 0 && (
                <Button className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-white/20 shadow-lg">
                  <Play className="w-6 h-6" />
                  Watch Videos
                </Button>
              )}
            </div>

            {/* Known For Preview */}
            {knownForPreview.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center justify-center lg:justify-start gap-3">
                  <Users className="w-6 h-6 text-red-400" />
                  Known For
                </h3>
                <div className="flex justify-center lg:justify-start gap-6 overflow-x-auto pb-4 px-4 lg:px-0">
                  {knownForPreview.map((item: any, index: number) => (
                    <div key={index} className="flex-shrink-0 group">
                      <Link
                        href={
                          item.media_type === "movie"
                            ? `/MovieDetails/${item.id}`
                            : `/TvShowDetails/${item.id}`
                        }
                      >
                        <div className="w-40 md:w-48 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl rounded-lg overflow-hidden">
                          {item.media_type === "movie" ? (
                            <CardMovie movie={item} />
                          ) : (
                            <CardTvShow TvShow={item} />
                          )}
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
