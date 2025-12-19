"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import bgImage from "../../public/EG-en-20250303-TRIFECTA-perspective_3241eaee-fd55-4a8b-bd9e-cd6c0058b093_small.jpg";
import NetflixLogo from "../../public/Netflix_Symbol_RGB.png";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { Inputs } from "../Types/Inputs";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/Store/userSlice";
export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (data.password !== data.confirmPassword) {
      console.error("Passwords do not match");
      return;
    }
    alert("Registration is for UI demonstration only");
    reset();
  };
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

      {/* Netflix Logo */}
      {/* <div className="absolute top-5 left-5 z-20">
        <img src={NetflixLogo.src} alt="Netflix" className="w-20" />
      </div> */}

      {/* Form Container */}
      <div className="bg-black/90 rounded-lg shadow-ms w-full sm:w-3/4 md:w-1/2 lg:w-1/4 py-6 px-8 relative z-10 my-5">
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white text-start mt-4">
            Sign Up
          </h1>
        </motion.div>

        <motion.form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              id="email"
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="Email Address"
              className="shadow appearance-none border border-gray-300 rounded w-full py-3 px-4 text-black bg-white leading-tight focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type="password"
              placeholder="Password (6+ characters)"
              className="shadow appearance-none border border-gray-300 rounded w-full py-3 px-4 text-black bg-white leading-tight focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <input
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value, formValues) =>
                  value === watch("password") || "Passwords do not match",
              })}
              type="password"
              placeholder="Confirm Password"
              className="shadow appearance-none border border-gray-300 rounded w-full py-3 px-4 text-black bg-white leading-tight focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <motion.div variants={itemVariants} className="pt-4">
            <button
              className="bg-red-600 cursor-pointer hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 w-full transition duration-150 ease-in-out"
              type="submit"
            >
              Sign Up
            </button>
          </motion.div>


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
        </motion.div>
      </div>
    </motion.div>
  );
}
