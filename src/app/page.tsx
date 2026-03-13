import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Analytics from "@/components/Analytics";
import Events from "@/components/Events";
import Payments from "@/components/Payments";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <Hero />
      <Analytics />
      <Events />
      <Payments />
      <Testimonials />
      <Footer />
    </main>
  );
}
