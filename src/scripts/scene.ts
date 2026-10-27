/**
 * Escena global (vanilla TS, sin React):
 *  - Cambia el "mundo" (colores del body) según la sección en el centro de la pantalla.
 *  - Controla la sección fija "De Figma a producción" (etapas y líneas de código).
 *  - Anima el switch de idioma y conserva la sección actual al cambiar de idioma.
 *  - Barra de progreso, regla "Y: px", ticker de tecnologías y etiqueta "Tú" del cursor.
 *  - Peso variable en el título de contacto ([data-stretch]) y animación de aparición (.reveal).
 */

type World = 'canvas' | 'paper' | 'code' | 'sun' | 'blue';

/** Mundo de cada etapa del proceso; sus nombres llegan traducidos en data-stage-labels */
const STAGE_WORLDS: World[] = ['canvas', 'code', 'paper'];

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

export function initScene() {
  const root = document.documentElement;
  const body = document.body;
  root.classList.add('js');

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(pointer: fine)').matches;

  const progress = document.querySelector<HTMLElement>('[data-progress]');
  const ruler = document.querySelector<HTMLElement>('[data-ruler]');
  const worldName = document.querySelector<HTMLElement>('[data-world-name]');
  const me = document.querySelector<HTMLElement>('[data-me]');
  const ticker = document.querySelector<HTMLElement>('[data-ticker]');

  /* ---------- Proceso ---------- */
  const proc = document.querySelector<HTMLElement>('[data-process]');
  const steps = [...document.querySelectorAll<HTMLElement>('[data-step]')];
  const layers = [...document.querySelectorAll<HTMLElement>('[data-stage]')];
  const codeLines = [...document.querySelectorAll<HTMLElement>('[data-code-line]')];
  const procBar = document.querySelector<HTMLElement>('[data-process-bar]');
  const stageLabels = (proc?.dataset.stageLabels ?? '').split('|');
  let stage = -1;

  const updateProcess = () => {
    if (!proc) return { inside: false, stage: 0 };
    const r = proc.getBoundingClientRect();
    const p = clamp(-r.top / Math.max(1, r.height - window.innerHeight), 0, 1);
    const s = p < 0.34 ? 0 : p < 0.67 ? 1 : 2;
    if (procBar) procBar.style.transform = `scaleX(${p})`;
    if (s !== stage) {
      stage = s;
      steps.forEach((el, i) => el.classList.toggle('is-on', i === s));
      layers.forEach((el, i) => {
        el.classList.toggle('is-on', i === s);
        el.setAttribute('aria-hidden', String(i !== s));
      });
    }
    const sub = s === 1 ? clamp((p - 0.34) / 0.25, 0, 1) : s > 1 ? 1 : 0;
    const shown = Math.ceil(sub * codeLines.length);
    codeLines.forEach((el, i) => {
      el.classList.toggle('is-on', i < shown);
      el.classList.toggle('is-last', s === 1 && i === shown - 1);
    });
    const mid = window.innerHeight / 2;
    return { inside: r.top <= mid && r.bottom >= mid, stage: s };
  };

  /* ---------- Mundos ---------- */
  const worldSections = [...document.querySelectorAll<HTMLElement>('[data-world]')].filter((el) => el !== body);
  const setWorld = (world: World, label: string) => {
    if (body.dataset.world !== world) body.dataset.world = world;
    if (worldName && worldName.textContent !== label) worldName.textContent = label;
  };
  const updateWorld = (procState: { inside: boolean; stage: number }) => {
    if (procState.inside) {
      setWorld(STAGE_WORLDS[procState.stage], stageLabels[procState.stage] ?? '');
      return;
    }
    const mid = window.innerHeight / 2;
    for (const section of worldSections) {
      const r = section.getBoundingClientRect();
      if (r.top <= mid && r.bottom >= mid) {
        setWorld(section.dataset.world as World, section.dataset.label ?? '');
        return;
      }
    }
  };

  /* ---------- Título de contacto: peso según el cursor ---------- */
  const stretchChars: HTMLElement[] = [];
  document.querySelectorAll<HTMLElement>('[data-stretch]').forEach((el) => {
    const words = (el.textContent ?? '').trim().split(/\s+/);
    el.setAttribute('aria-label', words.join(' '));
    el.textContent = '';
    words.forEach((word, wi) => {
      const w = document.createElement('span');
      w.className = 'inline-block whitespace-nowrap';
      w.setAttribute('aria-hidden', 'true');
      for (const c of word) {
        const s = document.createElement('span');
        s.className = 'ch';
        s.textContent = c;
        w.appendChild(s);
        stretchChars.push(s);
      }
      el.appendChild(w);
      if (wi < words.length - 1) el.appendChild(document.createTextNode(' '));
    });
    if (!fine || reduce) return;
    const zone = el.closest('section') ?? el;
    zone.addEventListener('pointermove', (e) => {
      if (window.innerWidth < 1024) return;
      const { clientX: x, clientY: y } = e as PointerEvent;
      for (const ch of stretchChars) {
        const r = ch.getBoundingClientRect();
        const d = Math.hypot(x - (r.left + r.width / 2), (y - (r.top + r.height / 2)) * 0.6);
        const k = Math.max(0, 1 - d / 260);
        ch.style.setProperty('--w', String(Math.round(420 + 480 * k * k)));
      }
    });
    zone.addEventListener('pointerleave', () => stretchChars.forEach((c) => c.style.removeProperty('--w')));
  });

  /* ---------- Aparición ---------- */
  const reveals = document.querySelectorAll<HTMLElement>('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        }),
      { rootMargin: '0px 0px -8% 0px' },
    );
    reveals.forEach((el) => io.observe(el));
  } else reveals.forEach((el) => el.classList.add('is-in'));

  /* ---------- Cursor "Tú" ---------- */
  const mouse = { x: -100, y: -100 };
  const mePos = { ...mouse };
  if (fine && me) {
    window.addEventListener(
      'pointermove',
      (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        if (root.classList.contains('booted')) me.style.opacity = '1';
      },
      { passive: true },
    );
    document.addEventListener('pointerleave', () => (me.style.opacity = '0'));
  }

  /* ---------- Switch de idioma ---------- */
  // Anima el interruptor y abre la otra versión en la misma sección (/#proyectos → /en/#proyectos)
  document.querySelectorAll<HTMLAnchorElement>('[data-lang-switch]').forEach((link) => {
    link.addEventListener('click', (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      const mid = window.innerHeight / 2;
      const current = [...document.querySelectorAll<HTMLElement>('main > section[id], main > header[id]')].find((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= mid && r.bottom >= mid;
      });
      const hash = current && current.id !== 'inicio' ? `#${current.id}` : '';
      const target = link.getAttribute('href') + hash;

      const knob = link.querySelector<HTMLElement>('[data-lang-knob]');
      if (knob) knob.classList.toggle('translate-x-full');
      link.querySelectorAll<HTMLElement>('[data-lang-option]').forEach((opt) => {
        opt.classList.toggle('text-world');
        opt.classList.toggle('text-muted');
      });
      window.setTimeout(() => window.location.assign(target), reduce ? 0 : 260);
    });
  });

  /* ---------- Bucle ---------- */
  let tickerX = 0;
  let lastY = window.scrollY;
  let velocity = 0;

  const frame = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    if (ruler) ruler.textContent = `Y: ${Math.round(y)} px`;

    updateWorld(updateProcess());

    velocity = velocity * 0.9 + (y - lastY) * 0.1;
    lastY = y;

    if (!reduce && ticker) {
      tickerX -= 0.6 + Math.min(Math.abs(velocity) * 0.35, 14);
      const half = ticker.scrollWidth / 2;
      if (half && -tickerX >= half) tickerX += half;
      ticker.style.transform = `translate3d(${tickerX}px,0,0)`;
    }
    if (fine && me) {
      const k = reduce ? 1 : 0.35;
      mePos.x += (mouse.x - mePos.x) * k;
      mePos.y += (mouse.y - mePos.y) * k;
      me.style.transform = `translate(${mePos.x + 14}px, ${mePos.y + 18}px)`;
    }
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}
