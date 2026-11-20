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
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-zinc-900 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>

      {/* Fixed background: pastel aurora glows + dot grid */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="animate-aurora-a absolute -top-48 left-1/2 h-[560px] w-[920px] -translate-x-1/2 rounded-full bg-indigo-300/40 blur-[120px]" />
        <div className="animate-aurora-b absolute -left-48 top-[16%] h-[460px] w-[460px] rounded-full bg-purple-300/35 blur-[110px]" />
        <div className="animate-aurora-c absolute -right-48 top-[38%] h-[520px] w-[520px] rounded-full bg-cyan-200/45 blur-[120px]" />
        <div className="absolute inset-0 bg-dots [mask-image:radial-gradient(ellipse_72%_58%_at_50%_0%,black_25%,transparent_76%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent" />
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
