import React, { useState } from "react";
import { X } from "lucide-react";

export default function AuthModal({ onClose, onAuthSuccess }) {
  const [tab, setTab] = useState("login"); // 'login' | 'signup'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = "Enter a valid email";
    if (!password) errs.password = "Password is required";
    else if (password.length < 6) errs.password = "Password must be at least 6 characters";
    if (tab === "signup" && !name.trim()) errs.name = "Name is required";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close"
          >
            <X size={18} className="text-gray-700 dark:text-gray-300" />
          </button>
          <h2 className="font-semibold text-gray-900 dark:text-gray-100 text-center flex-1">
            {tab === "login" ? "Log in" : "Sign up"}
          </h2>
          <div className="w-9" />
        </div>

        <div className="px-6 py-6">
          {submitted ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {tab === "login" ? "Welcome back!" : "Welcome to Airbnb!"}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                You have successfully {tab === "login" ? "logged in" : "signed up"}.
              </p>
              <button
                onClick={onAuthSuccess}
                className="bg-[#ff385c] text-white px-8 py-3 rounded-full font-medium hover:bg-[#e0304f] transition-colors"
              >
                Continue
              </button>
            </div>
          ) : (
            <>
              {/* Tab switch */}
              <div className="flex rounded-xl bg-gray-100 dark:bg-gray-800 p-1 mb-6">
                {["login", "signup"].map((t) => (
                  <button
                    key={t}
                    onClick={() => { setTab(t); setErrors({}); }}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                      tab === t
                        ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    }`}
                  >
                    {t === "login" ? "Log in" : "Sign up"}
                  </button>
                ))}
              </div>

              {/* Google button */}
              <button className="w-full flex items-center justify-center gap-3 border border-gray-300 dark:border-gray-600 rounded-xl py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors mb-4">
                <svg width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
                Continue with Google
              </button>

              <div className="flex items-center gap-3 mb-4">
                <hr className="flex-1 border-gray-200 dark:border-gray-700" />
                <span className="text-xs text-gray-400">or</span>
                <hr className="flex-1 border-gray-200 dark:border-gray-700" />
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {tab === "signup" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Full name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className={`w-full border rounded-xl px-4 py-3 text-sm outline-none transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 ${
                        errors.name
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-300 dark:border-gray-600 focus:border-[#ff385c]"
                      }`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={`w-full border rounded-xl px-4 py-3 text-sm outline-none transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 ${
                      errors.email
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 dark:border-gray-600 focus:border-[#ff385c]"
                    }`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full border rounded-xl px-4 py-3 text-sm outline-none transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 ${
                      errors.password
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 dark:border-gray-600 focus:border-[#ff385c]"
                    }`}
                  />
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#ff385c] text-white py-3 rounded-xl font-medium hover:bg-[#e0304f] transition-colors text-sm"
                >
                  {tab === "login" ? "Log in" : "Create account"}
                </button>
              </form>

              <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
                {tab === "login" ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => { setTab(tab === "login" ? "signup" : "login"); setErrors({}); }}
                  className="text-[#ff385c] font-medium hover:underline"
                >
                  {tab === "login" ? "Sign up" : "Log in"}
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
