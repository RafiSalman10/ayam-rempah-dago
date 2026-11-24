import React, { useState } from "react";
import { PAYMENT_METHODS } from "../data/menuData";

export default function OrderDrawerModal({
                                             isOpen,
                                             onClose,
                                             cartItems,
                                             onUpdateQty,
                                             promoApplied,
                                             onApplyPromo,
                                             totals,
                                             paymentMethod,
                                             onSelectPaymentMethod,
                                             onCheckoutSuccess,
                                         }) {
    const [promoCode, setPromoCode] = useState("DAGOREMPAH");
    const [paidMessage, setPaidMessage] = useState("");

    if (!isOpen) return null;

    const handlePay = () => {
        setPaidMessage(
            `Pesanan dibayar via ${paymentMethod} (Total Rp ${totals.total.toLocaleString(
                "id-ID"
            )}). Sedang diteruskan ke dapur Dago!`
        );
        onCheckoutSuccess();
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
            <div className="w-full max-w-md bg-white dark:bg-gray-900 h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
                <div className="space-y-5">
                    <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
                        <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">
                            Keranjang & Checkout
                        </h3>
                        <button
                            onClick={onClose}
                            className="text-sm font-bold text-gray-500 hover:text-red-600 px-2 py-1"
                        >
                            ✕ Tutup
                        </button>
                    </div>

                    {/* Item Keranjang */}
                    {cartItems.length === 0 ? (
                        <p className="text-sm text-gray-500 py-6 text-center">
                            Keranjang masih kosong. Silakan pilih menu siap santap terlebih
                            dahulu.
                        </p>
                    ) : (
                        <div className="space-y-2.5">
                            {cartItems.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="p-3 rounded-2xl border border-gray-200 dark:border-gray-800 flex justify-between items-center"
                                >
                                    <div>
                                        <p className="text-sm font-bold text-gray-900 dark:text-white">
                                            {item.menu.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {item.potongan} •
                                            {item.addons.length > 0 &&
                                                ` • +${item.addons.map((a) => a.label).join(", ")}`}
                                        </p>
                                        <p className="text-xs font-extrabold text-red-600 mt-1">
                                            Rp {(item.unitPrice * item.qty).toLocaleString("id-ID")}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {item.variantLabel}
                                            {item.flavorLabel ? ` • Rasa: ${item.flavorLabel}` : ""}
                                            {item.addons && item.addons.length > 0
                                                ? ` • +${item.addons.map((a) => a.label).join(", ")}`
                                                : ""}
                                        </p>
                                        {item.note && (
                                            <p className="text-[11px] italic text-amber-700 dark:text-amber-400 mt-0.5">
                                                Catatan: "{item.note}"
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 bg-red-50 dark:bg-red-950/40 px-2.5 py-1 rounded-lg">
                                        <button
                                            onClick={() => onUpdateQty(idx, item.qty - 1)}
                                            className="text-red-600 font-bold text-sm"
                                        >
                                            -
                                        </button>
                                        <span className="text-xs font-bold">{item.qty}</span>
                                        <button
                                            onClick={() => onUpdateQty(idx, item.qty + 1)}
                                            className="text-red-600 font-bold text-sm"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Kode Promo */}
                    <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/70 space-y-2">
                        <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block">
                            Kode Promo (Coba: DAGOREMPAH)
                        </label>
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
                                className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-1.5 rounded-xl"
                            >
                                {promoApplied ? "Aktif" : "Pakai"}
                            </button>
                        </div>
                        {promoApplied && (
                            <p className="text-xs font-semibold text-emerald-600">
                                ✓ Diskon 20% DAGOREMPAH aktif!
                            </p>
                        )}
                    </div>

                    {/* Metode Pembayaran */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block">
                            Metode Pembayaran
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {PAYMENT_METHODS.map((m) => (
                                <button
                                    key={m}
                                    type="button"
                                    onClick={() => onSelectPaymentMethod(m)}
                                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                                        paymentMethod === m
                                            ? "bg-red-50 dark:bg-red-950/40 border-red-600 text-red-700 dark:text-red-300"
                                            : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                                    }`}
                                >
                                    {m}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Ringkasan & Tombol Bayar */}
                <div className="pt-5 mt-5 border-t border-gray-200 dark:border-gray-800 space-y-2">
                    <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                        <span>Subtotal</span>
                        <span>Rp {totals.subtotal.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                        <span>Pengiriman Dago</span>
                        <span>Rp {totals.deliveryFee.toLocaleString("id-ID")}</span>
                    </div>
                    {totals.discount > 0 && (
                        <div className="flex justify-between text-xs font-semibold text-emerald-600">
                            <span>Diskon Promo</span>
                            <span>-Rp {totals.discount.toLocaleString("id-ID")}</span>
                        </div>
                    )}
                    <div className="flex justify-between text-sm font-extrabold text-gray-900 dark:text-white pt-2 border-t border-gray-100 dark:border-gray-800">
                        <span>Total Bayar</span>
                        <span className="text-red-600">
              Rp {totals.total.toLocaleString("id-ID")}
            </span>
                    </div>

                    <button
                        type="button"
                        disabled={cartItems.length === 0}
                        onClick={handlePay}
                        className="w-full mt-3 bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white font-bold py-3 rounded-xl shadow transition"
                    >
                        Bayar Sekarang ({paymentMethod})
                    </button>

                    {paidMessage && (
                        <p className="text-xs font-semibold text-emerald-600 pt-2">
                            ✓ {paidMessage}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}