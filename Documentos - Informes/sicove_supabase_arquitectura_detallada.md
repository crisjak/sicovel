# 🚀 SICOVE — Arquitectura y Configuración de Supabase
## Documento Técnico Integral — Base de Plataforma SICOVE

**Proyecto:** SICOVE  
**Componente:** Supabase Core  
**Entorno actual:** `sicove-core`  
**Versión del documento:** 1.0  
**Estado:** Base técnica inicial, pre-backend  

---

# 1. PROPÓSITO DEL DOCUMENTO

Este documento define de forma técnica, estructurada y profesional cómo se utilizará **Supabase** dentro del proyecto SICOVE como base de datos principal, capa de almacenamiento, soporte para autenticación futura y núcleo de persistencia del sistema.

Su objetivo no es únicamente registrar una configuración puntual del proyecto actual, sino establecer una **base arquitectónica clara y escalable** para todas las fases posteriores del sistema.

Este documento sirve para:

- comprender el rol real de Supabase dentro de SICOVE,
- evitar decisiones improvisadas durante el desarrollo,
- alinear frontend, backend y modelo de negocio,
- preparar la futura implementación del panel administrativo,
- y documentar una visión técnica coherente del crecimiento de la plataforma.

---

# 2. CONTEXTO GENERAL

SICOVE no debe entenderse como una simple página web corporativa. Aunque actualmente existe un foco importante en el frontend público del sitio, el proyecto en realidad está evolucionando hacia una **plataforma modular de servicios digitales**, capaz de soportar:

- el sitio comercial de SICOVE,
- el catálogo de servicios,
- la oferta de planes,
- los templates reutilizables,
- los proyectos de clientes,
- el panel administrativo,
- el almacenamiento de medios,
- la gestión de formularios y leads,
- y en fases futuras, funcionalidades más avanzadas como automatizaciones, chatbots y módulos de gestión.

En este contexto, Supabase no se utilizará como una simple base de datos auxiliar. Su función es mucho más importante.

> **Supabase será el núcleo de persistencia de la plataforma SICOVE.**

---

# 3. CONCEPTO CLAVE: QUÉ ES `sicove-core`

El proyecto `sicove-core` no corresponde solamente a una base de datos para la web pública. Debe entenderse como el **repositorio central de información y configuración del ecosistema SICOVE**.

## 3.1 Definición conceptual

```txt
sicove-core = cerebro de datos del sistema SICOVE
```

## 3.2 Qué gestionará este proyecto

El proyecto `sicove-core` está pensado para centralizar:

### A. Sitio público SICOVE
- servicios ofrecidos,
- planes comerciales,
- contenido dinámico,
- formularios de contacto,
- activos visuales,
- páginas públicas futuras.

### B. Sistema interno de producción digital
- templates base,
- secciones reutilizables,
- configuración por plan,
- activación de funcionalidades,
- estructura de proyectos.

### C. Proyectos de clientes
- proyectos instanciados,
- páginas,
- contenido editable,
- branding,
- medios,
- add-ons.

### D. Panel administrativo futuro
- administración interna de SICOVE,
- gestión de clientes,
- asignación de planes,
- creación de proyectos,
- gobierno de templates,
- trazabilidad de operaciones.

### E. Expansión futura
- autenticación,
- permisos,
- auditoría,
- automatizaciones,
- chatbots,
- analítica técnica y de negocio.

---

# 4. ROL DE SUPABASE EN LA ARQUITECTURA GENERAL

La arquitectura objetivo de SICOVE combina frontend moderno, una futura capa de negocio en servidor y una capa de persistencia apoyada en Supabase.

## 4.1 Arquitectura general

```txt
Frontend Web (Next.js en Vercel)
        ↓
Capa servidor / lógica de negocio (Node.js o Server Layer)
        ↓
Supabase (PostgreSQL + Storage + Auth futura)
```

## 4.2 Responsabilidades por capa

### Frontend
Responsable de:
- renderizar interfaz,
- consumir datos,
- mostrar contenido dinámico,
- operar paneles,
- gestionar experiencia de usuario.

### Capa servidor
Responsable de:
- validación,
- permisos,
- lógica sensible,
- transformaciones,
- creación de proyectos,
- clonación de templates,
- integraciones externas.

### Supabase
Responsable de:
- persistencia relacional,
- almacenamiento de archivos,
- organización estructural del contenido,
- futura autenticación,
- base de operación de la plataforma.

---

# 5. CONFIGURACIÓN INICIAL DEL PROYECTO

## 5.1 Organización
La organización creada debe representar formalmente al proyecto SICOVE y no al correo de registro.

**Nombre recomendado:**
```txt
SICOVE
```

## 5.2 Proyecto principal

**Nombre del proyecto:**
```txt
sicove-core
```

