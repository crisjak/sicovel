# 🚀 INFORME DE PROYECTO SICOVE
## Versión Técnica Integral 2026
**Estado:** Documento maestro de arquitectura, negocio y roadmap  
**Proyecto:** SICOVE  
**Responsable:** Cristóbal Soto  
**Ubicación:** Santiago, Chile  
**Fecha base:** Abril 2026  

---

# 1. RESUMEN EJECUTIVO

SICOVE (Simplicidad, Confiabilidad, Velocidad) es un emprendimiento chileno de desarrollo digital orientado a la creación de soluciones web modernas, administrables y escalables para negocios que necesitan presencia digital, operación comercial y autonomía tecnológica. Su propuesta se distancia de las agencias tradicionales que entregan sitios cerrados o dependientes de terceros, y se enfoca en construir plataformas que el cliente pueda operar y evolucionar sin quedar atado al desarrollador.

El proyecto no debe entenderse únicamente como una oferta de “sitios web”. En su forma real, SICOVE busca construir una **base tecnológica reutilizable** sobre la cual se puedan lanzar múltiples tipos de soluciones: landing pages, sitios corporativos, e-commerce y, a futuro, sistemas de gestión, automatizaciones y asistentes conversacionales.

La oportunidad estratégica de SICOVE está en combinar cuatro elementos que normalmente aparecen separados en el mercado:
1. diseño visual moderno y performance alto,
2. panel administrativo propio,
3. capacidad de reutilizar estructuras base o plantillas,
4. y una arquitectura suficientemente flexible para crecer desde servicios web hacia productos más complejos.

En términos comerciales, SICOVE operará con un modelo híbrido que combina implementación única por proyecto con planes de mantención mensual. Esto permite atender tanto a clientes que desean comprar su solución como activo digital propio, como a aquellos que prefieren un esquema de acompañamiento continuo con hosting, soporte, actualizaciones y monitoreo.

A nivel técnico, la dirección más coherente del proyecto es una arquitectura híbrida compuesta por:
- **Next.js 15 + React 19** para frontend y panel web,
- **React Native + Expo** para app móvil administradora,
- **Node.js** como capa principal de lógica de negocio,
- **Supabase** para PostgreSQL administrado, storage y eventualmente auth,
- **Vercel** para despliegue del frontend,
- **Docker** para estandarización de entornos, desarrollo local reproducible y despliegue del backend cuando corresponda.

Esta arquitectura permite acelerar el desarrollo sin perder control sobre la lógica sensible del negocio, la seguridad, la trazabilidad y la futura escalabilidad.

---

# 2. VISIÓN DEL PROYECTO

SICOVE nace como una respuesta a un problema claro del mercado: muchas pymes y negocios en Chile necesitan presencia digital y herramientas de gestión modernas, pero hoy suelen encontrarse con dos extremos. Por un lado, soluciones muy económicas pero técnicamente limitadas, dependientes de WordPress, plugins o constructores cerrados. Por otro, desarrollos a medida más robustos pero costosos, lentos de implementar y difíciles de mantener.

SICOVE busca ocupar el espacio intermedio de alto valor: entregar una experiencia de software moderna, con rendimiento premium, administración centralizada y posibilidad de personalización, pero sobre una base tecnológica que reduzca tiempos de implementación y aumente la reutilización.

La visión de largo plazo no es solo construir proyectos para clientes individuales. La visión de fondo es construir un **motor de producción digital reutilizable**, donde parte importante del trabajo se apoya en:
- plantillas base,
- estructuras de contenido reutilizables,
- módulos configurables,
- y una capa común de administración que luego se personaliza según el cliente y el tipo de servicio.

Eso convierte a SICOVE en algo más cercano a una **plataforma modular de servicios digitales** que a una agencia convencional. El valor no está únicamente en el diseño visual, sino en la combinación entre diseño, operación, estructura tecnológica, administración y escalabilidad.

---

