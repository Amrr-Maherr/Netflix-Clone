"use client"
import HeroSection from "../app/Components/HeroSection/index"
import Section from "../app/Components/Section/index";
export default function Home() {
  const Data = [
    {}
  ]
  return (
    <>
      <HeroSection />
      <Section Data={Data} />
    </>
  );
}
