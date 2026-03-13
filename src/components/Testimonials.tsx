"use client";
import { motion } from "framer-motion";

const testimonials = [
  { name: "Sandra Morales", text: "Así lo veo yo no es un monólogo más, es una confesión que te abraza. René se presenta con una crudeza necesaria, pero con una sensibilidad que desarma.", rating: 5 },
  { name: "Luis Herrera", text: "Sentí que alguien por fin ponía en palabras lo que yo no sabía explicar. El monólogo me ayudó a entender mucho más allá de lo evidente.", rating: 5 },
  { name: "María Estrada", text: "Salí completamente conmovido. La historia me hizo enfrentar emociones que todos cargamos en silencio. Brutal, honesta y profundamente humana.", rating: 5 },
  { name: "Claudia Gómez", text: "Nunca pensé que un monólogo pudiera tocarme tanto. La honestidad con que cuenta su historia me hizo sentir reflejada en muchas de sus emociones.", rating: 5 },
  { name: "Fernanda Ruiz", text: "Me confrontó de una forma que no esperaba. Logra hablar del dolor con una honestidad tan limpia que termina siendo esperanzadora.", rating: 5 },
  { name: "Ricardo Torres", text: "La forma en que expone su vulnerabilidad te hace cuestionar la tuya. Es un monólogo que se queda contigo después de la función.", rating: 5 },
];

export default function Testimonials() {
  return (
    <section id="testimonios" className="py-24 px-6 bg-gradient-to-b from-[#050505] to-[#0a0a0a] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          className="text-center mb-16"
        >
          <p className="text-[#E63946] text-sm tracking-[0.3em] uppercase mb-3">Lo que dicen nuestros clientes</p>
          <h2 className="text-4xl md:text-6xl font-bold text-white">Testimonios</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#111]/80 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-[#E63946]/20 transition-all duration-500"
            >
              <div className="flex gap-1 mb-4">
                {Array(t.rating).fill(0).map((_, j) => (
                  <span key={j} className="text-[#E63946]">★</span>
                ))}
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E63946] to-[#ff6b6b] flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {t.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{t.name}</p>
                  <p className="text-white/30 text-xs">Cliente verificado</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
