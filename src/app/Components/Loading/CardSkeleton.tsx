// app/Components/CardMovie/CardMovieSkeleton.tsx

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function CardSkeleton() {
  return (
    <div className="bg-black rounded overflow-hidden relative">
      <Skeleton className="w-full h-[225px] sm:h-[250px] md:h-[300px] rounded" />
      <div className="p-2 space-y-2">
        <Skeleton className="h-4 w-3/4" /> 
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-1/4" />
      </div>
    </div>
  );
}
