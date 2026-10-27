/**
 * "De Figma a producción": sección fija mientras se hace scroll.
 * Se renderiza como HTML estático (sin JS de React). La lógica de scroll
 * (etapas, líneas de código, cambio de mundo) vive en src/scripts/scene.ts.
 *
 * Las etapas 01 (Diseño) y 03 (Producto) usan exactamente el mismo layout
 * (<ProjectCardFrame>): el wireframe se "llena" con contenido real.
 * Textos: src/i18n/ui.ts → process
 */
import { t, type Lang } from "@/i18n/ui";

/** Imagen real del componente terminado (un proyecto de la galería) */
const FINAL_IMAGE = "/projects/transvego-cover.webp";

/* Código con resaltado (HTML estático, sin librerías) */
const codeLines = (cta: string, comment: string) => [
  '<span class="tk-k">export function</span> <span class="tk-f">ProjectCard</span>({ title, tags, href }: Props) {',
  '  <span class="tk-k">return</span> (',
  '    &lt;<span class="tk-t">article</span> <span class="tk-a">className</span>=<span class="tk-s">"card"</span>&gt;',
  '      &lt;<span class="tk-t">img</span> <span class="tk-a">src</span>={cover} <span class="tk-a">alt</span>=<span class="tk-s">""</span> <span class="tk-a">loading</span>=<span class="tk-s">"lazy"</span> /&gt;',
  '      &lt;<span class="tk-t">h3</span>&gt;{title}&lt;/<span class="tk-t">h3</span>&gt;',
  '      &lt;<span class="tk-t">ul</span> <span class="tk-a">className</span>=<span class="tk-s">"tags"</span>&gt;',
  '        {tags.<span class="tk-f">map</span>((t) =&gt; &lt;<span class="tk-t">li</span> <span class="tk-a">key</span>={t}&gt;{t}&lt;/<span class="tk-t">li</span>&gt;)}',
  '      &lt;/<span class="tk-t">ul</span>&gt;',
  `      &lt;<span class="tk-t">a</span> <span class="tk-a">href</span>={href}&gt;${cta}&lt;/<span class="tk-t">a</span>&gt;`,
  '    &lt;/<span class="tk-t">article</span>&gt;',
  '  );',
  '}',
  '',
  `<span class="tk-c">${comment}</span>`,
];

type Copy = ReturnType<typeof t>["process"];

/**
 * Tarjeta del proyecto en dos estados con la misma geometría:
 *  - "design": wireframe de Figma con medidas en rojo
 *  - "final":  la misma tarjeta con imagen, textos y botón reales
 */
