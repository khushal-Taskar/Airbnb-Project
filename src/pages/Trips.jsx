import React from "react";
import { Link } from "react-router-dom";
import { Plane, Calendar, Users, MapPin, ChevronRight } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Trips() {
  const { bookings } = useApp();

  const sortedBookings = [...bookings].reverse();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <Link to="/" className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
          Home
        </Link>
        <ChevronRight size={14} />
        <span className="text-gray-900 dark:text-gray-100">My Trips</span>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
        My Trips
      </h1>

      {sortedBookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <Plane size={64} className="text-gray-300 dark:text-gray-600 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            No trips yet
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm">
            When you book a trip, it will appear here
          </p>
          <Link
            to="/"
            className="bg-gradient-to-r from-[#ff385c] to-[#e31c5f] text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            Start Exploring
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedBookings.map((booking) => (
            <Link
              key={booking.bookingId}
              to={`/property/${booking.id}`}
              className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow"
            >
              <img
                src={booking.image}
                alt={booking.title}
                className="w-full sm:w-48 h-40 sm:h-36 object-cover rounded-xl flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 truncate">
                      {booking.title}
                    </h3>
                    <p className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                      <MapPin size={14} />
                      {booking.location}
                    </p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 self-start">
                    Confirmed
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mt-3">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    <span>
                      {new Date(booking.checkIn).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}{" "}
                      –{" "}
                      {new Date(booking.checkOut).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users size={14} />
                    <span>
                      {booking.guests} guest{booking.guests !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm">
                  <span className="font-bold text-gray-900 dark:text-gray-100">
                    ₹{booking.total.toLocaleString("en-IN")}
                  </span>
                  <span className="text-gray-400 dark:text-gray-500">·</span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {booking.bookingId}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
