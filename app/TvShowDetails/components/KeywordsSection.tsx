"use client";

export default function KeywordsSection({ keywords }: { keywords: any[] }) {
  if (!keywords?.length) return null;

  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold mb-6">Tags</h2>
      <div className="flex flex-wrap gap-3">
        {keywords.map((kw) => (
          <span
            key={kw.id}
            className="bg-[#141414] px-4 py-2 rounded-xl text-gray-300 font-medium border border-gray-800 hover:border-gray-700 hover:shadow-md transition"
          >
            {kw.name}
          </span>
        ))}
      </div>
    </section>
  );
}
