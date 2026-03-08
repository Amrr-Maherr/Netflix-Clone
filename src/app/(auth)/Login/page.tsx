 "use client";

// TODO: Framer Motion animation removed
// import { motion, Variants } from "framer-motion";
// Public assets referenced via path strings
 import Link from "next/link";
 import { useForm, SubmitHandler } from "react-hook-form";
import { LoginInputs } from "@/types/auth.types";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { useRouter } from "next/navigation";
 import { loginUser } from "@/services/api/legacy/Auth";
 import { useState } from "react";
 import { Eye, EyeOff } from "lucide-react";
 import Image from "next/image";

 export default function Page() {
   const router = useRouter();
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const [showPassword, setShowPassword] = useState(false);

   const {
     register,
     handleSubmit,
     reset,
     formState: { errors },
  } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
     setLoading(true);
     setError(null);
     try {
       await loginUser(data.email, data.password);
       reset();
       router.push("/");
     } catch (err) {
       const error = err as Error;
       setError(error.message);
     } finally {
       setLoading(false);
     }
   };

   // TODO: Framer Motion animation removed - variants removed
   // const containerVariants: Variants = {
   //   hidden: { opacity: 0 },
   //   visible: {
   //     opacity: 1,
   //     transition: { delayChildren: 0.3, staggerChildren: 0.2 },
   //   },
   // };

   // TODO: Framer Motion animation removed - variants removed
   // const itemVariants: Variants = {
   //   hidden: { y: 20, opacity: 0 },
   //   visible: {
   //     y: 0,
   //     opacity: 1,
   //     transition: { duration: 0.5, ease: [0.42, 0, 0.58, 1] },
   //   },
   // };

   return (
     <div className="min-h-screen bg-black flex items-center justify-center px-4">
       <div className="w-full max-w-md">
         {/* Netflix Logo */}
         <div className="flex justify-center mb-8">
          <Image
            src="/Netflix_Symbol_RGB.png"
             alt="Netflix"
             width={128}
             height={128}
             quality={100}
             placeholder="blur"
             blurDataURL="/Netflix_Symbol_RGB.png"
             priority
             className="w-32"
           />
         </div>

         <div className="bg-white p-8 rounded-lg shadow-lg">
           {/* TODO: Framer Motion animation removed - replaced motion.div with plain div */}
           <div
             // TODO: Framer Motion animation removed - variants prop removed
             // variants={itemVariants}
             className="mb-6"
           >
             <h1 className="text-3xl font-bold text-black">Sign In</h1>
           </div>

           {/* TODO: Framer Motion animation removed - replaced motion.form with plain form */}
           <form
             onSubmit={handleSubmit(onSubmit)}
             // TODO: Framer Motion animation removed - variants prop removed
             // variants={itemVariants}
             className="space-y-4"
           >
             {/* Email */}
             <div>
               <Input
                 id="email"
                 {...register("email", { required: "Email is required" })}
                 type="email"
                 placeholder="Email Address"
                 className="text-black bg-gray-100 border-gray-300"
               />
               {errors.email && (
                 <p className="text-red-500 text-sm mt-1">
                   {errors.email.message}
                 </p>
               )}
             </div>

             {/* Password */}
             <div className="relative">
               <Input
                 id="password"
                 {...register("password", {
                   required: "Password is required",
                   minLength: {
                     value: 6,
                     message: "Password must be at least 6 characters",
                   },
                 })}
                 type={showPassword ? "text" : "password"}
                 placeholder="Password (6+ characters)"
                 className="text-black bg-gray-100 border-gray-300 pr-12"
               />
               <button
                 type="button"
                 onClick={() => setShowPassword(!showPassword)}
                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
               >
                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
               </button>
               {errors.password && (
                 <p className="text-red-500 text-sm mt-1">
                   {errors.password.message}
                 </p>
               )}
             </div>

             {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

             {/* Submit */}
             {/* TODO: Framer Motion animation removed - replaced motion.div with plain div */}
             <div
               // TODO: Framer Motion animation removed - variants prop removed
               // variants={itemVariants}
               className="pt-4"
             >
               <Button
                 type="submit"
                 disabled={loading}
                 className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-bold py-2 px-4 rounded-lg w-full transition duration-150"
               >
                 {loading ? "Signing In..." : "Sign In"}
               </Button>
             </div>
           </form>

           {/* TODO: Framer Motion animation removed - replaced motion.div with plain div */}
           <div
             // TODO: Framer Motion animation removed - variants prop removed
             // variants={itemVariants}
             className="mt-6 text-center"
           >
             <p className="text-gray-600 text-sm">
               New to Netflix?{" "}
               <Link
                 className="font-semibold text-red-600 hover:underline"
                 href="/auth/register"
               >
                 Sign up now
               </Link>
               .
             </p>
             <p className="text-gray-600 text-sm mt-2">
               <Link
                 className="font-semibold text-red-600 hover:underline"
                 href="/auth/forgot-password"
               >
                 Forgot your password?
               </Link>
             </p>
           </div>
         </div>

         {/* TODO: Framer Motion animation removed - replaced motion.div with plain div */}
         <div
           // TODO: Framer Motion animation removed - variants prop removed
           // variants={itemVariants}
           className="mt-4 text-center"
         >
           <p className="text-gray-500 text-xs">
             This page is protected by Google reCAPTCHA to ensure you're not a
             bot.{" "}
             <a href="#" className="text-blue-500 hover:underline">
               Learn more.
             </a>
           </p>
         </div>
       </div>
     </div>
   );
 }
