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
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Header() {
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
                    <Image
                      width={8}
                      height={8}
                      src={user.image}
                      alt={user.name || "User avatar"}
                      className="rounded-full object-cover"
                    />
                  )}
                </Link>
                <Button
                  onClick={handleLogout}
                  className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md text-sm transition-all duration-300"
                >
                  <LogOut size={16} /> Logout
                </Button>
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
                <Button className="md:hidden text-white">
                  <Menu size={28} />
                </Button>
              </DrawerTrigger>

              <DrawerContent className="bg-black text-white p-6 border-0">
                <DrawerTitle></DrawerTitle>

                <div className="flex justify-between items-center mb-6">
                  <Logo />
                  <DrawerTrigger asChild>
                    <Button>
                      <X size={28} />
                    </Button>
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
                        <Image
                          width={10}
                          height={10}
                          quality={100}
                          src={user.image}
                          alt={user.name || "User avatar"}
                          className="rounded-full object-cover"
                        />
                      )}
                    </div>
                    <Link href="/Account" className="block bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md text-center mb-2">
                      Account
                    </Link>
                    <Button
                      onClick={handleLogout}
                      className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md text-sm transition-all duration-300 w-full justify-center"
                    >
                      <LogOut size={16} /> Logout
                    </Button>
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
