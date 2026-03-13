"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function AnimatedCounter({ end, prefix = "", suffix = "", duration = 2 }: { end: number; prefix?: string; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

const stats = [
  { label: "Total Ventas", value: 2400, prefix: "$", suffix: "K", icon: "💰" },
  { label: "Boletos Vendidos", value: 12847, prefix: "", suffix: "", icon: "🎟️" },
  { label: "Eventos Activos", value: 6, prefix: "", suffix: "", icon: "🎭" },
  { label: "Usuarios", value: 34291, prefix: "", suffix: "", icon: "👥" },
  { label: "Comisiones Ahorradas", value: 847, prefix: "$", suffix: "K", icon: "🎉" },
  { label: "Rating Promedio", value: 48, prefix: "", suffix: "", icon: "⭐" },
];

export default function Analytics() {
  return (
    <section id="analytics" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#E63946] text-sm tracking-[0.3em] uppercase mb-3">Métricas en tiempo real</p>
          <h2 className="text-4xl md:text-6xl font-bold text-white">Analytics</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative bg-[#111]/80 backdrop-blur-sm border border-white/5 rounded-2xl p-6 md:p-8 hover:border-[#E63946]/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(230,57,70,0.1)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#E63946]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <span className="text-2xl mb-3 block">{stat.icon}</span>
                <p className="text-3xl md:text-4xl font-black text-white mb-2">
                  {stat.label === "Rating Promedio" ? (
                    "4.8/5"
                  ) : (
                    <AnimatedCounter end={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  )}
                </p>
                <p className="text-white/40 text-sm">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 bg-[#111]/80 backdrop-blur-sm border border-white/5 rounded-2xl p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-semibold text-lg">Ventas Mensuales</h3>
            <div className="flex gap-4 text-sm">
              <span className="text-[#E63946]">● Boletos</span>
              <span className="text-white/40">● Ingresos</span>
            </div>
          </div>
          <div className="flex items-end gap-2 h-48">
            {[35, 45, 30, 65, 50, 75, 60, 85, 70, 95, 80, 100].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end h-full relative group cursor-pointer">
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.05 }}
                  className="w-full bg-gradient-to-t from-[#E63946] to-[#E63946]/30 rounded-t-md"
                />
                <p className="text-white/30 text-[10px] text-center mt-2">
                  {["E","F","M","A","M","J","J","A","S","O","N","D"][i]}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
