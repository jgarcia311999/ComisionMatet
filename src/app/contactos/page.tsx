"use client";
import React from "react";

export default function Contactos() {
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
            <a href="https://matet-es-fiesta.vercel.app/" className="underline ">
              Visit web →
            </a>
          </div>
        </header>

        <section className="mt-6 overflow-hidden ">
          {/* Lista de contactos */}
          <ul className="divide-y divide-white/40 bg-blue-600">
            {[
              { nombre: "Jesús García", rol: "Presidente" },
              { nombre: "María López", rol: "Tesorería" },
              { nombre: "Raúl Pérez", rol: "Logística" },
              { nombre: "Lucía Martínez", rol: "Comunicación" },
            ].map((contacto) => (
              <li key={contacto.nombre}>
                <div className="block px-4 py-5 text-white">
                  <div className="text-[22px] leading-none font-semibold">{contacto.nombre}</div>
                  <div className="text-[12px] mt-2 opacity-90">{contacto.rol}</div>
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
