'use server'

import { createPublicClient } from '../supabase/client-public'

export interface FaqItem {
    id: string
    pregunta: string
    respuesta: string
    categoria: string
    orden: number
}

import { getData } from '@/lib/data'

/**
 * Obtiene las FAQs activas.
 * Modo 100% datos locales (mocks) por defecto.
 */
export async function getFaqsActivas(): Promise<FaqItem[]> {
    if (process.env.NEXT_PUBLIC_ENABLE_SUPABASE === 'true') {
        try {
            const supabase = createPublicClient()

            const { data, error } = await supabase
                .from('faqs')
                .select('id, pregunta, respuesta, categoria, orden')
                .eq('es_activo', true)
                .order('orden', { ascending: true })

            if (!error && data && data.length > 0) {
                return data
            }
        } catch (e) {
            console.warn('Error fetching FAQs desde Supabase, usando mocks locales:', e)
        }
    }

    try {
        const siteData = getData()
        return siteData.faqsComerciales.items.map((item, i) => ({
            id: item.id,
            pregunta: item.pregunta,
            respuesta: item.respuesta,
            categoria: 'general',
            orden: i + 1,
        }))
    } catch {
        return []
    }
}
