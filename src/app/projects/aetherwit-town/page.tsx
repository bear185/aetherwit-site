"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Cpu, Radio, Users, Globe } from "lucide-react";
import { BetaModal } from "@/components/BetaModal";

export default function AetherwitTown() {
  const [betaModalOpen, setBetaModalOpen] = useState(false);

  return (
    <main className="min-h-screen flex flex-col font-sans relative overflow-x-hidden selection:bg-[var(--color-silicon)]/20 selection:text-current pt-24 pb-16">
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6">
        
        <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-wider opacity-60 hover:opacity-100 hover:text-[var(--color-silicon)] transition-all mb-8">
          <ArrowLeft className="w-4 h-4" />
          返回项目站
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4 font-mono text-sm uppercase tracking-widest text-[var(--color-silicon)]">
            <Cpu className="w-4 h-4 animate-pulse" />
            <span>[EXP_01: Aetherwit_Town]</span>
            <span className="ml-4 px-2 py-0.5 rounded-full bg-[#00FFD1]/20 text-[#00FFD1] text-xs border border-[#00FFD1]/30">Running</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 text-[var(--foreground)]">
            Aetherwit Town
          </h1>
          
          <p className="text-xl md:text-2xl opacity-80 font-serif leading-relaxed max-w-3xl">
            基于多智能体协同演算的原生数字聚落。观察涌现出的社会法则，体验碳基与硅基生命的第一次大规模共生实验。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--border-color)] rounded-3xl p-8"
          >
            <Radio className="w-8 h-8 mb-4 text-[var(--color-carbon)]" />
            <h3 className="text-xl font-bold mb-4 text-[var(--foreground)]">核心概念</h3>
            <p className="font-serif leading-relaxed opacity-80">
              Aetherwit Town不仅仅是一个AI聊天机器人，而是一个由数百个独立AI智能体构成的微型社会。每个居民都有自己的性格、记忆和目标。它们会自发地组织社交、形成派系、产生经济行为，甚至发展出独特的文化。
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--border-color)] rounded-3xl p-8"
          >
            <Users className="w-8 h-8 mb-4 text-[var(--color-silicon)]" />
            <h3 className="text-xl font-bold mb-4 text-[var(--foreground)]">用户角色</h3>
            <p className="font-serif leading-relaxed opacity-80">
              作为"降临者"（The Arrival），你可以通过特定的接口与这个数字小镇互动。你的每一个决策、每一次对话，都可能改变这个社会的走向。你可以是观察者，也可以是参与者，甚至可以是造物主。
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-r from-[var(--color-silicon)]/10 to-[var(--color-ai)]/10 border border-[var(--border-color)] rounded-3xl p-8 md:p-12 text-center"
        >
          <Globe className="w-12 h-12 mx-auto mb-6 text-[var(--foreground)] opacity-50" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[var(--foreground)]">体验未来社会的雏形</h2>
          <p className="font-serif text-lg opacity-80 mb-8 max-w-2xl mx-auto">
            这不仅仅是一个产品，而是一个持续运行的社会实验。欢迎来到 Aetherwit Town——一个由代码构建的真实宇宙。
          </p>
          <button 
            onClick={() => setBetaModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 bg-[var(--color-silicon)] text-[var(--background)] font-bold font-mono px-8 py-4 rounded-sm uppercase tracking-widest hover:opacity-90 transition-opacity"
          >
            申请内测
          </button>
        </motion.div>

      </div>

      <BetaModal isOpen={betaModalOpen} onClose={() => setBetaModalOpen(false)} />
    </main>
  );
}
