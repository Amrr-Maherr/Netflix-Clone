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
            ? review.author_details.avatar_path.startsWith("/")
              ? `https://image.tmdb.org/t/p/w200${review.author_details.avatar_path}`
              : review.author_details.avatar_path
            : "/default-avatar.png";

          return (
            <div
              key={review.id}
              className="bg-[#141414] rounded-2xl p-6 shadow-md border border-gray-800 hover:border-gray-700 transition flex flex-col justify-between"
            >
              {/* Author Info */}
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={avatarSrc}
                  alt={review.author}
                  width={60}
                  height={60}
                  className="rounded-full border border-gray-700 object-cover"
                  priority
                  quality={100}
                />
                <div className="flex flex-col">
                  <h3 className="text-lg font-semibold text-white">
                    {review.author}
                  </h3>
                  {review.author_details.name && (
                    <p className="text-gray-400 text-sm">
                      {review.author_details.name}
                    </p>
                  )}
                  <p className="text-gray-500 text-sm">
                    @{review.author_details.username}
                  </p>
                </div>
              </div>

              {/* Review Content */}
              <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-6">
                {review.content}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                {review.author_details.rating !== null ? (
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <span
                        key={i}
                        className={`w-3 h-3 inline-block rounded-full ${
                          i < review.author_details.rating
                            ? "bg-yellow-400"
                            : "bg-gray-700"
                        }`}
                      />
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-500 italic text-sm">
                    No rating
                  </span>
                )}
              </div>

              {/* Date */}
              <span className="text-gray-400 text-xs">
                {new Date(review.created_at).toLocaleDateString()}
              </span>

              {/* Link */}
              <a
                href={review.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500 text-sm mt-3 inline-block hover:underline"
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
