import Slider from "@/app/Components/Slider/Slider";
import Image from "next/image";

export default function ProvidersSection({
  providers,
}: {
  providers: Record<string, any>;
}) {
  const flatrate = Object.values(providers)
    .flatMap((region: any) => region.flatrate || [])

  if (!flatrate.length) return null;

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Available On</h2>
      {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"> */}
      <Slider>
        {flatrate.map((p: any) => (
          <div
            key={p.provider_id}
            className="bg-gray-800 hover:bg-gray-700 p-4 rounded-lg flex flex-col items-center text-center transition transform hover:scale-105"
          >
            <Image
              src={`https://image.tmdb.org/t/p/original${p.logo_path}`}
              alt={p.provider_name}
              width={64}
              height={64}
              className="mb-2 rounded-md object-contain"
            />
            <span className="text-sm text-gray-300">{p.provider_name}</span>
          </div>
        ))}
      </Slider>
      {/* </div> */}
    </section>
  );
}
