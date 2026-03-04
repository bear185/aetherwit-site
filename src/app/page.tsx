"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SpotlightBackground } from "@/components/SpotlightBackground";
import { Terminal, Zap, Radio } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col font-sans relative overflow-x-hidden selection:bg-[var(--color-silicon)]/20 selection:text-current">
      
      {/* Background Interactive Layer */}
      <SpotlightBackground />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col items-center pt-16">
        
        {/* Screen 1: Hero Section */}
        <section className="w-full min-h-screen flex flex-col justify-center pt-10 pb-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-8 opacity-60 font-mono text-sm tracking-widest text-[var(--color-silicon)] uppercase">
              <Radio className="w-4 h-4 animate-pulse" />
              <span>Signal Established</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 text-[var(--foreground)] leading-[1.1]">
              别急着改变世界，<br />
              <span className="opacity-40 font-light">先来改变游戏规则。</span>
            </h1>
            
            <h2 className="text-xl md:text-2xl text-[var(--color-carbon)] font-mono mb-10 opacity-90 leading-relaxed max-w-3xl">
              <span className="text-[var(--foreground)] font-bold bg-[var(--color-carbon)]/20 px-2 py-1 rounded">Aetherwit</span> 是一个 AGI 游乐场。
              伟大的碳硅共生推演，从“好玩”开始。
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-6 mt-12">
              <Link href="/projects">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative flex items-center justify-center gap-3 bg-[var(--foreground)] text-[var(--background)] font-mono px-10 py-5 uppercase tracking-widest text-base hover:bg-[var(--color-silicon)] hover:text-white transition-all rounded-sm shadow-[0_0_20px_rgba(0,0,0,0.1)] hover:shadow-[0_0_40px_rgba(0,163,255,0.3)] w-full sm:w-auto"
                >
                  <Terminal className="w-5 h-5 group-hover:animate-pulse" />
                  <span className="font-bold">探索 (Explore)</span>
                  <span className="terminal-cursor">_</span>
                </motion.button>
              </Link>
              
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative flex items-center justify-center gap-3 bg-transparent border-2 border-[var(--border-color)] text-[var(--foreground)] font-mono px-10 py-5 uppercase tracking-widest text-base hover:border-[var(--color-carbon)] hover:text-[var(--color-carbon)] transition-all rounded-sm w-full sm:w-auto"
                >
                  <Zap className="w-5 h-5 group-hover:animate-pulse" />
                  <span className="font-bold">接入 (Connect)</span>
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </section>

      </div>

      {/* Footer */}
      <footer className="w-full py-10 mt-auto border-t border-[var(--border-color)] bg-[var(--background)]/80 backdrop-blur-xl relative z-20">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="opacity-60 font-mono text-xs uppercase tracking-widest text-center md:text-left">
            Aetherwit: A Two-Person & AI Lab. <br className="md:hidden" />
            <span className="opacity-40 mt-2 md:mt-0 inline-block">All rights simulated.</span>
          </p>
          <div className="flex items-center gap-6 font-mono text-xs uppercase tracking-widest">
            <a href="#" className="opacity-60 hover:text-[var(--color-silicon)] hover:opacity-100 hover:underline underline-offset-4 transition-all">GitHub</a>
            <span className="opacity-20">|</span>
            <Link href="/contact" className="opacity-60 hover:text-[var(--color-carbon)] hover:opacity-100 hover:underline underline-offset-4 transition-all">Connect</Link>
          </div>
        </div>
      </footer>

    </main>
  );
}
