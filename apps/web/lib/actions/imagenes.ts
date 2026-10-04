'use server'

import { createClient } from '@/lib/supabase/server'
import { requireAdmin, UnauthorizedError } from '@/lib/auth/require-admin'
import { revalidatePath } from 'next/cache'

// Tipo mínimo compatible con los consumidores existentes (admin/inicio/page.tsx).
// slug es string obligatorio para que sea índice válido en Record<string, ...>.
type CategoriaBloqueada = {
    id: string
    slug: string
    nombre: string
    descripcion: string | null
    imagen_url?: string | null
    orden: number
    es_activo: boolean
    [key: string]: unknown
}

export async function upsertConfiguracion(clave: string, valor: string, tipoDato = 'string') {
    try {
        await requireAdmin()
        
        const supabase = createClient()
        const { error } = await supabase
            .from('configuraciones_sitio')
            .upsert({ clave, valor: JSON.parse(JSON.stringify(valor)), tipo_dato: tipoDato })
            
        if (error) throw error
        
        revalidatePath('/')
        return { success: true }
    } catch (error: any) {
        if (error instanceof UnauthorizedError) return { success: false, error: 'Acción bloqueada por seguridad: ' + error.message }
        console.error('[imagenes.ts] Error en upsertConfiguracion:', error)
        return { success: false, error: 'Error al actualizar configuración' }
    }
}

export async function updateCategoriaServicio(
    slug: string,
    data: { nombre?: string; descripcion?: string; imagen_url?: string; es_activo?: boolean }
) {
    try {
        await requireAdmin()
        
        const supabase = createClient()
        const { error } = await supabase
            .from('categorias_servicio')
            .update(data)
            .eq('slug', slug)
            
        if (error) throw error
        
        revalidatePath('/')
        return { success: true }
    } catch (error: any) {
        if (error instanceof UnauthorizedError) return { success: false, error: 'Acción bloqueada por seguridad: ' + error.message }
        console.error('[imagenes.ts] Error en updateCategoriaServicio:', error)
        return { success: false, error: 'Error al actualizar categoría' }
    }
}

export async function updateCategoriaImagenUrl(slug: string, imagenUrl: string) {
    try {
        await requireAdmin()
        
        const supabase = createClient()
        const { error } = await supabase
            .from('categorias_servicio')
            .update({ imagen_url: imagenUrl })
            .eq('slug', slug)
            
        if (error) throw error
        
        revalidatePath('/')
        return { success: true }
    } catch (error: any) {
        if (error instanceof UnauthorizedError) return { success: false, error: 'Acción bloqueada por seguridad: ' + error.message }
        console.error('[imagenes.ts] Error en updateCategoriaImagenUrl:', error)
        return { success: false, error: 'Error al actualizar URL de imagen' }
    }
}

export async function getCategorias() {
    try {
        await requireAdmin()
        
        const supabase = createClient()
        const { data, error } = await supabase
            .from('categorias_servicio')
            .select('*')
            .order('orden')
            
        if (error) throw error
        
        return { data: (data || []) as CategoriaBloqueada[], error: null }
    } catch (error: any) {
        if (error instanceof UnauthorizedError) return { data: [] as CategoriaBloqueada[], error: 'Acción bloqueada por seguridad: ' + error.message }
        console.error('[imagenes.ts] Error en getCategorias:', error)
        return { data: [] as CategoriaBloqueada[], error: 'Error al obtener categorías' }
    }
}
