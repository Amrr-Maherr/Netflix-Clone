"use client";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
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
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { logoutUser } from "../../../Api/Auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
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
                <Link
                  href="/Account"
                  className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                >
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {(user.displayName || user.email)
                      ?.charAt(0)
                      .toUpperCase() || "U"}
                  </div>
                  {/* <span className="text-white text-sm">{user.displayName || user.email}</span> */}
                </Link>
                <Button
                  onClick={handleLogout}
                  className="bg-transparent border-2 border-white/50 hover:bg-white/10 text-white text-lg md:text-xl px-5 cursor-pointer py-4 rounded-lg backdrop-blur-sm shadow-lg transition-all duration-300"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Link href="/Login">
                <Button className="bg-transparent border-2 border-white/50 hover:bg-white/10 text-white text-lg md:text-xl px-5 py-4 rounded-lg backdrop-blur-sm shadow-lg cursor-pointer transition-all duration-300">
                  Sign In
                </Button>
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
                      {user.photoURL ? (
                        <Image
                          width={40}
                          height={40}
                          quality={100}
                          src={user.photoURL}
                          alt={user.displayName || user.email || "User avatar"}
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {(user.displayName || user.email)
                            ?.charAt(0)
                            .toUpperCase() || "U"}
                        </div>
                      )}
                      <span className="text-white text-lg">
                        {user.displayName || user.email}
                      </span>
                    </div>
                    <Link
                      href="/Account"
                      className="block bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg text-center mb-2"
                    >
                      Account
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg text-center w-full mb-2"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/Login"
                    className="block mt-8 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg text-center transition-all duration-300"
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
