/**
 * Sección "Sobre mí" (HTML estático). La terminal llega como `children`
 * desde index.astro para que sea la única parte que carga JavaScript.
 */
import type { ReactNode } from 'react';

const TICKER = ['React', 'Next.js', 'Astro', 'TypeScript', 'Tailwind CSS', 'Figma', 'Accesibilidad', 'Rendimiento'];

const FACTS = [
  { label: 'Experiencia', value: 'Más de 3 años' },
  { label: 'Stack', value: 'React · Next.js · Astro' },
  { label: 'Diseño', value: 'Figma, UI y UX' },
  { label: 'Clientes', value: 'Agencias y empresas de diversos sectores' },
];

export default function About({ children }: { children?: ReactNode }) {
  return (
    <section id="sobre" data-world="code" data-label="Terminal" aria-labelledby="sobre-titulo" className="pt-10 pb-28 md:pb-36">
      <div className="mb-20 overflow-hidden border-y border-line py-[18px] md:mb-28" aria-hidden="true">
        <div className="flex w-max gap-[42px] will-change-transform" data-ticker>
          {[...TICKER, ...TICKER].map((word, i) => (
            <span
              key={i}
              className="ticker-item inline-flex items-center gap-[42px] text-[clamp(28px,4vw,54px)] leading-none font-extrabold tracking-tight whitespace-nowrap"
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      <div className="container-x grid items-start gap-12 lg:grid-cols-2 lg:gap-[clamp(32px,6vw,90px)]">
        <div className="reveal">
          <p className="eyebrow">Sobre mí</p>
          <h2 id="sobre-titulo" className="h2">
            Hola, soy Santiago.
          </h2>
          <p className="mt-6 mb-0 max-w-[52ch] text-[clamp(17px,1.5vw,20px)]">
            Soy programador frontend y diseñador UI/UX. Me enfoco en crear productos valiosos: interfaces que se entienden a
            la primera y que cargan rápido.
          </p>
          <p className="mt-5 mb-0 max-w-[52ch] text-[clamp(17px,1.5vw,20px)] text-muted">
            Llevo más de 3 años convirtiendo diseños de Figma en productos web rápidos, accesibles y escalables. Desarrollo
            con React, Next.js y Astro, con código limpio y mantenible, y he entregado sitios y plataformas para agencias y
            clientes de diversos sectores.
          </p>
          <dl className="mt-9 mb-0 grid border-t border-line" data-layer="Lista / Datos">
            {FACTS.map((f) => (
              <div key={f.label} className="grid gap-1 border-b border-line py-3.5 sm:grid-cols-[140px_minmax(0,1fr)] sm:gap-4">
                <dt className="pt-0.5 font-mono text-[12.5px] text-muted">{f.label}</dt>
                <dd className="m-0 font-semibold">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="reveal">{children}</div>
      </div>
    </section>
  );
}
