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
    <DialogContent className="sm:max-w-[825px] w-full bg-black/90 backdrop-blur-md border-0 z-[999] p-6 rounded-md">
      <DialogHeader className="mb-4">
        <DialogTitle className="text-white text-2xl font-bold">
          Search
        </DialogTitle>
        <DialogDescription className="text-gray-400">
          Type to find movies, shows, or actors.
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
