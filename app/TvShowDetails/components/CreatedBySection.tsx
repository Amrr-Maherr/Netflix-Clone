"use client";

import Slider from "@/app/Components/Slider/Slider";
import Image from "next/image";
import { useVisibleSlidesCount } from "@/lib/useVisibleSlidesCount";
import type { CreatedBySectionProps } from "@/Types";

export default function CreatedBySection({ creators }: CreatedBySectionProps) {
  const slidesCount = useVisibleSlidesCount();

  if (!creators?.length) return null;

  return (
    <section className="py-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
        Created By
      </h2>

      <Slider slidesPerView={slidesCount} slidesPerViewMobile={2} spaceBetween={20}>
        {creators.map((creator) => (
          <div
            key={creator.id}
            className="bg-zinc-900 rounded-xl overflow-hidden transition-transform duration-300 cursor-pointer"
          >
            {creator.profile_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w300${creator.profile_path}`}
                alt={creator.name}
                width={300}
                height={450}
                quality={100}
                placeholder="blur"
                blurDataURL="/Netflix_Symbol_RGB.png"
                priority
                className="w-full h-48 sm:h-56 md:h-64 object-cover"
              />
            ) : (
              <div className="bg-zinc-800 h-48 sm:h-56 md:h-64 flex items-center justify-center">
                <span className="text-gray-500 text-sm">No Image</span>
              </div>
            )}

            <div className="p-3 text-center">
              <p className="font-semibold text-sm text-white truncate">
                {creator.name}
              </p>
              <p className="text-xs text-gray-400 truncate">Creator</p>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
