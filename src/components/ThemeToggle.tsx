"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = theme === "dark";

  return (
    <div className="fixed bottom-6 right-6 md:top-6 md:bottom-auto md:right-6 z-50">
      <button
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="relative flex items-center justify-between w-16 h-8 p-1 bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--border-color)] rounded-full shadow-[0_4px_30px_rgba(0,0,0,0.1)] focus:outline-none overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-carbon)]/10 to-[var(--color-silicon)]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        
        {/* Track Icons */}
        <div className="flex justify-between w-full px-1.5 z-0 text-[var(--foreground)] opacity-50">
          <Moon className="w-4 h-4" />
          <Sun className="w-4 h-4" />
        </div>

        {/* Thumb */}
        <motion.div
          layout
          initial={false}
          animate={{
            x: isDark ? 0 : 32,
          }}
          transition={{
            type: "spring",
            stiffness: 700,
            damping: 30,
          }}
          className="absolute left-1 z-10 flex items-center justify-center w-6 h-6 bg-[var(--foreground)] rounded-full shadow-md"
        >
          {isDark ? (
            <Moon className="w-3 h-3 text-[var(--background)]" />
          ) : (
            <Sun className="w-3 h-3 text-[var(--background)]" />
          )}
        </motion.div>
      </button>
    </div>
  );
}
