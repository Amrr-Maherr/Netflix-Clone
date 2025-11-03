"use client";

import Slider from "@/app/Components/Slider/Slider";
import Image from "next/image";

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
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-6">Reviews</h2>

      <Slider
        slidesPerView={3}
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

          // Fix: ensure rating is a number
          const rating = review.author_details.rating ?? 0;

          return (
            <div
              key={review.id}
              className="bg-gray-900 rounded-xl p-6 shadow-md border border-gray-800 hover:border-gray-700 transition flex flex-col justify-between"
            >
              {/* Author Info */}
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={avatarSrc}
                  alt={review.author}
                  width={50}
                  height={50}
                  className="rounded-full border border-gray-700"
                  priority
                  quality={100}
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
                  <p className="text-sm text-gray-400">
                    @{review.author_details.username}
                  </p>
                </div>
              </div>

              {/* Review Content */}
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                {review.content.length > 500
                  ? review.content.slice(0, 500) + "..."
                  : review.content}
              </p>

              {/* Netflix-style Rating */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 10 }).map((_, i) => (
                  <span
                    key={i}
                    className={`w-3 h-3 inline-block rounded-full ${
                      i < rating ? "bg-yellow-400" : "bg-gray-700"
                    }`}
                  />
                ))}
              </div>

              {/* Date */}
              <span className="text-gray-400 text-sm mb-2">
                {new Date(review.created_at).toLocaleDateString()}
              </span>

              {/* Link to full review */}
              <a
                href={review.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 text-sm mt-2 inline-block hover:underline"
              >
                Read full review →
              </a>
            </div>
          );
        })}
      </Slider>
    </section>
  );
}
