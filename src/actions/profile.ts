'use server'

import { createServerSupabaseClient } from '@/lib/supabase-server'
import { sanitizeText } from '@/lib/utils'
import { revalidatePath } from 'next/cache'

export async function createUserProfile(userId: string, username: string) {
  const cleanUsername = sanitizeText(username, 50)

  if (!cleanUsername || cleanUsername.length < 2) {
    return { success: false, error: '用户名至少需要2个字符。' }
  }

  try {
    const supabase = await createServerSupabaseClient()

    // Generate resident_id: AW·TIMESTAMP·USER_ID_PREFIX
    const residentId = `AW·${Date.now().toString().slice(-6)}·${userId.slice(0, 4).toUpperCase()}`

    const { error } = await supabase.from('profiles').upsert({
      id: userId,
      username: cleanUsername,
      resident_id: residentId,
    })

    if (error) {
      console.error('[CreateProfile Error]', error)
      return { success: false, error: '创建档案失败。' }
    }

    // Revalidate profile page to show new data
    revalidatePath('/profile')

    return { success: true, residentId }
  } catch (err) {
    console.error('[CreateProfile Exception]', err)
    return { success: false, error: '服务器错误。' }
  }
}
