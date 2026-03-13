"use client";
import Image from "next/image";
import Link from "next/link";

const allEvents = [
  { name: "Así Lo Veo Yo", city: "CDMX", venue: "Nuevo Teatro Libanés", price: 299, original: 600, image: "/event1.jpg", date: "25 Feb — 25 Mar", slug: "/asi-lo-veo-yo/nuevo-teatro-libanes-cdmx" },
  { name: "Mijares Sinfónico", city: "Toluca", venue: "Teatro Morelos", price: 1249, original: 2500, image: "/event2.jpg", date: "13 Marzo 2026", slug: "/mijares-sinfonico/teatro-morelos-toluca" },
  { name: "Infierno", city: "CDMX", venue: "Teatro Enrique Lizalde", price: 299, image: "/event3.jpg", date: "6 Marzo 2026", slug: "/infierno/teatro-enrique-lizalde-cdmx" },
  { name: "¡Oh Karen!", city: "CDMX", venue: "Teatro Xola", price: 199, image: "/event4.png", date: "25 Marzo 2026", slug: "/oh-karen/teatro-xola-cdmx" },
  { name: "Lucero", city: "Puebla", venue: "Auditorio Explanada", price: 1499, original: 2700, image: "/event5.png", date: "28 Marzo 2026", slug: "/lucero/auditorio-explanada-puebla" },
];

interface EventData {
  name: string;
  venue: string;
  price: number;
  original?: number;
  dates: string;
  image: string;
  description: string;
  slug: string;
}

export default function EventDetailPage({ event }: { event: EventData }) {
  const otherEvents = allEvents.filter((e) => e.slug !== event.slug);

  return (
    <main style={{ background: "#0a0a0a", color: "#fff", minHeight: "100vh" }}>
      {/* ═══ NAVBAR ═══ */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(10,10,10,0.95)", backdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        display: "flex", justifyContent: "center",
      }}>
        <div className="container-page" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "1.25rem", paddingBottom: "1.25rem" }}>
          <Link href="/" style={{ cursor: "pointer" }}>
            <Image src="/dulos-logo.svg" alt="Dulos" width={110} height={36} />
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
            {[
              { label: "Inicio", href: "/" },
              { label: "Comprar", href: "#comprar" },
              { label: "Perdí mis boletos", href: "#" },
            ].map((item) => (
              <Link key={item.label} href={item.href} className="nav-link" style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", transition: "color 0.3s ease" }}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* ═══ RED BANNER ═══ */}
      {event.original && (
        <div style={{
          background: "#E63946",
          padding: "0.75rem 0",
          textAlign: "center",
          fontSize: "0.95rem",
          fontWeight: 600,
          color: "#fff",
          letterSpacing: "0.02em",
        }}>
          🎉 Oferta: De ${event.original.toLocaleString()}.00 a ${event.price.toLocaleString()}.00
        </div>
      )}

      {/* ═══ BACK LINK ═══ */}
      <div className="container-page" style={{ paddingTop: "2rem" }}>
        <Link href="/" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none", fontSize: "14px", transition: "color 0.3s ease" }} className="nav-link">
          ← Volver
        </Link>
      </div>

      {/* ═══ EVENT DETAIL ═══ */}
      <section id="comprar" className="container-page" style={{ paddingTop: "3rem", paddingBottom: "5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          {/* Left — Info */}
          <div>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1rem" }}>
              {event.venue}
            </p>
            <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 900, lineHeight: 1.05, marginBottom: "1.5rem" }}>
              {event.name}
            </h1>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1rem", lineHeight: 1.8, marginBottom: "2rem", maxWidth: "500px" }}>
              {event.description}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "14px" }}>📅</span>
              <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.95rem" }}>{event.dates}</span>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "2.5rem" }}>
              {event.original && (
                <span style={{ color: "rgba(255,255,255,0.2)", textDecoration: "line-through", fontSize: "1.1rem" }}>
                  ${event.original.toLocaleString()}
                </span>
              )}
              <span style={{ color: "#E63946", fontSize: "2.25rem", fontWeight: 900 }}>
                ${event.price.toLocaleString()}
              </span>
            </div>
            <a
              href="#comprar"
              className="btn-primary"
              style={{
                display: "inline-block",
                background: "#E63946",
                color: "#fff",
                fontSize: "15px",
                fontWeight: 600,
                padding: "1rem 2.5rem",
                borderRadius: "9999px",
                textDecoration: "none",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
            >
              🎫 Comprar Boletos
            </a>
          </div>

          {/* Right — Poster */}
          <div style={{ position: "relative", aspectRatio: "3/4", borderRadius: "1rem", overflow: "hidden", background: "#111" }}>
            <Image src={event.image} alt={event.name} fill style={{ objectFit: "cover" }} priority />
          </div>
        </div>
      </section>

      {/* ═══ OTHER EVENTS ═══ */}
      <section style={{ padding: "5rem 0", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="container-page">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p style={{ color: "#E63946", fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem" }}>Próximos Eventos</p>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900 }}>Elige Tu Momento</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem" }}>
            {otherEvents.map((ev) => (
              <Link key={ev.name} href={ev.slug} className="event-card-link" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                <div style={{ borderRadius: "1rem", overflow: "hidden", cursor: "pointer", background: "#111111", border: "1px solid rgba(255,255,255,0.05)", transition: "transform 0.4s ease" }}>
                  <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", background: "#0a0a0a" }}>
                    <Image src={ev.image} alt={ev.name} fill className="event-card-img" style={{ objectFit: "cover", transition: "transform 0.7s ease" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #111111, transparent, transparent)" }} />
                    {ev.original && (
                      <div style={{ position: "absolute", top: "0.75rem", right: "0.75rem", background: "#E63946", color: "#fff", fontSize: "10px", fontWeight: 700, padding: "0.3rem 0.6rem", borderRadius: "9999px", letterSpacing: "0.1em" }}>
                        -{Math.round((1 - ev.price / ev.original) * 100)}% OFF
                      </div>
                    )}
                  </div>
                  <div style={{ padding: "1.25rem", marginTop: "-4rem", position: "relative", zIndex: 10 }}>
                    <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" }}>{ev.date}</p>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", marginTop: "0.4rem" }}>{ev.name}</h3>
                    <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", marginTop: "0.2rem" }}>{ev.venue} • {ev.city}</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "1rem" }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem" }}>
                        {ev.original && <span style={{ color: "rgba(255,255,255,0.2)", textDecoration: "line-through", fontSize: "0.8rem" }}>${ev.original}</span>}
                        <span style={{ color: "#E63946", fontSize: "1.25rem", fontWeight: 900 }}>${ev.price.toLocaleString()}</span>
                      </div>
                      <span className="ver-mas" style={{ color: "rgba(255,255,255,0.2)", fontSize: "11px", transition: "color 0.3s ease" }}>Ver más →</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.04)", padding: "2.5rem 0" }}>
        <div className="container-page" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ cursor: "pointer" }}>
            <Image src="/dulos-logo.svg" alt="Dulos" width={80} height={26} style={{ opacity: 0.4 }} />
          </Link>
          <p style={{ color: "rgba(255,255,255,0.15)", fontSize: "12px" }}>© 2026 Dulos. Sin comisiones, sin excusas.</p>
          <div style={{ display: "flex", gap: "2rem" }}>
            <a href="#" style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px", textDecoration: "none" }}>Términos</a>
            <a href="#" style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px", textDecoration: "none" }}>Privacidad</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
