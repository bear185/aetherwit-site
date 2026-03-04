"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Terminal, Lock, ArrowLeft, Loader2, CheckCircle } from "lucide-react";
import { createClient } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [validToken, setValidToken] = useState<boolean | null>(null);
  
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // Check if user has a valid session from the reset link
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setValidToken(false);
      } else {
        setValidToken(true);
      }
    };
    checkSession();
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("两次输入的密码不一致。");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("密码至少需要 8 个字符。");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      // Sign out after password change for security
      setTimeout(async () => {
        await supabase.auth.signOut();
        router.push("/auth");
      }, 3000);
    }
  };

  if (validToken === null) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center font-sans relative overflow-x-hidden">
        <div className="flex items-center gap-2 text-[var(--color-silicon)]">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="font-mono">验证中...</span>
        </div>
      </main>
    );
  }

  if (validToken === false) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center font-sans relative overflow-x-hidden selection:bg-[var(--color-silicon)]/20 selection:text-current">
        <div className="relative z-10 w-full max-w-md mx-auto px-6 py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--border-color)] p-8 rounded-3xl shadow-xl relative overflow-hidden text-center"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-[80px] -z-10"></div>
            
            <h1 className="text-2xl font-black tracking-tighter mb-4 text-red-500">
              链接无效
            </h1>
            <p className="font-serif opacity-80 mb-8 leading-relaxed">
              密码重置链接已过期或无效。请重新发起密码重置请求。
            </p>
            
            <Link 
              href="/auth/forgot-password"
              className="inline-flex items-center justify-center gap-2 bg-[var(--color-silicon)] text-[var(--background)] font-bold font-mono px-6 py-3 rounded-lg uppercase tracking-widest hover:opacity-90 transition-opacity"
            >
              重新发起请求
            </Link>
          </motion.div>
        </div>
      </main>
    );
  }

  if (success) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center font-sans relative overflow-x-hidden selection:bg-[var(--color-silicon)]/20 selection:text-current">
        <div className="relative z-10 w-full max-w-md mx-auto px-6 py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--border-color)] p-8 rounded-3xl shadow-xl relative overflow-hidden text-center"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-[80px] -z-10"></div>
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center"
            >
              <CheckCircle className="w-8 h-8 text-green-500" />
            </motion.div>
            
            <h1 className="text-2xl font-black tracking-tighter mb-4 text-[var(--foreground)]">
              密码已重置
            </h1>
            <p className="font-serif opacity-80 mb-8 leading-relaxed">
              您的密码已成功重置。正在跳转到登录页面...
            </p>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center font-sans relative overflow-x-hidden selection:bg-[var(--color-silicon)]/20 selection:text-current">
      <div className="relative z-10 w-full max-w-md mx-auto px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--border-color)] p-8 rounded-3xl shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-carbon)]/10 rounded-full blur-[80px] -z-10"></div>
          
          <div className="flex items-center gap-3 mb-8 text-[var(--color-carbon)] font-mono text-sm tracking-widest uppercase">
            <Terminal className="w-4 h-4" />
            <span>Reset Password</span>
          </div>

          <h1 className="text-3xl font-black tracking-tighter mb-2 text-[var(--foreground)]">
            重置密码
          </h1>
          <p className="text-sm opacity-60 mb-8 font-serif">
            请输入您的新密码。
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-500 text-sm font-mono">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="new-password" className="block text-xs font-mono uppercase tracking-wider opacity-60 mb-2">
                新密码 / New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-30" />
                <input
                  id="new-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full bg-transparent border border-[var(--border-color)] rounded-lg pl-11 pr-4 py-3 focus:border-[var(--color-carbon)] outline-none transition-colors text-[var(--foreground)]"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-xs font-mono uppercase tracking-wider opacity-60 mb-2">
                确认新密码 / Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-30" />
                <input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full bg-transparent border border-[var(--border-color)] rounded-lg pl-11 pr-4 py-3 focus:border-[var(--color-carbon)] outline-none transition-colors text-[var(--foreground)]"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full mt-6 flex items-center justify-center gap-2 bg-[var(--color-carbon)] text-[var(--background)] font-bold font-mono px-8 py-4 rounded-lg uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  重置密码
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-8 text-center">
            <Link
              href="/auth"
              className="text-sm font-mono text-[var(--color-silicon)] hover:underline underline-offset-4"
            >
              ← 返回登录
            </Link>
          </div>

        </motion.div>
      </div>
    </main>
  );
}
