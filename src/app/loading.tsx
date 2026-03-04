export default function Loading() {
  return (
    <main className="min-h-screen flex items-center justify-center font-sans">
      <div className="flex items-center gap-3 text-[var(--color-silicon)] font-mono text-sm animate-pulse">
        <div className="w-2 h-2 rounded-full bg-[var(--color-silicon)]" />
        <span>正在同步...</span>
      </div>
    </main>
  );
}
