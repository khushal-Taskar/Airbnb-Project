import React, { useState } from "react";
import { X, Star, Wifi, Waves, Utensils, Wind, Car, Flame } from "lucide-react";
import BookingCard from "./BookingCard";

const amenityIcons = {
  WiFi: <Wifi size={16} />,
  Pool: <Waves size={16} />,
  Kitchen: <Utensils size={16} />,
  "Air conditioning": <Wind size={16} />,
  Parking: <Car size={16} />,
  Fireplace: <Flame size={16} />,
};

export default function PropertyModal({ property, onClose, isLoggedIn, onLoginClick }) {
  const [activeImg, setActiveImg] = useState(0);

  if (!property) return null;

  const {
    title,
    location,
    rating,
    reviews,
    description,
    amenities,
    beds,
    baths,
    guests,
    price,
    images,
  } = property;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center overflow-y-auto py-8 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-4xl relative shadow-2xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Close"
        >
          <X size={18} className="text-gray-700 dark:text-gray-300" />
        </button>

        {/* Image gallery */}
        <div className="relative overflow-hidden rounded-t-2xl">
          <img
            src={images[activeImg]}
            alt={`${title} - photo ${activeImg + 1}`}
            loading="lazy"
            className="w-full h-72 sm:h-96 object-cover"
          />
          {/* Thumbnail strip */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === activeImg ? "bg-white w-5" : "bg-white/60"
                }`}
                aria-label={`Photo ${i + 1}`}
              />
            ))}
          </div>
          {/* Thumbnail row */}
          <div className="absolute bottom-3 right-4 flex gap-1.5">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`w-12 h-9 rounded-md overflow-hidden border-2 transition-all ${
                  i === activeImg ? "border-white" : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Details */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{title}</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1">{location}</p>
              <div className="flex items-center gap-2 mt-2 text-sm text-gray-700 dark:text-gray-300">
                <Star size={14} className="fill-current" />
                <span className="font-semibold">{rating}</span>
                <span className="text-gray-500 dark:text-gray-400">({reviews} reviews)</span>
                <span className="text-gray-300 dark:text-gray-600">·</span>
                <span>{beds} bed{beds !== 1 ? "s" : ""}</span>
                <span className="text-gray-300 dark:text-gray-600">·</span>
                <span>{baths} bath{baths !== 1 ? "s" : ""}</span>
                <span className="text-gray-300 dark:text-gray-600">·</span>
                <span>Up to {guests} guests</span>
              </div>
            </div>

            <hr className="border-gray-200 dark:border-gray-700" />

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">About this place</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
            </div>

            <hr className="border-gray-200 dark:border-gray-700" />

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">What this place offers</h3>
              <div className="grid grid-cols-2 gap-3">
                {amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                    <span className="text-gray-500 dark:text-gray-400">
                      {amenityIcons[amenity] || <span className="w-4 h-4 inline-block" />}
                    </span>
                    {amenity}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Booking widget */}
          <div className="lg:col-span-1">
            <BookingCard
              price={price}
              isLoggedIn={isLoggedIn}
              onLoginClick={onLoginClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
