'use client'

import { useState, useEffect } from 'react'
import { Save, Loader2, Plus, Trash2 } from 'lucide-react'
import type { HomepageData, NavbarData, NavLink } from '@/types/content'

export default function AdminNavbar(): React.JSX.Element {
    const [navbar, setNavbar] = useState<NavbarData | null>(null)
    const [guardando, setGuardando] = useState(false)
    const [mensaje, setMensaje] = useState('')

    useEffect(() => {
        fetch('/api/content')
            .then(res => res.json())
            .then((data: HomepageData) => setNavbar(data.navbar))
    }, [])

    const guardar = async () => {
        if (!navbar) return
        setGuardando(true)
        setMensaje('')
        try {
            const res = await fetch('/api/content')
            const data: HomepageData = await res.json()
            data.navbar = navbar
            await fetch('/api/content', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            setMensaje('✅ Navbar actualizado correctamente')
        } catch {
            setMensaje('❌ Error al guardar')
        }
        setGuardando(false)
        setTimeout(() => setMensaje(''), 3000)
    }

    const agregarLink = () => {
        if (!navbar) return
        setNavbar({
            ...navbar,
            links: [...navbar.links, { label: 'Nuevo enlace', href: '/' }],
        })
    }

    const eliminarLink = (index: number) => {
        if (!navbar) return
        setNavbar({
            ...navbar,
            links: navbar.links.filter((_, i) => i !== index),
        })
    }

    const actualizarLink = (index: number, campo: keyof NavLink, valor: string) => {
        if (!navbar) return
        const copia = [...navbar.links]
        copia[index] = { ...copia[index], [campo]: valor }
        setNavbar({ ...navbar, links: copia })
    }

    if (!navbar) {
        return <div className="animate-pulse text-zinc-400">Cargando...</div>
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Editar Navbar</h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">Modifica la barra de navegación</p>
                </div>
                <button
                    onClick={guardar}
                    disabled={guardando}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-medium hover:from-blue-700 hover:to-cyan-600 transition-all disabled:opacity-50"
                >
                    {guardando ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Guardar
                </button>
            </div>

            {mensaje && (
                <div className="mb-6 px-4 py-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm">
                    {mensaje}
                </div>
            )}

            {/* Logo */}
            <div className="bg-white dark:bg-slate-800/50 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 mb-6">
                <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-4">Logo</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-medium text-zinc-500 mb-1">Texto</label>
                        <input
                            type="text" value={navbar.logo.text}
                            onChange={(e) => setNavbar({ ...navbar, logo: { ...navbar.logo, text: e.target.value } })}
                            className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-slate-900 text-zinc-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-zinc-500 mb-1">Enlace</label>
                        <input
                            type="text" value={navbar.logo.href}
                            onChange={(e) => setNavbar({ ...navbar, logo: { ...navbar.logo, href: e.target.value } })}
                            className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-slate-900 text-zinc-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>
            </div>

            {/* Enlaces */}
            <div className="bg-white dark:bg-slate-800/50 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Enlaces de navegación</h3>
                    <button onClick={agregarLink} className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline">
                        <Plus className="w-3.5 h-3.5" /> Agregar
                    </button>
                </div>
                <div className="space-y-3">
                    {navbar.links.map((link, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <input
                                type="text" placeholder="Texto" value={link.label}
                                onChange={(e) => actualizarLink(index, 'label', e.target.value)}
                                className="flex-1 px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-slate-900 text-zinc-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <input
                                type="text" placeholder="Enlace" value={link.href}
                                onChange={(e) => actualizarLink(index, 'href', e.target.value)}
                                className="flex-1 px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-slate-900 text-zinc-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button onClick={() => eliminarLink(index)} className="p-1.5 text-red-400 hover:text-red-600">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Botón CTA */}
            <div className="bg-white dark:bg-slate-800/50 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
                <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-4">Botón CTA</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-medium text-zinc-500 mb-1">Texto</label>
                        <input
                            type="text" value={navbar.ctaButton.text}
                            onChange={(e) => setNavbar({ ...navbar, ctaButton: { ...navbar.ctaButton, text: e.target.value } })}
                            className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-slate-900 text-zinc-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-zinc-500 mb-1">Enlace</label>
                        <input
                            type="text" value={navbar.ctaButton.href}
                            onChange={(e) => setNavbar({ ...navbar, ctaButton: { ...navbar.ctaButton, href: e.target.value } })}
                            className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-slate-900 text-zinc-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
