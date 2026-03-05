import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '观测日志 | Build in Public',
  description: 'Aetherwit 的开发日志和思想切片，记录平行宇宙的生长过程。',
  openGraph: {
    title: 'Aetherwit | 观测日志',
    description: '记录碳硅共生宇宙的生长切片。',
  },
}

export default function LogsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
