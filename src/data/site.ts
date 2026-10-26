/**
 * Datos generales del sitio. Cambia aquí tu correo, redes y CV.
 */
export const site = {
  name: 'Santiago Velasco',
  role: 'Programador frontend y diseñador UI/UX',
  description:
    'Portafolio de Santiago Velasco, programador frontend y diseñador UI/UX. Convierto diseños de Figma en productos web rápidos, accesibles y escalables con React, Next.js y Astro.',
  email: 'velascosantiago3@gmail.com',
  github: 'https://github.com/SantiagoV0106',
  /** Coloca el archivo en /public/santiagovelascoresume.pdf */
  resume: '/santiagovelascoresume.pdf',
  /** Agrega tu URL cuando la tengas; si queda vacía no se muestra */
  linkedin: '',
} as const;

/** Comando de la pantalla inicial, por gestor de paquetes */
export const bootCommands = {
  npm: 'npm create portfolio@latest',
  pnpm: 'pnpm create portfolio@latest',
  yarn: 'yarn create portfolio',
  bun: 'bun create portfolio@latest',
} as const;

export type PackageManager = keyof typeof bootCommands;

/** Clave en sessionStorage: el comando solo se escribe una vez por sesión */
export const BOOT_STORAGE_KEY = 'sv:portfolio-created';
