import React from "react";
import { useParams, Link } from "react-router-dom";
import { Home, ChevronRight, Star, MapPin } from "lucide-react";
import { listings } from "../data/listings";

const cityInfo = {
  nashville: {
    name: "Nashville",
    description: "Known as Music City, Nashville blends vibrant nightlife, legendary honky-tonks, and world-class dining. Discover live music on every corner and Southern hospitality at its finest.",
  },
  rome: {
    name: "Rome",
    description: "The Eternal City captivates with ancient ruins, Renaissance art, and irresistible cuisine. Wander cobblestone streets steeped in millennia of history.",
  },
  houston: {
    name: "Houston",
    description: "A sprawling metropolis with a booming food scene, space exploration heritage, and diverse cultural neighborhoods waiting to be explored.",
  },
  maui: {
    name: "Maui",
    description: "Paradise found — from the lush Road to Hana to the sunrise at Haleakalā. Crystal waters, golden beaches, and aloha spirit everywhere you turn.",
  },
  "san-diego": {
    name: "San Diego",
    description: "Sun-kissed beaches, world-famous zoo, and a laid-back coastal vibe make San Diego the ultimate California getaway.",
  },
  kyoto: {
    name: "Kyoto",
    description: "Step into Japan's cultural heart with ancient temples, serene bamboo groves, and traditional tea houses amid stunning seasonal landscapes.",
  },
  brooklyn: {
    name: "Brooklyn",
    description: "A borough bursting with creativity — street art, craft breweries, diverse eateries, and iconic brownstone-lined neighbourhoods.",
  },
};

export default function Inspiration() {
  const { city } = useParams();
  const info = cityInfo[city] || { name: city?.replace(/-/g, " ") || "Unknown", description: "Explore amazing stays in this destination." };
  const displayName = info.name.charAt(0).toUpperCase() + info.name.slice(1);

  const matched = listings.filter(
    (l) => l.location.toLowerCase().includes(city?.replace(/-/g, " ").toLowerCase() || "")
  );
  const properties = matched.length > 0 ? matched : listings.slice(0, 6);
  const isFeature = matched.length === 0;

  return (
    <main className="max-w-[1600px] mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6 flex-wrap">
        <Link to="/" className="flex items-center gap-1 hover:text-[#ff385c] transition-colors">
          <Home size={14} /> Home
        </Link>
        <ChevronRight size={14} />
        <span className="text-gray-600 dark:text-gray-300">Inspiration</span>
        <ChevronRight size={14} />
        <span className="text-gray-900 dark:text-gray-100 font-medium">{displayName}</span>
      </nav>

      {/* Hero */}
      <div className="bg-gradient-to-r from-[#ff385c] to-[#bd1e59] rounded-2xl p-8 sm:p-12 mb-10 text-white">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">{displayName}</h1>
        <p className="text-white/90 text-lg max-w-3xl">{info.description}</p>
      </div>

      {/* Heading */}
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        {isFeature ? `Featured properties you might love` : `Stays in ${displayName}`}
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {properties.map((p) => (
          <Link
            key={p.id}
            to={`/property/${p.id}`}
            className="group rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow bg-white dark:bg-gray-900"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">{p.title}</h3>
                <span className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300 shrink-0">
                  <Star size={14} className="fill-current text-yellow-500" /> {p.rating}
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mb-2">
                <MapPin size={13} /> {p.location}
              </p>
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                ₹{p.price.toLocaleString("en-IN")} <span className="font-normal text-sm text-gray-500 dark:text-gray-400">/ night</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
