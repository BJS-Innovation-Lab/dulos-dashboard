"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Payments() {
  const [selectedZone, setSelectedZone] = useState("VIP");
  const zones = [
    { name: "VIP", price: 1499, color: "#E63946", seats: 12 },
    { name: "Preferente", price: 999, color: "#ff6b6b", seats: 34 },
    { name: "General", price: 499, color: "#888", seats: 156 },
    { name: "Balcón", price: 299, color: "#555", seats: 89 },
  ];
  const selected = zones.find(z => z.name === selectedZone)!;

  return (
    <section id="pagos" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[#E63946] text-sm tracking-[0.3em] uppercase mb-3">Experiencia de compra</p>
          <h2 className="text-4xl md:text-6xl font-bold text-white">Checkout</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Seat Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#111]/80 backdrop-blur-sm border border-white/5 rounded-2xl p-8"
          >
            <h3 className="text-white font-semibold mb-6">Mapa del Venue</h3>
            {/* Stage */}
            <div className="relative">
              <div className="bg-gradient-to-b from-[#E63946]/20 to-transparent border border-[#E63946]/30 rounded-t-[100px] h-16 flex items-center justify-center mb-6">
                <span className="text-[#E63946] text-sm font-medium tracking-wider">ESCENARIO</span>
              </div>
              {/* Zones */}
              <div className="space-y-3">
                {zones.map((zone) => (
                  <motion.button
                    key={zone.name}
                    onClick={() => setSelectedZone(zone.name)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full p-4 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                      selectedZone === zone.name
                        ? "border-[#E63946] bg-[#E63946]/10"
                        : "border-white/5 bg-white/2 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: zone.color }} />
                      <span className="text-white font-medium">{zone.name}</span>
                      <span className="text-white/30 text-sm">{zone.seats} disponibles</span>
                    </div>
                    <span className="text-white font-bold">${zone.price.toLocaleString()}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Checkout Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#111]/80 backdrop-blur-sm border border-white/5 rounded-2xl p-8"
          >
            <h3 className="text-white font-semibold mb-6">Resumen de Compra</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-white/50">Evento</span>
                <span className="text-white">Lucero — Puebla</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/50">Zona</span>
                <span className="text-white">{selectedZone}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/50">Cantidad</span>
                <span className="text-white">2 boletos</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/50">Subtotal</span>
                <span className="text-white">${(selected.price * 2).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/50">Comisiones</span>
                <span className="text-[#E63946] font-bold">$0 — ¡Sin comisiones!</span>
              </div>
              <div className="border-t border-white/10 pt-4 flex justify-between">
                <span className="text-white font-semibold">Total</span>
                <span className="text-[#E63946] text-2xl font-black">${(selected.price * 2).toLocaleString()}</span>
              </div>
            </div>

            {/* Card mockup */}
            <div className="space-y-4 mb-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <label className="text-white/30 text-xs block mb-2">Número de tarjeta</label>
                <p className="text-white font-mono">•••• •••• •••• 4242</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <label className="text-white/30 text-xs block mb-2">Expiración</label>
                  <p className="text-white font-mono">12/28</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <label className="text-white/30 text-xs block mb-2">CVC</label>
                  <p className="text-white font-mono">•••</p>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#E63946] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#c5303c] transition-all hover:shadow-[0_0_30px_rgba(230,57,70,0.4)]"
            >
              Pagar ${(selected.price * 2).toLocaleString()} MXN →
            </motion.button>
            <p className="text-white/20 text-xs text-center mt-3 flex items-center justify-center gap-1">
              🔒 Pago seguro con Stripe • SSL Encriptado
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