Este nombre es correcto porque no limita el proyecto a un solo tipo de uso. Permite que el mismo núcleo de Supabase soporte múltiples capas del sistema.

## 5.3 Plan

En la etapa actual, el uso del plan **Free** es aceptable para exploración, modelado de base de datos, pruebas iniciales y conexión temprana con frontend.

No obstante, debe tenerse presente que el plan gratuito no representa una configuración de producción definitiva para un entorno comercial con clientes reales.

## 5.4 Región

La región elegida debe ser la más cercana posible a Chile. En el estado actual mostrado del proyecto, la base aparece ubicada en:

```txt
South America (São Paulo)
```

Esta es una decisión adecuada para minimizar latencia y mejorar respuesta para usuarios ubicados en Chile y Sudamérica.

## 5.5 Seguridad inicial

### Data API
Debe mantenerse activada, ya que Supabase genera una API sobre el esquema público y esto facilitará el consumo desde el frontend y las primeras integraciones.

### RLS automática
Se recomienda mantenerla desactivada inicialmente y configurar políticas manualmente cuando:
- exista auth,
- existan roles,
- esté clara la separación entre datos públicos y privados,
- y la multitenencia esté definida.

Esto evita bloquear prematuramente el desarrollo con políticas apresuradas.

---

# 6. CONTRASEÑA Y GESTIÓN DE CREDENCIALES

La contraseña de la base de datos es un activo crítico del proyecto.

## 6.1 Requisitos mínimos
Debe ser:
- larga,
- aleatoria,
- única,
- difícil de adivinar,
- almacenada fuera del código.

## 6.2 Buenas prácticas
Se recomienda guardarla en:
- Bitwarden,
- 1Password,
- gestor seguro equivalente,
- o almacenamiento privado cifrado.

## 6.3 Principio operativo
Las credenciales sensibles nunca deben exponerse en frontend ni en repositorios públicos.

---

# 7. PRINCIPIOS DE DISEÑO DE LA BASE DE DATOS

La base de datos de SICOVE debe diseñarse bajo principios de claridad, escalabilidad y control.

## 7.1 Convención de nombres
Por decisión del proyecto, las tablas y columnas se definirán en **español**, siguiendo una convención consistente.

### Reglas:
- minúsculas,
- snake_case,
- sin tildes,
- sin letra ñ,
- nombres explícitos y legibles.

### Ejemplos correctos
- `categorias_servicio`
- `planes`
- `plantillas`
- `secciones_plantilla`
- `proyectos`
- `paginas_proyecto`
- `secciones_proyecto`
- `archivos_media`
- `consultas_contacto`

## 7.2 Separación entre estructura y contenido
El sistema debe diferenciar entre:
- estructura lógica del sistema,
- configuración de negocio,
- contenido editable,
- y recursos multimedia.

Esto es clave para mantener una base limpia y soportar el enfoque de templates reutilizables.

## 7.3 Uso controlado de JSONB
Se recomienda usar campos JSONB solo donde realmente aporten flexibilidad, por ejemplo:
- contenido dinámico de secciones,
- branding,
- configuración visual,
- listas de features.

No se debe caer en el error de guardar todo el sistema como JSON. La estructura principal debe seguir siendo relacional.

---

# 8. MODELO DE DATOS INICIAL PROPUESTO

La primera versión del esquema debe priorizar lo que SICOVE necesita hoy, sin dejar cerrada la puerta a lo que necesitará mañana.

## 8.1 Tablas principales

### `categorias_servicio`
Representa los servicios base ofrecidos inicialmente por SICOVE.

Ejemplos:
- landing,
- sitio_informativo,
- ecommerce.

### `planes`
Define los planes comerciales por servicio.

Debe almacenar:
- nombre,
- precio inicial,
- precio mensual,
- precio anual,
- límites,
- capacidades,
- estado activo.

### `plantillas`
Define templates maestros reutilizables según servicio y versión.

### `secciones_plantilla`
Define la estructura interna de cada plantilla:
- hero,
- beneficios,
- faq,
- testimonios,
- contacto,
- catálogo,
- checkout, etc.

### `proyectos`
Representa una instancia real de cliente, demo interna o proyecto de SICOVE.

### `paginas_proyecto`
Representa las páginas que pertenecen a un proyecto.

### `secciones_proyecto`
Representa el contenido editable real, ya clonado desde la plantilla y modificado por proyecto.

### `archivos_media`
Almacena referencias a imágenes y archivos guardados en Storage.

### `consultas_contacto`
Guarda formularios y leads generados desde el sitio público o desde proyectos.

### `complementos_proyecto`
Permite activar extras como integraciones, chatbot, automatizaciones o módulos adicionales.

---

# 9. STORAGE Y ORGANIZACIÓN DE ARCHIVOS

