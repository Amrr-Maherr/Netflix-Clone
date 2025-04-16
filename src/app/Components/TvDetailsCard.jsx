const imageBaseUrl = "https://image.tmdb.org/t/p/original";

export default function TvDetailsCard({ data }) {
  return (
    <>
      <div className="grid md:grid-cols-[1fr_1fr] grid-cols-[1fr] gap-10">
        {/* Movie Image Section */}
        <div className="movie-img">
          {data.backdrop_path ? (
            <img
              src={`${imageBaseUrl}${data.backdrop_path}`}
              alt={data.title}
              className="rounded-md shadow-md w-full h-auto"
            />
          ) : (
            <div className="bg-gray-800 rounded-md shadow-md">
              No Image Available
            </div>
          )}
          <p className="mt-5 text-gray-400">{data.tagline || "No Tagline"}</p>
        </div>

        {/* Movie Details Section */}
        <div className="movie-data text-left">
          {/* Rating & Vote Count */}
          <div className="relative text-white">
            <h3 className="text-4xl font-bold mb-4">{data.name}</h3>
          </div>
          <div className="flex items-center mb-2">
            <span className="mr-2">{data.vote_average}</span>
            <span>({data.vote_count} votes)</span>
          </div>

          {/* Movie Overview */}
          <p className="text-lg mb-4">{data.overview}</p>

          {/* Genres */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Genres:</h3>
            <ul className="flex flex-wrap gap-2">
              {data.genres &&
                data.genres.map((genre) => (
                  <li
                    key={genre.id}
                    className="bg-gray-800 rounded-full px-3 py-1 text-sm"
                  >
                    {genre.name}
                  </li>
                ))}
            </ul>
          </div>

          {/* Production Companies */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Production Companies:</h3>
            <ul>
              {data.production_companies &&
                data.production_companies.map((company) => (
                  <li key={company.id} className="text-gray-300">
                    {company.name}
                  </li>
                ))}
            </ul>
          </div>

          {/* Buttons for Actions */}
          <div className="flex space-x-4">
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Play
            </button>
            <button className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded">
              Add to List
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
