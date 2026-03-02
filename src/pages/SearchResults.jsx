import React, { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Heart, Star, Search, ChevronRight } from "lucide-react";
import { listings } from "../data/listings";
import { useApp } from "../context/AppContext";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { wishlist, toggleWishlist } = useApp();

  const query = searchParams.get("query") || "";
  const location = searchParams.get("location") || "";
  const guests = searchParams.get("guests") || "";

  const [searchInput, setSearchInput] = useState(query);

  const results = listings.filter((l) => {
    if (query) {
      const q = query.toLowerCase();
      if (
        !l.title.toLowerCase().includes(q) &&
        !l.location.toLowerCase().includes(q) &&
        !l.description.toLowerCase().includes(q)
      )
        return false;
    }
    if (location && !l.location.toLowerCase().includes(location.toLowerCase())) return false;
    if (guests && Number(guests) > l.guests) return false;
    return true;
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchInput.trim()) params.set("query", searchInput.trim());
    if (location) params.set("location", location);
    if (guests) params.set("guests", guests);
    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <Link to="/" className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
          Home
        </Link>
        <ChevronRight size={14} />
        <span className="text-gray-900 dark:text-gray-100">Search Results</span>
      </nav>

      {/* Search bar */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex items-center gap-2 max-w-2xl">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search destinations, properties..."
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm outline-none focus:border-[#ff385c] transition-colors"
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-[#ff385c] to-[#e31c5f] text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity text-sm"
          >
            Search
          </button>
        </div>
      </form>

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        Search Results
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        {results.length} {results.length === 1 ? "property" : "properties"} found
        {query && <span> for &ldquo;{query}&rdquo;</span>}
      </p>

      {results.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <Search size={64} className="text-gray-300 dark:text-gray-600 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            No properties found
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm">
            Try adjusting your search terms or filters to find what you&apos;re looking for.
          </p>
          <Link
            to="/"
            className="bg-gradient-to-r from-[#ff385c] to-[#e31c5f] text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            Back to Home
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {results.map((property) => (
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
                  aria-label="Toggle wishlist"
                >
                  <Heart
                    size={18}
                    className={
                      wishlist.has(property.id)
                        ? "fill-[#ff385c] text-[#ff385c]"
                        : "text-gray-600 dark:text-gray-300"
                    }
                  />
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
