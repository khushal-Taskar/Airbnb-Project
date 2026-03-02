import React, { useState } from "react";
import { Globe, Menu, User, Search, Moon, Sun, X } from "lucide-react";

export default function Navbar({ darkMode, toggleDarkMode, onLoginClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="#" className="flex-shrink-0">
          <span className="text-[#ff385c] text-2xl font-bold tracking-tight">airbnb</span>
        </a>

        {/* Desktop Search Bar */}
        <div className="hidden md:flex items-center border border-gray-300 dark:border-gray-600 rounded-full px-2 py-1 shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white dark:bg-gray-800">
          <span className="px-4 py-1 border-r border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-800 dark:text-gray-200 whitespace-nowrap">
            Anywhere
          </span>
          <span className="px-4 py-1 border-r border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-800 dark:text-gray-200 whitespace-nowrap">
            Any week
          </span>
          <span className="px-4 py-1 text-gray-500 dark:text-gray-400 text-sm whitespace-nowrap">
            Add guests
          </span>
          <div className="bg-[#ff385c] p-2 rounded-full text-white ml-1 flex-shrink-0">
            <Search size={14} />
          </div>
        </div>

        {/* Right Nav */}
        <div className="flex items-center gap-1">
          <span className="hidden lg:block text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-2 rounded-full cursor-pointer whitespace-nowrap transition-colors">
            Airbnb your home
          </span>

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

          {/* User menu */}
          <button
            onClick={onLoginClick}
            className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded-full px-3 py-1.5 hover:shadow-md dark:bg-gray-800 cursor-pointer transition-shadow ml-1"
          >
            <Menu size={16} className="text-gray-700 dark:text-gray-300" />
            <div className="bg-gray-500 text-white rounded-full p-0.5">
              <User size={18} fill="white" />
            </div>
          </button>

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

      {/* Mobile search bar */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700 px-4 py-3 bg-white dark:bg-gray-900">
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2 gap-2 bg-white dark:bg-gray-800">
            <Search size={16} className="text-gray-500 dark:text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search destinations"
              className="flex-1 text-sm outline-none bg-transparent text-gray-800 dark:text-gray-200 placeholder-gray-400"
            />
          </div>
          <div className="mt-3 flex flex-col gap-1">
            <button className="text-left text-sm font-medium text-gray-700 dark:text-gray-300 px-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              Airbnb your home
            </button>
            <button
              onClick={onLoginClick}
              className="text-left text-sm font-medium text-gray-700 dark:text-gray-300 px-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Log in / Sign up
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
