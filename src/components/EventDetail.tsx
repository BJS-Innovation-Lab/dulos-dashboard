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
    { name: "Lila", color: "#E63946", price: 2699, seats: 40 },
    { name: "Blanca", color: "#E63946", price: 1999, seats: 80 },
    { name: "Dorada", color: "#E63946", price: 1499, seats: 120 },
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

export default function EventDetailPage({ event }: { event: EventData }) {
  const otherEvents = allEvents.filter((e) => e.slug !== event.slug);
  const zones = eventZones[event.name] || eventZones["Así Lo Veo Yo"];
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showCheckout, setShowCheckout] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
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

  const handlePagarClick = () => {
    // Will proceed to checkout form
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

      {/* ═══ ACERCA DE ═══ */}
      <section className="container-page" style={{ paddingTop: "3rem", paddingBottom: "3rem" }}>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "1.25rem", fontWeight: 600 }}>
          ACERCA DE
        </p>

        <h1 className="ed-hero-title" style={{
          fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: "1.75rem",
          textDecoration: "underline", textDecorationColor: "#E63946", textUnderlineOffset: "6px", textDecorationThickness: "3px",
        }}>
          {event.name}
        </h1>

        {/* Quote */}
        {event.quote && (
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "1.75rem", fontStyle: "italic" }}>
            &ldquo;{event.quote}&rdquo;
          </p>
        )}

        {/* Description */}
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1rem", lineHeight: 1.85, marginBottom: "1.5rem" }}>
          {event.description}
        </p>

        {/* Long description */}
        {event.longDescription && (
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem", lineHeight: 1.85 }}>
            {event.longDescription.split("\n\n").map((p, i) => (
              <p key={i} style={{ marginBottom: "1.25rem" }}>{p}</p>
            ))}
          </div>
        )}
      </section>

      {/* ═══ POSTER ═══ */}
      <section className="container-page" style={{ paddingBottom: "3rem" }}>
        <div style={{ position: "relative", width: "100%", borderRadius: "1rem", overflow: "hidden", background: "#111" }}>
          <div className="ed-hero-poster-container" style={{ position: "relative", width: "100%", aspectRatio: "3/4", maxHeight: "600px" }}>
            <Image src={event.image} alt={event.name} fill style={{ objectFit: "cover", objectPosition: "center" }} priority />
          </div>
        </div>
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
            onClick={() => { setShowCheckout(false); setSelectedZone(null); }}
            style={{
              position: "fixed", inset: 0, zIndex: 60,
              background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
            }}
          />
          {/* Drawer */}
          <div style={{
            position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 70,
            background: "#0a0a0a", borderRadius: "1.25rem 1.25rem 0 0",
            maxHeight: "85vh", overflowY: "auto",
            boxShadow: "0 -20px 60px rgba(0,0,0,0.8)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderBottom: "none",
          }}>
            {/* Header */}
            <div style={{
              position: "sticky", top: 0, zIndex: 5,
              background: "#0a0a0a", padding: "1.25rem 1.5rem 1rem",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
                <div style={{ width: "36px", height: "4px", borderRadius: "2px", background: "rgba(255,255,255,0.2)" }} />
              </div>
              <button onClick={() => { setShowCheckout(false); setSelectedZone(null); }} style={{
                position: "absolute", top: "1.25rem", right: "1.25rem",
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                color: "#fff", width: "32px", height: "32px", borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", fontSize: "0.9rem",
              }}>✕</button>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 800, textAlign: "center" }}>
                Boletos disponibles
              </h2>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", textAlign: "center", marginTop: "0.25rem" }}>
                Selecciona fecha, horario y tipo de boleto
              </p>
            </div>

            <div style={{ padding: "1.5rem" }}>
              {/* Venue Map — matches dulos.io layout */}
              <div style={{ marginBottom: "1.5rem" }}>
                <svg viewBox="0 0 300 340" style={{ width: "100%", height: "auto", background: "#888", borderRadius: "8px" }}>
                  {/* Upper section — dark unavailable rows, tighter spacing */}
                  {[0, 1, 2].map((i) => (
                    <rect key={`upper-${i}`} x="45" y={10 + i * 42} width="210" height="32" rx="2"
                      fill="#333" stroke="#555" strokeWidth="1" />
                  ))}

                  {/* Small dark row between upper and zones */}
                  <rect x="70" y="136" width="160" height="16" rx="2" fill="#333" stroke="#555" strokeWidth="1" />

                  {/* Clickable zones — notched trapezoid shapes */}
                  {zones.map((zone, i) => {
                    const isSelected = selectedZone === zone.name;
                    const yBase = 162 + i * 46;
                    const shrink = i * 10;
                    // Notched edges like dulos.io
                    return (
                      <g key={zone.name} onClick={() => { setSelectedZone(zone.name); setQuantity(1); }} style={{ cursor: "pointer" }}>
                        <path
                          d={`M${40 + shrink},${yBase}
                              L${55 + shrink},${yBase}
                              L${58 + shrink},${yBase + 5}
                              L${242 - shrink},${yBase + 5}
                              L${245 - shrink},${yBase}
                              L${260 - shrink},${yBase}
                              L${252 - shrink},${yBase + 38}
                              L${48 + shrink},${yBase + 38} Z`}
                          fill={isSelected ? "#c0101e" : "#E63946"}
                          stroke="#fff" strokeWidth="2.5"
                          style={{
                            transition: "all 0.15s",
                            filter: isSelected ? "brightness(0.8) drop-shadow(0 0 8px rgba(0,0,0,0.5))" : "none",
                          }}
                        />
                        <text x="150" y={yBase + 27} textAnchor="middle" fill="#fff"
                          style={{ fontSize: "16px", fontWeight: 900, letterSpacing: "0.08em", pointerEvents: "none" }}>
                          {zone.name.toUpperCase()}
                        </text>
                      </g>
                    );
                  })}

                  {/* Small dark notch below last zone */}
                  <path d="M100,300 L110,300 L113,305 L187,305 L190,300 L200,300 L195,315 L105,315 Z"
                    fill="#333" stroke="#555" strokeWidth="1" />

                  {/* Escenario */}
                  <rect x="90" y="322" width="120" height="22" rx="3" fill="#E63946" />
                  <text x="150" y="337" textAnchor="middle" fill="#fff"
                    style={{ fontSize: "10px", fontWeight: 900, letterSpacing: "0.15em" }}>
                    ESCENARIO
                  </text>
                </svg>
              </div>

              {/* Selected zone info + price */}
              {selected && (
                <div style={{
                  padding: "1rem 1.25rem", marginBottom: "1rem",
                  background: "rgba(230,57,70,0.1)", border: "2px solid rgba(230,57,70,0.3)",
                  borderRadius: "0.75rem",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                    <span style={{ fontSize: "1rem", fontWeight: 700 }}>Zona {selected.name}</span>
                    <span style={{ fontSize: "1.25rem", fontWeight: 900, color: "#E63946" }}>${selected.price.toLocaleString()} MXN</span>
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}>{selected.seats} lugares disponibles</p>
                </div>
              )}

              {/* Quantity + Total */}
              {selected && (
                <div style={{ marginBottom: "1rem", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                    <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}>Cantidad</span>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{
                        width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center",
                        background: "rgba(255,255,255,0.06)", border: "2px solid rgba(255,255,255,0.1)",
                        borderRadius: "0.5rem 0 0 0.5rem", color: "#fff", cursor: "pointer", fontSize: "1.2rem", fontFamily: "inherit",
                      }}>−</button>
                      <div style={{
                        width: "56px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center",
                        background: "rgba(255,255,255,0.04)", borderTop: "2px solid rgba(255,255,255,0.1)",
                        borderBottom: "2px solid rgba(255,255,255,0.1)", fontWeight: 800, fontSize: "1.1rem",
                      }}>{quantity}</div>
                      <button onClick={() => setQuantity(Math.min(selected.seats, quantity + 1))} style={{
                        width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center",
                        background: "rgba(255,255,255,0.06)", border: "2px solid rgba(255,255,255,0.1)",
                        borderRadius: "0 0.5rem 0.5rem 0", color: "#fff", cursor: "pointer", fontSize: "1.2rem", fontFamily: "inherit",
                      }}>+</button>
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontWeight: 700, fontSize: "1.05rem" }}>Total</span>
                    <span style={{ fontWeight: 900, fontSize: "1.75rem", color: "#E63946" }}>${subtotal.toLocaleString()}.00</span>
                  </div>
                </div>
              )}

              {/* Pay button */}
              <button
                disabled={!selected}
                onClick={handlePagarClick}
                className={selected ? "btn-hero-primary" : ""}
                style={{
                  width: "100%", padding: "1.1rem",
                  background: selected ? "#E63946" : "rgba(255,255,255,0.06)",
                  color: selected ? "#fff" : "rgba(255,255,255,0.2)",
                  border: "none", borderRadius: "8px",
                  fontSize: "1.05rem", fontWeight: 800,
                  cursor: selected ? "pointer" : "not-allowed",
                  fontFamily: "inherit", letterSpacing: "0.02em",
                  boxShadow: selected ? "0 4px 30px rgba(230,57,70,0.4)" : "none",
                  marginTop: "0.5rem",
                }}
              >
                {selected ? `Pagar $${subtotal.toLocaleString()}.00 MXN` : "Selecciona una zona"}
              </button>

              <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.7rem", textAlign: "center", marginTop: "0.75rem" }}>
                🔒 Pago seguro · Sin comisiones · Boletos al instante
              </p>
            </div>
          </div>
        </>
      )}

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
          <div style={{ display: "flex", gap: "1rem", overflowX: "auto", paddingBottom: "1rem", scrollSnapType: "x mandatory" }}>
            {[
              { text: "Compré boletos para mi mamá porque es muy fan de Lucero. Nos hizo felices. Canta increíble y estuvo muy bonito, todos salimos contentos.", name: "María G.", rating: 5 },
              { text: "Lucero en vivo es otro nivel. Voz impecable, conexión con el público y un show lleno de recuerdos.", name: "Luis Fernando", rating: 5 },
              { text: "Primera vez usando Dulos y la experiencia fue increíble. Sin comisiones extras, todo transparente.", name: "Ana Sofía", rating: 5 },
            ].map((t, i) => (
              <div key={i} style={{
                minWidth: "280px", flex: "0 0 280px", scrollSnapAlign: "start",
                background: "#151515", borderRadius: "1rem", padding: "1.5rem",
                border: "1px solid rgba(255,255,255,0.06)",
              }}>
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                  {t.text}
                </p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", fontStyle: "italic" }}>{t.name}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <span key={j} style={{ color: "#E63946", fontSize: "14px" }}>★</span>
                    ))}
                    <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", marginLeft: "0.25rem", background: "rgba(255,255,255,0.08)", padding: "0.15rem 0.4rem", borderRadius: "4px" }}>{t.rating}/5</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
