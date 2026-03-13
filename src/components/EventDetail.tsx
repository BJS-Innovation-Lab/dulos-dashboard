"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const allEvents = [
  { name: "Así Lo Veo Yo", city: "CDMX", venue: "Nuevo Teatro Libanés", price: 299, original: 600, image: "/event1.jpg", date: "25 Feb — 25 Mar", slug: "/asi-lo-veo-yo/nuevo-teatro-libanes-cdmx" },
  { name: "Mijares Sinfónico", city: "Toluca", venue: "Teatro Morelos", price: 1249, original: 2500, image: "/event2.jpg", date: "13 Marzo 2026", slug: "/mijares-sinfonico/teatro-morelos-toluca" },
  { name: "Infierno", city: "CDMX", venue: "Teatro Enrique Lizalde", price: 299, image: "/event3.jpg", date: "6 Marzo 2026", slug: "/infierno/teatro-enrique-lizalde-cdmx" },
  { name: "¡Oh Karen!", city: "CDMX", venue: "Teatro Xola", price: 199, image: "/event4.png", date: "25 Marzo 2026", slug: "/oh-karen/teatro-xola-cdmx" },
  { name: "Lucero", city: "Puebla", venue: "Auditorio Explanada", price: 1499, original: 2700, image: "/event5.png", date: "28 Marzo 2026", slug: "/lucero/auditorio-explanada-puebla" },
];

interface Zone {
  name: string;
  color: string;
  price: number;
  seats: number;
}

