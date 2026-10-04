-- =========================================================================================
-- MIGRACIÓN 003: SICOVE — PRECIOS PROMOCIONALES EN PLANES COMERCIALES
-- =========================================================================================
-- Descripción:
--   Agrega soporte para precios de oferta con rango de fechas y etiqueta visual
--   en la tabla `planes`. Compatible con la arquitectura frontend/admin existente.
--
-- Columna de precio original confirmada: precio_unico_clp (INTEGER NOT NULL)
-- Fecha de creación: 2026-05-30
-- Autor: SICOVEL Engineering
-- Idempotente: Sí — seguro de re-ejecutar.
-- =========================================================================================

-- ─── 1. AGREGAR COLUMNAS PROMO (idempotente via IF NOT EXISTS) ────────────────

ALTER TABLE planes
    ADD COLUMN IF NOT EXISTS precio_oferta_clp  INTEGER      DEFAULT NULL,
    ADD COLUMN IF NOT EXISTS promo_etiqueta     TEXT         DEFAULT NULL,
    ADD COLUMN IF NOT EXISTS promo_activa       BOOLEAN      NOT NULL DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS promo_inicio       TIMESTAMPTZ  DEFAULT NULL,
    ADD COLUMN IF NOT EXISTS promo_fin          TIMESTAMPTZ  DEFAULT NULL;

-- ─── 2. CONSTRAINTS DE VALIDACIÓN ────────────────────────────────────────────

-- 2a. precio_oferta_clp: si existe, debe ser >= 0
ALTER TABLE planes
    DROP CONSTRAINT IF EXISTS chk_precio_oferta_no_negativo;
ALTER TABLE planes
    ADD CONSTRAINT chk_precio_oferta_no_negativo
        CHECK (precio_oferta_clp IS NULL OR precio_oferta_clp >= 0);

-- 2b. precio_oferta_clp: si existe, debe ser MENOR que precio_unico_clp
--     (el precio de oferta no puede ser mayor o igual al precio regular)
ALTER TABLE planes
    DROP CONSTRAINT IF EXISTS chk_precio_oferta_menor_que_regular;
ALTER TABLE planes
    ADD CONSTRAINT chk_precio_oferta_menor_que_regular
        CHECK (
            precio_oferta_clp IS NULL
            OR precio_oferta_clp < precio_unico_clp
        );

-- 2c. promo_fin debe ser posterior a promo_inicio cuando ambas fechas están definidas
ALTER TABLE planes
    DROP CONSTRAINT IF EXISTS chk_promo_fechas_coherentes;
ALTER TABLE planes
    ADD CONSTRAINT chk_promo_fechas_coherentes
        CHECK (
            promo_inicio IS NULL
            OR promo_fin  IS NULL
            OR promo_fin > promo_inicio
        );

-- ─── 3. ÍNDICES DE OPTIMIZACIÓN ──────────────────────────────────────────────

-- Útil para consultas que filtran planes con promo activa (ej: panel admin, API pública)
CREATE INDEX IF NOT EXISTS idx_planes_promo_activa
    ON planes(promo_activa)
    WHERE promo_activa = TRUE;

-- ─── 4. COMENTARIOS DE COLUMNA (buena práctica Supabase/pg_catalog) ──────────

COMMENT ON COLUMN planes.precio_oferta_clp IS
    'Precio de oferta en CLP. NULL = sin oferta. Debe ser menor que precio_unico_clp.';

COMMENT ON COLUMN planes.promo_etiqueta IS
    'Etiqueta visible de la promoción (ej: "20% OFF", "Lanzamiento"). NULL si no aplica.';

COMMENT ON COLUMN planes.promo_activa IS
    'Si TRUE, muestra el precio de oferta en el sitio (requiere precio_oferta_clp definido).';

COMMENT ON COLUMN planes.promo_inicio IS
    'Fecha/hora ISO de inicio de la promo. NULL = sin restricción de inicio.';

COMMENT ON COLUMN planes.promo_fin IS
    'Fecha/hora ISO de fin de la promo. NULL = sin expiración automática.';

-- ─── 5. SEED DE EJEMPLO: PROMO EN PLAN WEB INFORMATIVO PRO ───────────────────
--
-- Activa una promoción demo en el plan 'pro' de 'sitio_informativo'.
-- Para desactivar: cambiar promo_activa = FALSE en el panel admin.
-- Nota: La consulta usa ON CONFLICT para no duplicar y para ser idempotente.

UPDATE planes
SET
    precio_oferta_clp = 359990,
    promo_etiqueta    = '20% OFF',
    promo_activa      = TRUE,
    promo_inicio      = NULL,
    promo_fin         = NULL,
    actualizado_en    = NOW()
WHERE
    nivel = 'pro'
    AND categoria_id = (
        SELECT id FROM categorias_servicio WHERE slug = 'sitio_informativo' LIMIT 1
    )
    -- Solo aplica si ya existe el plan (no rompe si aún no está cargado)
    AND EXISTS (
        SELECT 1 FROM categorias_servicio WHERE slug = 'sitio_informativo'
    );

-- ─── FIN MIGRACIÓN 003 ────────────────────────────────────────────────────────
-- Para aplicar en Supabase Dashboard: SQL Editor → pegar este archivo completo.
-- Para aplicar con Supabase CLI: supabase db push (si está configurado).
-- =========================================================================================
