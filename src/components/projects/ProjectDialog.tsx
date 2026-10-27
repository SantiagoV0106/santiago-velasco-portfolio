/**
 * Ventana con el caso completo de un proyecto (usa <dialog> nativo: foco, Escape y fondo incluidos).
 * Datos: src/data/projects.ts · Tipos: src/types/project.ts
 */
import { useEffect, useRef } from 'react';
import type { Project } from '@/types/project';
import ProjectMock from './ProjectMock';
import { pick, t, type Lang } from '@/i18n/ui';

interface Props {
  project: Project | null;
  lang: Lang;
  onClose: () => void;
}

export default function ProjectDialog({ project, lang, onClose }: Props) {
  const ui = t(lang);
  const copy = ui.dialog;
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (project && !dialog.open) dialog.showModal();
    if (!project && dialog.open) dialog.close();
  }, [project]);

  return (
    <dialog
      ref={ref}
      className="case m-auto max-h-[calc(100%-48px)] w-[min(880px,calc(100%-32px))] overflow-auto rounded-[18px] border-0 bg-paper p-0 text-ink"
      aria-labelledby="case-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {project && (
        <div className="grid gap-5 p-5 md:gap-6 md:p-6">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-xs text-[#535a64]">
              {pick(project.sector, lang)} · {ui.gallery.categories[project.category]}
              {project.year ? ` · ${project.year}` : ''}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label={copy.close}
              className="grid size-10 cursor-pointer place-items-center rounded-full border border-[#d2d6dc] bg-white text-xl leading-none text-ink"
            >
              ×
            </button>
          </div>

          <ProjectMock project={project} lang={lang} />

          <h3 id="case-title" className="m-0 text-[clamp(34px,5vw,56px)] leading-[0.95] font-extrabold tracking-tight">
            {project.name}
          </h3>

          <div className="grid gap-7 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <div>
              <p className="m-0 mb-3.5 max-w-[60ch]">{pick(project.summary, lang)}</p>
              <ul className="m-0 grid gap-1.5 pl-4.5">
                {pick(project.highlights, lang).map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
            <dl className="m-0 grid content-start gap-3.5">
              <div>
                <dt className="mb-1 font-mono text-[11.5px] tracking-widest text-[#535a64] uppercase">{copy.role}</dt>
                <dd className="m-0 font-semibold">{pick(project.role, lang)}</dd>
              </div>
              <div>
                <dt className="mb-1 font-mono text-[11.5px] tracking-widest text-[#535a64] uppercase">{copy.stack}</dt>
                <dd className="m-0 font-semibold">{project.stack.join(' · ')}</dd>
              </div>
              {project.links?.behance && (
                <div>
                  <dt className="mb-1 font-mono text-[11.5px] tracking-widest text-[#535a64] uppercase">Behance</dt>
                  <dd className="m-0 font-semibold">
                    <a href={project.links.behance} target="_blank" rel="noopener noreferrer">
                      {copy.behance}
                    </a>
                  </dd>
                </div>
              )}
              {project.links?.figma && (
                <div>
                  <dt className="mb-1 font-mono text-[11.5px] tracking-widest text-[#535a64] uppercase">Figma</dt>
                  <dd className="m-0 font-semibold">
                    <a href={project.links.figma} target="_blank" rel="noopener noreferrer">
                      {copy.figma}
                    </a>
                  </dd>
                </div>
              )}
              {project.links?.live && (
                <div>
                  <dt className="mb-1 font-mono text-[11.5px] tracking-widest text-[#535a64] uppercase">{copy.site}</dt>
                  <dd className="m-0 font-semibold">
                    <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                      {copy.live}
                    </a>
                  </dd>
                </div>
              )}
              {project.links?.repo && (
                <div>
                  <dt className="mb-1 font-mono text-[11.5px] tracking-widest text-[#535a64] uppercase">{copy.code}</dt>
                  <dd className="m-0 font-semibold">
                    <a href={project.links.repo} target="_blank" rel="noopener noreferrer">
                      {copy.repo}
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </div>

          {project.isExample && (
            <p className="m-0 border-t border-[#dde0e5] pt-3.5 font-mono text-xs text-[#535a64]">
              {copy.exampleNote}
            </p>
          )}
        </div>
      )}
    </dialog>
  );
}
