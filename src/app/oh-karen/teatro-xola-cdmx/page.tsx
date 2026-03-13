"use client";
import EventDetailPage from "@/components/EventDetail";

export default function Page() {
  return (
    <EventDetailPage
      event={{
        name: "¡Oh Karen!",
        venue: "TEATRO XOLA • CDMX",
        price: 199,
        dates: "25 mar 2026",
        image: "/event4.png",
        slug: "/oh-karen/teatro-xola-cdmx",
        description: "Una comedia fresca y desternillante que te hará reír desde el primer momento. Karen enfrenta situaciones absurdas que todos hemos vivido, con un humor inteligente y timing perfecto.",
      }}
    />
  );
}
