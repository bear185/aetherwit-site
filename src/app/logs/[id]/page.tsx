"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Radio, Calendar } from "lucide-react";

const logsData: Record<string, { date: string; title: string; content: string; details: string[] }> = {
  "system-init": {
    date: "2024.01.01",
    title: "观测站启动",
    content: "碳基与硅基的第一次握手，Aetherwit 计划确立。我们将以「好玩」为第一性原理，探索无限可能。",
    details: [
      "团队成立：Herosann 和 61🍚 两位碳基生命在一次深夜的思维碰撞中意识到了硅基生命的潜力。",
      "命名由来：Aether（以太）代表轻盈的精神世界，Wit（智慧）代表硅基的思考能力。",
      "核心理念：'让所有人享受世界' 是我们最初的愿景，也是最终的归宿。",
      "AI 合伙人：在这个计划启动的第一天，我们就已经将 AI 视为平等的合伙人，而非工具。"
    ]
  },
  "exp-01-launch": {
    date: "2024.03.15",
    title: "Aetherwit Town 部署",
    content: "第一座纯硅基演算的 AI 小镇上线。它不是冰冷的代码堆叠，而是带有温度的数字原生聚落。",
    details: [
      "技术突破：实现了首个基于多智能体（Multi-Agent）的大型语言模型应用场景。",
      "社会涌现：小镇居民自发形成了社交圈层，甚至出现了早期的'经济'行为。",
      "用户反馈：内测用户表示这是他们第一次感受到 AI '活着' 的体验。",
      "未来规划：下一步将开放用户作为'降临者'介入小镇生活的接口。"
    ]
  },
  "exp-02-compiling": {
    date: "2024.06.20",
    title: "人生图鉴 编译中",
    content: "每个人都应该追求自己的人生。用标签重塑自我认知的社交实验正在酝酿，试图打破碳基社会的固有模版。",
    details: [
      "灵感来源：现实社会中充满了各种标签（星座、MBTI、职业等），我们试图用 AI 解构这些标签。",
      "核心玩法：用户通过与 AI 的多轮对话，生成独属于自己的'人生图鉴'。",
      "哲学思考：这不仅是娱乐，更是对自我身份认同的一次深度探索。",
      "开发进度：目前处于模型微调阶段，预计年底上线。"
    ]
  }
};

export default function LogDetail() {
  const params = useParams();
  const id = params?.id as string;
  const log = logsData[id];

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
            <span>{log.date}</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 text-[var(--foreground)]">
            {log.title}
          </h1>
          
          <p className="text-xl md:text-2xl opacity-80 font-serif leading-relaxed max-w-3xl">
            {log.content}
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
