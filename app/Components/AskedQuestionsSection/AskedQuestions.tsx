"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AskedQuestions() {
  const faqs = [
    {
      question: "What is Netflix Clone?",
      answer:
        "Netflix Clone is a web application built to explore movies and TV shows with a Netflix-like interface.",
    },
    {
      question: "How can I watch movies?",
      answer:
        "You can browse trending, popular, top-rated, and upcoming movies, then click on any movie to view details.",
    },
    {
      question: "Are the TV shows included?",
      answer:
        "Yes, you can explore trending and popular TV shows, view seasons, episodes, cast, and more.",
    },
    {
      question: "Is there a trailer for each movie?",
      answer:
        "Whenever available, trailers are embedded directly on the movie or TV show details page.",
    },
    {
      question: "Can I view production details?",
      answer:
        "Yes, production companies, networks, and countries are displayed along with reviews and metadata.",
    },
    {
      question: "Is this project fully responsive?",
      answer:
        "Yes, the layout adapts to all screen sizes, including desktop, tablet, and mobile devices.",
    },
  ];

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll(".faq-card");

      gsap.from(cards, {
        opacity: 0,
        y: 50,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
      });
    }
  }, []);

  return (
    <div className="bg-black text-white py-5 md:py-24 container">
      <div className="mx-auto text-start">
        <h2 className="text-3xl font-bold text-red-500">
          Frequently Asked Questions
        </h2>
        <p className="mt-4 text-gray-400">
          Have a different question and can’t find the answer you’re looking
          for? Reach out to our support team by sending us an email and we’ll
          get back to you as soon as we can.
        </p>
      </div>

      <div
        ref={containerRef}
        className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
      >
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="faq-card pt-6 rounded-lg shadow-lg bg-gray-900 p-4"
          >
            <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
            <p className="mt-2 text-gray-400 text-sm">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
