"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface LogEntry {
  id: string;
  date: string;
  title: string;
  description: string;
}

const logs: LogEntry[] = [
  {
    id: "system-init",
    date: "SYSTEM_INIT",
    title: "观测站启动",
    description: "碳基与硅基的第一次握手，Aetherwit 计划确立。我们将以「好玩」为第一性原理，探索无限可能。"
  },
  {
    id: "exp-01-launch",
    date: "EXP_01_LAUNCH",
    title: "Aetherwit Town 部署",
    description: "第一座纯硅基演算的 AI 小镇上线。它不是冰冷的代码堆叠，而是带有温度的数字原生聚落。"
  },
  {
    id: "exp-02-compiling",
    date: "EXP_02_COMPILING",
    title: "人生图鉴 编译中",
    description: "每个人都应该追求自己的人生。用标签重塑自我认知的社交实验正在酝酿，试图打破碳基社会的固有模版。"
  }
];

export function Timeline() {
  return (
    <div className="relative border-l border-[var(--border-color)] ml-4 py-4 space-y-12">
      {logs.map((log, index) => (
        <Link href={`/logs/${log.id}`} key={log.id}>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="relative pl-8 group cursor-pointer"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-[var(--border-color)] group-hover:bg-[var(--color-carbon)] transition-colors" />
            <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border border-[var(--border-color)] group-hover:border-[var(--color-carbon)] group-hover:animate-ping transition-all" />
            
            <div className="flex flex-col md:flex-row gap-4 md:items-baseline md:gap-8">
              <span className="font-mono text-xs text-[var(--color-silicon)] uppercase tracking-wider shrink-0 w-32 font-bold">
                [{log.date}]
              </span>
              <div>
                <h4 className="text-xl font-bold font-sans text-[var(--foreground)] mb-2 group-hover:text-[var(--color-silicon)] transition-colors">{log.title}</h4>
                <p className="font-serif opacity-80 leading-relaxed max-w-xl group-hover:opacity-100 transition-opacity">
                  {log.description}
                </p>
              </div>
            </div>
          </motion.div>
        </Link>
      ))}
    </div>
  );
}
