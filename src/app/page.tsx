
"use client";
import React from "react";
import Link from "next/link";

export default function Home() {
  const items = [
    { label: "Ideas", href: "/ideas" },
    { label: "Quehaceres", href: "/quehaceres" },
    { label: "Horarios", href: "/horarios" },
    { label: "Contactos", href: "/contactos" },
    { label: "Próximamente", href: "/" },
  ];

  return (
    <main className="min-h-[100svh] bg-white text-gray-900 font-sans flex justify-center pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)]">
      <div className="w-full max-w-sm px-4 pt-5 flex flex-col min-h-[100svh]">
        {/* HEADER TITLE */}
        <header className="select-none">
          <h1 className="text-blue-600 font-extrabold uppercase tracking-widest leading-none text-[56px]">MATET</h1>
        </header>

        {/* SEARCH BAR (fake, como en el mock) */}
        <div className="mt-3 border border-blue-600">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-wide px-2 py-1 text-blue-700">
            <span>Search</span>
            <button aria-label="clear" className="font-medium">×</button>
          </div>
        </div>

        {/* MENU LIST */}
        <nav className="mt-2">
          <ul>
            {items.map((it) => (
              <li key={it.label} className="border-t border-blue-600 first:border-t-0">
                <Link
                  href={it.href}
                  className="block w-full px-2 py-3 uppercase tracking-wide text-blue-700 font-semibold hover:bg-blue-50"
                >
                  {it.label}
                </Link>
              </li>
            ))}
            {/* cierre inferior */}
            <li className="border-t border-blue-600" />
          </ul>
        </nav>

        {/* FOOTER ICONS */}
        <footer className="mt-auto pb-6">
          <div className="flex items-center justify-center gap-6 text-blue-700">
            {/* Facebook */}
            <a href="#" aria-label="Facebook" className="hover:opacity-80">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12.06C22 6.49 17.52 2 11.94 2 6.37 2 1.88 6.49 1.88 12.06c0 4.99 3.64 9.13 8.4 9.94v-7.03H7.9v-2.9h2.38V9.41c0-2.35 1.4-3.64 3.54-3.64 1.03 0 2.1.18 2.1.18v2.31h-1.18c-1.16 0-1.52.72-1.52 1.46v1.76h2.59l-.41 2.9h-2.18V22c4.76-.81 8.4-4.95 8.4-9.94z"/></svg>
            </a>
            {/* YouTube */}
            <a href="#" aria-label="YouTube" className="hover:opacity-80">
              <svg width="24" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.51 3.5 12 3.5 12 3.5s-7.51 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.89.6 9.4.6 9.4.6s7.51 0 9.4-.6a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-5.8 31 31 0 0 0-.5-5.8zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>
            </a>
            {/* Instagram */}
            <a href="#" aria-label="Instagram" className="hover:opacity-80">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.75-.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/></svg>
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}