function ProjectCardFrame({ variant, copy }: { variant: "design" | "final"; copy: Copy }) {
  const final = variant === "final";

  return (
    <div className="flex h-full flex-col gap-2.5">
      <div className="flex items-center justify-between font-mono text-xs text-muted">
        <span>{final ? copy.finalLabel : copy.frameLabel}</span>
        <span>480 × 384</span>
      </div>

      {/* container-type: size → los textos escalan con la altura del marco (unidades cqh) */}
      <div
        className={`relative flex flex-1 flex-col gap-[5%] bg-white p-[6%] text-ink [container-type:size] ${
          final ? "rounded-2xl shadow-[0_24px_60px_rgba(18,20,24,0.16)]" : "outline-[1.5px] outline-sel"
        }`}
      >
        {final ? (
          <span className="absolute -top-8 right-0 inline-flex items-center gap-1.5 rounded-md border border-[#cdeedb] bg-[#effaf3] px-2 py-1 font-mono text-xs text-[#0a7a3e]">
            <i className="size-1.5 rounded-full bg-lighthouse" />
            {copy.published}
          </span>
        ) : (
          <span className="absolute -top-8 right-0 rounded-md border border-[#d5d9df] bg-white px-2 py-1 font-mono text-xs text-ink">
            {copy.autoLayout}
          </span>
        )}

        {/* Imagen */}
        {final ? (
          <div className="relative flex-[1.6] overflow-hidden rounded-[3px] bg-[#e1e4e8]">
            <img src={FINAL_IMAGE} alt="" loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover" />
          </div>
        ) : (
          <div className="fr-ph flex-[1.6]" />
        )}

        {/* Título */}
        {final ? (
          <h4 className="m-0 flex h-[7%] w-[64%] items-center text-[clamp(12px,5.6cqh,30px)] leading-none font-extrabold tracking-tight whitespace-nowrap">
            {copy.card.title}
          </h4>
        ) : (
          <div className="h-[7%] w-[64%] rounded-sm bg-[#2a2e35]" />
        )}

        {/* Descripción */}
        {final ? (
          <p className="m-0 block h-[4%] w-[82%] truncate text-[clamp(8px,3.1cqh,16px)] leading-[1.15] text-[#535a64]">
            {copy.card.text}
          </p>
        ) : (
          <div className="h-[4%] w-[82%] rounded-sm bg-[#c9ced6]" />
        )}

        {/* Etiquetas */}
        <div className="flex gap-[3%]">
          {final
            ? copy.card.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex h-5.5 min-w-[16%] items-center justify-center rounded-full border-[1.5px] border-[#eef0f3] bg-[#eef0f3] px-2 font-mono text-[10px] leading-none text-[#30353d] sm:text-[11px]"
                >
                  {tag}
                </span>
              ))
            : [0, 1, 2].map((i) => (
                <i key={i} className="h-5.5 w-[16%] rounded-full border-[1.5px] border-dashed border-[#b6bcc6]" />
              ))}
        </div>

        {/* Botón */}
        {final ? (
          <span className="flex h-[9%] w-[30%] items-center justify-center rounded-md bg-sel text-[clamp(9px,3.4cqh,16px)] leading-none font-semibold whitespace-nowrap text-white">
            {copy.card.cta}
          </span>
        ) : (
          <div className="h-[9%] w-[30%] rounded-md bg-sel" />
        )}

        {/* Medidas (solo en el wireframe) */}
        {!final && (
          <>
            <span className="redline v" style={{ left: "3%", top: 0, height: "6%" }}>
              <span>24</span>
            </span>
            <span className="redline h" style={{ left: 0, top: "30%", width: "6%" }}>
              <span>24</span>
            </span>
            <span className="redline v" style={{ right: "30%", top: "57%", height: "4.5%" }}>
              <span>16</span>
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export default function Process({ lang }: { lang: Lang }) {
  const ui = t(lang);
  const copy = ui.process;
  const code = codeLines(copy.codeCta, copy.codeComment);
  const stageLabels = [ui.worlds.design, ui.worlds.code, ui.worlds.product].join("|");

  return (
    <section
      id="proceso"
      className="relative h-[340vh]"
      aria-labelledby="proceso-titulo"
      data-process
      data-stage-labels={stageLabels}
    >
      <div className="sticky top-0 flex h-svh items-start pt-24 lg:items-center lg:pt-16">
        <div className="container-x grid items-center gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          {/* Texto */}
          <div>
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2 id="proceso-titulo" className="h2">
              {copy.title}
            </h2>
            <ol className="mt-5 grid list-none gap-3 p-0 lg:mt-9 lg:gap-6">
              {copy.steps.map((s, i) => (
                <li key={s.title} className={`step grid grid-cols-[44px_minmax(0,1fr)] gap-2 ${i === 0 ? "is-on" : ""}`} data-step={i}>
                  <span className="pt-1 font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
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
            className="relative h-[min(42svh,340px)] w-full max-w-160 sm:aspect-4/3 sm:h-auto lg:aspect-5/4 lg:max-w-none"
            data-layer={copy.layer}
          >
            {/* 01 — Diseño */}
            <div className="stage-layer is-on" data-stage={0}>
              <ProjectCardFrame variant="design" copy={copy} />
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
                {code.map((line, i) => (
                  <span key={i} className="code-line" data-code-line>
                    <span className="w-8 flex-none pr-3 text-right text-[#4d5563] select-none sm:w-11 sm:pr-4">{i + 1}</span>
                    <span dangerouslySetInnerHTML={{ __html: line || " " }} />
                  </span>
                ))}
              </pre>
            </div>

            {/* 03 — Producto: el mismo layout del diseño, terminado */}
            <div className="stage-layer" data-stage={2} aria-hidden="true">
              <ProjectCardFrame variant="final" copy={copy} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
