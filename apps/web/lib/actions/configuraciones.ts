'use server'

import { createClient } from '../supabase/server'

import { siteConfig } from '@/config/site'

const MOCK_SITE_CONFIG: Record<string, any> = {
  hero_titulo_home: 'Tecnología de Alto Rendimiento para tu Negocio',
  hero_subtitulo_home: 'Creamos landing pages, sitios web y e-commerce que impulsan tu crecimiento.',
  hero_imagen_url: '/images/hero-bg.jpg',
  hero_cta_principal_texto: 'Hablar por WhatsApp',
  hero_cta_principal_link: siteConfig.whatsapp.url,
  hero_cta_secundario_texto: 'Ver Planes',
  hero_cta_secundario_link: '/precios',
  whatsapp_contacto: siteConfig.whatsapp.numero,
  email_contacto: siteConfig.contacto.email,
}

/**
 * Obtiene todas las configuraciones del sitio.
 * Por defecto opera 100% con datos locales (mocks), sin cookies ni dependencias de Supabase.
 */
export async function getSiteConfig() {
  if (process.env.NEXT_PUBLIC_ENABLE_SUPABASE === 'true') {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('configuraciones_sitio')
        .select('clave, valor, tipo_dato')
      
      if (!error && data) {
        const configMap = data.reduce((acc: Record<string, any>, item) => {
          let parsedValue = item.valor
          if (typeof parsedValue === 'string' && parsedValue.startsWith('"') && parsedValue.endsWith('"')) {
            parsedValue = parsedValue.replace(/^"|"$/g, '')
          }
          acc[item.clave] = parsedValue
          return acc
        }, {})
        return { data: { ...MOCK_SITE_CONFIG, ...configMap }, error: null }
      }
    } catch (error) {
      console.warn('Error fetching site config from Supabase, usando mocks locales:', error)
    }
  }

  return { data: MOCK_SITE_CONFIG, error: null }
}

/**
 * Obtiene el valor de una configuración específica por su clave.
 */
export async function getConfigByKey(clave: string) {
  const { data } = await getSiteConfig()
  return { data: data?.[clave] ?? null, error: null }
}
