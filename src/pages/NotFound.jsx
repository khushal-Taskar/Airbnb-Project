import React from "react";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-8xl font-extrabold text-[#ff385c] mb-4">404</h1>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
          Page not found
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#ff385c] hover:bg-[#e31c5f] text-white font-semibold rounded-xl transition-colors"
        >
          <Home size={18} />
          Back to Home
        </Link>
      </div>
    </main>
  );
}
