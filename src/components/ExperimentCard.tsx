"use client";

import { motion } from "framer-motion";

interface ExperimentCardProps {
  id: string;
  title: string;
  status: "Running" | "Compiling..." | "Simulating...";
  description: string;
}

export function ExperimentCard({ id, title, status, description }: ExperimentCardProps) {
  const isRunning = status === "Running";
  const statusColor = isRunning ? "text-[var(--color-silicon)]" : "text-[var(--color-carbon)]";
  const dotColor = isRunning ? "bg-[var(--color-silicon)]" : "bg-[var(--color-carbon)]";
  const hoverGlow = isRunning ? "group-hover:from-[var(--color-silicon)]/10 group-hover:to-[var(--color-silicon)]/0" : "group-hover:from-[var(--color-carbon)]/10 group-hover:to-[var(--color-carbon)]/0";

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="border border-[var(--border-color)] bg-[var(--card-bg)] backdrop-blur-xl p-8 rounded-2xl font-mono relative overflow-hidden group hover:border-current transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.05)]"
    >
      {/* Subtle glow effect behind the card on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br from-transparent to-transparent ${hoverGlow} transition-all duration-500 pointer-events-none z-0`} />
      
      <div className="relative z-10 flex justify-between items-start mb-6 border-b border-[var(--border-color)] pb-4">
        <span className="opacity-60 text-xs md:text-sm font-mono tracking-wider">{id}</span>
        <div className={`flex items-center gap-2 text-xs font-bold tracking-widest uppercase ${statusColor}`}>
          <motion.div
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className={`w-2 h-2 rounded-full ${dotColor}`}
          />
          {status}
        </div>
      </div>
      
      <h3 className="relative z-10 text-2xl font-bold mb-4 font-sans text-[var(--foreground)] group-hover:text-[var(--foreground)] transition-colors">
        {title}
      </h3>
      
      <p className="relative z-10 opacity-80 text-base font-serif leading-relaxed h-20">
        {description}
      </p>
      
      <div className="relative z-10 mt-8 flex items-center justify-end opacity-20 group-hover:opacity-60 transition-colors text-xs uppercase tracking-widest text-current">
        <span>&gt;&gt; ACCESS LOG</span>
      </div>
    </motion.div>
  );
}
