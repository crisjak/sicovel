import { createPublicClient } from '@/lib/supabase/client-public'
import { SERVICIOS_COMERCIALES } from '@/data/services-data'
import { mapCategoriaDbToUI } from '@/lib/mappers/servicios.mapper'
import type { ServicioComercial } from '@/types/services'

/**
 * Obtiene todos los servicios comerciales y sus planes desde Supabase.
 * Si falla o no hay conexión, hace un render seguro utilizando los mocks en memoria (`services-data.ts`).
 */
export async function getServiciosComerciales(): Promise<ServicioComercial[]> {
    try {
        const supabase = createPublicClient()
        
        // Petición paralela para optimizar tiempos si queremos, pero un join simple es mejor.
        // Consultamos categorías y emparejamos con planes.
        const { data: categorias, error: errorCat } = await supabase
            .from('categorias_servicio')
            .select(`
                id,
                slug,
                nombre,
                descripcion,
                orden,
                es_activo,
                imagen_url,
                creado_en,
                actualizado_en
            `)

        const { data: planes, error: errorPlanes } = await supabase
            .from('planes')
            .select(`
                id,
                categoria_id,
                nivel,
                nombre,
                descripcion_corta,
                precio_unico_clp,
                precio_oferta_clp,
                promo_etiqueta,
                promo_activa,
                promo_inicio,
                promo_fin,
                caracteristicas,
                exclusiones,
                audiencia,
                es_destacado,
                orden,
                es_activo,
                creado_en,
                actualizado_en
            `)
            .eq('es_activo', true)

        if (errorCat || errorPlanes || !categorias || categorias.length === 0) {
            console.warn("Supabase Fetch Falló o Base Vacía. Retornando Mocks de services-data.ts")
            return SERVICIOS_COMERCIALES
        }

        const serviciosMapeados = categorias.map(categoria => 
            mapCategoriaDbToUI(categoria, planes || [])
        )

        return serviciosMapeados.sort((a, b) => a.orden - b.orden)

    } catch (e) {
        console.error("Error crítico en getServiciosComerciales:", e)
        // SILENT FAIL (Resiliencia Extrema Frontend)
        return SERVICIOS_COMERCIALES
    }
}
