"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Check } from "lucide-react";

const locales = ["zh-CN", "en-US"] as const;
type Locale = (typeof locales)[number];

const localeLabels: Record<Locale, { label: string; flag: string }> = {
  "zh-CN": { label: "简体中文", flag: "🇨🇳" },
  "en-US": { label: "English", flag: "🇺🇸" },
};

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLocale, setCurrentLocale] = useState<Locale>("zh-CN");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load saved locale from localStorage on mount
  useEffect(() => {
    const savedLocale = localStorage.getItem("aetherwit-locale") as Locale;
    if (savedLocale && locales.includes(savedLocale)) {
      setCurrentLocale(savedLocale);
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (locale: Locale) => {
    setCurrentLocale(locale);
    localStorage.setItem("aetherwit-locale", locale);
    setIsOpen(false);
    
    // TODO: In the future, implement actual language switching
    // For now, just show a notification that this feature is coming soon
    if (locale !== "zh-CN") {
      alert(`Language switching to ${localeLabels[locale].label} will be available in a future update!`);
    }
  };

  return (
    <div ref={dropdownRef} className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] backdrop-blur-xl hover:border-[var(--color-silicon)] transition-colors text-sm font-mono"
        aria-label="切换语言"
        aria-expanded={isOpen}
      >
        <Globe className="w-4 h-4 text-[var(--color-silicon)]" />
        <span className="hidden sm:inline">
          {localeLabels[currentLocale]?.label || "简体中文"}
        </span>
        <span className="sm:hidden">
          {localeLabels[currentLocale]?.flag || "🇨🇳"}
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-40 bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--border-color)] rounded-xl shadow-xl overflow-hidden z-50"
          >
            {locales.map((locale) => (
              <button
                key={locale}
                onClick={() => handleLanguageChange(locale)}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm font-mono hover:bg-[var(--color-silicon)]/10 transition-colors ${
                  currentLocale === locale
                    ? "text-[var(--color-silicon)] bg-[var(--color-silicon)]/5"
                    : "text-[var(--foreground)]"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>{localeLabels[locale].flag}</span>
                  <span>{localeLabels[locale].label}</span>
                </span>
                {currentLocale === locale && (
                  <Check className="w-4 h-4" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
