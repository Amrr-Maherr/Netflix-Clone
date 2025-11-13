import { Button } from "@/components/ui/button";
import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface Filters {
  sort: string;
  genre: string;
  language: string;
  year: string;
  rating: string;
}

type FiltersProps = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  ClearFilter: () => void;
};
export default function Filters({ filters, setFilters, ClearFilter }: FiltersProps) {
  return (
    <div className="items-center justify-center flex-wrap gap-4 hidden md:flex">
      <Button
        disabled={
          !filters.sort &&
          !filters.genre &&
          !filters.language &&
          !filters.year &&
          !filters.rating
        }
        onClick={ClearFilter}
        variant="outline"
        className="border border-red-600 cursor-pointer text-red-600 hover:bg-red-600 hover:text-white px-5 py-2 rounded-md font-semibold transition"
      >
        Clear
      </Button>
      {/* Sort */}
      <Select
        value={filters.sort}
        onValueChange={(value) =>
          setFilters((prev) => ({ ...prev, sort: value }))
        }
      >
        <SelectTrigger className="w-44 bg-zinc-800 border-zinc-700 text-sm">
          <SelectValue placeholder="Sort by..." />
        </SelectTrigger>
        <SelectContent className="bg-black text-white border-0">
          <SelectItem value="all">Popularity ↓</SelectItem>
          <SelectItem value="rating">Rating ↓</SelectItem>
          <SelectItem value="newest">Newest ↓</SelectItem>
        </SelectContent>
      </Select>

      {/* Genre */}
      <Select
        value={filters.genre}
        onValueChange={(value) =>
          setFilters((prev) => ({ ...prev, genre: value }))
        }
      >
        <SelectTrigger className="w-44 bg-zinc-800 border-zinc-700 text-sm">
          <SelectValue placeholder="Choose Genre" />
        </SelectTrigger>
        <SelectContent className="bg-black text-white border-0">
          <SelectItem value="all">All Genres</SelectItem>
          <SelectItem value="28">Action</SelectItem>
          <SelectItem value="35">Comedy</SelectItem>
          <SelectItem value="18">Drama</SelectItem>
          <SelectItem value="27">Horror</SelectItem>
          <SelectItem value="10749">Romance</SelectItem>
          <SelectItem value="878">Science Fiction</SelectItem>
        </SelectContent>
      </Select>

      {/* Language */}
      <Select
        value={filters.language}
        onValueChange={(value) =>
          setFilters((prev) => ({ ...prev, language: value }))
        }
      >
        <SelectTrigger className="w-44 bg-zinc-800 border-zinc-700 text-sm">
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent className="bg-black text-white border-0">
          <SelectItem value="all">All Languages</SelectItem>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="fr">French</SelectItem>
          <SelectItem value="es">Spanish</SelectItem>
          <SelectItem value="ja">Japanese</SelectItem>
          <SelectItem value="ko">Korean</SelectItem>
        </SelectContent>
      </Select>

      {/* Year */}
      <Input
        type="number"
        placeholder="Enter Year"
        value={filters.year}
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, year: e.target.value }))
        }
        className="bg-zinc-800 border-zinc-700 text-sm w-28 placeholder-gray-500"
      />

      {/* Rating */}
      <Input
        type="number"
        step="0.1"
        min="0"
        max="10"
        placeholder="Min Rating (0–10)"
        value={filters.rating}
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, rating: e.target.value }))
        }
        className="bg-zinc-800 border-zinc-700 text-sm w-36 placeholder-gray-500"
      />
    </div>
  );
}
