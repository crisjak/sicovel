-- =============================================================================
-- Migración V5.1 - Añadir campos de exclusiones y audiencia a planes
-- =============================================================================

-- 1. Agregar columnas si no existen
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'planes' AND column_name = 'exclusiones') THEN
        ALTER TABLE planes ADD COLUMN exclusiones JSONB DEFAULT '[]'::jsonb;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'planes' AND column_name = 'audiencia') THEN
        ALTER TABLE planes ADD COLUMN audiencia JSONB DEFAULT '[]'::jsonb;
    END IF;
END
$$;
