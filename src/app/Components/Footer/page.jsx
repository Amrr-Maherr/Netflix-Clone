"use client";
import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

const Footer = () => {
  const socialLinks = [
    {
      href: "#",
      icon: faFacebook,
      hoverClass: "hover:text-blue-500",
      color: "#4267B2",
      ariaLabel: "Facebook",
    },
    {
      href: "#",
      icon: faInstagram,
      hoverClass: "hover:text-purple-500",
      color: "#E4405F",
      ariaLabel: "Instagram",
    },
    {
      href: "#",
      icon: faTwitter,
      hoverClass: "hover:text-blue-400",
      color: "#1DA1F2",
      ariaLabel: "Twitter",
    },
    {
      href: "#",
      icon: faYoutube,
      hoverClass: "hover:text-red-600",
      color: "#FF0000",
      ariaLabel: "YouTube",
    },
  ];

  const footerLinkColumns = [
    [
      { text: "FAQ", href: "#" },
      { text: "Investor Relations", href: "#" },
      { text: "Privacy", href: "#" },
      { text: "Speed Test", href: "#" },
    ],
    [
      { text: "Help Center", href: "#" },
      { text: "Careers", href: "#" },
      { text: "Cookie Preferences", href: "#" },
      { text: "Legal Notices", href: "#" },
    ],
    [
      { text: "Browse Actors", href: "/AllActors", isNextLink: true },
      { text: "Ways to Watch", href: "#" },
      { text: "Corporate Information", href: "#" },
      { text: "Exclusively on Movie API Netflix", href: "#" },
    ],
    [
      { text: "Explore Movies", href: "/AllMovies", isNextLink: true },
      { text: "Terms of Use", href: "#" },
      { text: "Contact Us", href: "#" },
    ],
  ];

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.5, delay: 0.2 },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.footer
      className="bg-black py-8 px-6 text-gray-500"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <div className="container mx-auto">
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center md:items-start md:flex-row justify-between mb-4"
        >
          <motion.p variants={itemVariants} className="mb-4 text-sm">
            Questions? Contact Us.
          </motion.p>

          <motion.div variants={itemVariants} className="flex space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.ariaLabel}
                href={social.href}
                className={social.hoverClass}
                aria-label={social.ariaLabel}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={social.icon}
                  size="lg"
                  style={{ color: social.color }}
                />
              </a>
            ))}
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {footerLinkColumns.map((column, colIndex) => (
            <motion.ul
              key={`footer-col-${colIndex}`}
              variants={itemVariants}
              className="list-none space-y-2"
            >
              {column.map((link) => (
                <li key={link.text}>
                  {link.isNextLink ? (
                    <Link href={link.href} className="hover:underline text-sm">
                      {link.text}
                    </Link>
                  ) : (
                    <a href={link.href} className="hover:underline text-sm">
                      {link.text}
                    </a>
                  )}
                </li>
              ))}
            </motion.ul>
          ))}
        </div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center md:items-start md:flex-row justify-between"
        >
          <motion.div variants={itemVariants} className="mb-4">
            <select className="bg-black text-gray-500 border border-gray-700 rounded py-1 px-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-600">
              <option>English</option>
              <option>العربية</option>
              <option>Français</option>
            </select>
          </motion.div>

          <motion.p variants={itemVariants} className="text-xs">
            © {new Date().getFullYear()} Movie API Netflix
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
