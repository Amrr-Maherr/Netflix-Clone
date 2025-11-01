"use client";
import React from "react";
import Link from "next/link";

export default function Footer() {
  const footerLinks = [
    ["FAQ", "Investor Relations", "Privacy", "Speed Test"],
    ["Help Center", "Jobs", "Cookie Preferences", "Legal Notices"],
    ["Account", "Ways to Watch", "Corporate Information", "Only on Netflix"],
    ["Media Center", "Terms of Use", "Contact Us"],
  ];

  return (
    <footer className="bg-black text-gray-400 py-10 text-sm">
      <div className="container">
        {/* Contact Section */}
        <p className="mb-6">
          Questions? Call{" "}
          <Link href="#" className="underline hover:text-gray-200">
            000-800-919-1694
          </Link>
        </p>

        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
          {footerLinks.map((group, i) => (
            <ul key={i} className="space-y-2">
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

        {/* Language Selector */}
        <div className="mb-6">
          <select
            className="bg-transparent border border-gray-500 text-gray-300 px-3 py-2 rounded-md"
            defaultValue="English"
          >
            <option>English</option>
            <option>العربية</option>
          </select>
        </div>

        {/* Footer Note */}
        <p className="text-gray-500">Netflix Egypt</p>
      </div>
    </footer>
  );
}
