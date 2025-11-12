"use client";

import { ResultItem } from "../SearchComponent";
import SearchResultItem from "./SearchResultItem";

type Props = {
  query: string;
  data?: ResultItem[];
  isLoading: boolean;
  isError: boolean;
};

export default function SearchResults({
  query,
  data,
  isLoading,
  isError,
}: Props) {
  return (
    <div className="mt-6 max-h-96 overflow-y-auto scrollbar-custom">
      {isLoading ? (
        <p className="text-gray-400">Loading...</p>
      ) : isError ? (
        <p className="text-red-400">Something went wrong. Please try again.</p>
      ) : data && data.length > 0 ? (
        data.map((item) => <SearchResultItem key={item.id} item={item} />)
      ) : query ? (
        <p className="text-gray-400">No results found.</p>
      ) : (
        <p className="text-gray-400">Start typing to search.</p>
      )}
    </div>
  );
}
