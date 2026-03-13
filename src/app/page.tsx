"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const events = [
  { name: "Así Lo Veo Yo", city: "CDMX", venue: "Nuevo Teatro Libanés", price: 299, original: 600, image: "/event1.jpg", date: "25 Feb — 25 Mar" },
  { name: "Mijares Sinfónico", city: "Toluca", venue: "Teatro Morelos", price: 1249, image: "/event2.jpg", date: "13 Marzo 2026" },
  { name: "Infierno", city: "CDMX", venue: "Teatro Enrique Lizalde", price: 299, image: "/event3.jpg", date: "6 Marzo 2026" },
  { name: "¡Oh Karen!", city: "CDMX", venue: "Teatro Xola", price: 199, image: "/event4.png", date: "25 Marzo 2026" },
  { name: "Lucero", city: "Puebla", venue: "Auditorio Explanada", price: 1499, image: "/event5.png", date: "28 Marzo 2026" },
];

const testimonials = [
  { name: "Sandra Morales", text: "No es un monólogo más, es una confesión que te abraza. Una crudeza necesaria con una sensibilidad que desarma." },
  { name: "Luis Herrera", text: "Sentí que alguien por fin ponía en palabras lo que yo no sabía explicar. Me ayudó a entender mucho más allá de lo evidente." },
  { name: "María Estrada", text: "Brutal, honesta y profundamente humana. Me hizo enfrentar emociones que todos cargamos en silencio." },
];

