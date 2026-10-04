'use client'

import { useState, useEffect } from 'react'
import { Save, Loader2, Plus, Trash2 } from 'lucide-react'
import type { HomepageData, AboutData, AboutValue } from '@/types/content'

export default function AdminNosotros(): React.JSX.Element {
    const [about, setAbout] = useState<AboutData | null>(null)
    const [guardando, setGuardando] = useState(false)
    const [mensaje, setMensaje] = useState('')

    useEffect(() => {
        fetch('/api/content')
            .then(res => res.json())
            .then((data: HomepageData) => setAbout(data.about))
    }, [])

    const guardar = async () => {
        if (!about) return
        setGuardando(true)
        setMensaje('')
        try {
            const res = await fetch('/api/content')
            const data: HomepageData = await res.json()
            data.about = about
            await fetch('/api/content', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            setMensaje('✅ Página "Quiénes Somos" actualizada correctamente')
        } catch {
            setMensaje('❌ Error al guardar')
        }
        setGuardando(false)
        setTimeout(() => setMensaje(''), 3000)
    }

    const updateValue = (index: number, field: keyof AboutValue, value: string) => {
        if (!about) return
        const newValues = [...about.values]
        newValues[index] = { ...newValues[index], [field]: value }
        setAbout({ ...about, values: newValues })
    }

    const addValue = () => {
        if (!about) return
        const newValue: AboutValue = {
            id: `val-${Date.now()}`,
            title: 'Nuevo Valor',
            description: 'Descripción del valor',
            icon: 'CheckCircle'
        }
        setAbout({ ...about, values: [...about.values, newValue] })
    }

    const removeValue = (index: number) => {
        if (!about) return
        const newValues = about.values.filter((_, i) => i !== index)
        setAbout({ ...about, values: newValues })
    }

    if (!about) {
        return <div className="animate-pulse text-zinc-400">Cargando...</div>
    }

    return (
        <div className="pb-20">
            <div className="flex items-center justify-between mb-8 sticky top-0 bg-white/90 dark:bg-slate-950/90 py-4 z-10 backdrop-blur-md">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Quiénes Somos</h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">Gestiona el contenido de la página Sobre Nosotros</p>
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

            <div className="space-y-8">
                {/* Textos Principales */}
                <div className="bg-white dark:bg-slate-800/50 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 space-y-6">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800 pb-4">Cabecera y Textos</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Título de Página</label>
                            <input
                                type="text"
                                value={about.title}
                                onChange={(e) => setAbout({ ...about, title: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-slate-900 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Subtítulo (Badge)</label>
                            <input
                                type="text"
                                value={about.subtitle}
                                onChange={(e) => setAbout({ ...about, subtitle: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-slate-900 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Descripción Corta</label>
                        <textarea
                            rows={2}
                            value={about.description}
                            onChange={(e) => setAbout({ ...about, description: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-slate-900 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        />
                    </div>
                </div>

                {/* Misión, Visión, Historia */}
                <div className="bg-white dark:bg-slate-800/50 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 space-y-6">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800 pb-4">Pilares de Marca</h3>
                    
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Nuestra Historia</label>
                        <textarea
                            rows={4}
                            value={about.history}
                            onChange={(e) => setAbout({ ...about, history: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-slate-900 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Misión</label>
                            <textarea
                                rows={4}
                                value={about.mission}
                                onChange={(e) => setAbout({ ...about, mission: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-slate-900 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Visión</label>
                            <textarea
                                rows={4}
                                value={about.vision}
                                onChange={(e) => setAbout({ ...about, vision: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-slate-900 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Valores */}
                <div className="bg-white dark:bg-slate-800/50 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 space-y-6">
                    <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Nuestros Valores</h3>
                        <button
                            onClick={addValue}
                            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors cursor-pointer"
                        >
                            <Plus className="w-4 h-4" /> Agregar Valor
                        </button>
                    </div>

                    <div className="space-y-4">
                        {about.values.map((val, index) => (
                            <div key={val.id} className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-slate-900 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                                <div className="md:col-span-3">
                                    <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">Icono (Lucide)</label>
                                    <input
                                        type="text"
                                        value={val.icon}
                                        onChange={(e) => updateValue(index, 'icon', e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-slate-950 text-sm"
                                    />
                                </div>
                                <div className="md:col-span-3">
                                    <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">Título</label>
                                    <input
                                        type="text"
                                        value={val.title}
                                        onChange={(e) => updateValue(index, 'title', e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-slate-950 text-sm"
                                    />
                                </div>
                                <div className="md:col-span-5">
                                    <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">Descripción</label>
                                    <input
                                        type="text"
                                        value={val.description}
                                        onChange={(e) => updateValue(index, 'description', e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-slate-950 text-sm"
                                    />
                                </div>
                                <div className="md:col-span-1 flex justify-end md:mt-6">
                                    <button
                                        onClick={() => removeValue(index)}
                                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors cursor-pointer"
                                        title="Eliminar valor"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
