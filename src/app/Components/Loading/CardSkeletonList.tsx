import React from 'react'
import CardSkeleton from './CardSkeleton';

type CardSkeletonListProps = {
  isLoading:boolean
};

export default function CardSkeletonList({ isLoading }: CardSkeletonListProps) {
    if (isLoading) {
         return (
           <section className='container py-5'>
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 sm:gap-6 md:gap-8">
               {Array.from({ length: 10 }).map((_, i) => (
                 <CardSkeleton key={i} />
               ))}
             </div>
           </section>
         );
    }
}
