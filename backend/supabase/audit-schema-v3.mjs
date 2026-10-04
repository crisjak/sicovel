/**
 * audit-schema-v3.mjs
 * Auditoría completa del schema real usando IDs reales de la DB.
 * Prueba constraints, índices y estado de la promo.
 */

const SUPABASE_URL = 'https://gbhedpqqpaxsmvfbldwy.supabase.co'
const SERVICE_ROLE  = 'REDACTED_SECRET'

const HEADERS = {
    'apikey': SERVICE_ROLE,
    'Authorization': `Bearer ${SERVICE_ROLE}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
}

async function get(path) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, { headers: HEADERS })
    const text = await res.text()
    return { ok: res.ok, status: res.status, body: JSON.parse(text) }
}

async function post(path, payload, prefer = 'return=minimal') {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
        method: 'POST',
        headers: { ...HEADERS, 'Prefer': prefer },
        body: JSON.stringify(payload),
    })
    const text = await res.text()
    return { ok: res.ok, status: res.status, body: text ? JSON.parse(text) : null }
}

async function del(path) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
        method: 'DELETE',
        headers: { ...HEADERS, 'Prefer': 'return=minimal' },
    })
    return { ok: res.ok, status: res.status }
}

function pass(msg) { console.log(`   ✅ ${msg}`) }
function fail(msg) { console.log(`   ❌ ${msg}`) }
function warn(msg) { console.log(`   ⚠️  ${msg}`) }
function section(msg) { console.log(`\n${'═'.repeat(55)}\n📋 ${msg}\n${'─'.repeat(55)}`) }

// ─── obtener datos reales ─────────────────────────────────────────────────────
async function main() {
    console.log('🔍 Auditoría completa del schema — tabla `planes`\n')

    // 1. Obtener categorías reales
    section('PASO 1 — Categorías disponibles')
    const cats = await get('categorias_servicio?select=id,slug,nombre&order=orden')
    if (!cats.ok) { fail('No se pudo obtener categorías'); return }
    cats.body.forEach(c => console.log(`   [${c.slug}] ${c.id}`))

    const catSitioId = cats.body.find(c => c.slug === 'sitio_informativo')?.id
    const catLandingId = cats.body.find(c => c.slug === 'landing')?.id
    if (!catSitioId) { fail('No se encontró categoría sitio_informativo'); return }

    // 2. Estado actual de todos los planes con campos promo
    section('PASO 2 — Estado actual columnas promo en todos los planes')
    const planes = await get(
        'planes?select=id,nivel,nombre,precio_unico_clp,precio_oferta_clp,promo_etiqueta,promo_activa,promo_inicio,promo_fin,categoria_id&order=orden'
    )
    if (!planes.ok) { fail('No se pudo leer planes'); return }
    
    const colsPresentes = planes.body.length > 0 ? Object.keys(planes.body[0]) : []
    const promoColsEsperadas = ['precio_oferta_clp','promo_etiqueta','promo_activa','promo_inicio','promo_fin']
    const colsFaltantes = promoColsEsperadas.filter(c => !colsPresentes.includes(c))
    
    if (colsFaltantes.length === 0) {
        pass(`Las 5 columnas promo existen: ${promoColsEsperadas.join(', ')}`)
    } else {
        fail(`Columnas FALTANTES: ${colsFaltantes.join(', ')}`)
    }

    console.log('\n   Datos actuales:')
    planes.body.forEach(p => {
        console.log(`   ${p.nivel.padEnd(8)} | precio: ${String(p.precio_unico_clp).padEnd(8)} | oferta: ${String(p.precio_oferta_clp).padEnd(8)} | activa: ${p.promo_activa} | etiqueta: ${p.promo_etiqueta}`)
    })

    // 3. CONSTRAINT — precio_oferta_clp >= 0
    section('PASO 3 — CONSTRAINT: precio_oferta_clp >= 0')
    const r3 = await post('planes', {
        categoria_id: catLandingId,
        nivel: 'unico',             // nivel único — ya existe, usamos ON CONFLICT
        nombre: '__audit_neg__',
        precio_unico_clp: 100000,
        precio_oferta_clp: -1,      // DEBE fallar con chk_precio_oferta_no_negativo
    })
    if (!r3.ok) {
        const msg = r3.body?.message || JSON.stringify(r3.body)
        if (msg.includes('chk_precio_oferta_no_negativo')) {
            pass('CONSTRAINT chk_precio_oferta_no_negativo ACTIVA (precio_oferta_clp >= 0)')
        } else if (msg.includes('unique') || msg.includes('duplicate') || r3.body?.code === '23505') {
            warn('Rechazado por UNIQUE constraint (nivel ya existe). No se pudo verificar esta constraint por esta vía.')
            warn(`Código: ${r3.body?.code} | Msg: ${msg.slice(0,120)}`)
        } else {
            warn(`Rechazado por otro motivo: ${msg.slice(0,200)}`)
        }
    } else {
        fail('INSERT con precio_oferta=-1 fue ACEPTADO → constraint chk_precio_oferta_no_negativo FALTA o NO está aplicada')
        // Limpiar el registro de prueba
        if (r3.body?.id) await del(`planes?id=eq.${r3.body.id}`)
    }

    // 4. CONSTRAINT — precio_oferta_clp < precio_unico_clp
    section('PASO 4 — CONSTRAINT: precio_oferta_clp < precio_unico_clp')
    // Intentar UPDATE en un plan real con precio_oferta MAYOR que precio_unico
    const planProId = planes.body.find(p => p.nivel === 'pro' && p.categoria_id === catSitioId)?.id
    if (!planProId) { warn('No se encontró plan pro de sitio_informativo'); }
    else {
        const planPro = planes.body.find(p => p.id === planProId)
        const precioNormal = planPro.precio_unico_clp  // ej: 449990
        const precioOfertaMayor = precioNormal + 50000 // MAYOR — debe fallar

        const r4 = await fetch(`${SUPABASE_URL}/rest/v1/planes?id=eq.${planProId}`, {
            method: 'PATCH',
            headers: { ...HEADERS, 'Prefer': 'return=minimal' },
            body: JSON.stringify({ precio_oferta_clp: precioOfertaMayor }),
        })
        const t4 = await r4.text()
        const b4 = t4 ? JSON.parse(t4) : {}

        if (!r4.ok) {
            const msg = b4.message || JSON.stringify(b4)
            if (msg.includes('chk_precio_oferta_menor_que_regular')) {
                pass('CONSTRAINT chk_precio_oferta_menor_que_regular ACTIVA (oferta < regular)')
            } else {
                warn(`Rechazado por otro motivo: ${msg.slice(0,200)}`)
            }
        } else {
            fail(`UPDATE con precio_oferta=${precioOfertaMayor} > precio_unico=${precioNormal} fue ACEPTADO`)
            fail('CONSTRAINT chk_precio_oferta_menor_que_regular FALTA o NO está aplicada')
            // Revertir
            await fetch(`${SUPABASE_URL}/rest/v1/planes?id=eq.${planProId}`, {
                method: 'PATCH',
                headers: { ...HEADERS, 'Prefer': 'return=minimal' },
                body: JSON.stringify({ precio_oferta_clp: null }),
            })
            warn('Valor revertido a NULL')
        }
    }

    // 5. CONSTRAINT — promo_fin > promo_inicio
    section('PASO 5 — CONSTRAINT: promo_fin > promo_inicio')
    if (planProId) {
        const r5 = await fetch(`${SUPABASE_URL}/rest/v1/planes?id=eq.${planProId}`, {
            method: 'PATCH',
            headers: { ...HEADERS, 'Prefer': 'return=minimal' },
            body: JSON.stringify({
                promo_inicio: '2026-12-31T00:00:00Z',
                promo_fin:    '2026-01-01T00:00:00Z', // FIN ANTES QUE INICIO — debe fallar
            }),
        })
        const t5 = await r5.text()
        const b5 = t5 ? JSON.parse(t5) : {}

        if (!r5.ok) {
            const msg = b5.message || JSON.stringify(b5)
            if (msg.includes('chk_promo_fechas_coherentes')) {
                pass('CONSTRAINT chk_promo_fechas_coherentes ACTIVA (promo_fin > promo_inicio)')
            } else {
                warn(`Rechazado por otro motivo: ${msg.slice(0,200)}`)
            }
        } else {
            fail('UPDATE con promo_fin < promo_inicio fue ACEPTADO')
            fail('CONSTRAINT chk_promo_fechas_coherentes FALTA o NO está aplicada')
            // Revertir
            await fetch(`${SUPABASE_URL}/rest/v1/planes?id=eq.${planProId}`, {
                method: 'PATCH',
                headers: { ...HEADERS, 'Prefer': 'return=minimal' },
                body: JSON.stringify({ promo_inicio: null, promo_fin: null }),
            })
            warn('Valores revertidos a NULL')
        }
    }

    // 6. ÍNDICE parcial en promo_activa
    section('PASO 6 — ÍNDICE parcial (idx_planes_promo_activa)')
    // No podemos verificar índices directamente via PostgREST sin funciones RPC.
    // Verificamos que la query con filter funcione correctamente (si el índice no existe, igual funciona pero más lento)
    const r6 = await get('planes?promo_activa=eq.true&select=id,nivel,promo_activa')
    if (r6.ok) {
        pass(`Query sobre promo_activa=true funciona. ${r6.body.length} planes con promo activa encontrados.`)
        if (r6.body.length === 0) {
            warn('No hay planes con promo_activa=TRUE en este momento (esperado si el seed no corrió)')
        }
    } else {
        fail(`Query falló: ${JSON.stringify(r6.body).slice(0,200)}`)
    }

    // 7. RESUMEN FINAL
    section('RESUMEN FINAL — Estado del Schema')
    console.log(`
   Columnas promo en DB:
   ┌──────────────────────────┬─────────────────────┐
   │ precio_oferta_clp        │ ${colsFaltantes.includes('precio_oferta_clp') ? '❌ FALTA' : '✅ EXISTE'}              │
   │ promo_etiqueta           │ ${colsFaltantes.includes('promo_etiqueta') ? '❌ FALTA' : '✅ EXISTE'}              │
   │ promo_activa             │ ${colsFaltantes.includes('promo_activa') ? '❌ FALTA' : '✅ EXISTE'}              │
   │ promo_inicio             │ ${colsFaltantes.includes('promo_inicio') ? '❌ FALTA' : '✅ EXISTE'}              │
   │ promo_fin                │ ${colsFaltantes.includes('promo_fin') ? '❌ FALTA' : '✅ EXISTE'}              │
   └──────────────────────────┴─────────────────────┘

   Ver resultados de constraints arriba para saber si se necesita SQL adicional.
   Si alguna constraint falló (❌), ejecuta el archivo:
   backend/supabase/004_fix_constraints.sql
    `)
}

main().catch(console.error)
