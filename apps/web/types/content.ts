/**
 * SICOVE Content Types
 * Interfaces para contenido editable desde el CMS
 */

// ============================================
// HERO SECTION
// ============================================
export interface HeroData {
    title: string
    subtitle: string
    description: string
    primaryButton: {
        text: string
        href: string
    }
    secondaryButton?: {
        text: string
        href: string
    }
    backgroundImage: string
}

// ============================================
// SERVICES
// ============================================
export interface ServiceData {
    id: string
    title: string
    description: string
    icon: string // nombre del icono de Lucide
    imageUrl?: string // imagen para el carrusel
    features: string[]
    href: string
}

// ============================================
// PRICING (Migrado a types/services.ts)
// Las interfaces de pricing antiguas fueron reemplazadas
// por PlanComercial y ServicioComercial en types/services.ts
// ============================================

// ============================================
// PROCESO / CÓMO TRABAJAMOS
// ============================================
export interface ProcesoStep {
    id: string
    paso: number
    titulo: string
    descripcion: string
    icono: string // nombre del icono de Lucide
}

export interface ProcesoData {
    titulo: string
    subtitulo: string
    pasos: ProcesoStep[]
}

// ============================================
// FAQ COMERCIALES (datos locales / mock)
// Futura fuente: tabla `faqs` de Supabase
// ============================================
export interface FaqComercialItem {
    id: string
    pregunta: string
    respuesta: string
}

export interface FaqComercialData {
    titulo: string
    subtitulo: string
    items: FaqComercialItem[]
}

// ============================================
// PRECIOS PAGE — CTA FINAL
// ============================================
export interface PreciosCtaData {
    titulo: string
    descripcion: string
    textoBoton: string
    href: string
}

// ============================================
// PRECIOS PAGE — HEADER
// ============================================
export interface PreciosHeaderData {
    eyebrow: string
    titulo: string
    descripcion: string
    nota: string
}

// ============================================
// NAVIGATION
// ============================================
export interface NavLink {
    label: string
    href: string
}

export interface NavbarData {
    logo: {
        text: string
        href: string
    }
    links: NavLink[]
    ctaButton: {
        text: string
        href: string
    }
}

// ============================================
// FOOTER
// ============================================
export interface FooterColumn {
    title: string
    links: NavLink[]
}

export interface SocialLink {
    platform: string
    href: string
    icon: string
}

export interface FooterData {
    logo: {
        text: string
        tagline: string
    }
    columns: FooterColumn[]
    socialLinks: SocialLink[]
    copyright: string
}

// ============================================
// PORTFOLIO
// ============================================
export interface PortfolioProject {
    id: string
    title: string
    description: string
    category: string
    imageUrl: string
    liveUrl?: string
    tags: string[]
}

export interface PortfolioData {
    title: string
    subtitle: string
    projects: PortfolioProject[]
}

// ============================================
// CONTACT
// ============================================
export interface ContactInfo {
    icon: string
    label: string
    value: string
    href?: string
}

export interface ContactData {
    title: string
    subtitle: string
    description: string
    info: ContactInfo[]
    formTitle: string
    formDescription: string
}

// ============================================
// ABOUT
// ============================================
export interface AboutValue {
    id: string
    title: string
    description: string
    icon: string
}

export interface AboutData {
    title: string
    subtitle: string
    description: string
    history: string
    mission: string
    vision: string
    values: AboutValue[]
}

// ============================================
// SITE DATA COMPLETE
// ============================================
export interface HomepageData {
    hero: HeroData
    services: ServiceData[]
    navbar: NavbarData
    footer: FooterData
    portfolio: PortfolioData
    contact: ContactData
    about: AboutData
    proceso: ProcesoData
    faqsComerciales: FaqComercialData
    preciosCta: PreciosCtaData
    preciosHeader: PreciosHeaderData
}
