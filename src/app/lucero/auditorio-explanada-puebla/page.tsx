"use client";
import EventDetailPage from "@/components/EventDetail";

export default function Page() {
  return (
    <EventDetailPage
      event={{
        name: "Lucero",
        venue: "AUDITORIO AREMA EXPLANADA • CHOLULA DE RIVADAVIA",
        price: 1499,
        original: 2700,
        dates: "28 mar 2026",
        image: "/event5.png",
        slug: "/lucero/auditorio-explanada-puebla",
        description: "Lucero llega a Puebla con su gira Siempre Contigo, celebrando 46 años de trayectoria artística. Una noche especial para recorrer los grandes éxitos que han marcado generaciones.",
      }}
    />
  );
}
