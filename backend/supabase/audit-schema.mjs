/**
 * audit-schema.mjs
 * Consulta el schema real de Supabase via REST API (rpc + information_schema)
 * para auditar constraints, índices y columnas de la tabla `planes`.
 * 
 * Ejecutar: node audit-schema.mjs
 */

const SUPABASE_URL = 'https://gbhedpqqpaxsmvfbldwy.supabase.co'
const SERVICE_ROLE  = 'REDACTED_SECRET'

const headers = {
    'apikey': SERVICE_ROLE,
    'Authorization': `Bearer ${SERVICE_ROLE}`,
    'Content-Type': 'application/json',
}

async function rpc(sql) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ query: sql }),
    })
    if (!res.ok) {
        // Supabase no expone exec_sql por defecto — usamos el endpoint de query directo
        return null
    }
    return res.json()
}

async function query(sql) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/raw_query`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ sql }),
    })
    if (!res.ok) return null
    return res.json()
}

// Usamos el endpoint de SQL via PostgREST no expuesto — necesitamos usar la API de administración
// En su lugar, construimos queries via la API REST de Supabase Management

async function managementQuery(sql) {
    const projectRef = SUPABASE_URL.replace('https://', '').replace('.supabase.co', '')
    const res = await fetch(`https://api.supabase.com/v1/projects/${projectRef}/database/query`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${SERVICE_ROLE}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: sql }),
    })
    
    const text = await res.text()
    if (!res.ok) {
        return { error: `HTTP ${res.status}: ${text}` }
    }
    
    try {
        return { data: JSON.parse(text) }
    } catch {
        return { raw: text }
    }
}

// ─── Queries de auditoría ─────────────────────────────────────────────────────

const QUERIES = {
    columns: `
        SELECT column_name, data_type, is_nullable, column_default
        FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'planes'
        ORDER BY ordinal_position;
    `,
    constraints: `
        SELECT conname, contype, pg_get_constraintdef(oid) as definition
        FROM pg_constraint
        WHERE conrelid = 'public.planes'::regclass
        ORDER BY conname;
    `,
    indexes: `
        SELECT indexname, indexdef
        FROM pg_indexes
        WHERE schemaname = 'public' AND tablename = 'planes'
        ORDER BY indexname;
    `,
    rls: `
        SELECT tablename, rowsecurity
        FROM pg_tables
        WHERE schemaname = 'public' AND tablename = 'planes';
    `,
    policies: `
        SELECT policyname, cmd, qual
        FROM pg_policies
        WHERE schemaname = 'public' AND tablename = 'planes';
    `,
}

async function main() {
    console.log('🔍 Auditando schema real de Supabase...\n')
    
    for (const [name, sql] of Object.entries(QUERIES)) {
        console.log(`\n═══════════════════════════════`)
        console.log(`📋 ${name.toUpperCase()}`)
        console.log(`═══════════════════════════════`)
        
        const result = await managementQuery(sql)
        
        if (result.error) {
            console.log(`❌ Error: ${result.error}`)
        } else if (result.data) {
            console.log(JSON.stringify(result.data, null, 2))
        } else {
            console.log(result.raw)
        }
    }
}

main().catch(console.error)
