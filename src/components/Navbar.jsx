import React, { useState } from "react";
import BrandLogo from "./BrandLogo";

export default function Navbar({ darkMode, onToggleDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Menu Siap Santap", href: "#menu" },
    { label: "Lacak Pesanan", href: "#tracking" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-white/85 dark:bg-gray-950/85 border-b border-gray-200/70 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between relative">
        <a href="#home">
          <BrandLogo size="sm" />
        </a>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleDarkMode}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition"
           >
            {darkMode ? "☀️" : "🌙"}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Buka menu navigasi"
            aria-expanded={menuOpen}
            className="w-10 h-9 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center text-lg font-bold text-gray-800 dark:text-gray-100 transition"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Menu Navigasi Garis Tiga */}
        {menuOpen && (
          <nav className="absolute right-6 top-16 mt-1 w-56 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl py-2 z-40">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 transition"
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}