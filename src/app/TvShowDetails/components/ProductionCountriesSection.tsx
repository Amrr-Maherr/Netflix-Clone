"use client";

export default function ProductionCountriesSection({
  countries,
}: {
  countries: any[];
}) {
  if (!countries?.length) return null;

  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold mb-6">Production Countries</h2>
      <div className="flex flex-wrap gap-4">
        {countries.map((country) => (
          <span
            key={country.iso_3166_1}
            className="bg-[#141414] px-5 py-2 rounded-xl text-gray-300 font-medium border border-gray-800 hover:border-gray-700 hover:shadow-md transition"
          >
            {country.name}
          </span>
        ))}
      </div>
    </section>
  );
}
