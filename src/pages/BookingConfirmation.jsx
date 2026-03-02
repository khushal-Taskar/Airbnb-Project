import React from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { Calendar, Users, MapPin, ChevronRight } from "lucide-react";
import { listings } from "../data/listings";
import { useApp } from "../context/AppContext";

const CLEANING_FEE = 500;
const TAX_RATE = 0.1;

export default function BookingConfirmation() {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  useApp();

  const bookingState = location.state;
  const property = listings.find((l) => l.id === Number(propertyId));

  if (!bookingState || !property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-950 px-4">
        <h1 className="text-6xl font-bold text-gray-300 dark:text-gray-700">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mt-4">
          Booking details not found
        </p>
        <Link
          to="/"
          className="mt-6 px-6 py-3 bg-gradient-to-r from-[#ff385c] to-[#e31c5f] text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const { checkIn, checkOut, guests, nights, price, serviceFee } = bookingState;
  const subtotal = price * nights;
  const cleaningFee = CLEANING_FEE;
  const taxes = Math.round(subtotal * TAX_RATE);
  const total = subtotal + cleaningFee + serviceFee + taxes;

  const handleProceedToPayment = () => {
    navigate(`/payment/${propertyId}`, {
      state: {
        checkIn,
        checkOut,
        guests,
        nights,
        price,
        serviceFee,
        cleaningFee,
        taxes,
        total,
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <Link to="/" className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
          Home
        </Link>
        <ChevronRight size={14} />
        <Link
          to={`/property/${propertyId}`}
          className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors truncate"
        >
          {property.title}
        </Link>
        <ChevronRight size={14} />
        <span className="text-gray-900 dark:text-gray-100">Booking</span>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
        Confirm your booking
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Property & Booking Details */}
        <div className="space-y-6">
          {/* Property card */}
          <div className="flex gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800">
            <img
              src={property.image}
              alt={property.title}
              className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-xl flex-shrink-0"
            />
            <div className="min-w-0">
              <h2 className="font-semibold text-gray-900 dark:text-gray-100 text-lg truncate">
                {property.title}
              </h2>
              <p className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mt-1">
                <MapPin size={14} />
                {property.location}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                ★ {property.rating} ({property.reviews} reviews)
              </p>
            </div>
          </div>

          {/* Booking summary */}
          <div className="p-5 border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800 space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
              Booking Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 tracking-wider mb-1">
                  Check-in
                </p>
                <p className="flex items-center gap-1.5 text-sm text-gray-900 dark:text-gray-100">
                  <Calendar size={14} />
                  {new Date(checkIn).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 tracking-wider mb-1">
                  Check-out
                </p>
                <p className="flex items-center gap-1.5 text-sm text-gray-900 dark:text-gray-100">
                  <Calendar size={14} />
                  {new Date(checkOut).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 tracking-wider mb-1">
                  Guests
                </p>
                <p className="flex items-center gap-1.5 text-sm text-gray-900 dark:text-gray-100">
                  <Users size={14} />
                  {guests} guest{guests !== 1 ? "s" : ""}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 tracking-wider mb-1">
                  Duration
                </p>
                <p className="text-sm text-gray-900 dark:text-gray-100">
                  {nights} night{nights !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Price Breakdown */}
        <div>
          <div className="p-5 border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg mb-4">
              Price Breakdown
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-700 dark:text-gray-300">
                <span>
                  ₹{price.toLocaleString("en-IN")} × {nights} night{nights !== 1 ? "s" : ""}
                </span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-gray-700 dark:text-gray-300">
                <span>Cleaning fee</span>
                <span>₹{cleaningFee.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-gray-700 dark:text-gray-300">
                <span>Service fee</span>
                <span>₹{serviceFee.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-gray-700 dark:text-gray-300">
                <span>Taxes (10%)</span>
                <span>₹{taxes.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 dark:text-gray-100 pt-3 border-t border-gray-200 dark:border-gray-700">
                <span>Total</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <button
              onClick={handleProceedToPayment}
              className="w-full mt-6 bg-gradient-to-r from-[#ff385c] to-[#e31c5f] text-white py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity text-sm"
            >
              Proceed to Payment
            </button>

            <Link
              to={`/property/${propertyId}`}
              className="block text-center mt-3 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
            >
              ← Back to Property
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
