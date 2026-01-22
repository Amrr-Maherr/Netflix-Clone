"use client";

import Slider from "@/app/Components/Slider/Slider";
import Image from "next/image";
import { useVisibleSlidesCount } from "@/lib/useVisibleSlidesCount";

export default function ProvidersSection({
  providers,
}: {
  providers: Record<string, any>;
}) {
  const slidesCount = useVisibleSlidesCount();
  const flatrate = Object.values(providers).flatMap(
    (region: any) => region.flatrate || []
  );

  if (!flatrate.length) return null;

  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold mb-6">Available On</h2>
      <Slider slidesPerView={slidesCount} slidesPerViewMobile={1.5}>
        {flatrate.map((p: any) => (
          <div
            key={p.provider_id}
            className="bg-[#141414] hover:bg-[#1e1e1e] p-4 rounded-2xl flex flex-col items-center text-center transition transform hover:scale-105 border border-gray-800 hover:border-gray-700 shadow-sm"
          >
            <div className="relative w-20 h-20 mb-3">
              <Image
                src={`https://image.tmdb.org/t/p/original${p.logo_path}`}
                alt={p.provider_name}
                fill
                className="object-contain"
              />
            </div>
            <span className="text-sm text-gray-300 font-medium">
              {p.provider_name}
            </span>
          </div>
        ))}
      </Slider>
    </section>
  );
}
