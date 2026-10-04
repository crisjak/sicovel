import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireAdmin, UnauthorizedError } from '@/lib/auth/require-admin'

const BUCKET = 'carrusel'

/**
 * POST /api/upload
 * Sube un archivo de imagen al bucket "carrusel" de Supabase Storage.
 * Retorna la URL pública de la imagen subida.
 */
export async function POST(req: Request) {
    try {
        await requireAdmin()

        const formData = await req.formData()
        const file = formData.get('file') as File | null
        const carpeta = (formData.get('carpeta') as string) || 'general'

        if (!file) {
            return NextResponse.json({ error: 'No se envió ningún archivo', success: false }, { status: 400 })
        }

        const supabase = createClient()
        
        // Limpiar el nombre del archivo
        const sanitizedName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '')
        const extension = sanitizedName.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${extension}`
        const filePath = `${carpeta}/${fileName}`

        const { data, error } = await supabase.storage
            .from(BUCKET)
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false
            })

        if (error) {
            console.error('[api/upload] Error de Supabase:', error)
            return NextResponse.json({ error: error.message, success: false }, { status: 500 })
        }

        const { data: publicData } = supabase.storage.from(BUCKET).getPublicUrl(data.path)

        return NextResponse.json({ success: true, url: publicData.publicUrl })
    } catch (error) {
        if (error instanceof UnauthorizedError) {
            return NextResponse.json({ error: 'Acción bloqueada por seguridad: No autorizado', success: false }, { status: 403 })
        }
        console.error('[api/upload] Error:', error)
        return NextResponse.json({ error: 'Error interno del servidor', success: false }, { status: 500 })
    }
}
