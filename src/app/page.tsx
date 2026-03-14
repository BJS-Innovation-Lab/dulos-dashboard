"use client";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

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
  const [menuOpen, setMenuOpen] = useState(false);

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
          {/* Desktop nav links */}
          <div className="hp-nav-links" style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
            <a href="#eventos" style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", textDecoration: "none", letterSpacing: "0.12em", textTransform: "uppercase", transition: "color 0.3s", fontWeight: 500 }}>Ver Eventos</a>
            <a href="#ayuda" style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", textDecoration: "none", letterSpacing: "0.12em", textTransform: "uppercase", transition: "color 0.3s", fontWeight: 500 }}>Ayuda</a>
            <Link href="/perdi-mi-boleto" style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", textDecoration: "none", letterSpacing: "0.12em", textTransform: "uppercase", transition: "color 0.3s", fontWeight: 500 }}>Mis Boletos</Link>
            <a href="#nosotros" style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", textDecoration: "none", letterSpacing: "0.12em", textTransform: "uppercase", transition: "color 0.3s", fontWeight: 500 }}>Nosotros</a>
          </div>
          {/* Hamburger (mobile) */}
          <button
            className="ed-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            style={{ display: "none", background: "none", border: "none", color: "rgba(255,255,255,0.7)", fontSize: "1.5rem", cursor: "pointer", padding: "0.25rem" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* ═══ MOBILE MENU ═══ */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed", top: 0, right: 0, bottom: 0, width: "280px", zIndex: 100,
              background: "rgba(5,5,5,0.95)", backdropFilter: "blur(24px)",
              padding: "5rem 2rem 2rem",
              display: "flex", flexDirection: "column", gap: "1.5rem",
            }}
          >
            <button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: "1.25rem", right: "1.25rem", background: "none", border: "none", color: "#fff", fontSize: "1.5rem", cursor: "pointer" }}>✕</button>
            <a href="#eventos" onClick={() => setMenuOpen(false)} style={{ fontSize: "15px", color: "#fff", textDecoration: "none", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>Ver Eventos</a>
            <a href="#ayuda" onClick={() => setMenuOpen(false)} style={{ fontSize: "15px", color: "#fff", textDecoration: "none", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>Ayuda</a>
            <Link href="/perdi-mi-boleto" onClick={() => setMenuOpen(false)} style={{ fontSize: "15px", color: "#fff", textDecoration: "none", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>Mis Boletos</Link>
            <a href="#nosotros" onClick={() => setMenuOpen(false)} style={{ fontSize: "15px", color: "#fff", textDecoration: "none", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>Nosotros</a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ HERO ═══ */}
      <section ref={heroRef} style={{ position: "relative", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <motion.div style={{ y: heroY, position: "absolute", inset: 0 }}>
          <Image src="/hero.jpg" alt="Hero" fill style={{ objectFit: "cover" }} priority />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(5,5,5,0.5), rgba(5,5,5,0.2), #050505)" }} />
        </motion.div>
        <motion.div style={{ opacity: heroOpacity, position: "relative", zIndex: 10, textAlign: "center", width: "100%", maxWidth: "900px", margin: "0 auto", padding: "0 1.5rem" }}>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
            style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)", fontWeight: 900, lineHeight: 0.9, letterSpacing: "-0.02em" }}
          >
            <span style={{ color: "#E63946" }}>MOMENTOS</span><br />
            INOLVIDABLES
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.05rem", marginTop: "1.5rem", lineHeight: 1.6 }}
          >
            Tu acceso directo a la música, el teatro y el entretenimiento. Sin las comisiones de siempre.
          </motion.p>

          {/* Two CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "2.5rem", maxWidth: "320px", marginLeft: "auto", marginRight: "auto", padding: "0 1rem" }}
          >
            <a
              href="#eventos"
              className="btn-hero-primary"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                backgroundColor: "#E63946", color: "#fff",
                fontSize: "14px", fontWeight: 700,
                padding: "0.9rem 2rem", borderRadius: "8px",
                textDecoration: "none",
                letterSpacing: "0.1em", textTransform: "uppercase",
                width: "100%",
                border: "none",
              }}
            >
              VER EVENTOS
            </a>
            <a
              href="#"
              className="btn-hero-secondary"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                backgroundColor: "transparent", color: "#fff",
                fontSize: "14px", fontWeight: 700,
                padding: "0.9rem 2rem", borderRadius: "8px",
                textDecoration: "none",
                letterSpacing: "0.1em", textTransform: "uppercase",
                border: "2px solid #fff",
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

      {/* ═══ EVENTS ═══ */}
      <section id="eventos" style={{ padding: "4rem 0 5rem" }}>
        <div className="container-page">
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <p style={{ color: "#E63946", fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem", fontWeight: 600 }}>PRÓXIMOS EVENTOS</p>
              <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.01em" }}>Elige Tu Momento</h2>
            </div>
          </FadeIn>

          <div className="grid-events">
            {events.map((event, i) => (
              <FadeIn key={event.name} delay={i * 0.06}>
                <Link href={event.url} className="event-card-link" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="event-card-wrapper"
                    style={{ borderRadius: "16px", overflow: "hidden", cursor: "pointer", background: "#111", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    {/* Image section with fade to card bg */}
                    <div style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden" }}>
                      <Image src={event.image} alt={event.name} fill style={{ objectFit: "cover", objectPosition: "top center", transition: "transform 0.6s ease" }} />
                      {/* Gradient fades image into card background */}
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, #111 100%)" }} />

                      {/* Discount badge — glass style */}
                      {event.original && (
                        <div style={{
                          position: "absolute", top: "0.75rem", left: "0.75rem",
                          background: "rgba(230,57,70,0.9)", backdropFilter: "blur(8px)",
                          color: "#fff", fontSize: "11px", fontWeight: 800,
                          padding: "0.3rem 0.7rem", borderRadius: "4px",
                          letterSpacing: "0.06em", zIndex: 5,
                          boxShadow: "0 2px 12px rgba(230,57,70,0.4)"
                        }}>
                          AHORRA {Math.round((1 - event.price / event.original) * 100)}%
                        </div>
                      )}
                    </div>

                    {/* Text section below image */}
                    <div style={{ padding: "1.25rem 1.25rem 1.5rem" }}>
                      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}>{event.date}</p>
                      <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#fff", marginTop: "0.3rem", lineHeight: 1.2 }}>{event.name}</h3>
                      <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.875rem", marginTop: "0.3rem" }}>{event.venue} • {event.city}</p>

                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "1.25rem" }}>
                        <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem" }}>
                          <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.75rem" }}>Desde</span>
                          {event.original && <span style={{ color: "rgba(255,255,255,0.3)", textDecoration: "line-through", fontSize: "0.8rem" }}>${event.original}</span>}
                          <span style={{ color: "#E63946", fontSize: "1.5rem", fontWeight: 900, letterSpacing: "-0.02em" }}>${event.price.toLocaleString()}</span>
                        </div>
                        <span className="ver-mas" style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", fontWeight: 500, transition: "color 0.3s" }}>Ver más →</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HELP CENTER ═══ */}
      <section style={{ padding: "5rem 0", background: "#0a0a0a" }}>
        <div className="container-page" style={{ maxWidth: "600px", margin: "0 auto" }}>
          <FadeIn>
            <h2 style={{ fontSize: "clamp(2rem, 5vw, 2.75rem)", fontWeight: 900, textAlign: "center", marginBottom: "2.5rem", lineHeight: 1.2 }}>
              ¿Cómo te podemos ayudar?
            </h2>
          </FadeIn>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              { icon: "🛒", label: "Necesito ayuda con mi compra" },
              { icon: "✉️", label: "Perdí mi boleto digital" },
              { icon: "💳", label: "Quiero pedir un reembolso" },
              { icon: "❓", label: "Tengo dudas sobre un evento" },
            ].map((item, i) => (
              <FadeIn key={item.label} delay={i * 0.08}>
                <a
                  href="#"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    gap: "0.75rem",
                    background: "rgba(255,255,255,0.05)", color: "#fff",
                    fontSize: "1rem", fontWeight: 600,
                    padding: "1.15rem 2rem", borderRadius: "12px",
                    textDecoration: "none", transition: "all 0.3s",
                    width: "100%",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MANIFESTO ═══ */}
      <section style={{ padding: "5rem 0 0", background: "#050505" }}>
        <div className="container-page" style={{ maxWidth: "700px", margin: "0 auto", paddingBottom: "3rem" }}>
          <FadeIn>
            <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, lineHeight: 1.2, marginBottom: "1.5rem" }}>
              No somos la boletera de <span style={{ color: "#E63946", textDecoration: "underline", textDecorationThickness: "3px", textUnderlineOffset: "6px" }}>siempre.</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "1.05rem", lineHeight: 1.8 }}>
              Nos cansamos de las letras chiquitas y los procesos de compra complicados. 
              Dulos es tu acceso directo a la música, el teatro y el entretenimiento. Sin las comisiones de siempre
            </p>
          </FadeIn>
        </div>
        {/* Banner with logo */}
        <div style={{ position: "relative", width: "100%", overflow: "hidden", background: "linear-gradient(135deg, #1a0a0c, #2a0e12, #0a0a0a)", padding: "4rem 2rem" }}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Image src="/dulos-logo.svg" alt="Dulos" width={280} height={90} />
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "4rem 0 2rem", background: "#050505" }}>
        <div className="container-page">
          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} style={{ cursor: "pointer" }}>
              <Image src="/dulos-logo.svg" alt="Dulos" width={120} height={40} />
            </a>
          </div>

          {/* Footer columns */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2.5rem", textAlign: "center", marginBottom: "3rem" }}>
            {/* Información */}
            <div>
              <h4 style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1.25rem", color: "#fff" }}>Información</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <a href="#" style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.9rem", textDecoration: "none", transition: "color 0.3s" }}>Términos y Condiciones</a>
                <a href="#" style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.9rem", textDecoration: "none", transition: "color 0.3s" }}>Aviso de Privacidad</a>
                <a href="#" style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.9rem", textDecoration: "none", transition: "color 0.3s" }}>Política de Cancelación</a>
              </div>
            </div>

            {/* Contáctanos */}
            <div>
              <h4 style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1.25rem", color: "#fff" }}>Contáctanos</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <a href="mailto:ayuda@dulos.io" style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.9rem", textDecoration: "none", transition: "color 0.3s" }}>✉️ ayuda@dulos.io</a>
                <a href="#" style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.9rem", textDecoration: "none", transition: "color 0.3s" }}>💬 WhatsApp</a>
              </div>
            </div>

            {/* Síguenos */}
            <div>
              <h4 style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1.25rem", color: "#fff" }}>Síguenos</h4>
              <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", alignItems: "center" }}>
                <a href="#" aria-label="Instagram" style={{ color: "#fff", textDecoration: "none", transition: "opacity 0.3s", display: "flex" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="#" aria-label="Facebook" style={{ color: "#fff", textDecoration: "none", transition: "opacity 0.3s", display: "flex" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1.5rem", textAlign: "center" }}>
            <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "13px" }}>© 2025 Dulos. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
