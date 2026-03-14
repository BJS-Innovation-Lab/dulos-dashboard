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
        dates: "28 de marzo de 2026 al 28 de marzo de 2026",
        image: "/event5.png",
        slug: "/lucero/auditorio-explanada-puebla",
        quote: "Hay voces que no solo cantan... acompañan la vida de generaciones.",
        description: "Lucero. Siempre Contigo es la celebración de una trayectoria que ha brillado durante décadas. Un encuentro íntimo entre la artista y su público, donde cada canción revive recuerdos, emociones y momentos que han marcado la historia de la música en español.",
        longDescription: "A lo largo de esta noche especial, Lucero comparte los éxitos que han acompañado a millones de personas, en un recorrido lleno de nostalgia, alegría y conexión con quienes han crecido con su música.\n\nMás que un concierto, es un reencuentro con canciones que siguen vivas en el corazón del público. Una velada para cantar, recordar y celebrar el legado de una de las voces más queridas del escenario latino.",
        address: "Calle Ignacio Allende 512, Santiago Momoxpan Cholula de Rivadavia, Puebla, 72774 México",
        mapsUrl: "https://www.google.com/maps/place/Explanada+Puebla",
        mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.6!2d-98.27!3d19.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sExplanada+Puebla!5e0!3m2!1ses!2smx!4v1",
      }}
    />
  );
}
