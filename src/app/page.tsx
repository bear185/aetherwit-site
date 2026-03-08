import { SpotlightBackground } from "@/components/SpotlightBackground";
import { HeroSection } from "@/components/HeroSection";
import { MobileHeroAnimation } from "@/components/MobileHeroAnimation";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col font-sans relative overflow-x-hidden selection:bg-[var(--color-silicon)]/20 selection:text-current">
      
      {/* Background Interactive Layer - Desktop */}
      <SpotlightBackground />
      
      {/* Mobile Touch Animation Layer */}
      <MobileHeroAnimation />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col items-center pt-16">
        
        {/* Screen 1: Hero Section */}
        <HeroSection />

      </div>

    </main>
  );
}
