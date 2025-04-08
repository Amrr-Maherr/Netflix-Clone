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
export default function Login() {
      const router = useRouter();
  const [userInfo, setUserInfo] = useState(null);
  const handelLogin = () => {
    const { email, password } = formik.values;
    if (userInfo.email !== email || userInfo.password !== password) {
      console.log("Invalid credentials");
    } else {
      console.log("Login successful");
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
  };
  useEffect(
    () => setUserInfo(JSON.parse(localStorage.getItem("userInfo")) || []),
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
        className="min-h-screen flex items-center justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-black rounded-lg shadow-xl w-full sm:w-3/4 md:w-1/2 lg:w-1/3 py-10 px-8">
          {/* Logo */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <Image
              src={Logo}
              alt="Netflix Logo"
              width={200}
              height={50}
              className="mx-auto"
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
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm mt-2">
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
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm mt-2">
                  {formik.errors.password}
                </div>
              )}
            </div>

            {/* Remember Me & Help */}
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-gray-400">
                <input type="checkbox" name="remember" className="mr-2" />{" "}
                Remember me
              </label>
              <Link
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="/Needhelp"
              >
                Need help?
              </Link>
            </div>

            {/* Sign In Button */}
            <motion.div variants={itemVariants}>
              <button
                className="bg-red-600 cursor-pointer hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                type="submit"
              >
                Sign In
              </button>
            </motion.div>
          </motion.form>

          {/* Sign Up */}
          <motion.div variants={itemVariants} className="mt-8 text-center">
            <p className="text-gray-400">
              New to Movie API Netflix?{" "}
              <Link
                className="font-bold text-blue-500 hover:text-blue-800"
                href="/Sign"
              >
                Sign up now
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
      <Footer/>
    </>
  );
}
