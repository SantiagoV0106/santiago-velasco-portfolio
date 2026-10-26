/**
 * Barra superior (sin logo). Las herramientas de la derecha (botón Inspeccionar)
 * llegan como `children` desde index.astro.
 * La regla "Y: px" se actualiza desde src/scripts/scene.ts.
 */
import type { ReactNode } from 'react';

const LINKS = [
  { href: '#proceso', label: 'Proceso' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#sobre', label: 'Sobre mí' },
  { href: '#contacto', label: 'Contacto' },
];

export default function Nav({ children }: { children?: ReactNode }) {
  return (
    <>
      <div
        className="fixed top-[env(safe-area-inset-top,0px)] left-0 z-[55] h-0.5 w-full origin-left scale-x-0 bg-sel"
        data-progress
        aria-hidden="true"
      />
      <nav
        aria-label="Principal"
        className="fixed inset-x-0 top-[env(safe-area-inset-top,0px)] z-50 border-b border-line bg-[color-mix(in_srgb,var(--world-bg)_78%,transparent)] py-3.5 backdrop-blur-md transition-colors duration-700"
      >
        <div className="container-x flex items-center justify-between gap-5">
          <ul className="m-0 flex list-none gap-4 p-0 sm:gap-6 md:gap-7">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="relative text-sm font-medium no-underline after:absolute after:inset-x-0 after:-bottom-1 after:h-[1.5px] after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100 sm:text-[15px]"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="hidden items-center gap-3.5 md:flex">
            <span className="min-w-[96px] text-right font-mono text-xs text-muted tabular-nums" data-ruler aria-hidden="true">
              Y: 0 px
            </span>
            {children}
          </div>
        </div>
      </nav>
    </>
  );
}
