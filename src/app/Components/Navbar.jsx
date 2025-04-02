"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import AuthButton from "./ui/AuthButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUsers,
  faFilm,
  faFire,
  faList,
  faSearch,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const NavData = [
    { title: "Home", link: "/", icon: faHouse },
    { title: "Actors", link: "/Actors", icon: faUsers },
    { title: "Movies", link: "/Movies", icon: faFilm },
    { title: "Latest", link: "/Latest", icon: faFire },
    { title: "My List", link: "/List", icon: faList },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      if (window.scrollY > 50) setIsDropdownOpen(false);
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

  const mobileMenuVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 80,
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
        <Link href="/" className="text-red-600 text-3xl font-bold">
          Netflix
        </Link>

        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
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

        <div className="hidden md:flex items-center space-x-6 text-white">
          {NavData.map((ele) => (
            <Link href={ele.link} key={ele.link} legacyBehavior passHref>
              <motion.a
                className="hover:text-gray-300"
                variants={linkVariants}
                whileHover="hover"
              >
                {ele.title}
              </motion.a>
            </Link>
          ))}
        </div>

        <div
          className="flex items-center space-x-4 text-white relative"
          ref={dropdownRef}
        >
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="text-white font-medium rounded-lg text-sm px-2 py-2.5 text-center inline-flex items-center hover:text-gray-300"
            type="button"
            aria-haspopup="true"
            aria-expanded={isDropdownOpen}
            aria-label="User options"
          >
            <FontAwesomeIcon icon={faSearch} className="h-5 w-5 text-md" />
            <FontAwesomeIcon
              icon={faChevronDown}
              className="w-2.5 h-2.5 ms-2"
            />
          </button>

          {isDropdownOpen && (
            <div
              className="
    absolute top-full right-0 mt-2 z-50 w-56
    origin-top-right
    rounded-md
   bg-black
    shadow-lg
    ring-1 ring-black ring-opacity-5
    focus:outline-none
  "
            >
              <ul className="py-1" aria-labelledby="dropdownHoverButton">
                <li>
                  <Link
                    href="/dashboard"
                    className="
          group flex items-center px-4 py-2 text-sm
          text-gray-700 dark:text-gray-300
          hover:bg-red-600 hover:text-white
          dark:hover:bg-red-700
          transition-colors duration-150 ease-in-out
          focus:outline-none focus:bg-red-600 focus:text-white
          dark:focus:bg-red-700
        "
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Search Actors
                  </Link>
                </li>
                <li>
                  <Link
                    href="/settings"
                    className="
          group flex items-center px-4 py-2 text-sm
          text-gray-700 dark:text-gray-300
          hover:bg-red-600 hover:text-white
          dark:hover:bg-red-700
          transition-colors duration-150 ease-in-out
          focus:outline-none focus:bg-red-600 focus:text-white
          dark:focus:bg-red-700
        "
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Search Movies
                  </Link>
                </li>
              </ul>
            </div>
          )}

          <AuthButton ButtonText={"Sign in"} ButtonLink={"Login"} />
        </div>
      </div>

      <motion.div
        className="fixed top-0 left-0 h-full w-fit bg-black p-4 z-[60] md:hidden"
        variants={mobileMenuVariants}
        animate={isMenuOpen ? "open" : "closed"}
        initial="closed"
      >
        <button
          onClick={() => setIsMenuOpen(false)}
          className="text-white absolute top-4 right-4 focus:outline-none"
          aria-label="Close menu"
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
          {NavData.map((ele) => (
            <Link
              href={ele.link}
              key={ele.link}
              className="text-white p-2 rounded flex items-center justify-start gap-2 hover:bg-red-700 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              <FontAwesomeIcon icon={ele.icon} className="w-5 h-5" />
              {ele.title}
            </Link>
          ))}
          <AuthButton ButtonText={"Log out"} ButtonLink={"Sign"} />
        </div>
      </motion.div>
    </motion.nav>
  );
}

export default Navbar;
