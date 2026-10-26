/**
 * Modo inspección: al activarlo, pasar el cursor sobre cualquier elemento con
 * `data-layer="Nombre"` muestra su marco, nombre de capa y medidas (como en Figma).
 */
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
}

export default function Inspector() {
  const [active, setActive] = useState(false);
  const [box, setBox] = useState<Box | null>(null);
  const current = useRef<HTMLElement | null>(null);

  useEffect(() => {
    document.body.classList.toggle('is-inspecting', active);
    if (!active) {
      setBox(null);
      current.current = null;
      return;
    }
    const measure = () => {
      const el = current.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setBox({ x: r.left, y: r.top, w: r.width, h: r.height, label: el.dataset.layer ?? '' });
    };
    const onMove = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-layer]') ?? null;
      current.current = el;
      if (el) measure();
      else setBox(null);
    };
    const onScroll = () => measure();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setActive(false);
    document.addEventListener('pointermove', onMove);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKey);
    };
  }, [active]);

  return (
    <>
      <button
        type="button"
        aria-pressed={active}
        onClick={() => setActive((a) => !a)}
        title="Muestra capas y medidas al pasar el cursor"
        className={`inline-flex h-[34px] cursor-pointer items-center gap-2 rounded-lg border px-3 font-mono text-[12.5px] leading-none ${
          active ? 'border-sel bg-sel text-white' : 'border-line bg-surface text-fg'
        }`}
      >
        <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <rect x="2" y="2" width="12" height="12" />
          <path d="M0 5h2M0 11h2M14 5h2M14 11h2M5 0v2M11 0v2M5 14v2M11 14v2" />
        </svg>
        Inspeccionar
      </button>

      {box &&
        // Portal al <body>: el blur de la barra crearía un contexto que desplaza el overlay
        createPortal(
        <div
          className="pointer-events-none fixed z-[65] outline-[1.5px] outline-sel transition-all duration-100 ease-out outline-solid"
          style={{ left: box.x, top: box.y, width: box.w, height: box.h }}
          aria-hidden="true"
        >
          <span className="absolute bottom-full -left-[1.5px] bg-sel px-1.5 py-1 font-mono text-[11.5px] leading-none whitespace-nowrap text-white">
            {box.label}
          </span>
          <span className="absolute top-[calc(100%+6px)] left-1/2 -translate-x-1/2 rounded-[3px] bg-sel px-1.5 py-1 font-mono text-[11.5px] leading-none whitespace-nowrap text-white tabular-nums">
            {Math.round(box.w)} × {Math.round(box.h)}
          </span>
        </div>,
        document.body,
        )}
    </>
  );
}
