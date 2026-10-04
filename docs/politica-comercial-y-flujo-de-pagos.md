# SICOVEL — Política Comercial y Flujo de Pagos

> Documento oficial de decisiones comerciales del proyecto.
> Última actualización: 2026-05-31.
> Este archivo es la fuente de verdad para cualquier decisión relacionada con ventas, pagos, atención al cliente y comunicación comercial del sitio web.

---

## 1. Modelo de Venta

### Venta Asistida

SICOVEL opera bajo un modelo de **venta asistida**. No existe venta directa, autoservicio ni checkout automatizado en la web.

El sitio funciona como **vitrina comercial + canal de captación de leads**. Todo cierre de venta pasa por atención humana previa.

### Motivo

SICOVEL vende servicios digitales personalizados, no productos cerrados. Antes de cobrar es necesario entender:

- Tipo de web requerida (landing, informativa, e-commerce).
- Alcance real (páginas, secciones, funcionalidades).
- Necesidades de dominio, hosting, logo, textos, fotografías.
- Plazos de entrega.
- Si el cliente requiere boleta o factura.
- Si el alcance calza con uno de los planes existentes.

Un botón de pago directo puede provocar errores comerciales, clientes pagando sin entender el alcance, o promesas difíciles de cumplir.

---

## 2. No Pago Directo en la Web

### Prohibido en esta etapa

- Botón "Pagar ahora".
- Botón "Comprar ahora".
- Carrito para contratar servicios.
- Checkout automático.
- Webpay/Transbank integrado al frontend.
- Flow integrado al frontend.
- Suscripciones automáticas.
- Panel automático de pagos.
- Registro real de pagos conectado a base de datos.

### Lo que SÍ debe existir

- Planes visibles con precios claros.
- CTA que orienten hacia conversación (WhatsApp, formulario, cotización).
- Atención previa antes de cualquier cobro.

---

## 3. Atención Previa

La atención previa es parte explícita del frontend y del flujo comercial.

### Flujo

1. El cliente entra al sitio.
2. Revisa servicios y planes.
3. Hace clic en un CTA de contacto (WhatsApp, formulario, cotización).
4. Se inicia atención previa (WhatsApp, teléfono o Google Meet).
5. Se confirma el alcance del proyecto.
6. Se envía una propuesta simple (por WhatsApp o correo).
7. El cliente paga el 50% de anticipo.
8. SICOVEL emite boleta de honorarios electrónica.
9. Se inicia el desarrollo.
10. El cliente revisa el resultado.
11. El cliente paga el 50% restante.
12. SICOVEL publica o entrega el sitio.

### Formulario de Cotización Inicial

Campos recomendados:

- Nombre.
- WhatsApp.
- Correo.
- Nombre del negocio.
- Rubro.
- Tipo de proyecto (landing, informativa, e-commerce, otro).
- Mensaje breve.

*(Nota técnica/comercial: El campo sobre si necesita boleta o factura fue removido visualmente para reducir fricción. Este tema se trata mejor en las FAQ, en la reunión y en la propuesta comercial. Sin embargo, la columna `tipo_documento` permanece activa en la base de datos para uso interno o futuro).*

No debe ser un formulario excesivamente largo. El cuestionario detallado puede enviarse después del primer contacto.

---

## 4. CTA Oficiales

### CTA Permitidos

- "Hablar por WhatsApp" **(CTA principal)**.
- "Solicitar cotización" **(CTA secundario)**.
- "Solicitar este plan".
- "Cotizar proyecto".
- "Agendar diagnóstico".
- "Enviar solicitud".
- "Quiero una propuesta".

### CTA Prohibidos

- "Pagar ahora".
- "Comprar ahora".
- "Agregar al carrito".
- "Contratar online".
- Cualquier texto que implique transacción directa sin atención previa.

---

## 5. Flujo de Pagos: 50/50

### Estructura

| Momento | Porcentaje | Descripción |
|---------|-----------|-------------|
| Anticipo | 50% | Se paga antes de iniciar el desarrollo, después de confirmar el alcance |
| Saldo final | 50% | Se paga antes de publicar o entregar el sitio terminado |

### Medio Principal

- **Transferencia bancaria.**

### Medio Complementario (Opcional / Futuro Cercano)

- **Flow link manual:** Se envía un link de pago por WhatsApp o correo después de la atención previa. No se integra Flow al frontend todavía.

### Medios Futuros (No Implementar Ahora)

- Flow integrado al sitio.
- Webpay/Transbank.
- Automatización de estados de pago.
- Historial de pagos.
- Panel admin comercial de pagos.

Estos medios deben quedar **contemplados en la arquitectura** de datos y configuración, pero **no implementados** hasta nueva instrucción.

---

## 6. Documentación Tributaria

### Documento Actual

**Boleta de honorarios electrónica**, emitida con el RUT personal del fundador.

El fundador está registrado en el Servicio de Impuestos Internos (SII) y puede emitir boletas por sus servicios profesionales.

### Factura

No se debe prometer factura si no existe empresa formalizada ni capacidad real de emitir factura electrónica.

**Texto recomendado para FAQ o propuesta (no para hero):**

> "Emitimos boleta de honorarios electrónica por nuestros servicios. Si tu empresa requiere factura, conversemos antes de iniciar el proyecto para revisar la mejor alternativa disponible."

