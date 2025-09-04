"use client";
import { useMemo, useState } from "react";
import Image from "next/image";

// Tip: todo es visual de momento. Datos de ejemplo para que puedas ver el flujo.
// Más adelante podrás cambiarlos por datos reales o conectarlos a una DB.

type Idea = { id: string; titulo: string; detalle: string; prioridad: "alta" | "media" | "baja"; autor: string };
type Tarea = { id: string; titulo: string; estado: "pendiente" | "en curso" | "hecho"; responsable?: string };
type Evento = { id: string; titulo: string; fechaISO: string; lugar?: string; notas?: string };
type Contacto = { id: string; nombre: string; rol: string; telefono?: string; email?: string };

const ideasMock: Idea[] = [
  { id: "i1", titulo: "Cena popular en la plaza", detalle: "Con música local y barra solidaria.", prioridad: "alta", autor: "María" },
  { id: "i2", titulo: "Concurso de paellas", detalle: "Domingo al mediodía, jurado del pueblo.", prioridad: "media", autor: "Paco" },
  { id: "i3", titulo: "Taller infantil", detalle: "Pintacaras y juegos tradicionales.", prioridad: "baja", autor: "Lucía" },
];

const tareasMock: Tarea[] = [
  { id: "t1", titulo: "Pedir permisos al ayuntamiento", estado: "en curso", responsable: "Jesús" },
  { id: "t2", titulo: "Reservar equipo de sonido", estado: "pendiente", responsable: "Raúl" },
  { id: "t3", titulo: "Diseñar carteles", estado: "hecho", responsable: "Ana" },
];

const agendaMock: Evento[] = [
  { id: "e1", titulo: "Reunión de comisión", fechaISO: "2025-09-06T19:30:00", lugar: "Local Social", notas: "Revisar presupuesto" },
  { id: "e2", titulo: "Noche de cine", fechaISO: "2025-09-13T22:00:00", lugar: "Plaza Mayor" },
  { id: "e3", titulo: "Subida a la ermita", fechaISO: "2025-10-01T09:00:00", lugar: "Salida desde la fuente" },
];

const contactosMock: Contacto[] = [
  { id: "c1", nombre: "Jesús García", rol: "Presidente", telefono: "+34 600 123 456" },
  { id: "c2", nombre: "María López", rol: "Tesorería", telefono: "+34 611 222 333", email: "maria@example.com" },
  { id: "c3", nombre: "Raúl Pérez", rol: "Logística", telefono: "+34 622 333 444" },
];

const SECCIONES = ["Ideas", "Quehaceres", "Horarios", "Contactos"] as const;
type Seccion = typeof SECCIONES[number];