# 3. PROPÓSITO Y PROPUESTA DE VALOR

La propuesta de valor central de SICOVE puede resumirse así:

> **Desarrollar plataformas web modernas, rápidas y administrables, con control operativo para el cliente y una base técnica capaz de crecer con su negocio.**

Esta propuesta se sostiene en varios pilares:

## 3.1 Autonomía del cliente
El cliente no recibe un sitio estático ni depende completamente del desarrollador para cada cambio. El objetivo es que pueda:
- editar textos,
- cambiar imágenes,
- ajustar partes de su contenido,
- gestionar formularios,
- administrar productos,
- revisar ventas,
- y en algunos casos operar procesos internos desde panel web o móvil.

## 3.2 Arquitectura moderna
SICOVE se construye con tecnologías contemporáneas orientadas a performance, mantenimiento y escalabilidad, alejándose del enfoque basado en plantillas rígidas, plugins frágiles o stacks legacy.

## 3.3 Reutilización inteligente
El proyecto no busca rehacer todo desde cero en cada implementación. La existencia de plantillas base y estructuras reutilizables permite:
- bajar tiempos de desarrollo,
- mantener calidad consistente,
- ofrecer múltiples servicios bajo una misma base técnica,
- y mejorar el margen operativo del negocio.

## 3.4 Escalabilidad funcional
Aunque SICOVE parte por servicios concretos como landing pages, sitios corporativos y e-commerce, la arquitectura debe permitir crecer hacia módulos más complejos, incluyendo sistemas de gestión, automatizaciones, integraciones y asistentes conversacionales.

## 3.5 Control estratégico del negocio
Aunque se usen herramientas de infraestructura administrada como Supabase o Vercel, la lógica crítica del sistema debe seguir bajo control del proyecto. Esto significa que la toma de decisiones sensibles, los permisos, la auditoría y la lógica de negocio se concentran en una capa servidor propia.

---

# 4. PORTAFOLIO DE SERVICIOS

SICOVE ofrece actualmente cuatro líneas principales, aunque no todas tienen el mismo nivel de prioridad inmediata.

## 4.1 Landing Pages
Las landing pages son el producto de entrada más simple y comercialmente útil para adquisición de clientes. Están diseñadas para un solo flujo principal: convertir visitas en acciones concretas, como solicitudes de contacto, formularios enviados, agendamientos o reservas.

### Características funcionales
- una sola vista o página principal,
- estructura visual enfocada en conversión,
- hero principal potente,
- llamados a la acción visibles,
- formulario o medio de contacto integrado,
- secciones de apoyo como beneficios, testimonios, preguntas frecuentes y contacto.

### Objetivo comercial
Permitir a pequeños negocios, profesionales o campañas puntuales tener una presencia digital moderna y rápida de implementar.

### Rol dentro de SICOVE
Las landing pages son especialmente importantes porque permiten:
- validar el modelo comercial,
- generar primeros casos de éxito,
- construir demos,
- y probar el motor de plantillas reutilizables con bajo riesgo.

## 4.2 Sitios Informativos
Los sitios informativos representan la versión corporativa del servicio. Su foco no es una sola conversión, sino una presencia digital más completa para empresas, profesionales o instituciones.

### Componentes típicos
- inicio,
- sobre nosotros,
- servicios,
- contacto,
- preguntas frecuentes,
- páginas adicionales configurables,
- secciones dinámicas editables.

### Valor para el cliente
Permiten comunicar credibilidad, mejorar posicionamiento, estructurar mejor la oferta y administrar contenido desde un panel.

### Relación con el panel admin
A diferencia de una web estática tradicional, la visión de SICOVE es que estas páginas se alimenten desde un sistema administrable donde el cliente pueda actualizar textos, imágenes y estructura de ciertos bloques sin tocar código.

## 4.3 E-commerce
El e-commerce es uno de los servicios más estratégicos de SICOVE porque combina frontend, administración, pagos, inventario y analítica, mostrando mejor que ningún otro servicio la capacidad real de la plataforma.

