import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '项目站与实验室',
  description: 'Aetherwit 正在推演的碳硅共存未来切片：Aetherwit Town、人生图鉴、硅基频率等实验项目。',
  openGraph: {
    title: 'Aetherwit | 项目站',
    description: '探索 Aetherwit 的实验项目：AI 小镇、人生图鉴等。',
  },
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
