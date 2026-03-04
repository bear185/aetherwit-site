import type { Metadata } from "next";
import { Inter, Noto_Serif, Fira_Code } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { ThemeToggle } from "@/components/ThemeToggle";
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${notoSerif.variable} ${firaCode.variable} antialiased min-h-screen relative selection:bg-[var(--color-silicon)]/30 selection:text-current`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AuthProvider>
            <div className="scanline"></div>
            <Navbar />
            <ThemeToggle />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
