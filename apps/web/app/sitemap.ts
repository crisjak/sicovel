import type { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'

/**
 * Sitemap dinámico de SICOVEL.
 * Solo incluye rutas públicas reales del sitio.
 * Excluye: /admin, /api y cualquier ruta privada.
 *
 * TODO: Cuando se publique el dominio real, verificar que
 * siteConfig.url apunte a https://sicovel.cl
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const base = siteConfig.url

    return [
        {
            url: base,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        {
            url: `${base}/servicios`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${base}/precios`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${base}/contacto`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${base}/nosotros`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${base}/servicios/landing-pages`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${base}/servicios/paginas-informativas`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${base}/servicios/ecommerce`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${base}/politica-de-privacidad`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${base}/terminos-y-condiciones`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
    ]
}
