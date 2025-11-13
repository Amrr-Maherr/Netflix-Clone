"use client";



const tiers = [
  {
    name: "Basic",
    id: "tier-basic",
    href: "#",
    priceMonthly: "$9.99",
    description: "Stream on 1 screen at a time in standard definition (SD).",
    features: [
      "1 screen at a time",
      "Standard Definition (SD)",
      "Unlimited movies and series",
      "Watch on any device",
    ],
    featured: false,
  },
  {
    name: "Standard",
    id: "tier-standard",
    href: "#",
    priceMonthly: "$15.99",
    description: "Stream on 2 screens simultaneously in High Definition (HD).",
    features: [
      "2 screens at a time",
      "High Definition (HD)",
      "Unlimited movies and series",
      "Download for offline viewing",
    ],
    featured: true, // highlighted in red
  },
  {
    name: "Premium",
    id: "tier-premium",
    href: "#",
    priceMonthly: "$19.99",
    description: "Stream on 4 screens at the same time in Ultra HD (4K+HDR).",
    features: [
      "4 screens at a time",
      "Ultra HD (4K+HDR)",
      "Unlimited movies and series",
      "Download for offline viewing",
      "Priority customer support",
    ],
    featured: false,
  },
];



function classNames(...classes) {
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
        {tiers.map((tier, tierIdx) => (
          <div
            key={tier.id}
            className={classNames(
              tier.featured
                ? "relative bg-gray-800"
                : "bg-white/5 sm:mx-8 lg:mx-0",
              tier.featured
                ? ""
                : tierIdx === 0
                ? "rounded-t-3xl sm:rounded-b-none lg:rounded-tr-none lg:rounded-bl-3xl"
                : "sm:rounded-t-none lg:rounded-tr-3xl lg:rounded-bl-none",
              "rounded-3xl p-8 ring-1 ring-white/10 sm:p-10"
            )}
          >
            {/* Title */}
            <h3 id={tier.id} className="text-base font-semibold text-red-600">
              {tier.name}
            </h3>

            {/* Price */}
            <p className="mt-4 flex items-baseline gap-x-2">
              <span className="text-5xl font-semibold tracking-tight text-white">
                {tier.priceMonthly}
              </span>
              <span className="text-base text-gray-400">/month</span>
            </p>

            {/* Description */}
            <p className="mt-6 text-base text-gray-300">{tier.description}</p>

            {/* Features */}
            <ul className="mt-8 space-y-3 text-sm text-gray-300 sm:mt-10">
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  {/* <CheckIcon className="h-6 w-5 text-indigo-400" /> */}
                  {feature}
                </li>
              ))}
            </ul>

            {/* Button */}
            <a
              href={tier.href}
              aria-describedby={tier.id}
              className={classNames(
                tier.featured
                  ? "bg-red-500 text-white hover:bg-red-800"
                  : "bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white/75",
                "mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10"
              )}
            >
              Get started today
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
