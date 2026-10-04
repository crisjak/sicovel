-- =========================================================================================
-- SICOVE CORE - INITIAL SCHEMA (SUPABASE / POSTGRESQL) - V5 (MVP ADMIN FINAL)
-- =========================================================================================

-- 1. EXTENSIONES NATIVAS MODERNAS
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. FUNCIÓN TRIGGER GLOBAL PARA 'actualizado_en'
CREATE OR REPLACE FUNCTION actualizar_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.actualizado_en = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 3. CREACIÓN DE TABLAS ESTRUCTURALES

-- Tabla: categorias_servicio
CREATE TABLE IF NOT EXISTS categorias_servicio (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(100) UNIQUE NOT NULL, -- landing, sitio_informativo, ecommerce
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    orden INTEGER DEFAULT 0,
    es_activo BOOLEAN DEFAULT TRUE,
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    actualizado_en TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla: planes
CREATE TABLE IF NOT EXISTS planes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    categoria_id UUID NOT NULL REFERENCES categorias_servicio(id) ON DELETE CASCADE,
    nivel VARCHAR(50) NOT NULL CHECK (nivel IN ('unico', 'basico', 'pro', 'premium')),
    nombre VARCHAR(100) NOT NULL,
    descripcion_corta TEXT,
    precio_unico_clp INTEGER NOT NULL CHECK (precio_unico_clp >= 0),
    caracteristicas JSONB DEFAULT '[]'::jsonb, -- Array de strings con los beneficios
    es_destacado BOOLEAN DEFAULT FALSE,
    orden INTEGER DEFAULT 0,
    es_activo BOOLEAN DEFAULT TRUE,
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    actualizado_en TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(categoria_id, nivel) 
);

