/**
 * Datos generales del sitio. Cambia aquí tu correo, redes y CV.
 * Los textos (título, descripción, etc.) están en src/i18n/ui.ts.
 */
export const site = {
  name: "Santiago Velasco",
  email: "velascosantiago3@gmail.com",
  github: "https://github.com/SantiagoV0106",
  /** Coloca el archivo en /public/santiagovelascoresume.pdf */
  resume: "/santiagovelascoresume.pdf",
  /** Agrega tu URL cuando la tengas; si queda vacía no se muestra */
  linkedin: "https://www.linkedin.com/in/santiago-velasco-carrillo/",

  behance: "https://www.behance.net/santiagovelasco",
} as const;

/** Comando que se escribe solo en la pantalla inicial */
export const BOOT_COMMAND = "npm create portfolio@latest";

/** Clave en sessionStorage: la intro se muestra una vez por sesión */
export const BOOT_STORAGE_KEY = "sv:portfolio-created";
