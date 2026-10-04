'use server'

import { createClient } from '../supabase/server'

export interface TestimonioItem {
    id: string
    autor: string
    empresa: string | null
    cargo: string | null
    comentario: string
    avatar_url: string | null
    calificacion: number
    orden: number
}

/**
 * Obtiene los testimonios activos desde Supabase, ordenados por su campo `orden`.
 * Retorna array vacío como fallback seguro si Supabase falla.
 */
export async function getTestimoniosActivos(): Promise<TestimonioItem[]> {
    try {
        const supabase = createClient()

        const { data, error } = await supabase
            .from('testimonios')
            .select('id, autor, empresa, cargo, comentario, avatar_url, calificacion, orden')
            .eq('es_activo', true)
            .order('orden', { ascending: true })

        if (error) {
            console.error('Error fetching testimonios desde Supabase:', error.message)
            return []
        }

        return data ?? []
    } catch (e) {
        console.error('Error inesperado en getTestimoniosActivos:', e)
        return []
    }
}
