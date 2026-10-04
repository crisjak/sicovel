'use client'

import { useState, useEffect } from 'react'
import { Save, Loader2, Plus, Trash2 } from 'lucide-react'
import type { HomepageData, FooterData, FooterColumn, NavLink, SocialLink } from '@/types/content'

export default function AdminFooter(): React.JSX.Element {
    const [footer, setFooter] = useState<FooterData | null>(null)
    const [guardando, setGuardando] = useState(false)
    const [mensaje, setMensaje] = useState('')

    useEffect(() => {
        fetch('/api/content')
            .then(res => res.json())
            .then((data: HomepageData) => setFooter(data.footer))
    }, [])

    const guardar = async () => {
        if (!footer) return
        setGuardando(true)
        setMensaje('')
        try {
            const res = await fetch('/api/content')
            const data: HomepageData = await res.json()
            data.footer = footer
            await fetch('/api/content', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            setMensaje('✅ Footer actualizado correctamente')
        } catch {
            setMensaje('❌ Error al guardar')
        }
        setGuardando(false)
        setTimeout(() => setMensaje(''), 3000)
    }

    // Funciones para columnas
    const agregarColumna = () => {
        if (!footer) return
        setFooter({
            ...footer,
            columns: [...footer.columns, { title: 'Nueva Columna', links: [] }],
        })
    }

    const eliminarColumna = (index: number) => {
        if (!footer) return
        setFooter({
            ...footer,
            columns: footer.columns.filter((_, i) => i !== index),
        })
    }

    const actualizarColumna = (index: number, title: string) => {
        if (!footer) return
        const copia = [...footer.columns]
        copia[index] = { ...copia[index], title }
        setFooter({ ...footer, columns: copia })
    }

    const agregarLinkColumna = (colIndex: number) => {
        if (!footer) return
        const copia = [...footer.columns]
        copia[colIndex] = {
            ...copia[colIndex],
            links: [...copia[colIndex].links, { label: 'Nuevo enlace', href: '/' }],
        }
        setFooter({ ...footer, columns: copia })
    }

    const eliminarLinkColumna = (colIndex: number, linkIndex: number) => {
        if (!footer) return
        const copia = [...footer.columns]
        copia[colIndex] = {
            ...copia[colIndex],
            links: copia[colIndex].links.filter((_, i) => i !== linkIndex),
        }
        setFooter({ ...footer, columns: copia })
    }

    const actualizarLinkColumna = (colIndex: number, linkIndex: number, campo: keyof NavLink, valor: string) => {
        if (!footer) return
        const copia = [...footer.columns]
        const links = [...copia[colIndex].links]
        links[linkIndex] = { ...links[linkIndex], [campo]: valor }
        copia[colIndex] = { ...copia[colIndex], links }
        setFooter({ ...footer, columns: copia })
    }

    // Funciones para redes sociales
    const agregarSocial = () => {
        if (!footer) return
        setFooter({
            ...footer,
            socialLinks: [...footer.socialLinks, { platform: 'Nueva Red', href: 'https://', icon: 'Link' }],
        })
    }

    const eliminarSocial = (index: number) => {
        if (!footer) return
        setFooter({
            ...footer,
            socialLinks: footer.socialLinks.filter((_, i) => i !== index),
        })
    }

    const actualizarSocial = (index: number, campo: keyof SocialLink, valor: string) => {
        if (!footer) return
        const copia = [...footer.socialLinks]
        copia[index] = { ...copia[index], [campo]: valor }
        setFooter({ ...footer, socialLinks: copia })
    }

    if (!footer) {
        return <div className="animate-pulse text-zinc-400">Cargando...</div>
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Editar Footer</h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">Administra el pie de página</p>
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

            {/* Logo y Tagline */}
            <div className="bg-white dark:bg-slate-800/50 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 mb-6">
                <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-4">Logo y Tagline</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-medium text-zinc-500 mb-1">Texto del logo</label>
                        <input
                            type="text" value={footer.logo.text}
                            onChange={(e) => setFooter({ ...footer, logo: { ...footer.logo, text: e.target.value } })}
                            className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-slate-900 text-zinc-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-zinc-500 mb-1">Tagline</label>
                        <input
                            type="text" value={footer.logo.tagline}
                            onChange={(e) => setFooter({ ...footer, logo: { ...footer.logo, tagline: e.target.value } })}
                            className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-slate-900 text-zinc-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="bg-white dark:bg-slate-800/50 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 mb-6">
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Copyright</label>
                <input
                    type="text" value={footer.copyright}
                    onChange={(e) => setFooter({ ...footer, copyright: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-slate-900 text-zinc-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>

            {/* Columnas */}
            <div className="bg-white dark:bg-slate-800/50 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Columnas de enlaces</h3>
                    <button onClick={agregarColumna} className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline">
                        <Plus className="w-3.5 h-3.5" /> Agregar Columna
                    </button>
                </div>
                <div className="space-y-6">
                    {footer.columns.map((col, colIndex) => (
                        <div key={colIndex} className="bg-zinc-50 dark:bg-slate-900/50 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                                <input
                                    type="text" value={col.title}
                                    onChange={(e) => actualizarColumna(colIndex, e.target.value)}
                                    className="px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-slate-900 text-zinc-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <div className="flex gap-2">
                                    <button onClick={() => agregarLinkColumna(colIndex)} className="text-xs text-blue-600 hover:underline">+ Enlace</button>
                                    <button onClick={() => eliminarColumna(colIndex)} className="p-1 text-red-400 hover:text-red-600">
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                {col.links.map((link, linkIndex) => (
                                    <div key={linkIndex} className="flex items-center gap-2">
                                        <input
                                            type="text" placeholder="Texto" value={link.label}
                                            onChange={(e) => actualizarLinkColumna(colIndex, linkIndex, 'label', e.target.value)}
                                            className="flex-1 px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-slate-900 text-zinc-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                        <input
                                            type="text" placeholder="Enlace" value={link.href}
                                            onChange={(e) => actualizarLinkColumna(colIndex, linkIndex, 'href', e.target.value)}
                                            className="flex-1 px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-slate-900 text-zinc-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                        <button onClick={() => eliminarLinkColumna(colIndex, linkIndex)} className="p-1 text-red-400 hover:text-red-600">
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Redes Sociales */}
            <div className="bg-white dark:bg-slate-800/50 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Redes Sociales</h3>
                    <button onClick={agregarSocial} className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline">
                        <Plus className="w-3.5 h-3.5" /> Agregar Red
                    </button>
                </div>
                <div className="space-y-3">
                    {footer.socialLinks.map((social, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <input
                                type="text" placeholder="Plataforma" value={social.platform}
                                onChange={(e) => actualizarSocial(index, 'platform', e.target.value)}
                                className="w-32 px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-slate-900 text-zinc-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <input
                                type="text" placeholder="URL" value={social.href}
                                onChange={(e) => actualizarSocial(index, 'href', e.target.value)}
                                className="flex-1 px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-slate-900 text-zinc-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <input
                                type="text" placeholder="Ícono" value={social.icon}
                                onChange={(e) => actualizarSocial(index, 'icon', e.target.value)}
                                className="w-32 px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-slate-900 text-zinc-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button onClick={() => eliminarSocial(index)} className="p-1.5 text-red-400 hover:text-red-600">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
