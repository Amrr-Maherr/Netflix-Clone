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
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <div className="flex flex-wrap gap-5">
          {list.map((p) => (
            <div
              key={p.provider_id}
              className="flex flex-col items-center w-20"
            >
              <div className="relative w-16 h-16">
                <Image
                  src={`https://image.tmdb.org/t/p/original${p.logo_path}`}
                  alt={p.provider_name}
                  fill
                  className="object-contain rounded-full border border-gray-700 bg-gray-900"
                />
              </div>
              <span className="text-gray-300 text-xs text-center mt-2">
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
