"use client";

import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";

interface PageHeaderProps {
  icon: LucideIcon;
  label: string;
  title: string;
  subtitle?: string;
  accentColor?: string;
}

export function PageHeader({
  icon: Icon,
  label,
  title,
  subtitle,
  accentColor = "var(--color-silicon)",
}: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full text-center"
    >
      <div
        className="flex items-center justify-center gap-3 mb-8 opacity-60 font-mono text-sm tracking-widest uppercase"
        style={{ color: accentColor }}
      >
        <Icon className="w-4 h-4 animate-pulse" />
        <span>{label}</span>
      </div>

      <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-4 text-[var(--foreground)]">
        {title}
      </h1>

      {subtitle && (
        <p
          className="text-xl md:text-2xl font-mono mb-16 opacity-90 leading-relaxed max-w-3xl mx-auto"
          style={{ color: accentColor }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
