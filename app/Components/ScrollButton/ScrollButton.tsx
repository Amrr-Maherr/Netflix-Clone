"use client";
import React, { useEffect, useState } from "react";
import { MoveUp } from "lucide-react";
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
          initial={{ opacity: 0, y: 50, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.5 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white rounded-full p-3 shadow-lg cursor-pointer z-50"
        >
          <MoveUp />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
