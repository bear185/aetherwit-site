"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Terminal, Zap, Radio } from "lucide-react";

export function HeroSection() {
  return (
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
          伟大的碳硅共生推演，从"好玩"开始。
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
  );
}
