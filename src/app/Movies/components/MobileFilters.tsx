import { Button } from "@/components/ui/button";
import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { genreOptions, languageOptions, sortOptions } from "@/app/Data/FilterData";
import { ArrowUpDown, Film, Languages, Calendar, Star, X } from "lucide-react";

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
  // Data Arrays

  return (
    <div className="flex flex-col items-center justify-center md:hidden">
      <Drawer>
        <DrawerTrigger asChild>
          <Button className="w-full text-red-600 border-red-600 hover:bg-red-600 hover:text-white font-semibold">
            Open Filters
          </Button>
        </DrawerTrigger>
        <DrawerTitle></DrawerTitle>
        <DrawerContent className="p-6 bg-black text-white">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Filters</h2>
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
              size="sm"
              className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
            >
              <X size={16} className="mr-1" />
              Clear
            </Button>
          </div>

          {/* Filters Grid */}
          <div className="space-y-6">
            {/* Sort */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <ArrowUpDown size={16} />
                Sort By
              </label>
              <Select
                value={filters.sort}
                onValueChange={(value) =>
                  setFilters((prev) => ({ ...prev, sort: value }))
                }
              >
                <SelectTrigger className="w-full bg-[#222] border border-[#333] text-sm rounded-lg h-11">
                  <SelectValue placeholder="Choose sorting option..." />
                </SelectTrigger>
                <SelectContent className="bg-[#222] text-white border-0 max-h-60 overflow-y-auto">
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Genre */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <Film size={16} />
                Genre
              </label>
              <Select
                value={filters.genre}
                onValueChange={(value) =>
                  setFilters((prev) => ({ ...prev, genre: value }))
                }
              >
                <SelectTrigger className="w-full bg-[#222] border border-[#333] text-sm rounded-lg h-11">
                  <SelectValue placeholder="Select a genre..." />
                </SelectTrigger>
                <SelectContent className="bg-[#222] text-white border-0 max-h-60 overflow-y-auto">
                  {genreOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Language */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <Languages size={16} />
                Language
              </label>
              <Select
                value={filters.language}
                onValueChange={(value) =>
                  setFilters((prev) => ({ ...prev, language: value }))
                }
              >
                <SelectTrigger className="w-full bg-[#222] border border-[#333] text-sm rounded-lg h-11">
                  <SelectValue placeholder="Select a language..." />
                </SelectTrigger>
                <SelectContent className="bg-[#222] text-white border-0 max-h-60 overflow-y-auto">
                  {languageOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Year */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <Calendar size={16} />
                Release Year
              </label>
              <Input
                type="number"
                placeholder="e.g., 2023"
                value={filters.year}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, year: e.target.value }))
                }
                className="bg-[#222] border border-[#333] text-sm placeholder-gray-400 rounded-lg w-full h-11 px-3"
              />
            </div>

            {/* Rating */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <Star size={16} />
                Minimum Rating
              </label>
              <Input
                type="number"
                step="0.1"
                min="0"
                max="10"
                placeholder="e.g., 7.5"
                value={filters.rating}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, rating: e.target.value }))
                }
                className="bg-[#222] border border-[#333] text-sm placeholder-gray-400 rounded-lg w-full h-11 px-3"
              />
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
