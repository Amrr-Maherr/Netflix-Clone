"use client";

import { useState } from "react";

export default function Biography({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const toggle = () => setExpanded(!expanded);
  const shortText = text.slice(0, 400);

  return (
    <div className="rounded-lg pt-8 mb-12 shadow-2xl">
      <h2 className="text-4xl font-bold text-white mb-6">Biography</h2>
      <p className="text-gray-300 text-lg leading-relaxed">
        {expanded ? text : shortText + (text.length > 400 ? "..." : "")}
      </p>
      {text.length > 400 && (
        <button className="text-red-600 font-bold mt-3 cursor-pointer" onClick={toggle}>
          {expanded ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  );
}
