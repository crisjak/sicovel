import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(): Promise<NextResponse> {
  const supabase = createClient()
  await supabase.auth.signOut()
  return NextResponse.redirect(
    new URL('/control-sicovel/login', process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000')
  )
}
