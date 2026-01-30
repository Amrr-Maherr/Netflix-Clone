"use client";

import { motion, Variants } from "framer-motion";
import bgImage from "../../public/EG-en-20250303-TRIFECTA-perspective_3241eaee-fd55-4a8b-bd9e-cd6c0058b093_small.jpg";
import NetflixLogo from "../../public/Netflix_Symbol_RGB.png";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { resetPassword } from "../../Api/Auth";
import Image from "next/image";

interface ForgotInputs {
  email: string;
}

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotInputs>();

  const onSubmit: SubmitHandler<ForgotInputs> = async (data) => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      await resetPassword(data.email);
      setMessage("Password reset email sent. Check your inbox.");
      reset();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Netflix Logo */}
        <div className="flex justify-center mb-8">
          <Image 
            src={NetflixLogo} 
            alt="Netflix" 
            width={128}
            height={128}
            quality={100}
            placeholder="blur"
            blurDataURL="/Netflix_Symbol_RGB.png"
            priority
            className="w-32" 
          />
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg">
          <motion.div variants={itemVariants} className="mb-6">
            <h1 className="text-3xl font-bold text-black">
              Forgot Password
            </h1>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            variants={itemVariants}
            className="space-y-4"
          >
            <div>
              <input
                id="email"
                {...register("email", { required: "Email is required" })}
                type="email"
                placeholder="Email Address"
                className="w-full py-3 px-4 text-black bg-gray-100 border border-gray-300 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}

            {message && (
              <p className="text-green-500 text-sm mt-2">{message}</p>
            )}

            <motion.div variants={itemVariants} className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-bold py-2 px-4 rounded-lg w-full transition duration-150"
              >
                {loading ? "Sending..." : "Send Reset Email"}
              </button>
            </motion.div>
          </motion.form>

          <motion.div variants={itemVariants} className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Remember your password?{" "}
              <Link
                className="font-semibold text-red-600 hover:underline"
                href="/Login"
              >
                Sign in
              </Link>
              .
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
