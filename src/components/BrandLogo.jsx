import React from "react";

export default function BrandLogo({ size = "sm" }) {
    const isSmall = size === "sm";

    return (
        <div className="inline-flex items-center gap-2.5 select-none">
            <div
                className={`relative rounded-full bg-red-600 border-2 border-red-100 shadow-md flex flex-col items-center justify-center text-center ${
                    isSmall ? "w-11 h-11 p-1" : "w-14 h-14 p-1.5"
                }`}
            >
                <div
                    className={`absolute -top-2 bg-amber-300 border border-white rounded-full flex items-center justify-center shadow-sm ${
                        isSmall ? "w-4 h-4 text-[9px]" : "w-5 h-5 text-[11px]"
                    }`}
                >
                    🐓
                </div>
                <span className="font-black tracking-tighter text-white leading-none mt-1 text-[7px]">
          AYAM
        </span>
                <span className="font-black tracking-tighter bg-white text-red-600 px-1 rounded leading-tight text-[7px]">
          REMPAH
        </span>
                <span className="mt-0.5 bg-amber-300 text-red-700 font-extrabold px-1 rounded-sm leading-none text-[5px]">
          DAGO!
        </span>
                <span className="absolute -right-1 top-1/3 text-[10px]" title="Maskot Kucing">
          🐱
        </span>
            </div>
            <div className="text-left">
        <span className="font-extrabold text-base tracking-tight text-gray-900 dark:text-white block leading-none">
          ayamrempah<span className="text-red-600">.dago</span>
        </span>
                <span className="text-[11px] text-gray-500 dark:text-gray-400">
          Siap Santap • Bandung
        </span>
            </div>
        </div>
    );
}