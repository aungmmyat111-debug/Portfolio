import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { BentoAbout } from "@/components/BentoAbout";
import { Projects } from "@/components/Projects";
import { Timeline } from "@/components/Timeline";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Skip link */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-zinc-50 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-zinc-900"
      >
        Skip to content
      </a>

      {/* Fixed background: dot grid + radial spotlight */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-dots [mask-image:radial-gradient(ellipse_75%_60%_at_50%_0%,black_25%,transparent_72%)]" />
        <div className="absolute left-1/2 top-[-240px] h-[500px] w-[860px] -translate-x-1/2 rounded-full bg-indigo-500/[0.12] blur-[140px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>

      <Navbar />

      <main id="main">
        <Hero />
        <BentoAbout />
        <Projects />
        <Timeline />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
