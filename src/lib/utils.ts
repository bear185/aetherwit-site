/**
 * Shared utility functions for Aetherwit.
 */

/** Generate a deterministic hash from a string */
export function hashCode(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

/** Generate unique frequency bar heights from resident_id */
export function generateFrequencyBars(id: string, count: number = 48): number[] {
  const bars: number[] = []
  const base = hashCode(id)
  for (let i = 0; i < count; i++) {
    const seed = Math.sin(base * (i + 1) * 0.017) * 10000
    const normalized = ((seed - Math.floor(seed)) * 0.7) + 0.15 // 15% - 85% height
    bars.push(normalized)
  }
  return bars
}

/** Generate a "resonance index" base from resident_id (deterministic) */
export function getResonanceBase(id: string): number {
  const h = hashCode(id)
  return 60 + (h % 30) // 60-89 base range
}

/**
 * Sanitize a text input: trim whitespace and enforce max length.
 * Returns empty string if input is nullish.
 */
export function sanitizeText(input: string | null | undefined, maxLength: number = 500): string {
  if (!input) return ''
  return input.trim().slice(0, maxLength)
}

/**
 * Basic email format validation.
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
