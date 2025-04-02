import Link from "next/link";
import { motion } from "framer-motion";
export default function AuthButton({ButtonText,ButtonLink}) {
      const buttonVariants = {
        hover: {
          scale: 1.05,
          transition: {
            duration: 0.2,
            ease: "easeInOut",
          },
        },
      };
    return (
      <Link href={`/${ButtonLink}`}>
        <motion.button
          className="bg-red-600 cursor-pointer hover:bg-red-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          variants={buttonVariants}
          whileHover="hover"
        >
          {ButtonText}
        </motion.button>
      </Link>
    );
}