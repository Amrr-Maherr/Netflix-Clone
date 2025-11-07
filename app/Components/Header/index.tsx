"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "../Logo/index";
import HeaderLinks from "./elements/HeaderLinks";
import SearchComponent from "../Search/SearchComponent";
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header>
      <nav className="flex container items-center justify-between md:justify-start gap-5 fixed z-999 top-0 left-0 right-0 pt-4">
        <Logo />

        {/* Large screens */}
        <div className="hidden md:flex gap-5">
          <HeaderLinks />
        </div>
        <SearchComponent />
        {/* Mobile menu button */}
        <button
          className="md:hidden text-white cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Sidebar */}
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
        </div>
      </nav>
    </header>
  );
}
