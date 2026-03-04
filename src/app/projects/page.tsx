"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Cpu } from "lucide-react";
import { ExperimentCard } from "@/components/ExperimentCard";
import { Modal } from "@/components/Modal";

export default function Projects() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const handleCardClick = (id: string, title: string) => {
    if (id === "[EXP_01: Aetherwit_Town]") {
      // Let the Link handle navigation
      return;
    }
    setModalTitle(title);
    setModalOpen(true);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center font-sans relative overflow-x-hidden selection:bg-[var(--color-silicon)]/20 selection:text-current pt-24">
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-16 flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-8 opacity-60 font-mono text-sm tracking-widest text-[var(--color-silicon)] uppercase">
            <Cpu className="w-4 h-4 animate-pulse" />
            <span>Active Nodes</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-4 text-[var(--foreground)]">
            项目站与实验室
          </h1>
          <p className="text-lg opacity-80 font-serif leading-relaxed max-w-2xl mx-auto">
            这里是我们正在推演的碳硅共存未来切片。
            即使有些在概念阶段，也已被标记为推演中。
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full"
        >
          <Link href="/projects/aetherwit-town" className="block">
            <ExperimentCard 
              id="[EXP_01: Aetherwit_Town]"
              title="Aetherwit Town"
              status="Running"
              description="ai小镇。基于多智能体协同演算的原生数字聚落，观察涌现出的社会法则。"
            />
          </Link>
          
          <div onClick={() => handleCardClick("[EXP_02: LIFE_JOURNEY]", "人生图鉴")} className="cursor-pointer">
            <ExperimentCard 
              id="[EXP_02: LIFE_JOURNEY]"
              title="人生图鉴"
              status="Compiling..."
              description="敬请期待。一场关于自我认知的推演实验，用全新的方式标记你的灵魂质感。"
            />
          </div>
          
          <div onClick={() => handleCardClick("[EXP_03: MUSIC_SYNTH]", "硅基频率")} className="cursor-pointer">
            <ExperimentCard 
              id="[EXP_03: MUSIC_SYNTH]"
              title="硅基频率"
              status="Simulating..."
              description="通过 AI 捕捉人类情感的微妙波动，生成专属于你的环境白噪音与叙事音乐。"
            />
          </div>
        </motion.div>

      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={modalTitle}>
        敬请期待！我们正在紧锣密鼓地编译中。这将是一场颠覆性的社会实验，请耐心等待我们的信号。
      </Modal>
    </main>
  );
}
