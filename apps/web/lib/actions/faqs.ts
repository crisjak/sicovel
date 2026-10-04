'use server'

import { createClient } from '../supabase/server'

export interface FaqItem {
    id: string
    pregunta: string
    respuesta: string
    categoria: string
    orden: number
}

/**
 * Obtiene las FAQs activas desde Supabase, ordenadas por su campo `orden`.
 * Retorna array vacío como fallback seguro si Supabase falla.
 */
export async function getFaqsActivas(): Promise<FaqItem[]> {
    try {
        const supabase = createClient()

        const { data, error } = await supabase
            .from('faqs')
            .select('id, pregunta, respuesta, categoria, orden')
            .eq('es_activo', true)
            .order('orden', { ascending: true })

        if (error) {
            console.error('Error fetching FAQs desde Supabase:', error.message)
            return []
        }

        return data ?? []
    } catch (e) {
        console.error('Error inesperado en getFaqsActivas:', e)
        return []
    }
}
