'use client'

import Link from 'next/link'
import * as LucideIcons from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Check, X, ArrowRight } from 'lucide-react'
import type { ServicioComercial } from '@/types/services'
import { formatPrecioCLP } from '@/data/services-data'
import { PricingCard } from './PricingCard'

interface ServiceBlockProps {
    servicio: ServicioComercial
}

function getIcon(iconName: string): LucideIcon {
    const icons = LucideIcons as unknown as Record<string, LucideIcon>
    return icons[iconName] || LucideIcons.Briefcase
}

export function ServiceBlock({ servicio }: ServiceBlockProps): React.JSX.Element {
    const Icon = getIcon(servicio.icono)
    const tieneMultiplesPlanes = servicio.planes.length > 0

    // ──────────────────────────────────────────
    // MODO: Producto único (Landing Page)
    // ──────────────────────────────────────────
    if (!tieneMultiplesPlanes) {
        return (
            <div id={servicio.slug} className="scroll-mt-24">
                {/* Encabezado del servicio */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white mb-5 shadow-lg shadow-blue-500/20">
                        <Icon className="w-7 h-7" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">
                        {servicio.nombre}
                    </h2>
                    <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                        {servicio.descripcion_completa}
                    </p>
                </div>

                {/* Card única ancha */}
                <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:shadow-xl hover:shadow-blue-500/5 transition-all">
                    <div className="p-8 sm:p-10">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
                            <div>
                                <p className="text-sm font-semibold text-blue-600 dark:text-cyan-400 uppercase tracking-wide mb-1">
                                    {servicio.modalidad === 'pago_unico' ? 'Pago único' : 'Por plan'}
                                </p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                                        {servicio.precio_base_clp
                                            ? formatPrecioCLP(servicio.precio_base_clp)
                                            : servicio.precio_texto}
                                    </span>
                                </div>
                            </div>
                            <Link
                                href={servicio.cta_href}
                                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl hover:from-blue-700 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 whitespace-nowrap"
                            >
                                {servicio.cta_texto}
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>

                        <div className="border-t border-zinc-200 dark:border-zinc-700/50 my-6" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Features */}
                            <div>
                                <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-4">
                                    Incluye
                                </p>
                                <ul className="space-y-3">
                                    {servicio.features?.map((f, i) => (
                                        <li key={i} className="flex items-start gap-2.5 text-sm">
                                            <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                                            <span className="text-zinc-700 dark:text-zinc-300">{f}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Exclusiones */}
                            <div>
                                <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide mb-4">
                                    No incluye
                                </p>
                                <ul className="space-y-3">
                                    {servicio.exclusiones?.map((e, i) => (
                                        <li key={i} className="flex items-start gap-2.5 text-sm">
                                            <X className="w-4 h-4 text-zinc-300 dark:text-zinc-600 flex-shrink-0 mt-0.5" />
                                            <span className="text-zinc-400 dark:text-zinc-500">{e}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Audiencia */}
                        {servicio.audiencia && servicio.audiencia.length > 0 && (
                            <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-700/50">
                                <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide mb-2">
                                    Ideal para
                                </p>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                    {servicio.audiencia.join(' · ')}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    // ──────────────────────────────────────────
    // MODO: Múltiples planes (Web Info / E-comm)
    // ──────────────────────────────────────────
    const plansSorted = [...servicio.planes].sort((a, b) => a.orden - b.orden)
    let gridCols = ''
    if (plansSorted.length === 1) {
        gridCols = 'grid-cols-1 max-w-[400px]'
    } else if (plansSorted.length === 2) {
        gridCols = 'grid-cols-1 md:grid-cols-2 max-w-4xl'
    } else {
        gridCols = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl'
    }

    return (
        <div id={servicio.slug} className="scroll-mt-24">
            {/* Encabezado del servicio */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white mb-5 shadow-lg shadow-blue-500/20">
                    <Icon className="w-7 h-7" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">
                    {servicio.nombre}
                </h2>
                <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                    {servicio.descripcion_completa}
                </p>
            </div>

            {/* Grid de PricingCards */}
            <div className={`grid ${gridCols} gap-6 lg:gap-8 mx-auto`}>
                {plansSorted.map((plan) => (
                    <PricingCard 
                        key={plan.id} 
                        plan={plan} 
                        hideRecommendBadge={plansSorted.length === 1}
                    />
                ))}
            </div>
        </div>
    )
}
