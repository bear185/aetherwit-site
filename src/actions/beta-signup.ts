'use server'

import { createServerSupabaseClient } from '@/lib/supabase-server'
import { sanitizeText, isValidEmail } from '@/lib/utils'
import { checkRateLimit } from '@/lib/rate-limit'
import { headers } from 'next/headers'

export async function submitBetaSignup(formData: FormData) {
  const headersList = await headers()
  const ip = headersList.get('x-forwarded-for')?.split(',')[0]?.trim() 
    || headersList.get('cf-connecting-ip') 
    || 'unknown'

  // Rate limiting: 5 requests per minute per IP
  const rateLimit = checkRateLimit(ip, { maxRequests: 5, windowMs: 60_000 })
  if (!rateLimit.success) {
    return { success: false, error: '请求过于频繁，请稍后再试。' }
  }

  const name = sanitizeText(formData.get('name') as string, 100)
  const email = sanitizeText(formData.get('email') as string, 255)
  const message = sanitizeText(formData.get('message') as string, 1000)

  // Validation
  if (!name || name.length < 2) {
    return { success: false, error: '昵称至少需要2个字符。' }
  }

  if (!isValidEmail(email)) {
    return { success: false, error: '请输入有效的邮箱地址。' }
  }

  try {
    const supabase = await createServerSupabaseClient()

    const { error } = await supabase.from('beta_signups').insert([
      {
        name,
        email,
        message,
        created_at: new Date().toISOString(),
      },
    ])

    if (error) {
      console.error('[BetaSignup Error]', error)
      return { success: false, error: '提交失败，请稍后重试。' }
    }

    return { success: true }
  } catch (err) {
    console.error('[BetaSignup Exception]', err)
    return { success: false, error: '服务器错误，请稍后重试。' }
  }
}
