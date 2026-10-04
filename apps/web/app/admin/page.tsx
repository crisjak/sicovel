'use client'

import Link from 'next/link'
import { Sparkles, Layers, DollarSign, Navigation, PanelBottom, Briefcase, Mail } from 'lucide-react'

const sections = [
    {
        title: 'Hero',
        description: 'Editar título, subtítulo, descripción y botones de la sección principal',
        href: '/admin/hero',
        icon: Sparkles,
        color: 'from-purple-500 to-pink-500',
    },
    {
        title: 'Servicios',
        description: 'Administrar los servicios que se muestran en la página',
        href: '/admin/servicios',
        icon: Layers,
        color: 'from-blue-500 to-cyan-500',
    },
    {
        title: 'Precios',
        description: 'Actualizar planes, precios y características',
        href: '/admin/precios',
        icon: DollarSign,
        color: 'from-green-500 to-emerald-500',
    },
    {
        title: 'Portafolio',
        description: 'Administrar proyectos, categorías y enlaces del portafolio',
        href: '/admin/portafolio',
        icon: Briefcase,
        color: 'from-indigo-500 to-violet-500',
    },
    {
        title: 'Contacto',
        description: 'Editar información de contacto, email, WhatsApp y textos del formulario',
        href: '/admin/contacto',
        icon: Mail,
        color: 'from-rose-500 to-pink-500',
    },
    {
        title: 'Navbar',
        description: 'Modificar enlaces de navegación y botón CTA',
        href: '/admin/navbar',
        icon: Navigation,
        color: 'from-orange-500 to-amber-500',
    },
    {
        title: 'Footer',
        description: 'Editar columnas del pie de página, redes sociales y copyright',
        href: '/admin/footer',
        icon: PanelBottom,
        color: 'from-slate-500 to-zinc-500',
    },
]

export default function AdminDashboard(): React.JSX.Element {
    return (
        <div>
            {/* Encabezado */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
                    Panel de Administración
                </h1>
                <p className="text-zinc-600 dark:text-zinc-400 mt-2">
                    Administra todo el contenido de tu sitio web desde aquí.
                </p>
            </div>

            {/* Grid de Secciones */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sections.map((section) => {
                    const Icon = section.icon
                    return (
                        <Link
                            key={section.href}
                            href={section.href}
                            className="group bg-white dark:bg-slate-800/50 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 transition-all"
                        >
                            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${section.color} text-white mb-4`}>
                                <Icon className="w-6 h-6" />
                            </div>
                            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {section.title}
                            </h2>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                                {section.description}
                            </p>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
