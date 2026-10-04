# Proyecto SICOVEL

¡Hola! Si te compartieron este proyecto, aquí tienes las instrucciones para ejecutarlo en tu computadora.

El proyecto está dividido principalmente en la aplicación Web (Frontend en Next.js) y el Backend (si aplica, en Django).

## 1. Requisitos Previos

Para el **Frontend (Página Web)** necesitas instalar:
- [Node.js](https://nodejs.org/) (versión 18 o superior)
- Git (opcional pero recomendado)

Para el **Backend (Django)** necesitas instalar:
- Python 3.10+
- PostgreSQL (si vas a usar la base de datos local)

## 2. Cómo ejecutar la Web Informativa (Next.js)

En proyectos de Node.js / Next.js, el equivalente al `requirements.txt` de Python es el archivo `package.json`. No necesitas un `requirements.txt` para la web, solo debes seguir estos pasos:

1. Abre una terminal y navega hasta la carpeta raíz del proyecto (`SICOVE`).
2. Instala todas las dependencias ejecutando:
   ```bash
   npm install
   ```
3. Una vez que termine de instalar, entra a la carpeta de la web:
   ```bash
   cd apps/web
   ```
4. Levanta el servidor de desarrollo:
   ```bash
   npm run dev
   ```
5. Abre tu navegador en [http://localhost:3000](http://localhost:3000) para ver la página.

## 3. (Opcional) Cómo ejecutar el Backend (Django)

Si vas a correr el sistema de gestión en Django, ahí sí usarás el `requirements.txt`:

1. Ve a la carpeta del backend.
2. Crea un entorno virtual:
   ```bash
   python -m venv venv
   ```
3. Activa el entorno virtual:
   - En Windows: `venv\Scripts\activate`
   - En Mac/Linux: `source venv/bin/activate`
4. Instala los requerimientos:
   ```bash
   pip install -r requirements.txt
   ```
5. Corre las migraciones y el servidor:
   ```bash
   python manage.py migrate
   python manage.py runserver
   ```
