import Link from 'next/link'
import { ArrowRight, UtensilsCrossed, HeartPulse, MessageCircle, Sparkles, CheckCircle2, ExternalLink } from 'lucide-react'
import type { TestimonioItem } from '@/lib/actions/testimonios'

interface TestimoniosSectionProps {
    testimonios?: TestimonioItem[]
}

interface ProyectoDestacado {
    id: string
    nombre: string
    categoria: string
    descripcion: string
    icon: typeof UtensilsCrossed
    tags: string[]
    beneficioClave: string
    liveUrl: string
    ctaHref: string
    badgeColor: string
    glowColor: string
}

const PROYECTOS_REALES: ProyectoDestacado[] = [
    {
        id: 'floisa-sushi',
        nombre: 'Floisa Sushi',
        categoria: 'Web Informativa Pro / Catálogo Gastronómico',
        descripcion:
            'Plataforma web con catálogo digital de productos y menú interactivo, diseñada para recepción ágil de pedidos directamente por WhatsApp.',
        icon: UtensilsCrossed,
        tags: ['Catálogo Digital', 'Menú Interactivo', 'Pedidos a WhatsApp', 'Web Pro'],
        beneficioClave: 'Menú digital optimizado para pedidos rápidos en 1 clic',
        liveUrl: 'https://floisa.vercel.app',
        ctaHref: '/contacto?servicio=sitio_informativo&plan=pro',
        badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
        glowColor: 'from-amber-500/10 via-cyan-500/5 to-transparent',
    },
    {
        id: 'silvana-terapia',
        nombre: 'Silvana Terapia Ocupacional',
        categoria: 'Landing Page Profesional',
        descripcion:
            'Sitio web enfocado en la atención cercana de pacientes, presentación de servicios de salud y captación directa mediante WhatsApp.',
        icon: HeartPulse,
        tags: ['Salud & Bienestar', 'Atención Cercana', 'Captación de Pacientes', 'Landing Page'],
        beneficioClave: 'Diseño empático enfocado en generar confianza inmediata',
        liveUrl: 'https://tosilvana.vercel.app',
        ctaHref: '/contacto?servicio=landing',
        badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
        glowColor: 'from-emerald-500/10 via-blue-500/5 to-transparent',
    },
]

export function TestimoniosSection({ }: TestimoniosSectionProps): React.JSX.Element {
    return (
        <section id="portafolio" className="py-16 lg:py-24 relative overflow-hidden">
            {/* Background ambient lighting */}
            <div className="absolute inset-0 pointer-events-none -z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-500/5 dark:bg-blue-600/10 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* ── Encabezado de la sección ── */}
                <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200/80 dark:border-blue-700/50 mb-5 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                        <span className="text-xs sm:text-sm font-semibold tracking-wide text-blue-700 dark:text-cyan-300">
                            Portafolio y Casos de Éxito
                        </span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                        Proyectos{' '}
                        <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-400 bg-clip-text text-transparent">
                            Recientes
                        </span>
                    </h2>

                    <p className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
                        Conoce algunas de las soluciones digitales que hemos desarrollado para emprendedores y especialistas.
                    </p>
                </div>

                {/* ── Grid de 2 Tarjetas Destacadas ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
                    {PROYECTOS_REALES.map((proyecto) => {
                        const Icon = proyecto.icon

                        return (
                            <div
                                key={proyecto.id}
                                className="group relative flex flex-col rounded-3xl bg-white dark:bg-slate-900/60 border border-zinc-200 dark:border-slate-800 hover:border-blue-400/60 dark:hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 p-6 sm:p-8 backdrop-blur-sm overflow-hidden"
                            >
                                {/* Sutil gradiente superior de atmósfera */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${proyecto.glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                                />

                                <div className="relative z-10 flex flex-col flex-1">
                                    {/* Top Row: Icon & Badge */}
                                    <div className="flex items-start justify-between gap-4 mb-5">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform duration-300">
                                            <Icon className="w-6 h-6" />
                                        </div>

                                        <span
                                            className={`inline-flex items-center text-[11px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${proyecto.badgeColor}`}
                                        >
                                            {proyecto.categoria}
                                        </span>
                                    </div>

                                    {/* Título del Proyecto */}
                                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors">
                                        {proyecto.nombre}
                                    </h3>

                                    {/* Descripción Oficial Solicitada */}
                                    <p className="text-zinc-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed mb-6 flex-1">
                                        {proyecto.descripcion}
                                    </p>

                                    {/* Beneficio destacado con WhatsApp */}
                                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-zinc-100 dark:border-slate-700/60 mb-6 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                                        <MessageCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                                        <span className="font-medium">{proyecto.beneficioClave}</span>
                                    </div>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {proyecto.tags.map((tag, idx) => (
                                            <span
                                                key={idx}
                                                className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-slate-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200/60 dark:border-slate-700/50"
                                            >
                                                <CheckCircle2 className="w-3 h-3 text-cyan-500" />
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* ── Botones de acción ── */}
                                    <div className="pt-5 border-t border-zinc-100 dark:border-slate-800/80 mt-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                                        {/* Botón Principal PROTAGÓNICO: Ver Sitio Web en Vivo */}
                                        <a
                                            href={proyecto.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 hover:from-blue-700 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 text-center group/btn"
                                        >
                                            <span>Ver Sitio Web</span>
                                            <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                        </a>

                                        {/* Enlace Secundario: Cotizar Proyecto Similar */}
                                        <Link
                                            href={proyecto.ctaHref}
                                            className="inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-cyan-300 transition-colors py-2 px-3 text-center"
                                        >
                                            <span>Cotizar similar</span>
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* ── Banner inferior de llamada a la acción ── */}
                <div className="mt-12 sm:mt-16 text-center">
                    <div className="inline-flex flex-col sm:flex-row items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-zinc-50 dark:bg-slate-900/50 border border-zinc-200 dark:border-slate-800 max-w-3xl mx-auto">
                        <div className="flex items-center gap-3 text-left">
                            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center shrink-0">
                                <Sparkles className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
                                    ¿Necesitas digitalizar tu negocio o catálogo?
                                </p>
                                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                                    Desarrollamos soluciones personalizadas con entrega llave en mano y sin ataduras.
                                </p>
                            </div>
                        </div>

                        <Link
                            href="/contacto"
                            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 transition-all shadow-md shadow-blue-500/20 shrink-0 w-full sm:w-auto"
                        >
                            Cotizar Ahora
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
