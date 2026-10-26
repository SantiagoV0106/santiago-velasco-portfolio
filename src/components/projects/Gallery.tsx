/**
 * ─────────────────────────────────────────────────────────────
 *  GALERÍA DE PROYECTOS
 * ─────────────────────────────────────────────────────────────
 *  Datos ........... src/data/projects.ts
 *  Tipos ........... src/types/project.ts
 *  Tarjeta ......... src/components/projects/ProjectCard.tsx
 *  Vista previa .... src/components/projects/ProjectMock.tsx
 *  Detalle ......... src/components/projects/ProjectDialog.tsx
 *
 *  Escritorio (lg+): la sección se fija y las tarjetas avanzan en horizontal con el scroll.
 *  Móvil/tablet o movimiento reducido: carrusel con scroll-snap que se desliza con el dedo.
 * ─────────────────────────────────────────────────────────────
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Project, ProjectCategory } from '@/types/project';
import { clamp, hasFinePointer, pad2, prefersReducedMotion } from '@/lib/utils';
import ProjectCard from './ProjectCard';
import ProjectDialog from './ProjectDialog';

type Filter = 'Todos' | ProjectCategory;

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'Todos', label: 'Todos' },
  { value: 'Sitio web', label: 'Sitios web' },
  { value: 'Plataforma', label: 'Plataformas' },
  { value: 'UI/UX', label: 'UI/UX' },
];

const PIN_MIN_WIDTH = 1024; // breakpoint lg

interface Props {
  projects: Project[];
}

export default function Gallery({ projects }: Props) {
  const [filter, setFilter] = useState<Filter>('Todos');
  const [open, setOpen] = useState<Project | null>(null);
  const [pinned, setPinned] = useState(false);
  const [pinHeight, setPinHeight] = useState<number>();
  const [tilt, setTilt] = useState(false);

  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const travel = useRef(0);

  const list = useMemo(
    () => projects.filter((p) => filter === 'Todos' || p.category === filter),
    [projects, filter],
  );

  /* Calcula si se fija la sección y cuánto debe recorrer el carril */
  const layout = useCallback(() => {
    const shouldPin = window.innerWidth >= PIN_MIN_WIDTH && !prefersReducedMotion();
    setPinned(shouldPin);
    const track = trackRef.current;
    if (!shouldPin || !track) {
      setPinHeight(undefined);
      if (track) track.style.transform = '';
      return;
    }
    travel.current = Math.max(0, track.scrollWidth - window.innerWidth);
    setPinHeight(window.innerHeight + travel.current);
  }, []);

  useEffect(() => {
    setTilt(hasFinePointer() && !prefersReducedMotion());
    layout();
    window.addEventListener('resize', layout);
    document.fonts?.ready.then(layout);
    return () => window.removeEventListener('resize', layout);
  }, [layout]);

  // Recalcula al filtrar
  useEffect(() => {
    layout();
  }, [list, pinned, layout]);

  /* Scroll → desplazamiento horizontal */
  useEffect(() => {
    if (!pinned) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const pin = pinRef.current;
      const track = trackRef.current;
      if (!pin || !track) return;
      const r = pin.getBoundingClientRect();
      const p = clamp(-r.top / Math.max(1, r.height - window.innerHeight), 0, 1);
      track.style.transform = `translate3d(${-p * travel.current}px, 0, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [pinned, pinHeight]);

  return (
    <section
      id="proyectos"
      data-world="sun"
      data-label="Galería"
      aria-labelledby="galeria-titulo"
      className={`gallery relative ${pinned ? '' : 'is-free'}`}
    >
      <div ref={pinRef} style={{ height: pinned ? pinHeight : undefined }}>
        <div
          className={
            pinned
              ? 'sticky top-0 flex h-svh flex-col justify-center gap-8 overflow-hidden pt-16'
              : 'flex flex-col gap-8 pt-28 pb-16'
          }
        >
          <div className="container-x flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Proyectos seleccionados</p>
              <h2 id="galeria-titulo" className="h2 text-[clamp(56px,10vw,150px)]">
                Galería
                <span className="ml-[0.2em] align-top font-mono text-[0.22em] font-medium tracking-normal">
                  {pad2(list.length)}
                </span>
              </h2>
            </div>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar proyectos">
              {FILTERS.map((f) => {
                const active = filter === f.value;
                return (
                  <button
                    key={f.value}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setFilter(f.value)}
                    className={`h-[38px] cursor-pointer rounded-full border-[1.5px] border-fg px-4 text-sm font-semibold transition-colors ${
                      active ? 'bg-fg text-world' : 'bg-transparent text-fg hover:bg-surface'
                    }`}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div
            ref={trackRef}
            className="gallery-track flex gap-5 will-change-transform md:gap-7"
            style={{ paddingLeft: 'var(--gutter-l)', paddingRight: 'var(--gutter-r)' }}
          >
            {list.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} tilt={tilt} onOpen={setOpen} />
            ))}
          </div>

          <p className="container-x m-0 font-mono text-xs text-muted">
            Proyectos de ejemplo · Abre una tarjeta para ver el caso
            {!pinned ? ' · Desliza para ver más' : ''}
          </p>
        </div>
      </div>

      <ProjectDialog project={open} onClose={() => setOpen(null)} />
    </section>
  );
}
