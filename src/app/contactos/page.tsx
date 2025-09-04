"use client";
import React from "react";

export default function Contactos() {
  return (
    <main className="min-h-[100svh] bg-white text-gray-900 font-sans flex justify-center pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)]">
      <div className="w-full max-w-md px-4 py-6 flex flex-col justify-between">
        {/* Header */}
        <header className="px-4">
          <h1 className="text-[47px] font-bold text-gray-900 leading-none">
            Contactos
          </h1>
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
          {/* Lista de contactos */}
          <ul className="divide-y divide-gray-200">
            {[
              { nombre: "Jesús García", rol: "Presidente" },
              { nombre: "María López", rol: "Tesorería" },
              { nombre: "Raúl Pérez", rol: "Logística" },
              { nombre: "Lucía Martínez", rol: "Comunicación" },
            ].map((contacto) => (
              <li key={contacto.nombre}>
                <div className="block px-4 py-5 hover:bg-gray-50 transition-colors">
                  <div className="text-[22px] leading-none font-semibold text-gray-900">{contacto.nombre}</div>
                  <div className="text-[12px] mt-2 text-gray-500">{contacto.rol}</div>
                </div>
              </li>
            ))}
          </ul>
          {/* Barra inferior */}
          {/* <div className="bg-blue-600/95 text-white text-center text-xs py-2">
            <a href="/" className="underline underline-offset-2">← Volver a inicio</a>
          </div> */}
        </section>
      </div>
    </main>
  );
}
