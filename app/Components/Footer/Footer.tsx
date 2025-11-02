"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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

  const groupVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
    }),
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.3, ease: "easeOut" },
    }),
    hover: {
      y: -2,
      opacity: 1,
      transition: { duration: 0.2, ease: "easeOut" },
    },
  };

  return (
    <footer className="bg-black text-gray-400 py-10 text-sm">
      <div className="container">
        {/* Contact Section */}
        <motion.p
          className="mb-6"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Questions? Call{" "}
          <Link href="#" className="underline hover:text-gray-200">
            000-800-919-1694
          </Link>
        </motion.p>

        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
          {footerLinks.map((group, i) => (
            <motion.ul
              key={i}
              className="space-y-2"
              custom={i}
              initial="hidden"
              animate="visible"
              variants={groupVariants}
            >
              {group.map((link, j) => (
                <motion.li
                  key={j}
                  custom={j}
                  variants={linkVariants}
                  whileHover="hover"
                >
                  <Link
                    href="#"
                    className="hover:underline hover:text-gray-200 transition-colors"
                  >
                    {link}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          ))}
        </div>

        {/* Language Selector with ShadCN Select */}
        <motion.div
          className="mb-6 w-[200px]"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Select defaultValue="English">
            <SelectTrigger className="bg-black border-gray-500 text-gray-300">
              <SelectValue placeholder="English" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="العربية">العربية</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Footer Note */}
        <motion.p
          className="text-gray-500"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          Netflix Egypt
        </motion.p>
      </div>
    </footer>
  );
}
