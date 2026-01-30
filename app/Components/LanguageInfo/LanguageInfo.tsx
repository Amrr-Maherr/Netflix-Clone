"use client";

import React from "react";
import { Globe, Volume2 } from "lucide-react";

interface SpokenLanguage {
  iso_639_1: string;
  english_name: string;
  name: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  english_name: string;
  name: string;
}

interface LanguageInfoProps {
  languages?: SpokenLanguage[];
  countries?: ProductionCountry[];
  className?: string;
}

export default function LanguageInfo({ languages, countries, className = "" }: LanguageInfoProps) {
  const languagesCount = languages?.length || 0;
  const countriesCount = countries?.length || 0;

  if (languagesCount === 0 && countriesCount === 0) {
    return null;
  }

  return (
    <section className={`mb-8 ${className}`}>
      <h2 className="text-2xl font-bold mb-6">Language & Origin</h2>
      
      <div className="flex flex-wrap gap-3">
        {/* Spoken Languages */}
        {languages?.slice(0, 5).map((language) => (
          <div
            key={language.iso_639_1}
            className="flex items-center gap-2 px-3 py-2 bg-gray-900/50 rounded-lg border border-gray-800"
          >
            <Globe size={16} className="text-blue-400" />
            <div>
              <p className="text-white font-medium text-sm">
                {language.english_name}
              </p>
              <p className="text-gray-400 text-xs">
                {language.name}
              </p>
            </div>
          </div>
        ))}
        
        {/* Production Countries */}
        {countries?.slice(0, 3).map((country) => (
          <div
            key={country.iso_3166_1}
            className="flex items-center gap-2 px-3 py-2 bg-gray-900/50 rounded-lg border border-gray-800"
          >
            <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-xs font-bold text-white">
              {country.iso_3166_1}
            </div>
            <div>
              <p className="text-white font-medium text-sm">
                {country.english_name}
              </p>
              <p className="text-gray-400 text-xs">
                {country.name}
              </p>
            </div>
          </div>
        ))}
        
        {/* More indicator */}
        {(languagesCount > 5 || countriesCount > 3) && (
          <span className="text-gray-400 text-sm self-center">
            +{(languagesCount - 5 || 0) + (countriesCount - 3 || 0)} more
          </span>
        )}
      </div>
    </section>
  );
}
