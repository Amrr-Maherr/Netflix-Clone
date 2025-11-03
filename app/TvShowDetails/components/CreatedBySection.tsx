"use client";

import Slider from "@/app/Components/Slider/Slider";
import Image from "next/image";

export default function CreatedBySection({ creators }: { creators: any[] }) {
  if (!creators?.length) return null;

  return (
    <div className="bg-black p-6 rounded-2xl">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white drop-shadow">
        Created By
      </h2>

      <Slider>
        <div className="flex gap-4 py-2">
          {creators.map((creator) => (
            <div
              key={creator.id}
              className="flex-shrink-0 w-32 md:w-40 bg-black rounded-lg p-3 flex flex-col items-center text-center hover:scale-105 transition-transform cursor-pointer"
            >
              {creator.profile_path ? (
                <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mb-2">
                  <Image
                    src={`https://image.tmdb.org/t/p/w300${creator.profile_path}`}
                    alt={creator.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-700 mb-2 flex items-center justify-center text-gray-300">
                  N/A
                </div>
              )}
              <p className="text-white font-medium text-sm md:text-base drop-shadow">
                {creator.name}
              </p>
            </div>
          ))}
        </div>
      </Slider>
    </div>
  );
}
