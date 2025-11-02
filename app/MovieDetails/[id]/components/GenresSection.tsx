export default function GenresSection({ genres }: { genres: any[] }) {
  if (!genres?.length) return null;
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Genres</h2>
      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => (
          <span
            key={genre.id}
            className="px-4 py-2 bg-red-900/50 text-red-300 rounded-full text-sm font-medium"
          >
            {genre.name}
          </span>
        ))}
      </div>
    </section>
  );
}
