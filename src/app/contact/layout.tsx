import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '接入我们 | Contact',
  description: '加入 Aetherwit 的社会实验。如果你对硅基生命、平行宇宙或仅仅是"好玩"感兴趣，欢迎发送信号。',
  openGraph: {
    title: 'Aetherwit | 接入',
    description: '欢迎加入 Aetherwit 的社会实验。',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
