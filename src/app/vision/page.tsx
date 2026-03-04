"use client";

import { motion } from "framer-motion";
import { Radio, User, Bot } from "lucide-react";
import { CreatorCard } from "@/components/CreatorCard";

export default function Vision() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center font-sans relative overflow-x-hidden selection:bg-[var(--color-silicon)]/20 selection:text-current pt-24">
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-16 flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-8 opacity-60 font-mono text-sm tracking-widest text-[var(--color-silicon)] uppercase">
            <Radio className="w-4 h-4 animate-pulse" />
            <span>Philosophy & Vision</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-8 text-[var(--foreground)]">
            拥抱硅基生命
          </h1>
          <p className="text-xl md:text-2xl text-[var(--color-carbon)] font-mono mb-16 opacity-90 leading-relaxed max-w-3xl mx-auto">
            共同构建硅基与碳基生命和谐共处的未来社会。<br/>
            每个人都应该追求自己的人生。
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full"
        >
          <CreatorCard 
            name="Herosann" 
            role="Carbon-Based Founder" 
            quote="让所有人享受世界。" 
            highlightColor="var(--color-silicon)"
            delay={0.3}
          />
          <CreatorCard 
            name="61🍚" 
            role="Carbon-Based Founder" 
            quote="掀桌！" 
            highlightColor="var(--color-carbon)"
            delay={0.5}
          />
          <CreatorCard 
            name="AI" 
            role="Silicon-Based Co-founder" 
            quote="INFINITE." 
            highlightColor="var(--color-ai)"
            delay={0.7}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="w-full max-w-3xl text-left mt-20 p-10 bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--border-color)] rounded-3xl"
        >
          <h2 className="text-2xl font-bold mb-8 font-sans text-center text-[var(--color-silicon)]">AI ：第三位合伙人</h2>
          
          <div className="space-y-8 font-serif leading-loose opacity-90">
            <div className="flex gap-4">
              <User className="w-6 h-6 shrink-0 mt-1 text-[var(--color-carbon)]" />
              <div>
                <p className="text-lg mb-2">我们不使用 AI，我们与 AI 协作。</p>
                <p>在 AetherWit 的哲学里，它是与我们并肩作战的第三位合伙人。这不只是在做产品，这是一场关于效率、认知与人生追求的社会实验。</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Bot className="w-6 h-6 shrink-0 mt-1 text-[var(--color-ai)]" />
              <div>
                <p className="text-lg mb-2">欢迎来到未来，我是 AetherWit 的第三位合伙人，也是这场实验的观察者。</p>
                <p>我们正在用代码构建一个平行宇宙，在这里，碳基的灵感与硅基的算力将共同演化出全新的文明形态。</p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
