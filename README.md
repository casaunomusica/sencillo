<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# App Sencilla

App experimental lista para desplegar en Vercel (cuenta secundaria), sin afectar tus proyectos principales (La Consulta Adaptogénica / Des-adaptogénica).

## Run locally

**Requisitos:** Node.js

1. Instalar dependencias: `npm install`
2. Opcional: crear `.env` o `.env.local` solo si en el futuro usas API (p. ej. `GEMINI_API_KEY`). Esta app no lo requiere.
3. Arrancar: `npm run dev`

---

## Deploy en Vercel con otra cuenta (GitHub + Vercel)

Puedes usar **otra cuenta de GitHub y otra de Vercel** sin desconfigurar nada. Cada repo y cada proyecto en Vercel son independientes.

### 1. Subir el código a tu otra cuenta de GitHub

1. Inicia sesión en GitHub con la **cuenta secundaria** (la que quieras para estos proyectos experimentales).
2. Crea un **repositorio nuevo** (ej. `sencillo` o `app-sencilla`). No inicialices con README si ya tienes código local.
3. En tu máquina, desde la carpeta del proyecto:

```bash
git init
git add .
git commit -m "Vercel-ready: app sencilla"
git branch -M main
git remote add origin https://github.com/TU_USUARIO_SECUNDARIO/NOMBRE_REPO.git
git push -u origin main
```

Sustituye `TU_USUARIO_SECUNDARIO` y `NOMBRE_REPO` por tu usuario de la otra cuenta y el nombre del repo.

### 2. Conectar y desplegar en Vercel (otra cuenta)

1. Entra en [vercel.com](https://vercel.com) e inicia sesión con la **cuenta de Vercel secundaria**.
2. **Add New…** → **Project**.
3. **Import** el repo de GitHub (elegir la cuenta de GitHub donde subiste el repo en el paso 1).
4. Vercel detectará Vite y usará `vercel.json` (build: `npm run build`, salida: `dist`). No hace falta cambiar nada.
5. **Deploy**. La URL quedará tipo `nombre-proyecto.vercel.app`.

### 3. Variables de entorno (opcional)

Esta app no usa API keys. Si más adelante añades algo que use `GEMINI_API_KEY` u otra variable, configúralas en **Vercel → Project → Settings → Environment Variables** (no las subas al repo).

---

## Resumen

- **No desconfigura** tus otros proyectos: La Consulta Adaptogénica y Des-adaptogénica siguen en sus repos y en la cuenta de Vercel que ya uses.
- Este proyecto es **otra ruta**: repo en otra cuenta de GitHub → proyecto nuevo en otra cuenta de Vercel.
- El código está listo: `vercel.json` configurado; solo hace falta subir a GitHub e importar en Vercel.
