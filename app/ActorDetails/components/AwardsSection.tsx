"use client";

export default function AwardsSection({ awards }: { awards: string[] }) {
  if (!awards?.length) return null;

  return (
    <div className="bg-gray-900 rounded-xl p-6 mb-12">
      <h2 className="text-3xl font-bold text-white mb-4">
        Awards & Nominations
      </h2>
      <ul className="list-disc list-inside text-gray-300">
        {awards.map((award, i) => (
          <li key={i}>{award}</li>
        ))}
      </ul>
    </div>
  );
}
