"use client";
import EventDetailPage from "@/components/EventDetail";

export default function Page() {
  return (
    <EventDetailPage
      event={{
        name: "Mijares Sinfónico",
        venue: "TEATRO MORELOS • TOLUCA",
        price: 1249,
        original: 2500,
        dates: "13 mar 2026",
        image: "/event2.jpg",
        slug: "/mijares-sinfonico/teatro-morelos-toluca",
        description: "Mijares celebra 40 años de carrera con un espectáculo sinfónico único. Acompañado de una orquesta completa, recorre sus más grandes éxitos en una noche que promete ser inolvidable.",
      }}
    />
  );
}
