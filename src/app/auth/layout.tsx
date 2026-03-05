import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '登录 / 注册',
  description: '登录或注册成为 Aetherwit 宇宙的居民。',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
