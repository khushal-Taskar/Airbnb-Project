import React, { useState } from "react";
import { Globe } from "lucide-react";

const footerLinks = {
  Support: ["Help Centre", "AirCover", "Anti-discrimination", "Disability support", "Cancellation options"],
  Hosting: ["Airbnb your home", "AirCover for Hosts", "Hosting resources", "Community forum"],
  Airbnb: ["Newsroom", "Careers", "Investors", "Emergency stays"],
  Inspiration: ["Nashville", "Kyoto", "Brooklyn", "Maui", "San Diego"],
};

export default function Footer() {
  const [language, setLanguage] = useState("English (IN)");
  const [currency, setCurrency] = useState("₹ INR");

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-16 text-sm text-gray-700 dark:text-gray-300">
      <div className="max-w-[1600px] mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">{section}</h4>
              {links.map((item) => (
                <p
                  key={item}
                  className="hover:underline cursor-pointer mb-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                  {item}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap items-center gap-2 text-gray-600 dark:text-gray-400">
            <span>© 2025 Airbnb, Inc.</span>
            <span>·</span>
            <a href="#" className="hover:underline hover:text-gray-900 dark:hover:text-gray-100">Privacy</a>
            <span>·</span>
            <a href="#" className="hover:underline hover:text-gray-900 dark:hover:text-gray-100">Terms</a>
            <span>·</span>
            <a href="#" className="hover:underline hover:text-gray-900 dark:hover:text-gray-100">Sitemap</a>
          </div>

          <div className="flex items-center gap-4 font-medium text-gray-800 dark:text-gray-200">
            <button
              className="flex items-center gap-2 cursor-pointer hover:underline"
              onClick={() => setLanguage(language === "English (IN)" ? "हिन्दी (IN)" : "English (IN)")}
            >
              <Globe size={16} />
              <span>{language}</span>
            </button>
            <button
              className="cursor-pointer hover:underline"
              onClick={() => setCurrency(currency === "₹ INR" ? "$ USD" : "₹ INR")}
            >
              {currency}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
