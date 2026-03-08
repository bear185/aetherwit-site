import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full py-10 mt-auto border-t border-[var(--border-color)] bg-[var(--background)]/80 backdrop-blur-xl relative z-20">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="opacity-60 font-mono text-xs uppercase tracking-widest text-center md:text-left">
          Aetherwit：双人 & AI 实验室 <br className="md:hidden" />
          <span className="opacity-40 mt-2 md:mt-0 inline-block">保留所有权利</span>
        </p>
        <div className="flex items-center gap-6 font-mono text-xs uppercase tracking-widest">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:text-[var(--color-silicon)] hover:opacity-100 hover:underline underline-offset-4 transition-all">GitHub</a>
          <span className="opacity-20">|</span>
          <Link href="/contact" className="opacity-60 hover:text-[var(--color-carbon)] hover:opacity-100 hover:underline underline-offset-4 transition-all">联系</Link>
        </div>
      </div>
    </footer>
  );
}
