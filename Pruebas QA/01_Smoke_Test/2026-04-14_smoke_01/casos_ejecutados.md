| ID | Módulo | Pasos ejecutados | Estado | Evidencia breve |
|:---|:---|:---|:---|:---|
| 1 | Home | URL `/` abierta. Se esperó hidratación. | PASS | Todo carga velozmente sin parpadeos de error. |
| 2 | Home | Clic visual al botón de Cotizar del Hero. | PASS | Botón ancla con hover y `href` activo. |
| 3 | Home | Escaneo del DOM visible. | PASS | Textos data-driven desde mocks y content local. |
| 4 | Navbar | Clic en el logo superior izquierdo. | PASS | URL enruta a `/`. |
| 5 | Navbar | Hover y clic sobre "Servicios" y "Precios". | PASS | Carga correcta usando componente `next/link`. |
| 6 | Navbar | Viewport en 375px; clic menú hamburguesa. | PASS | Se despliega modal de navegación móvil. |
| 7 | Navbar | Localización de ThemeToggle en móvil. | PASS | El toggle móvil (`md:hidden`) existe en DOM. |
| 8 | Precios | Entrar a `/precios`. Validar lista literal en pantalla. | PASS | Coincide perfecto 1 a 1 en nombre y montos. |
| 9 | Precios | Buscar Badge de "Recomendado" sobre 'Web Informativa Pro'. | PASS | Estilos CSS presentes que iluminan la tarjeta y Badge. |
| 10 | Precios | Buscar strings de "Avanzado" o "Mensual". | PASS | No se encontraron restos de configuraciones descartadas. |
| 11 | Contacto | Hover sobre Send, clic sin teclado. | PASS | Bloqueo "Required" del input nativo HTML5. |
| 12 | Contacto | Input `test` en campo typo `email`. | PASS | Freno "Please include an '@' in the email address". |
| 13 | Contacto | Llenado con `test@test.com` y submit integral. | PASS | Mensaje de validación simulado: '¡Enviado!'. |
| 14 | Contacto | Análisis de flujo. | PASS | Funcional de frente visual, pero Supabase pendiente. |
| 15 | Responsive | Scroll transversal sobre `precios` y `home` a 375px. | PASS | Eje X libre (`overflow-x-hidden` global cumple). |
| 16 | Responsive | Revisión de Flex/Grid layout. | PASS | Items descienden en bloque visual sin empotrarse. |
| 17 | Responsive | Lectura a precios en 375px. | PASS | Texto perfectamente escalable. |
| 18 | Dark Mode | Clic en el sol/luna a 1280px (Desktop). | PASS | `<html class="dark">` acoplado; el fondo cambia tonalidad. |
| 19 | Dark Mode | Clic en sol/luna a 375px (Mobile). | PASS | Alterna sin requerir re-render ruidoso. |
| 20 | Dark Mode | Ver precios en oscuro buscando contrastes ciegos. | PASS | Combinación cromática cian/negro legibles. |
