'use client'

import { useState, useEffect, useCallback } from 'react'
import {
    Save, Loader2, RefreshCw, Sparkles, AlertCircle, DollarSign, Layers, BookOpen
} from 'lucide-react'
import { getPlanesAdmin, updatePlan } from '@/lib/actions/planes'
import { ToastContainer, useToast } from '@/components/ui/Toast'

// ─── Tipos ───────────────────────────────────────────────────
interface CategoriaServicio {
    id: string
    slug: string
    nombre: string
    es_activo: boolean
}

interface PlanConCategoria {
    id: string
    categoria_id: string
    nivel: string
    nombre: string
    descripcion_corta: string | null
    precio_unico_clp: number
    precio_oferta_clp: number | null
    promo_etiqueta: string | null
    promo_activa: boolean
    promo_inicio: string | null
    promo_fin: string | null
    caracteristicas: any
    es_destacado: boolean
    orden: number
    es_activo: boolean
    categorias_servicio: CategoriaServicio
}

type TabType = 'landing' | 'sitio_informativo' | 'ecommerce'

export default function AdminPrecios(): React.JSX.Element {
    const [planes, setPlanes] = useState<PlanConCategoria[]>([])
    const [cargando, setCargando] = useState(true)
    const [guardando, setGuardando] = useState<Record<string, boolean>>({})
    const [activeTab, setActiveTab] = useState<TabType>('landing')

    const { toasts, addToast, removeToast } = useToast()

    // ─── Carga de datos ───────────────────────────────────────
    const cargarPlanes = useCallback(async () => {
        setCargando(true)
        try {
            const { data, error } = await getPlanesAdmin()
            if (error || !data) {
                throw new Error(error || 'Error al obtener planes')
            }
            setPlanes(data as unknown as PlanConCategoria[])
        } catch (err: any) {
            addToast(err.message || 'Error al cargar los planes desde Supabase.', 'error')
        } finally {
            setCargando(false)
        }
    }, [addToast])

    useEffect(() => {
        cargarPlanes()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // ─── Actualización local de campos ───────────────────────
    const handleCampoChange = (
        id: string,
        campo: keyof PlanConCategoria,
        valor: any
    ) => {
        setPlanes(prev =>
            prev.map(p => (p.id === id ? { ...p, [campo]: valor } : p))
        )
    }

    // ─── Validación de negocio antes de persistir ─────────
    /**
     * Valida las reglas de negocio de promociones client-side,
     * espejando exactamente las constraints de la DB (004_fix_constraints.sql).
     * Retorna el primer mensaje de error encontrado, o null si todo está OK.
     */
    const validatePlan = (plan: PlanConCategoria): string | null => {
        const oferta = plan.precio_oferta_clp
        const regular = plan.precio_unico_clp

        // Regla 1: precio_oferta_clp >= 0
        if (oferta !== null && oferta !== undefined && oferta < 0) {
            return 'El precio de oferta no puede ser negativo.'
        }

        // Regla 2: precio_oferta_clp < precio_unico_clp
        if (oferta !== null && oferta !== undefined && oferta >= regular) {
            return `El precio de oferta ($${oferta.toLocaleString('es-CL')}) debe ser menor al precio regular ($${regular.toLocaleString('es-CL')}).`
        }

        // Regla 3: promo_fin > promo_inicio (cuando ambas fechas existen)
        if (plan.promo_inicio && plan.promo_fin) {
            const inicio = new Date(plan.promo_inicio)
            const fin   = new Date(plan.promo_fin)
            if (fin <= inicio) {
                return 'La fecha de fin de la promo debe ser posterior a la fecha de inicio.'
            }
        }

        return null
    }

    // ─── Guardado del Plan en base de datos ──────────────────
    const handleGuardarPlan = async (plan: PlanConCategoria) => {
        // Validar antes de enviar a Supabase
        const validationError = validatePlan(plan)
        if (validationError) {
            addToast(`⚠️ ${validationError}`, 'error')
            return
        }

        setGuardando(prev => ({ ...prev, [plan.id]: true }))
        try {
            const res = await updatePlan(plan.id, {
                nombre: plan.nombre,
                descripcion_corta: plan.descripcion_corta || '',
                precio_unico_clp: Number(plan.precio_unico_clp),
                precio_oferta_clp: plan.precio_oferta_clp ? Number(plan.precio_oferta_clp) : null,
                promo_etiqueta: plan.promo_etiqueta || null,
                promo_activa: plan.promo_activa,
                promo_inicio: plan.promo_inicio || null,
                promo_fin: plan.promo_fin || null,
                es_destacado: plan.es_destacado,
                es_activo: plan.es_activo
            })

            if (!res.success) throw new Error(res.error || 'Fallo al guardar')
            addToast(`✓ Plan "${plan.nombre}" actualizado con éxito.`, 'success')
        } catch (err: any) {
            addToast(err.message || 'Error al guardar el plan.', 'error')
        } finally {
            setGuardando(prev => ({ ...prev, [plan.id]: false }))
        }
    }

    // Filtrar los planes por la categoría activa en base a su slug
    const planesFiltrados = planes.filter(p => {
        const catSlug = p.categorias_servicio?.slug || ''
        return catSlug === activeTab
    })

    return (
        <>
            <ToastContainer toasts={toasts} onDismiss={removeToast} />

            <div className="w-full max-w-6xl mx-auto space-y-8 pb-12 px-4 md:px-6">
                
                {/* ─── Encabezado ────────────────────────────── */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Administrar Precios</h1>
                        <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-sm">
                            Edita los precios, nombres y configuraciones de los planes comerciales.
                        </p>
                    </div>
                    <button
                        onClick={cargarPlanes}
                        disabled={cargando}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 text-zinc-700 dark:text-zinc-300 rounded-xl font-medium hover:bg-zinc-50 dark:hover:bg-slate-700 border border-zinc-200 dark:border-zinc-700 transition-all shadow-sm disabled:opacity-50"
                    >
                        <RefreshCw className={`w-4 h-4 ${cargando ? 'animate-spin' : ''}`} />
                        Recargar Datos
                    </button>
                </div>

                {/* ─── Pestañas de Servicios ────────────────── */}
                <div className="flex border-b border-zinc-200 dark:border-zinc-800 overflow-x-auto pb-px">
                    {(['landing', 'sitio_informativo', 'ecommerce'] as TabType[]).map(tab => {
                        const labelMap: Record<TabType, string> = {
                            landing: 'Landing Page',
                            sitio_informativo: 'Web Informativa',
                            ecommerce: 'E-commerce'
                        }
                        const active = activeTab === tab
                        return (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`py-3 px-6 font-semibold text-sm transition-all border-b-2 whitespace-nowrap shrink-0 ${
                                    active
                                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                        : 'border-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300'
                                }`}
                            >
                                {labelMap[tab]}
                            </button>
                        )
                    })}
                </div>

                {/* ─── Contenedor Principal ───────────────────── */}
                {cargando ? (
                    <div className="flex items-center justify-center py-20 bg-white dark:bg-slate-800/20 rounded-2xl border border-zinc-200 dark:border-zinc-800/80">
                        <div className="flex flex-col items-center gap-3 text-zinc-400">
                            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                            <span className="text-sm font-medium">Cargando precios y planes...</span>
                        </div>
                    </div>
                ) : planesFiltrados.length === 0 ? (
                    <div className="text-center py-16 bg-white dark:bg-slate-800/20 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800">
                        <AlertCircle className="w-12 h-12 text-zinc-400 mx-auto mb-4 opacity-50" />
                        <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">No se encontraron planes para este servicio</h3>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">Garantiza que la base de datos esté debidamente inicializada.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {planesFiltrados.map(plan => {
                            const isSaving = guardando[plan.id] ?? false
                            return (
                                <div
                                    key={plan.id}
                                    className={`bg-white dark:bg-[#0a0f1c] rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden flex flex-col relative transition-all duration-300 ${
                                        plan.es_destacado
                                            ? 'ring-2 ring-blue-500/30 dark:ring-blue-500/20 border-blue-400/50 dark:border-blue-500/30'
                                            : ''
                                    }`}
                                >
                                    {/* Cabecera del plan */}
                                    <div className="p-6 pb-4 border-b border-zinc-100 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-slate-900/30 flex items-center justify-between">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-bold text-zinc-900 dark:text-white text-lg">
                                                    Plan: {plan.nivel.toUpperCase()}
                                                </h3>
                                                {plan.es_destacado && (
                                                    <span className="inline-flex items-center gap-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                                        <Sparkles className="w-3 h-3" /> Recomendado
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs text-zinc-400 dark:text-zinc-500 font-mono">ID: {plan.id}</p>
                                        </div>

                                        <button
                                            onClick={() => handleGuardarPlan(plan)}
                                            disabled={isSaving}
                                            className="inline-flex items-center gap-1.5 px-4.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-all shadow-md shadow-blue-600/15 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
                                        >
                                            {isSaving ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <Save className="w-4 h-4" />
                                            )}
                                            {isSaving ? 'Guardando' : 'Guardar'}
                                        </button>
                                    </div>

                                    {/* Cuerpo del formulario */}
                                    <div className="p-6 flex-1 space-y-5">
                                        {/* Nombre */}
                                        <div>
                                            <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase tracking-wide">
                                                Nombre Comercial
                                            </label>
                                            <input
                                                type="text"
                                                value={plan.nombre}
                                                onChange={e => handleCampoChange(plan.id, 'nombre', e.target.value)}
                                                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-slate-900 text-zinc-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                                            />
                                        </div>

                                        {/* Descripción */}
                                        <div>
                                            <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase tracking-wide">
                                                Descripción Corta
                                            </label>
                                            <textarea
                                                rows={2}
                                                value={plan.descripcion_corta || ''}
                                                onChange={e => handleCampoChange(plan.id, 'descripcion_corta', e.target.value)}
                                                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-slate-900 text-zinc-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                            />
                                        </div>

                                        {/* Precio e Interacciones */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            {/* Precio Base */}
                                            <div>
                                                <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase tracking-wide flex items-center gap-1">
                                                    <DollarSign className="w-3.5 h-3.5 text-zinc-400" /> Precio Regular (CLP)
                                                </label>
                                                <input
                                                    type="number"
                                                    value={plan.precio_unico_clp}
                                                    min="0"
                                                    onChange={e => handleCampoChange(plan.id, 'precio_unico_clp', Number(e.target.value))}
                                                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-slate-900 text-zinc-900 dark:text-white font-semibold focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                                                />
                                            </div>

                                            {/* Precio Oferta */}
                                            <div>
                                                <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase tracking-wide flex items-center gap-1">
                                                    <Sparkles className="w-3.5 h-3.5 text-zinc-400" /> Precio Oferta (CLP)
                                                </label>
                                                <input
                                                    type="number"
                                                    value={plan.precio_oferta_clp ?? ''}
                                                    min="0"
                                                    placeholder="Sin oferta"
                                                    onChange={e => handleCampoChange(plan.id, 'precio_oferta_clp', e.target.value === '' ? null : Number(e.target.value))}
                                                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-slate-900 text-zinc-900 dark:text-white font-semibold focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                                                />
                                            </div>
                                        </div>

                                        {/* Sección Promo */}
                                        <div className="rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 p-4 space-y-4 bg-zinc-50/50 dark:bg-slate-900/30">
                                            <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                                                <Sparkles className="w-3.5 h-3.5" /> Configuración de Promoción
                                            </p>

                                            {/* Etiqueta y toggle activo */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                                                <div>
                                                    <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase tracking-wide">
                                                        Etiqueta Promo
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={plan.promo_etiqueta ?? ''}
                                                        placeholder='Ej: 20% OFF, Lanzamiento'
                                                        onChange={e => handleCampoChange(plan.id, 'promo_etiqueta', e.target.value || null)}
                                                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-slate-900 text-zinc-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                    />
                                                </div>
                                                <label className="flex items-center gap-3 cursor-pointer select-none pb-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={plan.promo_activa ?? false}
                                                        onChange={e => handleCampoChange(plan.id, 'promo_activa', e.target.checked)}
                                                        className="w-4.5 h-4.5 rounded border-zinc-300 dark:border-zinc-700 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                                    />
                                                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                                        Promo Activa en el Sitio
                                                    </span>
                                                </label>
                                            </div>

                                            {/* Rango de fechas */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase tracking-wide">
                                                        Inicio Promo
                                                    </label>
                                                    <input
                                                        type="datetime-local"
                                                        value={plan.promo_inicio ? plan.promo_inicio.slice(0, 16) : ''}
                                                        onChange={e => handleCampoChange(plan.id, 'promo_inicio', e.target.value ? new Date(e.target.value).toISOString() : null)}
                                                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-slate-900 text-zinc-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase tracking-wide">
                                                        Fin Promo
                                                    </label>
                                                    <input
                                                        type="datetime-local"
                                                        value={plan.promo_fin ? plan.promo_fin.slice(0, 16) : ''}
                                                        onChange={e => handleCampoChange(plan.id, 'promo_fin', e.target.value ? new Date(e.target.value).toISOString() : null)}
                                                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-slate-900 text-zinc-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Características Destacado y Activo */}
                                        <div className="flex flex-col gap-3">
                                            <label className="flex items-center gap-3 cursor-pointer select-none">
                                                <input
                                                    type="checkbox"
                                                    checked={plan.es_destacado}
                                                    onChange={e => handleCampoChange(plan.id, 'es_destacado', e.target.checked)}
                                                    className="w-4.5 h-4.5 rounded border-zinc-300 dark:border-zinc-700 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                                />
                                                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                                    Destacar Plan (Recomendado)
                                                </span>
                                            </label>

                                            <label className="flex items-center gap-3 cursor-pointer select-none">
                                                <input
                                                    type="checkbox"
                                                    checked={plan.es_activo}
                                                    onChange={e => handleCampoChange(plan.id, 'es_activo', e.target.checked)}
                                                    className="w-4.5 h-4.5 rounded border-zinc-300 dark:border-zinc-700 text-green-600 focus:ring-green-500 cursor-pointer"
                                                />
                                                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                                    Plan Activo en el Sitio
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </>
    )
}
