import Slider from "@/app/Components/Slider/Slider";
import Image from "next/image";

export default function CrewSection({ crew }: { crew: any[] }) {
  if (!crew?.length) return null;

  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold mb-4">Crew</h2>
      <Slider>
        {crew.map((member) => (
          <div
            key={member.id + member.job}
            className="w-36 flex-shrink-0 bg-gray-900 rounded-2xl overflow-hidden hover:scale-105 transition-transform"
          >
            <div className="relative w-full h-48">
              <Image
                src={
                  member.profile_path
                    ? `https://image.tmdb.org/t/p/w300${member.profile_path}`
                    : "/placeholder-profile.jpg"
                }
                alt={member.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-2 text-center">
              <h3 className="text-sm font-semibold">{member.name}</h3>
              <p className="text-gray-400 text-xs">{member.job}</p>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
