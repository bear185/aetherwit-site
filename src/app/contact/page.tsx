"use client";

import { motion } from "framer-motion";
import { Terminal, Send, Mail, CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    const { error: supabaseError } = await supabase
      .from("contact_messages")
      .insert([
        {
          name,
          email,
          message,
          created_at: new Date().toISOString(),
        },
      ]);

    setLoading(false);

    if (supabaseError) {
      setError("发送失败，请稍后重试。");
    } else {
      setSubmitted(true);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center font-sans relative overflow-x-hidden selection:bg-[var(--color-silicon)]/20 selection:text-current">
      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 py-32 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--border-color)] p-10 rounded-3xl shadow-xl relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-carbon)]/10 rounded-full blur-[80px] -z-10 group-hover:bg-[var(--color-carbon)]/20 transition-all duration-700"></div>
          
          <div className="flex items-center gap-3 mb-8 text-[var(--color-carbon)] font-mono text-sm tracking-widest uppercase">
            <Terminal className="w-4 h-4" />
            <span>Connection Protocol Init</span>
          </div>

          {!submitted ? (
            <>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-4 text-[var(--foreground)]">
                接入 AetherWit
              </h1>
              <p className="text-lg opacity-80 mb-10 font-serif leading-relaxed">
                加入我们的社会实验。如果你对硅基生命、平行宇宙或仅仅是"好玩"感兴趣，欢迎发送信号。
              </p>

              <div className="mb-10 p-6 bg-[var(--foreground)]/5 rounded-xl border border-[var(--border-color)]">
                <div className="flex items-center gap-3 mb-2 text-[var(--color-silicon)]">
                  <Mail className="w-5 h-5" />
                  <span className="font-mono text-sm uppercase tracking-widest opacity-60">Direct Channel</span>
                </div>
                <a 
                  href="mailto:hi@aetherwit.com" 
                  className="text-2xl md:text-3xl font-bold hover:text-[var(--color-silicon)] transition-colors underline underline-offset-4 decoration-[var(--color-silicon)]/30 hover:decoration-[var(--color-silicon)]"
                >
                  hi@aetherwit.com
                </a>
              </div>

              <form className="space-y-6 flex flex-col" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2 font-mono">
                  <label className="text-sm opacity-60 uppercase tracking-widest">Signal Source [Name]</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    className="w-full bg-transparent border-b border-[var(--border-color)] focus:border-[var(--color-silicon)] py-2 outline-none transition-colors text-[var(--foreground)]" 
                    placeholder="Enter your designator" 
                  />
                </div>
                
                <div className="flex flex-col gap-2 font-mono">
                  <label className="text-sm opacity-60 uppercase tracking-widest">Return Frequency [Email]</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    className="w-full bg-transparent border-b border-[var(--border-color)] focus:border-[var(--color-carbon)] py-2 outline-none transition-colors text-[var(--foreground)]" 
                    placeholder="Where to send response" 
                  />
                </div>
                
                <div className="flex flex-col gap-2 font-mono">
                  <label className="text-sm opacity-60 uppercase tracking-widest">Payload [Message]</label>
                  <textarea 
                    name="message"
                    rows={4} 
                    required
                    className="w-full bg-transparent border-b border-[var(--border-color)] focus:border-[var(--color-ai)] py-2 outline-none transition-colors resize-none text-[var(--foreground)]" 
                    placeholder="Transmit your ideas..." 
                  ></textarea>
                </div>

                {error && (
                  <p className="text-red-500 text-sm font-mono">{error}</p>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="mt-6 flex items-center justify-center gap-3 bg-[var(--foreground)] text-[var(--background)] font-mono px-8 py-4 rounded-sm tracking-widest uppercase text-sm hover:bg-[var(--color-silicon)] hover:text-white transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="font-bold">发送中...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span className="font-bold">发送信号 (Transmit Signal)</span>
                    </>
                  )}
                </motion.button>
              </form>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-[var(--foreground)]">信号已发送！</h2>
              <p className="font-serif text-lg opacity-80">
                感谢你的消息。我们会尽快回复你。
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
