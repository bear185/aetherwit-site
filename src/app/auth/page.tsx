"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Terminal, Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase-browser";
import { isValidEmail, sanitizeText } from "@/lib/utils";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    if (!isValidEmail(email)) {
      setError("请输入有效的邮箱地址。");
      setLoading(false);
      return;
    }

    if (!isLogin) {
      if (password.length < 8) {
        setError("密码至少需要 8 个字符。");
        setLoading(false);
        return;
      }
      const cleanUsername = sanitizeText(username, 50);
      if (!cleanUsername || cleanUsername.length < 2) {
        setError("用户名需要 2-50 个字符。");
        setLoading(false);
        return;
      }
    }

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        router.push("/");
        router.refresh();
      }
    } else {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: sanitizeText(username, 50),
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
      } else {
        setMessage("注册成功！请检查邮箱确认链接，然后登录。");
        setIsLogin(true);
      }
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center font-sans relative overflow-x-hidden selection:bg-[var(--color-silicon)]/20 selection:text-current">
      <div className="relative z-10 w-full max-w-md mx-auto px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--border-color)] p-8 rounded-3xl shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-silicon)]/10 rounded-full blur-[80px] -z-10"></div>
          
          <div className="flex items-center gap-3 mb-8 text-[var(--color-silicon)] font-mono text-sm tracking-widest uppercase">
            <Terminal className="w-4 h-4" />
            <span>身份认证</span>
          </div>

          <h1 className="text-3xl font-black tracking-tighter mb-2 text-[var(--foreground)]">
            {isLogin ? "登录" : "注册"}
          </h1>
          <p className="text-sm opacity-60 mb-8 font-serif">
            {isLogin 
              ? "欢迎回来，碳基生命。" 
              : "成为 Aetherwit 宇宙的第一批居民。"}
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-500 text-sm font-mono">{error}</p>
            </div>
          )}

          {message && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <p className="text-green-500 text-sm font-mono">{message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label htmlFor="auth-username" className="block text-xs font-mono uppercase tracking-wider opacity-60 mb-2">
                  昵称
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-30" />
                  <input
                    id="auth-username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required={!isLogin}
                    minLength={2}
                    maxLength={50}
                    className="w-full bg-transparent border border-[var(--border-color)] rounded-lg pl-11 pr-4 py-3 focus:border-[var(--color-silicon)] outline-none transition-colors text-[var(--foreground)]"
                    placeholder="Choose a username"
                  />
                </div>
              </div>
            )}
            
            <div>
              <label htmlFor="auth-email" className="block text-xs font-mono uppercase tracking-wider opacity-60 mb-2">
                邮箱
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-30" />
                <input
                  id="auth-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="w-full bg-transparent border border-[var(--border-color)] rounded-lg pl-11 pr-4 py-3 focus:border-[var(--color-silicon)] outline-none transition-colors text-[var(--foreground)]"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="auth-password" className="block text-xs font-mono uppercase tracking-wider opacity-60 mb-2">
                密码
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-30" />
                <input
                  id="auth-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  className="w-full bg-transparent border border-[var(--border-color)] rounded-lg pl-11 pr-4 py-3 focus:border-[var(--color-silicon)] outline-none transition-colors text-[var(--foreground)]"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full mt-6 flex items-center justify-center gap-2 bg-[var(--color-silicon)] text-[var(--background)] font-bold font-mono px-8 py-4 rounded-lg uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>处理中...</span>
                </>
              ) : (
                <>
                  {isLogin ? "登录" : "注册"}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>

          {isLogin && (
            <div className="mt-4 text-center">
              <Link
                href="/auth/forgot-password"
                className="text-xs font-mono text-[var(--color-carbon)] hover:underline underline-offset-4"
              >
                忘记密码？
              </Link>
            </div>
          )}

          <div className="mt-8 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError(null);
                setMessage(null);
              }}
              className="text-sm font-mono text-[var(--color-silicon)] hover:underline underline-offset-4"
            >
              {isLogin ? (
                <>没有账号？<span className="font-bold">立即注册</span></>
              ) : (
                <>已有账号？<span className="font-bold">立即登录</span></>
              )}
            </button>
          </div>

        </motion.div>

        <Link href="/" className="block text-center mt-8 text-sm font-mono opacity-40 hover:opacity-100 transition-opacity">
          ← 返回首页
        </Link>
      </div>
    </main>
  );
}
