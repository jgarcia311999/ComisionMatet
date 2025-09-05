"use client";
import React, { useMemo, useState } from "react";
import ideasData from "../../data/ideas";
import type { IdeasData } from "../../data/ideas.types";

export default function IdeasPage() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const toggle = (key: string) =>
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ideasData as IdeasData;
    return (ideasData as IdeasData)
      .map((section) => ({
        ...section,
        items: section.items.filter((it) =>
          [section.title, it.text].some((t) => t.toLowerCase().includes(q))
        ),
      }))
      .filter((s) => s.items.length > 0);
  }, [query]);

  return (
    <main className="min-h-[100svh] bg-white text-gray-900 font-sans pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)]">
      <div className="w-full max-w-sm px-4 pt-5 flex flex-col min-h-[100svh] mx-auto">
        {/* HEADER */}
        <header className="select-none">
          <h1 className="text-blue-700 font-extrabold uppercase tracking-widest leading-none text-[64px]">IDEAS</h1>
        </header>

        {/* SEARCH BAR */}
        <div className="mt-3 border border-blue-600">
          <div className="flex items-center justify-between text-[16px] uppercase tracking-wide px-3 py-1 text-blue-700">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="w-full bg-transparent outline-none placeholder-blue-400"
              aria-label="Buscar idea"
            />
            {query && (
              <button onClick={() => setQuery("")} aria-label="clear" className="font-medium">×</button>
            )}
          </div>
        </div>

        {/* LISTA DE IDEAS */}
        <section className="mt-6">
          {filtered.map((section) => (
            <div key={section.key} className="mb-6">
              <button
                type="button"
                onClick={() => toggle(section.key)}
                aria-expanded={(open[section.key] ?? (query.length > 0)) ? true : false}
                className="w-full flex items-center justify-between text-lg font-bold text-blue-600 uppercase tracking-wide mb-3"
              >
                <span>{section.title}</span>
                <svg
                  className={`transition-transform duration-200 ${ (open[section.key] ?? (query.length > 0)) ? "rotate-180" : "rotate-0"}`}
                  width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                >
                  <path d="M7 10l5 5 5-5H7z"/>
                </svg>
              </button>
              {(open[section.key] ?? (query.length > 0)) && (
                <ul>
                  {section.items.map((idea) => (
                    <li key={idea.id} className="border-t border-blue-600 first:border-t-0">
                      <div className="px-2 py-4 hover:bg-blue-50 transition-colors">
                        <div className="flex items-start justify-between gap-3">
                          <div className="text-[18px] sm:text-[22px] leading-none font-semibold text-blue-700">{idea.text}</div>
                          <span className="text-[12px] uppercase tracking-wide text-blue-500 whitespace-nowrap mt-0.5">ID: {idea.id}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                  <li className="border-t border-blue-600" />
                </ul>
              )}
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-blue-500 text-sm">No hay ideas para esa búsqueda.</div>
          )}
        </section>

        {/* FOOTER ICONOS */}
        <footer className="mt-auto pb-6">
          <div className="flex items-center justify-center gap-10 text-blue-700 text-[20px] select-none">
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
      </div>
    </main>
  );
}