"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Terminal,
  Shield,
  Activity,
  Clock,
  Fingerprint,
  Signal,
  LogOut,
  Cpu,
  Loader2,
  Lock,
  X,
  User,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { createClient } from "@/lib/supabase-browser";

interface Profile {
  id: string;
  username: string;
  resident_id: string;
  created_at?: string;
}

// Generate a deterministic hash from a string
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// Generate unique frequency bar heights from resident_id
function generateFrequencyBars(id: string, count: number = 48): number[] {
  const bars: number[] = [];
  const base = hashCode(id);
  for (let i = 0; i < count; i++) {
    const seed = Math.sin(base * (i + 1) * 0.017) * 10000;
    const normalized = ((seed - Math.floor(seed)) * 0.7) + 0.15; // 15% - 85% height
    bars.push(normalized);
  }
  return bars;
}

// Generate a "resonance index" from resident_id (deterministic but looks dynamic)
function getResonanceBase(id: string): number {
  const h = hashCode(id);
  return 60 + (h % 30); // 60-89 base range
}

export default function ProfilePage() {
  const { user, loading: authLoading, signOut } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [resonanceOffset, setResonanceOffset] = useState(0);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // Fetch profile data
  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push("/auth");
      return;
    }

    const fetchProfile = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (data) {
        setProfile(data as Profile);
      } else {
        // Profile missing in DB — create it now, matching the registration format
        const residentId = `AW·${Date.now().toString().slice(-6)}·${user.id.slice(0, 4).toUpperCase()}`;
        const username = user.user_metadata?.username || user.email?.split("@")[0] || "Resident";

        const { data: created } = await supabase.from("profiles").upsert({
          id: user.id,
          username,
          resident_id: residentId,
        }).select().single();

        setProfile(created as Profile ?? {
          id: user.id,
          username,
          resident_id: residentId,
          created_at: user.created_at,
        });
      }
      setLoading(false);
    };

    fetchProfile();
  }, [user, authLoading, router]);

  // Animate resonance index fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setResonanceOffset(Math.sin(Date.now() * 0.001) * 5);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Calculate days since registration
  const daysSinceJoin = useMemo(() => {
    if (!profile?.created_at) return 0;
    const created = new Date(profile.created_at);
    const now = new Date();
    return Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
  }, [profile?.created_at]);

  // Generate frequency bars
  const frequencyBars = useMemo(() => {
    if (!profile?.resident_id) return [];
    return generateFrequencyBars(profile.resident_id);
  }, [profile?.resident_id]);

  // Resonance index
  const resonanceBase = useMemo(() => {
    if (!profile?.resident_id) return 75;
    return getResonanceBase(profile.resident_id);
  }, [profile?.resident_id]);

  // Signal strength (based on days active, maxes at 5 bars)
  const signalStrength = useMemo(() => {
    if (daysSinceJoin < 1) return 1;
    if (daysSinceJoin < 7) return 2;
    if (daysSinceJoin < 30) return 3;
    if (daysSinceJoin < 90) return 4;
    return 5;
  }, [daysSinceJoin]);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordError(null);

    if (newPassword !== confirmPassword) {
      setPasswordError("两次输入的密码不一致。");
      setPasswordLoading(false);
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("密码至少需要 8 个字符。");
      setPasswordLoading(false);
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    setPasswordLoading(false);

    if (error) {
      setPasswordError(error.message);
    } else {
      setPasswordSuccess(true);
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setShowPasswordModal(false);
        setPasswordSuccess(false);
      }, 2000);
    }
  };

  if (authLoading || loading) {
    return (
      <main className="min-h-screen flex items-center justify-center font-sans">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-3 text-[var(--color-silicon)] font-mono text-sm"
        >
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>正在同步意识数据...</span>
        </motion.div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  if (!profile) {
    return (
      <main className="min-h-screen flex items-center justify-center font-sans">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-3 text-[var(--color-silicon)] font-mono text-sm"
        >
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>正在加载居民档案...</span>
        </motion.div>
      </main>
    );
  }

  const resonanceValue = (resonanceBase + resonanceOffset).toFixed(1);

  return (
    <main className="min-h-screen flex flex-col items-center font-sans relative overflow-x-hidden selection:bg-[var(--color-silicon)]/20 selection:text-current pt-24">
      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 py-16 flex flex-col items-center gap-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-6 opacity-60 font-mono text-sm tracking-widest text-[var(--color-silicon)] uppercase">
            <Terminal className="w-4 h-4" />
            <span>Resident Terminal</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-[var(--foreground)]">
            居民终端
          </h1>
        </motion.div>

        {/* Identity Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="w-full bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--border-color)] rounded-3xl relative overflow-hidden group"
        >
          {/* Holographic shimmer overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-silicon)]/5 via-transparent to-[var(--color-ai)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          {/* Scanline effect */}
          <div className="scanline rounded-3xl" />

          <div className="relative z-10 p-8 md:p-10">
            {/* Card header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-[var(--color-silicon)] opacity-70" />
                <span className="font-mono text-xs tracking-widest uppercase opacity-60">Identity Verified</span>
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
                  {profile.username}
                </h2>
                <p className="font-mono text-sm text-[var(--color-silicon)] tracking-wider mb-3">
                  {profile.resident_id}
                </p>
                <p className="text-sm opacity-50 font-serif truncate">
                  {user.email}
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
                {profile.created_at
                  ? new Date(profile.created_at).toLocaleDateString("zh-CN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "创世纪"}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Status Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
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
        </motion.div>

        {/* Personal Frequency Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="w-full bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--border-color)] rounded-3xl p-8 md:p-10 relative overflow-hidden"
        >
          <div className="flex items-center gap-3 mb-6">
            <Fingerprint className="w-5 h-5 text-[var(--color-ai)] opacity-70" />
            <span className="font-mono text-xs uppercase tracking-widest opacity-60">
              Personal Frequency · 个人频率
            </span>
          </div>

          <p className="font-serif text-sm opacity-50 mb-8 leading-relaxed">
            每位居民拥有独一无二的频率指纹，由你的身份编码在入驻时生成。
          </p>

          {/* Frequency Bars */}
          <div className="flex items-end justify-center gap-[3px] h-32 w-full">
            {frequencyBars.map((height, i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.5 + i * 0.02,
                  ease: "easeOut",
                }}
                className="frequency-bar flex-1 rounded-t-sm origin-bottom"
                style={
                  {
                    height: `${height * 100}%`,
                    "--bar-index": i,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <span className="font-mono text-xs opacity-30 tracking-wider">0 Hz</span>
            <span className="font-mono text-xs opacity-30 tracking-wider">
              {profile.resident_id}
            </span>
            <span className="font-mono text-xs opacity-30 tracking-wider">∞ Hz</span>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full flex flex-col sm:flex-row gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowPasswordModal(true)}
            className="flex-1 flex items-center justify-center gap-3 border border-[var(--border-color)] bg-[var(--card-bg)] backdrop-blur-xl text-[var(--foreground)] font-mono px-6 py-4 rounded-xl uppercase tracking-widest text-sm hover:border-[var(--color-silicon)] hover:text-[var(--color-silicon)] transition-all"
          >
            <Lock className="w-4 h-4" />
            <span>修改密码</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSignOut}
            className="flex-1 flex items-center justify-center gap-3 border border-[var(--border-color)] bg-[var(--card-bg)] backdrop-blur-xl text-[var(--foreground)] font-mono px-6 py-4 rounded-xl uppercase tracking-widest text-sm hover:border-red-500/50 hover:text-red-500 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>退出登录</span>
          </motion.button>
        </motion.div>

        <Link
          href="/"
          className="text-sm font-mono opacity-40 hover:opacity-100 transition-opacity mt-4"
        >
          ← 返回首页
        </Link>
      </div>

      {/* Password Change Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPasswordModal(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
            >
              <div className="w-full max-w-md mx-4 pointer-events-auto bg-[var(--card-bg)] backdrop-blur-2xl border border-[var(--border-color)] rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-[var(--foreground)]/10 transition-colors text-[var(--foreground)] opacity-50 hover:opacity-100"
                >
                  <X className="w-5 h-5" />
                </button>
                
                {!passwordSuccess ? (
                  <>
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-silicon)]/20 flex items-center justify-center">
                        <Lock className="w-8 h-8 text-[var(--color-silicon)]" />
                      </div>
                      <h3 className="text-2xl font-bold font-sans text-[var(--foreground)]">修改密码</h3>
                      <p className="font-mono text-sm opacity-60 mt-2">CHANGE PASSWORD</p>
                    </div>

                    {passwordError && (
                      <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <p className="text-red-500 text-sm font-mono">{passwordError}</p>
                      </div>
                    )}

                    <form onSubmit={handlePasswordChange} className="space-y-4">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider opacity-60 mb-2">新密码</label>
                        <input 
                          type="password" 
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                          minLength={8}
                          className="w-full bg-transparent border border-[var(--border-color)] rounded-lg px-4 py-3 focus:border-[var(--color-silicon)] outline-none transition-colors text-[var(--foreground)]"
                          placeholder="至少8个字符"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider opacity-60 mb-2">确认新密码</label>
                        <input 
                          type="password" 
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          minLength={8}
                          className="w-full bg-transparent border border-[var(--border-color)] rounded-lg px-4 py-3 focus:border-[var(--color-silicon)] outline-none transition-colors text-[var(--foreground)]"
                          placeholder="再次输入新密码"
                        />
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={passwordLoading}
                        className="w-full mt-6 flex items-center justify-center gap-2 bg-[var(--color-silicon)] text-[var(--background)] font-bold font-mono px-8 py-4 rounded-lg uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50"
                      >
                        {passwordLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>处理中...</span>
                          </>
                        ) : (
                          <>
                            确认修改
                          </>
                        )}
                      </motion.button>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center"
                    >
                      <span className="text-3xl">✓</span>
                    </motion.div>
                    <h3 className="text-2xl font-bold text-[var(--foreground)] mb-2">修改成功</h3>
                    <p className="font-serif opacity-80">
                      密码已成功更新。
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
