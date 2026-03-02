/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback, useEffect, useRef, useMemo } from 'react';

const AppContext = createContext();

function loadFromStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored !== null ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

export function AppProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => loadFromStorage('darkMode', false));
  const [user, setUser] = useState(() => loadFromStorage('user', null));
  const [isLoggedIn, setIsLoggedIn] = useState(() => loadFromStorage('isLoggedIn', false));
  const [wishlist, setWishlist] = useState(() => new Set(loadFromStorage('wishlist', [])));
  const [bookings, setBookings] = useState(() => loadFromStorage('bookings', []));
  const [toasts, setToasts] = useState([]);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const toastTimers = useRef(new Map());
  const toastIdCounter = useRef(0);

  // Persist dark mode
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Persist auth
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [user, isLoggedIn]);

  // Persist wishlist as array
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify([...wishlist]));
  }, [wishlist]);

  // Persist bookings
  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Cleanup timers on unmount
  useEffect(() => {
    const timers = toastTimers.current;
    return () => timers.forEach((timer) => clearTimeout(timer));
  }, []);

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now() + ++toastIdCounter.current;
    setToasts((prev) => [...prev, { id, message, type }]);
    const timer = setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
      toastTimers.current.delete(id);
    }, 3000);
    toastTimers.current.set(id, timer);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = toastTimers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      toastTimers.current.delete(id);
    }
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);

  const login = useCallback((name, email) => {
    setUser({ name, email });
    setIsLoggedIn(true);
    addToast('Login successful', 'success');
  }, [addToast]);

  const logout = useCallback(() => {
    setUser(null);
    setIsLoggedIn(false);
  }, []);

  const showAuthModal = useCallback(() => setAuthModalOpen(true), []);
  const hideAuthModal = useCallback(() => setAuthModalOpen(false), []);

  const toggleWishlist = useCallback((id) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        addToast('Removed from wishlist', 'info');
      } else {
        next.add(id);
        addToast('Added to wishlist', 'success');
      }
      return next;
    });
  }, [addToast]);

  const addBooking = useCallback((booking) => {
    setBookings((prev) => [...prev, booking]);
    addToast('Booking confirmed!', 'success');
  }, [addToast]);

  const value = useMemo(() => ({
    darkMode,
    toggleDarkMode,
    isLoggedIn,
    user,
    login,
    logout,
    wishlist,
    toggleWishlist,
    bookings,
    addBooking,
    toasts,
    addToast,
    removeToast,
    authModalOpen,
    showAuthModal,
    hideAuthModal,
  }), [darkMode, toggleDarkMode, isLoggedIn, user, login, logout, wishlist, toggleWishlist, bookings, addBooking, toasts, addToast, removeToast, authModalOpen, showAuthModal, hideAuthModal]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

export default AppContext;
