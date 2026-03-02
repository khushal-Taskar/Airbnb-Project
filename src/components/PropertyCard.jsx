import React, { useState } from "react";
import { Heart, Star } from "lucide-react";

function CardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="rounded-xl bg-gray-200 dark:bg-gray-700 h-64 w-full mb-3" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
    </div>
  );
}

export default function PropertyCard({ listing, isWishlisted, onWishlistToggle, onClick, loading }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  if (loading) return <CardSkeleton />;

  const { image, title, location, price, rating, reviews, beds } = listing;

  return (
    <div
      className="group cursor-pointer transition-transform duration-300 hover:-translate-y-1"
      onClick={() => onClick(listing)}
    >
      {/* Image container */}
      <div className="relative overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-700 aspect-square">
        {!imgLoaded && (
          <div className="absolute inset-0 skeleton-loading rounded-xl" />
        )}
        <img
          src={image}
          alt={title}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Wishlist button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onWishlistToggle(listing.id);
          }}
          className="absolute top-3 right-3 p-1.5 rounded-full transition-transform hover:scale-110 focus:outline-none"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            size={22}
            className={
              isWishlisted
                ? "fill-[#ff385c] stroke-[#ff385c]"
                : "fill-black/40 stroke-white"
            }
          />
        </button>
      </div>

      {/* Card details */}
      <div className="mt-3">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate pr-2">
            {title}
          </h3>
          <div className="flex items-center gap-1 text-sm text-gray-800 dark:text-gray-200 flex-shrink-0">
            <Star size={12} className="fill-current text-gray-800 dark:text-gray-200" />
            <span>{rating}</span>
          </div>
        </div>

        <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">{location}</p>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {beds} bed{beds !== 1 ? "s" : ""} · {reviews} reviews
        </p>

        <div className="mt-1.5 flex items-baseline gap-1">
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            ₹{price.toLocaleString("en-IN")}
          </span>
          <span className="text-gray-600 dark:text-gray-400 text-sm">/ night</span>
        </div>
      </div>
    </div>
  );
}
