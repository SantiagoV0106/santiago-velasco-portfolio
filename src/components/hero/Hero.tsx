/**
 * Hero: el nombre dentro de un marco de selección de Figma.
 * - El peso de cada letra (Geist 100–900) responde a la distancia del cursor.
 * - Arrastrar sobre el lienzo dibuja una selección y "selecciona capas" (letras).
 * - Un cursor "Santiago" se mueve como en una sesión multijugador de Figma.
 */
import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { cssVars, hasFinePointer, prefersReducedMotion } from '@/lib/utils';
import { t, type Lang } from '@/i18n/ui';

const LINES = ['Santiago', 'Velasco'] as const;
const WEIGHT = { base: 800, near: 900, far: 380, radius: 300 };

interface Box {
  l: number;
  t: number;
  w: number;
  h: number;
}

export default function Hero({ lang }: { lang: Lang }) {
  const ui = t(lang);
  const copy = ui.hero;
  const PEER_MESSAGES = copy.peer;
  const heroRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);
  const peerRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<{ x: number; y: number } | null>(null);
  const clearTimer = useRef<number>(0);

  const [frameSize, setFrameSize] = useState('— × —');
  const [viewport, setViewport] = useState('— × —');
  const [picked, setPicked] = useState<Set<number>>(() => new Set());
  const [marquee, setMarquee] = useState<Box | null>(null);
  const [peerMsg, setPeerMsg] = useState(0);
  const [interactive, setInteractive] = useState(false);

  /* Medidas en vivo */
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const ro = new ResizeObserver(() => {
      const r = frame.getBoundingClientRect();
      setFrameSize(`${Math.round(r.width)} × ${Math.round(r.height)}`);
    });
    ro.observe(frame);
    const onResize = () => setViewport(`${window.innerWidth} × ${window.innerHeight}`);
    onResize();
    window.addEventListener('resize', onResize);
    setInteractive(hasFinePointer() && !prefersReducedMotion());
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  /* Cursor multijugador + retícula con paralaje */
  useEffect(() => {
    if (!interactive) return;
    const hero = heroRef.current;
    const peer = peerRef.current;
    if (!hero || !peer) return;
    const pos = { x: hero.clientWidth * 0.62, y: hero.clientHeight * 0.55 };
    const target = { ...pos };
    const mouse = { x: 0.5, y: 0.5 };
    const pick = () => {
      target.x = hero.clientWidth * (0.45 + Math.random() * 0.45);
      target.y = hero.clientHeight * (0.25 + Math.random() * 0.55);
    };
    const onMove = (e: globalThis.PointerEvent) => {
      mouse.x = e.clientX / window.innerWidth;
      mouse.y = e.clientY / window.innerHeight;
    };
    let raf = 0;
    const loop = () => {
      pos.x += (target.x - pos.x) * 0.025;
      pos.y += (target.y - pos.y) * 0.025;
      peer.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      hero.style.setProperty('--gx', `${(mouse.x - 0.5) * -14}px`);
      hero.style.setProperty('--gy', `${(mouse.y - 0.5) * -14 - window.scrollY * 0.15}px`);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const moveTimer = window.setInterval(pick, 2600);
    const msgTimer = window.setInterval(() => setPeerMsg((m) => (m + 1) % PEER_MESSAGES.length), 5200);
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(moveTimer);
      window.clearInterval(msgTimer);
      window.removeEventListener('pointermove', onMove);
    };
  }, [interactive]);

  /* Peso variable según la distancia al cursor */
  const updateWeights = (x: number, y: number) => {
    if (window.innerWidth < 1024) return;
    for (const ch of charsRef.current) {
      const r = ch.getBoundingClientRect();
      const d = Math.hypot(x - (r.left + r.width / 2), (y - (r.top + r.height / 2)) * 0.6);
      const k = Math.max(0, 1 - d / WEIGHT.radius);
      ch.style.setProperty('--w', String(Math.round(WEIGHT.far + (WEIGHT.near - WEIGHT.far) * k * k)));
    }
  };
  const resetWeights = () => charsRef.current.forEach((ch) => ch.style.removeProperty('--w'));

  /* Selección por arrastre */
  const onPointerDown = (e: PointerEvent<HTMLElement>) => {
    if (!interactive || e.button !== 0 || (e.target as HTMLElement).closest('a, button')) return;
    const r = e.currentTarget.getBoundingClientRect();
    dragStart.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    e.currentTarget.setPointerCapture(e.pointerId);
    window.clearTimeout(clearTimer.current);
    resetWeights();
    e.preventDefault();
  };

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (!interactive) return;
    const start = dragStart.current;
    if (!start) {
      updateWeights(e.clientX, e.clientY);
      return;
    }
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const box = { l: Math.min(x, start.x), t: Math.min(y, start.y), w: Math.abs(x - start.x), h: Math.abs(y - start.y) };
    setMarquee(box.w > 3 || box.h > 3 ? box : null);
    const abs = { l: box.l + r.left, t: box.t + r.top, r: box.l + box.w + r.left, b: box.t + box.h + r.top };
    const next = new Set<number>();
    charsRef.current.forEach((ch, i) => {
      const c = ch.getBoundingClientRect();
      if (c.left < abs.r && c.right > abs.l && c.top < abs.b && c.bottom > abs.t) next.add(i);
    });
    setPicked(next);
  };

  const endDrag = () => {
    if (!dragStart.current) return;
    dragStart.current = null;
    setMarquee(null);
    clearTimer.current = window.setTimeout(() => setPicked(new Set()), 1600);
  };

  const tag = picked.size
    ? `${picked.size} ${picked.size === 1 ? copy.pickedOne : copy.pickedMany}`
    : 'Santiago Velasco';

  let index = 0;

  return (
    <header
      ref={heroRef}
      id="inicio"
      data-world="canvas"
      data-label={ui.worlds.canvas}
      className="hero-canvas relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-24"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={() => !dragStart.current && resetWeights()}
    >
      <div className="container-x relative flex flex-col gap-10 md:gap-12">
        <div className="flex justify-between font-mono text-xs text-muted">
          <span>{copy.frame}</span>
          <span className="tabular-nums">{viewport}</span>
        </div>

        <div ref={frameRef} className="sel-frame relative mt-6 max-w-full self-start" data-layer={copy.layerName}>
          <span className="sel-tag">{tag}</span>
          <h1 className="hero-name rise m-0" aria-label="Santiago Velasco">
            {LINES.map((line) => (
              <span key={line} className="block overflow-hidden pb-[0.05em] whitespace-nowrap" aria-hidden="true">
                {[...line].map((char) => {
                  const i = index++;
                  return (
                    <span
                      key={i}
                      ref={(el) => {
                        if (el) charsRef.current[i] = el;
                      }}
                      className={`ch ${picked.has(i) ? 'is-picked' : ''}`}
                      style={cssVars({ '--i': i })}
                    >
                      {char}
                    </span>
                  );
                })}
              </span>
            ))}
          </h1>
          <i className="hd hd-tl" />
          <i className="hd hd-tr" />
          <i className="hd hd-bl" />
          <i className="hd hd-br" />
          <span className="sel-size">{frameSize}</span>
        </div>

        <div className="mt-4 grid gap-7 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <p className="m-0 max-w-[30ch] text-xl leading-snug text-balance md:text-2xl" data-layer={copy.layerIntro}>
            {copy.lede}
          </p>
          <div className="flex flex-wrap gap-3" data-layer={copy.layerActions}>
            <a className="btn btn-primary" href="#proyectos">
              {copy.ctaProjects} <span className="arr">→</span>
            </a>
            <a className="btn" href="#contacto">
              {copy.ctaContact}
            </a>
          </div>
        </div>
        <p className="m-0 hidden font-mono text-xs text-muted lg:block">
          {copy.hint}
        </p>
      </div>

      {marquee && (
        <div className="marquee" style={{ left: marquee.l, top: marquee.t, width: marquee.w, height: marquee.h }} />
      )}

      {interactive && (
        <div ref={peerRef} className="peer pointer-events-none absolute top-0 left-0 z-[4] hidden items-start lg:flex" aria-hidden="true">
          <svg viewBox="0 0 22 22" className="size-[22px] drop-shadow">
            <path
              d="M2 2 L2 18 L6.4 13.6 L9.6 20.6 L12.6 19.3 L9.4 12.4 L15.6 12.4 Z"
              fill="var(--color-peer)"
              stroke="#fff"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>
          <span className="mt-4 -ml-1 rounded-[0_8px_8px_8px] bg-peer px-2 py-1.5 text-xs leading-none font-semibold whitespace-nowrap text-white">
            Santiago
            <span className="mt-1 block font-medium opacity-95">{PEER_MESSAGES[peerMsg]}</span>
          </span>
        </div>
      )}
    </header>
  );
}
