"use client";

export default function ContentRatingSection({ ratings }: { ratings: any[] }) {
  const usRating = ratings?.find((r) => r.iso_3166_1 === "US");
  if (!usRating) return null;

  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold mb-6">Content Rating</h2>
      <span className="inline-block bg-[#141414] text-white px-5 py-2 rounded-xl font-semibold border border-gray-800 hover:border-gray-700 hover:shadow-md transition">
        {usRating.rating}
      </span>
    </section>
  );
}