function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${className}`}>{children}</span>
  );
}

function Card({ title, children, actions }: { title: string; children: React.ReactNode; actions?: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-black/5 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
      </div>
      <div className="text-sm text-gray-800">{children}</div>
    </section>
  );
}

function ProximoEvento({ eventos }: { eventos: Evento[] }) {
  const ahora = new Date();
  const siguiente = useMemo(() => eventos
    .map(e => ({ ...e, fecha: new Date(e.fechaISO) }))
    .filter(e => e.fecha.getTime() > ahora.getTime())
    .sort((a, b) => a.fecha.getTime() - b.fecha.getTime())[0], [eventos]);

  if (!siguiente) return (
    <Card title="Próximo evento">
      <p>No hay eventos próximos. ¡Añade uno en la sección Horarios!</p>
    </Card>
  );

  const fecha = siguiente.fecha.toLocaleString("es-ES", { dateStyle: "full", timeStyle: "short" });

  return (
    <Card
      title="Próximo evento"
      actions={<Badge className="bg-amber-100 text-amber-800">¡Rápido!</Badge>}
    >
      <div className="flex flex-col gap-2">
        <div className="text-lg font-semibold">{siguiente.titulo}</div>
        <div className="text-sm">📅 {fecha}</div>
        {siguiente.lugar && <div className="text-sm">📍 {siguiente.lugar}</div>}
        {siguiente.notas && <p className="mt-1 text-gray-600">📝 {siguiente.notas}</p>}
      </div>
    </Card>
  );
}

function IdeasLista({ ideas }: { ideas: Idea[] }) {
  const colorPorPrioridad: Record<Idea["prioridad"], string> = {
    alta: "bg-red-100 text-red-800",
    media: "bg-yellow-100 text-yellow-800",
    baja: "bg-green-100 text-green-800",
  };
  return (
    <ul className="divide-y divide-gray-100">
      {ideas.map((idea) => (
        <li key={idea.id} className="py-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium">{idea.titulo}</p>
              <p className="text-gray-600">{idea.detalle}</p>
              <p className="mt-1 text-xs text-gray-500">Propuesta por {idea.autor}</p>
            </div>
            <Badge className={colorPorPrioridad[idea.prioridad]}>Prioridad {idea.prioridad}</Badge>
          </div>
        </li>
      ))}
    </ul>
  );
}

function TareasLista({ tareas }: { tareas: Tarea[] }) {
  const estiloEstado: Record<Tarea["estado"], string> = {
    pendiente: "bg-gray-100 text-gray-800",
    "en curso": "bg-blue-100 text-blue-800",
    hecho: "bg-emerald-100 text-emerald-800",
  };
  return (
    <ul className="divide-y divide-gray-100">
      {tareas.map((t) => (
        <li key={t.id} className="py-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium">{t.titulo}</p>
              {t.responsable && <p className="text-gray-600 text-sm">Responsable: {t.responsable}</p>}
            </div>
            <Badge className={estiloEstado[t.estado]}>{t.estado}</Badge>
          </div>
        </li>
      ))}
    </ul>
  );
}

function AgendaTabla({ eventos }: { eventos: Evento[] }) {
  const ordenados = [...eventos].sort((a, b) => new Date(a.fechaISO).getTime() - new Date(b.fechaISO).getTime());
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500">
            <th className="px-2 py-2">Fecha</th>
            <th className="px-2 py-2">Título</th>
            <th className="px-2 py-2">Lugar</th>
            <th className="px-2 py-2">Notas</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {ordenados.map(e => (
            <tr key={e.id}>
              <td className="px-2 py-2 whitespace-nowrap">{new Date(e.fechaISO).toLocaleString("es-ES", { dateStyle: "medium", timeStyle: "short" })}</td>
              <td className="px-2 py-2">{e.titulo}</td>
              <td className="px-2 py-2">{e.lugar ?? "—"}</td>
              <td className="px-2 py-2">{e.notas ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ContactosLista({ contactos }: { contactos: Contacto[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {contactos.map(c => (
        <li key={c.id} className="rounded-lg border border-black/5 bg-white p-3">
          <p className="text-sm font-semibold">{c.nombre}</p>
          <p className="text-xs text-gray-600">{c.rol}</p>
          {c.telefono && <p className="mt-2 text-sm">📞 {c.telefono}</p>}
          {c.email && <p className="text-sm">✉️ {c.email}</p>}
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  const [seccion, setSeccion] = useState<Seccion>("Ideas");
  const [filtro, setFiltro] = useState("");

  const ideasFiltradas = useMemo(() =>
    ideasMock.filter(i => i.titulo.toLowerCase().includes(filtro.toLowerCase()) || i.detalle.toLowerCase().includes(filtro.toLowerCase())), [filtro]);
  const tareasFiltradas = useMemo(() =>
    tareasMock.filter(t => t.titulo.toLowerCase().includes(filtro.toLowerCase())), [filtro]);
  const agendaFiltrada = useMemo(() =>
    agendaMock.filter(e => e.titulo.toLowerCase().includes(filtro.toLowerCase()) || (e.lugar ?? "").toLowerCase().includes(filtro.toLowerCase())), [filtro]);
  const contactosFiltrados = useMemo(() =>
    contactosMock.filter(c => c.nombre.toLowerCase().includes(filtro.toLowerCase()) || c.rol.toLowerCase().includes(filtro.toLowerCase())), [filtro]);

  return (
    <main className="min-h-screen bg-[#F5EDC8]">
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-black/5 bg-white/80 px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <Image src="/logoMatet.png" alt="Logo MatetComision" width={48} height={48} />
          <h1 className="text-lg font-semibold text-gray-900">Dashboard Comisión</h1>
        </div>
        <div className="flex items-center gap-2">
          <input
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            placeholder="Buscar…"
            className="w-44 rounded-lg border border-black/10 bg-white px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-amber-300"
          />
        </div>
      </header>

      {/* Contenido */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 p-4 lg:grid-cols-12">
        {/* Columna izquierda: Próximo evento + navegación */}
        <div className="lg:col-span-4 space-y-4">
          <ProximoEvento eventos={agendaMock} />

          <Card title="Apartados">
            <nav className="flex flex-wrap gap-2">
              {SECCIONES.map((s) => (
                <button
                  key={s}
                  onClick={() => setSeccion(s)}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium border transition ${seccion === s ? "bg-amber-200 border-amber-300" : "bg-white border-black/10 hover:bg-amber-50"}`}
                  aria-current={seccion === s ? "page" : undefined}
                >
                  {s}
                </button>
              ))}
            </nav>
          </Card>
        </div>

        {/* Columna derecha: Contenido dinámico */}
        <div className="lg:col-span-8 space-y-4">
          {seccion === "Ideas" && (
            <Card title="Ideas">
              <IdeasLista ideas={ideasFiltradas} />
            </Card>
          )}

          {seccion === "Quehaceres" && (
            <Card title="Quehaceres">
              <TareasLista tareas={tareasFiltradas} />
            </Card>
          )}

          {seccion === "Horarios" && (
            <Card title="Horarios / Agenda">
              <AgendaTabla eventos={agendaFiltrada} />
            </Card>
          )}

          {seccion === "Contactos" && (
            <Card title="Contactos">
              <ContactosLista contactos={contactosFiltrados} />
            </Card>
          )}
        </div>
      </div>

      <footer className="mx-auto max-w-6xl px-4 pb-8 text-center text-xs text-gray-500">
        Hecho con ❤️ para Matet
      </footer>
    </main>
  );
}
