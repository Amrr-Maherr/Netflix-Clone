"use client";

import { useTranslation } from "react-i18next";


export default function AskedQuestions() {
  const { t } = useTranslation("common");
  const faqs = [
    { question: t("faq_1_q"), answer: t("faq_1_a") },
    { question: t("faq_2_q"), answer: t("faq_2_a") },
    { question: t("faq_3_q"), answer: t("faq_3_a") },
    { question: t("faq_4_q"), answer: t("faq_4_a") },
    { question: t("faq_5_q"), answer: t("faq_5_a") },
    { question: t("faq_6_q"), answer: t("faq_6_a") },
  ];
  return (
    <div className="bg-black text-white py-5 md:py-24 container">
      <div className="mx-auto text-start">
        <h2 className="text-3xl font-bold text-red-500">
          Frequently Asked Questions
        </h2>
        <p className="mt-4 text-gray-400">
          Have a different question and can’t find the answer you’re looking
          for? Reach out to our support team by sending us an email and we’ll
          get back to you as soon as we can.
        </p>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {faqs.map((faq, index) => (
          <div key={index} className="pt-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
            <p className="mt-2 text-gray-600 text-sm">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
