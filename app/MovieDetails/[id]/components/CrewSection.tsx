import Slider from "@/app/Components/Slider/Slider";

export default function CrewSection({ crew }: { crew: any[] }) {
  const keyCrew = crew
    .filter((c) => ["Director", "Writer"].includes(c.job))
  if (!keyCrew.length) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Key Crew</h2>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"> */}
      <Slider>
        {keyCrew.map((member) => (
          <div
            key={member.credit_id}
            className="bg-gray-800 p-4 rounded-lg flex items-center gap-3"
          >
            <div className="bg-gray-700 rounded-full w-12 h-12 flex items-center justify-center">
              <span className="text-xl font-bold text-gray-400">
                {member.name.charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-semibold">{member.name}</p>
              <p className="text-sm text-gray-400">{member.job}</p>
            </div>
          </div>
        ))}
      </Slider>
      {/* </div> */}
    </section>
  );
}
