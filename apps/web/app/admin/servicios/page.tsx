'use client'

import { useState, useEffect } from 'react'
import { Save, Loader2, Sparkles, Layers } from 'lucide-react'
import { ToastContainer, useToast } from '@/components/ui/Toast'
import { upsertConfiguracion } from '@/lib/actions/imagenes'

interface ServiciosPageConfig {
    servicios_titulo: string
    servicios_descripcion: string
    servicios_ventajas: string
}

const DEFAULTS: ServiciosPageConfig = {
    servicios_titulo: 'Nuestros Servicios',
    servicios_descripcion: 'Conoce las soluciones digitales que ofrecemos para impulsar tu negocio al siguiente nivel.',
    servicios_ventajas: 'Rápido, Confiable, Seguro',
}

export default function AdminServiciosPage(): React.JSX.Element {
    const [config, setConfig] = useState<ServiciosPageConfig>(DEFAULTS)
    const [guardando, setGuardando] = useState(false)
    const [cargando, setCargando] = useState(true)
    const { toasts, addToast, removeToast } = useToast()

    useEffect(() => {
        fetch('/api/admin/config')
            .then((r) => r.json())
            .then((data: Record<string, string>) => {
                setConfig({
                    servicios_titulo: data.servicios_titulo ?? DEFAULTS.servicios_titulo,
                    servicios_descripcion: data.servicios_descripcion ?? DEFAULTS.servicios_descripcion,
                    servicios_ventajas: data.servicios_ventajas ?? DEFAULTS.servicios_ventajas,
                })
            })
            .catch(() => {
                addToast('No se pudo cargar la configuración.', 'error')
            })
            .finally(() => setCargando(false))
    }, [addToast])

    const guardar = async () => {
        setGuardando(true)
        try {
            const entradas = Object.entries(config) as [string, string][]
            const resultados = await Promise.all(
                entradas.map(([clave, valor]) => upsertConfiguracion(clave, valor))
            )

            if (resultados.some((r) => !r.success)) {
                throw new Error('Fallo al guardar configuraciones.')
            }

            addToast('✓ Información de la página de Servicios actualizada.', 'success')
        } catch (err: any) {
            addToast(err.message || 'Error al guardar.', 'error')
        } finally {
            setGuardando(false)
        }
    }

    if (cargando) {
        return (
            <div className="flex items-center justify-center gap-3 text-zinc-400 py-20">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="text-sm">Cargando datos...</span>
            </div>
        )
    }

    return (
        <>
            <ToastContainer toasts={toasts} onDismiss={removeToast} />

            <div className="max-w-4xl mx-auto pb-12">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white flex items-center gap-3">
                            <Layers className="w-8 h-8 text-blue-500" />
                            Página de Servicios
                        </h1>
                        <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-sm">
                            Información general y textos introductorios de la página interna de servicios (/servicios).
                        </p>
                    </div>
                    <button
                        onClick={guardar}
                        disabled={guardando}
                        className="inline-flex shrink-0 items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25 disabled:opacity-50"
                    >
                        {guardando ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        {guardando ? 'Guardando...' : 'Guardar Cambios'}
                    </button>
                </div>

                <div className="bg-white dark:bg-slate-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 space-y-8">
                    <section>
                        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 mb-4">
                            <Sparkles className="w-5 h-5 text-cyan-500" /> Cabecera (Hero) de la página
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                    Título Principal
                                </label>
                                <input
                                    type="text"
                                    value={config.servicios_titulo}
                                    onChange={(e) => setConfig({ ...config, servicios_titulo: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-slate-900 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all text-lg font-medium"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                    Descripción / Párrafo introductorio
                                </label>
                                <textarea
                                    rows={4}
                                    value={config.servicios_descripcion}
                                    onChange={(e) => setConfig({ ...config, servicios_descripcion: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-slate-900 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all resize-none leading-relaxed"
                                />
                            </div>
                        </div>
                    </section>

                    <hr className="border-zinc-200 dark:border-zinc-800" />

                    <section>
                        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                            Ventajas / Diferenciadores
                        </h2>
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                Conceptos Clave (separados por comas)
                            </label>
                            <input
                                type="text"
                                value={config.servicios_ventajas}
                                onChange={(e) => setConfig({ ...config, servicios_ventajas: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-slate-900 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all"
                                placeholder="Ej: Rapidez, Soporte 24/7, Diseño Personalizado"
                            />
                            <p className="text-xs text-zinc-500 mt-2">
                                Estas ventajas se muestran como pequeñas viñetas o tags destacados debajo del texto introductorio.
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}
