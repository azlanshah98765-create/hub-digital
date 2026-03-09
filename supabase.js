// ============================================
// SUPABASE CONFIG — Hub Digital BPS
// ============================================
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const SUPABASE_URL  = 'https://bhfyomuoexvbwtrokgzc.supabase.co'
const SUPABASE_KEY  = 'sb_publishable_tDIMQe2qGD0tQ0iKD5pvDg_ws4RnykW'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// ── Auth helpers ──────────────────────────────

export async function getSession() {
  const { data } = await supabase.auth.getSession()
  return data.session
}

export async function getUser() {
  const { data } = await supabase.auth.getUser()
  return data.user
}

export async function getProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  return { data, error }
}

export async function signOut() {
  await supabase.auth.signOut()
  window.location.href = '/app/login.html'
}

// ── Guard: redirect to login if not authenticated ──
export async function requireAuth() {
  const session = await getSession()
  if (!session) {
    window.location.href = '/app/login.html'
    return null
  }
  return session
}

// ── Guard: redirect to hub if already logged in ──
export async function redirectIfAuth() {
  const session = await getSession()
  if (session) {
    window.location.href = '/app/hub.html'
  }
}
