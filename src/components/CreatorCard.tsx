"use client";

import { motion } from "framer-motion";

interface CreatorCardProps {
  name: string;
  role: string;
  quote: string;
  delay?: number;
  highlightColor?: string;
}

export function CreatorCard({ name, role, quote, delay = 0, highlightColor = "var(--color-silicon)" }: CreatorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="flex flex-col border border-[var(--border-color)] bg-[var(--card-bg)] backdrop-blur-xl p-8 rounded-2xl relative overflow-hidden group hover:border-current transition-all shadow-[0_4px_30px_rgba(0,0,0,0.05)]"
    >
      <div 
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[50px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
        style={{ backgroundColor: highlightColor }}
      />
      
      <div className="flex items-center gap-4 mb-6 relative z-10">
        <div className="w-12 h-12 rounded-full border border-[var(--border-color)] bg-black/5 dark:bg-black/50 flex items-center justify-center font-mono text-xs uppercase text-[var(--foreground)] opacity-70 overflow-hidden shadow-inner">
          {name.substring(0, 2)}
        </div>
        <div>
          <h3 className="text-xl font-bold font-sans text-[var(--foreground)]">{name}</h3>
          <p className="text-sm font-mono opacity-60 uppercase">{role}</p>
        </div>
      </div>
      
      <div className="mt-auto relative z-10">
        <div className="w-6 h-[1px] bg-[var(--border-color)] mb-4 group-hover:bg-current transition-colors"></div>
        <p className="font-serif italic text-lg opacity-90 leading-relaxed text-[var(--foreground)]">
          "{quote}"
        </p>
      </div>
    </motion.div>
  );
}
