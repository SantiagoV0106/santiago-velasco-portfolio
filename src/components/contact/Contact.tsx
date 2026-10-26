/**
 * Sección de contacto (HTML estático). El bloque del correo con botón de copiar
 * llega como `children` desde index.astro (isla de React).
 * Datos de contacto: src/data/site.ts
 */
import type { ReactNode } from 'react';
import { site } from '@/data/site';

interface LinkItem {
  label: string;
  href: string;
  external: boolean;
}

export default function Contact({ children }: { children?: ReactNode }) {
  const links: LinkItem[] = [
    { label: 'GitHub', href: site.github, external: true },
    ...(site.linkedin ? [{ label: 'LinkedIn', href: site.linkedin, external: true }] : []),
    { label: 'Hoja de vida (CV)', href: site.resume, external: true },
    { label: 'Correo', href: `mailto:${site.email}`, external: false },
  ];

  return (
    <section id="contacto" data-world="blue" data-label="Contacto" aria-labelledby="contacto-titulo" className="pt-28 pb-10 md:pt-36">
      <div className="container-x">
        <p className="eyebrow">Contacto</p>
        <h2
          id="contacto-titulo"
          className="m-0 max-w-[12ch] text-[clamp(46px,9.4vw,150px)] leading-[0.9] font-extrabold tracking-[-0.05em] text-balance"
          data-stretch
          data-layer="Texto / Título contacto"
        >
          ¿Construimos algo valioso?
        </h2>

        {children}

        <ul
          className={`m-0 mt-12 grid list-none border-t-[1.5px] border-fg p-0 sm:grid-cols-2 md:mt-14 ${
            links.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
          }`}
        >
          {links.map((link, i) => {
            // Líneas divisorias según la columna: 2 columnas en sm/md, todas en una fila en lg
            const divider = [
              i % 2 === 1 ? 'sm:border-l-[1.5px] sm:pl-4' : 'sm:border-l-0 sm:pl-1',
              i > 0 ? 'lg:border-l-[1.5px] lg:pl-4' : '',
            ].join(' ');
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className={`group flex items-center justify-between border-b-[1.5px] border-fg px-1 py-5 text-lg font-semibold no-underline ${divider}`}
                >
                  {link.label}
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                    ↗
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <footer className="container-x mt-24 flex flex-wrap justify-between gap-3 pb-20 font-mono text-[12.5px] text-muted md:mt-32">
        <span>© {new Date().getFullYear()} Santiago Velasco</span>
        <span>Diseñado en Figma, construido con Astro y React</span>
        <a href="#inicio">Volver arriba ↑</a>
      </footer>
    </section>
  );
}
