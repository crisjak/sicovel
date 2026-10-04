'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
    LayoutDashboard,
    Sparkles,
    Layers,
    DollarSign,
    Mail,
    ArrowLeft,
    Users,
} from 'lucide-react'

const menuItems = [
    { label: 'Dashboard',      href: '/admin',           icon: LayoutDashboard },
    { label: 'Inicio',         href: '/admin/inicio',    icon: Sparkles },
    { label: 'Servicios',      href: '/admin/servicios', icon: Layers },
    { label: 'Precios',        href: '/admin/precios',   icon: DollarSign },
    { label: 'Quiénes Somos',  href: '/admin/nosotros',  icon: Users },
    { label: 'Contacto',       href: '/admin/contacto',  icon: Mail },
]
import { BrandLogo } from '@/components/ui/BrandLogo'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}): React.JSX.Element {
    const pathname = usePathname()

    return (
        <div className="min-h-screen bg-zinc-100 dark:bg-slate-950 flex flex-col md:flex-row">

            {/* ── Sidebar ── */}
            <aside className="w-full md:w-64 md:h-screen md:sticky top-0 bg-white dark:bg-slate-900 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800 shrink-0 z-40">
                <div className="flex flex-col h-full">

                    {/* Logo Admin */}
                    <div className="px-6 py-5 border-b border-zinc-200 dark:border-zinc-800">
                        <Link href="/admin" className="flex items-center group select-none">
                            <BrandLogo 
                                className="w-[160px] h-12 translate-y-1"
                                imageClassName="scale-[1.4]"
                            />
                        </Link>
                    </div>

                    {/* Menú */}
                    <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href
                            const Icon = item.icon
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                                        isActive
                                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                                            : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-slate-800 hover:text-zinc-900 dark:hover:text-white'
                                    }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {item.label}
                                </Link>
                            )
                        })}
                    </nav>

                    {/* Volver al sitio */}
                    <div className="px-3 py-4 border-t border-zinc-200 dark:border-zinc-800">
                        <Link
                            href="/"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-slate-800 hover:text-zinc-900 dark:hover:text-white transition-all"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Volver al sitio
                        </Link>
                    </div>

                </div>
            </aside>

            {/* Contenido principal */}
            <div className="flex-1 w-full max-w-[100vw] overflow-x-hidden">
                <div className="p-4 md:p-6 lg:p-8">
                    {children}
                </div>
            </div>

        </div>
    )
}
