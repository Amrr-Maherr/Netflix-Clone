import React from "react";
import { Search } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function SearchComponent() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="hidden md:flex gap-5 ml-auto cursor-pointer">
          <Search className="text-white w-6 h-6" />
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[825px] w-full bg-black/90 backdrop-blur-md border-0 z-999 p-6 rounded-md">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-white text-2xl font-bold">
            Search
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Type to find movies, shows, or actors.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <Input
            id="search"
            name="search"
            placeholder="Search for a movie, show, or actor..."
            className="w-full rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-red-600 focus:border-transparent text-lg p-4"
          />
        </div>

        <DialogFooter>
          <DialogClose className="mt-4 text-red-600 hover:text-red-500 cursor-pointer">
            Close
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