### Clientes que Exigen Factura

Se evaluará caso a caso. Si llegan clientes más grandes o empresas que exigen factura obligatoriamente, se considerará formalizar SICOVEL como empresa.

---

## 7. Cliente Ideal Inicial

- Emprendedores.
- Negocios locales.
- Profesionales independientes.
- PYMEs pequeñas.
- Tiendas pequeñas.
- Marcas que están comenzando.

---

## 8. WhatsApp Flotante

Se debe implementar un botón flotante de WhatsApp visible en todas las páginas públicas.

### Requisitos

- Mensaje prellenado configurable (ejemplo: "Hola, quiero cotizar un proyecto web con SICOVEL. Me interesa recibir orientación sobre el plan más adecuado.").
- Número de WhatsApp configurable.
- Texto del botón configurable.
- Tooltip o label accesible.
- Activación/desactivación.
- Ubicación configurable.
- Comportamiento responsive (móvil y escritorio).
- Tracking futuro opcional.
- **No hardcodear ningún valor dentro del componente.**

---

## 9. Sección "Cómo Trabajamos"

Debe existir una sección visible en el sitio que explique el proceso de forma simple y genere confianza.

### Pasos Recomendados

1. Cuéntanos tu idea.
2. Revisamos tu caso.
3. Te recomendamos el plan adecuado.
4. Enviamos propuesta.
5. Iniciamos con 50% de anticipo.
6. Desarrollamos, revisamos y publicamos.

### Tono

- No debe sonar burocrático.
- Debe transmitir confianza, claridad y acompañamiento.
- Data-driven: los pasos deben venir de datos configurables, no hardcodeados en JSX.

---

## 10. FAQ Comercial

Las preguntas frecuentes deben incluir temas como:

- ¿Puedo pagar directamente desde la web?
- ¿Cómo se inicia un proyecto?
- ¿Cuánto se paga para comenzar?
- ¿Aceptan transferencia bancaria?
- ¿Tienen Flow o pago con tarjeta?
- ¿Emiten boleta o factura?
- ¿Qué pasa si necesito factura?
- ¿El precio incluye dominio o hosting?
- ¿Qué pasa después de publicar mi sitio?
- ¿Ofrecen mantención mensual?
- ¿Puedo cambiar contenido después?

Las respuestas deben ser claras, comerciales y no demasiado legales. Se almacenan en la tabla `faqs` de Supabase.

---

## 11. Oferta Principal: Pago Único

La oferta principal de SICOVEL es **pago único por desarrollo**.

No vender como "arriendo de página web". Eso puede generar sensación de dependencia, falta de propiedad o poca transparencia.

### Mantención Mensual (Futuro)

Se ofrecerá como servicio **opcional complementario**, no como eje principal. Podría incluir:

- Hosting.
- Soporte técnico.
- Actualizaciones.
- Backups.
- Cambios menores.
- Monitoreo.
- Revisión de formularios.
- Asistencia básica.

**No modelar tabla ni implementar todavía.** Solo documentar la propuesta para una siguiente fase.

---

## 12. Reglas Técnicas Obligatorias

### Prohibido

- Hardcodear precios, planes, textos comerciales críticos, CTA o configuración dentro del JSX.
- Conectar Supabase al frontend público sin instrucción explícita (salvo lo ya conectado: FAQs, Testimonios, Hero config, Contacto leads).
- Construir backend dedicado (Express/Nest).
- Implementar pagos automáticos.
- Crear lógica rígida que impida futura edición desde panel admin.

### Obligatorio

- Separar contenido, configuración y presentación.
- Usar estructuras data-driven.
- Mantener servicios, planes, CTA, WhatsApp y FAQ como datos editables/configurables.
- Preparar futura conexión con Supabase/admin para todo dato nuevo.
- Mantener componentes reutilizables.
- Mantener UI coherente con el diseño premium/minimalista actual.
- Cuidar mobile, dark mode y performance.
- Usar mock data con shape compatible con el modelo real de base de datos durante desarrollo frontend.

### "Preparar para futuro" significa

Que el frontend y las estructuras de datos queden **listas** para que más adelante se puedan activar:

- Mantenciones mensuales.
- Flow integrado.
- Webpay/Transbank.
- Estados de pago.
- Clientes y proyectos.
- Leads avanzados.
- Panel admin comercial.
- Edición de precios y servicios.
- Historial de pagos.
- Configuración de métodos de pago.
- Configuración de documentación tributaria.

**No significa implementar ahora.** Significa no bloquear la futura implementación con decisiones técnicas rígidas.

---

## 13. Estructura Comercial Vigente

| Servicio | Planes | Modalidad |
|----------|--------|-----------|
| Landing Page Profesional | Único | Pago único |
| Web Informativa | Basic, Pro (destacado), Premium | Pago único |
| E-commerce | Basic, Pro | Pago único |

- Los precios ya están definidos y activos.
- Las promociones ya están activas en Supabase.
- No mostrar extras públicos por ahora.
- La oferta debe ser simple, clara, creíble y fácil de vender.

---

*Fin del documento. Cualquier cambio a esta política debe ser aprobado explícitamente antes de implementarse en código.*
