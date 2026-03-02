import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Star,
  Heart,
  Share,
  ChevronLeft,
  ChevronRight,
  Wifi,
  Waves,
  Utensils,
  Wind,
  Car,
  Flame,
  Bed,
  Bath,
  Users,
  Minus,
  Plus,
  MapPin,
} from "lucide-react";
import { listings } from "../data/listings";
import { useApp } from "../context/AppContext";

const amenityIcons = {
  WiFi: <Wifi size={18} />,
  Pool: <Waves size={18} />,
  Kitchen: <Utensils size={18} />,
  "Air conditioning": <Wind size={18} />,
  Parking: <Car size={18} />,
  Fireplace: <Flame size={18} />,
};

const SERVICE_FEE_RATE = 0.12;

function getTodayStr() {
  return new Date().toISOString().split("T")[0];
}

function addDays(dateStr, days) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

function daysBetween(a, b) {
  if (!a || !b) return 0;
  const ms = new Date(b) - new Date(a);
  return Math.max(0, Math.floor(ms / 86400000));
}

const mockReviews = [
  {
    id: 1,
    name: "Ananya",
    date: "October 2024",
    rating: 5,
    text: "Absolutely wonderful stay! The place was exactly as described and the host was very responsive. Would definitely come back.",
  },
  {
    id: 2,
    name: "Rahul",
    date: "September 2024",
    rating: 4,
    text: "Great location and beautiful property. Very clean and well-maintained. The amenities were top-notch.",
  },
  {
    id: 3,
    name: "Meera",
    date: "August 2024",
    rating: 5,
    text: "One of the best Airbnb experiences we've had. The views were breathtaking and everything was perfect for our family vacation.",
  },
];