-- Tabla: faqs
CREATE TABLE IF NOT EXISTS faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pregunta TEXT NOT NULL,
    respuesta TEXT NOT NULL,
    categoria VARCHAR(100) DEFAULT 'general',
    orden INTEGER DEFAULT 0,
    es_activo BOOLEAN DEFAULT TRUE,
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    actualizado_en TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla: testimonios
CREATE TABLE IF NOT EXISTS testimonios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    autor VARCHAR(255) NOT NULL,
    empresa VARCHAR(255),
    cargo VARCHAR(255),
    comentario TEXT NOT NULL,
    avatar_url VARCHAR(512),
    calificacion INTEGER CHECK (calificacion >= 1 AND calificacion <= 5) DEFAULT 5,
    orden INTEGER DEFAULT 0,
    es_activo BOOLEAN DEFAULT TRUE,
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    actualizado_en TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla: configuraciones_sitio
CREATE TABLE IF NOT EXISTS configuraciones_sitio (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clave VARCHAR(100) UNIQUE NOT NULL,
    valor JSONB NOT NULL,
    tipo_dato VARCHAR(50) DEFAULT 'string', -- string, number, json, boolean
    descripcion TEXT,
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    actualizado_en TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla: consultas_contacto (MINI CRM ADMIN)
CREATE TABLE IF NOT EXISTS consultas_contacto (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefono VARCHAR(50),
    mensaje TEXT NOT NULL,
    origen VARCHAR(100) DEFAULT 'formulario_web', 
    estado_lead VARCHAR(50) DEFAULT 'nuevo' CHECK (estado_lead IN ('nuevo', 'contactado', 'en_negociacion', 'cerrado_ganado', 'cerrado_perdido')),
    notas_internas TEXT,
    es_leido BOOLEAN DEFAULT FALSE,
    datos_extra JSONB DEFAULT '{}'::jsonb,
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    actualizado_en TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. ÍNDICES DE OPTIMIZACIÓN
CREATE INDEX IF NOT EXISTS idx_planes_categoria ON planes(categoria_id);
CREATE INDEX IF NOT EXISTS idx_consultas_estado ON consultas_contacto(estado_lead);
CREATE INDEX IF NOT EXISTS idx_faqs_activos ON faqs(es_activo);

-- 5. ASIGNACIÓN DE TRIGGERS
DROP TRIGGER IF EXISTS tr_categorias_actualizado_en ON categorias_servicio;
CREATE TRIGGER tr_categorias_actualizado_en BEFORE UPDATE ON categorias_servicio FOR EACH ROW EXECUTE FUNCTION actualizar_timestamp();

DROP TRIGGER IF EXISTS tr_planes_actualizado_en ON planes;
CREATE TRIGGER tr_planes_actualizado_en BEFORE UPDATE ON planes FOR EACH ROW EXECUTE FUNCTION actualizar_timestamp();

DROP TRIGGER IF EXISTS tr_faqs_actualizado_en ON faqs;
CREATE TRIGGER tr_faqs_actualizado_en BEFORE UPDATE ON faqs FOR EACH ROW EXECUTE FUNCTION actualizar_timestamp();

DROP TRIGGER IF EXISTS tr_testimonios_actualizado_en ON testimonios;
CREATE TRIGGER tr_testimonios_actualizado_en BEFORE UPDATE ON testimonios FOR EACH ROW EXECUTE FUNCTION actualizar_timestamp();

DROP TRIGGER IF EXISTS tr_config_sitio_actualizado_en ON configuraciones_sitio;
CREATE TRIGGER tr_config_sitio_actualizado_en BEFORE UPDATE ON configuraciones_sitio FOR EACH ROW EXECUTE FUNCTION actualizar_timestamp();

DROP TRIGGER IF EXISTS tr_consultas_actualizado_en ON consultas_contacto;
CREATE TRIGGER tr_consultas_actualizado_en BEFORE UPDATE ON consultas_contacto FOR EACH ROW EXECUTE FUNCTION actualizar_timestamp();


-- =========================================================================================
-- C. DATOS INICIALES (SEED DATA) - ENFOQUE PAGO ÚNICO OFICIAL
-- =========================================================================================

-- Inserción Categorías Base
INSERT INTO categorias_servicio (id, slug, nombre, descripcion, orden) VALUES
    (gen_random_uuid(), 'landing', 'Landing Page', 'Páginas de aterrizaje de alto rendimiento enfocadas en conversión.', 1),
    (gen_random_uuid(), 'sitio_informativo', 'Sitio Informativo', 'Plataformas web corporativas modulares con múltiples páginas.', 2),
    (gen_random_uuid(), 'ecommerce', 'E-commerce', 'Tiendas en línea transaccionales con pasarelas de pago integradas.', 3)
ON CONFLICT (slug) DO NOTHING;

-- Inserción Planes: Landing Pages (Solo un plan, destacada)
INSERT INTO planes (categoria_id, nivel, nombre, descripcion_corta, precio_unico_clp, caracteristicas, es_destacado, orden) 
SELECT id, 'unico', 'Landing Page Profesional', 'Diseño optimizado para captar clientes y generar ventas de forma directa.', 149990, '["Diseño UI/UX Premium", "Responsive Design", "Formulario de Contacto", "Botón flotante de WhatsApp", "Hosting y Dominio por 1 año"]'::jsonb, true, 1 
FROM categorias_servicio WHERE slug = 'landing'
ON CONFLICT (categoria_id, nivel) DO NOTHING;

-- Inserción Planes: Sitios Informativos (Basic, Pro [Destacado], Premium)
INSERT INTO planes (categoria_id, nivel, nombre, descripcion_corta, precio_unico_clp, caracteristicas, es_destacado, orden) 
SELECT id, 'basico', 'Informativo Basic', 'Presencia online profesional con la información esencial de tu empresa.', 249990, '["Hasta 4 secciones/páginas", "Formulario de contacto", "Diseño Responsive", "Hosting 1 año"]'::jsonb, false, 1 
FROM categorias_servicio WHERE slug = 'sitio_informativo'
ON CONFLICT (categoria_id, nivel) DO NOTHING;

INSERT INTO planes (categoria_id, nivel, nombre, descripcion_corta, precio_unico_clp, caracteristicas, es_destacado, orden) 
SELECT id, 'pro', 'Informativo Pro', 'Sitio completo para empresas que necesitan mostrar servicios en detalle.', 449990, '["Hasta 8 secciones/páginas", "Integración CRM básica", "Diseño UI/UX avanzado", "Hosting 1 año"]'::jsonb, true, 2 
FROM categorias_servicio WHERE slug = 'sitio_informativo'
ON CONFLICT (categoria_id, nivel) DO NOTHING;

INSERT INTO planes (categoria_id, nivel, nombre, descripcion_corta, precio_unico_clp, caracteristicas, es_destacado, orden) 
SELECT id, 'premium', 'Informativo Premium', 'La solución definitiva con múltiples páginas y escalabilidad total.', 699990, '["Páginas ilimitadas", "Blog administrable", "Panel auto-administrable", "SEO Avanzado", "Hosting 1 año"]'::jsonb, false, 3 
FROM categorias_servicio WHERE slug = 'sitio_informativo'
ON CONFLICT (categoria_id, nivel) DO NOTHING;

-- Inserción Planes: E-Commerce (Basic, Pro)
INSERT INTO planes (categoria_id, nivel, nombre, descripcion_corta, precio_unico_clp, caracteristicas, es_destacado, orden) 
SELECT id, 'basico', 'E-commerce Basic', 'Tu primera tienda online lista para vender tus productos clave.', 449990, '["Hasta 50 productos", "Pasarela de pago Webpay", "Carrito de compras", "Hosting 1 año"]'::jsonb, false, 1 
FROM categorias_servicio WHERE slug = 'ecommerce'
ON CONFLICT (categoria_id, nivel) DO NOTHING;

INSERT INTO planes (categoria_id, nivel, nombre, descripcion_corta, precio_unico_clp, caracteristicas, es_destacado, orden) 
SELECT id, 'pro', 'E-commerce Pro', 'Tienda escalable sin límites de productos con integraciones avanzadas.', 699990, '["Productos ilimitados", "Filtros avanzados", "Pasarelas múltiples", "Recuperación de carrito", "Hosting 1 año"]'::jsonb, false, 2 
FROM categorias_servicio WHERE slug = 'ecommerce'
ON CONFLICT (categoria_id, nivel) DO NOTHING;

-- Inserción Configuraciones Globales Base
INSERT INTO configuraciones_sitio (clave, valor, tipo_dato, descripcion) VALUES
    ('whatsapp_contacto', '"56912345678"'::jsonb, 'string', 'Número de WhatsApp principal de ventas'),
    ('email_contacto', '"contacto@sicove.cl"'::jsonb, 'string', 'Email de contacto general'),
    ('url_instagram', '"https://instagram.com/sicove"'::jsonb, 'string', 'URL del perfil de Instagram'),
    ('url_linkedin', '"https://linkedin.com/company/sicove"'::jsonb, 'string', 'URL de la página de LinkedIn'),
    ('hero_titulo_home', '"Transformamos tu Presencia Digital"'::jsonb, 'string', 'Título principal del Hero en el Home'),
    ('hero_subtitulo_home', '"Diseño y desarrollo de plataformas web modulares para negocios que buscan escalar."'::jsonb, 'string', 'Subtítulo del Hero en el Home')
ON CONFLICT (clave) DO NOTHING;

-- Fin Script SQL V5
