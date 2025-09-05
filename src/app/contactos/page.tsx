"use client";
import React, { useState } from "react";

export default function Contactos() {
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const onPhoneClick = (e: React.MouseEvent<HTMLAnchorElement>, key: string) => {
    if (!revealed[key]) {
      e.preventDefault();
      setRevealed((prev) => ({ ...prev, [key]: true }));
    }
  };
  return (
    <main className="min-h-[100svh] bg-white text-gray-900 font-sans flex justify-center pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)]">
      <div className="w-full max-w-sm px-4 pt-5 flex flex-col min-h-[100svh]">
        {/* Header */}
        <header className="select-none">
          <h1 className="text-blue-600 font-extrabold uppercase tracking-widest leading-none text-[56px]">CONTACTS</h1>
        </header>
        {/* SEARCH BAR (decorativa) */}
        <div className="mt-3 border border-blue-600">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-wide px-2 py-1 text-blue-700">
            <span>Search</span>
            <button aria-label="clear" className="font-medium">×</button>
          </div>
        </div>

        <section className="mt-6 overflow-hidden">
          {/* Lista de contactos */}
          <ul>
            {[
              { nombre: "Ana Gomez", rol: "Presidente", telefono: "6XX XXX XX" },
              { nombre: "Jesús García", rol: "Vicepresidente", telefono: "6XX XXX XX" },
              { nombre: "Luca Davide", rol: "Tesorero", telefono: "6XX XXX XX" },
              
            ].map((contacto) => (
              <li key={contacto.nombre} className="border-t border-blue-600 first:border-t-0">
                <div className="block px-2 py-3 hover:bg-blue-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="text-[18px] leading-none font-semibold text-blue-700">{contacto.nombre}</div>
                    <a
                      href={`tel:${contacto.telefono.replace(/\s+/g, "")}`}
                      onClick={(e) => onPhoneClick(e, contacto.nombre)}
                      className="inline-flex items-center gap-1 text-blue-700 font-semibold"
                      aria-label={`Llamar a ${contacto.nombre}`}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.1.36 2.29.55 3.58.55a1 1 0 0 1 1 1V21a1 1 0 0 1-1 1C10.3 22 2 13.7 2 3a1 1 0 0 1 1-1h4.51a1 1 0 0 1 1 1c0 1.29.19 2.48.55 3.58a1 1 0 0 1-.24 1.01l-2.2 2.2z"/>
                      </svg>
                      <span className={`text-[13px] tracking-wide ${revealed[contacto.nombre] ? "blur-0" : "blur-sm select-none"}`}>
                        {contacto.telefono}
                      </span>
                    </a>
                  </div>
                  <div className="text-[11px] mt-1 uppercase tracking-wide text-blue-500">{contacto.rol}</div>
                </div>
              </li>
            ))}
            <li className="border-t border-blue-600" />
          </ul>
          {/* FOOTER ICONOS */}
          <footer className="mt-8 pb-6">
            <div className="flex items-center justify-center gap-6 text-blue-700">
              <a href="#" aria-label="Facebook" className="hover:opacity-80">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12.06C22 6.49 17.52 2 11.94 2 6.37 2 1.88 6.49 1.88 12.06c0 4.99 3.64 9.13 8.4 9.94v-7.03H7.9v-2.9h2.38V9.41c0-2.35 1.4-3.64 3.54-3.64 1.03 0 2.1.18 2.1.18v2.31h-1.18c-1.16 0-1.52.72-1.52 1.46v1.76h2.59l-.41 2.9h-2.18V22c4.76-.81 8.4-4.95 8.4-9.94z"/></svg>
              </a>
              <a href="#" aria-label="YouTube" className="hover:opacity-80">
                <svg width="24" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.51 3.5 12 3.5 12 3.5s-7.51 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.89.6 9.4.6 9.4.6s7.51 0 9.4-.6a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-5.8 31 31 0 0 0-.5-5.8zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>
              </a>
              <a href="#" aria-label="Instagram" className="hover:opacity-80">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.75-.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/></svg>
              </a>
            </div>
          </footer>
        </section>
      </div>
    </main>
  );
}
