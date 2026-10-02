# 🎂 ¡Felices 24, Mi Amor! - 5 de Octubre

Página web interactiva creada para una sorpresa de cumpleaños con contador de días desde el nacimiento, sobre con carta sellada, galería polaroid y la búsqueda del tesoro con acertijo para la primera pista en el lavarropas.

---

## 🚀 Pasos para subir este proyecto a GitHub

### 1. Crear un repositorio en GitHub
1. Entra a [github.com](https://github.com) e inicia sesión.
2. Haz clic en el botón verde **"New"** (Nuevo repositorio).
3. Nómbralo como quieras (por ejemplo: `cumple24` o `sorpresa-cumpleanos`).
4. Déjalo en **Público** (o Privado) y no marques la casilla de añadir README (ya tenemos este).
5. Haz clic en **"Create repository"**.

---

### 2. Subir el código desde tu computadora

Abre una terminal en la carpeta de este proyecto y ejecuta estos comandos (reemplazando con la URL de tu repositorio):

```bash
# 1. Iniciar git
git init

# 2. Agregar todos los archivos
git add .

# 3. Guardar el primer commit
git commit -m "Sorpresa de cumpleaños 24"

# 4. Asignar la rama principal
git branch -M main

# 5. Conectar con tu repositorio de GitHub (cambia por tu usuario y repo)
git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git

# 6. Subir el código a GitHub
git push -u origin main
```

---

### 3. Publicar la página web GRATIS con GitHub Pages

Ya dejamos configurado el archivo `.github/workflows/deploy.yml` para que se publique automáticamente:

1. En tu repositorio de GitHub, entra a **Settings** (Configuración).
2. En el menú lateral izquierdo, haz clic en **Pages**.
3. En **Build and deployment > Source**, cambia de *Deploy from a branch* a **GitHub Actions**.
4. ¡Listo! En 1 minuto tu página estará publicada y visible para todo el mundo en una URL como:  
   `https://TU-USUARIO.github.io/TU-REPOSITORIO/`

---

### 4. Alternativa: Publicar en Vercel o Netlify (Recomendado y más rápido)

Si prefieres no usar GitHub Pages:
* **Vercel:** Entra en [vercel.com](https://vercel.com), pulsa **"Add New Project"**, selecciona este repositorio de GitHub y haz clic en **Deploy**.
* **Netlify:** Entra en [app.netlify.com](https://app.netlify.com), arrastra la carpeta `dist` en **Netlify Drop** y tu web estará lista en 10 segundos.

---

## 🛠️ Comandos útiles locales

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build
```
