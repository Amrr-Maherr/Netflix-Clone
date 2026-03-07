"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Tag } from "lucide-react";

interface Keyword {
  id: number;
  name: string;
}

interface KeywordsTagsProps {
  keywords: Keyword[];
  className?: string;
  maxTags?: number;
  clickable?: boolean;
}

export default function KeywordsTags({ 
  keywords, 
  className = "", 
  clickable = true 
}: KeywordsTagsProps) {
  const router = useRouter();

  if (!keywords?.length) return null;

  const handleTagClick = (keyword: Keyword) => {
    if (!clickable) return;
    
    // Navigate to search results with this keyword
    const searchQuery = encodeURIComponent(keyword.name);
    router.push(`/search?q=${searchQuery}`);
  };

  const displayKeywords = keywords

  return (
    <section className={`mb-8 ${className}`}>
      <h2 className="text-2xl font-bold mb-6">Keywords & Tags</h2>
      
      <div className="flex flex-wrap gap-2">
        {displayKeywords.map((keyword) => (
          <button
            key={keyword.id}
            onClick={() => handleTagClick(keyword)}
            className={`
              inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm
              transition-all duration-200
              ${
                clickable
                  ? "bg-gray-800 hover:bg-red-600 text-gray-300 hover:text-white border border-gray-700 hover:border-red-500 cursor-pointer"
                  : "bg-gray-800 text-gray-300 border border-gray-700 cursor-default"
              }
            `}
          >
            <Tag size={12} />
            {keyword.name}
          </button>
        ))}
        
      </div>
      
      {clickable && (
        <p className="text-xs text-gray-500 mt-2">
          Click on any tag to find similar content
        </p>
      )}
    </section>
  );
}
