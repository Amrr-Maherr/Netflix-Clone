import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navbarVariants = {
    hidden: {
      backgroundColor: "rgba(0, 0, 0, 0)",
      boxShadow: "none",
    },
    visible: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const linkVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  const mobileMenuVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 20,
        damping: 10,
      },
    },
    closed: {
      x: "-100%",
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.nav
      className="py-4 px-6 fixed top-0 w-full z-50"
      variants={navbarVariants}
      initial="hidden"
      animate={isScrolled ? "visible" : "hidden"}
    >
      <div className="container mx-auto flex items-center justify-between">
        <a href="/" className="text-red-600 text-3xl font-bold">
          Netflix
        </a>

        {/* Hamburger Menu Icon (Visible on small screens) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links (Hidden on small screens, visible on medium and up) */}
        <div className="hidden md:flex items-center space-x-6 text-white">
          <motion.a
            href="/"
            className="hover:text-gray-300"
            variants={linkVariants}
            whileHover="hover"
          >
            Home
          </motion.a>
          <motion.a
            href="/tv-shows"
            className="hover:text-gray-300"
            variants={linkVariants}
            whileHover="hover"
          >
            TV Shows
          </motion.a>
          <motion.a
            href="/movies"
            className="hover:text-gray-300"
            variants={linkVariants}
            whileHover="hover"
          >
            Movies
          </motion.a>
          <motion.a
            href="/latest"
            className="hover:text-gray-300"
            variants={linkVariants}
            whileHover="hover"
          >
            Latest
          </motion.a>
          <motion.a
            href="/my-list"
            className="hover:text-gray-300"
            variants={linkVariants}
            whileHover="hover"
          >
            My List
          </motion.a>
        </div>
        <div className="flex items-center space-x-4 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 hover:text-gray-300 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <Link href={"/Sign"}>
            <motion.button
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              variants={buttonVariants}
              whileHover="hover"
            >
              Sign In
            </motion.button>
          </Link>
        </div>
      </div>
      <motion.div
        className="fixed top-0 left-0 h-full w-64 bg-black p-4 z-50 md:hidden"
        variants={mobileMenuVariants}
        animate={isMenuOpen ? "open" : "closed"}
        initial="closed"
      >
        <button
          onClick={() => setIsMenuOpen(false)}
          className="text-white absolute top-4 right-4 focus:outline-none"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="flex flex-col space-y-4 mt-12">
          <a href="/" className="text-white hover:text-gray-300">
            Home
          </a>
          <a href="/tv-shows" className="text-white hover:text-gray-300">
            TV Shows
          </a>
          <a href="/movies" className="text-white hover:text-gray-300">
            Movies
          </a>
          <a href="/latest" className="text-white hover:text-gray-300">
            Latest
          </a>
          <a href="/my-list" className="text-white hover:text-gray-300">
            My List
          </a>
        </div>
      </motion.div>
    </motion.nav>
  );
}

export default Navbar;
