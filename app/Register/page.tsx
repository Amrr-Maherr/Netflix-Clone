"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import bgImage from "../../public/EG-en-20250303-TRIFECTA-perspective_3241eaee-fd55-4a8b-bd9e-cd6c0058b093_small.jpg";
import Link from "next/link";

export default function Page() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.42, 0, 0.58, 1], // cubic-bezier
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.42, 0, 0.58, 1],
      },
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
            Sign Up
          </h1>
        </motion.div>

        <motion.form variants={itemVariants} className="space-y-4">
          <div>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email Address"
              className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-4 text-gray-100 bg-transparent bg-opacity-70 leading-tight focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
            />
          </div>

          <div>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password (6+ characters)"
              className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-4 text-gray-100 bg-transparent bg-opacity-70 leading-tight focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
            />
          </div>

          <div>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-4 text-gray-100 bg-transparent bg-opacity-70 leading-tight focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
            />
          </div>

          <motion.div variants={itemVariants} className="pt-4">
            <button
              className="bg-red-600 cursor-pointer hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 w-full transition duration-150 ease-in-out"
              type="button"
            >
              Sign Up
            </button>
          </motion.div>

          <div>
            <p className="text-center text-gray-400">OR</p>
          </div>

          <motion.div variants={itemVariants}>
            <button
              className="bg-[#33393D] cursor-pointer text-white font-normal py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 w-full transition duration-150 ease-in-out"
              type="button"
            >
              Use a Sign-In Code
            </button>
          </motion.div>

          <div className="flex items-center justify-center">
            <Link href="#" className="text-white underline">
              Forgot password?
            </Link>
          </div>
        </motion.form>

        <motion.div variants={itemVariants} className="mt-5 text-start">
          <p className="text-gray-400 text-[20px]">
            Already have an account?{" "}
            <Link
              className="font-semibold text-white hover:underline text-[20px]"
              href="/Login"
            >
              Sign in now
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
