-- =========================================================================================
-- MIGRACIÓN 004: SICOVE — CONSTRAINTS FALTANTES EN COLUMNAS PROMO DE PLANES
-- =========================================================================================
-- Descripción:
--   Resultado de auditoría real contra Supabase (2026-05-30):
--
--   VERIFICADO COMO FALTANTE:
--     ❌ chk_precio_oferta_no_negativo       → UPDATE con -1 fue aceptado
--     ❌ chk_precio_oferta_menor_que_regular  → UPDATE con oferta > regular fue aceptado
--     ❌ chk_promo_fechas_coherentes          → UPDATE con fin < inicio fue aceptado
--
--   VERIFICADO COMO PRESENTE:
--     ✅ precio_oferta_clp  (columna INTEGER nullable)
--     ✅ promo_etiqueta     (columna TEXT nullable)
--     ✅ promo_activa       (columna BOOLEAN NOT NULL DEFAULT false)
--     ✅ promo_inicio       (columna TIMESTAMPTZ nullable)
--     ✅ promo_fin          (columna TIMESTAMPTZ nullable)
--
--   Los constraints de la migración 003 nunca se aplicaron en producción.
--   Esta migración los agrega de forma idempotente.
--
-- Columna de precio original: precio_unico_clp (INTEGER NOT NULL)
-- Idempotente: Sí — DROP IF EXISTS antes de cada ADD CONSTRAINT.
-- =========================================================================================

BEGIN;

-- ─── CONSTRAINT 1 ─────────────────────────────────────────────────────────────
-- precio_oferta_clp >= 0 (no puede ser negativo si se ingresa)

ALTER TABLE planes
    DROP CONSTRAINT IF EXISTS chk_precio_oferta_no_negativo;

ALTER TABLE planes
    ADD CONSTRAINT chk_precio_oferta_no_negativo
        CHECK (
            precio_oferta_clp IS NULL
            OR precio_oferta_clp >= 0
        );


-- ─── CONSTRAINT 2 ─────────────────────────────────────────────────────────────
-- precio_oferta_clp < precio_unico_clp (la oferta no puede superar el precio base)
-- Lógica: si existe precio_oferta, debe ser estrictamente menor al precio normal.

ALTER TABLE planes
    DROP CONSTRAINT IF EXISTS chk_precio_oferta_menor_que_regular;

ALTER TABLE planes
    ADD CONSTRAINT chk_precio_oferta_menor_que_regular
        CHECK (
            precio_oferta_clp IS NULL
            OR precio_oferta_clp < precio_unico_clp
        );


-- ─── CONSTRAINT 3 ─────────────────────────────────────────────────────────────
-- promo_fin > promo_inicio (si ambas fechas existen, fin debe ser posterior a inicio)

ALTER TABLE planes
    DROP CONSTRAINT IF EXISTS chk_promo_fechas_coherentes;

ALTER TABLE planes
    ADD CONSTRAINT chk_promo_fechas_coherentes
        CHECK (
            promo_inicio IS NULL
            OR promo_fin  IS NULL
            OR promo_fin  > promo_inicio
        );


-- ─── ÍNDICE PARCIAL ───────────────────────────────────────────────────────────
-- Optimiza queries que filtran planes con promo activa.
-- No hay forma de verificar existencia con IF NOT EXISTS en CREATE INDEX en todas
-- las versiones de pg, pero Supabase usa PG14+ que sí lo soporta.

CREATE INDEX IF NOT EXISTS idx_planes_promo_activa
    ON planes (promo_activa)
    WHERE promo_activa = TRUE;


-- ─── COMENTARIOS DE COLUMNA ───────────────────────────────────────────────────

COMMENT ON COLUMN planes.precio_oferta_clp IS
    'Precio de oferta en CLP. NULL = sin oferta. Debe ser >= 0 y menor que precio_unico_clp.';

COMMENT ON COLUMN planes.promo_etiqueta IS
    'Etiqueta visible de la promoción (ej: "20% OFF", "Lanzamiento"). NULL si no aplica.';

COMMENT ON COLUMN planes.promo_activa IS
    'Si TRUE, muestra el precio de oferta en el sitio (requiere precio_oferta_clp definido).';

COMMENT ON COLUMN planes.promo_inicio IS
    'Fecha ISO de inicio de vigencia de la promo. NULL = sin restricción de inicio.';

COMMENT ON COLUMN planes.promo_fin IS
    'Fecha ISO de fin de vigencia de la promo. NULL = sin expiración automática.';


-- ─── VERIFICACIÓN POST-MIGRACIÓN ─────────────────────────────────────────────
-- Después de aplicar, verifica con:
--
--   SELECT conname, contype, pg_get_constraintdef(oid) AS def
--   FROM pg_constraint
--   WHERE conrelid = 'public.planes'::regclass
--   ORDER BY conname;
--
-- Debes ver 3 entradas tipo 'c' (CHECK):
--   chk_precio_oferta_menor_que_regular
--   chk_precio_oferta_no_negativo
--   chk_promo_fechas_coherentes
--
--   SELECT indexname FROM pg_indexes
--   WHERE tablename = 'planes' AND indexname = 'idx_planes_promo_activa';

COMMIT;

-- =========================================================================================
-- FIN MIGRACIÓN 004
-- Para aplicar: Supabase Dashboard → SQL Editor → pegar y ejecutar
-- =========================================================================================
