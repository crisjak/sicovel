import type { Database } from '@/types/database.types'
import type { ServicioComercial, PlanComercial } from '@/types/services'
import { CONFIG_VISUAL_SERVICIOS } from '@/config/ui-services'

type CategoriaDB = Database['public']['Tables']['categorias_servicio']['Row']
type PlanDB = Database['public']['Tables']['planes']['Row']

/**
 * Combina una fila de la tabla `planes` con la estructura UI requerida.
 * V5: el campo comercial de features es `caracteristicas` (JSON array de strings).
 * El precio vigente es siempre `precio_unico_clp`.
 */
export function mapPlanDbToUI(planDb: PlanDB, ordenIndex: number): PlanComercial {
    const caracteristicas = Array.isArray(planDb.caracteristicas)
        ? (planDb.caracteristicas as string[])
        : []

    const exclusiones = Array.isArray(planDb.exclusiones)
        ? (planDb.exclusiones as string[])
        : []

    const audiencia = Array.isArray(planDb.audiencia)
        ? (planDb.audiencia as string[])
        : []

    return {
        id: planDb.id,
        nivel: planDb.nivel as 'unico' | 'basico' | 'pro' | 'premium',
        nombre: planDb.nombre,
        descripcion: planDb.descripcion_corta || `Plan ${planDb.nivel} para tu negocio.`,
        precio_clp: planDb.precio_unico_clp,
        // ── Campos promo (nuevas columnas en DB) ────────────────────────
        precio_oferta_clp: planDb.precio_oferta_clp ?? null,
        promo_etiqueta:   planDb.promo_etiqueta ?? null,
        promo_activa:     planDb.promo_activa ?? false,
        promo_inicio:     planDb.promo_inicio ?? null,
        promo_fin:        planDb.promo_fin ?? null,
        // ────────────────────────────────────────────────────────────────
        features: caracteristicas,
        exclusiones: exclusiones,
        audiencia: audiencia,
        cta_texto: 'Solicitar este plan',
        cta_href: `/contacto?servicio=${planDb.categoria_id}&plan=${planDb.nivel}`,
        es_recomendado: planDb.es_destacado,
        orden: planDb.orden ?? (ordenIndex + 1),
    }
}

/**
 * Combina una fila `categorias_servicio` con sus `planes` hijo.
 * Asigna presentación estética basada en el Diccionario UI.
 */
export function mapCategoriaDbToUI(categoriaDb: CategoriaDB, planesDb: PlanDB[] = []): ServicioComercial {
    // 1. Filtrar y ordenar planes por la columna `orden` de la V5
    const planesFiltrados = planesDb.filter(p => p.categoria_id === categoriaDb.id && p.es_activo !== false)
    const planesOrdenados = planesFiltrados.sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0))

    const planesUI = planesOrdenados.map((p, index) => mapPlanDbToUI(p, index))

    // 2. Extraer configuración estética pura (sin alterar costos/DB)
    const configUI = CONFIG_VISUAL_SERVICIOS[categoriaDb.slug] || {
        icono: 'Star',
        es_destacado: false,
        orden: 99,
        modalidad_ui: 'por_plan'
    }

    return {
        slug: categoriaDb.slug,
        nombre: categoriaDb.nombre,
        descripcion_corta: categoriaDb.descripcion || '',
        descripcion_completa: categoriaDb.descripcion || '',
        icono: configUI.icono,
        modalidad: configUI.modalidad_ui,
        precio_base_clp: planesUI[0]?.precio_clp,
        precio_texto: 'pago único',
        features: planesUI[0]?.features,
        exclusiones: planesUI[0]?.exclusiones,
        audiencia: planesUI[0]?.audiencia,
        planes: planesUI,
        cta_texto: 'Cotizar ahora',
        cta_href: '/contacto?servicio=' + categoriaDb.slug,
        es_destacado: configUI.es_destacado,
        orden: configUI.orden,
        visible: true,
        // Campo extendido para el carrusel (imagen subida via admin)
        imagen_url: categoriaDb.imagen_url ?? null,
    }
}
