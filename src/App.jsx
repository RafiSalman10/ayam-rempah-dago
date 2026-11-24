import React, { useState, useEffect } from "react";
import { MENUS } from "./data/menuData";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import MenuCatalogSection from "./components/MenuCatalogSection";
import FooterSection from "./components/FooterSection";

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [promoApplied, setPromoApplied] = useState(true);
  const [deliveryFee, setDeliveryFee] = useState(8000);
  const [paymentMethod, setPaymentMethod] = useState("QRIS");

  const [darkMode, setDarkMode] = useState(() => {
  return localStorage.getItem("theme") === "dark";
});

useEffect(() => {
  const root = document.documentElement;
  if (darkMode) {
    root.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    root.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
}, [darkMode]);

  const handleAddToCart = (newItem) => {
    setCartItems((prev) => [...prev, newItem]);
  };

  const handleUpdateQty = (index, newQty) => {
    if (newQty <= 0) {
      setCartItems((prev) => prev.filter((_, idx) => idx !== index));
    } else {
      setCartItems((prev) =>
        prev.map((item, idx) =>
          idx === index ? { ...item, qty: newQty } : item
        )
      );
    }
  };

  const handleApplyPromo = (code) => {
    setPromoApplied(code === "DAGOREMPAH");
  };

  const scrollToMenu = () => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      <Navbar darkMode={darkMode} onToggleDarkMode={() => setDarkMode((prev) => !prev)} />

      <main>
        <HeroSection onScrollToMenu={scrollToMenu} />
        <MenuCatalogSection
          menus={MENUS}
          onAddToCart={handleAddToCart}
          cartItems={cartItems}
          onUpdateQty={handleUpdateQty}
          promoApplied={promoApplied}
          onApplyPromo={handleApplyPromo}
          deliveryFee={deliveryFee}
          onChangeDeliveryFee={setDeliveryFee}
          paymentMethod={paymentMethod}
          onSelectPaymentMethod={setPaymentMethod}
          onCheckoutSuccess={() => {}}
        />
      </main>

      <FooterSection />
    </div>
  );
}