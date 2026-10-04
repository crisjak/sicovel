/**
 * SICOVEL - Configuración central de branding, contacto y SEO
 * Fuente de verdad para nombre, descripción, contacto y metadatos del sitio.
 * Todos los componentes deben consumir desde aquí, nunca hardcodear.
 */

export const siteConfig = {
    name: 'SICOVEL',
    tagline: 'simple, confiable y veloz',
    description: 'Tecnología de alto rendimiento para tu negocio. Landing Pages, Sitios Web y E-commerce con precios transparentes.',
    url: process.env.NEXT_PUBLIC_APP_URL ?? 'https://sicovel.cl',
    logoPath: '/images/LogoSICOVE.png',

    // ── Contacto centralizado ────────────────────────────────────────
    contacto: {
        email: 'contacto.sicovel@gmail.com',
        telefono: '+56 9 3516 2784',
        ubicacion: 'Santiago, Chile',
        horario: 'Lun - Vie: 9:00 - 18:00',
    },

    // ── WhatsApp ─────────────────────────────────────────────────────
    whatsapp: {
        /** Número en formato internacional sin + (ej: 56912345678) */
        numero: '56935162784',
        /** URL directa wa.me */
        url: 'https://wa.me/56935162784',
        /** Mensaje prellenado para el botón flotante */
        mensajeFlotante: 'Hola, quiero cotizar un proyecto web con SICOVEL. Me interesa recibir orientación sobre el plan más adecuado.',
        /** Tooltip del botón flotante */
        tooltip: 'Hablar por WhatsApp',
        /** Si es true, se muestra el botón flotante en el sitio público */
        flotanteActivo: false,
    },

    // ── SEO ──────────────────────────────────────────────────────────
    seo: {
        titleTemplate: (page: string) => `${page} | SICOVEL`,
        defaultTitle: 'SICOVEL | Tecnología de Alto Rendimiento para tu Negocio',
        defaultDescription: 'Creamos Landing Pages, Sitios Web y E-commerce que impulsan tu crecimiento. Precios transparentes, sin comisiones ocultas.',
        keywords: ['landing pages', 'e-commerce', 'desarrollo web', 'Chile', 'SICOVEL'],
        author: 'SICOVEL',
        siteName: 'SICOVEL',
        ogTitle: 'SICOVEL | Tecnología de Alto Rendimiento',
    },

    // ── Redes sociales ──────────────────────────────────────────────
    // Estos valores son referencia informativa; los links del Footer
    // se gestionan data-driven desde data/site-content.json (socialLinks).
    social: {
        instagram: 'https://www.instagram.com/sicovelchile',
        tiktok: 'https://www.tiktok.com/@sicovel',
        youtube: 'https://www.youtube.com/@sicovel',
        facebook: 'https://web.facebook.com/profile.php?id=61590481353450',
    },

    // ── Legal ────────────────────────────────────────────────────────
    legal: {
        copyright: `© ${new Date().getFullYear()} SICOVEL. Todos los derechos reservados.`,
    },
} as const

export type SiteConfig = typeof siteConfig
