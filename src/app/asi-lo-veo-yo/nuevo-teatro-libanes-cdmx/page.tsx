"use client";
import EventDetailPage from "@/components/EventDetail";

export default function Page() {
  return (
    <EventDetailPage
      event={{
        name: "Así Lo Veo Yo",
        venue: "NUEVO TEATRO LIBANÉS • CDMX",
        price: 299,
        original: 600,
        dates: "25 feb 2026 al 25 mar 2026",
        image: "/event1.jpg",
        slug: "/asi-lo-veo-yo/nuevo-teatro-libanes-cdmx",
        description: "Un monólogo donde René Dupeyron desnuda su verdad. No hay fórmulas ni héroes, solo la confesión de alguien que se atrevió a pedir ayuda. Una experiencia teatral única que te confronta con tus propias emociones.",
      }}
    />
  );
}
