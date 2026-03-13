"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const events = [
  { name: "Así Lo Veo Yo", city: "CDMX", venue: "Nuevo Teatro Libanés", price: 299, original: 600, image: "/event1.jpg", date: "25 Feb - 25 Mar 2026", sold: 847 },
  { name: "Mijares Sinfónico", city: "Toluca", venue: "Teatro Morelos", price: 1249, image: "/event2.jpg", date: "13 Mar 2026", sold: 2103 },
  { name: "Infierno", city: "CDMX", venue: "Teatro Enrique Lizalde", price: 299, image: "/event3.jpg", date: "6 Mar 2026", sold: 1456 },
  { name: "¡Oh Karen!", city: "CDMX", venue: "Teatro Xola", price: 199, image: "/event4.png", date: "25 Mar 2026", sold: 634 },
  { name: "Lucero", city: "Puebla", venue: "Auditorio Explanada", price: 1499, image: "/event5.png", date: "28 Mar 2026", sold: 3891 },
  { name: "El Maleficio de la Mariposa", city: "CDMX", venue: "Foro Shakespeare", price: 350, image: "/perfil-dulos.png", date: "7 Feb 2026", sold: 1022 },
];

export default function Events() {
  return (
    <section id="eventos" className="py-24 px-6 bg-gradient-to-b from-[#0a0a0a] to-[#050505]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#E63946] text-sm tracking-[0.3em] uppercase mb-3">Elige tu próximo momento</p>
          <h2 className="text-4xl md:text-6xl font-bold text-white">Eventos</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {events.map((event, i) => (
            <motion.div
              key={event.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative bg-[#111] border border-white/5 rounded-2xl overflow-hidden cursor-pointer hover:border-[#E63946]/30 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />
                {event.original && (
                  <div className="absolute top-3 right-3 bg-[#E63946] text-white text-xs font-bold px-3 py-1 rounded-full">
                    -{Math.round((1 - event.price / event.original) * 100)}% OFF
                  </div>
                )}
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                  🎟️ {event.sold.toLocaleString()} vendidos
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#E63946] transition-colors">{event.name}</h3>
                <p className="text-white/40 text-sm mb-3">{event.venue} • {event.city}</p>
                <p className="text-white/30 text-xs mb-4">{event.date}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    {event.original && (
                      <span className="text-white/30 line-through text-sm">${event.original}</span>
                    )}
                    <span className="text-[#E63946] text-2xl font-black">${event.price.toLocaleString()}</span>
                  </div>
                  <button className="bg-white/5 border border-white/10 text-white px-4 py-2 rounded-full text-sm hover:bg-[#E63946] hover:border-[#E63946] transition-all duration-300">
                    Comprar
                  </button>
                </div>
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl shadow-[inset_0_0_30px_rgba(230,57,70,0.1)]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
