# Registro Analítico (UX & Pendientes)

### B-001
- **Módulo**: Navbar (Mobile)
- **Severidad**: Baja
- **Prioridad**: Media
- **Pasos para reproducir**: Abrir la página en un dispositivo de resolución < 768px y buscar el control de alternar "Modo Oscuro" o "Claro".
- **Resultado esperado**: Un toggle de Dark Mode visible a simple vista u oculto limpiamente dentro del sub-menú hamburguesa de fácil acceso.
- **Resultado actual**: El componente contiene código que responde bien, pero al renderizar en móvil se esconde (tiene la clase `md:block` sin contraparte mobile adecuada desplegada).
- **Clasificación**: mejora UX
- **Evidencia disponible**: Pantallazo `click_feedback_1776194618724.png` e inspección profunda del DOM en `<ThemeToggle className="hidden md:block">`.

### B-002
- **Módulo**: Contacto (Submit)
- **Severidad**: Alto (Comercial)
- **Prioridad**: Crítica
- **Pasos para reproducir**: Llenar datos correctos en el formulario de contacto y hacer clic en Enviar. 
- **Resultado esperado**: Procesamiento hacia Backend, Loader o Desactivación temporal del botón, escritura en DB local de Supabase.
- **Resultado actual**: El formulario hace React Toast o validación Front-End nominal, pero el hilo hacia el server action está desacoplado del SDK final de inserción SQL.
- **Clasificación**: funcionalidad aún no implementada
- **Evidencia disponible**: Conocimiento arquitectónico explícito del repositorio por parte del Agente + Ausencia de log de network XHR escribiendo en REST supabase en el browser.
