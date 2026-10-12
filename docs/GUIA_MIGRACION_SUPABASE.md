# Guía de Migración: Activación de Seguridad en Supabase

Dado que el proyecto utiliza Supabase como backend administrado, las políticas de Row Level Security (RLS) y configuración de Storage se deben aplicar de manera explícita para evitar accesos no autorizados.

## Instrucciones para ejecutar la Migración de Seguridad

Para habilitar la seguridad en producción o entorno local en Supabase, sigue estos pasos:

1. **Ingresa a tu cuenta de Supabase** y abre el Dashboard del proyecto SICOVEL.
2. En el menú lateral izquierdo, selecciona **"SQL Editor"** (el ícono de la terminal `>_`).
3. Haz clic en **"New Query"** para crear un nuevo script SQL.
4. **Copia todo el contenido** del archivo `backend/supabase/migrations/20261009_enable_rls_and_storage.sql` que se encuentra en el repositorio local.
5. Pega el código en el editor SQL de Supabase.
6. Haz clic en el botón **"Run"** (o usa el atajo `Cmd/Ctrl + Enter`).
7. Confirma que la consola debajo del editor muestre un mensaje de éxito (`Success. No rows returned`).

## Lista de Verificación (Checklist) Post-Ejecución

- [ ] **Tablas Protegidas:** Ve a la sección **"Table Editor"**. Al hacer clic en cualquier tabla (ej. `planes`, `consultas_contacto`), debería indicar en la parte superior derecha **"RLS Enabled"** con un ícono verde.
- [ ] **Políticas Configuradas:** Ve a **"Authentication" > "Policies"**. Confirma que cada tabla tenga políticas de seguridad aplicadas (ej. `Permitir lectura publica de planes`).
- [ ] **Bucket Activo:** Ve a la sección **"Storage"**. Confirma que existe el bucket `carrusel`.
- [ ] **Permisos del Bucket:** Haz clic en el bucket `carrusel` y ve a "Policies" dentro de Storage. Verifica que se encuentre activo el acceso público de lectura (`Public Access for carrusel`) y las políticas restrictivas de modificación a roles autenticados.

Con este paso, la API nativa de Supabase queda securizada contra abusos por parte de usuarios anónimos.