function FadeUp({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
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
    <main className="bg-[#050505] text-white overflow-x-hidden">

      {/* ═══ NAVBAR ═══ */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/60 backdrop-blur-2xl border-b border-white/[0.04]"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div className="w-full max-w-[1200px] px-8 md:px-16 py-5 flex items-center justify-between">
          <Image src="/dulos-logo.svg" alt="Dulos" width={110} height={36} />
          <div className="hidden md:flex items-center gap-10">
            {["Eventos", "Experiencia", "Testimonios"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-[13px] text-white/40 hover:text-white transition-colors duration-500 tracking-wider uppercase">{item}</a>
            ))}
          </div>
          <a href="#eventos" className="text-[13px] text-[#E63946] tracking-wider uppercase hover:text-white transition-colors duration-500">
            Ver Eventos
          </a>
        </div>
      </motion.nav>

      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image src="/hero.jpg" alt="Hero" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/50 via-[#050505]/20 to-[#050505]" />
        </motion.div>
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center w-full max-w-[900px] px-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-[#E63946] text-[11px] md:text-[13px] tracking-[0.4em] uppercase mb-6"
          >
            Tu acceso directo al entretenimiento
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tight"
          >
            MOMENTOS<br />
            <span className="bg-gradient-to-r from-[#E63946] to-[#ff6b6b] bg-clip-text text-transparent">INOLVIDABLES</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="text-white/40 text-base md:text-lg mt-8 leading-relaxed"
          >
            Música, teatro y entretenimiento.<br />Sin las comisiones de siempre.
          </motion.p>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            href="#eventos"
            className="inline-block mt-10 bg-[#E63946] text-white text-sm px-10 py-4 rounded-full font-medium hover:shadow-[0_0_40px_rgba(230,57,70,0.4)] hover:scale-105 transition-all duration-500"
          >
            Explorar Eventos
          </motion.a>
        </motion.div>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[1px] h-16 bg-gradient-to-b from-white/20 to-transparent"
        />
      </section>

      {/* ═══ STATEMENT ═══ */}
      <section className="w-full py-32 px-8 md:px-16">
        <div className="w-full max-w-[900px] mx-auto text-center">
          <FadeUp>
            <p className="text-[#E63946] text-[11px] tracking-[0.4em] uppercase mb-8">Nuestra Filosofía</p>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-light leading-snug text-white/90">
              Nos cansamos de las letras chiquitas y los procesos de compra complicados.
              <span className="text-white/30"> Dulos es diferente.</span>
            </h2>
          </FadeUp>
          <div className="flex items-center justify-center gap-12 md:gap-20 mt-16">
            {[
              { number: "0%", label: "Comisiones" },
              { number: "12,847", label: "Boletos vendidos" },
              { number: "34K+", label: "Usuarios" },
            ].map((s, i) => (
              <FadeUp key={s.label} delay={i * 0.15}>
                <div className="text-center">
                  <p className="text-2xl md:text-4xl font-black text-[#E63946]">{s.number}</p>
                  <p className="text-white/30 text-[10px] md:text-xs mt-2 tracking-wider uppercase">{s.label}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURED — MIJARES ═══ */}
      <section className="relative w-full h-[80vh] overflow-hidden" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Image src="/event2.jpg" alt="Mijares Sinfónico" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
        <FadeUp className="relative z-10 text-center max-w-[900px] px-8">
          <p className="text-[#E63946] text-[11px] tracking-[0.4em] uppercase mb-4">Evento Destacado</p>
          <h2 className="text-5xl md:text-7xl font-black">Mijares Sinfónico</h2>
          <p className="text-white/40 text-lg mt-3">Teatro Morelos • Toluca • 13 Marzo 2026</p>
          <div className="flex items-center justify-center gap-6 mt-8">
            <span className="text-3xl font-black text-[#E63946]">$1,249</span>
            <a href="#" className="bg-white/10 backdrop-blur-sm border border-white/10 text-white px-8 py-3 rounded-full text-sm hover:bg-[#E63946] hover:border-[#E63946] transition-all duration-500">
              Comprar Boletos
            </a>
          </div>
        </FadeUp>
      </section>

      {/* ═══ EVENTS GRID ═══ */}
      <section id="eventos" className="w-full py-32 px-8 md:px-16">
        <div className="w-full max-w-[1200px] mx-auto">
          <FadeUp className="text-center mb-20">
            <p className="text-[#E63946] text-[11px] tracking-[0.4em] uppercase mb-4">Próximos Eventos</p>
            <h2 className="text-4xl md:text-6xl font-black">Elige Tu Momento</h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {events.map((event, i) => (
              <FadeUp key={event.name} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.4 }}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer bg-[#0a0a0a]"
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image src={event.image} alt={event.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                    {event.original && (
                      <div className="absolute top-4 right-4 bg-[#E63946] text-white text-[10px] font-bold px-3 py-1.5 rounded-full tracking-wider">
                        -{Math.round((1 - event.price / event.original) * 100)}% OFF
                      </div>
                    )}
                  </div>
                  <div className="p-6 -mt-20 relative z-10">
                    <p className="text-white/30 text-[11px] tracking-wider uppercase">{event.date}</p>
                    <h3 className="text-xl font-bold text-white mt-2 group-hover:text-[#E63946] transition-colors duration-500">{event.name}</h3>
                    <p className="text-white/30 text-sm mt-1">{event.venue} • {event.city}</p>
                    <div className="flex items-center justify-between mt-5">
                      <div className="flex items-baseline gap-2">
                        {event.original && <span className="text-white/20 line-through text-sm">${event.original}</span>}
                        <span className="text-[#E63946] text-2xl font-black">${event.price.toLocaleString()}</span>
                      </div>
                      <span className="text-white/20 text-xs group-hover:text-[#E63946] transition-colors duration-500">Ver más →</span>
                    </div>
                  </div>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ EXPERIENCE ═══ */}
      <section id="experiencia" className="w-full py-32 px-8 md:px-16 border-t border-white/[0.04]">
        <div className="w-full max-w-[1000px] mx-auto text-center">
          <FadeUp className="mb-20">
            <p className="text-[#E63946] text-[11px] tracking-[0.4em] uppercase mb-4">¿Por qué Dulos?</p>
            <h2 className="text-4xl md:text-5xl font-black">La Experiencia</h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { icon: "🎟️", title: "Sin Comisiones", desc: "El precio que ves es el precio que pagas. Sin sorpresas, sin letras chiquitas." },
              { icon: "⚡", title: "Compra en Segundos", desc: "Selecciona, paga y recibe tus boletos al instante. Así de simple." },
              { icon: "🔒", title: "100% Seguro", desc: "Pagos protegidos con Stripe. Tu información siempre encriptada." },
            ].map((f, i) => (
              <FadeUp key={f.title} delay={i * 0.15}>
                <div className="text-center">
                  <span className="text-4xl block mb-5">{f.icon}</span>
                  <h3 className="text-lg font-bold text-white mb-3">{f.title}</h3>
                  <p className="text-white/30 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURED — ASÍ LO VEO YO ═══ */}
      <section className="relative w-full h-[70vh] overflow-hidden" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Image src="/event1.jpg" alt="Así Lo Veo Yo" fill className="object-cover" />
        <div className="absolute inset-0 bg-[#050505]/70" />
        <FadeUp className="relative z-10 text-center max-w-[800px] px-8">
          <p className="text-[#E63946] text-[11px] tracking-[0.4em] uppercase mb-6">En Cartelera</p>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black">Así Lo Veo Yo</h2>
          <p className="text-white/50 text-base md:text-lg mt-6 max-w-[600px] mx-auto leading-relaxed">
            Un monólogo donde René desnuda su verdad. No hay fórmulas ni héroes, solo la confesión de alguien que se atrevió a pedir ayuda.
          </p>
          <div className="flex items-center justify-center gap-4 mt-10">
            <span className="text-white/30 line-through text-lg">$600</span>
            <span className="text-[#E63946] text-4xl font-black">$299</span>
          </div>
          <a href="#" className="inline-block mt-8 bg-[#E63946] text-white px-10 py-4 rounded-full font-medium hover:shadow-[0_0_40px_rgba(230,57,70,0.4)] hover:scale-105 transition-all duration-500 text-sm">
            Comprar Boletos
          </a>
        </FadeUp>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section id="testimonios" className="w-full py-32 px-8 md:px-16">
        <div className="w-full max-w-[1000px] mx-auto text-center">
          <FadeUp className="mb-20">
            <p className="text-[#E63946] text-[11px] tracking-[0.4em] uppercase mb-4">Testimonios</p>
            <h2 className="text-4xl md:text-5xl font-black">Lo Que Dicen</h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
            {testimonials.map((t, i) => (
              <FadeUp key={t.name} delay={i * 0.12}>
                <div className="text-center border-t border-white/[0.06] pt-8">
                  <div className="flex gap-1 mb-5 justify-center">
                    {[...Array(5)].map((_, j) => <span key={j} className="text-[#E63946] text-xs">★</span>)}
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
                  <p className="text-white text-sm font-medium">{t.name}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="w-full py-32 px-8 md:px-16">
        <FadeUp className="max-w-[700px] mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black leading-tight">
            Tu próximo momento{" "}
            <span className="text-[#E63946]">te espera.</span>
          </h2>
          <a href="#eventos" className="inline-block mt-10 bg-[#E63946] text-white px-12 py-5 rounded-full font-medium text-base hover:shadow-[0_0_50px_rgba(230,57,70,0.5)] hover:scale-105 transition-all duration-500">
            Explorar Eventos
          </a>
        </FadeUp>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="w-full border-t border-white/[0.04] py-10 px-8 md:px-16">
        <div className="w-full max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Image src="/dulos-logo.svg" alt="Dulos" width={80} height={26} className="opacity-40" />
          <p className="text-white/15 text-xs">© 2026 Dulos. Sin comisiones, sin excusas.</p>
          <div className="flex gap-8 text-white/20 text-xs">
            <a href="#" className="hover:text-white/50 transition-colors">Términos</a>
            <a href="#" className="hover:text-white/50 transition-colors">Privacidad</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
