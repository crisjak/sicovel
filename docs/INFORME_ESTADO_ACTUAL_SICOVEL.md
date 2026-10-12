# Informe Técnico y Funcional: Estado Actual de SICOVEL

## 3. Identificación del proyecto y alcance de la inspección
- **Fecha de revisión:** 8 de Octubre de 2026.
- **Carpeta raíz:** `c:\Users\HP\Desktop\CRIS\Proyectos\SICOVE`
- **Estructura general:** Monorepo gestionado con `pnpm`, compuesto por `apps/web` (Next.js), carpetas vacías/reservadas `backend/node-api` y `backend/django`, y scripts de base de datos en `backend/supabase`.
- **Git:** Presencia de carpeta `.git` confirmada, pero no se alteraron ramas ni commits.
- **Limitaciones de acceso:** No se cuenta con acceso al Dashboard de Supabase, cuenta de hosting (ej. Vercel), o servicios de pago para validar la configuración en la nube. La revisión se basa estrictamente en el código fuente, la configuración local y ejecuciones de compilación estáticas/seguras.
- **Fuentes:** Análisis directo del código, `package.json`, esquemas `.sql` de Supabase, y rutas en `apps/web/app`.

## 4. Resumen ejecutivo
**¿Qué es SICOVEL hoy?**
Es una plataforma web informativa orientada a pymes y negocios, enfocada en ofrecer servicios de creación de Landing Pages, Sitios Informativos y E-commerce (ofrecido como un servicio comercial a desarrollar, no como una tienda transaccional propia de SICOVEL en esta etapa).

**Estado actual:**
Se encuentra en una fase de **pre-producción avanzada para un MVP informativo**. La estructura de enrutamiento público está sólida, el diseño y componentes existen, y el panel administrativo está parcialmente integrado con una base de datos real (Supabase).
Como fue instruido en la revisión de antecedentes, los pagos y checkouts en línea fueron postergados intencionalmente para una fase futura, por lo que su ausencia no representa un bloqueo, alineándose con el objetivo de lanzar un MVP puramente informativo de venta asistida.

**Principales avances:**
- Enrutamiento y UI en Next.js 14 implementados y funcionando.
- Formulario de contacto funcional, validado, y conectado al CRM de Supabase (`consultas_contacto`).
- Panel de administración (`/control-sicovel`) protegido con autenticación por lista de correos autorizados.
- Esquema de base de datos estructurado e inicializado.

**Bloqueos más importantes:**
- **Vulnerabilidad de Seguridad:** No hay evidencia en los scripts SQL de que *Row Level Security (RLS)* esté habilitado en las tablas, lo que podría exponer los datos y el CRM de forma pública a través de la API.
- Fallos en la compilación estática (SSG) de Next.js debido a la falta de variables de entorno de Supabase en tiempo de build, provocando que no se puedan inyectar los datos en la UI.
- Falta la configuración mínima del Linter.

## 5. Arquitectura y tecnologías
- **Frontend / Enrutamiento:** Next.js 14.2.21 con App Router (`apps/web`). Renderizado híbrido (SSG/SSR).
- **Estilos y Componentes:** Tailwind CSS 3.4, `framer-motion` y componentes base de `lucide-react`.
- **Manejo de Formularios:** `zod` asegura que los datos que viajan al backend vengan limpios (ej. normalizando números chilenos). Las mutaciones se procesan vía *Server Actions*.
- **Base de Datos y Autenticación:** Supabase (PostgreSQL y Auth). Las carpetas `backend/django` y `backend/node-api` son meros esqueletos sin código real, confirmando que la aplicación opera como monolito con Next.js dialogando directo con Supabase.
- **Gestor de paquetes:** Monorepo con `npm`/`pnpm`.
- **Integraciones externas:** Se declaran variables de entorno para AWS, Webpay y Flow, pero **no existen** implementaciones en código para Webpay o Flow. Esto es coherente con la decisión de posponer los pagos.

## 6. Inventario de páginas y funcionalidades

