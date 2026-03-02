import React, { useState } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import {
  CreditCard,
  Smartphone,
  Building2,
  Globe,
  MapPin,
  Calendar,
  Users,
  CheckCircle,
  ChevronRight,
} from "lucide-react";
import { listings } from "../data/listings";
import { useApp } from "../context/AppContext";

const PAYMENT_METHODS = [
  { id: "card", label: "Credit/Debit Card", icon: CreditCard },
  { id: "upi", label: "UPI", icon: Smartphone },
  { id: "netbanking", label: "Net Banking", icon: Building2 },
  { id: "paypal", label: "PayPal", icon: Globe },
];

const BANKS = [
  { value: "", label: "Select a bank" },
  { value: "sbi", label: "State Bank of India (SBI)" },
  { value: "hdfc", label: "HDFC Bank" },
  { value: "icici", label: "ICICI Bank" },
  { value: "axis", label: "Axis Bank" },
  { value: "kotak", label: "Kotak Mahindra Bank" },
  { value: "pnb", label: "Punjab National Bank" },
];

export default function Payment() {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addBooking } = useApp();

  const bookingState = location.state;
  const property = listings.find((l) => l.id === Number(propertyId));

  const [activeMethod, setActiveMethod] = useState("card");
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [bookingId, setBookingId] = useState("");

  // Card form
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");

  // UPI form
  const [upiId, setUpiId] = useState("");

  // Net Banking form
  const [selectedBank, setSelectedBank] = useState("");

  // PayPal form
  const [paypalEmail, setPaypalEmail] = useState("");

  if (!bookingState || !property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-950 px-4">
        <h1 className="text-6xl font-bold text-gray-300 dark:text-gray-700">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mt-4">
          Payment details not found
        </p>
        <Link
          to="/"
          className="mt-6 px-6 py-3 bg-gradient-to-r from-[#ff385c] to-[#e31c5f] text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const { checkIn, checkOut, guests, nights, price, serviceFee, cleaningFee, taxes, total } =
    bookingState;
  const subtotal = price * nights;

  const validateCard = () => {
    const errs = {};
    const digits = cardNumber.replace(/\s/g, "");
    if (!/^\d{16}$/.test(digits)) errs.cardNumber = "Enter a valid 16-digit card number";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) errs.expiry = "Enter a valid expiry (MM/YY)";
    if (!/^\d{3}$/.test(cvv)) errs.cvv = "Enter a valid 3-digit CVV";
    if (!cardName.trim()) errs.cardName = "Enter the cardholder name";
    return errs;
  };

  const validateUpi = () => {
    const errs = {};
    if (!upiId.includes("@") || upiId.trim().length < 3) errs.upiId = "Enter a valid UPI ID (e.g. name@upi)";
    return errs;
  };

  const validateNetBanking = () => {
    const errs = {};
    if (!selectedBank) errs.selectedBank = "Please select a bank";
    return errs;
  };

  const validatePaypal = () => {
    const errs = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(paypalEmail))
      errs.paypalEmail = "Enter a valid email address";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};

    switch (activeMethod) {
      case "card":
        validationErrors = validateCard();
        break;
      case "upi":
        validationErrors = validateUpi();
        break;
      case "netbanking":
        validationErrors = validateNetBanking();
        break;
      case "paypal":
        validationErrors = validatePaypal();
        break;
    }

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const newBookingId = `BK-${Date.now()}`;
    setBookingId(newBookingId);

    addBooking({
      id: property.id,
      bookingId: newBookingId,
      title: property.title,
      location: property.location,
      image: property.image,
      checkIn,
      checkOut,
      guests,
      total,
      status: "confirmed",
    });

    setShowSuccess(true);
  };

  const formatCardNumber = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const formatExpiry = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length > 2) return digits.slice(0, 2) + "/" + digits.slice(2);
    return digits;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <Link to="/" className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
          Home
        </Link>
        <ChevronRight size={14} />
        <Link
          to={`/property/${propertyId}`}
          className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors truncate"
        >
          {property.title}
        </Link>
        <ChevronRight size={14} />
        <span className="text-gray-900 dark:text-gray-100">Payment</span>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
        Complete your payment
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Payment Form */}
        <div className="lg:col-span-2">
          {/* Payment method tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {PAYMENT_METHODS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setActiveMethod(id);
                  setErrors({});
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                  activeMethod === id
                    ? "border-[#ff385c] bg-[#ff385c]/10 text-[#ff385c]"
                    : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500"
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="p-5 border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800">
              {/* Card Form */}
              {activeMethod === "card" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm outline-none transition-colors ${
                        errors.cardNumber
                          ? "border-red-500"
                          : "border-gray-300 dark:border-gray-600 focus:border-[#ff385c]"
                      }`}
                    />
                    {errors.cardNumber && (
                      <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Expiry
                      </label>
                      <input
                        type="text"
                        value={expiry}
                        onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                        placeholder="MM/YY"
                        maxLength={5}
                        className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm outline-none transition-colors ${
                          errors.expiry
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-600 focus:border-[#ff385c]"
                        }`}
                      />
                      {errors.expiry && (
                        <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        CVV
                      </label>
                      <input
                        type="password"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                        placeholder="•••"
                        maxLength={3}
                        className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm outline-none transition-colors ${
                          errors.cvv
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-600 focus:border-[#ff385c]"
                        }`}
                      />
                      {errors.cvv && (
                        <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="Full name on card"
                      className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm outline-none transition-colors ${
                        errors.cardName
                          ? "border-red-500"
                          : "border-gray-300 dark:border-gray-600 focus:border-[#ff385c]"
                      }`}
                    />
                    {errors.cardName && (
                      <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>
                    )}
                  </div>
                </div>
              )}

              {/* UPI Form */}
              {activeMethod === "upi" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    UPI ID
                  </label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="yourname@upi"
                    className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm outline-none transition-colors ${
                      errors.upiId
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600 focus:border-[#ff385c]"
                    }`}
                  />
                  {errors.upiId && (
                    <p className="text-red-500 text-xs mt-1">{errors.upiId}</p>
                  )}
                </div>
              )}

              {/* Net Banking Form */}
              {activeMethod === "netbanking" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Select Bank
                  </label>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm outline-none transition-colors ${
                      errors.selectedBank
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600 focus:border-[#ff385c]"
                    }`}
                  >
                    {BANKS.map((bank) => (
                      <option key={bank.value} value={bank.value}>
                        {bank.label}
                      </option>
                    ))}
                  </select>
                  {errors.selectedBank && (
                    <p className="text-red-500 text-xs mt-1">{errors.selectedBank}</p>
                  )}
                </div>
              )}

              {/* PayPal Form */}
              {activeMethod === "paypal" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    PayPal Email
                  </label>
                  <input
                    type="email"
                    value={paypalEmail}
                    onChange={(e) => setPaypalEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm outline-none transition-colors ${
                      errors.paypalEmail
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600 focus:border-[#ff385c]"
                    }`}
                  />
                  {errors.paypalEmail && (
                    <p className="text-red-500 text-xs mt-1">{errors.paypalEmail}</p>
                  )}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-gradient-to-r from-[#ff385c] to-[#e31c5f] text-white py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity text-sm"
            >
              Confirm & Pay ₹{total.toLocaleString("en-IN")}
            </button>
          </form>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-1">
          <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-5 bg-white dark:bg-gray-800 sticky top-32">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg mb-4">
              Order Summary
            </h3>

            {/* Property info */}
            <div className="flex gap-3 mb-5 pb-5 border-b border-gray-200 dark:border-gray-700">
              <img
                src={property.image}
                alt={property.title}
                className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
              />
              <div className="min-w-0">
                <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm truncate">
                  {property.title}
                </p>
                <p className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <MapPin size={12} />
                  {property.location}
                </p>
              </div>
            </div>

            {/* Dates & guests */}
            <div className="space-y-2 mb-5 pb-5 border-b border-gray-200 dark:border-gray-700 text-sm">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Calendar size={14} />
                <span>
                  {new Date(checkIn).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                  })}{" "}
                  –{" "}
                  {new Date(checkOut).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Users size={14} />
                <span>
                  {guests} guest{guests !== 1 ? "s" : ""} · {nights} night
                  {nights !== 1 ? "s" : ""}
                </span>
              </div>
            </div>

            {/* Price breakdown */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-700 dark:text-gray-300">
                <span>
                  ₹{price.toLocaleString("en-IN")} × {nights} night{nights !== 1 ? "s" : ""}
                </span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-gray-700 dark:text-gray-300">
                <span>Cleaning fee</span>
                <span>₹{cleaningFee.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-gray-700 dark:text-gray-300">
                <span>Service fee</span>
                <span>₹{serviceFee.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-gray-700 dark:text-gray-300">
                <span>Taxes (10%)</span>
                <span>₹{taxes.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 dark:text-gray-100 pt-3 border-t border-gray-200 dark:border-gray-700">
                <span>Total</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
            <div className="flex justify-center mb-4">
              <CheckCircle size={56} className="text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Booking Confirmed! 🎉
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
              Your payment has been processed successfully.
            </p>

            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-left space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Booking ID</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">{bookingId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Property</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100 text-right truncate max-w-[200px]">
                  {property.title}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Dates</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {new Date(checkIn).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                  })}{" "}
                  –{" "}
                  {new Date(checkOut).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                  })}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Total Paid</span>
                <span className="font-bold text-gray-900 dark:text-gray-100">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => navigate("/trips")}
                className="w-full bg-gradient-to-r from-[#ff385c] to-[#e31c5f] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity text-sm"
              >
                View My Trips
              </button>
              <button
                onClick={() => navigate("/")}
                className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
