"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const events = [
  { name: "Así Lo Veo Yo", city: "CDMX", venue: "Nuevo Teatro Libanés", price: 299, original: 600, image: "/event1.jpg", date: "25 Feb — 25 Mar", url: "https://dulos.io/asi-lo-veo-yo/nuevo-teatro-libanes-cdmx" },
  { name: "Mijares Sinfónico", city: "Toluca", venue: "Teatro Morelos", price: 1249, image: "/event2.jpg", date: "13 Marzo 2026", url: "https://dulos.io/mijares-sinfonico/teatro-morelos-toluca" },
  { name: "Infierno", city: "CDMX", venue: "Teatro Enrique Lizalde", price: 299, image: "/event3.jpg", date: "6 Marzo 2026", url: "https://dulos.io/infierno/teatro-enrique-lizalde-cdmx" },
  { name: "¡Oh Karen!", city: "CDMX", venue: "Teatro Xola", price: 199, image: "/event4.png", date: "25 Marzo 2026", url: "https://dulos.io/oh-karen/teatro-xola-cdmx" },
  { name: "Lucero", city: "Puebla", venue: "Auditorio Explanada", price: 1499, image: "/event5.png", date: "28 Marzo 2026", url: "https://dulos.io/lucero/auditorio-explanada-puebla" },
];

