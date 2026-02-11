"use client";

import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";

interface PaginationButtonsProps {
  LoadMore: () => void;
  LoadLess: () => void;
  isLoading: boolean;
  page: number;
}

const PaginationButtons: React.FC<PaginationButtonsProps> = ({
  LoadMore,
  LoadLess,
  isLoading,
  page,
}) => {
  return (
    <div className="flex items-center justify-center gap-2 my-12">
      <Button
        onClick={LoadLess}
        disabled={page === 1 || isLoading}
        className="flex items-center justify-center gap-1 px-4 py-2 text-sm font-medium rounded-sm
                   bg-zinc-800 hover:bg-zinc-700
                   text-white transition-colors duration-200
                   border border-zinc-700 hover:border-zinc-600
                   disabled:opacity-40 disabled:cursor-not-allowed
                   min-w-[100px]"
      >
        {isLoading ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <ChevronLeft size={16} />
        )}
        <span>Previous</span>
      </Button>

      <div className="flex items-center gap-1 px-4">
        <span className="text-sm text-zinc-400">Page</span>
        <span className="text-sm font-semibold text-white">{page}</span>
      </div>

      <Button
        onClick={LoadMore}
        disabled={isLoading}
        className="flex items-center justify-center gap-1 px-4 py-2 text-sm font-medium rounded-sm
                   bg-zinc-800 hover:bg-zinc-700
                   text-white transition-colors duration-200
                   border border-zinc-700 hover:border-zinc-600
                   disabled:opacity-40 disabled:cursor-not-allowed
                   min-w-[100px]"
      >
        <span>Next</span>
        {isLoading ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <ChevronRight size={16} />
        )}
      </Button>
    </div>
  );
};

export default PaginationButtons;
