"use client";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "../Logo/index";
import HeaderLinks from "./elements/HeaderLinks";
import SearchComponent from "../Search/SearchComponent";
import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
   useEffect(() => {
     const handleScroll = () => {
       if (window.scrollY > 50) {
         setIsScrolled(true);
       } else {
         setIsScrolled(false);
       }
     };

     window.addEventListener("scroll", handleScroll);
    //  return () => window.removeEventListener("scroll", handleScroll);
   }, []);
  return (
    <header>
      <nav
        className={`flex container items-center p-2 justify-between md:justify-start gap-5 fixed z-[999] top-0 left-0 right-0 transition-all duration-300 ${
          isScrolled ? "bg-black/40 backdrop-blur-sm shadow-lg" : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <Logo />

        {/* Links (Desktop) */}
        <div className="hidden md:flex gap-5">
          <HeaderLinks />
        </div>

        {/* Right side (search + login) */}
        <div className="flex items-center gap-4 ml-auto">
          <SearchComponent />

          {/*  Login Button (Netflix style) */}
          <Link
            href="/Login"
            className="hidden md:inline-block bg-red-600 hover:bg-red-700 text-white font-semibold 
                       px-5 py-2 rounded-md text-sm transition-all duration-300 hover:shadow-lg"
          >
            Sign In
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Sidebar (Mobile) */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-black text-white transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } md:hidden p-6`}
        >
          <button className="mb-6 text-white" onClick={() => setIsOpen(false)}>
            <X size={28} />
          </button>

          <HeaderLinks />

          <div className="mt-6">
            <SearchComponent />
          </div>

          {/*  Login Button (mobile version) */}
          <Link
            href="/Login"
            onClick={() => setIsOpen(false)}
            className="block mt-8 bg-red-600 hover:bg-red-700 text-white font-semibold 
                       px-4 py-2 rounded-md text-center transition-all duration-300"
          >
            Sign In
          </Link>
        </div>
      </nav>
    </header>
  );
}
