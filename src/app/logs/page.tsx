"use client";

import { motion } from "framer-motion";
import { Radio } from "lucide-react";
import { Timeline } from "@/components/Timeline";
import { PageHeader } from "@/components/PageHeader";

export default function Logs() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center font-sans relative overflow-x-hidden selection:bg-[var(--color-silicon)]/20 selection:text-current pt-24">
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-16 flex flex-col items-center">

        <PageHeader
          icon={Radio}
          label="日志公开"
          title="观测日志"
          subtitle="记录平行宇宙的生长切片。这里是我们作为观测员的所有系统广播。"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-3xl"
        >
          <Timeline />
        </motion.div>

      </div>
    </main>
  );
}
