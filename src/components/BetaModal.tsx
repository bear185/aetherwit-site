"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";

interface BetaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BetaModal({ isOpen, onClose }: BetaModalProps) {
  const [submitted, setSubmitted] = useState(false);
  
  // TODO: Replace 'YOUR_FORMSPREE_ID' with your actual Formspree ID
  // Get your free form ID at https://formspree.io/
  const [state, handleSubmit] = useForm("YOUR_FORMSPREE_ID");

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    await handleSubmit(e);
    if (state.succeeded) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 3000);
    }
  };

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
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-[var(--foreground)]/10 transition-colors text-[var(--foreground)] opacity-50 hover:opacity-100"
              >
                <X className="w-5 h-5" />
              </button>
              
              {!submitted ? (
                <>
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-silicon)]/20 flex items-center justify-center">
                      <span className="text-3xl">🚀</span>
                    </div>
                    <h3 className="text-2xl font-bold font-sans text-[var(--foreground)]">申请加入 Aetherwit Town 内测</h3>
                    <p className="font-mono text-sm opacity-60 mt-2">APPLY FOR BETA ACCESS</p>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider opacity-60 mb-2">昵称 / Nickname</label>
                      <input 
                        type="text" 
                        name="name"
                        required
                        className="w-full bg-transparent border border-[var(--border-color)] rounded-lg px-4 py-3 focus:border-[var(--color-silicon)] outline-none transition-colors text-[var(--foreground)]"
                        placeholder="Enter your nickname"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider opacity-60 mb-2">邮箱 / Email</label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        className="w-full bg-transparent border border-[var(--border-color)] rounded-lg px-4 py-3 focus:border-[var(--color-silicon)] outline-none transition-colors text-[var(--foreground)]"
                        placeholder="your@email.com"
                      />
                      <ValidationError prefix="Email" field="email" errors={state.errors} />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider opacity-60 mb-2">想说的话 / Message (Optional)</label>
                      <textarea 
                        name="message"
                        rows={3}
                        className="w-full bg-transparent border border-[var(--border-color)] rounded-lg px-4 py-3 focus:border-[var(--color-silicon)] outline-none transition-colors text-[var(--foreground)] resize-none"
                        placeholder="Why do you want to join?"
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={state.submitting}
                      className="w-full mt-4 flex items-center justify-center gap-2 bg-[var(--color-silicon)] text-[var(--background)] font-bold font-mono px-8 py-4 rounded-lg uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {state.submitting ? (
                        "Transmitting..."
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Submit Application
                        </>
                      )}
                    </motion.button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center"
                  >
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-[var(--foreground)] mb-2">信号已接收！</h3>
                  <p className="font-serif opacity-80">
                    感谢你的申请。我们会尽快与你联系。
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
