export default function OverviewSection({ overview }: { overview: string }) {
  if (!overview) return null;
  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-bold mb-4">Overview</h2>
      <p className="text-gray-300 leading-relaxed text-lg">{overview}</p>
    </section>
  );
}
