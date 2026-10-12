'use server'

import { createPublicClient } from '../supabase/client-public'

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

const MOCK_TESTIMONIOS: TestimonioItem[] = [
    {
        id: 'caso-floisa',
        autor: 'Floisa Sushi',
        empresa: 'Floisa Sushi',
        cargo: 'Web Informativa Pro / Catálogo Gastronómico',
        comentario: 'Plataforma web con catálogo digital de productos y menú interactivo, diseñada para recepción ágil de pedidos directamente por WhatsApp.',
        avatar_url: null,
        calificacion: 5,
        orden: 1,
    },
    {
        id: 'caso-silvana',
        autor: 'Silvana Terapia Ocupacional',
        empresa: 'Silvana Terapia Ocupacional',
        cargo: 'Landing Page Profesional',
        comentario: 'Sitio web enfocado en la atención cercana de pacientes, presentación de servicios de salud y captación directa mediante WhatsApp.',
        avatar_url: null,
        calificacion: 5,
        orden: 2,
    },
]

/**
 * Obtiene los testimonios activos.
 * Modo 100% datos locales (mocks) por defecto.
 */
export async function getTestimoniosActivos(): Promise<TestimonioItem[]> {
    if (process.env.NEXT_PUBLIC_ENABLE_SUPABASE === 'true') {
        try {
            const supabase = createPublicClient()

            const { data, error } = await supabase
                .from('testimonios')
                .select('id, autor, empresa, cargo, comentario, avatar_url, calificacion, orden')
                .eq('es_activo', true)
                .order('orden', { ascending: true })

            if (!error && data && data.length > 0) {
                return data
            }
        } catch (e) {
            console.warn('Error fetching testimonios desde Supabase, usando mocks locales:', e)
        }
    }

    return MOCK_TESTIMONIOS
}