const eventZones: Record<string, Zone[]> = {
  "Así Lo Veo Yo": [
    { name: "VIP", color: "#E63946", price: 599, seats: 42 },
    { name: "Preferente", color: "#E88D2A", price: 449, seats: 86 },
    { name: "General", color: "#2A7AE8", price: 299, seats: 214 },
    { name: "Balcón", color: "#2ECC71", price: 199, seats: 120 },
  ],
  "Mijares Sinfónico": [
    { name: "VIP", color: "#E63946", price: 2499, seats: 30 },
    { name: "Preferente", color: "#E88D2A", price: 1749, seats: 64 },
    { name: "General", color: "#2A7AE8", price: 1249, seats: 180 },
    { name: "Balcón", color: "#2ECC71", price: 899, seats: 95 },
  ],
  "Infierno": [
    { name: "VIP", color: "#E63946", price: 499, seats: 38 },
    { name: "Preferente", color: "#E88D2A", price: 399, seats: 72 },
    { name: "General", color: "#2A7AE8", price: 299, seats: 200 },
  ],
  "¡Oh Karen!": [
    { name: "VIP", color: "#E63946", price: 349, seats: 50 },
    { name: "General", color: "#2A7AE8", price: 199, seats: 160 },
  ],
  "Lucero": [
    { name: "VIP", color: "#E63946", price: 2999, seats: 24 },
    { name: "Preferente", color: "#E88D2A", price: 1999, seats: 56 },
    { name: "General", color: "#2A7AE8", price: 1499, seats: 150 },
    { name: "Balcón", color: "#2ECC71", price: 999, seats: 80 },
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

export default function EventDetailPage({ event }: { event: EventData }) {
  const otherEvents = allEvents.filter((e) => e.slug !== event.slug);
  const zones = eventZones[event.name] || eventZones["Así Lo Veo Yo"];
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showCheckout, setShowCheckout] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const [discountCode, setDiscountCode] = useState("");
  const [countryCode, setCountryCode] = useState("+52");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const checkoutRef = useRef<HTMLDivElement>(null);

  const selected = zones.find((z) => z.name === selectedZone);
  const subtotal = selected ? selected.price * quantity : 0;

  // Countdown timer
  useEffect(() => {
    if (!showCheckout) return;
    setTimeLeft(15 * 60);
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

  const formatTime = useCallback((seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }, []);

  const handleBuyClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("comprar");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handlePagarClick = () => {
    setShowCheckout(true);
    setTimeout(() => {
      checkoutRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
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
          padding: "0.85rem 0",
          textAlign: "center",
          fontSize: "1rem",
          fontWeight: 700,
          color: "#fff",
          letterSpacing: "0.03em",
          textShadow: "0 1px 2px rgba(0,0,0,0.2)",
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
      <section className="container-page" style={{ paddingTop: "3rem", paddingBottom: "5rem" }}>
        <div className="ed-hero-grid">
          {/* Left — Info */}
          <div>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1rem" }}>
              {event.venue}
            </p>
            <h1 className="ed-hero-title" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 900, lineHeight: 1.05, marginBottom: "1.75rem" }}>
              {event.name}
            </h1>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "1.05rem", lineHeight: 1.9, marginBottom: "2.5rem", maxWidth: "540px" }}>
              {event.description}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "14px" }}>📅</span>
              <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.95rem" }}>{event.dates}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2.5rem" }}>
              <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "14px" }}>📍</span>
              <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.95rem" }}>{event.venue}</span>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "2.5rem" }}>
              {event.original && (
                <span style={{ color: "rgba(255,255,255,0.2)", textDecoration: "line-through", fontSize: "1.1rem" }}>
                  ${event.original.toLocaleString()}
                </span>
              )}
              <span style={{ color: "#E63946", fontSize: "2.5rem", fontWeight: 900 }}>
                ${event.price.toLocaleString()}
              </span>
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.9rem" }}>MXN</span>
            </div>
            <a
              href="#comprar"
              onClick={handleBuyClick}
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
          <div className="ed-hero-poster" style={{ position: "relative", aspectRatio: "3/4", borderRadius: "1rem", overflow: "hidden", background: "#111", boxShadow: "0 24px 80px rgba(0,0,0,0.5)" }}>
            <Image src={event.image} alt={event.name} fill style={{ objectFit: "cover" }} priority />
          </div>
        </div>
      </section>

      {/* ═══ TICKET PURCHASE / ZONE SELECTION ═══ */}
      <section id="comprar" style={{ padding: "5rem 0", borderTop: "1px solid rgba(255,255,255,0.06)", background: "#080808" }}>
        <div className="container-page">
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <p style={{ color: "#E63946", fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem" }}>Selecciona tu zona</p>
            <h2 className="ed-section-title" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900 }}>Comprar Boletos</h2>
          </div>

          <div className="ed-zone-grid">
            {/* Left — Venue Map */}
            <div style={{
              background: "#111",
              borderRadius: "1.25rem",
              padding: "2.5rem",
              border: "1px solid rgba(255,255,255,0.06)",
            }}>
              {/* Stage */}
              <div style={{
                background: "linear-gradient(135deg, #1a1a1a, #222)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "0.5rem 0.5rem 2rem 2rem",
                padding: "1rem",
                textAlign: "center",
                marginBottom: "2rem",
                position: "relative",
              }}>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 600 }}>
                  🎤 Escenario
                </span>
                <div style={{
                  position: "absolute",
                  bottom: "-8px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "60%",
                  height: "4px",
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                  borderRadius: "2px",
                }} />
              </div>

              {/* Zones */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {zones.map((zone) => {
                  const isSelected = selectedZone === zone.name;
                  return (
                    <button
                      key={zone.name}
                      onClick={() => {
                        setSelectedZone(zone.name);
                        setQuantity(1);
                        setShowCheckout(false);
                      }}
                      className="zone-btn"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        padding: "1.25rem 1.5rem",
                        background: isSelected
                          ? `linear-gradient(135deg, ${zone.color}22, ${zone.color}11)`
                          : "rgba(255,255,255,0.02)",
                        border: isSelected
                          ? `2px solid ${zone.color}`
                          : "1px solid rgba(255,255,255,0.06)",
                        borderRadius: "0.75rem",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        position: "relative",
                        overflow: "hidden",
                        color: "#fff",
                        fontFamily: "inherit",
                        boxShadow: isSelected
                          ? `0 0 30px ${zone.color}33, inset 0 0 30px ${zone.color}11`
                          : "none",
                      }}
                    >
                      {/* Color indicator bar */}
                      <div style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: isSelected ? "6px" : "4px",
                        background: zone.color,
                        borderRadius: "4px 0 0 4px",
                        transition: "width 0.3s ease",
                      }} />

                      <div style={{ display: "flex", alignItems: "center", gap: "1rem", paddingLeft: "0.75rem" }}>
                        <div style={{
                          width: "12px",
                          height: "12px",
                          borderRadius: "50%",
                          background: zone.color,
                          boxShadow: isSelected ? `0 0 12px ${zone.color}` : "none",
                          transition: "box-shadow 0.3s ease",
                        }} />
                        <div style={{ textAlign: "left" }}>
                          <div style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "0.15rem" }}>{zone.name}</div>
                          <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.8rem" }}>
                            {zone.seats} lugares disponibles
                          </div>
                        </div>
                      </div>

                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontWeight: 900, fontSize: "1.25rem", color: isSelected ? zone.color : "#fff" }}>
                          ${zone.price.toLocaleString()}
                        </div>
                        <div style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.75rem" }}>MXN</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="ed-zone-legend" style={{
                marginTop: "1.5rem",
                padding: "1rem",
                borderTop: "1px solid rgba(255,255,255,0.04)",
              }}>
                {zones.map((zone) => (
                  <div key={zone.name} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: zone.color }} />
                    <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.75rem" }}>{zone.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Order Summary */}
            <div className="ed-order-sticky" style={{
              background: "#111",
              borderRadius: "1.25rem",
              padding: "2rem",
              border: "1px solid rgba(255,255,255,0.06)",
            }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                Resumen de Orden
              </h3>

              {/* Event info */}
              <div style={{ marginBottom: "1.5rem" }}>
                <p style={{ fontWeight: 600, fontSize: "1rem", marginBottom: "0.25rem" }}>{event.name}</p>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}>{event.venue}</p>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.8rem", marginTop: "0.15rem" }}>{event.dates}</p>
              </div>

              {/* Selected zone */}
              <div style={{
                background: "rgba(255,255,255,0.03)",
                borderRadius: "0.75rem",
                padding: "1.25rem",
                marginBottom: "1.25rem",
                border: "1px solid rgba(255,255,255,0.04)",
              }}>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                  Zona
                </p>
                {selected ? (
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: selected.color }} />
                    <span style={{ fontWeight: 600 }}>{selected.name}</span>
                    <span style={{ color: "rgba(255,255,255,0.3)", marginLeft: "auto", fontSize: "0.9rem" }}>
                      ${selected.price.toLocaleString()} c/u
                    </span>
                  </div>
                ) : (
                  <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.9rem" }}>Selecciona una zona del mapa</p>
                )}
              </div>

              {/* Quantity */}
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1.5rem",
              }}>
                <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}>Cantidad</span>
                <div style={{ display: "flex", alignItems: "center", gap: "0" }}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={!selected}
                    style={{
                      width: "36px",
                      height: "36px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "0.5rem 0 0 0.5rem",
                      color: selected ? "#fff" : "rgba(255,255,255,0.15)",
                      cursor: selected ? "pointer" : "not-allowed",
                      fontSize: "1.1rem",
                      fontFamily: "inherit",
                      transition: "background 0.2s ease",
                    }}
                  >
                    −
                  </button>
                  <div style={{
                    width: "48px",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(255,255,255,0.04)",
                    borderTop: "1px solid rgba(255,255,255,0.08)",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: selected ? "#fff" : "rgba(255,255,255,0.15)",
                  }}>
                    {quantity}
                  </div>
                  <button
                    onClick={() => setQuantity(Math.min(selected ? selected.seats : 10, quantity + 1))}
                    disabled={!selected}
                    style={{
                      width: "36px",
                      height: "36px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "0 0.5rem 0.5rem 0",
                      color: selected ? "#fff" : "rgba(255,255,255,0.15)",
                      cursor: selected ? "pointer" : "not-allowed",
                      fontSize: "1.1rem",
                      fontFamily: "inherit",
                      transition: "background 0.2s ease",
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", marginBottom: "1.25rem" }} />

              {/* Subtotal */}
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}>Subtotal</span>
                <span style={{ fontSize: "0.95rem" }}>${subtotal.toLocaleString()}.00</span>
              </div>

              {/* No fees badge */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "rgba(46,204,113,0.08)",
                border: "1px solid rgba(46,204,113,0.15)",
                borderRadius: "0.5rem",
                padding: "0.6rem 0.75rem",
                marginBottom: "1.25rem",
              }}>
                <span style={{ fontSize: "14px" }}>✓</span>
                <span style={{ color: "#2ECC71", fontSize: "0.85rem", fontWeight: 600 }}>¡Sin comisiones!</span>
              </div>

              {/* Total */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: "1.5rem",
                paddingTop: "1rem",
                borderTop: "1px solid rgba(255,255,255,0.06)",
              }}>
                <span style={{ fontWeight: 600, fontSize: "1rem" }}>Total</span>
                <span style={{ fontWeight: 900, fontSize: "1.5rem", color: "#E63946" }}>
                  ${subtotal.toLocaleString()}.00
                </span>
              </div>

              {/* Pay button */}
              <button
                disabled={!selected}
                onClick={handlePagarClick}
                style={{
                  width: "100%",
                  padding: "1rem",
                  background: selected ? "#E63946" : "rgba(255,255,255,0.06)",
                  color: selected ? "#fff" : "rgba(255,255,255,0.2)",
                  border: "none",
                  borderRadius: "9999px",
                  fontSize: "1rem",
                  fontWeight: 700,
                  cursor: selected ? "pointer" : "not-allowed",
                  transition: "all 0.3s ease",
                  fontFamily: "inherit",
                  letterSpacing: "0.02em",
                  boxShadow: selected ? "0 4px 24px rgba(230,57,70,0.3)" : "none",
                }}
              >
                {selected ? `Pagar $${subtotal.toLocaleString()}.00` : "Selecciona una zona"}
              </button>

              {/* Security note */}
              <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.75rem", textAlign: "center", marginTop: "1rem" }}>
                🔒 Pago seguro · Boletos digitales al instante
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CHECKOUT FLOW ═══ */}
      {showCheckout && selected && (
        <section ref={checkoutRef} style={{ padding: "0 0 5rem 0", background: "#080808" }}>
          {/* Reservation Timer Banner */}
          <div style={{
            background: "linear-gradient(135deg, #8B0000, #E63946, #8B0000)",
            padding: "1rem 0",
            textAlign: "center",
            marginBottom: "3rem",
          }}>
            <div className="container-page" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem" }}>
              <span style={{ fontSize: "1.1rem" }}>⏱️</span>
              <span style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", letterSpacing: "0.02em" }}>
                Tu reserva expira en:{" "}
                <span style={{ fontFamily: "monospace", fontSize: "1.15rem", letterSpacing: "0.1em" }}>
                  {formatTime(timeLeft)}
                </span>
                {" "}min
              </span>
            </div>
          </div>

          <div className="container-page">
            {/* Checkout Header */}
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 900, marginBottom: "0.75rem" }}>
                ¡Estás a un paso de tus boletos!
              </h2>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1.05rem" }}>
                Solo necesitamos unos datos para procesar tu compra.
              </p>
            </div>

            <div className="ed-checkout-grid">
              {/* Left — Contact Form */}
              <div style={{
                background: "#111",
                borderRadius: "1.25rem",
                padding: "2.5rem",
                border: "1px solid rgba(255,255,255,0.06)",
              }}>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem" }}>Datos de contacto</h3>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.85rem", marginBottom: "2rem" }}>
                  Te enviaremos tus boletos digitales a este correo.
                </p>

                {/* Phone */}
                <div style={{ marginBottom: "1.25rem" }}>
                  <label style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", marginBottom: "0.5rem", letterSpacing: "0.05em" }}>
                    📱 Teléfono
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: "0.75rem" }}>
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      style={{
                        ...inputStyle,
                        cursor: "pointer",
                        appearance: "none",
                        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 0.75rem center",
                        paddingRight: "2rem",
                      }}
                    >
                      <option value="+52">🇲🇽 +52</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+34">🇪🇸 +34</option>
                      <option value="+57">🇨🇴 +57</option>
                      <option value="+54">🇦🇷 +54</option>
                    </select>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="55 1234 5678"
                      style={inputStyle}
                    />
                  </div>
                </div>

                {/* Name row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.25rem" }}>
                  <div>
                    <label style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", marginBottom: "0.5rem", letterSpacing: "0.05em" }}>
                      Nombre
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Tu nombre"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", marginBottom: "0.5rem", letterSpacing: "0.05em" }}>
                      Apellido
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Tu apellido"
                      style={inputStyle}
                    />
                  </div>
                </div>

                {/* Email */}
                <div style={{ marginBottom: "2rem" }}>
                  <label style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", marginBottom: "0.5rem", letterSpacing: "0.05em" }}>
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@correo.com"
                    style={inputStyle}
                  />
                </div>

                {/* Submit */}
                <button
                  style={{
                    width: "100%",
                    padding: "1.1rem",
                    background: "#E63946",
                    color: "#fff",
                    border: "none",
                    borderRadius: "9999px",
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    letterSpacing: "0.02em",
                    boxShadow: "0 4px 24px rgba(230,57,70,0.3)",
                    transition: "all 0.3s ease",
                  }}
                >
                  Continuar al pago
                </button>
              </div>

              {/* Right — Order Summary (Checkout) */}
              <div className="ed-order-sticky" style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}>
                {/* Summary Card */}
                <div style={{
                  background: "#111",
                  borderRadius: "1.25rem",
                  padding: "2rem",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    Resumen de tu pedido
                  </h3>

                  {/* Reserved badge */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    background: "rgba(46,204,113,0.1)",
                    border: "1px solid rgba(46,204,113,0.2)",
                    borderRadius: "0.5rem",
                    padding: "0.75rem 1rem",
                    marginBottom: "1.5rem",
                  }}>
                    <span style={{ fontSize: "14px" }}>✅</span>
                    <span style={{ color: "#2ECC71", fontSize: "0.85rem", fontWeight: 600 }}>Boletos reservados temporalmente</span>
                  </div>

                  {/* Event details */}
                  <div style={{ marginBottom: "1.25rem" }}>
                    <p style={{ fontWeight: 700, fontSize: "1.05rem", marginBottom: "0.3rem" }}>{event.name}</p>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}>{event.venue}</p>
                  </div>

                  {/* Details grid */}
                  <div style={{
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: "0.75rem",
                    padding: "1.25rem",
                    marginBottom: "1.5rem",
                    border: "1px solid rgba(255,255,255,0.04)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}>Zona</span>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: selected.color }} />
                        <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>{selected.name}</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}>Fecha</span>
                      <span style={{ fontSize: "0.9rem" }}>{event.dates}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}>Cantidad</span>
                      <span style={{ fontSize: "0.9rem" }}>{quantity} boleto{quantity > 1 ? "s" : ""}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}>Precio unitario</span>
                      <span style={{ fontSize: "0.9rem" }}>${selected.price.toLocaleString()}.00</span>
                    </div>
                  </div>

                  {/* Discount code */}
                  <div style={{ marginBottom: "1.5rem" }}>
                    <label style={{ display: "block", color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", marginBottom: "0.5rem" }}>
                      Código de descuento
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "0.5rem" }}>
                      <input
                        type="text"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                        placeholder="Ingresa tu código"
                        style={{ ...inputStyle, fontSize: "0.9rem" }}
                      />
                      <button style={{
                        padding: "0.9rem 1.25rem",
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "0.5rem",
                        color: "#fff",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        fontFamily: "inherit",
                        transition: "background 0.2s ease",
                        whiteSpace: "nowrap",
                      }}>
                        Aplicar
                      </button>
                    </div>
                  </div>

                  {/* Divider */}
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", marginBottom: "1rem" }} />

                  {/* Subtotal */}
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                    <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}>Subtotal</span>
                    <span style={{ fontSize: "0.95rem" }}>${subtotal.toLocaleString()}.00</span>
                  </div>

                  {/* Total */}
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    paddingTop: "1rem",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                  }}>
                    <span style={{ fontWeight: 700, fontSize: "1.1rem" }}>Total</span>
                    <span style={{ fontWeight: 900, fontSize: "1.75rem", color: "#E63946" }}>
                      ${subtotal.toLocaleString()}.00
                    </span>
                  </div>
                </div>

                {/* SSL Note */}
                <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.75rem", textAlign: "center" }}>
                  🔒 Tu información está protegida con encriptación SSL
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══ OTHER EVENTS ═══ */}
      <section style={{ padding: "5rem 0", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="container-page">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p style={{ color: "#E63946", fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem" }}>Próximos Eventos</p>
            <h2 className="ed-section-title" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900 }}>Elige Tu Momento</h2>
          </div>
          <div className="ed-events-grid">
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
