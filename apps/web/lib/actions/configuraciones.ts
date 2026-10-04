'use server'

import { createClient } from '../supabase/server'

/**
 * Obtiene todas las configuraciones del sitio desde Supabase.
 * Retorna un objeto clave-valor para fácil consumo en el frontend.
 */
export async function getSiteConfig() {
  const supabase = createClient()

  try {
    const { data, error } = await supabase
      .from('configuraciones_sitio')
      .select('clave, valor, tipo_dato')
    
    if (error) throw error

    // Transformar el array en un objeto { "whatsapp_contacto": "56912345678", ... }
    const configMap = data?.reduce((acc: Record<string, any>, item) => {
      let parsedValue = item.valor
      
      // Intentar parsear el JSON si es un string (aunque Supabase JSONB suele devolver el objeto/string parseado)
      if (typeof parsedValue === 'string' && parsedValue.startsWith('"') && parsedValue.endsWith('"')) {
        parsedValue = parsedValue.replace(/^"|"$/g, '')
      }
      
      acc[item.clave] = parsedValue
      return acc
    }, {}) || {}

    return { data: configMap, error: null }
  } catch (error) {
    console.error('Error fetching site config:', error)
    return { data: null, error }
  }
}

/**
 * Obtiene el valor de una configuración específica por su clave.
 */
export async function getConfigByKey(clave: string) {
  const supabase = createClient()

  try {
    const { data, error } = await supabase
      .from('configuraciones_sitio')
      .select('valor, tipo_dato')
      .eq('clave', clave)
      .single()
    
    if (error) throw error

    let parsedValue = data.valor
    if (typeof parsedValue === 'string' && parsedValue.startsWith('"') && parsedValue.endsWith('"')) {
        parsedValue = parsedValue.replace(/^"|"$/g, '')
    }

    return { data: parsedValue, error: null }
  } catch (error) {
    console.error(`Error fetching config ${clave}:`, error)
    return { data: null, error }
  }
}
