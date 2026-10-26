# Portafolio · Santiago Velasco

Portafolio personal construido con **Astro + React + TypeScript + Tailwind CSS v4**.
Tipografías: **Geist** (texto) y **Fira Code** (código), servidas desde Google Fonts.

## Requisitos

- Node.js 18.20+ (recomendado 20 o 22)
- npm (o pnpm / yarn / bun)

## Empezar

```bash
npm install
npm run dev        # http://localhost:4321
```

| Comando           | Qué hace                                   |
| ----------------- | ------------------------------------------ |
| `npm run dev`     | Servidor de desarrollo                     |
| `npm run build`   | Genera el sitio estático en `dist/`        |
| `npm run preview` | Sirve `dist/` localmente para revisarlo    |
| `npm run check`   | Revisa tipos de `.astro` y `.tsx`          |

## Subir a GitHub

```bash
git init
git add .
git commit -m "Portafolio inicial"
git branch -M main
git remote add origin https://github.com/SantiagoV0106/portafolio.git
git push -u origin main
```

(Crea antes el repositorio vacío `portafolio` en GitHub, o cambia el nombre en la URL.)

## Desplegar en Vercel

1. Entra a [vercel.com/new](https://vercel.com/new) e importa el repositorio.
2. Vercel detecta **Astro** automáticamente:
   - Build command: `npm run build`
   - Output directory: `dist`
3. Pulsa **Deploy**. Cada `git push` a `main` vuelve a desplegar.

No hace falta adaptador ni `vercel.json`: el sitio es 100 % estático.

## Estructura

```
public/
  favicon.svg
  santiagovelascoresume.pdf      ← agrega aquí tu CV (el enlace ya apunta a este archivo)
  projects/                      ← (opcional) imágenes y videos de los proyectos
src/
  pages/index.astro              ← composición de la página e islas de React
  layouts/Layout.astro           ← <head>, fuentes y script anti-parpadeo de la pantalla inicial
  styles/global.css              ← tema de Tailwind, colores de cada "mundo" y animaciones
  scripts/scene.ts               ← scroll: mundos, sección de proceso, ticker, cursor "Tú"
  data/
    site.ts                      ← correo, GitHub, CV, comando inicial
    projects.ts                  ← proyectos de la galería
  types/project.ts               ← tipos de los proyectos
  lib/utils.ts                   ← utilidades (sessionStorage seguro, portapapeles…)
  components/
    boot/Boot.tsx                ← pantalla "npm create portfolio@latest"
    layout/Nav.tsx · Inspector.tsx · WorldPill.tsx
    hero/Hero.tsx
    process/Process.tsx          ← "De Figma a producción" (HTML estático)
    projects/Gallery.tsx · ProjectCard.tsx · ProjectMock.tsx · ProjectDialog.tsx
    about/About.tsx · Terminal.tsx
    contact/Contact.tsx · CopyEmail.tsx
```

## Cómo funciona

### Pantalla inicial (comando)

- El visitante escribe `npm create portfolio@latest` (o el comando de pnpm, yarn o bun) y presiona Enter.
- **Tab** autocompleta. Tocar el comando sugerido lo escribe solo (útil en móvil). El botón copia el comando.
- Al terminar se guarda `sv:portfolio-created` en **sessionStorage**: al recargar se entra directo.
  En una pestaña o sesión nueva vuelve a aparecer.
- "o entra directamente." salta la animación (y también la guarda en la sesión).
- Para volver a verla: DevTools → Application → Session Storage → borrar la clave, o abrir otra pestaña.

### Islas de React (lo único que carga JavaScript)

| Componente  | Directiva        | Motivo                                         |
| ----------- | ---------------- | ---------------------------------------------- |
| Boot        | `client:load`    | Es lo primero que se ve                        |
| Hero        | `client:load`    | Interacción encima del pliegue                 |
| Gallery     | `client:idle`    | Debe medir el carril antes de llegar a él      |
| Inspector   | `client:idle`    | Botón de la barra                              |
| Terminal    | `client:visible` | Solo cuando entra en pantalla                  |
| CopyEmail   | `client:visible` | Solo cuando entra en pantalla                  |

Proceso, Sobre mí y Contacto se envían como HTML estático; su comportamiento de scroll vive en `scripts/scene.ts`.

### Proyectos

Edita `src/data/projects.ts`. Cada proyecto puede usar una **imagen o un video real** con `cover`;
si no lo tiene, se genera un mock con CSS. Los tipos están en `src/types/project.ts`.

### Breakpoints (Tailwind por defecto)

`sm` 640 · `md` 768 · `lg` 1024 · `xl` 1280 · `2xl` 1536.
En `lg+` la galería se fija y avanza en horizontal; por debajo es un carrusel deslizable.

### Accesibilidad

- Respeta `prefers-reduced-motion` (sin animaciones largas, galería sin fijar).
- Foco visible, `<dialog>` nativo para los casos, textos alternativos y etiquetas en los controles.