Supabase Storage será la capa de almacenamiento de activos visuales y archivos del sistema.

## 9.1 Objetivo
Separar la persistencia binaria del modelo relacional, manteniendo referencias limpias desde la base de datos.

## 9.2 Buckets recomendados

### `sicove_publico`
Para activos públicos del sitio de SICOVE.

Ejemplos:
- logos,
- banners,
- imágenes de servicios,
- iconografía pública.

### `activos_plantillas`
Para recursos utilizados por plantillas y demos.

Ejemplos:
- thumbnails,
- mockups,
- imágenes base de templates.

### `media_proyectos`
Para medios asociados a proyectos reales de clientes.

Ejemplos:
- logos del cliente,
- imágenes del sitio,
- galerías,
- productos.

### `documentos_privados`
Bucket opcional para archivos no públicos.

Ejemplos:
- documentación,
- entregables,
- archivos internos,
- documentación comercial.

## 9.3 Buenas prácticas
- no mezclar archivos públicos y privados en un mismo bucket sin política clara,
- usar nombres de rutas consistentes,
- registrar metadata en la tabla `archivos_media`,
- evitar acceso directo sin control cuando los archivos sean sensibles.

---

# 10. AUTENTICACIÓN Y AUTORIZACIÓN (VISIÓN FUTURA)

Aunque auth no es prioridad inmediata, el diseño de Supabase debe dejar el camino preparado.

## 10.1 Auth futura
Supabase Auth puede utilizarse más adelante para:
- acceso al panel SICOVE,
- acceso al panel cliente,
- autenticación de administradores,
- recuperación de contraseña,
- sesiones seguras.

## 10.2 Roles futuros
Se proyecta que el sistema necesitará al menos:
- super_admin,
- admin_sicove,
- editor,
- cliente_admin,
- visualizador.

## 10.3 RLS futura
Cuando el sistema tenga auth y acceso a datos privados, se implementarán políticas RLS para garantizar:
- que cada usuario vea solo lo que le corresponde,
- que cada cliente no pueda acceder a datos de otro,
- y que la plataforma mantenga separación segura de información.

---

# 11. MULTITENENCIA (VISIÓN TÉCNICA FUTURA)

Este es uno de los puntos más sensibles del proyecto.

## 11.1 Qué significa
La multitenencia define cómo convivirán múltiples clientes dentro de la misma plataforma.

## 11.2 Opciones conceptuales

### A. Single-tenant
Cada cliente tiene infraestructura separada.

### B. Multi-tenant
Todos los clientes comparten la misma base, pero con separación lógica y de permisos.

## 11.3 Dirección recomendada para SICOVE
A mediano plazo, la dirección más coherente con la visión de plataforma es una arquitectura **multi-tenant controlada**, aunque esto exige diseño cuidadoso de:
- estructura de datos,
- auth,
- RLS,
- auditoría,
- ownership de recursos.

## 11.4 Implicación arquitectónica
La base de datos debe prepararse desde temprano para soportar esta evolución sin requerir rediseño total.

---

# 12. RELACIÓN ENTRE SUPABASE Y EL FRONTEND ACTUAL

El frontend de SICOVE ya fue construido con un enfoque data-driven y headless-ready. Eso significa que Supabase no será un parche posterior, sino una fuente natural de contenido y configuración.

## 12.1 Qué podrá alimentar Supabase
- servicios,
- planes,
- plantillas,
- secciones dinámicas,
- media,
- formularios,
- futuros proyectos demo.

## 12.2 Beneficio técnico
Esto permitirá reemplazar hardcodeo por datos persistidos y administrables, mejorando:
- mantenibilidad,
- escalabilidad,
- reutilización,
- capacidad de operación futura desde panel.

---

# 13. RELACIÓN ENTRE SUPABASE Y EL FUTURO BACKEND

Supabase no elimina la necesidad de backend. Su función es distinta.

## 13.1 Qué hará Supabase
- guardar,
- estructurar,
- servir datos,
- almacenar archivos,
- eventualmente autenticar.

## 13.2 Qué hará el backend
- aplicar reglas,
- validar,
- controlar permisos,
- ejecutar lógica sensible,
- clonar plantillas,
- activar features,
- conectar integraciones externas.

## 13.3 Principio crítico

> Supabase será la base del sistema.  
> El backend será el cerebro de negocio.

---

# 14. FASES DE IMPLEMENTACIÓN

## 14.1 Fase 1 — Base pública del sitio
Implementar:
- categorías de servicio,
- planes,
- plantillas,
- secciones de plantilla,
- consultas de contacto,
- buckets públicos.

## 14.2 Fase 2 — Estructura de proyectos
Implementar:
- proyectos,
- páginas de proyecto,
- secciones de proyecto,
- archivos media,
- complementos.

