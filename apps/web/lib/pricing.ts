/**
 * SICOVEL — Pricing Helpers
 * 
 * Lógica centralizada de precios y promociones.
 * Separada de los componentes para poder testear, reutilizar y conectar a Supabase sin tocar UI.
 * 
 * NUNCA duplicar esta lógica en un componente.
 */

import type { PlanComercial } from '@/types/services'

// ─── Formateador CLP ─────────────────────────────────────────────────────────

const CLP_FORMATTER = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
})

/**
 * Formatea un entero CLP como string legible.
 * @example formatCLP(149990) → "$149.990"
 */
export function formatCLP(valor: number): string {
    return CLP_FORMATTER.format(valor)
}

// ─── Lógica de Promoción ─────────────────────────────────────────────────────

/**
 * Determina si un plan debe mostrar su precio de oferta en este momento.
 * 
 * Reglas:
 * 1. promo_activa debe ser `true`.
 * 2. precio_oferta_clp debe existir y ser > 0.
 * 3. Si promo_inicio está definido, la fecha actual debe ser >= promo_inicio.
 * 4. Si promo_fin está definido, la fecha actual debe ser <= promo_fin.
 */
export function shouldShowPromo(plan: PlanComercial): boolean {
    if (!plan.promo_activa) return false
    if (!plan.precio_oferta_clp || plan.precio_oferta_clp <= 0) return false

    const ahora = new Date()

    if (plan.promo_inicio) {
        const inicio = new Date(plan.promo_inicio)
        if (ahora < inicio) return false
    }

    if (plan.promo_fin) {
        const fin = new Date(plan.promo_fin)
        if (ahora > fin) return false
    }

    return true
}

// ─── Precio Visible ───────────────────────────────────────────────────────────

export interface DisplayPrice {
    /** Precio que se muestra grande/destacado */
    precio: number
    /** Precio normal tachado, solo presente si hay promo activa */
    precioAnterior?: number
    /** Etiqueta de la promo (ej: '20% OFF'), solo si hay promo activa */
    etiqueta?: string
    /** true si hay promo activa y se muestra el precio de oferta */
    enOferta: boolean
}

/**
 * Calcula el precio visible para un plan dado el estado de la promo.
 * Centraliza la decisión de qué precio mostrar en la UI.
 */
export function getDisplayPrice(plan: PlanComercial): DisplayPrice {
    const enOferta = shouldShowPromo(plan)

    if (enOferta && plan.precio_oferta_clp) {
        return {
            precio: plan.precio_oferta_clp,
            precioAnterior: plan.precio_clp,
            etiqueta: plan.promo_etiqueta ?? undefined,
            enOferta: true,
        }
    }

    return {
        precio: plan.precio_clp,
        enOferta: false,
    }
}
