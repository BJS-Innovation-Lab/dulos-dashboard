"use client";
import EventDetailPage from "@/components/EventDetail";

export default function Page() {
  return (
    <EventDetailPage
      event={{
        name: "Infierno",
        venue: "TEATRO ENRIQUE LIZALDE • COYOACÁN",
        price: 299,
        original: 710,
        dates: "6 mar 2026",
        image: "/event3.jpg",
        slug: "/infierno/teatro-enrique-lizalde-cdmx",
        description: "Una obra que explora los límites de la condición humana. Teatro contemporáneo en su máxima expresión, donde cada escena te sumerge más profundo en una experiencia visceral e inolvidable.",
      }}
    />
  );
}
