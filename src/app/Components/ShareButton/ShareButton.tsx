"use client";

import React, { useState } from "react";
import { Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import "./styles.css";

interface ShareButtonProps {
  url?: string;
  title?: string;
  description?: string;
  className?: string;
}

export default function ShareButton({ 
  url, 
  title = "Netflix Clone", 
  description = "Watch amazing movies and TV shows", 
  className = "" 
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleShare = async () => {
    const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
    const shareData = {
      title: title,
      text: description,
      url: shareUrl,
    };

    try {
      // Try Web Share API first (mobile devices)
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // Fallback to copying URL to clipboard
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      console.error("Error sharing:", error);
      // Fallback to copying URL to clipboard if Web Share API fails
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (clipboardError) {
        console.error("Error copying to clipboard:", clipboardError);
      }
    }
  };

  // Animate button on mount
  React.useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Button
      onClick={handleShare}
      className={`
        relative overflow-hidden group
        bg-white/10 backdrop-blur-md hover:bg-white/20
        border border-white/20 hover:border-white/30
        text-white font-medium
        px-4 py-2 sm:px-6 sm:py-3
        rounded-lg
        transition-all duration-300 ease-out
        hover:scale-105
        active:scale-95
        focus:outline-none
        focus:ring-2 focus:ring-white/50
        focus:ring-offset-2 focus:ring-offset-transparent
        ${isAnimating ? 'animate-fadeInUp' : ''}
        ${className}
      `}
    >
      {/* Gradient overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {copied ? (
          <>
            <Check size={16} className="text-green-400" />
            <span className="text-green-400">Link copied!</span>
          </>
        ) : (
          <>
            <Share2 size={16} className="text-white" />
            <span className="text-white hidden sm:inline">Share</span>
          </>
        )}
      </span>
      
      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
    </Button>
  );
}
