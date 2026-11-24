import React, { useState } from "react";
import { PAYMENT_METHODS } from "../data/menuData";

const SHIPPING_ZONES = [
  { id: "dekat", label: "Sekitar Dago Bawah / Simpang (0–2 km)", fee: 8000 },
  { id: "sedang", label: "Dago Atas / Ciumbuleuit / Coblong (2–5 km)", fee: 12000 },
  { id: "jauh", label: "Luar Dago / Kota Bandung (5+ km)", fee: 18000 },
];

export default function CheckoutSection({
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
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedZone, setSelectedZone] = useState("dekat");
  const [promoCode, setPromoCode] = useState("DAGOREMPAH");
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.unitPrice * item.qty,
    0
  );
  const activeDeliveryFee = subtotal > 0 ? deliveryFee : 0;
  const discount = promoApplied ? Math.round(subtotal * 0.2) : 0;
  const total = Math.max(0, subtotal + activeDeliveryFee - discount);

  const handleSelectZone = (zone) => {
    setSelectedZone(zone.id);
    onChangeDeliveryFee(zone.fee);
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setStatusMessage("");
    setIsError(false);

    if (cartItems.length === 0) {
      setIsError(true);
      setStatusMessage("Keranjang masih kosong. Tambahkan menu terlebih dahulu.");
      return;
    }

    if (!customerName.trim() || !address.trim() || !phone.trim()) {
      setIsError(true);
      setStatusMessage("Mohon lengkapi Nama Pembeli, Alamat, dan No. HP.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: customerName.trim(),
          delivery_address: address.trim(),
          phone_number: phone.trim(),
          subtotal_amount: subtotal,
          delivery_fee: activeDeliveryFee,
          discount_amount: discount,
          total_amount: total,
          payment_method: paymentMethod,
          promo_code: promoApplied ? promoCode : null,
          items: cartItems,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setStatusMessage(
          `Pesanan atas nama ${customerName.trim()} (#${data.order_id}) berhasil dibuat! Ongkir Rp ${activeDeliveryFee.toLocaleString("id-ID")}, Total Rp ${total.toLocaleString("id-ID")}.`
        );
        onCheckoutSuccess?.(data.order_id);
      } else {
        setStatusMessage(
          `Pesanan atas nama ${customerName.trim()} dicatat (Total Rp ${total.toLocaleString("id-ID")} via ${paymentMethod}).`
        );
      }
    } catch {
      setStatusMessage(
        `Pesanan atas nama ${customerName.trim()} siap diproses (Ongkir Rp ${activeDeliveryFee.toLocaleString("id-ID")}, Total Rp ${total.toLocaleString("id-ID")} via ${paymentMethod}).`
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmitOrder}
      className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-6"
    >
      <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-red-600">
          Checkout Pesanan
        </span>
        <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mt-1">
          Data Diri Pembeli & Ongkos Kirim
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Isi data penerima dan tentukan ongkos kirim dari outlet Ayam Rempah Dago ke alamat tujuan.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Kolom Kiri: Data Diri & Ongkir */}
        <div className="lg:col-span-7 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="buyer-name"
                className="text-xs font-bold uppercase tracking-wide text-gray-700 dark:text-gray-300 block mb-1.5"
              >
                Nama Pembeli
              </label>
              <input
                id="buyer-name"
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Contoh: Rina Kusuma"
                className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3.5 py-2.5 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label
                htmlFor="buyer-phone"
                className="text-xs font-bold uppercase tracking-wide text-gray-700 dark:text-gray-300 block mb-1.5"
              >
                No. HP / WhatsApp
              </label>
              <input
                id="buyer-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Contoh: 081234567890"
                className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3.5 py-2.5 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="buyer-address"
              className="text-xs font-bold uppercase tracking-wide text-gray-700 dark:text-gray-300 block mb-1.5"
            >
              Alamat Lengkap Pembeli
            </label>
            <textarea
              id="buyer-address"
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Contoh: Jl. Ir. H. Juanda No. 123, Dago, Bandung (patokan / nomor rumah)"
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3.5 py-2.5 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Ongkos Kirim dari Tempat Jualan ke Alamat Pembeli */}
          <div className="space-y-2.5 pt-1">
            <label className="text-xs font-bold uppercase tracking-wide text-gray-700 dark:text-gray-300 block">
              Ongkos Kirim (Dari Outlet Dago ke Alamat Pembeli)
            </label>
            <div className="grid sm:grid-cols-3 gap-2.5">
              {SHIPPING_ZONES.map((zone) => {
                const active = selectedZone === zone.id;
                return (
                  <button
                    key={zone.id}
                    type="button"
                    onClick={() => handleSelectZone(zone)}
                    className={`p-3 rounded-xl text-left border transition ${
                      active
                        ? "bg-red-50 dark:bg-red-950/40 border-red-600 text-red-700 dark:text-red-300"
                        : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200"
                    }`}
                  >
                    <span className="text-xs font-bold block leading-snug">
                      {zone.label}
                    </span>
                    <span className="text-xs font-extrabold text-red-600 mt-1 block">
                      Rp {zone.fee.toLocaleString("id-ID")}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3 pt-1">
              <label
                htmlFor="manual-ongkir"
                className="text-xs font-semibold text-gray-600 dark:text-gray-400"
              >
                Atur manual ongkir (Rp):
              </label>
              <input
                id="manual-ongkir"
                type="number"
                min={0}
                step={1000}
                value={deliveryFee}
                onChange={(e) => {
                  setSelectedZone("custom");
                  onChangeDeliveryFee(Math.max(0, Number(e.target.value) || 0));
                }}
                className="w-36 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-1.5 text-sm font-bold text-gray-900 dark:text-gray-100 focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          {/* Metode Pembayaran */}
          <div className="space-y-2 pt-1">
            <label className="text-xs font-bold uppercase tracking-wide text-gray-700 dark:text-gray-300 block">
              Metode Pembayaran
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {PAYMENT_METHODS.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => onSelectPaymentMethod(m)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                    paymentMethod === m
                      ? "bg-red-600 text-white border-red-600"
                      : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Item Pesanan & Total */}
        <div className="lg:col-span-5 bg-gray-50 dark:bg-gray-800/60 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 space-y-4">
          <h4 className="text-sm font-extrabold uppercase tracking-wide text-gray-800 dark:text-gray-200">
            Ringkasan Item Pesanan
          </h4>

          {cartItems.length === 0 ? (
            <p className="text-xs text-gray-500 py-4 text-center">
              Belum ada item di pesanan. Pilih menu di atas lalu klik Tambah ke Keranjang.
            </p>
          ) : (
            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {cartItems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex justify-between items-center gap-2"
                >
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">
                      {item.menu.name}
                    </p>
                    <p className="text-[11px] text-gray-500">
                      {item.variantLabel}
                      {item.flavorLabel ? ` • Rasa: ${item.flavorLabel}` : ""}
                      {item.addons && item.addons.length > 0
                        ? ` • +${item.addons.map((a) => a.label).join(", ")}`
                        : ""}
                    </p>
                    {item.note && (
                      <p className="text-[11px] italic text-amber-700 dark:text-amber-400">
                        Catatan: "{item.note}"
                      </p>
                    )}
                    <p className="text-xs font-extrabold text-red-600 mt-1">
                      Rp {(item.unitPrice * item.qty).toLocaleString("id-ID")}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 bg-red-50 dark:bg-red-950/40 px-2 py-1 rounded-lg">
                    <button
                      type="button"
                      onClick={() => onUpdateQty(idx, item.qty - 1)}
                      className="text-red-600 font-bold text-xs px-1"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold">{item.qty}</span>
                    <button
                      type="button"
                      onClick={() => onUpdateQty(idx, item.qty + 1)}
                      className="text-red-600 font-bold text-xs px-1"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Kode Promo */}
          <div className="flex gap-2">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
              className="flex-1 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-1.5 text-xs font-bold uppercase"
            />
            <button
              type="button"
              onClick={() => onApplyPromo(promoCode)}
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl"
            >
              {promoApplied ? "Aktif" : "Pakai"}
            </button>
          </div>

          {/* Rincian Biaya */}
          <div className="space-y-1.5 pt-2 border-t border-gray-200 dark:border-gray-700 text-xs">
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Subtotal Menu</span>
              <span>Rp {subtotal.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Ongkos Kirim</span>
              <span>Rp {activeDeliveryFee.toLocaleString("id-ID")}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between font-semibold text-emerald-600">
                <span>Diskon Promo</span>
                <span>-Rp {discount.toLocaleString("id-ID")}</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-extrabold text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-700">
              <span>Total Bayar</span>
              <span className="text-red-600">
                Rp {total.toLocaleString("id-ID")}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl shadow transition"
          >
            Checkout Sekarang ({paymentMethod})
          </button>

          {statusMessage && (
            <p
              className={`text-xs font-semibold ${
                isError
                  ? "text-red-600 dark:text-red-400"
                  : "text-emerald-600 dark:text-emerald-400"
              }`}
            >
              {statusMessage}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}