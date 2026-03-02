import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Globe, Menu, User, Search, Moon, Sun, X, Heart, Minus, Plus } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Navbar({ darkMode, toggleDarkMode, onLoginClick }) {
  const { isLoggedIn, user, logout } = useApp();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [guests, setGuests] = useState(1);
  const [mobileSearch, setMobileSearch] = useState("");

  const searchRef = useRef(null);
  const userMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSearch() {
    const q = location.trim() || "";
    navigate(`/search?query=${encodeURIComponent(q)}&guests=${guests}`);
    setSearchOpen(false);
  }

  function handleMobileSearch(e) {
    if (e.key === "Enter" && mobileSearch.trim()) {
      navigate(`/search?query=${encodeURIComponent(mobileSearch.trim())}`);
      setMobileMenuOpen(false);
    }
  }

  const menuItemClass =
    "text-left w-full text-sm text-gray-700 dark:text-gray-300 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors";

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <span className="text-[#ff385c] text-2xl font-bold tracking-tight">airbnb</span>
        </Link>

        {/* Desktop Search Bar */}
        <div className="hidden md:block relative" ref={searchRef}>
          <div
            onClick={() => setSearchOpen((o) => !o)}
            className="flex items-center border border-gray-300 dark:border-gray-600 rounded-full px-2 py-1 shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white dark:bg-gray-800"
          >
            <span className="px-4 py-1 border-r border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-800 dark:text-gray-200 whitespace-nowrap">
              {location || "Anywhere"}
            </span>
            <span className="px-4 py-1 border-r border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-800 dark:text-gray-200 whitespace-nowrap">
              Any week
            </span>
            <span className="px-4 py-1 text-gray-500 dark:text-gray-400 text-sm whitespace-nowrap">
              {guests > 1 ? `${guests} guests` : "Add guests"}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSearch();
              }}
              className="bg-[#ff385c] p-2 rounded-full text-white ml-1 flex-shrink-0"
            >
              <Search size={14} />
            </button>
          </div>

          {/* Search Dropdown */}
          {searchOpen && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[420px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-5 z-50">
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Where are you going?"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-transparent text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-[#ff385c] mb-4"
              />

              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                Dates
              </label>
              <div className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                Any week
              </div>

              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                Guests
              </label>
              <div className="flex items-center gap-3 mb-4">
                <button
                  onClick={() => setGuests((g) => Math.max(1, g - 1))}
                  className="border border-gray-300 dark:border-gray-600 rounded-full p-1 hover:border-gray-800 dark:hover:border-gray-300 transition-colors"
                >
                  <Minus size={14} className="text-gray-600 dark:text-gray-300" />
                </button>
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200 w-6 text-center">
                  {guests}
                </span>
                <button
                  onClick={() => setGuests((g) => g + 1)}
                  className="border border-gray-300 dark:border-gray-600 rounded-full p-1 hover:border-gray-800 dark:hover:border-gray-300 transition-colors"
                >
                  <Plus size={14} className="text-gray-600 dark:text-gray-300" />
                </button>
              </div>

              <button
                onClick={handleSearch}
                className="w-full bg-[#ff385c] text-white rounded-lg py-2 text-sm font-semibold hover:bg-[#e0294c] transition-colors"
              >
                Search
              </button>
            </div>
          )}
        </div>

        {/* Right Nav */}
        <div className="flex items-center gap-1">
          <Link
            to="/host"
            className="hidden lg:block text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-2 rounded-full whitespace-nowrap transition-colors"
          >
            Airbnb your home
          </Link>

          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Globe size={18} />
          </button>

          {/* Wishlist shortcut */}
          {isLoggedIn && (
            <Link
              to="/wishlist"
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Wishlist"
            >
              <Heart size={18} />
            </Link>
          )}

          {/* User menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setUserMenuOpen((o) => !o)}
              className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded-full px-3 py-1.5 hover:shadow-md dark:bg-gray-800 cursor-pointer transition-shadow ml-1"
            >
              <Menu size={16} className="text-gray-700 dark:text-gray-300" />
              <div className="bg-gray-500 text-white rounded-full p-0.5">
                <User size={18} fill="white" />
              </div>
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg py-2 z-50">
                {isLoggedIn ? (
                  <>
                    {user?.name && (
                      <div className="px-4 py-2 text-sm font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700">
                        {user.name}
                      </div>
                    )}
                    <Link to="/profile" className={menuItemClass} onClick={() => setUserMenuOpen(false)}>
                      Profile
                    </Link>
                    <Link to="/wishlist" className={menuItemClass} onClick={() => setUserMenuOpen(false)}>
                      Wishlist
                    </Link>
                    <Link to="/trips" className={menuItemClass} onClick={() => setUserMenuOpen(false)}>
                      My Trips
                    </Link>
                    <Link to="/host" className={menuItemClass} onClick={() => setUserMenuOpen(false)}>
                      Airbnb your home
                    </Link>
                    <hr className="my-1 border-gray-200 dark:border-gray-700" />
                    <button
                      onClick={() => {
                        logout();
                        setUserMenuOpen(false);
                      }}
                      className={menuItemClass}
                    >
                      Log Out
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        onLoginClick();
                        setUserMenuOpen(false);
                      }}
                      className={`${menuItemClass} font-semibold`}
                    >
                      Log in
                    </button>
                    <button
                      onClick={() => {
                        onLoginClick();
                        setUserMenuOpen(false);
                      }}
                      className={menuItemClass}
                    >
                      Sign up
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
            onClick={() => setMobileMenuOpen((o) => !o)}
            aria-label="Open menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700 px-4 py-3 bg-white dark:bg-gray-900">
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2 gap-2 bg-white dark:bg-gray-800">
            <Search size={16} className="text-gray-500 dark:text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={mobileSearch}
              onChange={(e) => setMobileSearch(e.target.value)}
              onKeyDown={handleMobileSearch}
              placeholder="Search destinations"
              className="flex-1 text-sm outline-none bg-transparent text-gray-800 dark:text-gray-200 placeholder-gray-400"
            />
          </div>
          <div className="mt-3 flex flex-col gap-1">
            <Link
              to="/host"
              onClick={() => setMobileMenuOpen(false)}
              className="text-left text-sm font-medium text-gray-700 dark:text-gray-300 px-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Airbnb your home
            </Link>
            {isLoggedIn ? (
              <>
                <Link
                  to="/wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-left text-sm font-medium text-gray-700 dark:text-gray-300 px-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  Wishlist
                </Link>
                <Link
                  to="/trips"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-left text-sm font-medium text-gray-700 dark:text-gray-300 px-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  My Trips
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-left text-sm font-medium text-gray-700 dark:text-gray-300 px-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-sm font-medium text-gray-700 dark:text-gray-300 px-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  Log Out
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  onLoginClick();
                  setMobileMenuOpen(false);
                }}
                className="text-left text-sm font-medium text-gray-700 dark:text-gray-300 px-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Log in / Sign up
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
