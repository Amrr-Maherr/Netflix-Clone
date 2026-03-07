"use client";

import { Input } from "@/components/ui/input";

type Props = {
  query: string;
  setQuery: (value: string) => void;
};

export default function SearchInput({ query, setQuery }: Props) {
  return (
    <div className="mt-4">
      <Input
        id="search"
        name="search"
        placeholder="Search for a movie, show, or actor..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full rounded-lg bg-gray-800 text-white placeholder-gray-400 
                   focus:ring-2 focus:ring-red-600 focus:border-transparent text-lg p-4"
      />
    </div>
  );
}
