-- =========================================================================================
-- SICOVE - MIGRACIÓN FASE 3: CAPTURA DE LEADS
-- Descripción: Agrega los campos preparatorios del formulario público a la tabla de CRM.
-- =========================================================================================

ALTER TABLE consultas_contacto 
ADD COLUMN IF NOT EXISTS nombre_negocio VARCHAR(255),
ADD COLUMN IF NOT EXISTS rubro VARCHAR(255),
ADD COLUMN IF NOT EXISTS tipo_documento VARCHAR(50);
