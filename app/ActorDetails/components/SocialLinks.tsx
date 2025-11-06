"use client";

import {  Facebook, Instagram, Twitter } from "lucide-react";

export default function SocialLinks({ ids }: { ids: any }) {
  if (!ids) return null;

  const links = [
    {
      id: ids.imdb_id,
      name: "IMDb",
      href: `https://www.imdb.com/name/${ids.imdb_id}`,
      color: "text-yellow-400",
      icon: null,
    },
    {
      id: ids.facebook_id,
      name: "Facebook",
      href: `https://www.facebook.com/${ids.facebook_id}`,
      color: "text-blue-600",
      icon: <Facebook className="w-5 h-5" />,
    },
    {
      id: ids.instagram_id,
      name: "Instagram",
      href: `https://www.instagram.com/${ids.instagram_id}`,
      color: "text-pink-500",
      icon: <Instagram className="w-5 h-5" />,
    },
    {
      id: ids.twitter_id,
      name: "Twitter",
      href: `https://twitter.com/${ids.twitter_id}`,
      color: "text-blue-400",
      icon: <Twitter className="w-5 h-5" />,
    },
  ].filter((link) => link.id);

  if (!links.length) return null;

  return (
    <div className="mb-16 rounded-xl p-6 sm:p-8 flex flex-wrap gap-4">
      {links.map((link, i) => (
        <a
          key={i}
          href={link.href}
          target="_blank"
          className={`bg-[#141414] px-4 py-2 rounded-xl text-gray-300 font-medium border border-gray-800 hover:border-gray-700 hover:shadow-md transition duration-300 flex items-center gap-2 ${link.color}`}
        >
          {link.icon}
          {link.name}
        </a>
      ))}
    </div>
  );
}