const testimonials = [
  { name: "Sandra Morales", text: "No es un monólogo más, es una confesión que te abraza. Una crudeza necesaria con una sensibilidad que desarma." },
  { name: "Luis Herrera", text: "Sentí que alguien por fin ponía en palabras lo que yo no sabía explicar. Me ayudó a entender mucho más allá de lo evidente." },
  { name: "María Estrada", text: "Brutal, honesta y profundamente humana. Me hizo enfrentar emociones que todos cargamos en silencio." },
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
          <div className="hp-nav-links" style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
            {["Eventos", "Experiencia", "Testimonios"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="nav-link" style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", transition: "color 0.3s" }}>{item}</a>
            ))}
          </div>
          <a href="#eventos" className="nav-link" style={{ fontSize: "13px", color: "#E63946", textDecoration: "none", letterSpacing: "0.15em", textTransform: "uppercase", transition: "color 0.3s" }}>
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
        <motion.div style={{ opacity: heroOpacity, position: "relative", zIndex: 10, textAlign: "center", width: "100%", maxWidth: "900px", margin: "0 auto", padding: "0 2rem" }}>
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
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            href="#eventos"
            className="btn-primary"
            style={{ display: "inline-block", marginTop: "2.5rem", background: "#E63946", color: "#fff", fontSize: "14px", padding: "1rem 2.5rem", borderRadius: "9999px", fontWeight: 500, textDecoration: "none", transition: "all 0.3s" }}
          >
            Explorar Eventos
          </motion.a>
        </motion.div>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", bottom: "3rem", left: "50%", transform: "translateX(-50%)", width: "1px", height: "4rem", background: "linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)" }}
        />
      </section>

      {/* ═══ STATEMENT ═══ */}
      <section className="section-centered" style={{ padding: "8rem 0" }}>
        <div className="container-page" style={{ textAlign: "center" }}>
          <FadeIn>
            <p style={{ color: "#E63946", fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "2rem" }}>Nuestra Filosofía</p>
            <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)", fontWeight: 300, lineHeight: 1.4, color: "rgba(255,255,255,0.9)", maxWidth: "800px", margin: "0 auto" }}>
              Nos cansamos de las letras chiquitas y los procesos de compra complicados.
              <span style={{ color: "rgba(255,255,255,0.3)" }}> Dulos es diferente.</span>
            </h2>
          </FadeIn>
          <div className="stats-row" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5rem", marginTop: "4rem" }}>
            {[
              { number: "0%", label: "Comisiones" },
              { number: "12,847", label: "Boletos vendidos" },
              { number: "34K+", label: "Usuarios" },
            ].map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.15}>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 900, color: "#E63946" }}>{s.number}</p>
                  <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", marginTop: "0.5rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>{s.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURED — MIJARES ═══ */}
      <section style={{ position: "relative", height: "80vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <Image src="/event2.jpg" alt="Mijares Sinfónico" fill style={{ objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #050505, rgba(5,5,5,0.4), transparent)" }} />
        <FadeIn className="section-centered">
          <div style={{ position: "relative", zIndex: 10, maxWidth: "900px", margin: "0 auto", padding: "0 2rem", textAlign: "center" }}>
          <p style={{ color: "#E63946", fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem", textAlign: "center" }}>Evento Destacado</p>
          <h2 style={{ fontSize: "clamp(3rem, 7vw, 5rem)", fontWeight: 900, textAlign: "center" }}>Mijares Sinfónico</h2>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "1.1rem", marginTop: "0.75rem", textAlign: "center" }}>Teatro Morelos • Toluca • 13 Marzo 2026</p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.5rem", marginTop: "2rem" }}>
            <span style={{ fontSize: "1.8rem", fontWeight: 900, color: "#E63946" }}>$1,249</span>
            <a href="https://dulos.io/mijares-sinfonico/teatro-morelos-toluca" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", padding: "0.75rem 2rem", borderRadius: "9999px", fontSize: "14px", textDecoration: "none", transition: "all 0.3s" }}>
              Comprar Boletos
            </a>
          </div>
          </div>
        </FadeIn>
      </section>

      {/* ═══ EVENTS GRID ═══ */}
      <section id="eventos" className="section-centered" style={{ padding: "8rem 0" }}>
        <div className="container-page">
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "5rem" }}>
              <p style={{ color: "#E63946", fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem" }}>Próximos Eventos</p>
              <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900 }}>Elige Tu Momento</h2>
            </div>
          </FadeIn>

          <div className="grid-events" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem" }}>
            {events.map((event, i) => (
              <FadeIn key={event.name} delay={i * 0.08}>
                <a href={event.url} target="_blank" rel="noopener noreferrer" className="event-card-link" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.4 }}
                    style={{ borderRadius: "1rem", overflow: "hidden", cursor: "pointer", background: "#0a0a0a" }}
                  >
                    <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", background: "#050505" }}>
                      <Image src={event.image} alt={event.name} fill style={{ objectFit: "cover", transition: "transform 0.7s" }} />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #0a0a0a, transparent, transparent)" }} />
                      {event.original && (
                        <div style={{ position: "absolute", top: "1rem", right: "1rem", background: "#E63946", color: "#fff", fontSize: "10px", fontWeight: 700, padding: "0.375rem 0.75rem", borderRadius: "9999px", letterSpacing: "0.1em" }}>
                          -{Math.round((1 - event.price / event.original) * 100)}% OFF
                        </div>
                      )}
                    </div>
                    <div style={{ padding: "1.5rem", marginTop: "-5rem", position: "relative", zIndex: 10 }}>
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
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ EXPERIENCE ═══ */}
      <section id="experiencia" className="section-centered" style={{ padding: "8rem 0", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="container-page" style={{ textAlign: "center" }}>
          <FadeIn>
            <p style={{ color: "#E63946", fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem" }}>¿Por qué Dulos?</p>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, marginBottom: "5rem" }}>La Experiencia</h2>
          </FadeIn>
          <div className="grid-features" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "4rem" }}>
            {[
              { icon: "🎟️", title: "Sin Comisiones", desc: "El precio que ves es el precio que pagas. Sin sorpresas, sin letras chiquitas." },
              { icon: "⚡", title: "Compra en Segundos", desc: "Selecciona, paga y recibe tus boletos al instante. Así de simple." },
              { icon: "🔒", title: "100% Seguro", desc: "Pagos protegidos con Stripe. Tu información siempre encriptada." },
            ].map((f, i) => (
              <FadeIn key={f.title} delay={i * 0.15}>
                <div style={{ textAlign: "center" }}>
                  <span style={{ fontSize: "2.5rem", display: "block", marginBottom: "1.25rem" }}>{f.icon}</span>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.75rem" }}>{f.title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.875rem", lineHeight: 1.7 }}>{f.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURED — ASÍ LO VEO YO ═══ */}
      <section style={{ position: "relative", height: "70vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <Image src="/event1.jpg" alt="Así Lo Veo Yo" fill style={{ objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(5,5,5,0.7)" }} />
        <FadeIn>
          <div style={{ position: "relative", zIndex: 10, textAlign: "center", maxWidth: "800px", margin: "0 auto", padding: "0 2rem" }}>
            <p style={{ color: "#E63946", fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1.5rem" }}>En Cartelera</p>
            <h2 style={{ fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 900 }}>Así Lo Veo Yo</h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1.1rem", marginTop: "1.5rem", maxWidth: "600px", margin: "1.5rem auto 0", lineHeight: 1.7 }}>
              Un monólogo donde René desnuda su verdad. No hay fórmulas ni héroes, solo la confesión de alguien que se atrevió a pedir ayuda.
            </p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginTop: "2.5rem" }}>
              <span style={{ color: "rgba(255,255,255,0.3)", textDecoration: "line-through", fontSize: "1.1rem" }}>$600</span>
              <span style={{ color: "#E63946", fontSize: "2.5rem", fontWeight: 900 }}>$299</span>
            </div>
            <a href="https://dulos.io/asi-lo-veo-yo/nuevo-teatro-libanes-cdmx" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: "inline-block", marginTop: "2rem", background: "#E63946", color: "#fff", padding: "1rem 2.5rem", borderRadius: "9999px", fontWeight: 500, fontSize: "14px", textDecoration: "none", transition: "all 0.3s" }}>
              Comprar Boletos
            </a>
          </div>
        </FadeIn>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section id="testimonios" className="section-centered" style={{ padding: "8rem 0" }}>
        <div className="container-page" style={{ textAlign: "center" }}>
          <FadeIn>
            <p style={{ color: "#E63946", fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem" }}>Testimonios</p>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, marginBottom: "5rem" }}>Lo Que Dicen</h2>
          </FadeIn>
          <div className="grid-testimonials" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "3rem" }}>
            {testimonials.map((t, i) => (
              <FadeIn key={t.name} delay={i * 0.12}>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "2rem", textAlign: "center" }}>
                  <div style={{ display: "flex", gap: "0.25rem", marginBottom: "1.25rem", justifyContent: "center" }}>
                    {[...Array(5)].map((_, j) => <span key={j} style={{ color: "#E63946", fontSize: "12px" }}>★</span>)}
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>&ldquo;{t.text}&rdquo;</p>
                  <p style={{ color: "#fff", fontSize: "0.875rem", fontWeight: 500 }}>{t.name}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="section-centered" style={{ padding: "8rem 0" }}>
        <div className="container-page" style={{ textAlign: "center" }}>
          <FadeIn>
            <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, lineHeight: 1.1, maxWidth: "700px", margin: "0 auto" }}>
              Tu próximo momento{" "}
              <span style={{ color: "#E63946" }}>te espera.</span>
            </h2>
            <a href="#eventos" className="btn-primary" style={{ display: "inline-block", marginTop: "2.5rem", background: "#E63946", color: "#fff", padding: "1.25rem 3rem", borderRadius: "9999px", fontWeight: 500, fontSize: "1rem", textDecoration: "none", transition: "all 0.3s" }}>
              Explorar Eventos
            </a>
          </FadeIn>
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
