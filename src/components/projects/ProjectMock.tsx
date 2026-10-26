/**
 * Vista previa de un proyecto.
 * - Si el proyecto tiene `cover` (imagen o video) se muestra ese medio.
 * - Si no, se genera un mock con CSS a partir de `mock.layout` y `mock.palette`.
 *
 * Tipos: src/types/project.ts · Estilos de los mocks: src/styles/global.css (sección GALERÍA)
 */
import type { Project } from '@/types/project';
import { cssVars } from '@/lib/utils';

interface Props {
  project: Project;
  /** En la tarjeta los videos se reproducen en silencio y en bucle */
  autoPlay?: boolean;
}

function GeneratedMock({ project }: { project: Project }) {
  const { layout, palette, bars = [40, 60, 50, 80, 70, 90] } = project.mock;

  return (
    <div className="mock" style={cssVars({ '--m-bg': palette.bg, '--m-acc': palette.accent, '--m-ink': palette.ink })}>
      <div className="mock-bar">
        <i />
        <i />
        <i />
      </div>
      {layout === 'landing' && (
        <div className="mk mk-landing">
          <b className="t1" />
          <b className="t1b" />
          <b className="t2" />
          <b className="cta" />
          <span className="blob" />
          <div className="cols">
            <i />
            <i />
            <i />
          </div>
        </div>
      )}
      {layout === 'dashboard' && (
        <div className="mk mk-dashboard">
          <div className="side">
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="main">
            <div className="kpis">
              <i />
              <i />
              <i />
            </div>
            <div className="chart">
              {bars.map((h, i) => (
                <i key={i} style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>
      )}
      {layout === 'mobile' && (
        <div className="mk mk-mobile">
          <div className="phone">
            <b />
            <i className="acc" />
            <i />
            <i />
            <i />
          </div>
          <div className="phone">
            <b />
            <i />
            <i />
            <i className="acc" />
          </div>
        </div>
      )}
      {layout === 'shop' && (
        <div className="mk mk-shop">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i}>
              <i />
              <b />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProjectMock({ project, autoPlay = true }: Props) {
  const badge = project.isExample ? (
    <span className="absolute top-3 right-3 z-2 rounded bg-white/85 px-1.5 py-1 font-mono text-[10.5px] leading-none font-semibold tracking-wider text-ink uppercase">
      Ejemplo
    </span>
  ) : null;

  const { cover } = project;

  if (cover?.type === 'image') {
    return (
      <div className="relative aspect-4/3 max-w-full overflow-hidden rounded-xl">
        {badge}
        <img src={cover.src} alt={cover.alt} loading="lazy" decoding="async" className="size-full object-cover" />
      </div>
    );
  }

  if (cover?.type === 'video') {
    return (
      <div className="relative aspect-4/3 max-w-full overflow-hidden rounded-xl">
        {badge}
        <video
          src={cover.src}
          poster={cover.poster}
          aria-label={cover.alt}
          muted
          loop
          playsInline
          autoPlay={autoPlay}
          preload="metadata"
          className="size-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className="relative">
      {badge}
      <GeneratedMock project={project} />
    </div>
  );
}
