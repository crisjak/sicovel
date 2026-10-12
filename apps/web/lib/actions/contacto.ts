'use server'

import { createPublicClient } from '@/lib/supabase/client-public'
import { z } from 'zod'
import { SERVICIOS_COMERCIALES } from '@/data/services-data'

// ── Slugs válidos derivados dinámicamente del catálogo comercial ──────────────
// Se incluye 'otro' porque esa opción existe realmente en el formulario público.
const SLUGS_VALIDOS = [
    ...SERVICIOS_COMERCIALES.map((s) => s.slug),
    'otro',
] as const

// ── Helper: limpiar y normalizar un número de WhatsApp chileno ────────────────
// Acepta: +56920477927 / 56920477927 / 920477927 / +56 9 2047 7927 / con guiones
// Salida: +56920477927
function normalizarWhatsapp(raw: string): string {
    // Eliminar todo excepto dígitos y el signo +
    const clean = raw.replace(/[\s\-().]/g, '')
    // Si quedó con + al inicio, lo quitamos para trabajar solo con dígitos
    const digits = clean.replace(/^\+/, '')

    if (digits.startsWith('56')) return `+${digits}`       // 56920477927 → +56920477927
    if (digits.startsWith('9') && digits.length === 9) return `+56${digits}` // 920477927 → +56920477927
    // Si ya llegó con + y era +56..., está bien
    return clean.startsWith('+') ? clean : `+${digits}`
}

// ── Esquema Zod con validaciones completas ────────────────────────────────────
const contactoSchema = z.object({
    nombre: z
        .string()
        .min(2, 'Ingresa tu nombre (mínimo 2 caracteres).')
        .max(80, 'El nombre no puede superar los 80 caracteres.'),

    email: z
        .string()
        .email('Ingresa un correo electrónico válido.')
        .max(100, 'El correo no puede superar los 100 caracteres.'),

    // WhatsApp: se limpia con preprocess y luego se valida con regex chileno
    telefono: z.preprocess(
        (val) => {
            if (typeof val !== 'string' || val.trim() === '') return val
            // Limpiar espacios, guiones y paréntesis
            return val.replace(/[\s\-().]/g, '')
        },
        z
            .string({ error: 'Ingresa un número válido de Chile (ej: +56 9 2047 7927).' })
            .regex(
                /^(\+?56)?9\d{8}$/,
                'Ingresa un número válido de Chile (ej: +56 9 2047 7927).'
            )
    ),

    nombre_negocio: z
        .string()
        .max(100, 'El nombre del negocio no puede superar los 100 caracteres.')
        .optional(),

    rubro: z
        .string()
        .max(100, 'El rubro no puede superar los 100 caracteres.')
        .optional(),

    // Tipo de proyecto validado contra el catálogo real
    servicio_interes: z
        .string({ error: 'Por favor, selecciona un tipo de proyecto.' })
        .refine(
            (val) => (SLUGS_VALIDOS as readonly string[]).includes(val),
            'Por favor, selecciona un tipo de proyecto.'
        ),

    mensaje: z
        .string()
        .min(10, 'Cuéntanos un poco más (mínimo 10 caracteres).')
        .max(1000, 'El mensaje no puede superar los 1.000 caracteres.'),

    // Campos opcionales/internos — no visibles en el formulario público
    tipo_documento: z.string().optional(),
    plan_identificador: z.string().optional(),
})

type ContactoFormData = z.infer<typeof contactoSchema>

import { siteConfig } from '@/config/site'

// ── Tipo de retorno explícito para el cliente ─────────────────────────────────
export type SubmitResult = {
    status: 'success' | 'error'
    message: string
    errors?: Partial<Record<keyof ContactoFormData, string[]>>
    whatsappUrl?: string
    mailtoUrl?: string
}

