 "use client";

 import { useState } from "react";
 import { useSelector, useDispatch } from "react-redux";
 import { clearList } from "@/store/slices/myListSlice";
 import { Card } from "@/components/media/Card";
 import { Button } from "@/components/ui/button";
 import toast from "react-hot-toast";
 import type { RootState, MyListItem } from "@/types";
 import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogClose,
   DialogFooter,
 } from "@/components/ui/dialog";
 
 export default function MyList() {
   const myList = useSelector((state: RootState) => state.myList);
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
             className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg cursor-pointer"
           >
             Clear All
           </Button>
         </div>
         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
           {myList.map((item: MyListItem) => (
             <div key={item.id} className="relative">
               <Card
                 id={item.id}
                 type={item.media_type === "movie" ? "movie" : "tv"}
                 title={"title" in item ? item.title : item.name || ""}
                 posterUrl={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : null}
                 releaseDate={"release_date" in item ? item.release_date : undefined}
                 firstAirDate={"first_air_date" in item ? item.first_air_date : undefined}
                 rating={"vote_average" in item ? item.vote_average || 0 : 0}
                 genres={"genres" in item ? item.genres?.map((g: any) => g.name) || [] : []}
                 language={"original_language" in item ? item.original_language : undefined}
                 overview={"overview" in item ? item.overview : undefined}
               />
             </div>
           ))}
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
