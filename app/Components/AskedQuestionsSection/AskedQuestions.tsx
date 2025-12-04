"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function AskedQuestions() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
      const items = containerRef.current.querySelectorAll(".faq-item");

      gsap.from(items, {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
      });
    }
  }, []);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-black text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg md:text-xl text-gray-400">
            Have a different question and can’t find the answer you’re looking
            for? Reach out to our support team by sending us an email and we’ll
            get back to you as soon as we can.
          </p>
        </div>

        <div
          ref={containerRef}
          className="max-w-4xl mx-auto space-y-4"
        >
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="faq-item bg-gray-900/60 backdrop-blur border border-gray-800 rounded-lg overflow-hidden hover:bg-gray-900/80 transition-colors"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-800/50 transition-colors"
              >
                <span className="text-lg font-semibold text-white">
                  {faq.question}
                </span>
                <div className="ml-4 flex-shrink-0">
                  {openIndex === index ? (
                    <ChevronUp className="w-6 h-6 text-red-500" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-red-500" />
                  )}
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6">
                  <p className="text-gray-300 text-base leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to start exploring?
          </h3>
          <p className="text-lg text-gray-400 mb-6">
            Sign up or log in to discover thousands of movies and TV shows.
          </p>
          <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded font-semibold transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
