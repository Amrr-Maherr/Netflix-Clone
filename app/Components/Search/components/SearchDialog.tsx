"use client";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";
import { ResultItem } from "../SearchComponent";

type Props = {
  query: string;
  setQuery: (value: string) => void;
  data?: ResultItem[];
  isLoading: boolean;
  isError: boolean;
};

export default function SearchDialog({
  query,
  setQuery,
  data,
  isLoading,
  isError,
}: Props) {
  return (
    <DialogContent className="sm:max-w-[900px] w-full bg-black/95 backdrop-blur-lg border border-white/10 z-[999] p-8 rounded-lg shadow-2xl max-h-[80vh] overflow-hidden">
      <DialogHeader className="mb-6">
        <DialogTitle className="text-white text-3xl font-bold">
          Search Netflix
        </DialogTitle>
        <DialogDescription className="text-gray-300 text-base">
          Find movies, TV shows, and more.
        </DialogDescription>
      </DialogHeader>

      <SearchInput query={query} setQuery={setQuery} />

      <SearchResults
        query={query}
        data={data}
        isLoading={isLoading}
        isError={isError}
      />

      <DialogFooter>
        <DialogClose className="mt-4 text-red-600 hover:text-red-500 cursor-pointer">
          Close
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
