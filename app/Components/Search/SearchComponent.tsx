"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import FetchMultiSearch from "@/Api/FetchMultiSearch";
import { Dialog } from "@/components/ui/dialog";
import SearchTrigger from "./components/SearchTrigger";
import SearchDialog from "./components/SearchDialog";

export type ResultItem = {
  id: number;
  media_type: "movie" | "tv" | "person";
  title?: string;
  name?: string;
  poster_path?: string;
  profile_path?: string;
  release_date?: string;
  first_air_date?: string;
};

export default function SearchComponent() {
  const [query, setQuery] = useState<string>("");

  const { data, isLoading, isError } = useQuery<ResultItem[]>({
    queryKey: ["Search", query],
    queryFn: () => FetchMultiSearch({ query }),
    enabled: !!query,
    retry: 1,
  });

  return (
    <Dialog>
      <SearchTrigger />
      <SearchDialog
        query={query}
        setQuery={setQuery}
        data={data}
        isLoading={isLoading}
        isError={isError}
      />
    </Dialog>
  );
}
