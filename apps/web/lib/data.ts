/**
 * SICOVE - Capa de datos
 * Lee y escribe el contenido del sitio desde/hacia site-content.json
 */

import fs from 'fs'
import path from 'path'
import type { HomepageData } from '@/types/content'

const DATA_FILE = path.join(process.cwd(), 'data', 'site-content.json')

/**
 * Lee los datos del sitio desde el archivo JSON
 */
export function getData(): HomepageData {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8')
    return JSON.parse(raw) as HomepageData
}

/**
 * Guarda los datos del sitio al archivo JSON
 */
export function saveData(data: HomepageData): void {
    const dir = path.dirname(DATA_FILE)
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 4), 'utf-8')
}
