import React from "react";
import PropertyCard from "../components/PropertyCard";
import FilterBar from "../components/FilterBar";

export default function Home({
  listings,
  wishlist,
  onWishlistToggle,
  activeCategory,
  setActiveCategory,
  locationFilter,
  setLocationFilter,
  priceRange,
  setPriceRange,
  onClearFilters,
  loading,
}) {
  const skeletons = Array.from({ length: 8 });

  return (
    <>
      <FilterBar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        locationFilter={locationFilter}
        setLocationFilter={setLocationFilter}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        onClear={onClearFilters}
      />

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 py-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {skeletons.map((_, i) => (
              <PropertyCard key={i} loading />
            ))}
          </div>
        ) : listings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-6xl mb-4">🏡</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              No properties found
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm">
              Try adjusting your filters or search terms to find what you&apos;re looking for.
            </p>
            <button
              onClick={onClearFilters}
              className="bg-[#ff385c] text-white px-6 py-3 rounded-full font-medium hover:bg-[#e0304f] transition-colors"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {listings.map((listing) => (
              <PropertyCard
                key={listing.id}
                listing={listing}
                isWishlisted={wishlist.has(listing.id)}
                onWishlistToggle={onWishlistToggle}
                loading={false}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
