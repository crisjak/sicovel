/**
 * SICOVE - Tipos Comerciales
 * Interfaces para la oferta de servicios, planes y pricing.
 * Preparado para futura conexión con Supabase (tabla: planes, categorias_servicio).
 */

// ============================================
// PLAN COMERCIAL
// ============================================
export interface PlanComercial {
    /** Identificador único del plan (ej: 'web-basic') */
    id: string
    /** Nivel del plan alineado a DB (unico, basico, pro, premium) */
    nivel: 'unico' | 'basico' | 'pro' | 'premium'
    /** Nombre comercial visible (ej: 'Web Informativa Basic') */
    nombre: string
    /** Descripción corta orientada a venta */
    descripcion: string
    /** Precio regular en CLP como entero (sin decimales) */
    precio_clp: number
    /** Precio de oferta en CLP (undefined/null = sin oferta activa) */
    precio_oferta_clp?: number | null
    /** Etiqueta promo visible (ej: '20% OFF', 'Lanzamiento') */
    promo_etiqueta?: string | null
    /** Si true y precio_oferta_clp existe, se muestra el precio de oferta */
    promo_activa?: boolean
    /** Fecha ISO de inicio de la promo (null = sin restricción de inicio) */
    promo_inicio?: string | null
    /** Fecha ISO de expiración de la promo (null = sin expiración) */
    promo_fin?: string | null
    /** Lista de características incluidas */
    features: string[]
    /** Lista de exclusiones explícitas */
    exclusiones: string[]
    /** Audiencia objetivo */
    audiencia: string[]
    /** Texto del botón CTA */
    cta_texto: string
    /** Enlace del botón CTA */
    cta_href: string
    /** Este plan es el más recomendado / destacado */
    es_recomendado: boolean
    /** Orden de aparición visual */
    orden: number
}

// ============================================
// SERVICIO COMERCIAL
// ============================================
export type ModalidadPrecio = 'pago_unico' | 'por_plan'

export interface ServicioComercial {
    /** Slug identificador (ej: 'landing', 'ecommerce') */
    slug: string
    /** Nombre comercial visible */
    nombre: string
    /** Icono de Lucide (nombre del componente) */
    icono: string
    /** Descripción breve para cards de resumen */
    descripcion_corta: string
    /** Descripción larga para página de detalle */
    descripcion_completa: string
    /** Modalidad de cobro */
    modalidad: ModalidadPrecio
    /** Precio base CLP (solo para modalidad 'pago_unico') */
    precio_base_clp?: number
    /** Texto interpretativo del precio (ej: 'desde $149.990') */
    precio_texto?: string
    /** Features generales del servicio (solo si no tiene planes) */
    features?: string[]
    /** Exclusiones generales del servicio (solo si no tiene planes) */
    exclusiones?: string[]
    /** Audiencia objetivo general (solo si no tiene planes) */
    audiencia?: string[]
    /** Planes del servicio (vacío si es producto único) */
    planes: PlanComercial[]
    /** Texto del botón CTA principal */
    cta_texto: string
    /** Enlace del botón CTA principal */
    cta_href: string
    /** ¿El servicio debe mostrarse como destacado/featured? */
    es_destacado: boolean
    /** Orden de aparición visual */
    orden: number
    /** ¿Es visible en el sitio? (para admin futuro) */
    visible: boolean
    /** URL de imagen de fondo para el carrusel (subida vía admin) */
    imagen_url?: string | null
}
