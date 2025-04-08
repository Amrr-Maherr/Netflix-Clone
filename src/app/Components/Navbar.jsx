"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import AuthButton from "./ui/AuthButton"; // Assuming ./ui/AuthButton exists
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUsers,
  faFilm,
  faFire,
  faList,
} from "@fortawesome/free-solid-svg-icons";

const MotionLink = motion(Link);

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);

  const NavData = [
    { title: "Home", link: "/", icon: faHouse },
    { title: "Actors", link: "/Actors", icon: faUsers },
    { title: "Movies", link: "/Movies", icon: faFilm },
    { title: "Latest", link: "/Latest", icon: faFire },
    { title: "My List", link: "/List", icon: faList },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        isDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const navbarVariants = {
    hidden: { backgroundColor: "rgba(0, 0, 0, 0)", boxShadow: "none" },
    visible: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  const linkVariants = {
    hover: { scale: 1.1, transition: { duration: 0.2, ease: "easeInOut" } },
    initial: { scale: 1 },
    animate: { scale: 1 },
  };

  return (
    <motion.nav
      className="py-4 px-6 fixed top-0 w-full z-50"
      variants={navbarVariants}
      initial="hidden"
      animate={isScrolled ? "visible" : "hidden"}
    >
      <div className="container mx-auto flex items-center justify-between">
        <MotionLink
          href="/"
          className="text-red-600 text-3xl font-bold"
          whileHover={{ scale: 1.05 }}
        >
          Netflix
        </MotionLink>

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

        <div className="hidden md:flex items-center space-x-6 text-white">
          {NavData.map((ele, i) => (
            <MotionLink
              key={i}
              href={`${ele.link}`}
              className="hover:text-gray-300"
              variants={linkVariants}
              whileHover="hover"
              initial="initial"
              animate="animate"
            >
              {ele.title}
            </MotionLink>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-4 text-white relative">
          <button
            ref={triggerRef}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="text-white hover:text-gray-300 focus:outline-none inline-flex items-center"
            type="button"
            aria-haspopup="true"
            aria-expanded={isDropdownOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
            <svg
              className="w-2.5 h-2.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute top-full right-0 mt-2 z-50 w-56 origin-top-right rounded-md bg-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="dropdownHoverButton"
            >
              <ul className="py-1" role="none">
                <li>
                  <Link
                    href="/Actors"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-red-600 hover:text-white transition-colors duration-150 ease-in-out"
                    onClick={() => setIsDropdownOpen(false)}
                    role="menuitem"
                  >
                    Search Actors
                  </Link>
                </li>
                <li>
                  <Link
                    href="/Movies"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-red-600 hover:text-white transition-colors duration-150 ease-in-out"
                    onClick={() => setIsDropdownOpen(false)}
                    role="menuitem"
                  >
                    Search Movies
                  </Link>
                </li>
              </ul>
            </div>
          )}

          <div className="hidden md:block">
            <AuthButton ButtonText={"Sign in"} ButtonLink={"Login"} />
          </div>
        </div>
      </div>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-black p-4 z-50 md:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
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
        <div className="flex flex-col h-full">
          <div className="flex flex-col space-y-4 mt-12 flex-grow">
            {NavData.map((ele, i) => (
              <Link
                href={`${ele.link}`}
                key={i}
                className="text-white p-2 rounded flex items-center justify-start gap-2 hover:bg-red-700"
                onClick={() => setIsMenuOpen(false)}
              >
                <FontAwesomeIcon icon={ele.icon} className="w-5 h-5" />
                {ele.title}
              </Link>
            ))}
          </div>
          <div className="mt-auto pt-4">
            <AuthButton ButtonText={"Sign in"} ButtonLink={"Login"} />
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0  z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </motion.nav>
  );
}

export default Navbar;
