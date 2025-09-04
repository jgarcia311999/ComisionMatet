"use client";
import React from "react";
import { fiestas } from "@/data/fiestas";

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
      <div className="w-full max-w-md px-4 py-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-sm font-semibold text-gray-500">Schedule</h2>
          <button className="text-sm font-semibold text-red-600">Add Event</button>
        </header>

        {/* Lista de meses y eventos */}
        {Object.entries(grouped).map(([month, evs]) => (
          <section key={month} className="mb-6">
            <h3 className="text-lg font-bold text-gray-400 capitalize mb-3">{month}</h3>
            <ul>
              {evs.map((ev, index) => {
                const day = new Date(ev.date).getDate();
                const prev = index > 0 ? new Date(evs[index - 1].date).getDate() : null;
                const showDay = prev !== day;

                return (
                  <li
                    key={ev.title + ev.date}
                    className={`flex items-center gap-4 ${showDay ? "mt-6" : "mt-2"}`}
                  >
                    {/* Día grande */}
                    {showDay ? (
                      <div className="flex items-center justify-center w-12">
                        <span className="text-5xl font-extrabold text-black leading-none transform -rotate-90">
                          {day}
                        </span>
                      </div>
                    ) : (
                      <div className="w-12" /> // espacio vacío para alinear
                    )}

                    {/* Detalles */}
                    <div className="flex-1">
                      <p className="text-xs text-gray-800">{ev.title}</p>
                      <p className="font-semibold">{ev.time}</p>
                      <p className="text-xs text-gray-400">{ev.location}</p>
                    </div>

                    {/* Icono flecha */}
                    <div className="text-red-500 font-bold text-lg">›</div>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}