/**
 * audit-chk-negativo.mjs
 * Verifica constraint de precio_oferta_clp >= 0 vía UPDATE en plan real.
 */
const SUPABASE_URL = 'https://gbhedpqqpaxsmvfbldwy.supabase.co'
const SERVICE_ROLE  = 'REDACTED_SECRET'
const HEADERS = {
    'apikey': SERVICE_ROLE,
    'Authorization': `Bearer ${SERVICE_ROLE}`,
    'Content-Type': 'application/json',
}

// Plan Pro de sitio_informativo (id confirmado del audit anterior)
const PLAN_PRO_ID = '84c9c11b-babd-4862-884f-84d52bbb1bb9'

async function patch(id, payload) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/planes?id=eq.${id}`, {
        method: 'PATCH',
        headers: { ...HEADERS, 'Prefer': 'return=minimal' },
        body: JSON.stringify(payload),
    })
    const text = await res.text()
    return { ok: res.ok, status: res.status, body: text ? JSON.parse(text) : null }
}

async function main() {
    console.log('🔍 Verificando constraint precio_oferta_clp >= 0 via UPDATE...\n')

    // Test: precio_oferta_clp = -1 (debe fallar)
    const r = await patch(PLAN_PRO_ID, { precio_oferta_clp: -1 })
    
    if (!r.ok) {
        const msg = r.body?.message || ''
        if (msg.includes('chk_precio_oferta_no_negativo')) {
            console.log('✅ CONSTRAINT chk_precio_oferta_no_negativo ACTIVA')
        } else {
            console.log('⚠️  Rechazado, pero por otra razón:', msg.slice(0, 200))
        }
    } else {
        console.log('❌ UPDATE con precio_oferta_clp=-1 fue ACEPTADO → constraint FALTA')
        // Revertir
        await patch(PLAN_PRO_ID, { precio_oferta_clp: null })
        console.log('   Valor revertido a NULL')
    }
}
main().catch(console.error)
