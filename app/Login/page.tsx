"use client";
import { motion, Variants } from "framer-motion";
import bgImage from "../../public/EG-en-20250303-TRIFECTA-perspective_3241eaee-fd55-4a8b-bd9e-cd6c0058b093_small.jpg";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { Inputs } from "../Types/Inputs";
// Import NextAuth
import { signIn, useSession} from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function Page() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    reset();
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 0.3, staggerChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.42, 0, 0.58, 1] },
    },
  };

  const { data: session, status } = useSession();
  const callbackUrl = process.env.NEXTAUTH_URL
    ? `https://${process.env.NEXTAUTH_URL}`
    : "http://localhost:3000";
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
      <div className="absolute inset-0 backdrop-blur-sm bg-black/20 z-0" />

      <div className="bg-black/80 rounded-lg shadow-ms w-full sm:w-3/4 md:w-1/2 lg:w-1/4 py-6 px-8 relative z-10 my-5">
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white text-start mt-4">
            Sign In
          </h1>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          variants={itemVariants}
          className="space-y-4"
        >
          {/* Email */}
          <div>
            <input
              id="email"
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="Email Address"
              className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-4 text-gray-100 bg-transparent bg-opacity-70 leading-tight focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
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
              className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-4 text-gray-100 bg-transparent bg-opacity-70 leading-tight focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit button */}
          <motion.div variants={itemVariants} className="pt-4">
            <button
              className="bg-red-600 cursor-pointer hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 w-full transition duration-150 ease-in-out"
              type="submit"
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

        {/* Google Sign In */}
        <motion.div variants={itemVariants} className="mt-6 text-center">
          <Button
            className="flex items-center cursor-pointer justify-center gap-2 bg-white text-gray-900 border border-gray-300 hover:bg-gray-100 font-medium py-2 px-4 rounded w-full transition duration-150 shadow-sm"
            onClick={() => signIn("google", { callbackUrl })}
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 533.5 544.3"
            >
              <path
                d="M533.5 278.4c0-17.2-1.4-34.1-4.2-50.5H272v95.5h146.9c-6.4 34.6-25.5 64-54.5 83.7v69.2h87.9c51.5-47.5 81.2-117.5 81.2-197.9z"
                fill="#4285F4"
              />
              <path
                d="M272 544.3c73.2 0 134.6-24.1 179.5-65.2l-87.9-69.2c-24.4 16.4-55.8 26-91.6 26-70.5 0-130.2-47.6-151.6-111.5H31.6v69.9c44.9 88.7 137.1 149 240.4 149z"
                fill="#34A853"
              />
              <path
                d="M120.4 324.4c-10.4-30.5-10.4-63.7 0-94.2v-69.9H31.6c-42.5 85-42.5 186.3 0 271.3l88.8-69.2z"
                fill="#FBBC05"
              />
              <path
                d="M272 107.6c38.6-.6 75.5 14.2 103.8 40.8l77.9-77.9C406.6 24.2 345.2 0 272 0 168.7 0 76.5 60.3 31.6 149l88.8 69.9C141.8 155.2 201.5 107.6 272 107.6z"
                fill="#EA4335"
              />
            </svg>
            Sign in with Google
          </Button>
        </motion.div>
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
