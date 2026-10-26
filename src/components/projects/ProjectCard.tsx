/**
 * Tarjeta de proyecto en la galería.
 * Datos: src/data/projects.ts · Tipos: src/types/project.ts
 */
import { useRef, type PointerEvent } from 'react';
import type { Project } from '@/types/project';
import { pad2 } from '@/lib/utils';
import ProjectMock from './ProjectMock';

interface Props {
  project: Project;
  index: number;
  tilt: boolean;
  onOpen: (project: Project) => void;
}

export default function ProjectCard({ project, index, tilt, onOpen }: Props) {
  const tiltRef = useRef<HTMLDivElement>(null);

  const onMove = (e: PointerEvent<HTMLButtonElement>) => {
    if (!tilt || !tiltRef.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    tiltRef.current.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 8}deg)`;
  };

  const onLeave = () => {
    if (tiltRef.current) tiltRef.current.style.transform = '';
  };

  return (
    <button
      type="button"
      className="project-card flex w-[min(82vw,420px)] flex-none cursor-pointer flex-col gap-3.5 border-0 bg-transparent p-0 text-left text-inherit perspective-[900px] lg:w-[clamp(320px,31vw,470px)]"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onClick={() => onOpen(project)}
      data-layer={`Card / ${project.name}`}
      aria-label={`Ver detalle: ${project.name}, ${project.sector}`}
    >
      <div ref={tiltRef} className="card-tilt w-full rounded-xl shadow-[0_18px_40px_rgba(18,20,24,0.18)]">
        <ProjectMock project={project} />
      </div>
      <div className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-3 gap-y-1">
        <h3 className="m-0 text-[26px] leading-tight font-extrabold tracking-tight">{project.name}</h3>
        <span className="font-mono text-xs text-muted">{pad2(index + 1)}</span>
        <span className="text-[14.5px] text-muted">
          {project.sector} · {project.category}
        </span>
        <span className="col-span-full mt-1.5 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span key={s} className="chip-tag">
              {s}
            </span>
          ))}
        </span>
      </div>
    </button>
  );
}
