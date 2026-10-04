/**
 * SICOVE API - Contenido del sitio
 * GET: Obtener todo el contenido
 * PUT: Actualizar todo el contenido
 */

import { NextResponse } from 'next/server'
import { getData, saveData } from '@/lib/data'

export async function GET() {
    try {
        const data = getData()
        return NextResponse.json(data)
    } catch (error) {
        console.error('Error al leer datos:', error)
        return NextResponse.json(
            { error: 'Error al leer los datos del sitio' },
            { status: 500 }
        )
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json()
        saveData(body)
        return NextResponse.json({ success: true, message: 'Datos actualizados correctamente' })
    } catch (error) {
        console.error('Error al guardar datos:', error)
        return NextResponse.json(
            { error: 'Error al guardar los datos' },
            { status: 500 }
        )
    }
}
