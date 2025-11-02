export default function TrailerSection({ trailerUrl }: { trailerUrl: string }) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Official Trailer</h2>
      <div className="relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden shadow-2xl">
        <iframe
          src={trailerUrl}
          title="Trailer"
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
}