### Alcance funcional esperado
- catálogo de productos,
- categorías,
- detalle de producto,
- carrito,
- checkout,
- integración con medios de pago chilenos como Webpay o Flow,
- panel de productos,
- stock,
- cupones,
- gestión de pedidos,
- estado de ventas,
- métricas comerciales.

### Valor diferencial
No se trata solo de “hacer una tienda”, sino de ofrecer una tienda operable con panel propio y eventualmente soporte móvil, lo cual la acerca más a una solución de negocio que a una página de catálogo.

## 4.4 Sistemas de Gestión
Los sistemas de gestión forman parte del horizonte estratégico del proyecto, pero por decisión actual quedan congelados como línea futura y no como foco de ejecución inmediata. Aun así, deben permanecer documentados porque influyen directamente en cómo se diseña la arquitectura desde hoy.

### Qué se entiende por sistemas de gestión
Aplicaciones web con lógica interna más compleja, capaces de modelar procesos de negocio, usuarios internos, estados, reportes y flujos operativos.

### Ejemplos posibles
- reservas,
- fichas clínicas,
- control de agendas,
- CRM liviano,
- dashboards de operación,
- administración de clientes o eventos.

### Estado actual
No forman parte del MVP inmediato, pero sí deben ser una proyección explícita del proyecto, ya que justifican decisiones de arquitectura como:
- el uso de roles y permisos,
- la necesidad de una capa robusta de backend,
- el enfoque modular,
- y la trazabilidad del sistema.

## 4.5 Servicios futuros proyectados
SICOVE también proyecta crecer hacia nuevas líneas que no forman parte del núcleo inmediato, pero sí deben documentarse como horizonte de expansión:

### Chatbots
Sistemas conversacionales orientados a:
- captación,
- atención inicial,
- seguimiento de leads,
- automatización de soporte,
- canalización a flujos de negocio.

### Automatizaciones
Implementaciones que conecten procesos internos, formularios, correos, paneles, ventas y acciones repetitivas para reducir trabajo operativo y aumentar eficiencia.

### Integraciones externas
Conexiones con:
- pasarelas de pago,
- servicios de correo,
- CRM,
- sistemas de mensajería,
- APIs de terceros.

Estas líneas futuras no deben afectar negativamente el foco inmediato, pero sí deben reconocerse como una dirección natural del proyecto.

---

# 5. MODELO DE NEGOCIO

SICOVE se estructura con un modelo comercial híbrido diseñado para adaptarse a distintos perfiles de cliente y crear ingresos tanto iniciales como recurrentes.

## 5.1 Implementación única
Este modelo consiste en cobrar un pago inicial por el diseño, desarrollo, configuración y entrega del proyecto completo.

### Qué incluye
- levantamiento del proyecto,
- adaptación de plantilla o desarrollo desde base,
- configuración visual,
- conexión a backend o CMS,
- puesta en producción,
- capacitación básica si aplica.

### Valor estratégico
Este esquema es útil para clientes que desean propiedad más directa del activo digital o que prefieren un modelo de compra en vez de una suscripción.

## 5.2 Mantención mensual
Corresponde al cobro recurrente por el soporte y continuidad operativa del sistema.

### Qué puede incluir
- hosting,
- monitoreo,
- actualizaciones menores,
- soporte,
- backups,
- mantenimiento preventivo,
- pruebas automatizadas,
- pequeños cambios de contenido.

### Beneficio para SICOVE
Genera flujo recurrente, estabilidad financiera y relación continua con el cliente.

## 5.3 Precios dinámicos
Una característica distintiva del proyecto es que el pricing no se concibe como algo completamente estático. Parte de la visión es que los precios, beneficios y configuraciones comerciales puedan ser administrados desde panel.

### Impacto interno
Esto obliga a tratar precios, planes y beneficios como datos administrables, no solo como contenido duro.

