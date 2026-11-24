import React from "react";

export default function HeroSection({ onScrollToMenu }) {
    return (
        <section id="home" className="relative overflow-hidden pt-12 pb-16 px-6">
            {/* Efek gradasi lembut di latar belakang seperti referensi */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 right-0 w-[520px] h-[420px] rounded-full bg-gradient-to-tr from-red-500/20 via-amber-300/20 to-rose-400/20 blur-3xl"
            />

            <div className="max-w-5xl mx-auto text-center relative z-10">
                {/* Badge Kepercayaan */}
                <div className="inline-flex items-center gap-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-4 py-1.5 rounded-full shadow-xs mb-6">
                    <div className="flex -space-x-2 text-sm">
            <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center ring-2 ring-white dark:ring-gray-900">
              🎓
            </span>
                        <span className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center ring-2 ring-white dark:ring-gray-900">
              💼
            </span>
                        <span className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center ring-2 ring-white dark:ring-gray-900">
              🏡
            </span>
                    </div>
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
            Dipercaya pelanggan area Dago & Bandung • Promo{" "}
                        <strong className="text-red-600">DAGOREMPAH</strong>
          </span>
                </div>

                {/* Judul Utama */}
                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.12]">
                    Menghadirkan hangatnya{" "}
                    <span className="text-red-600">ayam rempah</span> siap santap.
                </h1>

                <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    Fokus pada menu matang siap santap—<strong>Ayam Rempah Ketumbar</strong>{" "}
                    dan <strong>Ayam Rempah Lengkuas</strong> ada juga <strong>Roti maryam</strong>— yang bisa menjadi pendmping di saat anda butuh cemilan, ayam yang bisa dibeli dengan pilihan potongan,
                    Roti Maryam berbagai rasa, dan pengantaran cepat ke Dago, Bandung.
                </p>

                {/* Tombol Aksi */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                    <button
                        onClick={onScrollToMenu}
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition"
                    >
                        Pesan Sekarang →
                    </button>
                    <a
                        href="#tracking"
                        className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 font-semibold px-6 py-3 rounded-full border border-gray-200 dark:border-gray-700 transition"
                    >
                        Cek Status Pesanan
                    </a>
                </div>

                {/* Banner Visual Lebar ala Referensi */}
                <div className="mt-12 rounded-3xl overflow-hidden border border-gray-200/80 dark:border-gray-800 shadow-xl bg-gradient-to-r from-red-700 via-red-600 to-rose-600 text-white p-8 sm:p-10 text-left grid md:grid-cols-2 gap-6 items-center">
                    <div>
            <span className="inline-block bg-amber-300 text-red-950 text-xs font-extrabold px-3 py-1 rounded-full">
              100% READY-TO-EAT (TANPA FROZEN)
            </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold mt-3">
                            Digoreng hangat saat dipesan, siap santap tanpa perlu repot.
                        </h2>
                        <p className="text-red-100 text-sm mt-2">
                            Atur potongan dada atau paha, tambahan makanan pendamping seperti tahu, tempe, telor,
                            rempah dan juga kol goreng,ada pula berbagai rasa manis dari roti maryam dan lacak pesanan langsung dari web.
                        </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-xs border border-white/20 rounded-2xl p-5 space-y-3">
                        <div className="flex justify-between items-center border-b border-white/15 pb-2.5">
                            <span className="text-sm font-semibold">🍗 Ayam Rempah Ketumbar</span>
                            <span className="font-bold text-amber-300">Rp 20.000</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/15 pb-2.5">
                            <span className="text-sm font-semibold">🍗 Ayam Rempah Lengkuas</span>
                            <span className="font-bold text-amber-300">Rp 20.000</span>
                        </div>
                        <div className="flex justify-between items-center text-xs text-red-100">
                            <span>🚚 Pengantaran area Dago, Bandung</span>
                            <span className="font-semibold text-white">Diskon 20% DAGOREMPAH</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}