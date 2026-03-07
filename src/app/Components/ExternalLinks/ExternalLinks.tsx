"use client";

import React from "react";
import { ExternalLink, Facebook, Twitter, Instagram } from "lucide-react";

interface ExternalIds {
  imdb_id?: string;
  facebook_id?: string;
  instagram_id?: string;
  twitter_id?: string;
  wikidata_id?: string;
}

interface ExternalLinksProps {
  externalIds: ExternalIds;
  title: string;
  className?: string;
}

export default function ExternalLinks({ externalIds, title, className = "" }: ExternalLinksProps) {
  const links = [];

  if (externalIds.imdb_id) {
    links.push({
      name: "IMDb",
      url: `https://www.imdb.com/title/${externalIds.imdb_id}`,
      icon: ExternalLink,
      color: "text-yellow-400"
    });
  }

  if (externalIds.facebook_id) {
    links.push({
      name: "Facebook",
      url: `https://www.facebook.com/${externalIds.facebook_id}`,
      icon: Facebook,
      color: "text-blue-400"
    });
  }

  if (externalIds.twitter_id) {
    links.push({
      name: "Twitter",
      url: `https://twitter.com/${externalIds.twitter_id}`,
      icon: Twitter,
      color: "text-sky-400"
    });
  }

  if (externalIds.instagram_id) {
    links.push({
      name: "Instagram",
      url: `https://www.instagram.com/${externalIds.instagram_id}`,
      icon: Instagram,
      color: "text-pink-400"
    });
  }

  if (links.length === 0) return null;

  return (
    <section className={`mb-8 ${className}`}>
      <h2 className="text-2xl font-bold mb-6">External Links</h2>
      
      <div className="flex flex-wrap gap-3">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-900/50 rounded-lg border border-gray-800 hover:bg-gray-900/70 transition-colors group"
            >
              <Icon size={18} className={link.color} />
              <span className="text-white font-medium text-sm group-hover:text-gray-200 transition-colors">
                {link.name}
              </span>
              <ExternalLink size={14} className="text-gray-400 group-hover:text-white transition-colors" />
            </a>
          );
        })}
      </div>
    </section>
  );
}
