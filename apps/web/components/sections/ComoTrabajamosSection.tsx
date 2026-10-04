import * as LucideIcons from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ProcesoData } from '@/types/content'

interface ComoTrabajamosProps {
    data: ProcesoData
}

function getIcon(name: string): LucideIcon {
    const icons = LucideIcons as unknown as Record<string, LucideIcon>
    return icons[name] ?? LucideIcons.Circle
}

export function ComoTrabajamosSection({ data }: ComoTrabajamosProps): React.JSX.Element {
    return (
        <section className="py-12 lg:py-20 relative overflow-hidden">
            {/* Ambient background glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 dark:bg-blue-900/10 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100 dark:bg-cyan-900/30 border border-cyan-200 dark:border-cyan-800 mb-6">
                        <span className="w-2 h-2 rounded-full bg-cyan-500" />
                        <span className="text-sm font-medium text-cyan-700 dark:text-cyan-300">
                            Proceso de trabajo
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">
                        {data.titulo}
                    </h2>
                    <p className="mt-4 text-zinc-600 dark:text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        {data.subtitulo}
                    </p>
                </div>

                {/* Steps grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {data.pasos.map((paso) => {
                        const Icon = getIcon(paso.icono)
                        return (
                            <div
                                key={paso.id}
                                className="group relative flex flex-col bg-white dark:bg-slate-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300"
                            >
                                {/* Step number badge */}
                                <div className="absolute -top-3 -left-2 w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-md shadow-blue-500/20">
                                    <span className="text-[11px] font-black text-white leading-none">
                                        {paso.paso}
                                    </span>
                                </div>

                                {/* Icon */}
                                <div className="mb-4 w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600/10 to-cyan-500/10 dark:from-blue-600/20 dark:to-cyan-500/20 flex items-center justify-center group-hover:from-blue-600/20 group-hover:to-cyan-500/20 transition-colors">
                                    <Icon className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
                                </div>

                                {/* Content */}
                                <h3 className="text-base font-semibold text-zinc-900 dark:text-white mb-2 leading-snug">
                                    {paso.titulo}
                                </h3>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed flex-1">
                                    {paso.descripcion}
                                </p>

                                {/* Connector arrow for non-last items (hidden on mobile grid) */}
                                {paso.paso < data.pasos.length && (
                                    <div className="hidden lg:block absolute -right-3.5 top-1/2 -translate-y-1/2 text-zinc-300 dark:text-zinc-700 select-none z-10">
                                        →
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>

                {/* Bottom note */}
                <p className="mt-10 text-center text-sm text-zinc-400 dark:text-zinc-500">
                    Sin pagos automáticos · Sin compromisos antes de conversar · Tú decides cuando estás listo.
                </p>
            </div>
        </section>
    )
}
