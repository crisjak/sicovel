/**
 * audit-schema-v2.mjs
 * Consulta el schema real via Supabase PostgREST SQL functions.
 * Usa la función pg_catalog expuesta a través de una función RPC personalizada
 * o directamente via el endpoint de queries del SDK.
 */

const SUPABASE_URL = 'https://gbhedpqqpaxsmvfbldwy.supabase.co'
const SERVICE_ROLE  = 'REDACTED_SECRET'

const headers = {
    'apikey': SERVICE_ROLE,
    'Authorization': `Bearer ${SERVICE_ROLE}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
}

// PostgREST expone information_schema via REST si tiene acceso de schema
async function fetchTable(table, select = '*', filter = '') {
    const url = `${SUPABASE_URL}/rest/v1/${table}?select=${encodeURIComponent(select)}${filter ? '&' + filter : ''}`
    const res = await fetch(url, { headers })
    const text = await res.text()
    if (!res.ok) return { error: `HTTP ${res.status}: ${text.slice(0, 200)}` }
    try { return { data: JSON.parse(text) } } catch { return { raw: text } }
}

// Consulta directa via SDK usando el endpoint de consultas SQL
async function sqlQuery(query) {
    // Supabase expone /rest/v1/rpc/<function_name> para funciones PL/pgSQL
    // Creamos una consulta a través del endpoint de información del schema
    
    // Opción A: Usar la table API del schema information_schema
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/version`, {
        method: 'POST',
        headers,
        body: JSON.stringify({}),
    })
    return res.ok ? 'connected' : 'no rpc'
}

async function main() {
    console.log('🔍 Auditando schema real de Supabase (v2)...\n')

    // ─── Test conexión básica ─────────────────────────────────────────────────
    console.log('1. Test de conexión via PostgREST:')
    const testRes = await fetch(`${SUPABASE_URL}/rest/v1/planes?limit=1`, { headers })
    const status = testRes.status
    const testText = await testRes.text()
    console.log(`   Status: ${status}`)
    console.log(`   Response: ${testText.slice(0, 300)}\n`)

    if (!testRes.ok) {
        console.log('❌ No hay conexión o acceso denegado. Verificando anon key...')
        return
    }

    // ─── Columnas reales via un registro de la tabla ─────────────────────────
    console.log('2. Columnas reales via primer registro:')
    const first = JSON.parse(testText)
    if (Array.isArray(first) && first.length > 0) {
        console.log('   Columnas detectadas:', Object.keys(first[0]).join(', '))
        console.log('   Registro completo:')
        console.log(JSON.stringify(first[0], null, 4))
    } else {
        // Tabla vacía — verificar columnas via un insert que falle
        console.log('   Tabla vacía o sin datos. Columnas no detectables via esta vía.')
    }

    // ─── Intentar HEAD request para ver columnas disponibles ────────────────
    console.log('\n3. Verificando columnas promo via SELECT específico:')
    const promoCheck = await fetch(
        `${SUPABASE_URL}/rest/v1/planes?select=id,precio_unico_clp,precio_oferta_clp,promo_etiqueta,promo_activa,promo_inicio,promo_fin&limit=5`,
        { headers }
    )
    const promoText = await promoCheck.text()
    console.log(`   Status: ${promoCheck.status}`)
    
    if (promoCheck.ok) {
        const promoData = JSON.parse(promoText)
        console.log(`   ✅ Columnas promo EXISTEN en Supabase. (${promoData.length} registros)`)
        promoData.forEach(p => {
            console.log(`   ID: ${p.id?.slice(0,8)}... | precio_unico: ${p.precio_unico_clp} | precio_oferta: ${p.precio_oferta_clp} | promo_activa: ${p.promo_activa} | etiqueta: ${p.promo_etiqueta}`)
        })
    } else {
        console.log(`   ❌ Error al consultar columnas promo: ${promoText.slice(0, 400)}`)
        console.log('   → Las columnas probablemente NO existen aún en Supabase')
    }

    // ─── Verificar constraints via insert inválido ──────────────────────────
    console.log('\n4. Probando constraint chk_precio_oferta_menor_que_regular:')
    const constraintTest = await fetch(`${SUPABASE_URL}/rest/v1/planes`, {
        method: 'POST',
        headers: { ...headers, 'Prefer': 'return=minimal' },
        body: JSON.stringify({
            categoria_id: '00000000-0000-0000-0000-000000000000', // UUID inválido a propósito
            nivel: 'basico',
            nombre: '__audit_test__',
            precio_unico_clp: 100,
            precio_oferta_clp: 999, // Mayor que precio_unico — debe fallar con la constraint
        }),
    })
    const constraintText = await constraintTest.text()
    console.log(`   Status: ${constraintTest.status}`)
    if (constraintText.includes('chk_precio_oferta_menor_que_regular')) {
        console.log('   ✅ CONSTRAINT chk_precio_oferta_menor_que_regular EXISTE')
    } else if (constraintText.includes('foreign key') || constraintText.includes('fkey')) {
        console.log('   ⚠️  Insert rechazado por FK (esperado) — constraint no verificada directamente')
        console.log('   Texto:', constraintText.slice(0, 300))
    } else {
        console.log('   Respuesta:', constraintText.slice(0, 300))
    }

    // ─── Verificar constraint negativa ──────────────────────────────────────
    console.log('\n5. Probando constraint chk_precio_oferta_no_negativo:')
    const negativeTest = await fetch(`${SUPABASE_URL}/rest/v1/planes`, {
        method: 'POST',
        headers: { ...headers, 'Prefer': 'return=minimal' },
        body: JSON.stringify({
            categoria_id: '00000000-0000-0000-0000-000000000000',
            nivel: 'basico',
            nombre: '__audit_test_neg__',
            precio_unico_clp: 100,
            precio_oferta_clp: -1, // Negativo — debe fallar con la constraint
        }),
    })
    const negText = await negativeTest.text()
    if (negText.includes('chk_precio_oferta_no_negativo')) {
        console.log('   ✅ CONSTRAINT chk_precio_oferta_no_negativo EXISTE')
    } else {
        console.log('   Status:', negativeTest.status, '| Resp:', negText.slice(0, 300))
    }

    console.log('\n✅ Auditoría completa.')
}

main().catch(console.error)
