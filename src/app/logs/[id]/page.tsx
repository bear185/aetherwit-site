"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Radio, Calendar } from "lucide-react";
import { getLogDetail } from "@/data/logs";

export default function LogDetail() {
  const params = useParams();
  const id = params?.id as string;
  const log = getLogDetail(id);

  if (!log) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center font-sans relative overflow-x-hidden pt-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <Link href="/logs" className="text-[var(--color-silicon)] underline">返回日志</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col font-sans relative overflow-x-hidden selection:bg-[var(--color-silicon)]/20 selection:text-current pt-24 pb-16">
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6">
        
        <Link href="/logs" className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-wider opacity-60 hover:opacity-100 hover:text-[var(--color-silicon)] transition-all mb-8">
          <ArrowLeft className="w-4 h-4" />
          返回观测日志
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4 font-mono text-sm uppercase tracking-widest text-[var(--color-silicon)]">
            <Radio className="w-4 h-4 animate-pulse" />
            <span>LOG_ENTRY_DETECTED</span>
          </div>
          
          <div className="flex items-center gap-4 mb-6 text-sm font-mono opacity-50">
            <Calendar className="w-4 h-4" />
            <span>{log.fullDate}</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 text-[var(--foreground)]">
            {log.title}
          </h1>
          
          <p className="text-xl md:text-2xl opacity-80 font-serif leading-relaxed max-w-3xl">
            {log.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          {log.details.map((detail, index) => (
            <div 
              key={index}
              className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--border-color)] rounded-2xl p-6 md:p-8"
            >
              <div className="flex gap-4">
                <span className="font-mono text-[var(--color-silicon)] opacity-50">0{index + 1}</span>
                <p className="font-serif leading-relaxed opacity-90 text-lg">
                  {detail}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </main>
  );
}
