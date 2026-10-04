/**
 * SICOVEL - Datos Comerciales Mock
 * Fuente centralizada de la oferta de servicios y planes.
 * 
 * IMPORTANTE: Este archivo es la ÚNICA fuente de verdad comercial.
 * Cuando se conecte Supabase, se reemplazará este import por una 
 * llamada al server layer (getData de Supabase).
 * 
 * PROHIBIDO hardcodear estos datos dentro de componentes.
 */

import type { ServicioComercial } from '@/types/services'
import { formatCLP } from '@/lib/pricing'

// ============================================
// RE-EXPORT: Alias para compatibilidad
// El formateador canónico vive en @/lib/pricing.
// ============================================
/** @deprecated Usa formatCLP de @/lib/pricing directamente */
export const formatPrecioCLP = formatCLP

// ============================================
// HELPER: Buscar servicio por slug
// ============================================
export function getServicioBySlug(slug: string): ServicioComercial | undefined {
    return SERVICIOS_COMERCIALES.find((s) => s.slug === slug)
}

// ============================================
// DATOS MOCK OFICIALES
// ============================================
export const SERVICIOS_COMERCIALES: ServicioComercial[] = [
    // ──────────────────────────────────────────
    // 1. LANDING PAGE (Producto único)
    // ──────────────────────────────────────────
    {
        slug: 'landing',
        nombre: 'Landing Page Profesional',
        icono: 'Rocket',
        descripcion_corta:
            'Página única moderna, rápida y enfocada en conversión para mostrar tu servicio y captar clientes.',
        descripcion_completa:
            'Página única moderna, rápida y enfocada en conversión para mostrar un servicio, captar clientes o validar un negocio. Ideal para emprendedores, profesionales y pymes que necesitan presencia digital clara y efectiva.',
        modalidad: 'pago_unico',
        precio_base_clp: 149990,
        precio_texto: 'desde $149.990',
        features: [
            'Diseño moderno y responsive',
            '1 página tipo landing',
            'Hasta 5 o 6 secciones',
            'Formulario de contacto',
            'Botón directo a WhatsApp',
            'Integración con redes sociales',
            'SEO básico on-page',
            'Optimización de carga',
            'Publicación del sitio',
            'Soporte inicial post-entrega',
        ],
        exclusiones: [
            'Tienda online',
            'Blog',
            'Sistema de usuarios',
            'Integraciones complejas',
            'Panel administrativo avanzado',
            'Automatizaciones personalizadas',
            'Cambios continuos posteriores a la entrega',
        ],
        audiencia: [
            'Emprendedores',
            'Profesionales independientes',
            'Negocios que necesitan presencia digital rápida',
            'PYMEs que quieren captar clientes online',
        ],
        planes: [],
        cta_texto: 'Cotizar Landing',
        cta_href: '/contacto?servicio=landing',
        es_destacado: false,
        orden: 1,
        visible: true,
    },

    // ──────────────────────────────────────────
    // 2. WEB INFORMATIVA (3 Planes)
    // ──────────────────────────────────────────
    {
        slug: 'sitio_informativo',
        nombre: 'Web Informativa',
        icono: 'Globe',
        descripcion_corta:
            'Sitios web profesionales con múltiples páginas para empresas que buscan credibilidad y presencia sólida.',
        descripcion_completa:
            'Plataformas web modulares y profesionales, diseñadas para posicionar tu empresa con una estructura clara, navegable y preparada para crecer.',
        modalidad: 'por_plan',
        planes: [
            {
                id: 'web-basic',
                nivel: 'basico',
                nombre: 'Basic',
                descripcion:
                    'Plan pensado para negocios que necesitan una presencia digital profesional básica, clara y bien presentada.',
                precio_clp: 249990,
                precio_oferta_clp: null,
                promo_etiqueta: null,
                promo_activa: false,
                promo_inicio: null,
                promo_fin: null,
                features: [
                    'Diseño responsive',
                    'Hasta 5 páginas',
                    'Página de inicio, servicios, nosotros y contacto',
                    'Formulario de contacto',
                    'Botón WhatsApp',
                    'Integración con redes sociales',
                    'SEO básico',
                    'Optimización de carga',
                    'Publicación del sitio',
                ],
                exclusiones: [
                    'Blog o sección de noticias avanzada',
                    'Funcionalidades a medida',
                    'Integraciones complejas',
                    'E-commerce',
                    'Sistemas de reservas avanzados',
                    'Automatizaciones',
                ],
                audiencia: [
                    'Emprendedores en crecimiento',
                    'Negocios locales',
                    'PYMEs pequeñas',
                    'Servicios profesionales',
                ],
                cta_texto: 'Cotizar Basic',
                cta_href: '/contacto?servicio=sitio_informativo&plan=basico',
                es_recomendado: false,
                orden: 1,
            },
            {
                id: 'web-pro',
                nivel: 'pro',
                nombre: 'Pro',
                descripcion:
                    'Plan pensado para empresas que necesitan una web más completa, con mejor estructura de contenido y una presencia digital más sólida.',
                precio_clp: 449990,
                // ── Promoción de demostración ──────────────────────────
                // Para desactivar: cambiar promo_activa a false
                precio_oferta_clp: 359990,
                promo_etiqueta: 'PRECIO LANZAMIENTO',
                promo_activa: true,
                promo_inicio: null,   // null = sin restricción de inicio
                promo_fin: null,      // null = sin expiración
                // ───────────────────────────────────────────────────────
                features: [
                    'Todo lo del plan Basic',
                    'Hasta 8 o 10 páginas',
                    'Mejor estructura de navegación',
                    'Diseño más personalizado',
                    'Múltiples bloques de servicios',
                    'Formulario de contacto más robusto',
                    'Secciones de testimonios, FAQ o portafolio',
                    'Base preparada para crecimiento',
                    'SEO básico mejor trabajado',
                ],
                exclusiones: [
                    'E-commerce',
                    'Automatizaciones complejas',
                    'Sistemas internos',
                    'Reservas avanzadas a medida',
                    'Integraciones empresariales complejas',
                ],
                audiencia: [
                    'PYMEs establecidas',
                    'Clínicas, centros, estudios o consultoras',
                    'Marcas que quieren proyectar más confianza',
                    'Negocios con varios servicios',
                ],
                cta_texto: 'Cotizar Pro',
                cta_href: '/contacto?servicio=sitio_informativo&plan=pro',
                es_recomendado: true,
                orden: 2,
            },
            {
                id: 'web-premium',
                nivel: 'premium',
                nombre: 'Premium',
                descripcion:
                    'Plan pensado para clientes que necesitan una presencia corporativa más amplia, más personalizada y con estructura de contenido más robusta.',
                precio_clp: 699990,
                precio_oferta_clp: null,
                promo_etiqueta: null,
                promo_activa: false,
                promo_inicio: null,
                promo_fin: null,
                features: [
                    'Todo lo del plan Pro',
                    'Hasta 12 o 15 páginas',
                    'Mayor nivel de personalización visual',
                    'Estructura más robusta de contenidos',
                    'Mejor preparación para crecimiento futuro',
                    'Más secciones especializadas',
                    'Mejor organización de servicios e información',
                    'Mayor trabajo de presentación de marca',
                ],
                exclusiones: [
                    'Tienda online',
                    'Sistemas de gestión',
                    'Módulos internos complejos',
                    'Automatizaciones avanzadas',
                    'Software a medida',
                ],
                audiencia: [
                    'Empresas con más contenido institucional',
                    'Marcas que quieren una web más completa',
                    'Negocios con mayor volumen de información',
                ],
                cta_texto: 'Cotizar Premium',
                cta_href: '/contacto?servicio=sitio_informativo&plan=premium',
                es_recomendado: false,
                orden: 3,
            },
        ],
        cta_texto: 'Ver Planes',
        cta_href: '/precios#web-informativa',
        es_destacado: true,
        orden: 2,
        visible: true,
    },

    // ──────────────────────────────────────────
    // 3. E-COMMERCE (2 Planes)
    // ──────────────────────────────────────────
    {
        slug: 'ecommerce',
        nombre: 'E-commerce',
        icono: 'ShoppingCart',
        descripcion_corta:
            'Tiendas online profesionales con pasarelas de pago integradas y sin comisiones por venta.',
        descripcion_completa:
            'Tiendas en línea transaccionales con pasarelas de pago chilenas integradas (Webpay, Flow), diseñadas para vender de forma profesional sin pagar comisiones a SICOVEL.',
        modalidad: 'por_plan',
        planes: [
            {
                id: 'ecom-basic',
                nivel: 'basico',
                nombre: 'Basic',
                descripcion:
                    'Plan orientado a negocios que quieren comenzar a vender online con una tienda simple, profesional y bien presentada.',
                precio_clp: 449990,
                precio_oferta_clp: null,
                promo_etiqueta: null,
                promo_activa: false,
                promo_inicio: null,
                promo_fin: null,
                features: [
                    'Diseño responsive',
                    'Catálogo básico de productos',
                    'Carrito de compra',
                    'Checkout',
                    'Integración de pasarela de pago',
                    'Hasta 20 productos cargados',
                    'Categorías básicas',
                    'Formulario o contacto',
                    'Botón WhatsApp',
                    'SEO básico',
                    'Optimización de velocidad',
                    'Publicación del sitio',
                ],
                exclusiones: [
                    'Integraciones empresariales complejas',
                    'ERP',
                    'Automatizaciones avanzadas',
                    'Marketplace',
                    'Múltiples sucursales',
                    'Funcionalidades altamente personalizadas',
                ],
                audiencia: [
                    'Emprendimientos que venden pocos productos',
                    'Tiendas pequeñas',
                    'Negocios que recién comienzan a vender online',
                ],
                cta_texto: 'Cotizar Basic',
                cta_href: '/contacto?servicio=ecommerce&plan=basico',
                es_recomendado: false,
                orden: 1,
            },
            {
                id: 'ecom-pro',
                nivel: 'pro',
                nombre: 'Pro',
                descripcion:
                    'Plan orientado a negocios que necesitan una tienda online más completa, con mejor estructura de catálogo y una base más preparada para crecer.',
                precio_clp: 699990,
                precio_oferta_clp: null,
                promo_etiqueta: null,
                promo_activa: false,
                promo_inicio: null,
                promo_fin: null,
                features: [
                    'Todo lo del plan Basic',
                    'Hasta 80 productos cargados',
                    'Mejor organización por categorías',
                    'Banners o bloques promocionales',
                    'Cupones o descuentos básicos',
                    'Estructura visual más robusta',
                    'Mejor base para escalabilidad',
                    'Preparación más sólida para crecimiento de catálogo',
                ],
                exclusiones: [
                    'ERP avanzado',
                    'Automatizaciones empresariales complejas',
                    'Integraciones logísticas avanzadas',
                    'Marketplace',
                    'Sistemas internos a medida',
                ],
                audiencia: [
                    'Tiendas en crecimiento',
                    'Negocios con mayor variedad de productos',
                    'Marcas que quieren una tienda más completa',
                ],
                cta_texto: 'Cotizar Pro',
                cta_href: '/contacto?servicio=ecommerce&plan=pro',
                es_recomendado: true,
                orden: 2,
            },
        ],
        cta_texto: 'Ver Planes',
        cta_href: '/precios#ecommerce',
        es_destacado: false,
        orden: 3,
        visible: true,
    },
]
