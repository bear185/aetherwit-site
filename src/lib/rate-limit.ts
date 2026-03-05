/**
 * Simple in-memory rate limiter for Server Actions.
 * In production, consider using Redis or a database-backed solution.
 */

interface RateLimitEntry {
  count: number
  resetAt: number
}

const store = new Map<string, RateLimitEntry>()

// Clean up expired entries periodically
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of store) {
    if (now > entry.resetAt) {
      store.delete(key)
    }
  }
}, 60_000) // Clean every minute

interface RateLimitOptions {
  /** Max requests allowed in the window */
  maxRequests: number
  /** Time window in milliseconds */
  windowMs: number
}

interface RateLimitResult {
  success: boolean
  remaining: number
  resetAt: number
}

/**
 * Check rate limit for a given identifier (e.g. IP address).
 */
export function checkRateLimit(
  identifier: string,
  options: RateLimitOptions = { maxRequests: 5, windowMs: 60_000 }
): RateLimitResult {
  const now = Date.now()
  const entry = store.get(identifier)

  if (!entry || now > entry.resetAt) {
    // First request or window expired
    store.set(identifier, {
      count: 1,
      resetAt: now + options.windowMs,
    })
    return { success: true, remaining: options.maxRequests - 1, resetAt: now + options.windowMs }
  }

  if (entry.count >= options.maxRequests) {
    return { success: false, remaining: 0, resetAt: entry.resetAt }
  }

  entry.count++
  return { success: true, remaining: options.maxRequests - entry.count, resetAt: entry.resetAt }
}