## 14.3 Fase 3 — Panel y operación interna
Implementar:
- auth,
- perfiles,
- permisos,
- panel interno,
- panel cliente.

## 14.4 Fase 4 — Seguridad avanzada
Implementar:
- RLS,
- auditoría,
- control por tenant,
- separación de recursos sensibles.

## 14.5 Fase 5 — Expansión funcional
Implementar:
- automatizaciones,
- chatbots,
- integraciones,
- analítica interna,
- gestión avanzada.

---

# 15. ERRORES A EVITAR

El documento también debe dejar claros los errores que no deben cometerse.

## 15.1 Errores estructurales
- crear una base distinta por cada pequeño módulo sin necesidad,
- hardcodear planes o features en frontend,
- mezclar contenido público con operaciones sensibles,
- no definir naming consistente.

## 15.2 Errores de seguridad
- exponer claves sensibles,
- usar buckets públicos indiscriminadamente,
- aplicar RLS automática sin diseño previo,
- no diferenciar entre datos de SICOVE y datos de clientes.

## 15.3 Errores de escalabilidad
- diseñar tablas solo para la web actual y no para la plataforma,
- no prever proyectos y plantillas desde el inicio,
- acoplar demasiado el frontend a la forma exacta de la base.

---

# 16. VISIÓN FUTURA DETALLADA

La visión futura de Supabase dentro de SICOVE debe quedar claramente documentada para evitar decisiones cortoplacistas.

## 16.1 Evolución del proyecto `sicove-core`
En una primera etapa, `sicove-core` soporta la web pública y la estructura inicial del sistema.

En una segunda etapa, se convierte en el repositorio central de:
- templates,
- proyectos,
- contenido editable,
- paneles,
- y media.

En una tercera etapa, se transforma en una plataforma de datos compartida entre:
- frontend público,
- panel SICOVE,
- panel cliente,
- app móvil,
- módulos automatizados,
- procesos internos.

## 16.2 Posibles proyectos complementarios a futuro
Aunque `sicove-core` será el proyecto principal, pueden aparecer nuevos proyectos o entornos complementarios:

### `sicove-dev`
Entorno de desarrollo separado para pruebas estructurales.

### `sicove-staging`
Entorno intermedio para demos, QA y validación antes de producción.

### `sicove-analytics`
Proyecto o módulo orientado a métricas agregadas, eventos, funnels y observabilidad de negocio.

### `sicove-automation`
Posible espacio futuro para colas, jobs, webhooks, automatizaciones o integraciones de procesos.

## 16.3 Relación con sistemas de gestión
Aunque los sistemas de gestión están congelados como línea comercial inmediata, la arquitectura de Supabase debe dejar espacio para soportarlos en el futuro mediante:
- entidades adicionales,
- flujos de negocio específicos,
- estructuras multi-rol,
- dashboards,
- y módulos verticales.

## 16.4 Relación con chatbots y automatización
A futuro, Supabase puede cumplir un rol importante como:
- fuente de conocimiento estructurado,
- repositorio de conversaciones o leads,
- base para logs de automatización,
- y punto de integración entre formularios, CRM liviano y flujos de seguimiento.

## 16.5 Evolución hacia plataforma real
La visión final no es simplemente tener una base de datos para una web, sino contar con una **plataforma de persistencia preparada para soportar un ecosistema de servicios digitales administrables, reutilizables y escalables**.

---

# 17. CONCLUSIÓN TÉCNICA

Supabase, dentro de SICOVE, debe ser tratado como una pieza estructural del proyecto y no como una herramienta secundaria.

El proyecto `sicove-core` representa la base de datos principal, el repositorio de contenido, la capa de almacenamiento y el punto de apoyo para la futura evolución del sistema.

En términos concretos, este componente permitirá:
- conectar el frontend actual con datos reales,
- estructurar la oferta comercial como sistema,
- almacenar plantillas y proyectos,
- preparar el terreno para paneles administrativos,
- y sostener la futura evolución hacia una plataforma más robusta.

La decisión de documentarlo con este nivel de detalle no es un exceso: es una forma de reducir improvisación, alinear el desarrollo y asegurar que SICOVE crezca sobre una base técnica coherente.

---

# 18. PRÓXIMO PASO RECOMENDADO

El siguiente paso natural después de este documento es:

> **diseñar e implementar el esquema SQL inicial en Supabase, en español, alineado con la arquitectura definida.**

Ese esquema debe incluir como mínimo:
- categorías de servicio,
- planes,
- plantillas,
- secciones de plantilla,
- proyectos,
- páginas,
- secciones,
- media,
- consultas,
- y complementos.

---

> Este documento establece la base técnica oficial de cómo Supabase será utilizado dentro de SICOVE.

