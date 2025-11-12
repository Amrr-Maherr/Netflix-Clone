"use client";

import Slider from "@/app/Components/Slider/Slider";
import Image from "next/image";
import { Star } from "lucide-react";

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
  if (!reviews?.length) return null;

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-6 text-white tracking-wide">
        Reviews
      </h2>

      <Slider
        slidesPerView={4}
        slidesPerViewMobile={1.2}
        spaceBetween={20}
        swiperOptions={{
          autoplay: { delay: 5000 },
          loop: true,
        }}
      >
        {reviews.map((review) => {
          const avatarSrc = review.author_details.avatar_path
            ? review.author_details.avatar_path.startsWith("/https")
              ? review.author_details.avatar_path.slice(1)
              : `https://image.tmdb.org/t/p/w200${review.author_details.avatar_path}`
            : "/default-avatar.png";

          const rating = review.author_details.rating ?? 0;

          return (
            <div
              key={review.id}
              className=" relative bg-[#141414]/90 backdrop-blur-lg rounded-2xl overflow-hidden border border-neutral-800 transition-all duration-500 h-auto flex flex-col justify-between"
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative z-10 p-6 flex flex-col h-full justify-between">
                {/* Header */}
                <div className="flex items-center gap-4">
                  <Image
                    src={avatarSrc}
                    alt={review.author}
                    width={60}
                    height={60}
                    className="rounded-full border border-gray-700 shadow-lg"
                    priority
                    quality={75}
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-red-500">
                      {review.author}
                    </h3>
                    {review.author_details.name && (
                      <p className="text-sm text-gray-400">
                        {review.author_details.name}
                      </p>
                    )}
                    <p className="text-xs text-gray-500">
                      @{review.author_details.username}
                    </p>
                  </div>
                </div>

                {/* Review Content */}
                <div className="flex-1 mt-5 overflow-hidden">
                  <p className="text-gray-300 text-sm leading-relaxed line-clamp-9">
                    {review.content}
                  </p>
                </div>

                {/* Rating + Date + Link */}
                <div className="mt-6 flex flex-col gap-2">
                  {rating > 0 && (
                    <div className="flex items-center gap-1">
                      <Star className="text-yellow-400 w-4 h-4 fill-yellow-400" />
                      <span className="text-gray-300 text-sm font-medium">
                        {rating.toFixed(1)}/10
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                    <a
                      href={review.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-500 hover:text-red-400 transition-colors font-medium"
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
