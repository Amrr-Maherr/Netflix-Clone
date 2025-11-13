"use client";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "../Logo/index";
import HeaderLinks from "./elements/HeaderLinks";
import SearchComponent from "../Search/SearchComponent";
import Link from "next/link";
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"; 
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
     return () => window.removeEventListener("scroll", handleScroll);
   }, []);
  return (
    <header>
      <nav
        className={`container flex items-center p-2 justify-between md:justify-start gap-5 fixed top-0 left-0 right-0 z-999 transition-all duration-300 ${
          isScrolled ? "bg-black/40 backdrop-blur-sm shadow-lg" : ""
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

          {/* Login Button (Desktop) */}
          <Link
            href="/Login"
            className="hidden md:inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-md text-sm transition-all duration-300 hover:shadow-lg"
          >
            Sign In
          </Link>

          {/* Mobile menu using Chadcn Drawer */}
          <Drawer>
            <DrawerTrigger asChild>
              <button className="md:hidden text-white">
                <Menu size={28} />
              </button>
            </DrawerTrigger>

            <DrawerContent className="bg-black text-white p-6 border-0">
              {/* Header of Drawer */}
              <DrawerTitle></DrawerTitle>
              <div className="flex justify-between items-center mb-6">
                <Logo />
                <DrawerTrigger asChild>
                  <button>
                    <X size={28} />
                  </button>
                </DrawerTrigger>
              </div>

              {/* Links */}
              <HeaderLinks />

              {/* Search */}
              <div className="mt-6">
                <SearchComponent />
              </div>

              {/* Login Button (Mobile) */}
              <Link
                href="/Login"
                className="block mt-8 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md text-center transition-all duration-300"
              >
                Sign In
              </Link>
            </DrawerContent>
          </Drawer>
        </div>
      </nav>
    </header>
  );
}
