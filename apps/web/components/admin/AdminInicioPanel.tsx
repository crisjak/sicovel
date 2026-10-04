'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import {
    Save, Loader2, Image as ImageIcon, RefreshCw, Trash2, Pencil, CheckCircle2
} from 'lucide-react'
import { ImageUploader } from '@/components/ui/ImageUploader'
import { ToastContainer, useToast } from '@/components/ui/Toast'
import { upsertConfiguracion, getCategorias, updateCategoriaServicio } from '@/lib/actions/imagenes'

// ─── Tipos ───────────────────────────────────────────────────
interface HeroConfig {
    hero_titulo_home: string
    hero_subtitulo_home: string
    hero_cta_principal_texto: string
    hero_cta_principal_link: string
    hero_cta_secundario_texto: string
    hero_cta_secundario_link: string
    hero_imagen_url: string
}

const DEFAULTS_HERO: HeroConfig = {
    hero_titulo_home: '',
    hero_subtitulo_home: '',
    hero_cta_principal_texto: '',
    hero_cta_principal_link: '',
    hero_cta_secundario_texto: '',
    hero_cta_secundario_link: '',
    hero_imagen_url: '',
}

interface CategoriaConImagen {
    id: string
    slug: string
    nombre: string
    descripcion: string | null
    orden: number
    es_activo: boolean
    imagen_url?: string
}

