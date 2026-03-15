"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const allEvents = [
  { name: "Así Lo Veo Yo", city: "CDMX", venue: "Nuevo Teatro Libanés", price: 299, original: 600, image: "/event1.jpg", date: "25 Feb — 25 Mar", slug: "/asi-lo-veo-yo/nuevo-teatro-libanes-cdmx" },
  { name: "Mijares Sinfónico", city: "Toluca", venue: "Teatro Morelos", price: 1249, original: 2500, image: "/event2.jpg", date: "13 Marzo 2026", slug: "/mijares-sinfonico/teatro-morelos-toluca" },
  { name: "Infierno", city: "CDMX", venue: "Teatro Enrique Lizalde", price: 299, image: "/event3.jpg", date: "6 Marzo 2026", slug: "/infierno/teatro-enrique-lizalde-cdmx" },
  { name: "¡Oh Karen!", city: "CDMX", venue: "Teatro Xola", price: 199, image: "/event4.png", date: "25 Marzo 2026", slug: "/oh-karen/teatro-xola-cdmx" },
  { name: "Lucero", city: "Puebla", venue: "Auditorio Explanada", price: 1499, original: 2300, image: "/event5.png", date: "28 Marzo 2026", slug: "/lucero/auditorio-explanada-puebla" },
];

interface Zone {
  name: string;
  color: string;
  price: number;
  originalPrice?: number;
  seats: number;
}

const eventZones: Record<string, Zone[]> = {
  // Datos reales de dulos.io — actualizado 14 mar 2026
  "Así Lo Veo Yo": [
    { name: "General", color: "#2A7AE8", price: 299, originalPrice: 600, seats: 434 },
  ],
  "Mijares Sinfónico": [
    { name: "General", color: "#2A7AE8", price: 1249, originalPrice: 2500, seats: 180 },
  ],
  "Infierno": [
    { name: "Preferente", color: "#E88D2A", price: 299, originalPrice: 710, seats: 37 },
  ],
  "¡Oh Karen!": [
    { name: "Zona de Karen", color: "#E63946", price: 349, seats: 83 },
    { name: "Preferente", color: "#E88D2A", price: 299, seats: 82 },
    { name: "General", color: "#2A7AE8", price: 199, seats: 83 },
  ],
  "Lucero": [
    { name: "Dorada", color: "#FFD700", price: 1499, originalPrice: 2300, seats: 49 },
    { name: "Blanca", color: "#E0E0E0", price: 1725, originalPrice: 2700, seats: 40 },
    { name: "Premium", color: "#C0A0FF", price: 1950, originalPrice: 3000, seats: 48 },
  ],
};

interface EventData {
  name: string;
  venue: string;
  price: number;
  original?: number;
  dates: string;
  image: string;
  description: string;
  slug: string;
  quote?: string;
  longDescription?: string;
  address?: string;
  mapsUrl?: string;
  mapsEmbed?: string;
  gallery?: string[];
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.9rem 1rem",
  background: "#1a1a1a",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "0.5rem",
  color: "#fff",
  fontSize: "0.95rem",
  fontFamily: "inherit",
  outline: "none",
  transition: "border-color 0.2s ease",
};

