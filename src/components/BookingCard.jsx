import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";

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

export default function BookingCard({ price, isLoggedIn, onLoginClick }) {
  const today = getTodayStr();
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(addDays(today, 3));
  const [guests, setGuests] = useState(1);

  const nights = daysBetween(checkIn, checkOut);
  const serviceFee = Math.round(price * nights * SERVICE_FEE_RATE);
  const total = price * nights + serviceFee;

  return (
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
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100 w-4 text-center">{guests}</span>
            <button
              onClick={() => setGuests((g) => Math.min(16, g + 1))}
              className="w-7 h-7 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:border-gray-900 dark:hover:border-gray-200 disabled:opacity-30 transition-colors"
              disabled={guests >= 16}
              aria-label="Increase guests"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Reserve button */}
      {isLoggedIn ? (
        <button className="w-full bg-gradient-to-r from-[#ff385c] to-[#e31c5f] text-white py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity text-sm">
          Reserve
        </button>
      ) : (
        <button
          onClick={onLoginClick}
          className="w-full bg-gradient-to-r from-[#ff385c] to-[#e31c5f] text-white py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity text-sm"
        >
          Log in to reserve
        </button>
      )}

      <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2">
        You won&apos;t be charged yet
      </p>

      {/* Price breakdown */}
      {nights > 0 && (
        <div className="mt-5 space-y-3 text-sm border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex justify-between text-gray-700 dark:text-gray-300">
            <span>₹{price.toLocaleString("en-IN")} × {nights} night{nights !== 1 ? "s" : ""}</span>
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
  );
}
