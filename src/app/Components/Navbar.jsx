import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import AuthButton from "./ui/AuthButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faUsers,
  faFilm,
  faFire,
  faList
} from '@fortawesome/free-solid-svg-icons';
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const NavData = [
    { title: "Home", link: "/", icon: faHouse },
    { title: "Actors", link: "/Actors", icon: faUsers },
    { title: "Movies", link: "/Movies", icon: faFilm },
    { title: "Latest", link: "/Latest", icon: faFire },
    { title: "My List", link: "/List", icon: faList },
  ];
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
          {NavData.map((ele) => (
            <>
              <motion.a
                href={`${ele.link}`}
                className="hover:text-gray-300"
                variants={linkVariants}
                whileHover="hover"
              >
                {ele.title}
              </motion.a>
            </>
          ))}
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
          <AuthButton ButtonText={"Sign in"} ButtonLink={"Login"} />
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
          {NavData.map((ele) => (
            <Link href={`${ele.link}`} className="text-white  p-2 rounded flex items-center justify-start gap-1 hover:bg-red-700 hover:text-white">
              <>
              <FontAwesomeIcon icon={ele.icon}/>
              {ele.title}
              </>
            </Link>
          ))}
          <AuthButton ButtonText={"Log out"} ButtonLink={"Sign"} />
        </div>
      </motion.div>
    </motion.nav>
  );
}

export default Navbar;
