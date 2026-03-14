"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const events = [
  { name: "Así Lo Veo Yo", city: "CDMX", venue: "Nuevo Teatro Libanés", price: 299, original: 600, image: "/event1.jpg", date: "25 Feb — 25 Mar", url: "/asi-lo-veo-yo/nuevo-teatro-libanes-cdmx" },
  { name: "Mijares Sinfónico", city: "Toluca", venue: "Teatro Morelos", price: 1249, image: "/event2.jpg", date: "13 Marzo 2026", url: "/mijares-sinfonico/teatro-morelos-toluca" },
  { name: "Infierno", city: "CDMX", venue: "Teatro Enrique Lizalde", price: 299, image: "/event3.jpg", date: "6 Marzo 2026", url: "/infierno/teatro-enrique-lizalde-cdmx" },
  { name: "¡Oh Karen!", city: "CDMX", venue: "Teatro Xola", price: 199, image: "/event4.png", date: "25 Marzo 2026", url: "/oh-karen/teatro-xola-cdmx" },
  { name: "Lucero", city: "Puebla", venue: "Auditorio Explanada", price: 1499, image: "/event5.png", date: "28 Marzo 2026", url: "/lucero/auditorio-explanada-puebla" },
];

function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
      style={{ width: "100%" }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main style={{ background: "#050505", color: "#fff", overflowX: "hidden" }}>

      {/* ═══ NAVBAR ═══ */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          background: "rgba(5,5,5,0.6)", backdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
          display: "flex", justifyContent: "center"
        }}
      >
        <div className="container-page" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "1.25rem", paddingBottom: "1.25rem" }}>
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} style={{ cursor: "pointer" }}>
            <Image src="/dulos-logo.svg" alt="Dulos" width={110} height={36} />
          </a>
          <a href="#eventos" className="nav-link" style={{ fontSize: "13px", color: "#E63946", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", transition: "color 0.3s", whiteSpace: "nowrap", fontWeight: 600 }}>
            Ver Eventos
          </a>
        </div>
      </motion.nav>

      {/* ═══ HERO ═══ */}
      <section ref={heroRef} style={{ position: "relative", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <motion.div style={{ y: heroY, position: "absolute", inset: 0 }}>
          <Image src="/hero.jpg" alt="Hero" fill style={{ objectFit: "cover" }} priority />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(5,5,5,0.5), rgba(5,5,5,0.2), #050505)" }} />
        </motion.div>
        <motion.div style={{ opacity: heroOpacity, position: "relative", zIndex: 10, textAlign: "center", width: "100%", maxWidth: "900px", margin: "0 auto", padding: "0 1.5rem" }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            style={{ color: "#E63946", fontSize: "13px", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1.5rem" }}
          >
            Tu acceso directo al entretenimiento
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
            style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)", fontWeight: 900, lineHeight: 0.9, letterSpacing: "-0.02em" }}
          >
            MOMENTOS<br />
            <span style={{ background: "linear-gradient(to right, #E63946, #ff6b6b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>INOLVIDABLES</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            style={{ color: "rgba(255,255,255,0.4)", fontSize: "1.1rem", marginTop: "2rem", lineHeight: 1.7 }}
          >
            Música, teatro y entretenimiento.<br />Sin las comisiones de siempre.
          </motion.p>

          {/* Two CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "2.5rem", maxWidth: "420px", marginLeft: "auto", marginRight: "auto" }}
          >
            <a
              href="#eventos"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "#E63946", color: "#fff",
                fontSize: "14px", fontWeight: 700,
                padding: "1rem 2.5rem", borderRadius: "9999px",
                textDecoration: "none", transition: "all 0.3s",
                letterSpacing: "0.15em", textTransform: "uppercase",
                width: "100%",
              }}
            >
              VER EVENTOS
            </a>
            <a
              href="#"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "transparent", color: "#fff",
                fontSize: "14px", fontWeight: 700,
                padding: "1rem 2.5rem", borderRadius: "9999px",
                textDecoration: "none", transition: "all 0.3s",
                letterSpacing: "0.15em", textTransform: "uppercase",
                border: "2px solid rgba(255,255,255,0.8)",
                width: "100%",
              }}
            >
              PERDÍ MIS BOLETOS
            </a>
          </motion.div>
        </motion.div>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", bottom: "3rem", left: "50%", transform: "translateX(-50%)", width: "1px", height: "4rem", background: "linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)" }}
        />
      </section>

      {/* ═══ EVENTS GRID ═══ */}
      <section id="eventos" className="section-centered" style={{ padding: "5rem 0 6rem" }}>
        <div className="container-page">
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <p style={{ color: "#E63946", fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem" }}>Próximos Eventos</p>
              <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900 }}>Elige Tu Momento</h2>
            </div>
          </FadeIn>

          <div className="grid-events">
            {events.map((event, i) => (
              <FadeIn key={event.name} delay={i * 0.08}>
                <Link href={event.url} className="event-card-link" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.4 }}
                    style={{ borderRadius: "1rem", overflow: "hidden", cursor: "pointer", background: "#0a0a0a" }}
                  >
                    <div className="event-card-image" style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", background: "#050505" }}>
                      <Image src={event.image} alt={event.name} fill style={{ objectFit: "cover", objectPosition: "center", transition: "transform 0.7s" }} />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #0a0a0a, transparent, transparent)" }} />
                      {event.original && (
                        <div style={{ position: "absolute", top: "1rem", right: "1rem", background: "#E63946", color: "#fff", fontSize: "10px", fontWeight: 700, padding: "0.375rem 0.75rem", borderRadius: "9999px", letterSpacing: "0.1em" }}>
                          -{Math.round((1 - event.price / event.original) * 100)}% OFF
                        </div>
                      )}
                    </div>
                    <div className="event-card-text" style={{ padding: "1.5rem", marginTop: "-5rem", position: "relative", zIndex: 10 }}>
                      <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}>{event.date}</p>
                      <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff", marginTop: "0.5rem" }}>{event.name}</h3>
                      <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.875rem", marginTop: "0.25rem" }}>{event.venue} • {event.city}</p>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "1.25rem" }}>
                        <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
                          {event.original && <span style={{ color: "rgba(255,255,255,0.2)", textDecoration: "line-through", fontSize: "0.875rem" }}>${event.original}</span>}
                          <span style={{ color: "#E63946", fontSize: "1.5rem", fontWeight: 900 }}>${event.price.toLocaleString()}</span>
                        </div>
                        <span className="ver-mas" style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px", transition: "color 0.3s" }}>Ver más →</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.04)", padding: "2.5rem 0" }}>
        <div className="container-page hp-footer" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} style={{ cursor: "pointer" }}>
            <Image src="/dulos-logo.svg" alt="Dulos" width={80} height={26} style={{ opacity: 0.4 }} />
          </a>
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
