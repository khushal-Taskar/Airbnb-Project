import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Home, Upload, ChevronRight } from "lucide-react";
import { useApp } from "../context/AppContext";

const propertyTypes = ["Apartment", "House", "Villa", "Cabin", "Cottage"];
const amenityOptions = [
  "WiFi", "Pool", "Kitchen", "Air conditioning", "Parking",
  "Fireplace", "Washer", "TV", "Hot tub", "BBQ grill",
];

const initialForm = {
  name: "",
  description: "",
  location: "",
  price: "",
  propertyType: "Apartment",
  beds: 1,
  baths: 1,
  guests: 1,
  amenities: [],
};

export default function Host() {
  const { addToast } = useApp();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleNumber = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: Math.max(1, Number(value)) }));
  };

  const toggleAmenity = (amenity) => {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Property name is required";
    if (!form.description.trim()) errs.description = "Description is required";
    if (!form.location.trim()) errs.location = "Location is required";
    if (!form.price || Number(form.price) <= 0) errs.price = "Valid price is required";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    addToast("Listing submitted successfully!", "success");
    setForm(initialForm);
    setErrors({});
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <Link to="/" className="flex items-center gap-1 hover:text-[#ff385c] transition-colors">
          <Home size={14} /> Home
        </Link>
        <ChevronRight size={14} />
        <span className="text-gray-900 dark:text-gray-100 font-medium">Airbnb Your Home</span>
      </nav>

      {/* Hero */}
      <div className="bg-gradient-to-r from-[#ff385c] to-[#e31c5f] rounded-2xl p-8 sm:p-12 mb-10 text-white">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">Share your space, earn extra income</h1>
        <p className="text-white/90 text-lg max-w-2xl">
          Join millions of hosts on Airbnb and start earning by sharing your home, apartment, or any unique space with travellers from around the world.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Property Name */}
        <Field label="Property Name" error={errors.name}>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Cozy Beach House"
            className={inputClass(errors.name)}
          />
        </Field>

        {/* Description */}
        <Field label="Description" error={errors.description}>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            placeholder="Describe your property..."
            className={inputClass(errors.description)}
          />
        </Field>

        {/* Location */}
        <Field label="Location" error={errors.location}>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="e.g. Goa, India"
            className={inputClass(errors.location)}
          />
        </Field>

        {/* Price */}
        <Field label="Price per night (₹)" error={errors.price}>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            min="0"
            placeholder="e.g. 3200"
            className={inputClass(errors.price)}
          />
        </Field>

        {/* Property Type */}
        <Field label="Property Type">
          <select
            name="propertyType"
            value={form.propertyType}
            onChange={handleChange}
            className={inputClass()}
          >
            {propertyTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </Field>

        {/* Beds / Baths / Guests */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Beds">
            <input type="number" name="beds" value={form.beds} onChange={handleNumber} min="1" className={inputClass()} />
          </Field>
          <Field label="Baths">
            <input type="number" name="baths" value={form.baths} onChange={handleNumber} min="1" className={inputClass()} />
          </Field>
          <Field label="Max Guests">
            <input type="number" name="guests" value={form.guests} onChange={handleNumber} min="1" className={inputClass()} />
          </Field>
        </div>

        {/* Amenities */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Amenities</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {amenityOptions.map((a) => (
              <label
                key={a}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-colors text-sm ${
                  form.amenities.includes(a)
                    ? "border-[#ff385c] bg-[#ff385c]/10 text-[#ff385c] dark:bg-[#ff385c]/20"
                    : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-400"
                }`}
              >
                <input
                  type="checkbox"
                  checked={form.amenities.includes(a)}
                  onChange={() => toggleAmenity(a)}
                  className="sr-only"
                />
                {a}
              </label>
            ))}
          </div>
        </div>

        {/* Image Upload Placeholder */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Photos</label>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-10 text-center hover:border-[#ff385c] transition-colors cursor-pointer">
            <Upload size={40} className="mx-auto mb-3 text-gray-400 dark:text-gray-500" />
            <p className="text-gray-500 dark:text-gray-400 font-medium">Drag photos here or click to upload</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">PNG, JPG up to 10MB each</p>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-3 bg-[#ff385c] hover:bg-[#e31c5f] text-white font-semibold rounded-xl transition-colors"
        >
          Submit Listing
        </button>
      </form>
    </main>
  );
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">{label}</label>
      {children}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

function inputClass(error) {
  return `w-full px-4 py-2.5 rounded-xl border ${
    error ? "border-red-400" : "border-gray-200 dark:border-gray-700"
  } bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#ff385c]/40 transition-colors`;
}