### Impacto comercial
Permite adaptar:
- ofertas,
- promociones,
- configuraciones por mercado,
- campañas por temporada,
- y eventualmente cotización flexible.

---

# 6. ESTADO ACTUAL DEL PROYECTO

SICOVE ya no está en fase puramente conceptual. El frontend se encuentra avanzado y presenta decisiones de ingeniería relevantes que demuestran una base seria para continuar el proyecto.

## 6.1 Estado del frontend
El frontend ya cuenta con:
- layout global unificado,
- theming consistente,
- navbar rediseñado,
- componentes desacoplados del contenido,
- resolución de bugs complejos de rasterización en móviles,
- y una filosofía de diseño data-driven que evita hardcodear contenido directamente en las vistas.

Esto es especialmente importante porque significa que el proyecto ya avanzó en la dirección correcta para conectarse más adelante con:
- panel admin,
- APIs,
- estructuras JSON,
- almacenamiento de contenido dinámico,
- y plantillas reutilizables.

## 6.2 Estado de la visión arquitectónica
La visión también evolucionó desde una idea inicial de infraestructura propia rígida hacia una arquitectura más práctica, donde se contempla usar Supabase como capa de datos e infraestructura y Vercel como entorno natural del frontend, sin renunciar a una capa de negocio propia en Node.js.

Esto representa un ajuste estratégico, no una contradicción fatal. La clave es definir correctamente qué queda en cada capa y no delegar lógica crítica al frontend.

---

# 7. ARQUITECTURA TÉCNICA GENERAL

La arquitectura recomendada para SICOVE debe ser técnicamente moderna, realista para el contexto del proyecto y suficientemente flexible para soportar tanto el MVP como la expansión futura.

## 7.1 Principio arquitectónico central
La arquitectura se organiza en tres grandes capas:

1. **Capa de presentación**  
   Frontend web y, en paralelo, futura app móvil.

2. **Capa de negocio**  
   Backend o capa servidor donde viven permisos, validaciones, operaciones críticas y lógica del sistema.

3. **Capa de persistencia e infraestructura**  
   Base de datos, almacenamiento de archivos y servicios de soporte.

## 7.2 Distribución recomendada

### Frontend web
- Next.js 15
- React 19
- desplegado en Vercel

### Backend / server layer
- Node.js
- APIs o rutas server para lógica sensible
- validación server-side
- autorización y procesos críticos

### Persistencia
- Supabase PostgreSQL
- Supabase Storage
- eventualmente Supabase Auth si conviene por velocidad de implementación

Esta distribución permite mantener un equilibrio entre velocidad de ejecución y control técnico.

---

# 8. FRONTEND WEB Y EXPERIENCIA VISUAL

El frontend de SICOVE tiene una importancia crítica porque no es solo una interfaz comercial: también es la base del futuro panel administrativo y de la experiencia que se reutilizará en proyectos para clientes.

## 8.1 Stack actual
El proyecto ya está montado sobre:
- Next.js 15 App Router,
- React 19,
- TypeScript estricto,
- Tailwind CSS v4,
- Framer Motion,
- next-themes.

## 8.2 Criterios de ingeniería ya aplicados
Ya se implementaron decisiones avanzadas como:
- separación clara entre componentes de servidor y cliente,
- layout de fondo unificado para evitar roturas visuales,
- sistema de títulos consistente,
- navegación minimalista con microinteracciones,
- menú móvil animado correctamente montado y desmontado,
- y optimización de un carrusel complejo para resolver problemas de rasterización móvil.

## 8.3 Relevancia para el proyecto
Esto demuestra que el frontend no está siendo construido como una maqueta visual, sino como una base de producto real. La existencia de componentes orientados a props, JSON e interfaces tipadas prepara directamente el sistema para ser alimentado por:
- contenido administrable,
- templates,
- secciones dinámicas,
- y datos provenientes de backend.

