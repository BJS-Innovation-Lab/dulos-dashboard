"use client";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <Image src="/dulos-logo.svg" alt="Dulos" width={100} height={32} className="brightness-75" />
        <p className="text-white/20 text-sm">
          © 2026 Dulos. Tu acceso directo al entretenimiento. Sin las comisiones de siempre.
        </p>
        <div className="flex gap-6 text-white/30 text-sm">
          <a href="#" className="hover:text-[#E63946] transition-colors">Términos</a>
          <a href="#" className="hover:text-[#E63946] transition-colors">Privacidad</a>
          <a href="#" className="hover:text-[#E63946] transition-colors">Contacto</a>
        </div>
      </div>
    </footer>
  );
}
