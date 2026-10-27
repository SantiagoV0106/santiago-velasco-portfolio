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
import { t, type Lang } from '@/i18n/ui';
import { clamp, hasFinePointer, pad2, prefersReducedMotion } from '@/lib/utils';
import ProjectCard from './ProjectCard';
import ProjectDialog from './ProjectDialog';

type Filter = 'all' | ProjectCategory;

const FILTERS: Filter[] = ['all', 'Sitio web', 'Plataforma', 'UI/UX'];

const PIN_MIN_WIDTH = 1024; // breakpoint lg

/** Espacio libre a la derecha del último proyecto al terminar el scroll horizontal */
const endSpace = () => Math.max(48, window.innerWidth * 0.08);

interface Props {
  projects: Project[];
  lang: Lang;
}

export default function Gallery({ projects, lang }: Props) {
  const copy = t(lang).gallery;
  const [filter, setFilter] = useState<Filter>('all');
  const [open, setOpen] = useState<Project | null>(null);
  const [pinned, setPinned] = useState(false);
  const [pinHeight, setPinHeight] = useState<number>();
  const [tilt, setTilt] = useState(false);

  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const travel = useRef(0);

  const list = useMemo(
    () => projects.filter((p) => filter === 'all' || p.category === filter),
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
    // Se mide hasta el borde del último proyecto (no scrollWidth) y se suma un respiro final
    const cards = track.querySelectorAll<HTMLElement>('.project-card');
    const last = cards[cards.length - 1];
    const end = last ? last.offsetLeft + last.offsetWidth : track.scrollWidth;
    travel.current = Math.max(0, end + endSpace() - window.innerWidth);
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
      data-label={t(lang).worlds.gallery}
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
              <p className="eyebrow">{copy.eyebrow}</p>
              <h2 id="galeria-titulo" className="h2 text-[clamp(56px,10vw,150px)]">
                {copy.title}
                <span className="ml-[0.2em] align-top font-mono text-[0.22em] font-medium tracking-normal">
                  {pad2(list.length)}
                </span>
              </h2>
            </div>
            <div className="flex flex-wrap gap-2" role="group" aria-label={copy.filtersLabel}>
              {FILTERS.map((f) => {
                const active = filter === f;
                return (
                  <button
                    key={f}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setFilter(f)}
                    className={`h-9.5 cursor-pointer rounded-full border-[1.5px] border-fg px-4 text-sm font-semibold transition-colors ${
                      active ? 'bg-fg text-world' : 'bg-transparent text-fg hover:bg-surface'
                    }`}
                  >
                    {f === 'all' ? copy.all : copy.filters[f]}
                  </button>
                );
              })}
            </div>
          </div>

          <div
            ref={trackRef}
            className="gallery-track relative flex gap-5 will-change-transform md:gap-7"
            style={{ paddingLeft: 'var(--gutter-l)' }}
          >
            {list.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} tilt={tilt} lang={lang} onOpen={setOpen} />
            ))}
            {/* Respiro final: en móvil deja espacio tras la última tarjeta al deslizar */}
            <span aria-hidden="true" className="w-[max(var(--gutter-r),8vw)] flex-none" />
          </div>

          <p className="container-x m-0 font-mono text-xs text-muted">
            {copy.note}
            {!pinned ? copy.swipe : ''}
          </p>
        </div>
      </div>

      <ProjectDialog project={open} lang={lang} onClose={() => setOpen(null)} />
    </section>
  );
}
