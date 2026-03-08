"use client";

import { Shield, Fingerprint, Clock } from "lucide-react";

interface IdentityCardProps {
  username: string;
  residentId: string;
  email: string;
  createdAt?: string;
}

export function IdentityCard({ username, residentId, email, createdAt }: IdentityCardProps) {
  return (
    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--border-color)] rounded-3xl relative overflow-hidden group">
      {/* Holographic shimmer overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-silicon)]/5 via-transparent to-[var(--color-ai)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      {/* Scanline effect */}
      <div className="scanline rounded-3xl" />

      <div className="relative z-10 p-8 md:p-10">
        {/* Card header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-[var(--color-silicon)] opacity-70" />
            <span className="font-mono text-xs tracking-widest uppercase opacity-60">身份已验证</span>
          </div>
          <div className="px-3 py-1 rounded-full border border-[var(--color-carbon)]/30 bg-[var(--color-carbon)]/10 font-mono text-xs text-[var(--color-carbon)] tracking-wider uppercase">
            碳基生命体
          </div>
        </div>

        {/* Main identity */}
        <div className="flex items-start gap-6 mb-8">
          {/* Avatar / Fingerprint */}
          <div className="w-20 h-20 shrink-0 rounded-2xl border border-[var(--border-color)] bg-[var(--foreground)]/5 flex items-center justify-center relative overflow-hidden">
            <Fingerprint className="w-10 h-10 text-[var(--color-silicon)] opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-silicon)]/10 to-transparent" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-3xl font-black tracking-tight text-[var(--foreground)] mb-1 truncate">
              {username}
            </h2>
            <p className="font-mono text-sm text-[var(--color-silicon)] tracking-wider mb-3">
              {residentId}
            </p>
            <p className="text-sm opacity-50 font-serif truncate">
              {email}
            </p>
          </div>
        </div>

        {/* Metadata row */}
        <div className="flex items-center gap-6 pt-6 border-t border-[var(--border-color)]">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 opacity-40" />
            <span className="font-mono text-xs opacity-60 uppercase tracking-wider">入驻日期</span>
          </div>
          <span className="font-mono text-sm text-[var(--foreground)]">
            {createdAt
              ? new Date(createdAt).toLocaleDateString("zh-CN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "创世纪"}
          </span>
        </div>
      </div>
    </div>
  );
}
