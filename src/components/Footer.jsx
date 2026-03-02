import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Globe } from "lucide-react";

const footerLinks = {
  Support: [
    { label: "Help Centre", to: "/help" },
    { label: "AirCover", to: "/aircover" },
    { label: "Anti-discrimination", to: "/anti-discrimination" },
    { label: "Disability support", to: "/disability-support" },
    { label: "Cancellation options", to: "/cancellation" },
  ],
  Hosting: [
    { label: "Airbnb your home", to: "/host" },
    { label: "AirCover for Hosts", to: "/aircover-hosts" },
    { label: "Hosting resources", to: "/hosting-resources" },
    { label: "Community forum", to: "/community-forum" },
  ],
  Airbnb: [
    { label: "Newsroom", to: "/newsroom" },
    { label: "Careers", to: "/careers" },
    { label: "Investors", to: "/investors" },
    { label: "Emergency stays", to: "/emergency-stays" },
  ],
  Inspiration: [
    { label: "Nashville", to: "/inspiration/nashville" },
    { label: "Kyoto", to: "/inspiration/kyoto" },
    { label: "Brooklyn", to: "/inspiration/brooklyn" },
    { label: "Maui", to: "/inspiration/maui" },
    { label: "San Diego", to: "/inspiration/san-diego" },
  ],
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
                <Link
                  key={item.label}
                  to={item.to}
                  className="block hover:underline cursor-pointer mb-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap items-center gap-2 text-gray-600 dark:text-gray-400">
            <span>© 2025 Airbnb, Inc.</span>
            <span>·</span>
            <Link to="/privacy" className="hover:underline hover:text-gray-900 dark:hover:text-gray-100">Privacy</Link>
            <span>·</span>
            <Link to="/terms" className="hover:underline hover:text-gray-900 dark:hover:text-gray-100">Terms</Link>
            <span>·</span>
            <Link to="/" className="hover:underline hover:text-gray-900 dark:hover:text-gray-100">Sitemap</Link>
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