// ─── Componente Principal ────────────────────────────────────
export default function AdminInicioPanel(): React.JSX.Element {
    // Hero
    const [heroConfig, setHeroConfig] = useState<HeroConfig>(DEFAULTS_HERO)
    const [guardandoHero, setGuardandoHero] = useState(false)
    const [cargandoHero, setCargandoHero] = useState(true)

    // Carrusel
    const [categorias, setCategorias] = useState<CategoriaConImagen[]>([])
    // Snapshot de los datos guardados — para detectar cambios
    const savedCategorias = useRef<Record<string, CategoriaConImagen>>({})
    const [cargandoCategorias, setCargandoCategorias] = useState(true)
    const [guardandoCategoria, setGuardandoCategoria] = useState<Record<string, boolean>>({})
    // slug → true si hay cambios pendientes sin guardar
    const [dirty, setDirty] = useState<Record<string, boolean>>({})
    // slug → true si el modo edición está activo para esa tarjeta
    const [editandoCard, setEditandoCard] = useState<Record<string, boolean>>({})

    const { toasts, addToast, removeToast } = useToast()

    // ─── Helpers de dirty tracking ───────────────────────────
    const marcarDirty = (slug: string, categoria: CategoriaConImagen) => {
        const saved = savedCategorias.current[slug]
        if (!saved) return
        const hasCambios =
            categoria.nombre !== saved.nombre ||
            categoria.descripcion !== saved.descripcion ||
            (categoria.imagen_url ?? '') !== (saved.imagen_url ?? '')
        setDirty(prev => ({ ...prev, [slug]: hasCambios }))
    }

    // ─── Carga de datos (una sola vez al montar) ─────────────
    const cargarHero = useCallback(async () => {
        setCargandoHero(true)
        try {
            const res = await fetch('/api/admin/config')
            if (!res.ok) throw new Error('Error HTTP ' + res.status)
            const data: Record<string, string> = await res.json()
            let imgUrl = data.hero_imagen_url ?? ''
            if (imgUrl === '/assets/hero-home.webp' || !imgUrl) {
                imgUrl = ''
            }
            setHeroConfig({
                hero_titulo_home: data.hero_titulo_home ?? '',
                hero_subtitulo_home: data.hero_subtitulo_home ?? '',
                hero_cta_principal_texto: data.hero_cta_principal_texto ?? '',
                hero_cta_principal_link: data.hero_cta_principal_link ?? '#',
                hero_cta_secundario_texto: data.hero_cta_secundario_texto ?? '',
                hero_cta_secundario_link: data.hero_cta_secundario_link ?? '/contacto',
                hero_imagen_url: imgUrl,
            })
        } catch {
            addToast('No se pudo cargar la configuración del Hero.', 'error')
        } finally {
            setCargandoHero(false)
        }
    }, [addToast])

    const cargarCategorias = useCallback(async () => {
        setCargandoCategorias(true)
        const { data, error } = await getCategorias()
        if (error || !data) {
            addToast('No se pudieron cargar los servicios del carrusel.', 'error')
        } else {
            const mapped = data.map((c) => ({
                ...c,
                imagen_url: (c as any).imagen_url ?? '',
            }))
            // Guardar snapshot de valores "limpios"
            const snap: Record<string, CategoriaConImagen> = {}
            mapped.forEach(c => { snap[c.slug] = { ...c } })
            savedCategorias.current = snap
            setCategorias(mapped)
            // Resetear flags dirty y modo edición
            setDirty({})
            setEditandoCard({})
        }
        setCargandoCategorias(false)
    }, [addToast])

    useEffect(() => {
        cargarHero()
        cargarCategorias()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // ─── Guardado del Hero ───────────────────────────────────
    const guardarHero = async () => {
        setGuardandoHero(true)
        try {
            const entradas = Object.entries(heroConfig) as [string, string][]
            const resultados = await Promise.all(
                entradas.map(([clave, valor]) => upsertConfiguracion(clave, valor))
            )
            if (resultados.some(r => !r.success)) throw new Error('Fallo al guardar configuraciones del Hero.')
            addToast('✓ Hero actualizado correctamente.', 'success')
        } catch (err: any) {
            addToast(err.message || 'Error al guardar el Hero.', 'error')
        } finally {
            setGuardandoHero(false)
        }
    }

    const handleImagenHeroSubida = (url: string) => {
        setHeroConfig(prev => ({ ...prev, hero_imagen_url: url }))
        if (url) addToast('Imagen del Hero subida. Haz clic en Guardar para aplicarla.', 'info')
    }

    // ─── Mutaciones del Carrusel ─────────────────────────────
    const actualizarCampoCategoria = (
        slug: string,
        campo: keyof CategoriaConImagen,
        valor: any
    ) => {
        setCategorias(prev => {
            const updated = prev.map(c => c.slug === slug ? { ...c, [campo]: valor } : c)
            const cat = updated.find(c => c.slug === slug)
            if (cat) marcarDirty(slug, cat)
            return updated
        })
    }

    const handleImagenCategoriaSubida = (slug: string, url: string) => {
        setCategorias(prev => {
            const updated = prev.map(c => c.slug === slug ? { ...c, imagen_url: url } : c)
            const cat = updated.find(c => c.slug === slug)
            if (cat) marcarDirty(slug, cat)
            return updated
        })
        // No toast aquí — el usuario ve la preview inmediatamente
    }

    const guardarTarjetaCarrusel = async (categoria: CategoriaConImagen) => {
        setGuardandoCategoria(prev => ({ ...prev, [categoria.slug]: true }))
        try {
            const { success, error } = await updateCategoriaServicio(categoria.slug, {
                nombre: categoria.nombre,
                descripcion: categoria.descripcion ?? '',
                imagen_url: categoria.imagen_url,
                es_activo: categoria.es_activo,
            })
            if (!success) throw new Error(error || 'Error al guardar la tarjeta')

            // Actualizar snapshot — ya no hay cambios pendientes
            savedCategorias.current[categoria.slug] = { ...categoria }
            setDirty(prev => ({ ...prev, [categoria.slug]: false }))
            setEditandoCard(prev => ({ ...prev, [categoria.slug]: false }))

            addToast(`✓ "${categoria.nombre}" actualizado con éxito.`, 'success')
        } catch (err: any) {
            addToast(err.message || 'Error al guardar la tarjeta.', 'error')
        } finally {
            setGuardandoCategoria(prev => ({ ...prev, [categoria.slug]: false }))
        }
    }

    const handleEliminarCategoria = async (categoria: CategoriaConImagen) => {
        if (!confirm(`¿Ocultar la tarjeta "${categoria.nombre}" del carrusel?`)) return
        setGuardandoCategoria(prev => ({ ...prev, [categoria.slug]: true }))
        try {
            const { success, error } = await updateCategoriaServicio(categoria.slug, { es_activo: false })
            if (!success) throw new Error(error || 'Error al ocultar la tarjeta')
            setCategorias(prev => prev.filter(c => c.slug !== categoria.slug))
            addToast(`Tarjeta "${categoria.nombre}" ocultada del carrusel.`, 'success')
        } catch (err: any) {
            addToast(err.message || 'Error al intentar ocultar la tarjeta.', 'error')
        } finally {
            setGuardandoCategoria(prev => ({ ...prev, [categoria.slug]: false }))
        }
    }

    const categoriasActivas = categorias.filter(c => c.es_activo)

    return (
        <>
            <ToastContainer toasts={toasts} onDismiss={removeToast} />

            <div className="w-full max-w-6xl mx-auto space-y-12 pb-12 px-4 md:px-6">

                {/* ─── HERO ─────────────────────────────── */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Página de Inicio</h1>
                            <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-sm">
                                Gestiona el Hero principal y las tarjetas del carrusel de servicios.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 md:p-8">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                                <SparklesIcon className="w-5 h-5 text-blue-500" /> Hero Principal
                            </h2>
                            <button
                                onClick={guardarHero}
                                disabled={guardandoHero || cargandoHero}
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-medium hover:from-blue-700 hover:to-cyan-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/25"
                            >
                                {guardandoHero ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                {guardandoHero ? 'Guardando...' : 'Guardar Hero'}
                            </button>
                        </div>

                        {cargandoHero ? (
                            <div className="flex items-center gap-3 text-zinc-400 py-6">
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span className="text-sm">Cargando Hero...</span>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Textos */}
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Título principal</label>
                                        <input
                                            type="text"
                                            value={heroConfig.hero_titulo_home}
                                            onChange={e => setHeroConfig({ ...heroConfig, hero_titulo_home: e.target.value })}
                                            className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-slate-900 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Subtítulo</label>
                                        <textarea
                                            rows={3}
                                            value={heroConfig.hero_subtitulo_home}
                                            onChange={e => setHeroConfig({ ...heroConfig, hero_subtitulo_home: e.target.value })}
                                            className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-slate-900 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 pt-2">
                                        <div>
                                            <label className="block text-xs font-semibold text-zinc-500 uppercase mb-2">CTA Principal</label>
                                            <input type="text" placeholder="Texto" value={heroConfig.hero_cta_principal_texto}
                                                onChange={e => setHeroConfig({ ...heroConfig, hero_cta_principal_texto: e.target.value })}
                                                className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-slate-900 text-zinc-900 dark:text-white mb-2" />
                                            <input type="text" placeholder="Link" value={heroConfig.hero_cta_principal_link}
                                                onChange={e => setHeroConfig({ ...heroConfig, hero_cta_principal_link: e.target.value })}
                                                className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-slate-900 text-zinc-900 dark:text-white" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-zinc-500 uppercase mb-2">CTA Secundario</label>
                                            <input type="text" placeholder="Texto" value={heroConfig.hero_cta_secundario_texto}
                                                onChange={e => setHeroConfig({ ...heroConfig, hero_cta_secundario_texto: e.target.value })}
                                                className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-slate-900 text-zinc-900 dark:text-white mb-2" />
                                            <input type="text" placeholder="Link" value={heroConfig.hero_cta_secundario_link}
                                                onChange={e => setHeroConfig({ ...heroConfig, hero_cta_secundario_link: e.target.value })}
                                                className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-slate-900 text-zinc-900 dark:text-white" />
                                        </div>
                                    </div>
                                </div>

                                {/* Imagen Hero */}
                                <div>
                                    <ImageUploader
                                        currentUrl={heroConfig.hero_imagen_url || undefined}
                                        carpeta="hero"
                                        onUploadSuccess={handleImagenHeroSubida}
                                        label="Imagen de fondo del Hero"
                                        hint="Recomendado: 1920×1080px."
                                    />
                                    <input
                                        type="text"
                                        placeholder="O pega URL manual"
                                        value={heroConfig.hero_imagen_url}
                                        onChange={e => setHeroConfig({ ...heroConfig, hero_imagen_url: e.target.value })}
                                        className="mt-3 w-full px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-slate-900 text-zinc-900 dark:text-white"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* ─── CARRUSEL DE SERVICIOS ────────────── */}
                <section>
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                        <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                            <LayersIcon className="w-5 h-5 text-blue-500" /> Tarjetas del Carrusel de Servicios
                        </h2>
                        <button
                            onClick={cargarCategorias}
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 text-zinc-700 dark:text-zinc-300 rounded-xl font-medium hover:bg-zinc-50 dark:hover:bg-slate-700 border border-zinc-200 dark:border-zinc-700 transition-all shadow-sm"
                        >
                            <RefreshCw className="w-4 h-4" /> Recargar
                        </button>
                    </div>

                    {cargandoCategorias ? (
                        <div className="flex items-center justify-center gap-3 text-zinc-400 py-12">
                            <Loader2 className="w-6 h-6 animate-spin" />
                            <span className="text-sm font-medium">Cargando tarjetas...</span>
                        </div>
                    ) : categoriasActivas.length === 0 ? (
                        <div className="text-center py-20 bg-white dark:bg-slate-800/50 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700">
                            <ImageIcon className="w-12 h-12 mx-auto mb-4 text-zinc-400 opacity-50" />
                            <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">No hay tarjetas activas</h3>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {categoriasActivas.map(categoria => {
                                const isSaving = guardandoCategoria[categoria.slug] ?? false
                                const hasDirty = dirty[categoria.slug] ?? false

                                return (
                                    <div
                                        key={categoria.id}
                                        className={`bg-white dark:bg-[#0a0f1c] rounded-2xl border shadow-xl overflow-hidden flex flex-col relative transition-all duration-300 ${
                                            hasDirty
                                                ? 'border-blue-400/60 dark:border-blue-500/40 shadow-blue-500/10'
                                                : 'border-zinc-200 dark:border-zinc-800'
                                        }`}
                                    >
                                        {/* Indicador de cambios pendientes */}
                                        {hasDirty && (
                                            <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-amber-500/90 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow">
                                                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                                Cambios sin guardar
                                            </div>
                                        )}

                                        {/* Preview imagen */}
                                        <div className="relative w-full h-40 bg-zinc-800 shrink-0">
                                            {categoria.imagen_url ? (
                                                <>
                                                    <img
                                                        src={categoria.imagen_url}
                                                        alt={categoria.nombre}
                                                        className="absolute inset-0 w-full h-full object-cover"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent dark:from-[#0a0f1c] dark:via-[#0a0f1c]/40" />
                                                </>
                                            ) : (
                                                <>
                                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-cyan-900" />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent dark:from-[#0a0f1c] dark:via-[#0a0f1c]/40" />
                                                </>
                                            )}
                                            <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10">
                                                <p className="text-xs text-white font-mono">{categoria.slug}</p>
                                            </div>
                                        </div>

                                        {/* Campos de edición */}
                                        <div className="p-5 flex-1 flex flex-col gap-4 border-t border-zinc-100 dark:border-zinc-800/50">
                                            <div className="space-y-3">
                                                <div>
                                                    <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase tracking-wide">Título</label>
                                                    <input
                                                        id={`titulo-${categoria.slug}`}
                                                        type="text"
                                                        value={categoria.nombre}
                                                        disabled={!editandoCard[categoria.slug]}
                                                        onChange={e => actualizarCampoCategoria(categoria.slug, 'nombre', e.target.value)}
                                                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-slate-900 text-zinc-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm disabled:opacity-70 disabled:cursor-not-allowed"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase tracking-wide">Descripción</label>
                                                    <textarea
                                                        rows={2}
                                                        value={categoria.descripcion || ''}
                                                        disabled={!editandoCard[categoria.slug]}
                                                        onChange={e => actualizarCampoCategoria(categoria.slug, 'descripcion', e.target.value)}
                                                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-slate-900 text-zinc-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none disabled:opacity-70 disabled:cursor-not-allowed"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase tracking-wide">Imagen de Fondo</label>
                                                <ImageUploader
                                                    currentUrl={categoria.imagen_url}
                                                    carpeta={`servicios/${categoria.slug}`}
                                                    onUploadSuccess={url => handleImagenCategoriaSubida(categoria.slug, url)}
                                                    label=""
                                                    disabled={!editandoCard[categoria.slug]}
                                                />
                                            </div>

                                            {/* ─── Footer de acciones con iconos dinámicos ─── */}
                                            <div className="mt-auto pt-4 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800">
                                                {/* Icono Eliminar (siempre visible) */}
                                                <button
                                                    onClick={() => handleEliminarCategoria(categoria)}
                                                    disabled={isSaving}
                                                    title="Ocultar del carrusel"
                                                    className="p-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                                                >
                                                    <Trash2 className="w-4.5 h-4.5" />
                                                </button>

                                                <div className="flex items-center gap-2">
                                                    {/* Botón Editar: habilita el modo edición y hace focus al input */}
                                                    <button
                                                        type="button"
                                                        title="Habilitar edición"
                                                        onClick={() => {
                                                            setEditandoCard(prev => ({ ...prev, [categoria.slug]: true }))
                                                            setTimeout(() => {
                                                                document.getElementById(`titulo-${categoria.slug}`)?.focus()
                                                            }, 50)
                                                        }}
                                                        className={`p-2.5 rounded-xl transition-all ${
                                                            editandoCard[categoria.slug]
                                                                ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20 cursor-default'
                                                                : 'text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 cursor-pointer'
                                                        }`}
                                                    >
                                                        <Pencil className="w-4 h-4" />
                                                    </button>

                                                    {/* Icono Guardar — solo se renderiza cuando el modo edición está activo */}
                                                    {editandoCard[categoria.slug] && (
                                                        <div className="transition-all duration-300">
                                                            <button
                                                                onClick={() => guardarTarjetaCarrusel(categoria)}
                                                                disabled={isSaving || !hasDirty}
                                                                title="Guardar cambios"
                                                                className={`relative p-2.5 rounded-xl transition-all duration-200 text-white
                                                                    ${isSaving
                                                                        ? 'bg-blue-500 opacity-80'
                                                                        : hasDirty
                                                                            ? 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30'
                                                                            : 'bg-zinc-400 dark:bg-zinc-700 cursor-not-allowed opacity-50'
                                                                    }
                                                                `}
                                                            >
                                                                {isSaving
                                                                    ? <Loader2 className="w-4 h-4 animate-spin" />
                                                                    : <Save className="w-4 h-4" />
                                                                }
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </section>
            </div>

            <style>{`
                @keyframes pulse-slow {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.5); }
                    50%       { box-shadow: 0 0 0 6px rgba(59, 130, 246, 0); }
                }
                .animate-pulse-slow { animation: pulse-slow 2s ease-in-out infinite; }
            `}</style>
        </>
    )
}

// ─── Iconos SVG inline (no dependen de lucide) ───────────────
function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        </svg>
    )
}
function LayersIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
        </svg>
    )
}
