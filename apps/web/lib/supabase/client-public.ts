import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database.types'

/**
 * Cliente de Supabase puro y sin cookies para lecturas estáticas (SSG/ISR).
 * Utilízalo EXCLUSIVAMENTE para leer datos públicos como catálogos, servicios y planes.
 * No genera Opt-In al Dynamic Server Usage en Next.js.
 */
export function createPublicClient() {
    return createSupabaseClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
}
