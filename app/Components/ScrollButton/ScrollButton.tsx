"use client";
import React, { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollButton() {
  const [showGoTop, setShowGoTop] = useState(false);

  useEffect(() => {
    const handleVisibleButton = () => {
      const scrollPosition = window.scrollY;
      setShowGoTop(scrollPosition > 200);
    };

    window.addEventListener("scroll", handleVisibleButton);
    return () => window.removeEventListener("scroll", handleVisibleButton);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {showGoTop && (
        <motion.button
          key="scroll-btn"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ 
            duration: 0.3, 
            ease: "easeOut",
            scale: { type: "spring", stiffness: 300, damping: 25 }
          }}
          whileHover={{ 
            scale: 1.05,
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            transition: { duration: 0.2 }
          }}
          whileTap={{ 
            scale: 0.95,
            transition: { duration: 0.1 }
          }}
          className="fixed bottom-6 right-6 bg-black/60 backdrop-blur-sm hover:bg-black/80 text-white rounded-full p-3 shadow-xl cursor-pointer z-50 border border-white/20 transition-all duration-300 group"
          aria-label="Scroll to top"
        >
          <ChevronUp 
            size={20} 
            className="transition-transform duration-300 group-hover:translate-y-[-2px]" 
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
