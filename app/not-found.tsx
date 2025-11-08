"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white text-center px-4">
      <motion.h1
        className="text-[8rem] font-extrabold text-red-600 leading-none"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        404
      </motion.h1>

      <motion.p
        className="text-xl md:text-2xl text-gray-300 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        The page you’re looking for has vanished into the Upside Down.
      </motion.p>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.7, type: "spring", stiffness: 120 }}
      >
        <Link
          href="/"
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
        >
          Go Back Home
        </Link>
      </motion.div>

      <p className="mt-10 text-sm text-gray-500">
        Netflix Clone © {new Date().getFullYear()}
      </p>
    </div>
  );
}
