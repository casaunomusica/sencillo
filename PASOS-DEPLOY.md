# Paso a paso: subir App Sencilla a GitHub y Vercel (otra cuenta)

**Importante:** Todo lo que sigue se hace **solo dentro de la carpeta `Sencillo`**. No abres, no modificas ni tocas las carpetas de La Consulta Adaptogénica ni Des-adaptogénica. Sus repos y su Vercel siguen igual.

---

## Parte A: Subir el código a GitHub (con tu cuenta secundaria)

### A.1 – Abrir la terminal en la carpeta correcta

1. Abre la terminal (en Cursor o en tu Mac).
2. Navega **solo** a esta carpeta (copia y pega tal cual):

```bash
cd /Users/charlie/Desktop/Proyectos/Sencillo
```

3. Comprueba que estás en el sitio correcto (debe salir algo como `.../Proyectos/Sencillo`):

```bash
pwd
```

Si ves `/Users/charlie/Desktop/Proyectos/Sencillo`, perfecto. **No hagas `cd` a ninguna otra carpeta** (ni Consulta Adaptogénica ni Des-adaptogénica).

---

### A.2 – Crear el repositorio nuevo en GitHub (cuenta secundaria)

1. Abre el navegador y entra en **github.com**.
2. **Cierra sesión** si estás con la cuenta que usas para tus proyectos principales.
3. **Inicia sesión** con la **cuenta secundaria** (la de los proyectos experimentales).
4. Arriba a la derecha: clic en **+** → **New repository**.
5. Rellena:
   - **Repository name:** por ejemplo `sencillo` o `app-sencilla` (tú eliges el nombre).
   - **Public**.
   - **No marques** “Add a README file”, “Add .gitignore” ni “Choose a license” (el proyecto ya tiene todo eso).
6. Clic en **Create repository**.
7. En la página del repo nuevo verás una URL. Anótala, será algo como:
   - `https://github.com/TU_USUARIO_SECUNDARIO/sencillo.git`  
   Sustituye mentalmente `TU_USUARIO_SECUNDARIO` por tu usuario de esa cuenta y `sencillo` por el nombre que hayas puesto al repo.

---

### A.3 – Inicializar Git y subir el código (solo en Sencillo)

Vuelve a la terminal (asegúrate de seguir en `Sencillo` con `pwd`). Ejecuta **cada bloque** y espera a que termine antes del siguiente.

**Paso 1 – Inicializar Git en esta carpeta (solo aquí):**

```bash
cd /Users/charlie/Desktop/Proyectos/Sencillo
git init
```

Verás algo como: `Initialized empty Git repository in .../Sencillo/.git/`. Eso es solo dentro de Sencillo.

**Paso 2 – Añadir todos los archivos:**

```bash
git add .
```

**Paso 3 – Primer commit:**

```bash
git commit -m "App sencilla lista para Vercel"
```

**Paso 4 – Nombrar la rama principal (opcional pero recomendado):**

```bash
git branch -M main
```

**Paso 5 – Decirle a Git dónde está el repo en GitHub (sustituye la URL):**

Sustituye en la siguiente línea:
- `TU_USUARIO_SECUNDARIO` → tu usuario de la cuenta secundaria de GitHub.
- `NOMBRE_DEL_REPO` → el nombre del repo que creaste (ej. `sencillo`).

Luego ejecuta:

```bash
git remote add origin https://github.com/TU_USUARIO_SECUNDARIO/NOMBRE_DEL_REPO.git
```

Ejemplo si tu usuario es `mi-cuenta-experimental` y el repo se llama `sencillo`:

```bash
git remote add origin https://github.com/mi-cuenta-experimental/sencillo.git
```

**Paso 6 – Subir el código:**

```bash
git push -u origin main
```

Te pedirá usuario y contraseña (o token) de GitHub. Usa los de la **cuenta secundaria**. Si usas 2FA, en lugar de contraseña suele pedir un **Personal Access Token** (en GitHub: Settings → Developer settings → Personal access tokens).

Cuando termine, en la web del repo deberías ver todos los archivos del proyecto. **Con esto no has cambiado nada en tus otros proyectos**: solo creaste un repo nuevo y subiste la carpeta Sencillo.

---

## Parte B: Desplegar en Vercel (con tu cuenta secundaria de Vercel)

### B.1 – Entrar en Vercel con la cuenta correcta

1. Abre **vercel.com** en el navegador.
2. Si ya estabas logueado con la cuenta de La Consulta Adaptogénica/Des-adaptogénica, **cierra sesión**.
3. **Inicia sesión** con la cuenta de Vercel que quieras usar para estos proyectos experimentales (puede ser la misma cuenta secundaria que en GitHub, o otra).

### B.2 – Importar el repositorio

1. En el dashboard de Vercel: **Add New…** → **Project**.
2. En “Import Git Repository” deberías ver repos de las cuentas de GitHub conectadas. Elige el repo que acabas de crear (ej. `sencillo` o `app-sencilla`). Si no lo ves, usa **Import** y pega la URL del repo: `https://github.com/TU_USUARIO_SECUNDARIO/NOMBRE_DEL_REPO`.
3. Si te pide conectar GitHub, autoriza **solo** la cuenta secundaria (o el org que uses para experimentos), para no mezclar con los proyectos principales.

### B.3 – Configuración del deploy (no hace falta cambiar nada)

- **Framework Preset:** Vite (debería detectarlo solo).
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

Si todo aparece así, no toques nada. Clic en **Deploy**.

### B.4 – Listo

Cuando termine el deploy, te dará una URL tipo `sencillo-xxx.vercel.app`. Esa es tu app en vivo. Los proyectos de La Consulta Adaptogénica y Des-adaptogénica siguen en sus propias URLs y configuraciones; no se modifican.

---

## Resumen de seguridad para tus otros proyectos

| Qué hiciste | ¿Afecta a La Consulta Adaptogénica / Des-adaptogénica? |
|-------------|--------------------------------------------------------|
| `cd` solo a `Sencillo` | No. Nunca entraste en sus carpetas. |
| `git init` en `Sencillo` | No. Solo creaste un repo nuevo dentro de Sencillo. |
| `git remote add origin` (repo secundario) | No. Ese `origin` es solo para Sencillo. |
| `git push` a ese repo | No. Solo subiste Sencillo a un repo nuevo. |
| Deploy en Vercel (cuenta secundaria) | No. Es otro proyecto en otra cuenta. |

Si en algún momento abres otra carpeta (por ejemplo `cd .../La-Consulta-Adaptogenica`), esa carpeta tiene su propio `.git` y su propio `origin`. Los comandos de esta guía no se ejecutaron ahí, así que no se modifica nada.

Cuando quieras volver a trabajar en La Consulta Adaptogénica o Des-adaptogénica, abre su carpeta y usa `git` como siempre; todo sigue igual.
