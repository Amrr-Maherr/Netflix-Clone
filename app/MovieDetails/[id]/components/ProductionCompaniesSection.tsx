"use client";

import Slider from "@/app/Components/Slider/Slider";
import Image from "next/image";

interface Company {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export default function ProductionCompaniesSection({
  companies,
}: {
  companies: Company[];
}) {
  if (!companies?.length) return null;

  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold mb-6">Production Companies</h2>

      <Slider slidesPerView={6} slidesPerViewMobile={1.5} spaceBetween={20}>
        {companies.map((company) => (
          <div
            key={company.id}
            className="bg-[#141414] rounded-xl p-6 flex flex-col items-center justify-center text-center border border-gray-800 hover:border-gray-700 hover:shadow-lg transition"
          >
            {company.logo_path ? (
              <div className="relative w-32 h-16 mb-3">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${company.logo_path}`}
                  alt={company.name}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="w-32 h-16 mb-3 flex items-center justify-center bg-gray-800 text-gray-500 text-sm rounded-md">
                No Logo
              </div>
            )}

            <p className="font-semibold text-gray-200">{company.name}</p>
            <span className="text-gray-400 text-xs mt-1">
              {company.origin_country}
            </span>
          </div>
        ))}
      </Slider>
    </section>
  );
}
