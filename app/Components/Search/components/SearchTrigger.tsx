"use client";

import { Search } from "lucide-react";
import { DialogTrigger } from "@/components/ui/dialog";

export default function SearchTrigger() {
  return (
    <DialogTrigger asChild>
      <div className="flex gap-5 ml-auto cursor-pointer">
        <Search className="text-white w-6 h-6" />
      </div>
    </DialogTrigger>
  );
}
