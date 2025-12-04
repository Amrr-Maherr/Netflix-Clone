"use client";
import { useEffect, useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import Logo from "../Logo/index";
import HeaderLinks from "./elements/HeaderLinks";
import SearchComponent from "../Search/SearchComponent";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "@/Store/userSlice";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(clearUser());
    signOut({ callbackUrl: '/' });
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
                <Link href="/Account" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                  {user.image && (
                    <img
                      src={user.image}
                      alt={user.name || "User avatar"}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                  <div className="text-white text-sm">
                    {user.name && <div>{user.name}</div>}
                  </div>
                </Link>
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
                  <div className="mt-8">
                    <div className="flex items-center gap-3 mb-3">
                      {user.image && (
                        <img
                          src={user.image}
                          alt={user.name || "User avatar"}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      )}
                      <div className="text-white text-sm">
                        {user.name && <div className="font-semibold">{user.name}</div>}
                        {user.email && <div className="text-gray-300">{user.email}</div>}
                      </div>
                    </div>
                    <Link href="/Account" className="block bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md text-center mb-2">
                      Account
                    </Link>
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
