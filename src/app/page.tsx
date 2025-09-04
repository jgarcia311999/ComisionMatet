"use client";
import React from "react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen h-screen bg-[#EDE9DF] flex justify-center items-center p-4 overflow-hidden">
      <div className="w-[330px] max-w-full rounded-md ">
        <div className="pt-[6px] pr-1 pb-[10px] pl-1">
          {/* Icono menú hamburguesa */}
          <div
            aria-label="Abrir menú"
            className="w-[28px] h-[20px] grid gap-[4px] cursor-pointer ml-auto mb-4"
          >
            <span className="block h-[4px] bg-[#3A3735]" />
            <span className="block h-[4px] bg-[#3A3735]" />
            <span className="block h-[4px] bg-[#3A3735]" />
          </div>
          <div className="w-full">
            <div className="text-[90px] leading-[0.9] font-black tracking-[2px] text-[#393533] uppercase text-center w-full">
              MATET
            </div>
          </div>
        </div>

        {/* Imagen */}
        <div className="rounded-sm overflow-hidden">
          <Image
            src="/mtt_iglesia.png"
            alt="Mar"
            width={600}
            height={500}
            className="w-full h-auto block filter grayscale contrast-105"
          />
        </div>
      </div>
    </main>
  );
}
