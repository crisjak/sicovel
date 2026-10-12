-- =========================================================================================
-- HABILITACIÓN DE RLS Y POLÍTICAS DE SEGURIDAD PARA SICOVEL
-- =========================================================================================

-- 1. Habilitar RLS en todas las tablas
ALTER TABLE categorias_servicio ENABLE ROW LEVEL SECURITY;
ALTER TABLE planes ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonios ENABLE ROW LEVEL SECURITY;
ALTER TABLE configuraciones_sitio ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultas_contacto ENABLE ROW LEVEL SECURITY;

-- 2. Políticas de Lectura Pública (Catálogo y Configuración)
-- Permite a cualquier usuario (anon) consultar las tablas públicas
CREATE POLICY "Permitir lectura publica de categorias_servicio" ON categorias_servicio FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Permitir lectura publica de planes" ON planes FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Permitir lectura publica de faqs" ON faqs FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Permitir lectura publica de testimonios" ON testimonios FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Permitir lectura publica de configuraciones_sitio" ON configuraciones_sitio FOR SELECT TO anon, authenticated USING (true);

-- 3. Políticas para consultas_contacto (CRM)
-- Permitir insertar a anónimos (formulario de contacto)
CREATE POLICY "Permitir insercion anonima en consultas_contacto" ON consultas_contacto FOR INSERT TO anon WITH CHECK (true);

-- Bloquear lectura/actualización/eliminación a anónimos
-- Los usuarios autenticados (Admin) pueden ver y modificar los leads
CREATE POLICY "Permitir full access a autenticados en consultas_contacto" ON consultas_contacto FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Permitir a los autenticados administrar todas las tablas públicas
CREATE POLICY "Permitir full access a autenticados en categorias_servicio" ON categorias_servicio FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Permitir full access a autenticados en planes" ON planes FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Permitir full access a autenticados en faqs" ON faqs FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Permitir full access a autenticados en testimonios" ON testimonios FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Permitir full access a autenticados en configuraciones_sitio" ON configuraciones_sitio FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 4. Configurar bucket de Storage 'carrusel'
-- Asumimos que el bucket ya existe o se crea si no existe
INSERT INTO storage.buckets (id, name, public) VALUES ('carrusel', 'carrusel', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Política para lectura pública de imágenes en 'carrusel'
CREATE POLICY "Public Access for carrusel" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'carrusel');

-- Política para inserción, actualización y eliminación solo para usuarios autenticados
CREATE POLICY "Authenticated Insert for carrusel" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'carrusel');
CREATE POLICY "Authenticated Update for carrusel" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'carrusel');
CREATE POLICY "Authenticated Delete for carrusel" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'carrusel');
