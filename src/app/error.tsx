"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error details for debugging
    console.error("[Aetherwit Error]", {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
    });
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center font-sans px-6">
      <div className="text-center max-w-md">
        <p className="font-mono text-sm tracking-widest text-red-500 uppercase mb-6 opacity-80">
          System Error · 系统异常
        </p>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tighter mb-4 text-[var(--foreground)]">
          信号中断
        </h1>
        <p className="font-serif text-lg opacity-60 mb-10 leading-relaxed">
          遇到了意外错误。请尝试重新加载。
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 bg-[var(--color-silicon)] text-[var(--background)] font-mono px-8 py-4 rounded-lg uppercase tracking-widest text-sm font-bold hover:opacity-90 transition-opacity"
        >
          重新连接
        </button>
      </div>
    </main>
  );
}
