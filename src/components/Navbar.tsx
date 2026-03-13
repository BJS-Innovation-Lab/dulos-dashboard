"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Image src="/dulos-logo.svg" alt="Dulos" width={120} height={40} className="brightness-110" />
        <div className="hidden md:flex items-center gap-8">
          {["Dashboard", "Eventos", "Analytics", "Pagos", "Testimonios"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm text-white/60 hover:text-[#E63946] transition-colors duration-300 tracking-wide"
            >
              {item}
            </a>
          ))}
        </div>
        <button className="bg-[#E63946] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-[#c5303c] transition-all hover:shadow-[0_0_20px_rgba(230,57,70,0.4)]">
          Comprar Boletos
        </button>
      </div>
    </motion.nav>
  );
}
