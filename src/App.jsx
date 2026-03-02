import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useApp } from "./context/AppContext";
import { listings } from "./data/listings";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PropertyModal from "./components/PropertyModal";
import AuthModal from "./components/AuthModal";
import ToastContainer from "./components/ToastContainer";
import BackToTop from "./components/BackToTop";
import Home from "./pages/Home";
import PropertyDetail from "./pages/PropertyDetail";
import BookingConfirmation from "./pages/BookingConfirmation";
import Payment from "./pages/Payment";
import Wishlist from "./pages/Wishlist";
import SearchResults from "./pages/SearchResults";
import Host from "./pages/Host";
import Trips from "./pages/Trips";
import Profile from "./pages/Profile";
import Inspiration from "./pages/Inspiration";
import NotFound from "./pages/NotFound";
import {
  HelpCentre,
  AirCover,
  AntiDiscrimination,
  DisabilitySupport,
  CancellationOptions,
  AirCoverHosts,
  HostingResources,
  CommunityForum,
  Newsroom,
  Careers,
  Investors,
  EmergencyStays,
  Privacy,
  Terms,
} from "./pages/InfoPages";

export default function App() {
  const { darkMode, toggleDarkMode, wishlist, toggleWishlist, isLoggedIn, login, user } = useApp();
  const location = useLocation();

  const [activeModal, setActiveModal] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  // Initial loading splash (1 second)
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

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
    <div className={darkMode ? "dark" : ""}>
      <div className="font-sans min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Navbar
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          onLoginClick={openAuth}
        />

        <Routes>
          <Route
            path="/"
            element={
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
            }
          />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/booking/:propertyId" element={<BookingConfirmation />} />
          <Route path="/payment/:propertyId" element={<Payment />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/host" element={<Host />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/help" element={<HelpCentre />} />
          <Route path="/aircover" element={<AirCover />} />
          <Route path="/anti-discrimination" element={<AntiDiscrimination />} />
          <Route path="/disability-support" element={<DisabilitySupport />} />
          <Route path="/cancellation" element={<CancellationOptions />} />
          <Route path="/aircover-hosts" element={<AirCoverHosts />} />
          <Route path="/hosting-resources" element={<HostingResources />} />
          <Route path="/community-forum" element={<CommunityForum />} />
          <Route path="/newsroom" element={<Newsroom />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/investors" element={<Investors />} />
          <Route path="/emergency-stays" element={<EmergencyStays />} />
          <Route path="/inspiration/:city" element={<Inspiration />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
        <ToastContainer />
        <BackToTop />

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
              login("User", "user@example.com");
              closeModal();
            }}
          />
        )}
      </div>
    </div>
  );
}