## 8.4 Rol estratégico del frontend
El frontend cumple múltiples funciones:
- sitio comercial de SICOVE,
- catálogo de servicios y demos,
- panel admin,
- base visual de futuras implementaciones para clientes.

Por lo tanto, su diseño debe mantenerse modular, reutilizable y desacoplado del contenido duro.

---

# 9. BACKEND Y CAPA DE NEGOCIO

Aunque una parte importante de la persistencia pueda apoyarse en Supabase, SICOVE necesita una capa propia de lógica de negocio. Esta capa es fundamental para evitar exponer operaciones críticas al frontend y para mantener control sobre la evolución del sistema.

## 9.1 Rol del backend
El backend debe encargarse de:
- validar solicitudes,
- aplicar reglas de negocio,
- verificar permisos,
- orquestar operaciones entre frontend, base de datos y storage,
- registrar auditoría,
- y ejecutar procesos delicados.

## 9.2 Qué no debe quedar solo en frontend
No es recomendable permitir que el frontend actúe directamente sobre todas las tablas o procesos del sistema, especialmente cuando se trate de:
- modificar configuraciones sensibles,
- cambiar precios,
- crear ventas,
- clonar templates,
- gestionar proyectos,
- alterar roles,
- o manipular datos privados.

## 9.3 Opciones de implementación
La capa de negocio puede implementarse de dos formas compatibles entre sí:
- Node.js con Express/Fastify como backend separado,
- o rutas server / server actions de Next.js cuando el caso de uso lo permita.

La decisión final puede tomarse por fase, pero el principio debe mantenerse: la lógica sensible vive del lado servidor.

---

# 10. SUPABASE COMO CAPA DE INFRAESTRUCTURA

Supabase tiene sentido en SICOVE siempre que se use como infraestructura de apoyo y no como reemplazo completo del backend.

## 10.1 Rol recomendado
Supabase puede encargarse de:
- PostgreSQL administrado,
- storage para imágenes y archivos,
- auth opcional,
- persistencia de contenido dinámico,
- y soporte a la estructura de plantillas y proyectos.

## 10.2 Por qué tiene sentido en SICOVE
Tu caso concreto necesita almacenar:
- imágenes,
- archivos,
- ventas,
- páginas,
- secciones,
- configuraciones visuales,
- y prototipos reutilizables.

En ese contexto, Supabase es útil porque acelera el desarrollo y simplifica la operación inicial.

## 10.3 Límite importante
La parte crítica no es si Supabase existe o no, sino **cómo se usa**.  
La arquitectura correcta no es “frontend hablando a todo directamente”, sino:

**Frontend → capa servidor → Supabase**

Así el control de permisos, trazabilidad, validación y reglas de negocio no queda disperso.

---

# 11. LÓGICA SENSIBLE DEL SISTEMA

La noción de “lógica sensible” debe quedar formalizada en el proyecto porque afecta seguridad, arquitectura y mantenimiento.

## 11.1 Definición
Se considera lógica sensible toda operación que:
- expone datos privados,
- cambia estados críticos,
- afecta integridad del negocio,
- usa credenciales secretas,
- o modifica la estructura funcional del sistema.

## 11.2 Casos concretos en SICOVE
En SICOVE, la lógica sensible incluye:
- creación y modificación de ventas,
- manejo de pedidos,
- edición de precios y planes,
- asignación de roles,
- administración de usuarios,
- acceso a formularios internos,
- generación de cotizaciones,
- clonación de plantillas base,
- asociación de recursos de media,
- integraciones con pagos,
- firmas de cargas,
- uso de claves privadas o tokens.

## 11.3 Consecuencia arquitectónica
Toda esta lógica debe pasar por backend o capa server.  
No debe delegarse únicamente al cliente, aunque el cliente tenga una sesión válida.

---

# 12. SISTEMA DE PLANTILLAS Y PROTOTIPOS REUTILIZABLES

Este es uno de los corazones estratégicos de SICOVE.

