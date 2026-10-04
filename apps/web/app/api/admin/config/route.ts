import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireAdmin, UnauthorizedError } from '@/lib/auth/require-admin'

/**
 * GET /api/admin/config
 * Devuelve todas las configuraciones de configuraciones_sitio como un objeto plano.
 * Solo para uso interno del panel de administración (protegido con requireAdmin).
 */
export async function GET() {
    try {
        await requireAdmin()
        
        const supabase = createClient()
        const { data, error } = await supabase
            .from('configuraciones_sitio')
            .select('clave, valor')

        if (error) throw error

        const configMap: Record<string, string> = {}
        for (const item of data ?? []) {
            let val = item.valor
            // Limpiar comillas extra de valores string en JSONB
            if (typeof val === 'string' && val.startsWith('"') && val.endsWith('"')) {
                val = val.slice(1, -1)
            }
            configMap[item.clave] = val as string
        }

        return NextResponse.json(configMap)
    } catch (error) {
        if (error instanceof UnauthorizedError) {
            return NextResponse.json({ error: 'Acción bloqueada por seguridad: No autorizado' }, { status: 403 })
        }
        console.error('[api/admin/config] Error:', error)
        return NextResponse.json({ error: 'Error al obtener configuración' }, { status: 500 })
    }
}