export async function submitContactLead(formData: FormData): Promise<SubmitResult> {
    try {
        const getString = (key: string): string | undefined => {
            const val = formData.get(key)
            if (val === null || val === '') return undefined
            return String(val)
        }

        const rawData = {
            nombre:           getString('nombre'),
            email:            getString('email'),
            telefono:         getString('telefono'),
            nombre_negocio:   getString('nombre_negocio'),
            rubro:            getString('rubro'),
            tipo_documento:   getString('tipo_documento'),
            mensaje:          getString('mensaje'),
            servicio_interes: getString('servicio_interes'),
            plan_identificador: getString('plan_identificador'),
        }

        const validatedData = contactoSchema.safeParse(rawData)

        if (!validatedData.success) {
            return {
                status: 'error',
                message: 'Revisa los campos marcados e intenta nuevamente.',
                errors: validatedData.error.flatten().fieldErrors as Partial<Record<keyof ContactoFormData, string[]>>,
            }
        }

        const data = validatedData.data
        const telefonoNormalizado = normalizarWhatsapp(data.telefono)
        const servicioNombre = SERVICIOS_COMERCIALES.find((s) => s.slug === data.servicio_interes)?.nombre || (data.servicio_interes === 'otro' ? 'Otro / No estoy seguro' : data.servicio_interes)

        // Armar URL de WhatsApp prellenado
        const waLines = [
            '¡Hola SICOVEL! Quiero cotizar un proyecto web:',
            '',
            `👤 *Nombre:* ${data.nombre}`,
            `📧 *Email:* ${data.email}`,
            `📱 *Teléfono:* ${telefonoNormalizado}`,
            data.nombre_negocio ? `🏢 *Negocio:* ${data.nombre_negocio}` : null,
            data.rubro ? `💼 *Rubro:* ${data.rubro}` : null,
            `🚀 *Proyecto:* ${servicioNombre}`,
            '',
            '💬 *Mensaje:*',
            data.mensaje,
        ].filter(Boolean)

        const waText = encodeURIComponent(waLines.join('\n'))
        const whatsappUrl = `https://wa.me/${siteConfig.whatsapp.numero}?text=${waText}`

        // Armar URL mailto
        const emailSubject = encodeURIComponent(`Cotización Proyecto Web - ${data.nombre} (${servicioNombre})`)
        const emailBody = encodeURIComponent([
            'Hola equipo SICOVEL,',
            '',
            'Quiero solicitar una cotización con los siguientes detalles:',
            '',
            `Nombre: ${data.nombre}`,
            `Email: ${data.email}`,
            `Teléfono: ${telefonoNormalizado}`,
            data.nombre_negocio ? `Negocio / Empresa: ${data.nombre_negocio}` : null,
            data.rubro ? `Rubro: ${data.rubro}` : null,
            `Tipo de proyecto: ${servicioNombre}`,
            '',
            'Mensaje:',
            data.mensaje,
            '',
            'Enviado desde el formulario web de SICOVEL.',
        ].filter(Boolean).join('\n'))
        const mailtoUrl = `mailto:${siteConfig.contacto.email}?subject=${emailSubject}&body=${emailBody}`

        // Si Supabase está habilitado explícitamente, intentar guardar en BD
        if (process.env.NEXT_PUBLIC_ENABLE_SUPABASE === 'true') {
            try {
                const supabase = createPublicClient()
                await supabase.from('consultas_contacto').insert({
                    nombre:         data.nombre,
                    email:          data.email,
                    telefono:       telefonoNormalizado,
                    nombre_negocio: data.nombre_negocio ?? null,
                    rubro:          data.rubro ?? null,
                    tipo_documento: data.tipo_documento ?? null,
                    mensaje:        data.mensaje,
                    origen:         'formulario_web_sicovel',
                    datos_extra: {
                        servicio: data.servicio_interes,
                        plan:     data.plan_identificador,
                    },
                })
            } catch (err) {
                console.warn('[submitContactLead] Supabase no disponible, continuando en modo local:', err)
            }
        } else {
            console.info('[submitContactLead] Lead procesado en modo local (sin Supabase):', {
                nombre: data.nombre,
                email: data.email,
                telefono: telefonoNormalizado,
                servicio: servicioNombre,
            })
        }

        return {
            status: 'success',
            message: '¡Gracias por contactarnos! Tu consulta ha sido preparada correctamente.',
            whatsappUrl,
            mailtoUrl,
        }

    } catch (e) {
        console.error('Error inesperado en submitContactLead', e)
        return {
            status: 'error',
            message: 'Ocurrió un error al procesar tu solicitud. Por favor, contáctanos directamente por WhatsApp.',
        }
    }
}
