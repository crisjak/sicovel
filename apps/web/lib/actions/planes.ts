'use server'

import { createClient } from '../supabase/server'

// NOTA: Las funciones privilegiadas (getPlanesAdmin, updatePlan) están bloqueadas temporalmente (Fase B.1).
// La lógica original será restaurada desde Git cuando exista auth real en /control-sicovel.

/**
 * Obtiene los planes públicos y activos, con su respectiva categoría.
 * Esta función NO está bloqueada — es de lectura pública.
 */
export async function getPlanesActivos() {
  const supabase = createClient()

  try {
    const { data, error } = await supabase
      .from('planes')
      .select(`
        id,
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
        es_destacado,
        orden,
        categorias_servicio!inner (
          slug,
          nombre,
          es_activo
        )
      `)
      .eq('es_activo', true)
      .eq('categorias_servicio.es_activo', true)
      .order('orden', { ascending: true })

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    console.error('Error fetching planes:', error)
    return { data: null, error }
  }
}

/** BLOQUEADA (Fase B.1) — Restaurar desde Git cuando exista auth admin. */
export async function getPlanesAdmin() {
  return { data: [], error: 'Acción bloqueada por seguridad (Fase B.1)' }
}

/** BLOQUEADA (Fase B.1) — Restaurar desde Git cuando exista auth admin. */
export async function updatePlan(
  id: string,
  payload: {
    nombre?: string
    descripcion_corta?: string
    precio_unico_clp?: number
    precio_oferta_clp?: number | null
    promo_etiqueta?: string | null
    promo_activa?: boolean
    promo_inicio?: string | null
    promo_fin?: string | null
    es_destacado?: boolean
    es_activo?: boolean
  }
) {
  return { success: false, error: 'Acción bloqueada por seguridad (Fase B.1)' }
}
