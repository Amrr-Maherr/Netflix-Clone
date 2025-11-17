"use client";

import { useTranslation } from "next-i18next";
import i18next from "i18next"; 
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function LangSwitcher() {
  const { t } = useTranslation();

  const toggleLang = (lang: string) => {
    i18next.changeLanguage(lang);

    document.documentElement.lang = lang;
    // document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  };

  return (
    <Select onValueChange={toggleLang} defaultValue={i18next.language}>
      <SelectTrigger className="bg-black border-gray-500 text-gray-300">
        <SelectValue placeholder="Language" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="ar">العربية</SelectItem>
      </SelectContent>
    </Select>
  );
}
