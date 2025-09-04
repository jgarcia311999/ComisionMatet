"use client";
import React from "react";
import Link from "next/link";

export default function Home() {
  const items = [
    { title: "Ideas", caption: "Propuestas de actividades" },
    { title: "Quehaceres", caption: "Tareas pendientes" },
    { title: "Horarios", caption: "Eventos y agenda", href: "/horarios" },
    { title: "Contactos", caption: "Personas y roles", href: "/contactos" },
    { title: "Próximamente", caption: "Novedades" },
  ];

  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans flex justify-center">
      <div className="w-full max-w-md px-4 py-6 flex flex-col justify-between">
        {/* Header */}
        <header className="px-4">
          <h1 className="text-[47px] font-bold text-gray-900 leading-none">MTT. DASHBOARD</h1>
          <div className="flex justify-between items-center text-xs text-gray-600 mt-1">
            <span>
              Comision de fiestas de Matet 2026
              <br />
              Matet, 12415
            </span>
            <a href="https://matet-es-fiesta.vercel.app/" className="underline text-red-600">
              Visit web →
            </a>
          </div>
        </header>

        <section className="mt-6 overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {items.map((item) => (
              <li key={item.title}>
                <Link href={item.href || "#"} className="block px-4 py-5 hover:bg-gray-50 transition-colors">
                  <div className="text-lg leading-snug font-semibold">{item.title}</div>
                  <div className="text-xs mt-1 text-gray-500">{item.caption}</div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="text-center text-xs py-2 text-gray-500">
            <a href="#" className="underline underline-offset-2">
              See all →
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
