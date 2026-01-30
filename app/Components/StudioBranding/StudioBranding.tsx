"use client";

import React from "react";
import Image from "next/image";
import { Building2 } from "lucide-react";

interface ProductionCompany {
  id: number;
  logo_path?: string;
  name: string;
  origin_country?: string;
}

interface StudioBrandingProps {
  companies: ProductionCompany[];
  className?: string;
  maxCompanies?: number;
}

export default function StudioBranding({ companies, className = "", maxCompanies = 6 }: StudioBrandingProps) {
  const displayCompanies = companies.slice(0, maxCompanies);

  if (!displayCompanies.length) return null;

  return (
    <section className={`mb-8 ${className}`}>
      <h2 className="text-2xl font-bold mb-6">Studios & Production</h2>
      
      <div className="flex flex-wrap gap-4 items-center">
        {displayCompanies.map((company) => (
          <div
            key={company.id}
            className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg border border-gray-800 hover:bg-gray-900/70 transition-colors"
          >
            {company.logo_path ? (
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image
                  src={`https://image.tmdb.org/t/p/w92${company.logo_path}`}
                  alt={company.name}
                  fill
                  className="object-contain"
                  sizes="48px"
                />
              </div>
            ) : (
              <div className="w-12 h-12 bg-gray-800 rounded flex items-center justify-center flex-shrink-0">
                <Building2 size={20} className="text-gray-600" />
              </div>
            )}
            
            <div className="min-w-0">
              <p className="text-white font-medium text-sm truncate">
                {company.name}
              </p>
              {company.origin_country && (
                <p className="text-gray-400 text-xs">
                  {company.origin_country}
                </p>
              )}
            </div>
          </div>
        ))}
        
        {companies.length > maxCompanies && (
          <span className="text-gray-400 text-sm">
            +{companies.length - maxCompanies} more
          </span>
        )}
      </div>
    </section>
  );
}
