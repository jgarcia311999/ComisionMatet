"use client";
import React from "react";

export default function Home() {
  return (
    <main className="min-h-screen bg-blue-600 text-white font-sans flex justify-center">
      <div className="w-full max-w-md py-8 flex flex-col justify-between">
        {/* Header */}
        <header className="px-6">
          <h1 className="text-[47px] font-bold text-white leading-none">
            MTT. DASHBOARD
          </h1>
          <div className="flex justify-between items-center text-xs text-white mt-1">
            <span>
              Comision de fiestas de Matet 2026
              <br />
              Matet, 12415
            </span>
            <a href="https://matet-es-fiesta.vercel.app/" className="underline">
              Visit web →
            </a>
          </div>
        </header>

        <section className="mt-6  overflow-hidden">
          {/* Lista tipo tarjetas azules */}
          <ul className="divide-y divide-white/40 bg-blue-600">
            {[
              { title: "Ideas", caption: "Propuestas de actividades" },
              { title: "Quehaceres", caption: "Tareas pendientes" },
              { title: "Horarios", caption: "Eventos y agenda" },
              { title: "Contactos", caption: "Personas y roles" },
              { title: "Próximamente", caption: "Novedades" },
            ].map((item) => (
              <li key={item.title}>
                <a
                  href="#"
                  className="block px-4 py-5 text-white hover:bg-blue-400 active:bg-blue-700 transition-colors"
                >
                  <div className="text-[34px] leading-none font-semibold">{item.title}</div>
                  <div className="text-[10px] mt-2 opacity-90 uppercase tracking-wide">{item.caption}</div>
                </a>
              </li>
            ))}
          </ul>
          {/* Barra inferior */}
          <div className="bg-blue-600/95 text-white text-center text-xs py-2">
            <a href="#" className="underline underline-offset-2">See all →</a>
          </div>
        </section>

        {/* <div className="flex-1" />

        <footer className="border-t border-blue-600 pt-3 text-blue-600 text-xs">
          <div>
            <p className="font-semibold mb-3">Links</p>
            <div className="grid grid-cols-2 gap-y-1 text-sm">
              <a href="#" className="hover:underline">
                Ideas
              </a>
              <a href="#" className="hover:underline">
                Contactos
              </a>
              <a href="#" className="hover:underline">
                Horarios
              </a>
              <a href="#" className="hover:underline">
                Quehaceres
              </a>
              <a href="#" className="hover:underline">
                Proximamente
              </a>
              
            </div>
          </div>
          <div className="mt-4 border-t border-blue-600 pt-2 flex justify-between text-xs">
            <span>ISO 3166 codes</span>
            <span>GR-A1</span>
          </div>
        </footer> */}
      </div>
    </main>
  );
}
