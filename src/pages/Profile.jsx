import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Heart, Plane, LogOut, ChevronRight } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Profile() {
  const { user, isLoggedIn, logout, bookings, wishlist } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <Link to="/" className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
          Home
        </Link>
        <ChevronRight size={14} />
        <span className="text-gray-900 dark:text-gray-100">Profile</span>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
        Profile
      </h1>

      {!isLoggedIn ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <User size={64} className="text-gray-300 dark:text-gray-600 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Please log in to view your profile
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm">
            Sign in to access your profile, trips, and wishlist
          </p>
          <Link
            to="/"
            className="bg-gradient-to-r from-[#ff385c] to-[#e31c5f] text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            Go to Home
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {/* User info */}
          <div className="flex flex-col sm:flex-row items-center gap-6 p-6 border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800">
            <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
              <User size={40} className="text-gray-500 dark:text-gray-400" />
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {user?.name || "User"}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                {user?.email || "No email provided"}
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
                Member since January 2024
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800 text-center">
              <Plane size={24} className="mx-auto text-[#ff385c] mb-2" />
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {bookings.length}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {bookings.length === 1 ? "Trip" : "Trips"}
              </p>
            </div>
            <div className="p-5 border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800 text-center">
              <Heart size={24} className="mx-auto text-[#ff385c] mb-2" />
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {wishlist.size}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {wishlist.size === 1 ? "Saved Place" : "Saved Places"}
              </p>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Quick Links
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                to="/wishlist"
                className="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 hover:border-[#ff385c] transition-colors group"
              >
                <Heart size={20} className="text-[#ff385c]" />
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-[#ff385c] transition-colors">
                  View Wishlist
                </span>
                <ChevronRight size={16} className="ml-auto text-gray-400" />
              </Link>
              <Link
                to="/trips"
                className="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 hover:border-[#ff385c] transition-colors group"
              >
                <Plane size={20} className="text-[#ff385c]" />
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-[#ff385c] transition-colors">
                  View Trips
                </span>
                <ChevronRight size={16} className="ml-auto text-gray-400" />
              </Link>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-semibold"
          >
            <LogOut size={18} />
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}
