export default function TrailerSection({ trailerUrl }: { trailerUrl: string }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">Official Trailer</h2>
      <div
        className="
          relative w-full rounded-xl overflow-hidden shadow-2xl
          aspect-video sm:aspect-[4/3] md:aspect-[16/9]
        "
      >
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
