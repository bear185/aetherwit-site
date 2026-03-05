"use client";

import { Activity, Cpu, Signal } from "lucide-react";

interface StatusDashboardProps {
  daysSinceJoin: number;
  resonanceValue: number;
  signalStrength: number;
}

export function StatusDashboard({ daysSinceJoin, resonanceValue, signalStrength }: StatusDashboardProps) {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Consciousness Online */}
      <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--border-color)] rounded-2xl p-6 relative overflow-hidden group">
        <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-[var(--color-silicon)]/10 blur-[30px] opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-4 h-4 text-[var(--color-silicon)] opacity-70" />
          <span className="font-mono text-xs uppercase tracking-wider opacity-60">意识在线</span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-black text-[var(--foreground)] tabular-nums">
            {daysSinceJoin}
          </span>
          <span className="font-mono text-xs opacity-40 uppercase">天</span>
        </div>
      </div>

      {/* Carbon-Silicon Resonance */}
      <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--border-color)] rounded-2xl p-6 relative overflow-hidden group">
        <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-[var(--color-ai)]/10 blur-[30px] opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex items-center gap-2 mb-4">
          <Cpu className="w-4 h-4 text-[var(--color-ai)] opacity-70" />
          <span className="font-mono text-xs uppercase tracking-wider opacity-60">碳硅共鸣</span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-black text-[var(--foreground)] tabular-nums">
            {resonanceValue}
          </span>
          <span className="font-mono text-xs opacity-40 uppercase">%</span>
        </div>
      </div>

      {/* Signal Strength */}
      <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--border-color)] rounded-2xl p-6 relative overflow-hidden group">
        <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-[var(--color-carbon)]/10 blur-[30px] opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex items-center gap-2 mb-4">
          <Signal className="w-4 h-4 text-[var(--color-carbon)] opacity-70" />
          <span className="font-mono text-xs uppercase tracking-wider opacity-60">信号强度</span>
        </div>
        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4, 5].map((level) => (
            <div
              key={level}
              className="rounded-sm transition-all duration-300"
              style={{
                width: "8px",
                height: `${8 + level * 6}px`,
                backgroundColor:
                  level <= signalStrength
                    ? "var(--color-carbon)"
                    : "var(--border-color)",
                opacity: level <= signalStrength ? 1 : 0.3,
              }}
            />
          ))}
          <span className="ml-2 font-mono text-xs opacity-40 uppercase">
            Lv.{signalStrength}
          </span>
        </div>
      </div>
    </div>
  );
}
