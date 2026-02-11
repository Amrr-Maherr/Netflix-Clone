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
    <div className="flex items-center justify-center gap-6 my-10">
      <Button
        onClick={LoadLess}
        disabled={page === 1 || isLoading}
        className="flex items-center gap-2 px-6 py-3 text-lg font-semibold rounded-md
                   bg-red-600 hover:bg-red-700
                   text-white transition-all duration-200
                   shadow-md hover:shadow-lg
                   disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
                   active:scale-95"
      >
        {isLoading ? (
          <Loader2 size={22} className="animate-spin" />
        ) : (
          <ChevronLeft size={22} />
        )}
        {isLoading ? "Loading..." : "Previous"}
      </Button>

      <span className="px-4 py-2 bg-gray-800 text-white rounded-md font-semibold">
        Page {page}
      </span>

      <Button
        onClick={LoadMore}
        disabled={isLoading}
        className="flex items-center gap-2 px-6 py-3 text-lg font-semibold rounded-md
                   bg-red-600 hover:bg-red-700
                   text-white transition-all duration-200
                   shadow-md hover:shadow-lg cursor-pointer
                   disabled:opacity-50 disabled:cursor-not-allowed
                   active:scale-95"
      >
        {isLoading ? "Loading..." : "Next"}
        {isLoading ? (
          <Loader2 size={22} className="animate-spin" />
        ) : (
          <ChevronRight size={22} />
        )}
      </Button>
    </div>
  );
};

export default PaginationButtons;
