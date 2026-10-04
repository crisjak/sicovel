'use client'

import { useState, useEffect } from 'react'
import { Save, Loader2, Plus, Trash2 } from 'lucide-react'
import type { HomepageData, ContactData, ContactInfo } from '@/types/content'

export default function AdminContacto(): React.JSX.Element {
    const [contact, setContact] = useState<ContactData | null>(null)
    const [guardando, setGuardando] = useState(false)
    const [mensaje, setMensaje] = useState('')

    useEffect(() => {
        fetch('/api/content')
            .then(res => res.json())
            .then((data: HomepageData) => setContact(data.contact))
    }, [])

    const guardar = async () => {
        if (!contact) return
        setGuardando(true)
        setMensaje('')
        try {
            const res = await fetch('/api/content')
            const data: HomepageData = await res.json()
            data.contact = contact
            await fetch('/api/content', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            setMensaje('✅ Contacto actualizado correctamente')
        } catch {
            setMensaje('❌ Error al guardar')
        }
        setGuardando(false)
        setTimeout(() => setMensaje(''), 3000)
    }

    const agregarInfo = () => {
        if (!contact) return
        setContact({
            ...contact,
            info: [...contact.info, { icon: 'Phone', label: 'Nuevo', value: '', href: '' }],
        })
    }

    const eliminarInfo = (index: number) => {
        if (!contact) return
        setContact({
            ...contact,
            info: contact.info.filter((_, i) => i !== index),
        })
    }

    const actualizarInfo = (index: number, campo: keyof ContactInfo, valor: string) => {
        if (!contact) return
        const copia = [...contact.info]
        copia[index] = { ...copia[index], [campo]: valor }
        setContact({ ...contact, info: copia })
    }

    if (!contact) {
        return <div className="animate-pulse text-zinc-400">Cargando...</div>
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Editar Contacto</h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">Administra la información de contacto</p>
                </div>
                <button onClick={guardar} disabled={guardando} className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-medium hover:from-blue-700 hover:to-cyan-600 transition-all disabled:opacity-50">
                    {guardando ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Guardar
                </button>
            </div>

            {mensaje && (
                <div className="mb-6 px-4 py-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm">{mensaje}</div>
            )}

            {/* Textos principales */}
            <div className="bg-white dark:bg-slate-800/50 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 mb-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Título</label>
                    <input type="text" value={contact.title} onChange={(e) => setContact({ ...contact, title: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-slate-900 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Subtítulo</label>
                    <input type="text" value={contact.subtitle} onChange={(e) => setContact({ ...contact, subtitle: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-slate-900 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Descripción</label>
                    <textarea rows={3} value={contact.description} onChange={(e) => setContact({ ...contact, description: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-slate-900 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" />
                </div>
            </div>

            {/* Formulario textos */}
            <div className="bg-white dark:bg-slate-800/50 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 mb-6 space-y-4">
                <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Textos del Formulario</h3>
                <div>
                    <label className="block text-xs font-medium text-zinc-500 mb-1">Título del formulario</label>
                    <input type="text" value={contact.formTitle} onChange={(e) => setContact({ ...contact, formTitle: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-slate-900 text-zinc-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                    <label className="block text-xs font-medium text-zinc-500 mb-1">Descripción del formulario</label>
                    <input type="text" value={contact.formDescription} onChange={(e) => setContact({ ...contact, formDescription: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-slate-900 text-zinc-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
            </div>

            {/* Info de contacto */}
            <div className="bg-white dark:bg-slate-800/50 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Información de Contacto</h3>
                    <button onClick={agregarInfo} className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline">
                        <Plus className="w-3.5 h-3.5" /> Agregar
                    </button>
                </div>
                <div className="space-y-4">
                    {contact.info.map((item, index) => (
                        <div key={index} className="bg-zinc-50 dark:bg-slate-900/50 rounded-lg p-4">
                            <div className="flex items-start justify-between mb-3">
                                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{item.label}</span>
                                <button onClick={() => eliminarInfo(index)} className="p-1 text-red-400 hover:text-red-600">
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-medium text-zinc-500 mb-1">Etiqueta</label>
                                    <input type="text" value={item.label} onChange={(e) => actualizarInfo(index, 'label', e.target.value)} className="w-full px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-slate-900 text-zinc-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-zinc-500 mb-1">Ícono (Lucide)</label>
                                    <input type="text" value={item.icon} onChange={(e) => actualizarInfo(index, 'icon', e.target.value)} className="w-full px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-slate-900 text-zinc-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-zinc-500 mb-1">Valor</label>
                                    <input type="text" value={item.value} onChange={(e) => actualizarInfo(index, 'value', e.target.value)} className="w-full px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-slate-900 text-zinc-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-zinc-500 mb-1">Enlace (opcional)</label>
                                    <input type="text" value={item.href || ''} onChange={(e) => actualizarInfo(index, 'href', e.target.value)} className="w-full px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-slate-900 text-zinc-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
