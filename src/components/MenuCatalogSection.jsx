import React, { useState, useEffect } from "react";
import { POTONGAN_OPTIONS, ADDON_OPTIONS } from "../data/menuData";
import CheckoutSection from "./CheckoutSection";

export default function MenuCatalogSection({
  menus,
  onAddToCart,
  cartItems,
  onUpdateQty,
  promoApplied,
  onApplyPromo,
  deliveryFee,
  onChangeDeliveryFee,
  paymentMethod,
  onSelectPaymentMethod,
  onCheckoutSuccess,
}) {
  const [activeMenuId, setActiveMenuId] = useState(menus[0].id);
  const selectedMenu = menus.find((m) => m.id === activeMenuId) || menus[0];
  const isRotiMaryam = selectedMenu.customType === "roti_maryam";

  const [potongan, setPotongan] = useState(POTONGAN_OPTIONS[0]);
  const [selectedSize, setSelectedSize] = useState(
    selectedMenu.sizes?.[0] || "Reguler"
  );
  const [selectedFlavorId, setSelectedFlavorId] = useState(
    selectedMenu.flavors?.[0]?.id || ""
  );
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [note, setNote] = useState("");
  const [qty, setQty] = useState(1);
  const [addedToast, setAddedToast] = useState("");

  // State pelacakan & ulasan
  const [orderStep, setOrderStep] = useState(1);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [reviewSent, setReviewSent] = useState(false);

  // Reset pilihan saat mengganti menu
  useEffect(() => {
    if (selectedMenu.customType === "roti_maryam") {
      setSelectedSize(selectedMenu.sizes?.[0] || "Reguler");
      setSelectedFlavorId(selectedMenu.flavors?.[0]?.id || "");
      setSelectedAddons([]);
    } else {
      setPotongan(POTONGAN_OPTIONS[0]);
      setSelectedAddons([]);
    }
    setQty(1);
  }, [activeMenuId, selectedMenu]);

  const toggleAddon = (addon) => {
    setSelectedAddons((prev) =>
      prev.some((item) => item.id === addon.id)
        ? prev.filter((item) => item.id !== addon.id)
        : [...prev, addon]
    );
  };

  const getMaryamFlavorPrice = (flavor, size) => {
    if (!flavor) return selectedMenu.price;
    return flavor.pricesBySize?.[size] ?? flavor.price ?? selectedMenu.price;
  };

  const selectedFlavor = isRotiMaryam
    ? selectedMenu.flavors?.find((f) => f.id === selectedFlavorId) ||
      selectedMenu.flavors?.[0]
    : null;

  const addonTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);

  const unitPrice = isRotiMaryam
    ? getMaryamFlavorPrice(selectedFlavor, selectedSize)
    : selectedMenu.price + addonTotal;

  const totalPrice = unitPrice * qty;

  const handleAdd = () => {
    onAddToCart({
      menu: selectedMenu,
      isRotiMaryam,
      variantLabel: isRotiMaryam ? selectedSize : potongan,
      flavorLabel: isRotiMaryam ? selectedFlavor?.label : null,
      addons: isRotiMaryam ? [] : selectedAddons,
      note: note.trim(),
      qty,
      unitPrice,
    });
    setAddedToast(
      `${selectedMenu.name}${
        isRotiMaryam
          ? ` (${selectedSize} - ${selectedFlavor?.label})`
          : ""
      } (${qty}x) ditambahkan ke keranjang!`
    );
    setNote("");
    setTimeout(() => setAddedToast(""), 2500);
  };

  const steps = ["Sedang Disiapkan", "Diantar Kurir", "Diterima"];

  return (
    <section
      id="menu"
      className="py-14 px-6 border-t border-gray-200/70 dark:border-gray-800"
    >
      <div className="max-w-6xl mx-auto space-y-14">
        {/* Bagian Katalog & Kustomisasi */}
        <div>
          <div className="max-w-xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600">
              Menu Siap Santap
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-1">
              Pilih & Kustomisasi Pesanan Anda
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Semua hidangan dimasak matang siap santap tanpa opsi frozen food.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Daftar Menu */}
            <div className="lg:col-span-6 space-y-4">
              {menus.map((menu) => {
                const isSelected = menu.id === selectedMenu.id;
                return (
                  <div
                    key={menu.id}
                    onClick={() => setActiveMenuId(menu.id)}
                    className={`p-5 rounded-2xl border cursor-pointer transition ${
                      isSelected
                        ? "bg-red-50/70 dark:bg-red-950/25 border-red-600 shadow-sm"
                        : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:border-red-300"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className="inline-block text-xs font-bold bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 px-2.5 py-0.5 rounded-full">
                          {menu.badge}
                        </span>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-2">
                          {menu.name}
                        </h3>
                      </div>
                      <span className="text-lg font-extrabold text-red-600">
                        {menu.customType === "roti_maryam"
                          ? "Mulai Rp 7.000"
                          : `Rp ${menu.price.toLocaleString("id-ID")}`}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                      {menu.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {menu.highlights.map((h) => (
                        <span
                          key={h}
                          className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2.5 py-1 rounded-lg"
                        >
                          ✓ {h}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Panel Kustomisasi Menu Terpilih */}
            <div className="lg:col-span-6 bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-5">
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
                <div>
                  <span className="text-xs text-gray-500">Sedang diatur:</span>
                  <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">
                    {selectedMenu.name}
                  </h3>
                </div>
                <span className="text-xs font-semibold text-red-600 bg-red-50 dark:bg-red-950/40 px-3 py-1 rounded-full">
                  ± {selectedMenu.prepTime}
                </span>
              </div>

              {/* 1. Bagian Potongan -> Ukuran (untuk Roti Maryam) */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wide text-gray-700 dark:text-gray-300 block mb-2">
                  {isRotiMaryam ? "1. UKURAN" : "1. BAGIAN POTONGAN"}
                </label>
                {isRotiMaryam ? (
                  <div className="grid grid-cols-2 gap-2.5">
                    {(selectedMenu.sizes || ["Reguler", "Large"]).map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setSelectedSize(sz)}
                        className={`py-2 rounded-xl text-sm font-semibold border transition ${
                          selectedSize === sz
                            ? "bg-red-600 text-white border-red-600"
                            : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700"
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {POTONGAN_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setPotongan(opt)}
                        className={`py-2 rounded-xl text-sm font-semibold border transition ${
                          potongan === opt
                            ? "bg-red-600 text-white border-red-600"
                            : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 2. Tambahan (Add-ons) -> Rasa (untuk Roti Maryam) */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wide text-gray-700 dark:text-gray-300 block mb-2">
                  {isRotiMaryam
                    ? `2. RASA (${selectedSize})`
                    : "2. TAMBAHAN (ADD-ONS)"}
                </label>

                {isRotiMaryam ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {(selectedMenu.flavors || []).map((flavor) => {
                      const active = selectedFlavor?.id === flavor.id;
                      const flavorPrice = getMaryamFlavorPrice(
                        flavor,
                        selectedSize
                      );
                      return (
                        <button
                          key={flavor.id}
                          type="button"
                          onClick={() => setSelectedFlavorId(flavor.id)}
                          className={`px-3 py-2.5 rounded-xl text-xs sm:text-sm flex flex-col items-start justify-between border transition ${
                            active
                              ? "bg-red-50 dark:bg-red-950/40 border-red-600 text-red-700 dark:text-red-300 font-bold"
                              : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200"
                          }`}
                        >
                          <span>{flavor.label}</span>
                          <span className="text-[11px] opacity-85 mt-0.5">
                            Rp {flavorPrice.toLocaleString("id-ID")}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {ADDON_OPTIONS.map((addon) => {
                      const active = selectedAddons.some(
                        (a) => a.id === addon.id
                      );
                      return (
                        <button
                          key={addon.id}
                          type="button"
                          onClick={() => toggleAddon(addon)}
                          className={`px-3 py-2.5 rounded-xl text-xs sm:text-sm flex flex-col items-start justify-between border transition ${
                            active
                              ? "bg-red-50 dark:bg-red-950/40 border-red-600 text-red-700 dark:text-red-300 font-bold"
                              : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200"
                          }`}
                        >
                          <span>{addon.label}</span>
                          <span className="text-[11px] opacity-80 mt-0.5">
                            +Rp {addon.price.toLocaleString("id-ID")}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 3. Catatan (Note) */}
              <div>
                <label
                  htmlFor="order-note"
                  className="text-xs font-bold uppercase tracking-wide text-gray-700 dark:text-gray-300 block mb-2"
                >
                  3. CATATAN (NOTE)
                </label>
                <input
                  id="order-note"
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={
                    isRotiMaryam
                      ? "Contoh: Susu kental manisnya agak banyak..."
                      : "Contoh: Sambal dipisah, ayam digoreng agak kering..."
                  }
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3.5 py-2.5 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:border-red-500"
                />
              </div>

              {/* Jumlah & Tombol Tambah */}
              <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="px-3.5 py-2 font-bold text-red-600 hover:bg-red-50 dark:hover:bg-gray-800"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-sm font-bold">{qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty(qty + 1)}
                    className="px-3.5 py-2 font-bold text-red-600 hover:bg-red-50 dark:hover:bg-gray-800"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button" 
                  onClick={handleAdd}
                  className="flex-1 min-w-50 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-5 rounded-xl shadow transition"
                >
                  Tambah ke Keranjang • Rp {totalPrice.toLocaleString("id-ID")}
                </button>
              </div>

              {addedToast && (
                <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  ✓ {addedToast}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Bagian Checkout Data Diri & Ongkir di bawah Roti Maryam & Kustomisasi */}
        <CheckoutSection
          cartItems={cartItems}
          onUpdateQty={onUpdateQty}
          promoApplied={promoApplied}
          onApplyPromo={onApplyPromo}
          deliveryFee={deliveryFee}
          onChangeDeliveryFee={onChangeDeliveryFee}
          paymentMethod={paymentMethod}
          onSelectPaymentMethod={onSelectPaymentMethod}
          onCheckoutSuccess={onCheckoutSuccess}
        />

        {/* Bagian Pelacakan Pesanan & Ulasan */}
        <div
          id="tracking"
          className="grid lg:grid-cols-2 gap-6 bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-gray-800"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">
                Status Pengantaran Dago
              </h3>
              <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
                Pembayaran: {paymentMethod}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Simulasi alur status pesanan siap santap dari dapur hingga ke
              lokasi Anda.
            </p>

            <div className="w-full h-2.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-600 transition-all duration-300"
                style={{ width: `${((orderStep + 1) / steps.length) * 100}%` }}
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              {steps.map((label, idx) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setOrderStep(idx)}
                  className={`py-2 px-2 rounded-xl text-xs font-bold border transition ${
                    orderStep === idx
                      ? "bg-red-600 text-white border-red-600"
                      : "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 lg:border-l lg:border-gray-200 lg:dark:border-gray-800 lg:pl-6">
            <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">
              Ulasan Pelanggan
            </h3>
            <div className="flex gap-1 text-xl">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={
                    star <= rating
                      ? "text-amber-400"
                      : "text-gray-300 dark:text-gray-700"
                  }
                >
                  ★
                </button>
              ))}
            </div>
            <textarea
              rows={2}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Tulis kesan rasa menu siap santap..."
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:border-red-500"
            />
            <button
              type="button"
              onClick={() => setReviewSent(true)}
              className="bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-4 py-2 rounded-xl transition"
            >
              Kirim Ulasan
            </button>
            {reviewSent && (
              <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                ✓ Ulasan bintang {rating} berhasil dicatat!
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
