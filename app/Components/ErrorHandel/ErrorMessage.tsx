// app/Components/ErrorMessage/ErrorMessage.tsx

"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

type ErrorMessageProps = {
  message?: string;
  onRetry?: () => void; // optional: callback for "Retry" button
};

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 space-y-4 h-screen">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-600/20">
        <AlertTriangle className="text-red-600 w-8 h-8" />
      </div>

      <div>
        <h2 className="text-lg font-semibold text-white">
          Something went wrong
        </h2>
        <p className="text-gray-400 mt-2">
          {message || "An error occurred while loading data. Please try again."}
        </p>
      </div>

      {onRetry && (
        <Button
          onClick={onRetry}
          className="mt-4 bg-red-600 hover:bg-red-700 text-white cursor-pointer"
        >
          Retry
        </Button>
      )}
    </div>
  );
}
