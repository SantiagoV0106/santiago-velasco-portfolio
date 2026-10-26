/**
 * "De Figma a producción": sección fija mientras se hace scroll.
 * Se renderiza como HTML estático (sin JS de React). La lógica de scroll
 * (etapas, líneas de código, anillos de Lighthouse, cambio de mundo)
 * vive en src/scripts/scene.ts.
 */
const STEPS = [
  {
    title: 'Diseño',
    text: 'Parto del archivo de Figma: auto layout, variables y estados. Reviso espaciados, contraste y flujos antes de escribir código.',
  },
  {
    title: 'Código',
    text: 'Traduzco cada componente a React, con props claras y estilos que respetan los tokens del diseño.',
  },
  {
    title: 'Producto',
    text: 'Entrego un sitio rápido y accesible, listo para ser usado.',
  },
];

/* Código con resaltado (HTML estático, sin librerías) */
const CODE = [
  '<span class="tk-k">export function</span> <span class="tk-f">ProjectCard</span>({ title, tags, href }: Props) {',
  '  <span class="tk-k">return</span> (',
  '    &lt;<span class="tk-t">article</span> <span class="tk-a">className</span>=<span class="tk-s">"card"</span>&gt;',
  '      &lt;<span class="tk-t">img</span> <span class="tk-a">src</span>={cover} <span class="tk-a">alt</span>=<span class="tk-s">""</span> <span class="tk-a">loading</span>=<span class="tk-s">"lazy"</span> /&gt;',
  '      &lt;<span class="tk-t">h3</span>&gt;{title}&lt;/<span class="tk-t">h3</span>&gt;',
  '      &lt;<span class="tk-t">ul</span> <span class="tk-a">className</span>=<span class="tk-s">"tags"</span>&gt;',
  '        {tags.<span class="tk-f">map</span>((t) =&gt; &lt;<span class="tk-t">li</span> <span class="tk-a">key</span>={t}&gt;{t}&lt;/<span class="tk-t">li</span>&gt;)}',
  '      &lt;/<span class="tk-t">ul</span>&gt;',
  '      &lt;<span class="tk-t">a</span> <span class="tk-a">href</span>={href}&gt;Ver caso&lt;/<span class="tk-t">a</span>&gt;',
  '    &lt;/<span class="tk-t">article</span>&gt;',
  '  );',
  '}',
  '',
  '<span class="tk-c">// gap: var(--space-4) → 16px, igual que en Figma</span>',
];

const LIGHTHOUSE = ['Rendimiento', 'Accesibilidad', 'Buenas prácticas', 'SEO'];

