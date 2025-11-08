"use client";
import { Play, Info } from "lucide-react";
import Image from "next/image";

export default function HeroSection({ person }: { person: any }) {
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

  return (
    <div
      className="relative h-screen w-full bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.95) 20%, rgba(0,0,0,0.5) 60%, transparent 100%), url(https://image.tmdb.org/t/p/original${person.profile_path})`,
      }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-16 max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-10">
        {/* Person Image */}
        <Image
          width={56}
          height={100}
          quality={75}
          priority
          src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
          alt={person.name}
          className="w-40 sm:w-56 hidden md:block md:w-80 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] border-4 border-black"
        />

        {/* Text */}
        <div className="text-white text-center md:text-left max-w-xl">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold drop-shadow-[0_3px_10px_rgba(0,0,0,0.7)]">
            {person.name}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mt-2">
            {person.known_for_department}
          </p>

          {/* Details */}
          <div className="mt-4 sm:mt-6 flex flex-wrap justify-center md:justify-start gap-4 sm:gap-6 text-sm sm:text-lg">
            {person.place_of_birth && (
              <div>
                <span className="text-gray-400 uppercase">Born in</span>
                <p className="font-medium">{person.place_of_birth}</p>
              </div>
            )}
            {birthday && (
              <div>
                <span className="text-gray-400 uppercase">Birthday</span>
                <p className="font-medium">{birthday}</p>
              </div>
            )}
            {deathday && (
              <div>
                <span className="text-gray-400 uppercase">Deathday</span>
                <p className="font-medium">{deathday}</p>
              </div>
            )}
            {age && (
              <div>
                <span className="text-gray-400 uppercase">Age</span>
                <p className="font-medium">{age}</p>
              </div>
            )}
          </div>

          {/* Buttons */}
          {/* <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center md:justify-start gap-3 sm:gap-4">
            <button className="bg-white text-black px-6 py-2 sm:px-8 sm:py-3 rounded font-bold text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-3 hover:bg-gray-200 transition duration-300">
              <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
              Play Reel
            </button>
            <button className="border-2 border-white px-6 py-2 sm:px-8 sm:py-3 rounded font-bold text-base sm:text-lg hover:bg-white hover:text-black transition duration-300 flex items-center justify-center gap-2 sm:gap-3">
              <Info className="w-5 h-5 sm:w-6 sm:h-6" />
              More Info
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
