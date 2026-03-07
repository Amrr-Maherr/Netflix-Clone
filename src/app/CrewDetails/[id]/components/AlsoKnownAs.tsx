"use client";

export default function AlsoKnownAs({ names }: { names: string[] }) {
  if (!names?.length) return null;

  return (
    <section className="py-8 sm:py-10">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
        Also Known As
      </h2>
      <div className="flex flex-wrap gap-3 sm:gap-4">
        {names.map((name, i) => (
          <span
            key={i}
            className="bg-[#141414] px-4 py-2 rounded-xl text-gray-300 font-medium border border-gray-800 hover:border-gray-700 hover:shadow-md transition duration-300 cursor-pointer"
          >
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}
