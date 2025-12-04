"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Check, Monitor, Users, Download, Headphones, Crown } from "lucide-react";

const tiers = [
  {
    name: "Basic",
    id: "tier-basic",
    href: "#",
    priceMonthly: "$9.99",
    description: "Stream on 1 screen at a time in standard definition (SD).",
    icon: Monitor,
    features: [
      { text: "1 screen at a time", icon: Monitor },
      { text: "Standard Definition (SD)", icon: Monitor },
      { text: "Unlimited movies and series", icon: Check },
      { text: "Watch on any device", icon: Check },
    ],
    featured: false,
  },
  {
    name: "Standard",
    id: "tier-standard",
    href: "#",
    priceMonthly: "$15.99",
    description: "Stream on 2 screens simultaneously in High Definition (HD).",
    icon: Users,
    badge: "Most Popular",
    features: [
      { text: "2 screens at a time", icon: Users },
      { text: "High Definition (HD)", icon: Monitor },
      { text: "Unlimited movies and series", icon: Check },
      { text: "Download for offline viewing", icon: Download },
    ],
    featured: true,
  },
  {
    name: "Premium",
    id: "tier-premium",
    href: "#",
    priceMonthly: "$19.99",
    description: "Stream on 4 screens at the same time in Ultra HD (4K+HDR).",
    icon: Crown,
    features: [
      { text: "4 screens at a time", icon: Users },
      { text: "Ultra HD (4K+HDR)", icon: Monitor },
      { text: "Unlimited movies and series", icon: Check },
      { text: "Download for offline viewing", icon: Download },
      { text: "Priority customer support", icon: Headphones },
    ],
    featured: false,
  },
];



function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function PricingSection() {
  return (
    <div className="relative isolate bg-black px-6 py-24 sm:py-32 lg:px-8">
      {/* Background blob */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-10 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
      >
        <div
          className="mx-auto h-[300px] w-[600px] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-base font-semibold text-red-600">Plans</h2>
        <p className="mt-2 text-5xl font-semibold tracking-tight text-white sm:text-6xl">
          Pick the plan that fits your binge
        </p>
      </div>

      <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-gray-400 sm:text-xl">
        Stream your favorite movies and series on any device. No hidden fees,
        cancel anytime.
      </p>

      <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-y-6 sm:mt-20 lg:max-w-4xl lg:grid-cols-3">
        {tiers.map((tier, tierIdx) => {
          const IconComponent = tier.icon;
          return (
            <div
              key={tier.id}
              className={classNames(
                tier.featured
                  ? "relative bg-gray-800 ring-2 ring-red-500 scale-105"
                  : "bg-white/5 sm:mx-8 lg:mx-0",
                "rounded-3xl p-8 ring-1 ring-white/10 sm:p-10 transition-all duration-300 hover:scale-105 hover:ring-white/20"
              )}
            >
              {tier.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                  {tier.badge}
                </div>
              )}

              {/* Tier Icon */}
              <div className="flex justify-center mb-4">
                <IconComponent className="w-12 h-12 text-red-500" />
              </div>

              {/* Title */}
              <h3 id={tier.id} className="text-lg font-bold text-white text-center">
                {tier.name}
              </h3>

              {/* Price */}
              <p className="mt-4 flex items-baseline gap-x-2 justify-center">
                <span className="text-5xl font-semibold tracking-tight text-white">
                  {tier.priceMonthly}
                </span>
                <span className="text-base text-gray-400">/month</span>
              </p>

              {/* Description */}
              <p className="mt-6 text-base text-gray-300 text-center">{tier.description}</p>

              {/* Features */}
              <ul className="mt-8 space-y-3 text-sm text-gray-300 sm:mt-10">
                {tier.features.map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <li key={idx} className="flex gap-x-3 items-center">
                      <Icon className="h-5 w-5 text-red-500 flex-shrink-0" />
                      <span>{feature.text}</span>
                    </li>
                  );
                })}
              </ul>

              {/* Button */}
              <a
                href={tier.href}
                aria-describedby={tier.id}
                className={classNames(
                  tier.featured
                    ? "bg-red-500 text-white hover:bg-red-800"
                    : "bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white/75",
                  "mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10 transition-colors"
                )}
              >
                Get started today
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
