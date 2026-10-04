-- =============================================================================
-- Migración V5.2 - Actualización de Contenido Comercial de Planes
-- =============================================================================

-- 1. Actualización Landing Page Profesional
UPDATE planes 
SET 
    descripcion_corta = 'Sitio de una página ideal para emprendedores, profesionales o campañas que necesitan presencia rápida y profesional.',
    caracteristicas = '["1 página tipo landing", "Hasta 5 secciones", "Diseño responsive", "Formulario de contacto", "Botón WhatsApp", "Enlaces a redes sociales", "SEO básico on-page", "Hosting incluido por 1 año", "Dominio .cl o .com incluido por 1 año", "Certificado SSL incluido", "3 correos corporativos", "Publicación del sitio", "Soporte inicial acotado"]'::jsonb,
    exclusiones = '["Blog", "Tienda online", "Sistema de usuarios", "Automatizaciones", "Copywriting profesional completo", "Diseño de logo", "Cambios continuos posteriores"]'::jsonb,
    audiencia = '["Emprendedores", "Profesionales", "Campañas rápidas"]'::jsonb
WHERE nombre = 'Landing Page Profesional';

-- 2. Actualización Informativo Basic
UPDATE planes 
SET 
    descripcion_corta = 'Para negocios que necesitan una presencia profesional clara, simple y confiable.',
    caracteristicas = '["Hasta 5 páginas", "Inicio, servicios, sobre nosotros y contacto", "1 página adicional simple", "Diseño responsive", "Formulario de contacto", "Botón WhatsApp", "Mapa de Google", "Enlaces a redes sociales", "SEO básico", "Hosting incluido por 1 año", "Dominio .cl o .com incluido por 1 año", "Certificado SSL incluido", "5 correos corporativos", "Publicación del sitio"]'::jsonb,
    exclusiones = '["Blog avanzado", "Reservas", "E-commerce", "Automatizaciones", "Integraciones especiales"]'::jsonb,
    audiencia = '["Negocios", "Empresas con presencia simple", "Profesionales"]'::jsonb
WHERE nombre = 'Informativo Basic';

-- 3. Actualización Informativo Pro
UPDATE planes 
SET 
    descripcion_corta = 'Para pymes que necesitan una web más completa, mejor organizada y preparada para crecer.',
    caracteristicas = '["Todo lo del plan Basic", "Hasta 10 páginas", "Estructura completa de servicios", "Secciones de testimonios, FAQs o portafolio", "Diseño más personalizado", "Mejor organización de contenido", "1 o 2 formularios", "Google Analytics básico", "Search Console básico", "SEO básico mejor trabajado", "Hosting incluido por 1 año", "Dominio .cl o .com incluido por 1 año", "Certificado SSL incluido", "10 correos corporativos"]'::jsonb,
    exclusiones = '["Sistemas internos", "Reservas avanzadas a medida", "E-commerce", "Automatizaciones complejas", "Integraciones empresariales"]'::jsonb,
    audiencia = '["PYMEs", "Empresas en crecimiento"]'::jsonb
WHERE nombre = 'Informativo Pro';

-- 4. Actualización Informativo Premium
UPDATE planes 
SET 
    descripcion_corta = 'Para empresas que necesitan una web corporativa más amplia, personalizada y robusta.',
    caracteristicas = '["Todo lo del plan Pro", "Hasta 15 páginas", "Mayor personalización visual", "Estructura corporativa robusta", "Más contenido inicial cargado", "Secciones especializadas", "Mejor preparación para crecimiento futuro", "Hosting incluido por 1 año", "Dominio .cl o .com incluido por 1 año", "Certificado SSL incluido", "15 correos corporativos", "Soporte inicial ampliado"]'::jsonb,
    exclusiones = '["Tienda online", "Sistema de gestión", "Módulos internos complejos", "Automatizaciones avanzadas", "Software a medida"]'::jsonb,
    audiencia = '["Empresas consolidadas", "Corporativos"]'::jsonb
WHERE nombre = 'Informativo Premium';

-- 5. Actualización E-commerce Basic
UPDATE planes 
SET 
    descripcion_corta = 'Para negocios que quieren comenzar a vender online con una tienda simple, clara y profesional.',
    caracteristicas = '["Tienda online básica", "Catálogo de productos", "Carrito de compra", "Checkout", "Integración de una pasarela de pago", "Hasta 30 productos cargados", "Categorías básicas", "Páginas legales básicas", "Formulario de contacto", "Botón WhatsApp", "SEO básico", "Hosting incluido por 1 año", "Dominio .cl o .com incluido por 1 año", "Certificado SSL incluido", "10 correos corporativos", "Publicación del sitio"]'::jsonb,
    exclusiones = '["ERP", "Marketplace", "Múltiples sucursales", "Integraciones logísticas avanzadas", "Carga masiva de productos", "Automatizaciones complejas"]'::jsonb,
    audiencia = '["Nuevas tiendas online", "Emprendedores de producto"]'::jsonb
WHERE nombre = 'E-commerce Basic';

-- 6. Actualización E-commerce Pro
UPDATE planes 
SET 
    descripcion_corta = 'Para tiendas en crecimiento que necesitan más productos, promociones y mejor estructura comercial.',
    caracteristicas = '["Todo lo del plan Basic", "Hasta 100 productos cargados", "Mejor organización por categorías", "Cupones o descuentos básicos", "Banners promocionales", "Estructura visual más robusta", "Configuración más completa de envíos", "Reportes simples o dashboard básico si está disponible", "Hosting incluido por 1 año", "Dominio .cl o .com incluido por 1 año", "Certificado SSL incluido", "20 correos corporativos", "Mini capacitación para autogestión"]'::jsonb,
    exclusiones = '["ERP avanzado", "Multi-bodega", "POS", "Facturación automática", "Integraciones contables", "Marketplace", "Sistemas a medida"]'::jsonb,
    audiencia = '["Tiendas en crecimiento", "Catálogos más amplios"]'::jsonb
WHERE nombre = 'E-commerce Pro';
