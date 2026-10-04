/**
 * verify-constraints.mjs
 * Verifica que las 3 constraints estén activas en Supabase
 * después de aplicar la migración 004_fix_constraints.sql.
 *
 * Ejecutar DESPUÉS de aplicar la migración:
 *   node verify-constraints.mjs
 */

const SUPABASE_URL = 'https://gbhedpqqpaxsmvfbldwy.supabase.co'
const SERVICE_ROLE  = 'REDACTED_SECRET'
const HEADERS = {
    'apikey': SERVICE_ROLE,
    'Authorization': `Bearer ${SERVICE_ROLE}`,
    'Content-Type': 'application/json',
}

// IDs reales confirmados en auditoría 2026-05-30
const PLAN_PRO_SITIO_ID = '84c9c11b-babd-4862-884f-84d52bbb1bb9' // precio_unico: 449990

async function patch(id, payload) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/planes?id=eq.${id}`, {
        method: 'PATCH',
        headers: { ...HEADERS, 'Prefer': 'return=minimal' },
        body: JSON.stringify(payload),
    })
    const text = await res.text()
    return { ok: res.ok, status: res.status, body: text ? JSON.parse(text) : null }
}

function result(label, passed, detail = '') {
    const icon = passed ? '✅' : '❌'
    console.log(`  ${icon} ${label}${detail ? ' → ' + detail : ''}`)
}

async function main() {
    console.log('\n🔒 Verificación de constraints post-migración 004\n')
    
    const checks = []

    // ── TEST 1: precio_oferta_clp >= 0 ────────────────────────────────────────
    {
        const r = await patch(PLAN_PRO_SITIO_ID, { precio_oferta_clp: -1 })
        if (!r.ok) {
            const msg = r.body?.message || ''
            const hasCHK = msg.includes('chk_precio_oferta_no_negativo') || r.body?.code === '23514'
            result('chk_precio_oferta_no_negativo (oferta >= 0)', hasCHK,
                hasCHK ? 'rechazó -1 correctamente' : `HTTP ${r.status}: ${msg.slice(0,80)}`)
            checks.push(hasCHK)
        } else {
            result('chk_precio_oferta_no_negativo (oferta >= 0)', false, 'ACEPTÓ -1 — constraint falta')
            await patch(PLAN_PRO_SITIO_ID, { precio_oferta_clp: null })
            checks.push(false)
        }
    }

    // ── TEST 2: precio_oferta_clp < precio_unico_clp ──────────────────────────
    {
        const r = await patch(PLAN_PRO_SITIO_ID, { precio_oferta_clp: 499990 }) // > 449990
        if (!r.ok) {
            const msg = r.body?.message || ''
            const hasCHK = msg.includes('chk_precio_oferta_menor_que_regular') || r.body?.code === '23514'
            result('chk_precio_oferta_menor_que_regular (oferta < regular)', hasCHK,
                hasCHK ? 'rechazó 499990 > 449990 correctamente' : `HTTP ${r.status}: ${msg.slice(0,80)}`)
            checks.push(hasCHK)
        } else {
            result('chk_precio_oferta_menor_que_regular (oferta < regular)', false, 'ACEPTÓ oferta > regular — constraint falta')
            await patch(PLAN_PRO_SITIO_ID, { precio_oferta_clp: null })
            checks.push(false)
        }
    }

    // ── TEST 3: promo_fin > promo_inicio ──────────────────────────────────────
    {
        const r = await patch(PLAN_PRO_SITIO_ID, {
            promo_inicio: '2026-12-31T00:00:00Z',
            promo_fin:    '2026-01-01T00:00:00Z',  // fin < inicio
        })
        if (!r.ok) {
            const msg = r.body?.message || ''
            const hasCHK = msg.includes('chk_promo_fechas_coherentes') || r.body?.code === '23514'
            result('chk_promo_fechas_coherentes (fin > inicio)', hasCHK,
                hasCHK ? 'rechazó fin < inicio correctamente' : `HTTP ${r.status}: ${msg.slice(0,80)}`)
            checks.push(hasCHK)
        } else {
            result('chk_promo_fechas_coherentes (fin > inicio)', false, 'ACEPTÓ fin < inicio — constraint falta')
            await patch(PLAN_PRO_SITIO_ID, { promo_inicio: null, promo_fin: null })
            checks.push(false)
        }
    }

    // ── TEST 4: UPDATE válido debe seguir funcionando ─────────────────────────
    {
        const r = await patch(PLAN_PRO_SITIO_ID, {
            precio_oferta_clp: 359990,   // < 449990 ✓
            promo_etiqueta:    '20% OFF',
            promo_activa:      true,
            promo_inicio:      null,
            promo_fin:         null,
        })
        const valid = r.ok || r.status === 204
        result('UPDATE válido (oferta=359990 < regular=449990)', valid,
            valid ? 'actualizado correctamente' : `HTTP ${r.status}: ${JSON.stringify(r.body).slice(0,80)}`)
        checks.push(valid)

        // Dejar la promo activa como demo real
        if (valid) {
            console.log('\n  💡 Plan "Informativo Pro" ahora tiene promo activa: $359.990 (20% OFF)')
        }
    }

    // ── Resumen ───────────────────────────────────────────────────────────────
    const passed = checks.filter(Boolean).length
    const total  = checks.length
    console.log(`\n${'─'.repeat(50)}`)
    console.log(`Resultado: ${passed}/${total} checks pasaron`)

    if (passed === total) {
        console.log('✅ Schema completamente validado. La migración 004 está aplicada.')
    } else {
        console.log('❌ Algunas constraints faltan. Aplica 004_fix_constraints.sql en Supabase Dashboard.')
    }
    console.log()
}

main().catch(console.error)
