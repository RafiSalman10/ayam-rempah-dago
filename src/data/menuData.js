export const MENUS = [
    {
        id: 1,
        name: "Paket Ayam Rempah Ketumbar",
        badge: "Terlaris • Siap Santap",
        price: 20000,
        prepTime: "15–20 mnt",
        description:
            "Ayam siap santap gurih harum dengan racikan ketumbar sangrai dan rempah pilihan, digoreng hangat dadakan khusus untuk pesanan Anda.",
        highlights: ["Bumbu meresap", "Tanpa frozen food", "Hangat sampai tujuan"],
    },
    {
        id: 2,
        name: "Paket Ayam Rempah Lengkuas",
        badge: "Favorit • Siap Santap",
        price: 20000,
        prepTime: "15–20 mnt",
        description:
            "Ayam siap santap dengan taburan bumbu lengkuas berempah khas nusantara yang gurih, renyah, dan kaya aroma.",
        highlights: ["Serundeng renyah", "100% halal & fresh", "Cocok untuk makan siang"],
    },
    {
        id: 3,
        name: "Roti Maryam",
        badge: "Makanan manis • Siap Santap",
        price: 7000,
        prepTime: "± 10 mnt",
        customType: "roti_maryam",
        description:
            "Roti Maryam dengan berbagai pilihan toping manis yang lezat.",
        highlights: ["cocok diajdikan teman makan saat menonton film"],
        sizes: ["Reguler", "Large"],
        flavors: [
            {
                id: "original",
                label: "Original",
                pricesBySize: { Reguler: 7000, Large: 9000 },
            },
            {
                id: "meses",
                label: "Meses",
                pricesBySize: { Reguler: 8000, Large: 10000 },
            },
            {
                id: "keju",
                label: "Keju",
                pricesBySize: { Reguler: 9000, Large: 11000 },
            },
            {
                id: "chocolate_lumer",
                label: "Chocolate lumer",
                pricesBySize: { Reguler: 9000, Large: 11000 },
            },
            {
                id: "choco_cruncy",
                label: "Choco Cruncy",
                pricesBySize: { Reguler: 9000, Large: 11000 },
            },
            {
                id: "green_tea",
                label: "Green Tea",
                pricesBySize: { Reguler: 9000, Large: 11000 },
            },
            {
                id: "green_tea_cruncy",
                label: "Green Tea Cruncy",
                pricesBySize: { Reguler: 9000, Large: 11000 },
            },
            {
                id: "tiramisu",
                label: "Tiramisu",
                pricesBySize: { Reguler: 9000, Large: 11000 },
            },
            {
                id: "meses_keju",
                label: "Meses Keju",
                pricesBySize: { Reguler: 10000, Large: 13000 },
            },
        ],
    },
];

export const POTONGAN_OPTIONS = ["Dada", "Paha Atas", "Paha Bawah"];

export const ADDON_OPTIONS = [
    { id: "tahu", label: "Tahu", price: 2000 },
    { id: "tempe", label: "Tempe", price: 2000 },
    { id: "telor_ceplok", label: "Telor Ceplok", price: 6000 },
    { id: "telor_dadar", label: "Telor Dadar", price: 7000 },
    { id: "kol_goreng", label: "Kol Goreng", price: 5000 },
    { id: "vit", label: "Vit", price: 4000 },
    { id: "teh_pucuk", label: "Teh Pucuk", price: 4000 },
];

export const PAYMENT_METHODS = ["QRIS", "GOPAY", "OVO", "Virtual Account"];