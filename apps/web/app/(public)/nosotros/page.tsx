import { getData } from '@/lib/data'
import { Target, Eye, Sparkles, Building2 } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { SectionEyebrow } from '@/components/ui/SectionEyebrow'

// Helper to get icon component by name
function getIcon(iconName: string): LucideIcon {
    const icons = LucideIcons as unknown as Record<string, LucideIcon>
    return icons[iconName] || LucideIcons.CheckCircle
}

import { siteConfig } from '@/config/site'

export const revalidate = 60

export const metadata: import('next').Metadata = {
    title: 'Sobre Nosotros | SICOVEL',
    description: 'Conoce la historia, misión y visión de SICOVEL. Somos una agencia de desarrollo web en Chile enfocada en soluciones digitales de alto rendimiento.',
    openGraph: {
        title: 'Sobre Nosotros | SICOVEL',
        description: 'Conoce la historia, misión y visión de SICOVEL. Somos una agencia de desarrollo web en Chile.',
        url: `${siteConfig.url}/nosotros`,
    },
}

export default function AboutPage(): React.JSX.Element {
    const { about } = getData()

    if (!about) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>

    return (
        <main className="min-h-screen pb-20">
            {/* Header / Hero */}
            <section className="relative overflow-hidden pt-16 pb-12 mb-16">

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-4xl">
                    <SectionEyebrow text={about.subtitle || 'Quiénes Somos'} />
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
                        <SectionTitle text={about.title} />
                    </h1>
                    <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 drop-shadow-sm">
                        {about.description}
                    </p>
                </div>
            </section>

            {/* Historia & Detalles */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl mb-24">
                <div className="bg-white dark:bg-slate-900/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-blue-900/5">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <Building2 className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-bold"><SectionTitle text="Nuestra Historia" /></h2>
                    </div>
                    <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        {about.history}
                    </p>
                </div>
            </section>

            {/* Mision y Vision */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl mb-24">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Mission */}
                    <div className="bg-white dark:bg-slate-900/50 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-zinc-200 dark:border-zinc-800 shadow-lg relative overflow-hidden group hover:border-cyan-500/30 transition-colors">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                        <Target className="w-10 h-10 text-cyan-500 mb-6" />
                        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Nuestra Misión</h3>
                        <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
                            {about.mission}
                        </p>
                    </div>
                    {/* Vision */}
                    <div className="bg-white dark:bg-slate-900/50 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-zinc-200 dark:border-zinc-800 shadow-lg relative overflow-hidden group hover:border-blue-500/30 transition-colors">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                        <Eye className="w-10 h-10 text-blue-500 mb-6" />
                        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Nuestra Visión</h3>
                        <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
                            {about.vision}
                        </p>
                    </div>
                </div>
            </section>

            {/* Valores */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
                        <Sparkles className="w-8 h-8 text-cyan-400" /> <SectionTitle text="Valores que nos Inspiran" />
                    </h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {about.values.map((val) => {
                        const Icon = getIcon(val.icon)
                        return (
                            <div key={val.id} className="p-8 rounded-2xl bg-white dark:bg-slate-900/40 border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 hover:bg-slate-800/60 transition-colors shadow-sm text-center">
                                <div className="w-14 h-14 mx-auto bg-slate-100 dark:bg-slate-800 flex items-center justify-center rounded-2xl mb-6 shadow-inner">
                                    <Icon className="w-7 h-7 text-blue-600 dark:text-cyan-400" />
                                </div>
                                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">{val.title}</h3>
                                <p className="text-zinc-600 dark:text-zinc-400">{val.description}</p>
                            </div>
                        )
                    })}
                </div>
            </section>
        </main>
    )
}
