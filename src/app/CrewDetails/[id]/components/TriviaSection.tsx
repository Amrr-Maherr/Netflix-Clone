"use client";

export default function TriviaSection({ trivia }: { trivia: string[] }) {
  if (!trivia?.length) return null;

  return (
    <div className="bg-gray-900 rounded-xl p-6 mb-12">
      <h2 className="text-3xl font-bold text-white mb-4">Trivia</h2>
      <ul className="list-disc list-inside text-gray-300">
        {trivia.map((fact, i) => (
          <li key={i}>{fact}</li>
        ))}
      </ul>
    </div>
  );
}
