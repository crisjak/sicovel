-- =========================================================================================
-- MIGRACIÓN 002: SICOVE - CONFIGURACIONES HERO ESTÁTICO DEL HOME
-- =========================================================================================
-- Descripción: 
-- Inyecta las variables necesarias para administrar la sección visual (Hero) del inicio,
-- manteniendo la política de "Cero Hardcoding" en Next.js.
-- Utiliza "ON CONFLICT DO UPDATE" para que el script sea idempotente (seguro de re-ejecutar).
-- =========================================================================================

INSERT INTO configuraciones_sitio (clave, valor, tipo_dato, descripcion)
VALUES
    -- Imagen principal o fondo del Hero
    (
        'hero_imagen_url', 
        '"/assets/hero-home.webp"'::jsonb, 
        'string', 
        'URL de la imagen principal del Hero en el Home (puede apuntar al Storage de Supabase o ruta local)'
    ),
    
    -- Botón de Llamado a la Acción Principal (Primary CTA)
    (
        'hero_cta_principal_texto', 
        '"Ver Planes"'::jsonb, 
        'string', 
        'Texto del botón principal en el Hero'
    ),
    (
        'hero_cta_principal_link', 
        '"#planes"'::jsonb, 
        'string', 
        'Enlace de destino del botón principal (ej: /servicios o #planes)'
    ),

    -- Botón de Llamado a la Acción Secundario (Secondary CTA)
    (
        'hero_cta_secundario_texto', 
        '"Agendar Asesoría"'::jsonb, 
        'string', 
        'Texto del botón secundario en el Hero'
    ),
    (
        'hero_cta_secundario_link', 
        '"/contacto"'::jsonb, 
        'string', 
        'Enlace de destino del botón secundario'
    )
ON CONFLICT (clave) 
DO UPDATE SET 
    valor = EXCLUDED.valor,
    tipo_dato = EXCLUDED.tipo_dato,
    descripcion = EXCLUDED.descripcion,
    actualizado_en = NOW();
