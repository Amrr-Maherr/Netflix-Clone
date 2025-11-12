"use client"
import React from "react";
import { motion } from "framer-motion";
import bgImage from "../../public/EG-en-20250303-TRIFECTA-perspective_3241eaee-fd55-4a8b-bd9e-cd6c0058b093_small.jpg";
import Link from "next/link";

export default function Page() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      style={{
        backgroundImage: `url(${bgImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="min-h-screen flex items-center justify-center relative pt-5 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Blur Overlay */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/20 z-0" />

      {/* Form Container */}
      <div className="bg-black/80 rounded-lg shadow-ms w-full sm:w-3/4 md:w-1/2 lg:w-1/4 py-6 px-8 relative z-10 my-5">
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white text-start mt-4">
            Sign In
          </h1>
        </motion.div>

        <motion.form variants={itemVariants} className="space-y-4">
          <div>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email or phone number"
              className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-4 text-gray-100 bg-transparent bg-opacity-70 leading-tight focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
            />
          </div>

          <div>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-4 text-gray-100 bg-transparent bg-opacity-70 leading-tight focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
            />
          </div>

          <motion.div variants={itemVariants} className="pt-4">
            <button
              className="bg-red-600 cursor-pointer hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 w-full transition duration-150 ease-in-out"
              type="button"
            >
              Sign In
            </button>
          </motion.div>

          <div className="flex items-center justify-between mt-2 text-gray-400 text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="accent-red-600 cursor-pointer"
              />
              Remember me
            </label>
            <a href="#" className="hover:underline">
              Need help?
            </a>
          </div>
        </motion.form>

        <motion.div variants={itemVariants} className="mt-8 text-start">
          <p className="text-gray-400 text-[18px]">
            New to Netflix?{" "}
            <Link
              className="font-semibold text-white hover:underline text-[18px]"
              href="/Register"
            >
              Sign up now
            </Link>
            .
          </p>
          <p className="text-gray-500 text-[15px] mt-4">
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot.{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Learn more.
            </a>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