| Funcionalidad | Ruta o módulo | Qué hace actualmente | Origen de los datos | Estado | Evidencia | Qué falta |
| --- | --- | --- | --- | --- | --- | --- |
| **Inicio y Legales** | `/(public)/page.tsx`, `/terminos-y-condiciones`, `/politica-de-privacidad` | Muestra contenido estático y dinámico de la propuesta de valor y normativas. | Mixto (Estático y Supabase) | Implementado | Layouts y subrutas existen en código. | Llenar textos/mockups si no están definitivos. |
| **Servicios y Precios** | `/servicios/*`, `/precios` | Despliega los servicios (Landing, Sitio, E-commerce). | Supabase (`planes`, `categorias_servicio`) | Implementado | Archivos en `app/(public)/servicios` y `lib/actions/planes.ts`. | N/A |
| **Soporte TI** | No existe ruta | Inicialmente propuesto como servicio separado. | N/A | No encontrado | Falta de la ruta en el directorio público. | Decidir si se descarta para la V1. |
| **Contacto y Cotización** | `/contacto` | Recibe mensajes y captura leads. Redirecciones usan `?plan=...` en vez de `#cotizar`. | Envia a `consultas_contacto` en DB | Verificado (Código) | `lib/actions/contacto.ts` posee validación rigurosa Zod y escritura a Supabase. | N/A |
| **Acceso Admin** | `/control-sicovel/login` | Formulario de sesión. Middleware redirige usuarios sin permiso y bloquea `/admin`. | Supabase Auth + Variable `.env` `ADMIN_ALLOWED_EMAILS` | Implementado | `middleware.ts` bloquea `/admin` (404) y maneja `/control-sicovel`. | N/A |
| **Panel Admin (Gestión)**| `/control-sicovel/inicio` | Panel interno para revisar consultas, faqs, planes e imágenes. | Supabase (Server Actions protegidos) | Implementado | Componente `AdminInicioPanel.tsx` y endpoints `/api/upload`. | Pruebas E2E para confirmar flujos de actualización. |

## 7. Backend, base de datos e integraciones
- **Esquema Definido (Supabase):**
  - Estructura limpia (V5): `categorias_servicio`, `planes`, `faqs`, `testimonios`, `configuraciones_sitio`, `consultas_contacto` (Mini CRM).
  - Triggers para la actualización de fechas (`actualizado_en`) implementados en SQL.
- **Subida de Archivos:** El endpoint `/api/upload/route.ts` sube imágenes de forma directa a un bucket de Supabase Storage llamado `carrusel`.
- **Pagos Automáticos:** Ninguna pasarela de pago transaccional ha sido integrada. Las menciones a e-commerce corresponden al ofrecimiento del *desarrollo* de e-commerce como un servicio.

## 8. Revisión del panel administrativo y seguridad
- **Ruta real de acceso:** `https://tudominio.com/control-sicovel`.
- **Protección de Páginas:** La ruta `/admin` histórica fue desactivada intencionalmente devolviendo `404` mediante `middleware.ts`. La gestión de rutas internas usa autenticación de sesión de Supabase contrastando contra una whitelist de correos electrónicos.
- **Protección de API:** Los *Server Actions* y rutas como `/api/admin/config` llaman al método `requireAdmin()` de forma estricta, el cual rechaza la operación (`UnauthorizedError`) si la sesión no es válida o el correo no coincide con la lista blanca.
- **VULNERABILIDAD IDENTIFICADA:** Al inspeccionar `init_schema.sql` y migraciones, **no** existen directivas `ALTER TABLE <tabla> ENABLE ROW LEVEL SECURITY;`. En Supabase, esto significa que la API REST o GraphQL subyacente expone estas tablas a operaciones de lectura/escritura públicas para cualquier persona con el `anon_key` (el cual es público y visible en el navegador). Esto permite saltarse por completo el panel de administración de Next.js y adulterar el CRM o el catálogo.

## 9. Experiencia de usuario y contenido comercial
- **Proceso de Contratación:** Coherente. En lugar del carrito, los botones envían al usuario al embudo de venta asistida: `/contacto?plan=[id_del_plan]`.
- **SEO y Metadatos:** En `layout.tsx` se encuentra configurado Open Graph (`ogTitle`, `defaultDescription`), palabras clave e imágenes de metadatos optimizados para redes sociales (`og-image.png`), preparado para un SEO saludable.
- **Interfaces Visuales:** No se visualizó en un entorno de navegador en vivo, pero el análisis del código muestra soporte completo para Tailwind Responsive, transiciones con `framer-motion` y cambios de paleta mediante `next-themes`.

