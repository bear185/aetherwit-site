"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="w-full max-w-md mx-4 pointer-events-auto bg-[var(--card-bg)] backdrop-blur-2xl border border-[var(--border-color)] rounded-3xl p-8 shadow-2xl relative overflow-hidden">
              <button
                onClick={onClose}
                aria-label="关闭"
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-[var(--foreground)]/10 transition-colors text-[var(--foreground)] opacity-50 hover:opacity-100"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[var(--color-silicon)]/20 flex items-center justify-center">
                  <span className="text-3xl">🔒</span>
                </div>
                <h3 className="text-2xl font-bold font-sans mb-4 text-[var(--foreground)]">{title}</h3>
                <p className="font-mono text-sm opacity-60 mb-6 uppercase tracking-widest">Coming Soon</p>
                <div className="p-4 bg-[var(--foreground)]/5 rounded-lg border border-[var(--border-color)]">
                  <p className="font-serif text-lg opacity-90 italic">
                    "{children}"
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
