import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../app/Components/Header/index";
import GlobalProvider from "@/Provider/GlobalProvider";
import Footer from "./Components/Footer/Footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Netflix | Watch Movies & TV Shows Online",
  description:
    "Stream unlimited movies, TV shows, and more. Watch anywhere. Cancel anytime. Experience Netflix-style entertainment on our platform.",
  icons : {
    icon:"/fav_icon.ico"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GlobalProvider>
          <Header />
          {children}
          <Footer/>
        </GlobalProvider>
      </body>
    </html>
  );
}
