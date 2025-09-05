"use client";
import React from "react";
import { fiestas } from "../../data/fiestas";

export default function Horarios() {
  // helpers
  const ymdLocal = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  const todayYmd = ymdLocal(new Date());
  // Solo eventos desde hoy (incluido) y ordenados por fecha ascendente
  const upcoming = fiestas
    .filter((ev) => ev.date >= todayYmd)
    .sort((a, b) => a.date.localeCompare(b.date));

  // Agrupar por mes usando los eventos filtrados y meses en español
  const grouped = upcoming.reduce((acc: Record<string, typeof upcoming>, ev) => {
    const month = new Date(ev.date).toLocaleString("es-ES", { month: "long" });
    if (!acc[month]) acc[month] = [];
    acc[month].push(ev);
    return acc;
  }, {});

  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans flex justify-center">
      <div className="w-full max-w-sm px-4 pt-5 flex flex-col min-h-[100svh]">
        {/* Header */}
        <header className="select-none">
          <h1 className="text-blue-700 font-extrabold uppercase tracking-widest leading-none text-[56px]">HORARIOS</h1>
        </header>
        {/* SEARCH BAR decorativa */}
        <div className="mt-3 border border-blue-600">
          <div className="flex items-center justify-between text-[16px] uppercase tracking-wide px-3 py-1 text-blue-700">
            <span>Search</span>
            <button aria-label="clear" className="font-medium">×</button>
          </div>
        </div>

        <div className="mb-6"></div>

        {/* Lista de meses y eventos */}
        {Object.entries(grouped).map(([month, evs]) => (
          <section key={month} className="mb-6">
            <h3 className="text-lg font-bold text-blue-600 uppercase tracking-wide mb-3">{month}</h3>
            <ul>
              {evs.map((ev, index) => {
                const day = new Date(ev.date).getDate();
                const prevDay = index > 0 ? new Date(evs[index - 1].date).getDate() : null;
                const showDay = index === 0 || day !== prevDay;
                return (
                  <li key={ev.title + ev.date} className="border-t border-blue-600 first:border-t-0">
                    <div className="block px-2 py-3 hover:bg-blue-50 transition-colors">
                      <div className="flex items-start gap-3">
                        {showDay ? (
                          <div className="flex-shrink-0 w-12 text-left">
                            <div className="text-[48px] font-extrabold text-blue-600 leading-none">{day}</div>
                          </div>
                        ) : (
                          <div className="flex-shrink-0 w-12" />
                        )}
                        <div>
                          <div className="text-[22px] leading-none font-semibold text-blue-700">{ev.title}</div>
                          <div className="text-[16px] mt-1 text-blue-500">{ev.time}</div>
                          <div className="text-[14px] mt-1 uppercase tracking-wide text-blue-400">{ev.location}</div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
              <li className="border-t border-blue-600" />
            </ul>
          </section>
        ))}
        {/* Footer social icons */}
        <footer className="mt-auto flex items-center justify-center gap-10 py-8 select-none text-[20px]">
          <a
            href="https://instagram.com/matetcomision"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <rect width="18" height="18" x="3" y="3" rx="5" stroke="currentColor" strokeWidth="2"/>
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
            </svg>
          </a>
          <a
            href="mailto:matetcomision@gmail.com"
            aria-label="Email"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <rect width="18" height="14" x="3" y="5" rx="3" stroke="currentColor" strokeWidth="2"/>
              <path d="M5 7l7 6 7-6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
          </a>
        </footer>
      </div>
    </main>
  );
}