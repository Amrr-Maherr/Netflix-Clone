"use client";
import { useEffect, useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import Logo from "../Logo/index";
import HeaderLinks from "./elements/HeaderLinks";
import SearchComponent from "../Search/SearchComponent";
import Link from "next/link";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<{ name: string; image?: string } | null>(
    null
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // جلب بيانات المستخدم من localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    // يمكن إعادة التوجيه إذا حبيت
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-999 transition-all duration-300 
      ${isScrolled ? "bg-black/40 backdrop-blur-sm shadow-lg" : ""}`}
    >
      <div className="container flex items-center justify-between md:justify-start gap-5 p-2">
        <nav className="flex items-center w-full gap-5">
          {/* Logo */}
          <Logo />

          {/* Desktop Links */}
          <div className="hidden md:flex gap-5">
            <HeaderLinks />
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4 ml-auto">
            <SearchComponent />

            {/* Desktop User/Login */}
            {user ? (
              <div className="hidden md:flex items-center gap-3">
                {user.image && (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md text-sm transition-all duration-300"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            ) : (
              <Link
                href="/Login"
                className="hidden md:inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-md text-sm transition-all duration-300 hover:shadow-lg"
              >
                Sign In
              </Link>
            )}

            {/* Mobile Drawer */}
            <Drawer>
              <DrawerTrigger asChild>
                <button className="md:hidden text-white">
                  <Menu size={28} />
                </button>
              </DrawerTrigger>

              <DrawerContent className="bg-black text-white p-6 border-0">
                <DrawerTitle></DrawerTitle>

                <div className="flex justify-between items-center mb-6">
                  <Logo />
                  <DrawerTrigger asChild>
                    <button>
                      <X size={28} />
                    </button>
                  </DrawerTrigger>
                </div>

                <HeaderLinks />

                <div className="mt-6">
                  <SearchComponent />
                </div>

                {user ? (
                  <div className="flex items-center gap-3 mt-8">
                    {user.image && (
                      <img
                        src={user.image}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md text-sm transition-all duration-300 w-full justify-center"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/Login"
                    className="block mt-8 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md text-center transition-all duration-300"
                  >
                    Sign In
                  </Link>
                )}
              </DrawerContent>
            </Drawer>
          </div>
        </nav>
      </div>
    </header>
  );
}
