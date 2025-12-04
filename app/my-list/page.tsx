"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearList } from "../../Store/myListSlice";
import CardMovie from "../Components/CardMovie/CardMovie";
import CardTvShow from "../Components/CardTvShow/CardTvShow";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";

export default function MyList() {
  const myList = useSelector((state: any) => state.myList);
  const dispatch = useDispatch();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleClearAll = () => {
    setIsConfirmOpen(true);
  };

  const confirmClearAll = () => {
    dispatch(clearList());
    toast.success("All items removed from your list!");
    setIsConfirmOpen(false);
  };

  const cancelClearAll = () => {
    toast.error("Action canceled.");
    setIsConfirmOpen(false);
  };

  if (myList.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">My List</h1>
          <p className="text-gray-400">You haven't added any items to your list yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto mt-20">
        <div className="flex justify-end items-center ">
          <Button
            onClick={handleClearAll}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded cursor-pointer"
          >
            Clear All
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {myList.map((item: any) => {
            if (item.media_type === "movie") {
              return (
                <div key={item.id} className="relative">
                  <CardMovie movie={item} />
                </div>
              );
            } else if (item.media_type === "tv") {
              return (
                <div key={item.id} className="relative">
                  <CardTvShow TvShow={item} />
                </div>
              );
            }
            return null;
          })}
        </div>

        <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
          <DialogContent className="bg-black text-white border-gray-700">
            <DialogHeader>
              <DialogTitle>Clear All Items</DialogTitle>
            </DialogHeader>
            <p>
              Are you sure you want to remove all items from your list? This
              action cannot be undone.
            </p>
            <DialogFooter>
              <Button
                onClick={cancelClearAll}
                variant="outline"
                className="border-gray-600 text-gray-600"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmClearAll}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Clear All
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
