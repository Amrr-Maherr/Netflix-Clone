"use client";
import Slider from "@/app/Components/Slider/Slider";
import Image from "next/image";
import { Star } from "lucide-react";
import { useState } from "react";
import { useVisibleSlidesCount } from "@/lib/useVisibleSlidesCount";

interface AuthorDetails {
  name: string;
  username: string;
  avatar_path: string | null;
  rating: number | null;
}

interface Review {
  id: string;
  author: string;
  author_details: AuthorDetails;
  content: string;
  created_at: string;
  url: string;
}

export default function ReviewsSection({ reviews }: { reviews: Review[] }) {
  const slidesCount = useVisibleSlidesCount();

  if (!reviews?.length) return null;

  return (
    <section className="space-y-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
        Reviews
      </h2>

      <Slider
        slidesPerView={slidesCount}
        slidesPerViewMobile={1.2}
        spaceBetween={16}
      >
        {reviews.map((review) => {
          const avatarSrc = review.author_details.avatar_path
            ? review.author_details.avatar_path.startsWith("/https")
              ? review.author_details.avatar_path.slice(1)
              : `https://image.tmdb.org/t/p/w200${review.author_details.avatar_path}`
            : "/Netflix_Symbol_RGB.png";

          const rating = review.author_details.rating ?? 0;

          return (
            <div
              key={review.id}
              className="relative bg-zinc-900 rounded-sm overflow-hidden cursor-pointer group transition-all duration-300 hover:scale-105 hover:z-10 flex flex-col h-full"
            >
              {/* Content */}
              <div className="p-4 flex flex-col h-full justify-between">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <Image
                    src={avatarSrc}
                    alt={review.author}
                    width={40}
                    height={40}
                    className="rounded-full border border-gray-700 object-cover"
                    priority
                    quality={100}
                    placeholder="blur"
                    blurDataURL="/Netflix_Symbol_RGB.png"
                  />
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-white truncate">
                      {review.author}
                    </h3>
                    {review.author_details.name && (
                      <p className="text-xs text-gray-400 truncate">
                        {review.author_details.name}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 truncate">
                      @{review.author_details.username}
                    </p>
                  </div>
                </div>

                {/* Review Content */}
                <div className="my-3 flex-1">
                  <p className="text-gray-300 text-sm leading-relaxed line-clamp-5">
                    {review.content}
                  </p>
                </div>

                {/* Rating + Date + Link */}
                <div className="mt-auto pt-3">
                  {rating > 0 && (
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="text-yellow-400 w-4 h-4 fill-yellow-400" />
                      <span className="text-gray-300 text-xs font-medium">
                        {rating.toFixed(1)}/10
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>
                      {new Date(review.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                    <a
                      href={review.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors font-medium"
                    >
                      Read full →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </section>
  );
}
