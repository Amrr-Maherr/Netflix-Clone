"use client";

import Slider from "@/app/Components/Slider/Slider";
import Image from "next/image";

export default function NetworksSection({ networks }: { networks: any[] }) {
  if (!networks?.length) return null;

  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold mb-6">Available On</h2>

      <Slider slidesPerView={4} spaceBetween={20}>
        {networks.map((network) => (
          <div
            key={network.id}
            className="bg-[#141414] rounded-xl p-6 flex flex-col items-center justify-center text-center border border-gray-800 hover:border-gray-700 hover:shadow-lg transition"
          >
            {network.logo_path ? (
              <div className="relative w-28 h-16 mb-3">
                <Image
                  src={`https://image.tmdb.org/t/p/w200${network.logo_path}`}
                  alt={network.name}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="w-28 h-16 mb-3 flex items-center justify-center bg-gray-800 text-gray-500 text-sm rounded-md">
                No Logo
              </div>
            )}
            <span className="text-gray-300 mt-2 text-sm">{network.name}</span>
          </div>
        ))}
      </Slider>
    </section>
  );
}
