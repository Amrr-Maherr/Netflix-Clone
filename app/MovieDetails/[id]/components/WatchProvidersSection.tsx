"use client";

import Image from "next/image";

interface Provider {
  provider_id: number;
  provider_name: string;
  logo_path: string;
}

interface ProvidersResults {
  [countryCode: string]: {
    flatrate?: Provider[];
    rent?: Provider[];
    buy?: Provider[];
  };
}

export default function WatchProvidersSection({
  providers,
}: {
  providers: ProvidersResults;
}) {
  const country = providers.EG || providers.US || providers.GB;

  if (!country) return null;

  const renderProviders = (title: string, list?: Provider[]) => {
    if (!list?.length) return null;
    return (
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <div className="flex flex-wrap gap-6">
          {list.map((p) => (
            <div
              key={p.provider_id}
              className="bg-[#141414] hover:bg-[#1e1e1e] p-4 rounded-2xl flex flex-col items-center text-center transition transform hover:scale-105 border border-gray-800 hover:border-gray-700 shadow-sm w-24"
            >
              <div className="relative w-16 h-16 mb-2">
                <Image
                  src={`https://image.tmdb.org/t/p/original${p.logo_path}`}
                  alt={p.provider_name}
                  fill
                  className="object-contain rounded-full"
                />
              </div>
              <span className="text-gray-300 text-sm font-medium mt-1">
                {p.provider_name}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold mb-6">Available On</h2>
      {renderProviders("Stream", country.flatrate)}
      {renderProviders("Rent", country.rent)}
      {renderProviders("Buy", country.buy)}
    </section>
  );
}
