'use client'

import { useState, useEffect } from 'react'
import { Save, Loader2, Plus, Trash2 } from 'lucide-react'
import type { HomepageData, PortfolioData, PortfolioProject } from '@/types/content'

export default function AdminPortafolio(): React.JSX.Element {
    const [portfolio, setPortfolio] = useState<PortfolioData | null>(null)
    const [guardando, setGuardando] = useState(false)
    const [mensaje, setMensaje] = useState('')

    useEffect(() => {
        fetch('/api/content')
            .then(res => res.json())
            .then((data: HomepageData) => setPortfolio(data.portfolio))
    }, [])

    const guardar = async () => {
        if (!portfolio) return
        setGuardando(true)
        setMensaje('')
        try {
            const res = await fetch('/api/content')
            const data: HomepageData = await res.json()
            data.portfolio = portfolio
            await fetch('/api/content', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            setMensaje('✅ Portafolio actualizado correctamente')
        } catch {
            setMensaje('❌ Error al guardar')
        }
        setGuardando(false)
        setTimeout(() => setMensaje(''), 3000)
    }

    const agregarProyecto = () => {
        if (!portfolio) return
        const nuevo: PortfolioProject = {
            id: `proyecto-${Date.now()}`,
            title: 'Nuevo Proyecto',
            description: 'Descripción del proyecto',
            category: 'Landing Page',
            imageUrl: '/images/portfolio/placeholder.jpg',
            liveUrl: '',
            tags: ['Web'],
        }
        setPortfolio({ ...portfolio, projects: [...portfolio.projects, nuevo] })
    }

    const eliminarProyecto = (index: number) => {
        if (!portfolio) return
        setPortfolio({
            ...portfolio,
            projects: portfolio.projects.filter((_, i) => i !== index),
        })
    }

    const actualizarProyecto = (index: number, campo: keyof PortfolioProject, valor: unknown) => {
        if (!portfolio) return
        const copia = [...portfolio.projects]
        copia[index] = { ...copia[index], [campo]: valor }
        setPortfolio({ ...portfolio, projects: copia })
    }

    if (!portfolio) {
        return <div className="animate-pulse text-zinc-400">Cargando...</div>
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Editar Portafolio</h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">Administra los proyectos del portafolio</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={agregarProyecto} className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-100 dark:bg-slate-800 text-zinc-700 dark:text-zinc-300 rounded-lg font-medium hover:bg-zinc-200 dark:hover:bg-slate-700 border border-zinc-200 dark:border-zinc-700">
                        <Plus className="w-4 h-4" /> Agregar
                    </button>
                    <button onClick={guardar} disabled={guardando} className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-medium hover:from-blue-700 hover:to-cyan-600 transition-all disabled:opacity-50">
                        {guardando ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Guardar
                    </button>
                </div>
            </div>

            {mensaje && (
                <div className="mb-6 px-4 py-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm">{mensaje}</div>
            )}

            {/* Título y subtítulo */}
            <div className="bg-white dark:bg-slate-800/50 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 mb-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Título</label>
                    <input type="text" value={portfolio.title} onChange={(e) => setPortfolio({ ...portfolio, title: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-slate-900 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Subtítulo</label>
                    <input type="text" value={portfolio.subtitle} onChange={(e) => setPortfolio({ ...portfolio, subtitle: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-slate-900 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
            </div>

            {/* Proyectos */}
            <div className="space-y-6">
                {portfolio.projects.map((proyecto, index) => (
                    <div key={proyecto.id} className="bg-white dark:bg-slate-800/50 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
                        <div className="flex items-start justify-between mb-4">
                            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">{proyecto.title}</h3>
                            <button onClick={() => eliminarProyecto(index)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-xs font-medium text-zinc-500 mb-1">Título</label>
                                <input type="text" value={proyecto.title} onChange={(e) => actualizarProyecto(index, 'title', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-slate-900 text-zinc-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-zinc-500 mb-1">Categoría</label>
                                <input type="text" value={proyecto.category} onChange={(e) => actualizarProyecto(index, 'category', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-slate-900 text-zinc-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-xs font-medium text-zinc-500 mb-1">Descripción</label>
                            <textarea rows={2} value={proyecto.description} onChange={(e) => actualizarProyecto(index, 'description', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-slate-900 text-zinc-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-xs font-medium text-zinc-500 mb-1">URL del sitio</label>
                                <input type="text" value={proyecto.liveUrl || ''} onChange={(e) => actualizarProyecto(index, 'liveUrl', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-slate-900 text-zinc-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-zinc-500 mb-1">URL de imagen</label>
                                <input type="text" value={proyecto.imageUrl} onChange={(e) => actualizarProyecto(index, 'imageUrl', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-slate-900 text-zinc-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-zinc-500 mb-1">Tags (separados por coma)</label>
                            <input
                                type="text"
                                value={proyecto.tags.join(', ')}
                                onChange={(e) => actualizarProyecto(index, 'tags', e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
                                className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-slate-900 text-zinc-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
