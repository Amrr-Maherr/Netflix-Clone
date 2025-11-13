import { Button } from "@/components/ui/button";
import React from "react";
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface Filters {
  sort: string;
  genre: string;
  language: string;
  year: string;
  rating: string;
}

type MobileFiltersProps = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  ClearFilter: () => void;
};

export default function MobileFilters({
  filters,
  setFilters,
  ClearFilter,
}: MobileFiltersProps) {
  return (
    <div className="flex flex-col items-center justify-center md:hidden">
      <Drawer>
        <DrawerTrigger asChild>
          <Button className="w-full text-red-600 border-red-600 hover:bg-red-600 hover:text-white font-semibold">
            Open Filters
          </Button>
        </DrawerTrigger>
        <DrawerTitle></DrawerTitle>
        <DrawerContent className="p-4 bg-[#141414] text-white">
          {/* Clear Button */}
          <Button
            disabled={
              !filters.sort &&
              !filters.genre &&
              !filters.language &&
              !filters.year &&
              !filters.rating
            }
            onClick={ClearFilter}
            className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-5 py-2 rounded-md font-semibold w-full mb-4 transition"
          >
            Clear Filters
          </Button>

          {/* Filters Grid */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {/* Sort */}
            <Select
              value={filters.sort}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, sort: value }))
              }
            >
              <SelectTrigger className="w-full bg-[#222] border border-[#333] text-sm rounded-md">
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent className="bg-[#222] text-white border-0">
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
              <SelectTrigger className="w-full bg-[#222] border border-[#333] text-sm rounded-md">
                <SelectValue placeholder="Choose Genre" />
              </SelectTrigger>
              <SelectContent className="bg-[#222] text-white border-0">
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
              <SelectTrigger className="w-full bg-[#222] border border-[#333] text-sm rounded-md">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent className="bg-[#222] text-white border-0">
                <SelectItem value="all">All Languages</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="ja">Japanese</SelectItem>
                <SelectItem value="ko">Korean</SelectItem>
              </SelectContent>
            </Select>

            {/* Year */}
            <input
              type="number"
              placeholder="Enter Year"
              value={filters.year}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, year: e.target.value }))
              }
              className="bg-[#222] border border-[#333] text-sm placeholder-gray-400 rounded-md w-full px-3 py-2"
            />

            {/* Rating */}
            <input
              type="number"
              step="0.1"
              min="0"
              max="10"
              placeholder="Min Rating (0–10)"
              value={filters.rating}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, rating: e.target.value }))
              }
              className="bg-[#222] border border-[#333] text-sm placeholder-gray-400 rounded-md w-full px-3 py-2"
            />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
