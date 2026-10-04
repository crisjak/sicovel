import type { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'

/**
 * Configuración de robots.txt para SICOVEL.
 * Permite crawling completo del sitio público.
 * Bloquea /admin y /api para todos los crawlers.
 */
export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin', '/api', '/control-sicovel'],
            },
        ],
        sitemap: `${siteConfig.url}/sitemap.xml`,
    }
}
