"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "愿景", href: "/vision" },
    { name: "项目站与实验室", href: "/projects" },
    { name: "日志记录", href: "/logs" },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-between md:justify-center py-6 px-4 pointer-events-none"
      >
        <div className="flex items-center gap-8 bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--border-color)] rounded-full px-6 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.1)] pointer-events-auto">
          <Link href="/" className="font-bold text-lg font-sans md:mr-4">
            Aetherwit<span className="text-[var(--color-silicon)]">.</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-mono uppercase tracking-wider">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className={`transition-colors whitespace-nowrap ${isActive ? 'text-[var(--color-silicon)] opacity-100 font-bold' : 'opacity-80 hover:opacity-100 hover:text-[var(--color-silicon)]'}`}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link 
              href="/contact"
              className={`transition-colors whitespace-nowrap ml-4 border-l border-[var(--border-color)] pl-4 ${pathname === '/contact' ? 'text-[var(--color-carbon)] opacity-100 font-bold' : 'opacity-80 hover:opacity-100 hover:text-[var(--color-carbon)]'}`}
            >
              联系方式
            </Link>
          </div>

          <button 
            className="md:hidden flex items-center justify-center text-[var(--foreground)] opacity-80 ml-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-24 left-4 right-4 z-40 md:hidden bg-[var(--card-bg)] backdrop-blur-2xl border border-[var(--border-color)] rounded-2xl shadow-2xl overflow-hidden p-4 flex flex-col gap-4 font-mono uppercase tracking-wider text-sm"
          >
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`transition-colors p-3 rounded-lg ${isActive ? 'bg-[var(--color-silicon)]/10 text-[var(--color-silicon)] font-bold' : 'opacity-80 hover:bg-[var(--foreground)]/5 hover:opacity-100'}`}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link 
              href="/contact"
              onClick={() => setIsOpen(false)}
              className={`transition-colors p-3 rounded-lg border-t border-[var(--border-color)] mt-2 ${pathname === '/contact' ? 'bg-[var(--color-carbon)]/10 text-[var(--color-carbon)] font-bold' : 'opacity-80 hover:bg-[var(--foreground)]/5 hover:opacity-100'}`}
            >
              联系方式
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
