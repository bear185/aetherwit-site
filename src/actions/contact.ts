'use server'

import { createServerSupabaseClient } from '@/lib/supabase-server'
import { sanitizeText, isValidEmail } from '@/lib/utils'
import { checkRateLimit } from '@/lib/rate-limit'
import { headers } from 'next/headers'

export async function submitContactMessage(formData: FormData) {
  const headersList = await headers()
  const ip = headersList.get('x-forwarded-for')?.split(',')[0]?.trim() 
    || headersList.get('cf-connecting-ip') 
    || 'unknown'

  // Rate limiting: 3 requests per minute per IP
  const rateLimit = checkRateLimit(ip, { maxRequests: 3, windowMs: 60_000 })
  if (!rateLimit.success) {
    return { success: false, error: '请求过于频繁，请稍后再试。' }
  }

  const name = sanitizeText(formData.get('name') as string, 100)
  const email = sanitizeText(formData.get('email') as string, 255)
  const message = sanitizeText(formData.get('message') as string, 2000)

  // Validation
  if (!name || name.length < 1) {
    return { success: false, error: '请输入您的称呼。' }
  }

  if (!isValidEmail(email)) {
    return { success: false, error: '请输入有效的邮箱地址。' }
  }

  if (!message || message.length < 10) {
    return { success: false, error: '消息至少需要10个字符。' }
  }

  try {
    const supabase = await createServerSupabaseClient()

    const { error } = await supabase.from('contact_messages').insert([
      {
        name,
        email,
        message,
        created_at: new Date().toISOString(),
      },
    ])

    if (error) {
      console.error('[ContactSubmit Error]', error)
      return { success: false, error: '发送失败，请稍后重试。' }
    }

    return { success: true }
  } catch (err) {
    console.error('[ContactSubmit Exception]', err)
    return { success: false, error: '服务器错误，请稍后重试。' }
  }
}
