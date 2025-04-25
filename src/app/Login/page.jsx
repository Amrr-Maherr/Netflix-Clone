"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Logo from "../../../public/Assets/netflix-3.svg";
import Image from "next/image";
import Link from "next/link";
import { useFormik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import Footer from "../Components/Footer/page";
import bgImage from "../../../public/Assets/EG-en-20250303-TRIFECTA-perspective_3241eaee-fd55-4a8b-bd9e-cd6c0058b093_small.jpg";

export default function Login() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState(null);
  const handelLogin = () => {
    const { email, password } = formik.values;
    if (
      !userInfo ||
      userInfo.email !== email ||
      userInfo.password !== password
    ) {
      // Added check for userInfo existence
      console.log("Invalid credentials or user info not found");
      // Optionally: Show an error message to the user
    } else {
      console.log("Login successful");
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
  };

  useEffect(
    () => setUserInfo(JSON.parse(localStorage.getItem("userInfo")) || null), // Set to null if not found
    []
  );

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),

    password: yup
      .string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handelLogin,
    validationSchema: validationSchema,
  });

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
    <>
      <motion.div
        style={{
          backgroundImage: `url(${bgImage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }} // Adjusted style for better background handling
        className="min-h-screen flex items-center justify-center relative" // Added relative positioning if needed for absolute elements later
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Optional: Add a darker overlay to the entire background for better contrast */}
        {/* <div className="absolute inset-0 bg-black bg-opacity-40 z-0"></div> */}

        {/* Form Container */}
        <div className="bg-black bg-opacity-80 rounded-lg shadow-xl w-full sm:w-3/4 md:w-1/2 lg:w-1/3 py-10 px-8 relative z-10 my-5">
          {" "}
          {/* Added bg-black bg-opacity-80 and z-10 */}
          {/* Logo */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <Image
              src={Logo}
              alt="Netflix Logo"
              width={200}
              height={50}
              className="mx-auto"
              priority // Added priority for LCP element
            />
          </motion.div>
          {/* Login Form */}
          <motion.form
            onSubmit={formik.handleSubmit}
            variants={itemVariants}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-gray-300 text-sm font-bold mb-2"
              >
                Email Address
              </label>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                id="email"
                name="email"
                type="email"
                placeholder="Email Address"
                className="shadow appearance-none border border-gray-700 rounded w-full py-3 px-4 text-gray-100 bg-gray-700 bg-opacity-70 leading-tight focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent" // Adjusted input styling for better contrast/focus
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm mt-1">
                  {" "}
                  {/* Reduced margin */}
                  {formik.errors.email}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-gray-300 text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                className="shadow appearance-none border border-gray-700 rounded w-full py-3 px-4 text-gray-100 bg-gray-700 bg-opacity-70 leading-tight focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent" // Adjusted input styling
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm mt-1">
                  {" "}
                  {/* Reduced margin */}
                  {formik.errors.password}
                </div>
              )}
            </div>

            {/* Remember Me & Help */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-400 hover:text-gray-200 cursor-pointer">
                <input
                  type="checkbox"
                  name="remember"
                  className="mr-2 accent-gray-500"
                />{" "}
                Remember me
              </label>
              <Link
                className="inline-block align-baseline font-normal text-gray-400 hover:text-gray-200 hover:underline" // Adjusted styling
                href="/Needhelp"
              >
                Need help?
              </Link>
            </div>

            {/* Sign In Button */}
            <motion.div variants={itemVariants}>
              <button
                className="bg-red-600 cursor-pointer hover:bg-red-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 w-full transition duration-150 ease-in-out" // Adjusted styling
                type="submit"
                disabled={formik.isSubmitting} // Disable button while submitting
              >
                {formik.isSubmitting ? "Signing In..." : "Sign In"}
              </button>
            </motion.div>
          </motion.form>
          {/* Sign Up */}
          <motion.div variants={itemVariants} className="mt-12 text-center">
            {" "}
            {/* Increased margin */}
            <p className="text-gray-400">
              New to Movie API Netflix?{" "}
              <Link
                className="font-bold text-white hover:underline" // Adjusted styling
                href="/Sign"
              >
                Sign up now
              </Link>
              .
            </p>
            {/* Optional: Recaptcha text */}
            <p className="text-gray-500 text-xs mt-4">
              This page is protected by Google reCAPTCHA to ensure you're not a
              bot.{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Learn more.
              </a>
            </p>
          </motion.div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
}
