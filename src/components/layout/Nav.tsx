/**
 * Barra superior (sin logo). Las herramientas de la derecha (botón Inspeccionar)
 * llegan como `children` desde la página.
 * - La regla "Y: px" se actualiza desde src/scripts/scene.ts.
 * - El switch de idioma es un enlace a la otra versión (/ ↔ /en/); scene.ts anima
 *   el cambio y conserva la sección en la que estaba el visitante.
 */
import type { ReactNode } from 'react';
import { languages, routes, t, type Lang } from '@/i18n/ui';

function LangSwitch({ lang }: { lang: Lang }) {
  const other: Lang = lang === 'es' ? 'en' : 'es';
  const order = Object.keys(languages) as Lang[];

  return (
    <a
      href={routes[other]}
      hrefLang={other}
      aria-label={t(lang).nav.langSwitch}
      data-lang-switch
      className="relative inline-flex h-8 flex-none items-center rounded-full border border-line bg-surface p-0.5 font-mono text-[11.5px] leading-none font-medium no-underline"
    >
      <span
        aria-hidden="true"
        data-lang-knob
        className={`absolute top-0.5 bottom-0.5 left-0.5 w-9 rounded-full bg-fg transition-transform duration-300 ease-soft ${
          lang === 'en' ? 'translate-x-full' : ''
        }`}
      />
      {order.map((l) => (
        <span
          key={l}
          aria-hidden="true"
          data-lang-option={l}
          className={`relative w-9 text-center transition-colors duration-300 ${l === lang ? 'text-world' : 'text-muted'}`}
        >
          {l.toUpperCase()}
        </span>
      ))}
    </a>
  );
}

export default function Nav({ lang, children }: { lang: Lang; children?: ReactNode }) {
  const copy = t(lang).nav;

  return (
    <>
      <div
        className="fixed top-[env(safe-area-inset-top,0px)] left-0 z-[55] h-0.5 w-full origin-left scale-x-0 bg-sel"
        data-progress
        aria-hidden="true"
      />
      <nav
        aria-label={copy.label}
        className="fixed inset-x-0 top-[env(safe-area-inset-top,0px)] z-50 border-b border-line bg-[color-mix(in_srgb,var(--world-bg)_78%,transparent)] py-3.5 backdrop-blur-md transition-colors duration-700"
      >
        <div className="container-x flex items-center justify-between gap-4">
          <ul className="m-0 flex min-w-0 list-none gap-3.5 p-0 sm:gap-6 md:gap-7">
            {copy.links.map((l, i) => (
              <li key={l.href} className={i === 0 ? 'hidden sm:block' : ''}>
                <a
                  href={l.href}
                  className="relative text-sm font-medium whitespace-nowrap no-underline after:absolute after:inset-x-0 after:-bottom-1 after:h-[1.5px] after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100 sm:text-[15px]"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3.5">
            <span
              className="hidden min-w-[96px] text-right font-mono text-xs text-muted tabular-nums md:inline"
              data-ruler
              aria-hidden="true"
            >
              Y: 0 px
            </span>
            <div className="hidden md:block">{children}</div>
            <LangSwitch lang={lang} />
          </div>
        </div>
      </nav>
    </>
  );
}
