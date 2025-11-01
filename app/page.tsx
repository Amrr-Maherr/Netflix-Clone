"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import HeroSection from "../app/Components/HeroSection";
import Section from "../app/Components/Section";
import fetchMovies from "@/Api/FetchPopularMovies";

export default function Home() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["popular-movies"],
    queryFn: fetchMovies,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong 😢</p>;

  return (
    <>
      <HeroSection />
      <Section Data={data || []} />
    </>
  );
}
