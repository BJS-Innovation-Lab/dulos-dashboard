"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/hero.jpg)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/70 via-[#0a0a0a]/40 to-[#0a0a0a]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#E63946]/10 to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-[#E63946] text-sm md:text-base tracking-[0.3em] uppercase mb-4 font-medium"
          >
            Tu acceso directo al entretenimiento
          </motion.p>
          <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-none mb-6">
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="block text-white"
            >
              MOMENTOS
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="block bg-gradient-to-r from-[#E63946] to-[#ff6b6b] bg-clip-text text-transparent"
            >
              INOLVIDABLES
            </motion.span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-8"
          >
            Sin las comisiones de siempre. Música, teatro y entretenimiento al mejor precio.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="flex gap-4 justify-center"
          >
            <a
              href="#eventos"
              className="bg-[#E63946] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#c5303c] transition-all hover:shadow-[0_0_30px_rgba(230,57,70,0.5)] hover:scale-105"
            >
              Ver Eventos →
            </a>
            <a
              href="#analytics"
              className="border border-white/20 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/5 transition-all"
            >
              Dashboard
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2"
        >
          <div className="w-1.5 h-1.5 bg-[#E63946] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
