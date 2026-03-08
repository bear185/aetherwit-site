import type { Metadata } from "next";
import { Inter, Noto_Serif, Fira_Code } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const notoSerif = Noto_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const firaCode = Fira_Code({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Aetherwit | AGI Playground",
    template: "%s | Aetherwit",
  },
  description: "Aetherwit 是一个两人 & AI 实验室。碳硅共生的 AGI 游乐场。",
  metadataBase: new URL("https://aetherwit.com"),
  openGraph: {
    title: "Aetherwit | AGI Playground",
    description: "碳硅共生的 AGI 游乐场",
    siteName: "Aetherwit",
    locale: "zh_CN",
    type: "website",
    url: "https://aetherwit.com",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Aetherwit - 碳硅共生的 AGI 游乐场",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aetherwit | AGI Playground",
    description: "碳硅共生的 AGI 游乐场",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${notoSerif.variable} ${firaCode.variable} antialiased min-h-screen relative selection:bg-[var(--color-silicon)]/30 selection:text-current`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange={false}>
          <AuthProvider>
            <div className="scanline"></div>
            <Navbar />
            <div className="fixed top-24 right-4 z-50 flex flex-col gap-3">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
            <div className="flex flex-col min-h-screen">
              <div className="flex-grow">{children}</div>
              <Footer />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
