"use client";

import React from "react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Footer() {
  const footerLinks = [
    ["FAQ", "Investor Relations", "Privacy", "Speed Test"],
    ["Help Center", "Jobs", "Cookie Preferences", "Legal Notices"],
    ["Account", "Ways to Watch", "Corporate Information", "Only on Netflix"],
    ["Media Center", "Terms of Use", "Contact Us"],
  ];

  return (
    <footer className="bg-black text-gray-400 py-12 text-sm border-t border-gray-800">
      <div className="container mx-auto px-4">
        <p className="mb-8">
          Questions? Call{" "}
          <Link href="#" className="underline hover:text-gray-200 transition-colors">
            000-800-919-1694
          </Link>
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {footerLinks.map((group, i) => (
            <ul key={i} className="space-y-3">
              {group.map((link, j) => (
                <li key={j}>
                  <Link
                    href="#"
                    className="hover:underline hover:text-gray-200 transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>

        <div className="mb-6 w-48">
          <Select defaultValue="English">
            <SelectTrigger className="bg-black border-gray-600 text-gray-300 hover:border-gray-400 transition-colors">
              <SelectValue placeholder="English" />
            </SelectTrigger>
            <SelectContent className="bg-black border-gray-600">
              <SelectItem value="English" className="text-gray-300 hover:bg-gray-800 focus:bg-gray-800">
                English
              </SelectItem>
              <SelectItem value="العربية" className="text-gray-300 hover:bg-gray-800 focus:bg-gray-800">
                العربية
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <p className="text-gray-500 text-sm">
          Netflix Egypt
        </p>
      </div>
    </footer>
  );
}
