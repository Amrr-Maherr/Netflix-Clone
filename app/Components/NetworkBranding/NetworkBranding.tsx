"use client";

import React from "react";
import Image from "next/image";
import { Tv } from "lucide-react";

interface Network {
  id: number;
  logo_path?: string;
  name: string;
  origin_country?: string;
}

interface NetworkBrandingProps {
  networks: Network[];
  className?: string;
  maxNetworks?: number;
}

export default function NetworkBranding({ networks, className = "", maxNetworks = 4 }: NetworkBrandingProps) {
  const displayNetworks = networks.slice(0, maxNetworks);

  if (!displayNetworks.length) return null;

  return (
    <section className={`mb-8 ${className}`}>
      <h2 className="text-2xl font-bold mb-6">Networks</h2>
      
      <div className="flex flex-wrap gap-4 items-center">
        {displayNetworks.map((network) => (
          <div
            key={network.id}
            className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg border border-gray-800 hover:bg-gray-900/70 transition-colors"
          >
            {network.logo_path ? (
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image
                  src={`https://image.tmdb.org/t/p/w92${network.logo_path}`}
                  alt={network.name}
                  fill
                  className="object-contain"
                  sizes="48px"
                />
              </div>
            ) : (
              <div className="w-12 h-12 bg-gray-800 rounded flex items-center justify-center flex-shrink-0">
                <Tv size={20} className="text-gray-600" />
              </div>
            )}
            
            <div className="min-w-0">
              <p className="text-white font-medium text-sm truncate">
                {network.name}
              </p>
              {network.origin_country && (
                <p className="text-gray-400 text-xs">
                  {network.origin_country}
                </p>
              )}
            </div>
          </div>
        ))}
        
        {networks.length > maxNetworks && (
          <span className="text-gray-400 text-sm">
            +{networks.length - maxNetworks} more
          </span>
        )}
      </div>
    </section>
  );
}
