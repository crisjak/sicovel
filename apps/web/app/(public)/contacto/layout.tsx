/**
 * Layout para la ruta /contacto
 * Exporta metadata SEO aquí porque page.tsx usa 'use client',
 * lo que impide exportar metadata desde el componente de página directamente.
 */
import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
    title: 'Contacto y cotización | SICOVEL',
    description: `Contáctanos para cotizar tu proyecto web. Respondemos rápido por WhatsApp o formulario. ${siteConfig.name}: landing pages, sitios web y e-commerce en Chile.`,
    openGraph: {
        title: 'Contacto y cotización | SICOVEL',
        description: 'Cotiza tu proyecto web con SICOVEL. Atención personalizada en Chile.',
        url: `${siteConfig.url}/contacto`,
        siteName: siteConfig.seo.siteName,
        locale: 'es_CL',
        type: 'website',
        // TODO: Agregar og-image cuando se cree /public/images/og-image.jpg (1200x630px)
    },
}

import type { ReactNode } from 'react'

export default function ContactoLayout({ children }: { children: ReactNode }): ReactNode {
    return <>{children}</>
}