export default function Process() {
  return (
    <section id="proceso" className="relative h-[340vh]" aria-labelledby="proceso-titulo" data-process>
      <div className="sticky top-0 flex h-svh items-start pt-24 lg:items-center lg:pt-16">
        <div className="container-x grid items-center gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          {/* Texto */}
          <div>
            <p className="eyebrow">Cómo trabajo</p>
            <h2 id="proceso-titulo" className="h2">
              De Figma a producción
            </h2>
            <ol className="mt-5 grid list-none gap-3 p-0 lg:mt-9 lg:gap-6">
              {STEPS.map((s, i) => (
                <li key={s.title} className={`step grid grid-cols-[44px_minmax(0,1fr)] gap-2 ${i === 0 ? 'is-on' : ''}`} data-step={i}>
                  <span className="pt-1 font-mono text-xs text-muted">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="m-0 mb-1 text-[22px] leading-tight font-semibold">{s.title}</h3>
                    <p className="m-0 max-w-[44ch] text-[15px] text-muted lg:text-base">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-8 hidden h-0.5 max-w-105 bg-line lg:block" aria-hidden="true">
              <i className="block h-full origin-left scale-x-0 bg-sel" data-process-bar />
            </div>
          </div>

          {/* Escenario: un mismo componente en tres etapas */}
          <div
            className="relative h-[min(56svh,440px)] w-full max-w-160 sm:aspect-4/3 sm:h-auto lg:aspect-5/4 lg:max-w-none"
            data-layer="Componente / ProjectCard"
          >
            {/* 01 — Diseño */}
            <div className="stage-layer is-on flex flex-col gap-2.5" data-stage={0}>
              <div className="flex justify-between font-mono text-xs text-muted">
                <span>Card / Proyecto</span>
                <span>480 × 384</span>
              </div>
              <div className="relative flex flex-1 flex-col gap-[5%] bg-white p-[6%] outline-[1.5px] outline-sel">
                <span className="absolute -top-8 right-0 rounded-md border border-[#d5d9df] bg-white px-2 py-1 font-mono text-xs text-ink">
                  Auto layout ↓ 16
                </span>
                <div className="fr-ph flex-[1.6]" />
                <div className="h-[7%] w-[64%] rounded-sm bg-[#2a2e35]" />
                <div className="h-[4%] w-[82%] rounded-sm bg-[#c9ced6]" />
                <div className="flex gap-[3%]">
                  <i className="h-5.5 w-[16%] rounded-full border-[1.5px] border-dashed border-[#b6bcc6]" />
                  <i className="h-5.5 w-[16%] rounded-full border-[1.5px] border-dashed border-[#b6bcc6]" />
                  <i className="h-5.5 w-[16%] rounded-full border-[1.5px] border-dashed border-[#b6bcc6]" />
                </div>
                <div className="h-[9%] w-[30%] rounded-md bg-sel" />
                <span className="redline v" style={{ left: '3%', top: 0, height: '6%' }}>
                  <span>24</span>
                </span>
                <span className="redline h" style={{ left: 0, top: '30%', width: '6%' }}>
                  <span>24</span>
                </span>
                <span className="redline v" style={{ right: '30%', top: '57%', height: '4.5%' }}>
                  <span>16</span>
                </span>
              </div>
            </div>

            {/* 02 — Código */}
            <div
              className="stage-layer flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#161a21] shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
              data-stage={1}
              aria-hidden="true"
            >
              <div className="flex gap-0.5 bg-[#11141a] px-3 pt-2.5 font-mono text-xs">
                <span className="rounded-t-lg bg-[#161a21] px-3 py-2 text-snow">ProjectCard.tsx</span>
                <span className="px-3 py-2 text-[#8d96a3]">tokens.css</span>
              </div>
              <pre className="m-0 flex-1 overflow-hidden py-5 pr-3 font-mono text-[10.5px] leading-[1.75] text-[#d5dae2] sm:text-[12px] lg:text-[clamp(11.5px,1.05vw,14.5px)]">
                {CODE.map((line, i) => (
                  <span key={i} className="code-line" data-code-line>
                    <span className="w-8 flex-none pr-3 text-right text-[#4d5563] select-none sm:w-11 sm:pr-4">{i + 1}</span>
                    <span dangerouslySetInnerHTML={{ __html: line || ' ' }} />
                  </span>
                ))}
              </pre>
            </div>

            {/* 03 — Producto */}
            <div className="stage-layer grid grid-rows-[auto_auto] content-start gap-4 lg:grid-rows-[minmax(0,1fr)_auto]" data-stage={2} aria-hidden="true">
              <article className="grid overflow-hidden rounded-2xl bg-white text-ink shadow-[0_24px_60px_rgba(18,20,24,0.14)] sm:grid-cols-[1.15fr_1fr]">
                <div className="p-cover min-h-22.5 sm:min-h-45" />
                <div className="flex flex-col justify-center gap-2 p-4 sm:gap-2.5 sm:p-6">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="rounded-full bg-[#eef0f3] px-2 py-1.5 font-mono text-[11.5px] leading-none text-[#30353d]">Astro</span>
                    <span className="rounded-full bg-[#eef0f3] px-2 py-1.5 font-mono text-[11.5px] leading-none text-[#30353d]">Accesible</span>
                  </div>
                  <h4 className="m-0 text-[clamp(20px,2vw,28px)] leading-none font-extrabold tracking-tight">Fogón 23</h4>
                  <p className="m-0 hidden text-[14.5px] text-[#535a64] sm:block">Sitio con menú y reservas para un restaurante.</p>
                  <span className="self-start border-b-[1.5px] border-current text-sm font-semibold">Ver caso →</span>
                </div>
              </article>
              <div className="grid grid-cols-4 gap-1 rounded-2xl bg-white p-2.5 text-ink shadow-[0_14px_40px_rgba(18,20,24,0.08)] sm:gap-2.5 sm:p-3.5">
                {LIGHTHOUSE.map((label) => (
                  <div key={label} className="flex flex-col items-center gap-1.5 text-center">
                    <svg viewBox="0 0 44 44" className="size-10 sm:size-13.5">
                      <circle className="lh-ring bg" cx="22" cy="22" r="18" />
                      <circle className="lh-ring fg" cx="22" cy="22" r="18" data-lh-ring />
                      <text className="lh-num" x="22" y="27" textAnchor="middle" data-lh-num>
                        0
                      </text>
                    </svg>
                    <small className="text-[10px] leading-tight text-[#535a64] sm:text-[11.5px]">{label}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
