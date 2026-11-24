import React from "react";
import BrandLogo from "./BrandLogo";

export default function FooterSection() {
    return (
        <footer
            id="contact"
            className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 py-10 px-6"
        >
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <BrandLogo size="sm" />
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    Jl. Ir. H. Juanda (Dago), Bandung • Khusus Menu Matang Siap Santap
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    © 2026 Ayam Rempah Dago!
                </p>
            </div>
        </footer>
    );
}