export default function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { wishlist, toggleWishlist, isLoggedIn, showAuthModal } = useApp();

  const property = listings.find((l) => l.id === Number(id));

  const [activeImg, setActiveImg] = useState(0);
  const today = getTodayStr();
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(addDays(today, 3));
  const [guests, setGuests] = useState(1);

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-950 px-4">
        <h1 className="text-6xl font-bold text-gray-300 dark:text-gray-700">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mt-4">Property not found</p>
        <Link
          to="/"
          className="mt-6 px-6 py-3 bg-gradient-to-r from-[#ff385c] to-[#e31c5f] text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const {
    title,
    location,
    rating,
    reviews,
    description,
    amenities,
    beds,
    baths,
    guests: maxGuests,
    price,
    images,
  } = property;

  const nights = daysBetween(checkIn, checkOut);
  const serviceFee = Math.round(price * nights * SERVICE_FEE_RATE);
  const total = price * nights + serviceFee;
  const isWishlisted = wishlist.has(property.id);

  const prevImg = () => setActiveImg((i) => (i === 0 ? images.length - 1 : i - 1));
  const nextImg = () => setActiveImg((i) => (i === images.length - 1 ? 0 : i + 1));

  const handleReserve = () => {
    if (!isLoggedIn) {
      showAuthModal();
      return;
    }
    navigate(`/booking/${property.id}`, {
      state: {
        checkIn,
        checkOut,
        guests,
        nights,
        price,
        serviceFee,
        total,
      },
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
        <Link to="/" className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-gray-100 truncate">{title}</span>
      </nav>

      {/* Title section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">{title}</h1>
          <div className="flex flex-wrap items-center gap-2 mt-1.5 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Star size={14} className="fill-current text-gray-900 dark:text-gray-100" />
              <span className="font-semibold text-gray-900 dark:text-gray-100">{rating}</span>
            </div>
            <span>·</span>
            <span className="underline">{reviews} reviews</span>
            <span>·</span>
            <span>{location}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm font-semibold text-gray-700 dark:text-gray-300">
            <Share size={16} />
            Share
          </button>
          <button
            onClick={() => toggleWishlist(property.id)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm font-semibold text-gray-700 dark:text-gray-300"
          >
            <Heart
              size={16}
              className={isWishlisted ? "fill-[#ff385c] text-[#ff385c]" : ""}
            />
            {isWishlisted ? "Saved" : "Save"}
          </button>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="relative rounded-2xl overflow-hidden mb-8">
        {/* Desktop grid */}
        <div className="hidden md:grid md:grid-cols-4 md:grid-rows-2 gap-2 h-[420px]">
          <div
            className="col-span-2 row-span-2 cursor-pointer"
            onClick={() => setActiveImg(0)}
          >
            <img
              src={images[0]}
              alt={`${title} - photo 1`}
              className="w-full h-full object-cover rounded-l-2xl hover:brightness-90 transition-all"
            />
          </div>
          {images.slice(1, 5).map((img, i) => (
            <div
              key={i}
              className="cursor-pointer"
              onClick={() => setActiveImg(i + 1)}
            >
              <img
                src={img}
                alt={`${title} - photo ${i + 2}`}
                className={`w-full h-full object-cover hover:brightness-90 transition-all ${
                  i === 1 ? "rounded-tr-2xl" : ""
                } ${i === 3 ? "rounded-br-2xl" : ""}`}
              />
            </div>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden relative">
          <img
            src={images[activeImg]}
            alt={`${title} - photo ${activeImg + 1}`}
            className="w-full h-72 sm:h-80 object-cover"
          />
          <button
            onClick={prevImg}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 rounded-full p-2 shadow-md hover:bg-white dark:hover:bg-gray-700 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={nextImg}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 rounded-full p-2 shadow-md hover:bg-white dark:hover:bg-gray-700 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight size={18} />
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
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
        </div>
      </div>

      {/* Main content: two-column layout on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Info bar */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Entire place in {location}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1.5">
                <Users size={16} />
                <span>{maxGuests} guests</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Bed size={16} />
                <span>{beds} bed{beds !== 1 ? "s" : ""}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Bath size={16} />
                <span>{baths} bath{baths !== 1 ? "s" : ""}</span>
              </div>
            </div>
          </div>

          <hr className="border-gray-200 dark:border-gray-700" />

          {/* Host section */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-lg font-bold text-white">
              P
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-gray-100">Hosted by Priya</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Superhost · 5 years hosting</p>
            </div>
          </div>

          <hr className="border-gray-200 dark:border-gray-700" />

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">About this place</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
          </div>

          <hr className="border-gray-200 dark:border-gray-700" />

          {/* Amenities */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">What this place offers</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {amenities.map((amenity) => (
                <div
                  key={amenity}
                  className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
                >
                  <span className="text-gray-500 dark:text-gray-400">
                    {amenityIcons[amenity] || <span className="w-[18px] h-[18px] inline-block" />}
                  </span>
                  <span className="text-sm">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-gray-200 dark:border-gray-700" />

          {/* Reviews */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Star size={18} className="fill-current text-gray-900 dark:text-gray-100" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {rating} · {reviews} reviews
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {mockReviews.map((review) => (
                <div key={review.id} className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-bold text-gray-600 dark:text-gray-300">
                      {review.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">{review.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: review.rating }, (_, i) => (
                      <Star key={i} size={12} className="fill-current text-gray-900 dark:text-gray-100" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{review.text}</p>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-gray-200 dark:border-gray-700" />

          {/* Map placeholder */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Where you'll be</h3>
            <div className="w-full h-64 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center">
              <div className="text-center text-gray-400 dark:text-gray-500">
                <MapPin size={32} className="mx-auto mb-2" />
                <p className="text-sm">Map will be shown here</p>
                <p className="text-xs mt-1">{location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Booking Card */}
        <div className="lg:col-span-1">
          <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-lg bg-white dark:bg-gray-800 sticky top-32">
            {/* Price header */}
            <div className="flex items-baseline gap-1 mb-5">
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                ₹{price.toLocaleString("en-IN")}
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">/ night</span>
            </div>

            {/* Date pickers */}
            <div className="grid grid-cols-2 border border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden mb-3">
              <div className="p-3 border-r border-gray-300 dark:border-gray-600">
                <p className="text-[10px] font-bold uppercase text-gray-700 dark:text-gray-300 tracking-wider mb-1">
                  Check-in
                </p>
                <input
                  type="date"
                  value={checkIn}
                  min={today}
                  onChange={(e) => {
                    setCheckIn(e.target.value);
                    if (e.target.value >= checkOut) {
                      setCheckOut(addDays(e.target.value, 1));
                    }
                  }}
                  className="text-sm text-gray-800 dark:text-gray-200 bg-transparent outline-none w-full cursor-pointer"
                />
              </div>
              <div className="p-3">
                <p className="text-[10px] font-bold uppercase text-gray-700 dark:text-gray-300 tracking-wider mb-1">
                  Check-out
                </p>
                <input
                  type="date"
                  value={checkOut}
                  min={addDays(checkIn, 1)}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="text-sm text-gray-800 dark:text-gray-200 bg-transparent outline-none w-full cursor-pointer"
                />
              </div>
            </div>

            {/* Guests counter */}
            <div className="border border-gray-300 dark:border-gray-600 rounded-xl p-3 mb-4">
              <p className="text-[10px] font-bold uppercase text-gray-700 dark:text-gray-300 tracking-wider mb-1">
                Guests
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-800 dark:text-gray-200">
                  {guests} guest{guests !== 1 ? "s" : ""}
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setGuests((g) => Math.max(1, g - 1))}
                    className="w-7 h-7 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:border-gray-900 dark:hover:border-gray-200 disabled:opacity-30 transition-colors"
                    disabled={guests <= 1}
                    aria-label="Decrease guests"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100 w-4 text-center">
                    {guests}
                  </span>
                  <button
                    onClick={() => setGuests((g) => Math.min(maxGuests, g + 1))}
                    className="w-7 h-7 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:border-gray-900 dark:hover:border-gray-200 disabled:opacity-30 transition-colors"
                    disabled={guests >= maxGuests}
                    aria-label="Increase guests"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Reserve button */}
            <button
              onClick={handleReserve}
              className="w-full bg-gradient-to-r from-[#ff385c] to-[#e31c5f] text-white py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity text-sm"
            >
              {isLoggedIn ? "Reserve" : "Log in to reserve"}
            </button>

            <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2">
              You won&apos;t be charged yet
            </p>

            {/* Price breakdown */}
            {nights > 0 && (
              <div className="mt-5 space-y-3 text-sm border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>
                    ₹{price.toLocaleString("en-IN")} × {nights} night{nights !== 1 ? "s" : ""}
                  </span>
                  <span>₹{(price * nights).toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Airbnb service fee</span>
                  <span>₹{serviceFee.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between font-bold text-gray-900 dark:text-gray-100 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <span>Total</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
