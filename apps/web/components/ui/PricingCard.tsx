'use client'

import Link from 'next/link'
import { Check, X, Star, Tag } from 'lucide-react'
import type { PlanComercial } from '@/types/services'
import { getDisplayPrice, formatCLP } from '@/lib/pricing'

interface PricingCardProps {
    plan: PlanComercial
    /** Color accent del servicio padre */
    accentClass?: string
    /** Si es true, oculta el badge de "Más recomendado" aunque el plan lo tenga activado */
    hideRecommendBadge?: boolean
}

export function PricingCard({ plan, accentClass = 'from-blue-600 to-cyan-500', hideRecommendBadge = false }: PricingCardProps): React.JSX.Element {
    // ── Toda la lógica de precio vive en getDisplayPrice ──────────────────
    const display = getDisplayPrice(plan)

    return (
        <div
            className={`relative flex flex-col bg-white dark:bg-slate-800/50 rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-xl ${
                plan.es_recomendado
                    ? 'border-blue-400 dark:border-cyan-500 shadow-lg shadow-blue-500/10 ring-1 ring-blue-400/30 dark:ring-cyan-500/20 scale-[1.02] lg:scale-105'
                    : 'border-zinc-200 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-700'
            }`}
        >
            {/* Badge Recomendado */}
            {plan.es_recomendado && !hideRecommendBadge && (
                <div className={`bg-gradient-to-r ${accentClass} text-white text-center py-2 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-1.5`}>
                    <Star className="w-3.5 h-3.5 fill-current" />
                    Más Recomendado
                </div>
            )}

            <div className={`p-7 sm:p-8 flex flex-col flex-1 ${plan.es_recomendado ? '' : 'pt-8'}`}>
                {/* Nombre del Plan */}
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                    {plan.nombre}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1.5 leading-relaxed">
                    {plan.descripcion}
                </p>

                {/* Audiencia (Arriba) */}
                {plan.audiencia.length > 0 && (
                    <p className="text-[13px] text-zinc-500/90 dark:text-zinc-400/90 mt-3 font-medium">
                        Ideal para: <span className="text-zinc-700 dark:text-zinc-300">{plan.audiencia.join(' · ')}</span>
                    </p>
                )}

                {/* ── Bloque de Precio ─────────────────────────────── */}
                <div className="mt-6 mb-1">
                    {display.enOferta ? (
                        <div className="flex flex-col items-start mb-0.5">
                            {/* Fila superior: Badge y Precio Tachado */}
                            <div className="flex flex-wrap items-center gap-3.5 mb-2">
                                {display.etiqueta && (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-cyan-300 text-[11px] font-bold uppercase tracking-wide shadow-sm">
                                        <Tag className="w-3 h-3" />
                                        {display.etiqueta}
                                    </span>
                                )}
                                <span className="text-[15px] font-semibold text-zinc-500 dark:text-zinc-400 line-through decoration-zinc-400/70 dark:decoration-zinc-500/70">
                                    {formatCLP(display.precioAnterior!)}
                                </span>
                            </div>
                            
                            {/* Precio oferta destacado */}
                            <span className="text-4xl font-extrabold text-blue-600 dark:text-cyan-400 tracking-tight">
                                {formatCLP(display.precio)}
                            </span>
                        </div>
                    ) : (
                        <span className="text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight block">
                            {formatCLP(display.precio)}
                        </span>
                    )}
                </div>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-6">Pago único</p>

                {/* Separador */}
                <div className="border-t border-zinc-200 dark:border-zinc-700/50 my-4" />

                {/* Features Incluidas */}
                <div className="mb-4">
                    <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-3">
                        Incluye
                    </p>
                    <ul className="space-y-2.5">
                        {plan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-sm">
                                <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                                <span className="text-zinc-700 dark:text-zinc-300">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Exclusiones en Acordeón */}
                {plan.exclusiones.length > 0 && (
                    <div className="mb-4 mt-2">
                        <details className="group [&_summary::-webkit-details-marker]:hidden">
                            <summary className="flex items-center gap-2 cursor-pointer text-[13px] font-medium text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors select-none">
                                <span className="flex-1 border-t border-zinc-200 dark:border-zinc-700/50"></span>
                                Ver qué no incluye
                                <span className="flex-1 border-t border-zinc-200 dark:border-zinc-700/50"></span>
                            </summary>
                            <ul className="space-y-2 mt-4 pt-1">
                                {plan.exclusiones.map((excl, idx) => (
                                    <li key={idx} className="flex items-start gap-2.5 text-[13px]">
                                        <X className="w-3.5 h-3.5 text-zinc-300 dark:text-zinc-600 flex-shrink-0 mt-0.5" />
                                        <span className="text-zinc-500 dark:text-zinc-400">{excl}</span>
                                    </li>
                                ))}
                            </ul>
                        </details>
                    </div>
                )}


                {/* Botón CTA */}
                <Link
                    href={plan.cta_href}
                    className={`block w-full text-center py-3.5 px-6 rounded-xl font-semibold transition-all duration-300 mt-auto ${
                        plan.es_recomendado
                            ? `bg-gradient-to-r ${accentClass} text-white hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5`
                            : 'bg-zinc-100 dark:bg-slate-700 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-slate-600 border border-zinc-200 dark:border-zinc-700'
                    }`}
                >
                    {plan.cta_texto}
                </Link>
            </div>
        </div>
    )
}