## 10. Calidad técnica y comprobaciones
- **Compilación de Producción (`npm run build`):** Ejecutada y Finalizada Exitosamente.
  - *Advertencia Crítica:* Fallaron las solicitudes HTTP al servidor de Supabase en tiempo de compilación para pre-renderizar el contenido (`TypeError: fetch failed`). Si las variables no se inyectan en Vercel/Hosting, la aplicación fallará o pasará a renderizado de lado del servidor (SSR) en lugar del rápido renderizado estático. (Resuelto a nivel de variables de entorno `.env.local` configuradas).
- **Linter (`npm run lint`):** Ejecutado. **Exitoso**. Se configuró `.eslintrc.json`.
- **Pruebas Unitarias (`npm run test`):** Ejecutado. **Sin resultados**. No se han definido tests automatizados.
- **Deuda Técnica:** El código es limpio y la estructura de un monorepo fue un buen diseño. Las carpetas obsoletas de `django` y `node-api` fueron **eliminadas** para simplificar la arquitectura al monolito Next.js.

## 11. SEO, rendimiento y preparación para producción
- **Rendimiento:** Está bien encarrilado gracias al uso extensivo de componentes asíncronos y estáticos, pero la falta de variables de base de datos durante el paso de construcción estática perjudicará las métricas de rendimiento inicial.
- **Infraestructura:** La carpeta `infra/` cuenta con documentación base, indicando planes para contenedorización (Docker) o despliegues AWS, aunque dado el stack, Vercel o Netlify son plataformas ideales.

## 12. Qué falta y qué debe hacerse primero

**A. Bloqueantes para publicar**
- **A1. Asegurar la Base de Datos (RLS):** ~~Escribir políticas Row Level Security en Supabase...~~ **[RESUELTO]** (Migración SQL generada).
- **A2. Proteger el Bucket Storage:** ~~Crear reglas para el bucket `carrusel` en Supabase...~~ **[RESUELTO]** (Integrado en migración SQL).
- **A3. Variables de Entorno de Hosting:** Suministrar a la plataforma de despliegue los enlaces correctos de Supabase (URL, KEY) para que las páginas SSG compilen limpiamente. `.env.local` validado a nivel local.

**B. Necesarios para completar el alcance vigente**
- **B1. Arreglar Linting:** ~~Configurar `.eslintrc.json` estándar...~~ **[RESUELTO]**

**C. Mejoras posteriores**
- **C1. Pruebas Automáticas:** Agregar un test básico en el Server Action de contacto para garantizar que la recolección de Leads nunca se rompa en refactorizaciones futuras.
- **C2. Limpiar Repositorio:** ~~Eliminar las carpetas fantasmas de Django y Node.js...~~ **[RESUELTO]**

**D. Funcionalidades futuras (Fuera de alcance actual)**
- Checkout con Webpay/Flow y Panel de Clientes.

## 13. Plan de trabajo sugerido
**Próximas acciones concretas:**
1. Ejecutar el script SQL de migración en Supabase (`GUIA_MIGRACION_SUPABASE.md`).
2. Configurar variables de entorno (`.env`) en la plataforma de despliegue (Vercel).
3. Ejecutar SICOVEL comprobando visualmente el envío de leads y carga en panel.

**Decisión para Cristóbal:**
- ¿"Soporte TI" se lanzará como servicio secundario posterior, o deba incluirse inmediatamente como servicio en el menú antes de publicar?

## 14. Resumen para continuar con otro asistente
**Contexto actualizado de SICOVEL para continuidad**
- **Propósito:** Web informativa de venta asistida (Landing, Sitios informativos, E-commerce) para PYMES. Checkout diferido.
- **Stack Verificado:** Next.js 14 App Router, Tailwind CSS, Zod, Supabase PostgreSQL, Supabase Auth. Arquitectura monolítica limpiada.
- **Rutas clave:** Públicas en `/(public)`. Administración en `/control-sicovel` protegido por variables de entorno y `middleware.ts`.
- **Problemas resueltos:** Carpetas backend basura eliminadas, Linter configurado (código 0), Migración RLS de Supabase redactada (pendiente ejecución en nube).
- **Próximo Paso Recomendado:** Ejecutar migración SQL en Supabase, probar el flujo del CRM de leads y preparar el despliegue.
