"use client";

import { motion } from "framer-motion";
import { Radio } from "lucide-react";
import { Timeline } from "@/components/Timeline";

export default function Logs() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center font-sans relative overflow-x-hidden selection:bg-[var(--color-silicon)]/20 selection:text-current pt-24">
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-16 flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-8 opacity-60 font-mono text-sm tracking-widest text-[var(--color-silicon)] uppercase">
            <Radio className="w-4 h-4 animate-pulse" />
            <span>Build in Public</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-4 text-[var(--foreground)]">
            观测日志
          </h1>
          <p className="text-lg opacity-80 font-serif leading-relaxed max-w-2xl mx-auto">
            记录平行宇宙的生长切片。这里是我们作为观测员的所有系统广播。
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-3xl"
        >
          <Timeline />
        </motion.div>

      </div>
    </main>
  );
}