## 12.1 Concepto
SICOVE no busca crear cada proyecto desde cero. Busca construir una biblioteca de estructuras base reutilizables por tipo de servicio.

### Ejemplos
- landing para clínica,
- landing para abogados,
- sitio informativo para pyme,
- ecommerce para retail,
- panel base para servicios administrativos.

## 12.2 Componentes del sistema de templates
Un template no debe entenderse solo como una maqueta visual. Debe contener:
- estructura de páginas,
- orden de secciones,
- configuración de componentes,
- placeholders de contenido,
- branding base,
- assets iniciales,
- y posiblemente configuración de módulos.

## 12.3 Flujo operativo ideal
1. SICOVE define un template maestro.
2. El cliente elige categoría o diseño base.
3. El backend clona esa estructura en un nuevo proyecto.
4. Se generan registros editables para páginas, secciones, media y configuración.
5. El cliente o el administrador personaliza contenido desde panel.

## 12.4 Ventajas
- reducción de tiempo de implementación,
- reutilización real del trabajo,
- consistencia técnica,
- menor costo marginal por proyecto,
- facilidad para generar demos y catálogos.

## 12.5 Relevancia con el frontend actual
Este enfoque conversa directamente con la arquitectura ya adoptada en frontend, donde los componentes están diseñados para recibir contenido desde props o estructuras de datos y no desde hardcodeo rígido.

---

# 13. MODELO DE DATOS PROPUESTO

Para soportar correctamente esta visión, SICOVE necesita un modelo de datos estructurado y extensible.

## 13.1 Entidades base sugeridas
- `users`
- `roles`
- `permissions`
- `projects`
- `project_pages`
- `project_sections`
- `templates`
- `template_pages`
- `template_sections`
- `media_files`
- `inquiries`
- `products`
- `categories`
- `orders`
- `payments`
- `pricing_plans`
- `quotes`
- `audit_logs`

## 13.2 Razonamiento
Estas entidades permiten modelar:
- clientes y administradores,
- proyectos por cliente,
- estructuras de sitios,
- contenido editable,
- ecommerce,
- pricing,
- y trazabilidad.

## 13.3 Escalabilidad
Aunque el sistema de gestión esté congelado por ahora, diseñar el modelo con esta profundidad desde el inicio ayuda a no cerrar puertas para fases futuras.

---

# 14. PANEL DE ADMINISTRACIÓN

El panel admin es el elemento central de la propuesta de SICOVE. No es un accesorio: es el componente que transforma una web en una plataforma administrable.

## 14.1 Objetivo
Dar al cliente control operativo sobre su solución sin necesidad de modificar código ni depender constantemente del desarrollador.

## 14.2 Módulos principales
El panel debe estar preparado para incorporar, según el tipo de proyecto:
- gestión de contenido,
- formularios y consultas,
- configuración general,
- administración comercial,
- usuarios y roles,
- ecommerce,
- métricas,
- auditoría.

## 14.3 Gestión de contenido
Debe permitir editar:
- hero,
- carruseles,
- testimonios,
- FAQs,
- footer,
- páginas dinámicas,
- navegación,
- branding.

## 14.4 Gestión comercial
Debe soportar:
- precios,
- planes,
- descuentos,
- promociones,
- cotizaciones,
- histórico de interacciones comerciales.

## 14.5 Gobierno y permisos
El panel no debe ser un único rol global. Debe contemplar al menos:
- super admin,
- admin,
- editor,
- viewer,
- y eventualmente client admin.

---

# 15. APLICACIÓN MÓVIL ADMINISTRADORA

La app móvil es uno de los diferenciales más fuertes de SICOVE porque permite extender la administración del negocio más allá del escritorio.

## 15.1 Propósito
Dar acceso rápido a operaciones clave del panel desde iOS y Android.

## 15.2 Casos de uso inmediatos
- revisar consultas,
- recibir notificaciones,
- ver ventas recientes,
- cambiar estados,
- acceder a métricas básicas,
- responder eventos urgentes.

