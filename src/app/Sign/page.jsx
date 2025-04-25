"use client";

import React from "react";
import { motion } from "framer-motion";
import Logo from "../../../public/Assets/netflix-3.svg";
import Image from "next/image";
import Link from "next/link";
import * as yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import Footer from "../Components/Footer/page";
import bgImage from "../../../public/Assets/EG-en-20250303-TRIFECTA-perspective_3241eaee-fd55-4a8b-bd9e-cd6c0058b093_small.jpg";

export default function Signup() {
  const router = useRouter();
  const handelSignup = (values, { setSubmitting }) => {
    // Destructure setSubmitting from formik helpers
    localStorage.setItem("userInfo", JSON.stringify(values)); // Use values directly from onSubmit handler
    console.log("Signup successful, redirecting..."); // Add console log for feedback
    setTimeout(() => {
      router.push("/Login");
      // setSubmitting(false); // Re-enable button if needed after navigation, though often not necessary
    }, 1000);
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),

    password: yup
      .string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),

    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match") // Simplified oneOf, null is usually not needed here
      .required("Confirm password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: handelSignup,
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
        }} // Adjusted style
        className="min-h-screen flex items-center justify-center relative" // Added relative
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
              width={200} // Slightly larger logo for signup maybe? Optional.
              height={50}
              className="mx-auto"
              priority // Added priority
            />
            <h1 className="text-3xl font-bold text-white mt-4">Sign Up</h1>{" "}
            {/* Added Title */}
          </motion.div>
          {/* Signup Form */}
          <motion.form
            onSubmit={formik.handleSubmit}
            variants={itemVariants}
            className="space-y-4" // Reduced space between elements slightly
          >
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-gray-300 text-sm font-bold mb-2 sr-only" // Hide label visually but keep for screen readers
              >
                Email Address
              </label>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur} // Add onBlur for touched state
                value={formik.values.email}
                id="email"
                name="email"
                type="email"
                placeholder="Email Address"
                className={`shadow appearance-none border ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : "border-gray-700"
                } rounded w-full py-3 px-4 text-gray-100 bg-gray-700 bg-opacity-70 leading-tight focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent`} // Adjusted styling and error border
              />
              {/* Error message */}
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-xs mt-1 px-1">
                  {" "}
                  {/* Adjusted styling */}
                  {formik.errors.email}
                </div>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-gray-300 text-sm font-bold mb-2 sr-only" // Hide label
              >
                Password
              </label>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur} // Add onBlur
                value={formik.values.password}
                id="password"
                name="password"
                type="password"
                placeholder="Password (6+ characters)" // Added hint
                className={`shadow appearance-none border ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : "border-gray-700"
                } rounded w-full py-3 px-4 text-gray-100 bg-gray-700 bg-opacity-70 leading-tight focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent`} // Adjusted styling and error border
              />
              {/* Error message */}
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-xs mt-1 px-1">
                  {" "}
                  {/* Adjusted styling */}
                  {formik.errors.password}
                </div>
              )}
            </div>

            {/* Confirm Password Input */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-gray-300 text-sm font-bold mb-2 sr-only" // Hide label
              >
                Confirm Password
              </label>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur} // Add onBlur
                value={formik.values.confirmPassword}
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className={`shadow appearance-none border ${
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? "border-red-500"
                    : "border-gray-700"
                } rounded w-full py-3 px-4 text-gray-100 bg-gray-700 bg-opacity-70 leading-tight focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent`} // Adjusted styling and error border
              />
              {/* Error message */}
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <div className="text-red-500 text-xs mt-1 px-1">
                    {" "}
                    {/* Adjusted styling */}
                    {formik.errors.confirmPassword}
                  </div>
                )}
            </div>

            {/* Sign Up Button */}
            <motion.div variants={itemVariants} className="pt-4">
              {" "}
              {/* Added padding top */}
              <button
                className="bg-red-600 cursor-pointer hover:bg-red-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 w-full transition duration-150 ease-in-out" // Adjusted styling and added disabled state
                type="submit"
                disabled={
                  formik.isSubmitting || !formik.isValid || !formik.dirty
                } // Disable if submitting, invalid, or pristine
              >
                {formik.isSubmitting ? "Signing Up..." : "Sign Up"}
              </button>
            </motion.div>
          </motion.form>
          {/* Already Have an Account */}
          <motion.div variants={itemVariants} className="mt-10 text-center">
            {" "}
            {/* Adjusted margin */}
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link
                className="font-semibold text-white hover:underline" // Adjusted styling
                href="/Login"
              >
                Sign in now
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
