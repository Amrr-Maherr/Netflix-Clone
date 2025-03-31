"use client";
import Link from "next/link";
import { motion } from "framer-motion";
export default function Button({ButtonText}) {
  const itemVariants = {
    initial: { y: -50, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };
  return (
    <>
      <Link href="/">
        <motion.button
          variants={itemVariants}
          className="bg-red-600 cursor-pointer hover:bg-red-700 text-white text-2xl font-bold py-3 px-20 rounded focus:outline-none focus:shadow-outline transition duration-300"
        >
          {ButtonText}
        </motion.button>
      </Link>
    </>
  );
}
