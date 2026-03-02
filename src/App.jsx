import React, { useState, useEffect, useCallback } from "react";
import { listings } from "./data/listings";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PropertyModal from "./components/PropertyModal";
import AuthModal from "./components/AuthModal";
import Home from "./pages/Home";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [wishlist, setWishlist] = useState(new Set());
  const [activeModal, setActiveModal] = useState(null); // null | 'auth' | 'property'
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initial loading splash (1 second)
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  // Close modals on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setActiveModal(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Prevent body scroll when a modal is open
  useEffect(() => {
    document.body.style.overflow = activeModal ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeModal]);

  const toggleDarkMode = useCallback(() => setDarkMode((d) => !d), []);

  const toggleWishlist = useCallback((id) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const openProperty = useCallback((property) => {
    setSelectedProperty(property);
    setActiveModal("property");
  }, []);

  const openAuth = useCallback(() => setActiveModal("auth"), []);
  const closeModal = useCallback(() => setActiveModal(null), []);

  const clearFilters = useCallback(() => {
    setActiveCategory("all");
    setLocationFilter("");
    setPriceRange([0, 20000]);
    setSearchQuery("");
  }, []);

  // Filter listings
  const filteredListings = listings.filter((l) => {
    if (activeCategory !== "all" && l.category !== activeCategory) return false;
    if (locationFilter && !l.location.toLowerCase().includes(locationFilter.toLowerCase())) return false;
    if (l.price < priceRange[0] || l.price > priceRange[1]) return false;
    if (
      searchQuery &&
      !l.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !l.location.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !l.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="font-sans min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Navbar
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          onLoginClick={openAuth}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <Home
          listings={filteredListings}
          wishlist={wishlist}
          onWishlistToggle={toggleWishlist}
          onPropertyClick={openProperty}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          locationFilter={locationFilter}
          setLocationFilter={setLocationFilter}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          onClearFilters={clearFilters}
          loading={loading}
        />

        <Footer />

        {/* Modals */}
        {activeModal === "property" && (
          <PropertyModal
            property={selectedProperty}
            onClose={closeModal}
            isLoggedIn={isLoggedIn}
            onLoginClick={openAuth}
          />
        )}

        {activeModal === "auth" && (
          <AuthModal
            onClose={closeModal}
            onAuthSuccess={() => {
              setIsLoggedIn(true);
              closeModal();
            }}
          />
        )}
      </div>
    </div>
  );
}
