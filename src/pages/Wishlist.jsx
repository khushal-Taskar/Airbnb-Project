import React from "react";
import { Link } from "react-router-dom";
import { Heart, Star, ChevronRight } from "lucide-react";
import { listings } from "../data/listings";
import { useApp } from "../context/AppContext";

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useApp();

  const wishlisted = listings.filter((l) => wishlist.has(l.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <Link to="/" className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
          Home
        </Link>
        <ChevronRight size={14} />
        <span className="text-gray-900 dark:text-gray-100">Wishlist</span>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
        Wishlist
      </h1>

      {wishlisted.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <Heart size={64} className="text-gray-300 dark:text-gray-600 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            No saved properties yet
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm">
            Start exploring and save your favorite places
          </p>
          <Link
            to="/"
            className="bg-gradient-to-r from-[#ff385c] to-[#e31c5f] text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            Start Exploring
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlisted.map((property) => (
            <Link
              key={property.id}
              to={`/property/${property.id}`}
              className="group block rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleWishlist(property.id);
                  }}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 transition-colors"
                  aria-label="Remove from wishlist"
                >
                  <Heart size={18} className="fill-[#ff385c] text-[#ff385c]" />
                </button>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate pr-2">
                    {property.title}
                  </h3>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Star size={14} className="fill-current text-gray-900 dark:text-gray-100" />
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {property.rating}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {property.location}
                </p>
                <p className="text-sm text-gray-900 dark:text-gray-100">
                  <span className="font-semibold">₹{property.price.toLocaleString("en-IN")}</span>
                  <span className="text-gray-500 dark:text-gray-400"> / night</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