function TestimonialCarousel({ testimonials, active }: { testimonials: { text: string; name: string; rating: number }[]; active: number }) {
  const t = testimonials[active];
  return (
    <div style={{ position: "relative", minHeight: "180px" }}>
      <div key={active} style={{
        background: "#151515", borderRadius: "1rem", padding: "1.75rem",
        border: "1px solid rgba(255,255,255,0.06)",
        animation: "fadeIn 0.5s ease",
      }}>
        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", lineHeight: 1.8, marginBottom: "1.25rem" }}>
          &ldquo;{t.text}&rdquo;
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", fontStyle: "italic" }}>{t.name}</span>
          <div style={{ display: "flex", alignItems: "center", gap: "0.2rem" }}>
            {Array.from({ length: t.rating }).map((_, j) => (
              <span key={j} style={{ color: "#E63946", fontSize: "16px" }}>★</span>
            ))}
          </div>
        </div>
      </div>
      {/* Dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "1rem" }}>
        {testimonials.map((_, i) => (
          <div key={i} style={{
            width: i === active ? "24px" : "8px", height: "8px",
            borderRadius: "4px",
            background: i === active ? "#E63946" : "rgba(255,255,255,0.15)",
            transition: "all 0.3s",
          }} />
        ))}
      </div>
    </div>
  );
}

export default function EventDetailPage({ event }: { event: EventData }) {
  const otherEvents = allEvents.filter((e) => e.slug !== event.slug);
  const zones = eventZones[event.name] || eventZones["Así Lo Veo Yo"];
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showCheckout, setShowCheckout] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonials = [
    { text: "Compré boletos para mi mamá porque es muy fan de Lucero. Nos hizo felices. Canta increíble y estuvo muy bonito, todos salimos contentos.", name: "María G.", rating: 5 },
    { text: "Lucero en vivo es otro nivel. Voz impecable, conexión con el público y un show lleno de recuerdos.", name: "Luis Fernando", rating: 5 },
    { text: "Primera vez usando Dulos y la experiencia fue increíble. Sin comisiones extras, todo transparente.", name: "Ana Sofía", rating: 5 },
  ];
  const [timeLeft, setTimeLeft] = useState(10 * 60);
  const [mapCollapsed, setMapCollapsed] = useState(false);
  const [formData, setFormData] = useState<Array<{phone: string, name: string, lastName: string, email: string}>>([]);
  const [expandedForm, setExpandedForm] = useState<number>(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const selected = zones.find((z) => z.name === selectedZone);
  const subtotal = selected ? selected.price * quantity : 0;

  // Countdown timer — starts when drawer opens
  useEffect(() => {
    if (!showCheckout) return;
    setTimeLeft(10 * 60);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [showCheckout]);

  // Update formData array when quantity changes
  useEffect(() => {
    setFormData((prev) => {
      const next = Array.from({ length: quantity }, (_, i) =>
        prev[i] || { phone: "", name: "", lastName: "", email: "" }
      );
      return next;
    });
    setExpandedForm((prev) => Math.min(prev, quantity - 1));
  }, [quantity]);

  const isFormComplete = (f: { phone: string; name: string; lastName: string; email: string }) =>
    f.phone.trim() !== "" && f.name.trim() !== "" && f.lastName.trim() !== "" && f.email.trim() !== "";

  const allFormsComplete = formData.length === quantity && quantity > 0 && formData.every(isFormComplete);

  const updateFormField = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  // Auto-collapse completed form and open next incomplete
  const handleFormBlur = (index: number) => {
    setTimeout(() => {
      if (formData[index] && isFormComplete(formData[index])) {
        const nextIncomplete = formData.findIndex((f, i) => i !== index && !isFormComplete(f));
        setExpandedForm(nextIncomplete !== -1 ? nextIncomplete : -1);
      }
    }, 150);
  };

  const formatTime = useCallback((seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const handleZoneSelect = (zoneName: string) => {
    setSelectedZone(zoneName);
    setQuantity(1);
    setMapCollapsed(true);
  };

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
          <div className="ed-nav-links">
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
          <button className="ed-hamburger" aria-label="Menu">☰</button>
        </div>
      </nav>

      {/* ═══ RED BANNER ═══ */}
      {event.original && (
        <div style={{
          background: "linear-gradient(135deg, #E63946, #c0212e)",
          padding: "0.45rem 0",
          textAlign: "center",
          fontSize: "0.8rem",
          fontWeight: 600,
          color: "#fff",
          letterSpacing: "0.03em",
        }}>
          Oferta: De ${event.original.toLocaleString()}.00 a ${event.price.toLocaleString()}.00
        </div>
      )}

      {/* ═══ VENUE + TITLE + POSTER (visible fast) ═══ */}
      <section className="container-page" style={{ paddingTop: "2rem", paddingBottom: "1.5rem" }}>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "1rem", fontWeight: 600 }}>
          {event.venue}
        </p>

        <h1 className="ed-hero-title" style={{
          fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: "1.25rem",
          textDecoration: "underline", textDecorationColor: "#E63946", textUnderlineOffset: "6px", textDecorationThickness: "3px",
        }}>
          {event.name}
        </h1>

        {/* Short description */}
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1rem", lineHeight: 1.85, marginBottom: "1.5rem" }}>
          {event.description}
        </p>

        {/* Dates */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
          <span style={{ fontSize: "14px" }}>📅</span>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.95rem" }}>Fechas disponibles:</span>
        </div>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem", marginBottom: "1.5rem" }}>{event.dates}</p>
      </section>

      {/* ═══ POSTER — right after title, visible fast ═══ */}
      <section className="container-page" style={{ paddingBottom: "2rem" }}>
        <div style={{ position: "relative", width: "100%", borderRadius: "1rem", overflow: "hidden", background: "#111" }}>
          <div className="ed-hero-poster-container" style={{ position: "relative", width: "100%", aspectRatio: "3/4", maxHeight: "600px" }}>
            <Image src={event.image} alt={event.name} fill style={{ objectFit: "cover", objectPosition: "center" }} priority />
          </div>
        </div>
      </section>

      {/* ═══ ACERCA DE — detailed description below poster ═══ */}
      <section className="container-page" style={{ paddingBottom: "3rem" }}>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "1.25rem", fontWeight: 600 }}>
          ACERCA DE
        </p>

        <h2 style={{
          fontSize: "clamp(1.75rem, 5vw, 2.5rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: "1.5rem",
          textDecoration: "underline", textDecorationColor: "#E63946", textUnderlineOffset: "6px", textDecorationThickness: "3px",
        }}>
          {event.name}
        </h2>

        {/* Quote */}
        {event.quote && (
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "1.5rem", fontStyle: "italic" }}>
            &ldquo;{event.quote}&rdquo;
          </p>
        )}

        {/* Long description */}
        {event.longDescription && (
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem", lineHeight: 1.85 }}>
            {event.longDescription.split("\n\n").map((p, i) => (
              <p key={i} style={{ marginBottom: "1.25rem" }}>{p}</p>
            ))}
          </div>
        )}
      </section>

      {/* ═══ UBICACIÓN ═══ */}
      {event.address && (
        <section className="container-page" style={{ paddingBottom: "3rem" }}>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "1.25rem", fontWeight: 600 }}>
            UBICACIÓN
          </p>
          <h2 style={{
            fontSize: "clamp(1.5rem, 4vw, 2.25rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: "1.5rem",
            textDecoration: "underline", textDecorationColor: "#E63946", textUnderlineOffset: "6px", textDecorationThickness: "3px",
          }}>
            {event.venue.split("•")[0].trim()}
          </h2>
          <a href={event.mapsUrl || "#"} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", marginBottom: "1.5rem", textDecoration: "none" }}>
            <span style={{ color: "#E63946", fontSize: "14px", marginTop: "2px" }}>📍</span>
            <p style={{ color: "#E63946", fontSize: "1rem", lineHeight: 1.6 }}>{event.address}</p>
          </a>
          {event.mapsEmbed && (
            <div style={{ borderRadius: "1rem", overflow: "hidden", marginTop: "1rem" }}>
              <iframe
                src={event.mapsEmbed}
                width="100%" height="300"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          )}
        </section>
      )}

      {/* ═══ GALLERY ═══ */}
      {event.gallery && event.gallery.length > 0 && (
        <section className="container-page" style={{ paddingBottom: "3rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem" }}>
            {event.gallery.map((img, i) => (
              <div key={i} style={{ position: "relative", width: "100%", aspectRatio: "16/10", borderRadius: "1rem", overflow: "hidden" }}>
                <Image src={img} alt={`${event.name} ${i + 1}`} fill style={{ objectFit: "cover" }} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ═══ STICKY BOTTOM BAR ═══ */}
      {!showCheckout && (
        <div style={{
          position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50,
          background: "rgba(10,10,10,0.95)", backdropFilter: "blur(16px)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "0.75rem 1rem",
        }}>
          <button
            onClick={() => setShowCheckout(true)}
            className="btn-hero-primary"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              backgroundColor: "#E63946", color: "#fff",
              fontSize: "15px", fontWeight: 700,
              padding: "0.95rem 2rem", borderRadius: "8px",
              cursor: "pointer", border: "none",
              width: "100%", fontFamily: "inherit",
            }}
          >
            Comprar Boletos
          </button>
        </div>
      )}

      {/* ═══ PURCHASE DRAWER (slides up) ═══ */}
      {showCheckout && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => { setShowCheckout(false); setSelectedZone(null); setMapCollapsed(false); }}
            style={{
              position: "fixed", inset: 0, zIndex: 60,
              background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
            }}
          />
          {/* Drawer */}
          <div style={{
            position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 70,
            background: "#0a0a0a", borderRadius: "1.25rem 1.25rem 0 0",
            maxHeight: "92vh", overflowY: "auto",
            boxShadow: "0 -20px 60px rgba(0,0,0,0.8)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderBottom: "none",
          }}>
            {/* Header with timer */}
            <div style={{
              position: "sticky", top: 0, zIndex: 5,
              background: "#0a0a0a", padding: "0.75rem 1.5rem 0.75rem",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.5rem" }}>
                <div style={{ width: "36px", height: "4px", borderRadius: "2px", background: "rgba(255,255,255,0.2)" }} />
              </div>
              <button onClick={() => { setShowCheckout(false); setSelectedZone(null); setMapCollapsed(false); }} style={{
                position: "absolute", top: "0.75rem", right: "1rem",
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                color: "#fff", width: "32px", height: "32px", borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", fontSize: "0.9rem",
              }}>✕</button>
              {/* Timer — alarming red banner */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                marginBottom: "0.5rem", padding: "0.5rem 0.75rem", borderRadius: "6px",
                background: "linear-gradient(135deg, rgba(230,57,70,0.2), rgba(139,0,0,0.2))",
                border: "1px solid rgba(230,57,70,0.4)",
                animation: "timer-pulse 1.5s ease-in-out infinite",
              }}>
                <span style={{
                  fontSize: "0.6rem", fontWeight: 800, color: "#E63946",
                  background: "rgba(230,57,70,0.2)", padding: "0.15rem 0.35rem", borderRadius: "3px",
                  letterSpacing: "0.08em",
                }}>URGENTE</span>
                <span style={{ fontSize: "0.75rem", color: "#E63946", fontWeight: 600 }}>
                  Reserva expira en
                </span>
                <span style={{
                  fontFamily: "monospace", fontSize: "1.1rem", fontWeight: 900,
                  color: "#fff", letterSpacing: "0.1em",
                  background: "rgba(230,57,70,0.3)", padding: "0.1rem 0.4rem", borderRadius: "4px",
                  textShadow: "0 0 8px rgba(230,57,70,0.5)",
                }}>{formatTime(timeLeft)}</span>
              </div>
              <h2 style={{ fontSize: "1.05rem", fontWeight: 800, textAlign: "center" }}>
                Boletos disponibles
              </h2>
              {!mapCollapsed && (
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", textAlign: "center", marginTop: "0.15rem" }}>
                  Selecciona tu zona en el mapa
                </p>
              )}
            </div>

            <div style={{ padding: "1rem 1.5rem 1.5rem" }}>
              {/* Date & Time selector — premium */}
              <div style={{
                marginBottom: "1rem", borderRadius: "0.75rem", overflow: "hidden",
                border: "1px solid rgba(230,57,70,0.2)",
                background: "linear-gradient(135deg, rgba(230,57,70,0.06), rgba(0,0,0,0.3))",
              }}>
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "0.6rem 1rem",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}>
                  <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    Fecha y hora
                  </span>
                  <span style={{
                    fontSize: "0.55rem", fontWeight: 700, color: "#4CAF50",
                    background: "rgba(76,175,80,0.1)", padding: "0.15rem 0.4rem", borderRadius: "3px",
                    letterSpacing: "0.05em",
                  }}>
                    DISPONIBLE
                  </span>
                </div>
                <div style={{
                  display: "flex", alignItems: "center", padding: "0.75rem 1rem", gap: "0.75rem",
                }}>
                  <div style={{
                    width: "42px", height: "42px", borderRadius: "8px",
                    background: "linear-gradient(135deg, #E63946, #c0392b)",
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, boxShadow: "0 2px 8px rgba(230,57,70,0.3)",
                  }}>
                    <span style={{ fontSize: "0.5rem", fontWeight: 700, color: "rgba(255,255,255,0.8)", lineHeight: 1, textTransform: "uppercase" }}>MAR</span>
                    <span style={{ fontSize: "1.1rem", fontWeight: 900, color: "#fff", lineHeight: 1 }}>28</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#fff" }}>
                      Viernes, 28 de marzo
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", marginTop: "0.1rem" }}>
                      9:00 PM · Apertura de puertas 8:00 PM
                    </div>
                  </div>
                  <div style={{
                    width: "28px", height: "28px", borderRadius: "50%",
                    border: "2px solid #E63946", display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#E63946" }} />
                  </div>
                </div>
              </div>

              {/* Venue Map — collapsible */}
              <div style={{
                marginBottom: "1rem", borderRadius: "8px", overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.08)",
                transition: "all 0.3s ease",
              }}>
                {/* White header — clickable when collapsed */}
                <div
                  onClick={() => mapCollapsed && setMapCollapsed(false)}
                  style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "0.6rem 0.75rem", background: "#fff",
                    cursor: mapCollapsed ? "pointer" : "default",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    <span style={{
                      color: "#E63946", fontSize: "1.1rem", fontWeight: 900,
                      transition: "transform 0.3s", display: "inline-block",
                      transform: mapCollapsed ? "rotate(90deg)" : "rotate(0deg)",
                    }}>⟩</span>
                    <span style={{ fontSize: "1rem", fontWeight: 900, color: "#E63946", fontStyle: "italic" }}>Dulos</span>
                  </div>
                  {mapCollapsed && selected ? (
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "#E63946", background: "rgba(230,57,70,0.1)", padding: "0.2rem 0.5rem", borderRadius: "4px" }}>
                        Zona {selected.name}
                      </span>
                      <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#333" }}>${selected.price.toLocaleString()}</span>
                      <span style={{ fontSize: "0.6rem", color: "#888" }}>▼ cambiar</span>
                    </div>
                  ) : (
                    <span style={{ fontSize: "0.6rem", fontWeight: 900, color: "#111", letterSpacing: "0.05em", textTransform: "uppercase" }}>{event.venue.split("•")[0].trim()}</span>
                  )}
                </div>

                {/* SVG Map — hidden when collapsed */}
                <div style={{
                  maxHeight: mapCollapsed ? "0px" : "600px",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                }}>
                <svg viewBox="0 0 400 440" style={{ width: "100%", height: "auto", display: "block" }}>
                  <defs>
                    <filter id="zone-glow">
                      <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#E63946" floodOpacity="0.6" />
                    </filter>
                  </defs>
                  <rect x="0" y="0" width="400" height="440" fill="#aaa" />
                  <rect x="105" y="15" width="190" height="38" rx="3" fill="#2a2a2a" stroke="#ccc" strokeWidth="1.5" />
                  <rect x="105" y="60" width="190" height="38" rx="3" fill="#2a2a2a" stroke="#ccc" strokeWidth="1.5" />
                  <rect x="105" y="105" width="190" height="38" rx="3" fill="#2a2a2a" stroke="#ccc" strokeWidth="1.5" />

                  {/* DORADA */}
                  {(() => {
                    const s = selectedZone === "Dorada";
                    const fill = s ? "#b00d1c" : "#E63946";
                    const r = 4;
                    return (
                      <g onClick={() => handleZoneSelect("Dorada")} style={{ cursor: "pointer" }}>
                        <path d={[
                          `M${105+r},158`,
                          `L${295-r},158 Q295,158 295,${158+r}`,
                          `L295,${168-r} Q295,168 ${295-r},168`,
                          `L${285+r},168 Q285,168 285,${168+r}`,
                          `L285,${178-r} Q285,178 ${285-r},178`,
                          `L${275+r},178 Q275,178 275,${178+r}`,
                          `L275,${196-r} Q275,196 ${275-r},196`,
                          `L${125+r},196 Q125,196 125,${196-r}`,
                          `L125,${178+r} Q125,178 ${125-r},178`,
                          `L${115+r},178 Q115,178 115,${178-r}`,
                          `L115,${168+r} Q115,168 ${115-r},168`,
                          `L${105+r},168 Q105,168 105,${168-r}`,
                          `L105,${158+r} Q105,158 ${105+r},158`,
                          "Z"
                        ].join(" ")}
                          fill={fill} stroke="#fff" strokeWidth="2"
                          filter="url(#zone-glow)"
                          style={{ transition: "all 0.2s", filter: s ? "brightness(0.7)" : undefined }} />
                        <text x="200" y="184" textAnchor="middle" fill="#fff"
                          style={{ fontSize: "20px", fontWeight: 900, letterSpacing: "0.06em", pointerEvents: "none" }}>DORADA</text>
                      </g>
                    );
                  })()}

                  {/* BLANCA */}
                  {(() => {
                    const s = selectedZone === "Blanca";
                    const fill = s ? "#b00d1c" : "#E63946";
                    const r = 4;
                    return (
                      <g onClick={() => handleZoneSelect("Blanca")} style={{ cursor: "pointer" }}>
                        <path d={[
                          `M105,${210+r} Q105,210 ${105+r},210`,
                          `L${115-r},210 Q115,210 115,${210-r}`,
                          `L115,${203+r} Q115,203 ${115+r},203`,
                          `L${285-r},203 Q285,203 285,${203+r}`,
                          `L285,${210-r} Q285,210 ${285+r},210`,
                          `L${295-r},210 Q295,210 295,${210+r}`,
                          `L295,${241-r} Q295,241 ${295-r},241`,
                          `L${105+r},241 Q105,241 105,${241-r}`,
                          "Z"
                        ].join(" ")}
                          fill={fill} stroke="#fff" strokeWidth="2"
                          filter="url(#zone-glow)"
                          style={{ transition: "all 0.2s", filter: s ? "brightness(0.7)" : undefined }} />
                        <text x="200" y="229" textAnchor="middle" fill="#fff"
                          style={{ fontSize: "20px", fontWeight: 900, letterSpacing: "0.06em", pointerEvents: "none" }}>BLANCA</text>
                      </g>
                    );
                  })()}

                  {/* PREMIUM */}
                  {(() => {
                    const s = selectedZone === "Premium";
                    return (
                      <g onClick={() => handleZoneSelect("Premium")} style={{ cursor: "pointer" }}>
                        <rect x="105" y="248" width="190" height="76" rx="5"
                          fill={s ? "#b00d1c" : "#E63946"} stroke="#fff" strokeWidth="2"
                          filter="url(#zone-glow)"
                          style={{ transition: "all 0.2s", filter: s ? "brightness(0.7)" : undefined }} />
                        <text x="200" y="294" textAnchor="middle" fill="#fff"
                          style={{ fontSize: "20px", fontWeight: 900, letterSpacing: "0.06em", pointerEvents: "none" }}>PREMIUM</text>
                      </g>
                    );
                  })()}

                  {/* Dark staircase */}
                  {(() => {
                    const r = 4;
                    return <path d={[
                      `M${105+r},336`,
                      `L${295-r},336 Q295,336 295,${336+r}`,
                      `L295,${346-r} Q295,346 ${295-r},346`,
                      `L${275+r},346 Q275,346 275,${346+r}`,
                      `L275,${356-r} Q275,356 ${275-r},356`,
                      `L${255+r},356 Q255,356 255,${356+r}`,
                      `L255,${380-r} Q255,380 ${255-r},380`,
                      `L${145+r},380 Q145,380 145,${380-r}`,
                      `L145,${356+r} Q145,356 ${145-r},356`,
                      `L${125+r},356 Q125,356 125,${356-r}`,
                      `L125,${346+r} Q125,346 ${125-r},346`,
                      `L${105+r},346 Q105,346 105,${346-r}`,
                      `L105,${336+r} Q105,336 ${105+r},336`,
                      "Z"
                    ].join(" ")}
                      fill="#2a2a2a" stroke="#ccc" strokeWidth="1.5" />;
                  })()}

                  {/* ESCENARIO */}
                  <rect x="105" y="386" width="190" height="30" rx="5" fill="#E63946" stroke="#fff" strokeWidth="1.5"
                    filter="url(#zone-glow)" />
                  <text x="200" y="407" textAnchor="middle" fill="#fff"
                    style={{ fontSize: "14px", fontWeight: 900, letterSpacing: "0.12em" }}>ESCENARIO</text>
                </svg>

                {/* Price legend */}
                <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", padding: "0.75rem 0.5rem", background: "#111", flexWrap: "wrap" }}>
                  {zones.map((z) => (
                    <button key={z.name} onClick={() => handleZoneSelect(z.name)}
                      style={{
                        background: selectedZone === z.name ? "rgba(230,57,70,0.2)" : "rgba(255,255,255,0.04)",
                        border: selectedZone === z.name ? "1.5px solid #E63946" : "1.5px solid rgba(255,255,255,0.1)",
                        borderRadius: "6px", padding: "0.4rem 0.65rem", cursor: "pointer",
                        color: "#fff", fontSize: "0.7rem", fontWeight: 700, fontFamily: "inherit",
                        transition: "all 0.15s",
                      }}>
                      {z.name} <span style={{ color: "#E63946" }}>${z.price.toLocaleString()}</span>
                    </button>
                  ))}
                </div>
                </div>
              </div>

              {/* ═══ ZONE SELECTED: Quantity + Forms ═══ */}
              {selected && mapCollapsed && (
                <>
                  {/* Quantity selector */}
                  <div style={{
                    padding: "1rem", marginBottom: "1rem",
                    background: "rgba(255,255,255,0.03)", borderRadius: "0.75rem",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div>
                        <span style={{ fontSize: "0.9rem", fontWeight: 700 }}>Zona {selected.name}</span>
                        <span style={{ color: "#E63946", fontSize: "0.85rem", fontWeight: 700, marginLeft: "0.5rem" }}>${selected.price.toLocaleString()} c/u</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{
                          width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center",
                          background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "0.4rem 0 0 0.4rem", color: "#fff", cursor: "pointer", fontSize: "1.1rem", fontFamily: "inherit",
                        }}>−</button>
                        <div style={{
                          width: "44px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center",
                          background: "rgba(255,255,255,0.04)", borderTop: "1px solid rgba(255,255,255,0.1)",
                          borderBottom: "1px solid rgba(255,255,255,0.1)", fontWeight: 800, fontSize: "1rem",
                        }}>{quantity}</div>
                        <button onClick={() => setQuantity(Math.min(Math.min(selected.seats, 9), quantity + 1))} style={{
                          width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center",
                          background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "0 0.4rem 0.4rem 0", color: "#fff", cursor: "pointer", fontSize: "1.1rem", fontFamily: "inherit",
                        }}>+</button>
                      </div>
                    </div>
                    <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem", marginTop: "0.5rem" }}>
                      Máximo 9 boletos · {selected.seats} lugares disponibles
                    </p>
                  </div>

                  {/* Contact forms — accordion */}
                  {formData.map((form, idx) => {
                    const title = idx === 0 ? "Líder del pago" : `Invitado ${idx}`;
                    const complete = isFormComplete(form);
                    const isOpen = expandedForm === idx;

                    return (
                      <div key={idx} style={{
                        marginBottom: "0.75rem", borderRadius: "0.75rem", overflow: "hidden",
                        border: complete ? "1px solid rgba(76,175,80,0.3)" : "1px solid rgba(255,255,255,0.08)",
                        background: "#111",
                        transition: "all 0.3s ease",
                      }}>
                        {/* Accordion header */}
                        <div
                          onClick={() => setExpandedForm(isOpen ? -1 : idx)}
                          style={{
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                            padding: "0.85rem 1rem", cursor: "pointer",
                            background: complete ? "rgba(76,175,80,0.08)" : "transparent",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <span style={{
                              width: "24px", height: "24px", borderRadius: "50%",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              fontSize: "0.7rem", fontWeight: 800,
                              background: complete ? "#4CAF50" : "rgba(230,57,70,0.2)",
                              color: "#fff",
                            }}>
                              {complete ? "✓" : idx + 1}
                            </span>
                            <div>
                              <span style={{ fontSize: "0.85rem", fontWeight: 700 }}>{title}</span>
                              {complete && !isOpen && (
                                <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", marginLeft: "0.5rem" }}>
                                  {form.name} {form.lastName}
                                </span>
                              )}
                            </div>
                          </div>
                          <span style={{
                            fontSize: "0.7rem", color: "rgba(255,255,255,0.3)",
                            transition: "transform 0.3s", display: "inline-block",
                            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                          }}>▼</span>
                        </div>

                        {/* Form body */}
                        <div style={{
                          maxHeight: isOpen ? "400px" : "0px",
                          overflow: "hidden",
                          transition: "max-height 0.35s ease",
                        }}>
                          <div style={{ padding: "0 1rem 1rem" }}>
                            {/* Phone */}
                            <label style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", marginBottom: "0.3rem", marginTop: "0.5rem" }}>
                              Teléfono *
                            </label>
                            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem" }}>
                              <div style={{
                                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
                                borderRadius: "0.5rem", padding: "0.6rem 0.75rem", fontSize: "0.85rem", color: "#fff",
                                minWidth: "70px", textAlign: "center",
                              }}>🇲🇽 +52</div>
                              <input type="tel" placeholder="55 1234 5678"
                                value={form.phone}
                                onChange={(e) => updateFormField(idx, "phone", e.target.value)}
                                onBlur={() => handleFormBlur(idx)}
                                style={{
                                  flex: 1, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
                                  borderRadius: "0.5rem", padding: "0.6rem 0.75rem", fontSize: "0.85rem",
                                  color: "#fff", outline: "none", fontFamily: "inherit",
                                }}
                              />
                            </div>
                            {/* Name */}
                            <label style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", marginBottom: "0.3rem" }}>
                              Nombre *
                            </label>
                            <input type="text" placeholder="Tu nombre"
                              value={form.name}
                              onChange={(e) => updateFormField(idx, "name", e.target.value)}
                              onBlur={() => handleFormBlur(idx)}
                              style={{
                                width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
                                borderRadius: "0.5rem", padding: "0.6rem 0.75rem", fontSize: "0.85rem",
                                color: "#fff", outline: "none", fontFamily: "inherit", marginBottom: "0.75rem",
                                boxSizing: "border-box",
                              }}
                            />
                            {/* Last name */}
                            <label style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", marginBottom: "0.3rem" }}>
                              Apellido *
                            </label>
                            <input type="text" placeholder="Tu apellido"
                              value={form.lastName}
                              onChange={(e) => updateFormField(idx, "lastName", e.target.value)}
                              onBlur={() => handleFormBlur(idx)}
                              style={{
                                width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
                                borderRadius: "0.5rem", padding: "0.6rem 0.75rem", fontSize: "0.85rem",
                                color: "#fff", outline: "none", fontFamily: "inherit", marginBottom: "0.75rem",
                                boxSizing: "border-box",
                              }}
                            />
                            {/* Email */}
                            <label style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", marginBottom: "0.3rem" }}>
                              Correo electrónico *
                            </label>
                            <input type="email" placeholder="tu@email.com"
                              value={form.email}
                              onChange={(e) => updateFormField(idx, "email", e.target.value)}
                              onBlur={() => handleFormBlur(idx)}
                              style={{
                                width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
                                borderRadius: "0.5rem", padding: "0.6rem 0.75rem", fontSize: "0.85rem",
                                color: "#fff", outline: "none", fontFamily: "inherit",
                                boxSizing: "border-box",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Total summary */}
                  <div style={{
                    padding: "1rem", marginTop: "0.5rem",
                    background: "rgba(255,255,255,0.03)", borderRadius: "0.75rem",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: allFormsComplete ? "0" : "0.75rem" }}>
                      <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)" }}>
                        {quantity}x Zona {selected.name}
                      </span>
                      <span style={{ fontWeight: 900, fontSize: "1.5rem", color: "#E63946" }}>
                        ${subtotal.toLocaleString()}.00
                      </span>
                    </div>
                    {!allFormsComplete && (
                      <button disabled style={{
                        width: "100%", padding: "1rem",
                        background: "rgba(255,255,255,0.06)",
                        color: "rgba(255,255,255,0.2)",
                        border: "none", borderRadius: "8px",
                        fontSize: "1rem", fontWeight: 800,
                        cursor: "not-allowed", fontFamily: "inherit",
                      }}>
                        Completa todos los datos
                      </button>
                    )}
                  </div>

                  {/* Stripe payment section — auto-appears when all forms complete */}
                  {allFormsComplete && (
                    <div style={{
                      marginTop: "1rem", borderRadius: "0.75rem", overflow: "hidden",
                      border: "1px solid rgba(255,255,255,0.1)",
                      background: "#111",
                    }}>
                      {/* Stripe header */}
                      <div style={{
                        padding: "0.75rem 1rem",
                        background: "linear-gradient(135deg, #635BFF, #7A73FF)",
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <rect width="24" height="24" rx="4" fill="rgba(255,255,255,0.15)"/>
                            <path d="M13.976 9.15c-2.17-.5-3.057-.87-3.057-1.82 0-.78.69-1.24 1.856-1.24 1.826 0 3.057.72 3.057.72l.58-2.45s-1.24-.82-3.547-.82c-2.62 0-4.41 1.44-4.41 3.51 0 2.33 2.18 3.1 3.99 3.55 1.49.37 2.04.78 2.04 1.44 0 .78-.78 1.28-2.06 1.28-1.93 0-3.54-.92-3.54-.92l-.6 2.5s1.56.92 4.06.92c2.7 0 4.63-1.34 4.63-3.6 0-2.53-2.18-3.26-3.99-3.73z" fill="#fff"/>
                          </svg>
                          <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#fff" }}>Pago con tarjeta</span>
                        </div>
                        <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.6)" }}>Powered by Stripe</span>
                      </div>

                      {/* Payment form */}
                      <div style={{ padding: "1rem" }}>
                        <div style={{ marginBottom: "0.75rem" }}>
                          <label style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: "0.7rem", marginBottom: "0.3rem" }}>
                            Número de tarjeta
                          </label>
                          <div style={{
                            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
                            borderRadius: "0.5rem", padding: "0.7rem 0.75rem", fontSize: "0.85rem", color: "rgba(255,255,255,0.3)",
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                          }}>
                            <span>4242 4242 4242 4242</span>
                            <span style={{ fontSize: "0.7rem" }}>💳</span>
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "0.75rem" }}>
                          <div style={{ flex: 1 }}>
                            <label style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: "0.7rem", marginBottom: "0.3rem" }}>
                              Vencimiento
                            </label>
                            <input type="text" placeholder="MM / AA" style={{
                              width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
                              borderRadius: "0.5rem", padding: "0.7rem 0.75rem", fontSize: "0.85rem",
                              color: "#fff", outline: "none", fontFamily: "inherit", boxSizing: "border-box",
                            }} />
                          </div>
                          <div style={{ flex: 1 }}>
                            <label style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: "0.7rem", marginBottom: "0.3rem" }}>
                              CVC
                            </label>
                            <input type="text" placeholder="123" style={{
                              width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
                              borderRadius: "0.5rem", padding: "0.7rem 0.75rem", fontSize: "0.85rem",
                              color: "#fff", outline: "none", fontFamily: "inherit", boxSizing: "border-box",
                            }} />
                          </div>
                        </div>
                        <div style={{ marginBottom: "1rem" }}>
                          <label style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: "0.7rem", marginBottom: "0.3rem" }}>
                            Titular de la tarjeta
                          </label>
                          <input type="text" defaultValue={formData[0] ? `${formData[0].name} ${formData[0].lastName}` : ""} style={{
                            width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
                            borderRadius: "0.5rem", padding: "0.7rem 0.75rem", fontSize: "0.85rem",
                            color: "#fff", outline: "none", fontFamily: "inherit", boxSizing: "border-box",
                          }} />
                        </div>
                        <button className="btn-hero-primary" style={{
                          width: "100%", padding: "1.1rem",
                          background: "linear-gradient(135deg, #635BFF, #7A73FF)",
                          color: "#fff", border: "none", borderRadius: "8px",
                          fontSize: "1rem", fontWeight: 800, cursor: "pointer",
                          fontFamily: "inherit",
                          boxShadow: "0 4px 30px rgba(99,91,255,0.4)",
                        }}>
                          Pagar ${subtotal.toLocaleString()}.00 MXN
                        </button>
                        <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.6rem", textAlign: "center", marginTop: "0.5rem" }}>
                          🔒 Pago seguro con encriptación SSL · Sin comisiones
                        </p>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Initial state — no zone selected yet */}
              {!mapCollapsed && !selected && (
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", textAlign: "center", marginTop: "0.5rem" }}>
                  Toca una zona en el mapa para continuar
                </p>
              )}
            </div>
          </div>
        </>
      )}


      {/* ═══ TESTIMONIOS ═══ */}
      <section style={{ padding: "4rem 0", background: "#0a0a0a" }}>
        <div className="container-page">
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <h2 style={{ fontSize: "clamp(1.75rem, 5vw, 2.5rem)", fontWeight: 900, lineHeight: 1.1 }}>
              LO QUE DICEN<br /><span style={{ color: "#E63946" }}>NUESTROS CLIENTES</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem", marginTop: "0.75rem" }}>
              Testimonios reales de personas que han vivido la experiencia Dulos
            </p>
          </div>
          <TestimonialCarousel testimonials={testimonials} active={activeTestimonial} />
        </div>
      </section>

      {/* ═══ PREGUNTAS FRECUENTES ═══ */}
      <section style={{ padding: "4rem 0" }}>
        <div className="container-page">
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <h2 style={{ fontSize: "clamp(1.75rem, 5vw, 2.5rem)", fontWeight: 900, lineHeight: 1.1 }}>
              PREGUNTAS<br /><span style={{ color: "#E63946" }}>FRECUENTES</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem", marginTop: "0.75rem" }}>
              Encuentra respuestas a las dudas más comunes sobre nuestros eventos
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: "700px", margin: "0 auto" }}>
            {[
              { q: "¿Por qué no puedo elegir mi asiento?", a: "Los boletos se venden por zona (Dorada, Blanca, etc.), y los asientos se asignan al momento de tu compra dentro de la zona que seleccionaste." },
              { q: "¿Mis boletos son oficiales?", a: "Sí. Los boletos son válidos y aceptados por el teatro y la producción del evento. Con ellos podrás acceder sin problema a la función." },
              { q: "¿Cómo sabré cuáles son mis asientos?", a: "El número de asiento se asigna directamente en la entrada del teatro al momento de llegar, de acuerdo con la zona de tu boleto." },
              { q: "¿Me sentarán junto a las personas con las que compré?", a: "Si. Al llegar juntos al teatro le asignarán los lugares juntos." },
            ].map((faq, i) => (
              <button
                key={i}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  width: "100%", textAlign: "left",
                  background: "#151515", border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "0.75rem", padding: "1.25rem",
                  cursor: "pointer", color: "#fff", fontFamily: "inherit",
                  transition: "border-color 0.2s",
                  borderColor: openFaq === i ? "rgba(230,57,70,0.4)" : "rgba(255,255,255,0.08)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 700, fontSize: "0.95rem", paddingRight: "1rem" }}>{faq.q}</span>
                  <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "1.25rem", flexShrink: 0, transition: "transform 0.2s", transform: openFaq === i ? "rotate(180deg)" : "rotate(0)" }}>⌄</span>
                </div>
                {openFaq === i && (
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", lineHeight: 1.7, marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    {faq.a}
                  </p>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ OTHER EVENTS ═══ */}
      <section style={{ padding: "4rem 0", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="container-page">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={{ color: "#E63946", fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem", fontWeight: 600 }}>PRÓXIMOS EVENTOS</p>
            <h2 className="ed-section-title" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900 }}>Elige Tu Momento</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {otherEvents.map((ev) => (
              <Link key={ev.name} href={ev.slug} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                <div style={{ borderRadius: "16px", overflow: "hidden", cursor: "pointer", background: "#111", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden" }}>
                    <Image src={ev.image} alt={ev.name} fill style={{ objectFit: "cover", objectPosition: "top center" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, #111 100%)" }} />
                    {ev.original && (
                      <div style={{
                        position: "absolute", top: "0.75rem", left: "0.75rem",
                        background: "rgba(230,57,70,0.9)", backdropFilter: "blur(8px)",
                        color: "#fff", fontSize: "11px", fontWeight: 800,
                        padding: "0.3rem 0.7rem", borderRadius: "4px",
                        letterSpacing: "0.06em", boxShadow: "0 2px 12px rgba(230,57,70,0.4)",
                      }}>
                        AHORRA {Math.round((1 - ev.price / ev.original) * 100)}%
                      </div>
                    )}
                  </div>
                  <div style={{ padding: "1.25rem 1.25rem 1.5rem" }}>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}>{ev.date}</p>
                    <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#fff", marginTop: "0.3rem", lineHeight: 1.2 }}>{ev.name}</h3>
                    <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.875rem", marginTop: "0.3rem" }}>{ev.venue} • {ev.city}</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "1.25rem" }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem" }}>
                        <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.75rem" }}>Desde</span>
                        {ev.original && <span style={{ color: "rgba(255,255,255,0.3)", textDecoration: "line-through", fontSize: "0.8rem" }}>${ev.original}</span>}
                        <span style={{ color: "#E63946", fontSize: "1.5rem", fontWeight: 900 }}>${ev.price.toLocaleString()}</span>
                      </div>
                      <span className="ver-mas" style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", fontWeight: 500 }}>Ver más →</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.04)", padding: "2.5rem 0 5rem" }}>
        <div className="container-page ed-footer">
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
// rebuild 1773534205
