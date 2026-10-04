'use client'

import { useState, useRef } from 'react'
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { SectionEyebrow } from '@/components/ui/SectionEyebrow'
import { submitContactLead, type SubmitResult } from '@/lib/actions/contacto'
import { siteConfig } from '@/config/site'
import { SERVICIOS_COMERCIALES } from '@/data/services-data'

// ── Datos de contacto desde config centralizado ───────────────────────────────
const CONTACT_INFO = [
    {
        icon: '📧',
        label: 'Email',
        value: siteConfig.contacto.email,
        href: `mailto:${siteConfig.contacto.email}`,
    },
    {
        icon: '💬',
        label: 'WhatsApp',
        value: siteConfig.contacto.telefono,
        href: siteConfig.whatsapp.url,
    },
    {
        icon: '📍',
        label: 'Ubicación',
        value: siteConfig.contacto.ubicacion,
        href: '',
    },
    {
        icon: '🕐',
        label: 'Horario',
        value: siteConfig.contacto.horario,
        href: '',
    },
]

// ── Opciones de tipo de proyecto (derivadas del catálogo comercial real) ───────
const TIPOS_PROYECTO = [
    { value: '', label: 'Selecciona una opción' },
    ...SERVICIOS_COMERCIALES.map((servicio) => ({
        value: servicio.slug,
        label: servicio.nombre,
    })),
    { value: 'otro', label: 'Otro / No estoy seguro' },
]

// ── Tipos ─────────────────────────────────────────────────────────────────────
type FormStatus = 'idle' | 'sending' | 'success' | 'error'
type FieldName = 'nombre' | 'email' | 'telefono' | 'nombre_negocio' | 'rubro' | 'servicio_interes' | 'mensaje'
type TouchedState = Partial<Record<FieldName, boolean>>
type LocalErrors  = Partial<Record<FieldName, string>>
type ServerErrors = Partial<Record<string, string[]>>

// ── Regex de validación local ─────────────────────────────────────────────────
const EMAIL_REGEX    = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// Acepta solo 9 dígitos que comiencen con 9
const PHONE_VALID_RE = /^9\d{8}$/

// ── Validadores por campo ─────────────────────────────────────────────────────
function validateField(name: FieldName, value: string): string {
    switch (name) {
        case 'nombre':
            if (!value.trim()) return 'Ingresa tu nombre (mínimo 2 caracteres).'
            if (value.trim().length < 2) return 'Ingresa tu nombre (mínimo 2 caracteres).'
            return ''
        case 'email':
            if (!value.trim()) return 'Ingresa un correo electrónico válido.'
            if (!EMAIL_REGEX.test(value.trim())) return 'Ingresa un correo electrónico válido.'
            return ''
        case 'telefono': {
            if (!value.trim()) return 'Ingresa un número válido de Chile. Debe tener 9 dígitos y comenzar con 9.'
            if (!PHONE_VALID_RE.test(value.trim())) return 'Ingresa un número válido de Chile. Debe tener 9 dígitos y comenzar con 9.'
            return ''
        }
        case 'servicio_interes':
            if (!value) return 'Por favor, selecciona un tipo de proyecto.'
            return ''
        case 'mensaje':
            if (!value.trim()) return 'Cuéntanos un poco más (mínimo 10 caracteres).'
            if (value.trim().length < 10) return 'Cuéntanos un poco más (mínimo 10 caracteres).'
            return ''
        default:
            return ''
    }
}

// ── Helper: primer error de campo (local o servidor) ─────────────────────────
function resolveError(
    name: FieldName,
    localErrors: LocalErrors,
    serverErrors: ServerErrors,
    touched: TouchedState
): string | undefined {
    // Errores de servidor tienen prioridad (vienen tras submit)
    const serverMsg = serverErrors[name]?.[0]
    if (serverMsg) return serverMsg
    // Errores locales solo si el campo fue tocado
    if (touched[name]) return localErrors[name] || undefined
    return undefined
}

