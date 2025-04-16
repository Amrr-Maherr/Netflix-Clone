import Navbar from "./Navbar";

const imageBaseUrl = "https://image.tmdb.org/t/p/original";
export default function MovieDetailsCard({ data }) {
    return (
      <>
        <Navbar/>
        <div className="grid md:grid-cols-[1fr_1fr] grid-cols-[1fr] gap-10">
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
            <p className="mt-5 text-gray-400">{data.tagline}</p>
          </div>
          <div className="movie-data text-left">
            <h2 className="text-4xl font-bold mb-4">{data.title}</h2>
            <div className="flex items-center mb-2">
              <span className="mr-2">{data.vote_average}</span>
              <span>({data.vote_count} votes)</span>
            </div>
            <p className="text-lg mb-4">{data.overview}</p>
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
            <div className="mb-4">
              <p>Release Date: {data.release_date}</p>
              <p>Runtime: {data.runtime} minutes</p>
            </div>
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