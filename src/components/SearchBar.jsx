import React from "react";
import { Search } from "lucide-react";

export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2.5 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow max-w-sm w-full">
      <Search size={16} className="text-gray-400 flex-shrink-0" />
      <input
        type="text"
        placeholder="Search destinations, properties..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-1 text-sm outline-none bg-transparent text-gray-800 dark:text-gray-200 placeholder-gray-400"
      />
    </div>
  );
}
