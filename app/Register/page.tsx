"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import bgImage from "../../public/EG-en-20250303-TRIFECTA-perspective_3241eaee-fd55-4a8b-bd9e-cd6c0058b093_small.jpg";
import NetflixLogo from "../../public/Netflix_Symbol_RGB.png";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { Inputs } from "../../Types/Inputs";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { registerUser } from "../../Api/Auth";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await registerUser(data.email, data.password);
      reset();
      router.push("/");
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
            <h1 className="text-3xl font-bold text-black">Sign Up</h1>
          </motion.div>

          <motion.form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input
                id="email"
                {...register("email", { required: "Email is required" })}
                type="email"
                placeholder="Email Address"
                className="text-black bg-gray-100 border-gray-300"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="relative">
              <Input
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                type={showPassword ? "text" : "password"}
                placeholder="Password (6+ characters)"
                className="text-black bg-gray-100 border-gray-300 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="relative">
              <Input
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value, formValues) =>
                    value === watch("password") || "Passwords do not match",
                })}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="text-black bg-gray-100 border-gray-300 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <motion.div variants={itemVariants} className="pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 w-full transition duration-150 ease-in-out"
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </Button>
            </motion.div>
          </motion.form>

          <motion.div variants={itemVariants} className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <Link
                className="font-semibold text-red-600 hover:underline"
                href="/Login"
              >
                Sign in now
              </Link>
              .
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
