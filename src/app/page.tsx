"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import { fiestas, type Fiesta } from "../data/fiestas";

export default function Home() {
  const items = [
    { title: "Ideas", },
    { title: "Quehaceres", },
    { title: "Horarios", href: "/horarios" },
    { title: "Contactos", href: "/contactos" },
    { title: "Próximamente", },
  ];

  // ---- Calendar state derived from fiestas ----
  const uniqueDates = useMemo(
    () => Array.from(new Set(fiestas.map((f) => f.date))).sort(),
    []
  );

  const todayStr = useMemo(() => {
    const now = new Date();
    const tzOffset = now.getTimezoneOffset();
    const localISO = new Date(now.getTime() - tzOffset * 60000).toISOString().slice(0, 10);
    return localISO; // YYYY-MM-DD in local time
  }, []);

  const nextDates = useMemo(
    () =>
      Array.from(new Set(fiestas.map((f) => f.date)))
        .sort()
        .filter((d) => d >= todayStr)
        .slice(0, 5),
    [todayStr]
  );

  const [selectedDate, setSelectedDate] = useState<string>(
    nextDates[0] || ""
  );

  const eventsForSelected = useMemo(
    () =>
      fiestas
        .filter((f) => f.date === selectedDate)
        .sort((a, b) => (a.time > b.time ? 1 : -1)),
    [selectedDate]
  );

  const getWeekdayAbbr = (dateStr: string) => {
    try {
      const d = new Date(dateStr + "T00:00:00");
      const wd = d.toLocaleDateString("es-ES", { weekday: "short" });
      // Return two-letter style similar to mock (Mo, Tu, We, Th, Fr, Sa, Su)
      return wd.slice(0, 2);
    } catch {
      return "";
    }
  };

  const monthLabel = useMemo(() => {
    if (!selectedDate) return "";
    const d = new Date(selectedDate + "T00:00:00");
    return d.toLocaleDateString("es-ES", { month: "long", year: "numeric" });
  }, [selectedDate]);

  return (
    <main className="min-h-[100svh] bg-white text-gray-900 font-sans flex justify-center pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)]">
      <div className="w-full max-w-md px-4 py-6 flex flex-col">
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

        <section className="mt-4 overflow-hidden">
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {items.map((item) => (
              <div key={item.title} className="flex-shrink-0 w-40 h-40 border rounded-lg overflow-hidden">
                <Link href={item.href || "#"} className="w-full h-full flex flex-col justify-center items-center hover:bg-gray-50 transition-colors">
                  <div className="text-lg font-semibold text-center">{item.title}</div>
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center text-xs py-2 text-gray-500">
            <a href="#" className="underline underline-offset-2">
              See all →
            </a>
          </div>
        </section>

        {/* Calendar */}
        <section className="mt-6">
          <div className="rounded-3xl border shadow-sm overflow-hidden bg-white">
            {/* Top bar: days & controls */}
            <div className="px-4 pt-4 text-sm font-semibold text-gray-900 capitalize text-center">
              {monthLabel}
            </div>
            <div className="px-6 sm:px-8">
              <div className="flex items-center justify-center text-xs text-gray-500">
                {/* Próximos 5 días con eventos */}
                <div className="flex items-center gap-4">
                  {nextDates.map((d) => (
                    <button
                      key={d}
                      onClick={() => setSelectedDate(d)}
                      className="relative flex items-center gap-1"
                    >
                      <span className="font-medium text-gray-900">{getWeekdayAbbr(d)}</span>
                      <span className={
                        d === selectedDate ? "text-gray-900 font-semibold" : ""
                      }>
                        {parseInt(d.split("-")[2] || "", 10)}
                      </span>
                      {d === selectedDate && (
                        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gray-900 rounded-full"></span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="grid grid-cols-[3rem,1fr] gap-x-3 p-4">
              {eventsForSelected.length === 0 && (
                <div className="col-span-2 text-xs text-gray-500 py-6 text-center">
                  No hay eventos para esta fecha.
                </div>
              )}

              {eventsForSelected.map((ev: Fiesta, idx) => (
                <React.Fragment key={`${ev.date}-${ev.time}-${idx}`}>
                  <div className="text-xs text-gray-500 pt-2">{ev.time}</div>
                  <div className="relative pb-4">
                    <div className={`rounded-2xl bg-green-100 text-gray-900 p-3 pr-12 shadow-inner ${
                      ev.provisional ? "border-2 border-dashed border-gray-400" : ""
                    }`}>
                      <div className="text-sm font-semibold leading-tight">{ev.title}</div>
                      <div className="text-[11px] mt-1 text-gray-600 line-clamp-2">{ev.description}</div>
                      <div className="text-[11px] mt-1 text-gray-600">{ev.location}</div>
                    </div>
                    {/* attendees placeholders (initials or circles) */}
                    {ev.attendees && ev.attendees.length > 0 && (
                      <div className="absolute top-2 right-2 flex -space-x-2">
                        {ev.attendees.slice(0, 2).map((a, i) => (
                          <span
                            key={i}
                            title={a}
                            className="w-6 h-6 rounded-full bg-gray-300 border grid place-items-center text-[10px] text-gray-700"
                          >
                            {a.trim().charAt(0).toUpperCase()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
