import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { SectionEyebrow } from '@/components/ui/SectionEyebrow'
import { formatPrecioCLP } from '@/data/services-data'
import { getServiciosComerciales } from '@/lib/repositories/servicios.repository'
import { siteConfig } from '@/config/site'

// Helper para obtener icono por nombre
function getIcon(iconName: string): LucideIcon {
    const icons = LucideIcons as unknown as Record<string, LucideIcon>
    return icons[iconName] || LucideIcons.Star
}

// Pre-renderizamos estáticamente la página para velocidad ultra rápida,
// re-validación cada 60 seg en background.
export const revalidate = 60

export const metadata = {
    title: siteConfig.seo.titleTemplate('Nuestros Servicios'),
    description: `Conoce todos los servicios digitales de ${siteConfig.name}: Landing Pages, Web Informativa y E-commerce. Soluciones tecnológicas de alto rendimiento para tu negocio.`,
}

export default async function ServiciosPage(): Promise<React.JSX.Element> {
    // 🗄️ Inyección de datos Server-Side (Supabase -> Mappers -> UI)
    const data = await getServiciosComerciales();
    
    const serviciosVisibles = data
        .filter((s) => s.visible)
        .sort((a, b) => a.orden - b.orden)

    return (
        <main className="flex flex-col">
            {/* Hero de Servicios */}
            <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">

                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <SectionEyebrow text="Soluciones Digitales" />
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl mx-auto drop-shadow-sm">
                        <SectionTitle text="Nuestros Servicios" />
                    </h1>
                    <p className="mt-6 text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                        Soluciones tecnológicas de alto rendimiento diseñadas para cada etapa de tu negocio. Desde una landing page hasta una tienda online completa.
                    </p>
                </div>
            </section>

            {/* Grid de Servicios */}
            <section className="pb-16 lg:pb-24 relative px-4">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {serviciosVisibles.map((servicio) => {
                            const Icon = getIcon(servicio.icono)
                            const tieneMultiplesPlanes = servicio.planes.length > 0

                            return (
                                <div
                                    key={servicio.slug}
                                    className={`group relative bg-white dark:bg-slate-800/50 rounded-2xl border overflow-hidden hover:shadow-xl hover:shadow-blue-500/10 transition-all ${
                                        servicio.es_destacado
                                            ? 'border-blue-400 dark:border-cyan-500/50 ring-1 ring-blue-200/50 dark:ring-cyan-500/20'
                                            : 'border-zinc-200 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-700'
                                    }`}
                                >
                                    {/* ... el resto del JSX se mantiene igual ... */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                                    {servicio.es_destacado && (
                                        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-center py-1.5 text-xs font-bold uppercase tracking-widest">
                                            Más Solicitado
                                        </div>
                                    )}

                                    <div className="relative z-10 p-8">
                                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white mb-6 shadow-lg shadow-blue-500/20">
                                            <Icon className="w-7 h-7" />
                                        </div>

                                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {servicio.nombre}
                                        </h2>

                                        <p className="text-zinc-600 dark:text-zinc-400 mb-5 leading-relaxed text-sm">
                                            {servicio.descripcion_corta}
                                        </p>

                                        <div className="mb-6">
                                            {servicio.modalidad === 'pago_unico' && servicio.precio_base_clp ? (
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-2xl font-extrabold text-zinc-900 dark:text-white">
                                                        {formatPrecioCLP(servicio.precio_base_clp)}
                                                    </span>
                                                    <span className="text-xs text-zinc-400 dark:text-zinc-500">pago único</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-lg font-bold text-blue-600 dark:text-cyan-400">
                                                        {servicio.planes.length} planes disponibles
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {!tieneMultiplesPlanes && servicio.features && (
                                            <ul className="space-y-2 mb-8">
                                                {servicio.features.slice(0, 5).map((feature, featureIndex) => (
                                                    <li
                                                        key={featureIndex}
                                                        className="flex items-center gap-2.5 text-sm text-zinc-700 dark:text-zinc-300"
                                                    >
                                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        {tieneMultiplesPlanes && (
                                            <ul className="space-y-2 mb-8">
                                                {servicio.planes.map((plan) => (
                                                    <li
                                                        key={plan.id}
                                                        className="flex items-center justify-between text-sm"
                                                    >
                                                        <span className={`font-medium ${plan.es_recomendado ? 'text-blue-600 dark:text-cyan-400' : 'text-zinc-700 dark:text-zinc-300'}`}>
                                                            {plan.nombre}
                                                        </span>
                                                        <span className="text-zinc-500 dark:text-zinc-400 font-semibold">
                                                            {formatPrecioCLP(plan.precio_clp)}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        <Link
                                            href={servicio.cta_href}
                                            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl hover:from-blue-700 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 group-hover:gap-3"
                                        >
                                            {servicio.cta_texto || 'Saber más'}
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-16 lg:py-24 px-4">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative max-w-3xl mx-auto text-center p-8 lg:p-12 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                        <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/5 rounded-full blur-3xl" />

                        <div className="relative z-10">
                            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
                                ¿No estás seguro qué servicio necesitas?
                            </h2>
                            <p className="text-zinc-600 dark:text-zinc-400 text-lg mb-8 max-w-xl mx-auto">
                                Hablemos de tu negocio y te recomendaremos la solución tecnológica que mejor se adapte a tus objetivos comerciales.
                            </p>
                            <Link
                                href="/contacto"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-medium hover:scale-105 transition-transform"
                            >
                                Conversemos sobre tu proyecto
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
