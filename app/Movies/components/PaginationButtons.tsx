"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
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
        disabled={page === 1}
        className="flex items-center gap-2 px-6 py-3 text-lg font-semibold rounded-md
                   bg-red-600 hover:bg-red-700 
                   text-white transition-all duration-200 
                   shadow-md hover:shadow-lg 
                   disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
                   active:scale-95 order-2"
      >
        {isLoading ? "Loading..." : "Previous"}

        <ChevronRight size={22} />
      </Button>

      <Button
        onClick={LoadMore}
        className="flex items-center gap-2 px-6 py-3 text-lg font-semibold rounded-md
                   bg-red-600 hover:bg-red-700 
                   text-white transition-all duration-200 
                   shadow-md hover:shadow-lg cursor-pointer
                   active:scale-95 order-1"
      >
        <ChevronLeft size={22} />
        {isLoading ? "Loading..." : "Next"}
      </Button>
    </div>
  );
};

export default PaginationButtons;
