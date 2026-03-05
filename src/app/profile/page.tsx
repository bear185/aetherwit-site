"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Terminal,
  Lock,
  LogOut,
  Loader2,
  X,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { createClient } from "@/lib/supabase-browser";
import { getResonanceBase } from "@/lib/utils";
import { IdentityCard } from "@/components/profile/IdentityCard";
import { StatusDashboard } from "@/components/profile/StatusDashboard";
import { FrequencyVisualization } from "@/components/profile/FrequencyVisualization";

interface Profile {
  id: string;
  username: string;
  resident_id: string;
  created_at?: string;
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
        setProfile({
          id: user.id,
          username: user.user_metadata?.username || user.email?.split("@")[0] || "Resident",
          resident_id: `AW·${Date.now().toString().slice(-6)}·${user.id.slice(0, 4).toUpperCase()}`,
          created_at: user.created_at,
        });
      }
      setLoading(false);
    };

    fetchProfile();
  }, [user, authLoading, router]);

  // Animate resonance index fluctuation (reduced frequency for performance)
  useEffect(() => {
    const interval = setInterval(() => {
      setResonanceOffset(Math.sin(Date.now() * 0.001) * 5);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Calculate days since registration
  const daysSinceJoin = useMemo(() => {
    if (!profile?.created_at) return 0;
    const created = new Date(profile.created_at);
    const now = new Date();
    return Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
  }, [profile?.created_at]);

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
          className="w-full"
        >
          <IdentityCard
            username={profile.username}
            residentId={profile.resident_id}
            email={user.email || ""}
            createdAt={profile.created_at}
          />
        </motion.div>

        {/* Status Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <StatusDashboard
            daysSinceJoin={daysSinceJoin}
            resonanceValue={parseFloat(resonanceValue)}
            signalStrength={signalStrength}
          />
        </motion.div>

        {/* Personal Frequency Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="w-full"
        >
          <FrequencyVisualization residentId={profile.resident_id} />
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
