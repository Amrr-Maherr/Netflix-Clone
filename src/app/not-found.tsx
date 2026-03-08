"use client";

import Link from "next/link";
// TODO: Framer Motion animation removed
// import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white text-center px-4">
      {/* TODO: Framer Motion animation removed - replaced motion.h1 with plain h1 */}
      <h1
        className="text-[8rem] font-extrabold text-red-600 leading-none"
        // TODO: Framer Motion animation removed - initial, animate, transition props removed
        // initial={{ opacity: 0, y: -50 }}
        // animate={{ opacity: 1, y: 0 }}
        // transition={{ duration: 0.8 }}
      >
        404
      </h1>

      {/* TODO: Framer Motion animation removed - replaced motion.p with plain p */}
      <p
        className="text-xl md:text-2xl text-gray-300 mb-8"
        // TODO: Framer Motion animation removed - initial, animate, transition props removed
        // initial={{ opacity: 0 }}
        // animate={{ opacity: 1 }}
        // transition={{ delay: 0.5, duration: 0.8 }}
      >
        The page you're looking for has vanished into the Upside Down.
      </p>

      {/* TODO: Framer Motion animation removed - replaced motion.div with plain div */}
      <div
        // TODO: Framer Motion animation removed - initial, animate, transition props removed
        // initial={{ scale: 0 }}
        // animate={{ scale: 1 }}
        // transition={{ delay: 0.7, type: "spring", stiffness: 120 }}
      >
        <Link
          href="/"
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
        >
          Go Back Home
        </Link>
      </div>

      <p className="mt-10 text-sm text-gray-500">
        Netflix Clone © {new Date().getFullYear()}
      </p>
    </div>
  );
}
