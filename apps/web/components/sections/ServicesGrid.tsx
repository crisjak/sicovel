import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import type { ServiceData } from '@/types/content'

interface ServicesGridProps {
    services: ServiceData[]
}

// Helper to get icon component by name
function getIcon(iconName: string): LucideIcon {
    const icons = LucideIcons as unknown as Record<string, LucideIcon>
    return icons[iconName] || LucideIcons.Star
}

export function ServicesGrid({ services }: ServicesGridProps): React.JSX.Element {
    return (
        <section id="servicios" className="py-12 lg:py-20 relative">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">
                        Nuestros{' '}
                        <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                            Servicios
                        </span>
                    </h2>
                    <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
                        Soluciones tecnológicas de alto rendimiento para cada etapa de tu negocio.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {services.map((service, index) => {
                        const Icon = getIcon(service.icon)
                        const isLarge = index === 0 || index === 3 // First and last cards larger

                        return (
                            <Link
                                key={service.id}
                                href={service.href}
                                className={`group relative p-6 lg:p-8 rounded-2xl bg-white dark:bg-slate-800/50 border border-zinc-200 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all hover:shadow-xl hover:shadow-blue-500/10 ${isLarge ? 'md:col-span-1' : ''
                                    }`}
                            >
                                {/* Gradient Overlay on Hover */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="relative z-10">
                                    {/* Icon */}
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white mb-5">
                                        <Icon className="w-6 h-6" />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {service.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
                                        {service.description}
                                    </p>

                                    {/* Features */}
                                    <ul className="space-y-2 mb-6">
                                        {service.features.map((feature, featureIndex) => (
                                            <li
                                                key={featureIndex}
                                                className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400"
                                            >
                                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA */}
                                    <div className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:gap-3 transition-all">
                                        Ver más
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
