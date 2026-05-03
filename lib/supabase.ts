import { createClient } from '@supabase/supabase-js'

// 환경변수 미설정 시 빌드 실패 방지 — 페이지는 빈 데이터 상태로 렌더링됨
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'placeholder-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