// ── Componente de mensaje de error ────────────────────────────────────────────
function FieldErrorMsg({ id, message }: { id: string; message?: string }) {
    if (!message) return null
    return (
        <p id={id} role="alert" aria-live="polite" className="mt-1 text-xs text-red-600 dark:text-red-400">
            {message}
        </p>
    )
}

// ── Clases de input ───────────────────────────────────────────────────────────
function inputClass(hasError: boolean): string {
    return [
        'w-full px-4 py-2.5 rounded-lg border text-zinc-900 dark:text-white',
        'bg-white dark:bg-slate-900 transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
        hasError
            ? 'border-red-400 dark:border-red-500'
            : 'border-zinc-300 dark:border-zinc-700',
    ].join(' ')
}

// ═════════════════════════════════════════════════════════════════════════════
export default function ContactoPage(): React.JSX.Element {
    const [status, setStatus]             = useState<FormStatus>('idle')
    const [generalError, setGeneralError] = useState('')
    const [localErrors, setLocalErrors]   = useState<LocalErrors>({})
    const [serverErrors, setServerErrors] = useState<ServerErrors>({})
    const [touched, setTouched]           = useState<TouchedState>({})
    const [mensajeLen, setMensajeLen]     = useState(0)
    const formRef = useRef<HTMLFormElement>(null)

    // ── Marcar campo como tocado y validar ─────────────────────────────────
    function handleBlur(name: FieldName, value: string) {
        setTouched((prev) => ({ ...prev, [name]: true }))
        const err = validateField(name, value)
        setLocalErrors((prev) => ({ ...prev, [name]: err }))
    }

    // ── Validar al cambiar (solo si el campo ya fue tocado) ────────────────
    function handleChange(name: FieldName, value: string) {
        if (touched[name]) {
            const err = validateField(name, value)
            setLocalErrors((prev) => ({ ...prev, [name]: err }))
        }
        // Limpiar error de servidor cuando el usuario edita el campo
        if (serverErrors[name]) {
            setServerErrors((prev) => {
                const next = { ...prev }
                delete next[name]
                return next
            })
        }
    }

    // ── Filtro de teclas para WhatsApp (solo caracteres válidos) ──────────
    function handlePhoneKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        const allowed = ['Backspace','Delete','Tab','Escape','Enter','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End']
        if (allowed.includes(e.key)) return
        if (/^\d$/.test(e.key)) return // solo permitir dígitos 0-9
        e.preventDefault()
    }

    // ── Submit ─────────────────────────────────────────────────────────────
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (status === 'sending') return

        // Marcar todos los campos requeridos como touched y validar
        const fieldsToValidate: FieldName[] = ['nombre', 'email', 'telefono', 'servicio_interes', 'mensaje']
        const form = e.currentTarget
        const allTouched: TouchedState = {}
        const allErrors: LocalErrors   = {}
        let hasLocalError = false

        for (const name of fieldsToValidate) {
            allTouched[name] = true
            const input = form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null
            const value = input?.value ?? ''
            const err   = validateField(name, value)
            allErrors[name] = err
            if (err) hasLocalError = true
        }
        setTouched(allTouched)
        setLocalErrors(allErrors)

        if (hasLocalError) return   // detener si hay errores locales

        setStatus('sending')
        setGeneralError('')
        setServerErrors({})

        try {
            const formData = new FormData(form)
            
            // Componer número con prefijo antes de enviar a Server Action
            const rawTelefono = formData.get('telefono') as string | null
            if (rawTelefono) {
                formData.set('telefono', '+56' + rawTelefono)
            }

            const result: SubmitResult = await submitContactLead(formData)

            if (result.status === 'success') {
                setStatus('success')
                setTouched({})
                setLocalErrors({})
                setMensajeLen(0)
                formRef.current?.reset()
            } else {
                setStatus('error')
                setGeneralError(
                    result.message ??
                    'Ocurrió un error al enviar tu solicitud. Por favor, escríbenos directamente por WhatsApp.'
                )
                if (result.errors) setServerErrors(result.errors)
            }
        } catch {
            setStatus('error')
            setGeneralError('Ocurrió un error al enviar tu solicitud. Por favor, escríbenos directamente por WhatsApp.')
        }
    }

    // ── Render ─────────────────────────────────────────────────────────────
    return (
        <main className="flex flex-col">
            {/* Hero */}
            <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <SectionEyebrow text="Hablemos de tu Proyecto" />
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl mx-auto drop-shadow-sm">
                        <SectionTitle text="Contáctanos" />
                    </h1>
                    <p className="mt-6 text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                        ¿Tienes una idea en mente? Cuéntanos sobre tu proyecto y te responderemos en menos de 24 horas con una propuesta personalizada.
                    </p>
                </div>
            </section>

            {/* Contenido: Info + Formulario */}
            <section className="pb-20 lg:pb-28 relative">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">

                        {/* Info de Contacto */}
                        <div>
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
                                Información de Contacto
                            </h2>
                            <div className="space-y-4">
                                {CONTACT_INFO.map((item) => {
                                    const Wrapper = item.href ? 'a' : 'div'
                                    const wrapperProps = item.href
                                        ? {
                                              href: item.href,
                                              target: item.href.startsWith('http') ? '_blank' : undefined,
                                              rel: item.href.startsWith('http') ? 'noopener noreferrer' : undefined,
                                          }
                                        : {}
                                    return (
                                        <Wrapper
                                            key={item.label}
                                            {...wrapperProps}
                                            className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800/50 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all group"
                                        >
                                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xl">
                                                {item.icon}
                                            </div>
                                            <div>
                                                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                                                    {item.label}
                                                </p>
                                                <p className="text-zinc-900 dark:text-white font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                    {item.value}
                                                </p>
                                            </div>
                                        </Wrapper>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Formulario */}
                        <div id="cotizar" className="scroll-mt-32">
                            <div className="bg-white dark:bg-slate-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8">
                                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
                                    Solicita tu cotización
                                </h2>
                                <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-6">
                                    Completa el formulario y nos pondremos en contacto contigo lo antes posible.
                                </p>

                                {status === 'success' ? (
                                    <div className="text-center py-12" role="status" aria-live="polite">
                                        <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                                            <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
                                        </div>
                                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                                            ¡Mensaje enviado!
                                        </h3>
                                        <p className="text-zinc-500 dark:text-zinc-400">
                                            ¡Gracias por contactarnos! Te responderemos en menos de 24 horas con una propuesta.
                                        </p>
                                    </div>
                                ) : (
                                    <form
                                        ref={formRef}
                                        onSubmit={handleSubmit}
                                        className="space-y-5"
                                        noValidate
                                        aria-label="Formulario de contacto y cotización"
                                    >
                                        {/* Fila 1: Nombre + Email */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {/* Nombre */}
                                            {(() => {
                                                const err = resolveError('nombre', localErrors, serverErrors, touched)
                                                return (
                                                    <div>
                                                        <label htmlFor="nombre" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                                            Nombre <span className="text-red-500" aria-hidden="true">*</span>
                                                        </label>
                                                        <input
                                                            id="nombre"
                                                            name="nombre"
                                                            type="text"
                                                            maxLength={80}
                                                            placeholder="Tu nombre"
                                                            aria-required="true"
                                                            aria-invalid={!!err}
                                                            aria-describedby={err ? 'error-nombre' : undefined}
                                                            className={inputClass(!!err)}
                                                            onBlur={(e) => handleBlur('nombre', e.target.value)}
                                                            onChange={(e) => handleChange('nombre', e.target.value)}
                                                        />
                                                        <FieldErrorMsg id="error-nombre" message={err} />
                                                    </div>
                                                )
                                            })()}

                                            {/* Email */}
                                            {(() => {
                                                const err = resolveError('email', localErrors, serverErrors, touched)
                                                return (
                                                    <div>
                                                        <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                                            Email <span className="text-red-500" aria-hidden="true">*</span>
                                                        </label>
                                                        <input
                                                            id="email"
                                                            name="email"
                                                            type="email"
                                                            maxLength={100}
                                                            placeholder="tu@email.com"
                                                            aria-required="true"
                                                            aria-invalid={!!err}
                                                            aria-describedby={err ? 'error-email' : undefined}
                                                            className={inputClass(!!err)}
                                                            onBlur={(e) => handleBlur('email', e.target.value)}
                                                            onChange={(e) => handleChange('email', e.target.value)}
                                                        />
                                                        <FieldErrorMsg id="error-email" message={err} />
                                                    </div>
                                                )
                                            })()}
                                        </div>

                                        {/* Fila 2: WhatsApp + Nombre del negocio */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {/* WhatsApp */}
                                            {(() => {
                                                const err = resolveError('telefono', localErrors, serverErrors, touched)
                                                return (
                                                    <div>
                                                        <label htmlFor="telefono" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                                            Número de teléfono o WhatsApp <span className="text-red-500" aria-hidden="true">*</span>
                                                        </label>
                                                        <div className={`relative flex items-stretch rounded-lg border bg-white dark:bg-slate-900 overflow-hidden transition-colors focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent ${err ? 'border-red-400 dark:border-red-500' : 'border-zinc-300 dark:border-zinc-700'}`}>
                                                            <div className="flex items-center px-4 bg-zinc-50 dark:bg-slate-800 text-zinc-500 dark:text-zinc-400 border-r border-zinc-300 dark:border-zinc-700 select-none">
                                                                +56
                                                            </div>
                                                            <input
                                                                id="telefono"
                                                                name="telefono"
                                                                type="tel"
                                                                maxLength={9}
                                                                placeholder="9 3516 2784"
                                                                aria-required="true"
                                                                aria-invalid={!!err}
                                                                aria-describedby={err ? 'error-telefono' : 'hint-telefono'}
                                                                className="w-full px-4 py-2.5 bg-transparent text-zinc-900 dark:text-white focus:outline-none"
                                                                onKeyDown={handlePhoneKeyDown}
                                                                onBlur={(e) => handleBlur('telefono', e.target.value)}
                                                                onChange={(e) => handleChange('telefono', e.target.value)}
                                                            />
                                                        </div>
                                                        {err ? (
                                                            <FieldErrorMsg id="error-telefono" message={err} />
                                                        ) : (
                                                            <p id="hint-telefono" className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">
                                                                Ejemplo: +56 9 1234 5678
                                                            </p>
                                                        )}
                                                    </div>
                                                )
                                            })()}

                                            {/* Nombre del negocio */}
                                            {(() => {
                                                const err = resolveError('nombre_negocio', localErrors, serverErrors, touched)
                                                return (
                                                    <div>
                                                        <label htmlFor="nombre_negocio" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                                            Nombre del negocio
                                                        </label>
                                                        <input
                                                            id="nombre_negocio"
                                                            name="nombre_negocio"
                                                            type="text"
                                                            maxLength={100}
                                                            placeholder="Tu empresa o emprendimiento"
                                                            aria-invalid={!!err}
                                                            aria-describedby={err ? 'error-nombre_negocio' : undefined}
                                                            className={inputClass(!!err)}
                                                        />
                                                        <FieldErrorMsg id="error-nombre_negocio" message={err} />
                                                    </div>
                                                )
                                            })()}
                                        </div>

                                        {/* Fila 3: Rubro + Tipo de proyecto */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {/* Rubro */}
                                            {(() => {
                                                const err = resolveError('rubro', localErrors, serverErrors, touched)
                                                return (
                                                    <div>
                                                        <label htmlFor="rubro" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                                            Rubro
                                                        </label>
                                                        <input
                                                            id="rubro"
                                                            name="rubro"
                                                            type="text"
                                                            maxLength={100}
                                                            placeholder="Ej: Gastronomía, Salud, Retail..."
                                                            aria-invalid={!!err}
                                                            aria-describedby={err ? 'error-rubro' : undefined}
                                                            className={inputClass(!!err)}
                                                        />
                                                        <FieldErrorMsg id="error-rubro" message={err} />
                                                    </div>
                                                )
                                            })()}

                                            {/* Tipo de proyecto */}
                                            {(() => {
                                                const err = resolveError('servicio_interes', localErrors, serverErrors, touched)
                                                return (
                                                    <div>
                                                        <label htmlFor="servicio_interes" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                                            Tipo de proyecto <span className="text-red-500" aria-hidden="true">*</span>
                                                        </label>
                                                        <select
                                                            id="servicio_interes"
                                                            name="servicio_interes"
                                                            aria-required="true"
                                                            aria-invalid={!!err}
                                                            aria-describedby={err ? 'error-servicio_interes' : undefined}
                                                            className={inputClass(!!err)}
                                                            onChange={(e) => {
                                                                setTouched((prev) => ({ ...prev, servicio_interes: true }))
                                                                handleChange('servicio_interes', e.target.value)
                                                            }}
                                                        >
                                                            {TIPOS_PROYECTO.map((opt) => (
                                                                <option key={opt.value} value={opt.value}>
                                                                    {opt.label}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <FieldErrorMsg id="error-servicio_interes" message={err} />
                                                    </div>
                                                )
                                            })()}
                                        </div>

                                        {/* Mensaje */}
                                        {(() => {
                                            const err = resolveError('mensaje', localErrors, serverErrors, touched)
                                            return (
                                                <div>
                                                    <label htmlFor="mensaje" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                                        Mensaje breve <span className="text-red-500" aria-hidden="true">*</span>
                                                    </label>
                                                    <textarea
                                                        id="mensaje"
                                                        name="mensaje"
                                                        rows={4}
                                                        maxLength={1000}
                                                        placeholder="Cuéntanos brevemente sobre tu proyecto..."
                                                        aria-required="true"
                                                        aria-invalid={!!err}
                                                        aria-describedby={err ? 'error-mensaje' : 'hint-mensaje'}
                                                        className={inputClass(!!err) + ' resize-none'}
                                                        onBlur={(e) => handleBlur('mensaje', e.target.value)}
                                                        onChange={(e) => {
                                                            setMensajeLen(e.target.value.length)
                                                            handleChange('mensaje', e.target.value)
                                                        }}
                                                    />
                                                    <div className="flex items-center justify-between mt-1">
                                                        {err ? (
                                                            <FieldErrorMsg id="error-mensaje" message={err} />
                                                        ) : (
                                                            <p id="hint-mensaje" className="text-xs text-zinc-400 dark:text-zinc-500">
                                                                Mínimo 10 caracteres.
                                                            </p>
                                                        )}
                                                        <span className={`text-xs ml-auto pl-2 tabular-nums ${mensajeLen > 900 ? 'text-orange-500' : 'text-zinc-400 dark:text-zinc-500'}`}>
                                                            {mensajeLen}/1000
                                                        </span>
                                                    </div>
                                                </div>
                                            )
                                        })()}

                                        {/* Error general (falla Supabase u otro) */}
                                        {status === 'error' && generalError && (
                                            <div
                                                role="alert"
                                                aria-live="assertive"
                                                className="flex items-start gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm"
                                            >
                                                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
                                                <span>
                                                    {generalError}{' '}
                                                    <a
                                                        href={siteConfig.whatsapp.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="underline font-medium hover:text-red-900 dark:hover:text-red-200 transition-colors"
                                                    >
                                                        Ir al WhatsApp →
                                                    </a>
                                                </span>
                                            </div>
                                        )}

                                        {/* Botón de envío */}
                                        <button
                                            type="submit"
                                            disabled={status === 'sending'}
                                            aria-disabled={status === 'sending'}
                                            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-medium hover:from-blue-700 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        >
                                            {status === 'sending' ? (
                                                <><Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> Enviando...</>
                                            ) : (
                                                <><Send className="w-4 h-4" aria-hidden="true" /> Enviar Solicitud</>
                                            )}
                                        </button>

                                        <p className="text-xs text-zinc-400 dark:text-zinc-500 text-center">
                                            Los campos marcados con <span className="text-red-500">*</span> son obligatorios.
                                        </p>
                                    </form>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    )
}
