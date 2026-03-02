import React from "react";
import { Search, X } from "lucide-react";
import { categories } from "../data/listings";

export default function FilterBar({
  activeCategory,
  setActiveCategory,
  locationFilter,
  setLocationFilter,
  priceRange,
  setPriceRange,
  onClear,
}) {
  const hasActiveFilters =
    activeCategory !== "all" ||
    locationFilter !== "" ||
    priceRange[0] !== 0 ||
    priceRange[1] !== 20000;

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky z-40" style={{ top: "var(--navbar-height)" }}>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide flex-1 min-w-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                activeCategory === cat.id
                  ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-gray-900 dark:hover:border-gray-300"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Filters row */}
        <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
          {/* Location search */}
          <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded-full px-3 py-1.5 bg-white dark:bg-gray-800 min-w-[160px]">
            <Search size={14} className="text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Location"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="text-sm outline-none bg-transparent text-gray-800 dark:text-gray-200 placeholder-gray-400 w-full"
            />
            {locationFilter && (
              <button onClick={() => setLocationFilter("")} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <X size={14} />
              </button>
            )}
          </div>

          {/* Price range */}
          <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded-full px-3 py-1.5 bg-white dark:bg-gray-800">
            <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">₹{priceRange[0].toLocaleString("en-IN")}</span>
            <input
              type="range"
              min={0}
              max={20000}
              step={500}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-24 accent-[#ff385c]"
              aria-label="Maximum price"
            />
            <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">₹{priceRange[1].toLocaleString("en-IN")}</span>
          </div>

          {/* Clear filters */}
          {hasActiveFilters && (
            <button
              onClick={onClear}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-[#ff385c] border border-[#ff385c] rounded-full hover:bg-[#ff385c] hover:text-white transition-colors"
            >
              <X size={14} />
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