## 15.3 Alcance futuro
A medida que el ecosistema crezca, la app puede ampliar funcionalidades según el servicio:
- stock,
- pedidos,
- agenda,
- reportes,
- acciones internas.

## 15.4 Estado estratégico
No necesariamente debe competir en prioridad con el panel web en el corto plazo, pero sí debe permanecer como parte constitutiva de la visión del proyecto.

---

# 16. DOCKER Y SU ROL EN SICOVE

Docker es una decisión técnica importante porque ayuda a que el proyecto sea reproducible, mantenible y portable.

## 16.1 Qué resuelve Docker
Docker encapsula servicios y dependencias en contenedores para que se ejecuten igual en cualquier máquina o entorno. En SICOVE esto es valioso porque evita el clásico problema de que algo funcione en un equipo y falle en otro.

## 16.2 Uso concreto en SICOVE
Docker debe utilizarse principalmente para:
- desarrollo local estandarizado,
- levantar servicios auxiliares,
- ejecutar backend en entornos consistentes,
- pruebas reproducibles,
- y eventualmente desplegar backend en VPS o infraestructura propia.

## 16.3 Qué puede correr con Docker
En desarrollo local, Docker puede levantar:
- PostgreSQL local si se requiere entorno aislado,
- backend Node.js,
- herramientas auxiliares,
- jobs o workers futuros.

## 16.4 Relación con Vercel y Supabase
Docker no reemplaza Vercel ni Supabase. Su rol es distinto:
- Vercel despliega el frontend,
- Supabase provee base de datos y storage,
- Docker estandariza entornos y facilita backend, testing y despliegue técnico donde corresponda.

## 16.5 Valor estratégico
Usar Docker desde temprano también prepara el proyecto para:
- mover backend a un VPS,
- escalar infraestructura,
- automatizar pipelines,
- y evitar dependencia del entorno local del desarrollador.

---

# 17. VERCEL COMO ENTORNO DE DESPLIEGUE DEL FRONTEND

Vercel es una elección coherente para SICOVE porque el frontend está construido sobre Next.js y aprovecha de forma natural:
- SSR,
- SSG,
- rutas modernas,
- y despliegue integrado.

## 17.1 Qué alojará Vercel
- sitio comercial de SICOVE,
- frontend de clientes cuando corresponda,
- panel admin web,
- componentes SSR/ISR del frontend.

## 17.2 Ventajas
- integración natural con Next.js,
- despliegue rápido,
- preview deployments,
- variables de entorno seguras,
- manejo de dominios,
- simplicidad operativa.

## 17.3 Consideración importante
Aunque Vercel resuelve bien el frontend, no debe confundirse con la totalidad de la arquitectura. La capa de negocio y la persistencia siguen necesitando definición clara.

---

# 18. SEGURIDAD DEL PROYECTO

La seguridad debe abordarse desde diseño de arquitectura y no solo como una suma de herramientas.

## 18.1 Seguridad base obligatoria
SICOVE debe incorporar como mínimo:
- validación server-side,
- control de acceso por roles,
- protección de variables de entorno,
- separación entre frontend y operaciones sensibles,
- HTTPS/TLS,
- trazabilidad de acciones,
- storage con políticas adecuadas,
- manejo seguro de sesiones,
- y restricción clara de operaciones críticas.

## 18.2 Supabase y seguridad
Si se usa Supabase, se debe prestar atención especial a:
- diseño de permisos,
- RLS cuando aplique,
- separación entre claves públicas y privadas,
- buckets públicos vs privados,
- y uso correcto de service keys solo en servidor.

## 18.3 Auditoría
Dado que habrá cambios de contenido, precios, media, estados y configuraciones, el proyecto debe registrar eventos relevantes:
- quién hizo el cambio,
- cuándo,
- qué recurso afectó,
- y qué acción ejecutó.

