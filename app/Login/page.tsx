"use client";

import { motion, Variants } from "framer-motion";
import bgImage from "../../public/EG-en-20250303-TRIFECTA-perspective_3241eaee-fd55-4a8b-bd9e-cd6c0058b093_small.jpg";
import NetflixLogo from "../../public/Netflix_Symbol_RGB.png";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { Inputs } from "../Types/Inputs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { loginUser } from "../../Api/Auth";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    setError(null);
    try {
      await loginUser(data.email, data.password);
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

      {/* Netflix Logo */}
      {/* <div className="absolute top-5 left-5 z-20">
        <img src={NetflixLogo.src} alt="Netflix" className="w-20" />
      </div> */}

      <div className="bg-black/90 rounded-lg shadow-ms w-full sm:w-3/4 md:w-1/2 lg:w-1/4 py-6 px-8 relative z-10 my-5">
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
            <Input
              id="email"
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="Email Address"
              className="text-black bg-white"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
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
              className="text-black bg-white pr-12"
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

          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}

          {/* Submit */}
          <motion.div variants={itemVariants} className="pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-bold py-2 px-4 rounded-lg w-full transition duration-150"
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </motion.div>
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
          <p className="text-gray-400 text-[18px] mt-2">
            <Link
              className="font-semibold text-white hover:underline text-[18px]"
              href="/ForgotPassword"
            >
              Forgot your password?
            </Link>
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
