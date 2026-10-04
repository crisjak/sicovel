import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const SUPABASE_URL = 'https://gbhedpqqpaxsmvfbldwy.supabase.co'
const SERVICE_ROLE  = 'REDACTED_SECRET'

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

async function main() {
    const sqlPath = path.join(__dirname, '007_campos_contacto.sql')
    const sql = fs.readFileSync(sqlPath, 'utf8')
    console.log('🚀 Ejecutando migración SQL en Supabase...')
    
    const result = await managementQuery(sql)
    
    if (result.error) {
        console.error('❌ Error ejecutando SQL:', result.error)
        process.exit(1)
    } else {
        console.log('✅ Migración ejecutada correctamente:', result.data || result.raw)
    }
}

main().catch(e => {
    console.error(e)
    process.exit(1)
})
