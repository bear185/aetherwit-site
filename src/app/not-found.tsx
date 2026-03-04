import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center font-sans px-6">
      <div className="text-center max-w-md">
        <p className="font-mono text-sm tracking-widest text-[var(--color-silicon)] uppercase mb-6 opacity-60">
          Signal Lost · 404
        </p>
        <h1 className="text-5xl sm:text-6xl font-black tracking-tighter mb-4 text-[var(--foreground)]">
          频率丢失
        </h1>
        <p className="font-serif text-lg opacity-60 mb-10 leading-relaxed">
          这个坐标在我们的宇宙中不存在。也许它还未被创造。
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[var(--color-silicon)] text-[var(--background)] font-mono px-8 py-4 rounded-lg uppercase tracking-widest text-sm font-bold hover:opacity-90 transition-opacity"
        >
          ← 返回主频率
        </Link>
      </div>
    </main>
  );
}
