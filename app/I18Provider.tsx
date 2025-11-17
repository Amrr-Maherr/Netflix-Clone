"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

export default function I18Provider({ children }: Props) {
  useEffect(() => {
    if (!i18n.isInitialized) {
      i18n.use(initReactI18next).init({
        lng: "en",
        fallbackLng: "en",
        resources: {
          en: {
            common: require("../public/locales/en/common.json"),
          },
          ar: {
            common: require("../public/locales/ar/common.json"),
          },
        },
      });
    }
  }, []);

  return <>{children}</>;
}
