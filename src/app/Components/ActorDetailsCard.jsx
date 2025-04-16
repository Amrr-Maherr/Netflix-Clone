  const imageBaseUrl = "https://image.tmdb.org/t/p/original";
export default function ActorDetailsCard({ actor }) {
    return (
      <>
        <div className="relative text-center text-white mb-10">
          <h3 className="relative text-6xl font-bold">{actor.title}</h3>
        </div>
        <div className="grid md:grid-cols-[1fr_1fr] grid-cols-[1fr] gap-10">
          <div className="actor-img">
            {actor.profile_path ? (
              <img
                src={`${imageBaseUrl}${actor.profile_path}`}
                alt={actor.name}
                className="rounded-md shadow-md w-full h-auto"
              />
            ) : (
              <div className="bg-gray-800 rounded-md shadow-md">
                No Image Available
              </div>
            )}
          </div>
          <div className="actor-data text-left">
            <h2 className="text-4xl font-bold mb-4">{actor.name}</h2>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Biography:</h3>
              <p className="text-gray-300">{actor.biography}</p>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Key Information:</h3>
              <ul className="list-none space-y-2">
                <li>
                  <span className="font-semibold text-red-400">Known For:</span>{" "}
                  <span className="text-gray-300">
                    {actor.known_for_department}
                  </span>
                </li>
                {actor.birthday && (
                  <li>
                    <span className="font-semibold text-red-400">
                      Birthday:
                    </span>{" "}
                    <span className="text-gray-300">{actor.birthday}</span>
                  </li>
                )}
                {actor.place_of_birth && (
                  <li>
                    <span className="font-semibold text-red-400">
                      Place of Birth:
                    </span>{" "}
                    <span className="text-gray-300">
                      {actor.place_of_birth}
                    </span>
                  </li>
                )}
              </ul>
            </div>

            {actor.also_known_as && actor.also_known_as.length > 0 && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Also Known As:</h3>
                <div className="flex flex-wrap gap-2">
                  {actor.also_known_as.map((name, index) => (
                    <span
                      key={index}
                      className="bg-gray-800 text-gray-300 rounded-full px-3 py-1 text-sm"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {actor.homepage && (
              <a
                href={actor.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 px-4 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700"
              >
                Visit Homepage
              </a>
            )}
          </div>
        </div>
      </>
    );
}