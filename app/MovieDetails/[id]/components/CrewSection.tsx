import Image from "next/image";

export default function CrewSection({ crew }: { crew: any[] }) {
  const keyCrew = crew.filter((c) => ["Director", "Writer"].includes(c.job));
  if (!keyCrew.length) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Key Crew</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {keyCrew.map((member) => (
          <div
            key={member.credit_id}
            className="bg-zinc-900 rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:z-10 cursor-pointer shadow-md"
          >
            {member.profile_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w300${member.profile_path}`}
                alt={member.name}
                width={300}
                height={450}
                quality={75}
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
                {member.name}
              </p>
              <p className="text-xs text-gray-400 truncate">{member.job}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