## 18.4 Seguridad futura recomendable
Más adelante se pueden sumar:
- 2FA para admins,
- rate limiting,
- monitoreo de errores,
- alertas,
- escaneo de dependencias,
- protección más avanzada contra abuso.

---

# 19. CALIDAD, TESTING Y AUTOMATIZACIÓN

El proyecto ya contempla el uso de Playwright y CI/CD, lo cual es una decisión correcta para mantener estabilidad a medida que aumente la complejidad.

## 19.1 Objetivo del testing
Garantizar que cambios en frontend, panel o flujos críticos no rompan funcionalidades ya existentes.

## 19.2 Flujos prioritarios a probar
- login,
- navegación pública,
- envío de formularios,
- edición de contenido,
- creación de productos,
- checkout,
- cambios de estado,
- acciones clave del panel.

## 19.3 Integración continua
La combinación de GitHub Actions y Playwright ayuda a:
- validar cambios antes de desplegar,
- detectar regresiones,
- y profesionalizar el ciclo de desarrollo.

---

# 20. ROADMAP REALISTA DEL PROYECTO

El roadmap debe reflejar prioridades reales y evitar dispersión temprana.

## 20.1 Fase 1: consolidación del frontend y estructura base
- cerrar sitio comercial,
- mantener arquitectura limpia,
- preparar integración con datos,
- definir sistema de templates.

## 20.2 Fase 2: backend base y panel admin inicial
- autenticación,
- estructura de proyectos,
- gestión de contenido,
- media,
- consultas,
- roles básicos.

## 20.3 Fase 3: sistema de plantillas operable
- templates maestros,
- clonación de proyecto,
- páginas y secciones editables,
- demos por servicio.

## 20.4 Fase 4: ecommerce
- productos,
- stock,
- pedidos,
- pagos,
- métricas.

## 20.5 Fase 5: endurecimiento y calidad
- seguridad,
- auditoría,
- testing extendido,
- optimización.

## 20.6 Fase 6: líneas futuras
- sistemas de gestión,
- automatizaciones,
- chatbots,
- integraciones más avanzadas.

El sistema de gestión queda explícitamente congelado en prioridad, pero no fuera de la visión. Eso significa que la arquitectura debe dejar la puerta abierta, aunque la ejecución se posponga.

---

# 21. DIFERENCIALES COMPETITIVOS

SICOVE se diferencia por la combinación de varios atributos que en el mercado normalmente aparecen fragmentados:
- stack moderno,
- performance alto,
- panel admin propio,
- app móvil,
- reutilización de templates,
- control operativo,
- posibilidad de personalización,
- proyección hacia automatización y software más complejo.

El diferencial real no está solo en “hacer páginas bonitas”, sino en construir una base de software adaptable, reutilizable y administrable.

---

# 22. CONCLUSIÓN ESTRATÉGICA

SICOVE tiene el potencial de evolucionar desde un estudio de desarrollo hacia una plataforma modular de soluciones digitales. Para que eso ocurra, el proyecto debe mantener coherencia entre tres dimensiones:

1. **Visión de negocio**  
   No vender solo diseño, sino capacidad operativa y control.

2. **Arquitectura técnica**  
   Mantener frontend reusable, backend con lógica sensible y una capa de infraestructura bien delimitada.

3. **Modelo de escalabilidad**  
   Usar templates, panel admin y modularidad para no partir de cero en cada proyecto.

La dirección recomendada es clara:
- mantener el frontend modular ya avanzado,
- usar Vercel como entorno natural del frontend,
- usar Supabase como infraestructura de datos y storage,
- concentrar la lógica sensible en Node.js o capa server,
- usar Docker como estándar de desarrollo y backend,
- priorizar panel admin, plantillas y ecommerce,
- y dejar sistemas de gestión, automatizaciones y chatbots como expansión futura bien documentada.

Si SICOVE ejecuta bien esta ruta, no solo podrá entregar servicios. También podrá construir una base tecnológica propia sobre la cual crecer hacia productos más complejos, más rentables y con mayor valor diferencial.

