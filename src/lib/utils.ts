import type { CSSProperties } from 'react';

/** Permite pasar variables CSS (--algo) en `style` con tipado. */
export const cssVars = (vars: Record<`--${string}`, string | number>): CSSProperties => vars as CSSProperties;

export const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

export const pad2 = (n: number) => String(n).padStart(2, '0');

/** Lectura/escritura segura (en modo privado o con almacenamiento bloqueado puede lanzar error). */
export const safeSession = {
  get(key: string): string | null {
    try {
      return window.sessionStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string) {
    try {
      window.sessionStorage.setItem(key, value);
    } catch {
      /* sin almacenamiento: el usuario verá la pantalla de nuevo al recargar */
    }
  },
};

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const hasFinePointer = () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;

/** Copia texto al portapapeles; devuelve false si el navegador lo bloquea. */
export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
