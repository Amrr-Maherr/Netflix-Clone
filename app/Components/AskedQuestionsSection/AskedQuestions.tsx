"use client";

const faqs = [
  {
    question: "What is Netflix?",
    answer:
      "Netflix is a streaming service that offers movies, TV shows, documentaries, and more on thousands of devices.",
  },
  {
    question: "How much does Netflix cost?",
    answer:
      "Plans start at $9.99 and go up depending on the number of screens and video quality you choose.",
  },
  {
    question: "Where can I watch?",
    answer:
      "You can watch Netflix on your phone, tablet, smart TV, laptop, or any streaming device connected to the internet.",
  },
  {
    question: "How do I cancel my subscription?",
    answer:
      "You can cancel anytime online. There are no contracts or cancellation fees.",
  },
  {
    question: "What kind of content is available?",
    answer:
      "Netflix offers a wide variety of movies, TV shows, anime, documentaries, and exclusive Netflix Originals.",
  },
  {
    question: "Is there content for kids?",
    answer:
      "Yes! Netflix Kids allows parents to control what their children watch while giving them access to family-friendly shows and movies.",
  },
];

export default function AskedQuestions() {
  return (
    <div className="bg-black text-white py-24 container">
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
