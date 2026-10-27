/**
 * Pantalla inicial: la terminal escribe sola `npm create portfolio@latest`,
 * simula la instalación y abre el portafolio. El visitante no tiene que hacer nada.
 * - Solo se muestra una vez por sesión (sessionStorage → BOOT_STORAGE_KEY en src/data/site.ts).
 * - El script en src/layouts/Layout.astro marca <html class="booted"> antes del primer pintado
 *   si la sesión ya la vio, así no hay parpadeo al recargar.
 * - "Saltar intro" o la tecla Escape la omiten.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { BOOT_COMMAND, BOOT_STORAGE_KEY } from "@/data/site";
import { t, type Lang } from "@/i18n/ui";
import { prefersReducedMotion, safeSession } from "@/lib/utils";

type Phase = "typing" | "enter" | "running" | "leaving" | "done";
type LineKind = "dim" | "info" | "ok" | "cmd" | "progress";
interface LogLine {
  id: number;
  kind: LineKind;
  text: string;
}

const PROMPT = "PS C:\\santiagoV>";
const SPINNER = "⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏";

const lineColor: Record<LineKind, string> = {
  dim: "text-[#a6abb2]",
  info: "text-[#5d636c]",
  ok: "text-[#5d636c]",
  cmd: "text-ink",
  progress: "text-[#5d636c]",
};

/** Resalta el ejecutable (npm) como lo haría una terminal. */
function CommandText({ text }: { text: string }) {
  const match = text.match(/^(\s*)(\S+)([\s\S]*)$/);
  if (!match) return <>{text}</>;
  return (
    <>
      {match[1]}
      <span className="text-cmd">{match[2]}</span>
      {match[3]}
    </>
  );
}

export default function Boot({ lang }: { lang: Lang }) {
  const copy = t(lang).boot;
  const [phase, setPhase] = useState<Phase>("typing");
  const [visible, setVisible] = useState(true);
  const [typed, setTyped] = useState("");
  const [typing, setTyping] = useState(false);
  const [log, setLog] = useState<LogLine[]>([]);

  const idRef = useRef(0);
  const cancelled = useRef(false);
  const finished = useRef(false);

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    cancelled.current = true;
    safeSession.set(BOOT_STORAGE_KEY, "1");
    setPhase("leaving");
    window.scrollTo(0, 0);
    document.documentElement.classList.add("booted");
    window.setTimeout(
      () => {
        setVisible(false);
        setPhase("done");
      },
      prefersReducedMotion() ? 0 : 700,
    );
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (safeSession.get(BOOT_STORAGE_KEY) || root.classList.contains("booted")) {
      root.classList.add("booted");
      setVisible(false);
      setPhase("done");
      return;
    }

    cancelled.current = false;
    const speed = prefersReducedMotion() ? 0.15 : 1;
    const timers: number[] = [];
    const wait = (ms: number) =>
      new Promise<void>((resolve, reject) =>
        timers.push(window.setTimeout(() => (cancelled.current ? reject(new Error("cancelled")) : resolve()), ms * speed)),
      );
    const add = (kind: LineKind, text: string) => {
      const id = ++idRef.current;
      setLog((l) => [...l, { id, kind, text }]);
      return id;
    };
    const update = (id: number, kind: LineKind, text: string) =>
      setLog((l) => l.map((line) => (line.id === id ? { ...line, kind, text } : line)));

    const sequence = async () => {
      // 1. El cursor parpadea un momento y luego "alguien" escribe el comando
      await wait(650);
      setTyping(true);
      for (let i = 1; i <= BOOT_COMMAND.length; i++) {
        setTyped(BOOT_COMMAND.slice(0, i));
        // pausa un poco más larga después de cada palabra, como al teclear de verdad
        await wait(BOOT_COMMAND[i - 1] === " " ? 120 : 38 + Math.random() * 42);
      }
      setTyping(false);

      // 2. Enter
      await wait(300);
      setPhase("enter");
      await wait(500);
      setPhase("running");

      // 3. Salida del "build"
      const started = performance.now();
      await wait(200);
      add("dim", "> npx create-portfolio@latest");
      await wait(300);
      add("info", `◇  ${copy.project.padEnd(13, " ")}·· santiago-velasco`);
      await wait(200);
      add("info", `◇  ${copy.template.padEnd(13, " ")}·· Astro + React + Tailwind`);
      await wait(300);

      const steps = 16;
      const bar = (n: number) => "█".repeat(Math.round((n / steps) * 16)).padEnd(16, "░");
      const install = add("progress", `${SPINNER[0]}  ${copy.installing}  [${bar(0)}]   0%`);
      for (let i = 1; i <= steps; i++) {
        await wait(38 + Math.random() * 30);
        const pct = String(Math.round((i / steps) * 100)).padStart(3, " ");
        update(install, "progress", `${SPINNER[i % SPINNER.length]}  ${copy.installing}  [${bar(i)}] ${pct}%`);
      }
      update(install, "ok", `✔  ${copy.installed}  [${bar(steps)}] 100%`);
      await wait(220);

      const build = add("progress", `${SPINNER[0]}  ${copy.compiling}…`);
      for (let i = 0; i < copy.parts.length; i++) {
        await wait(120);
        update(build, "progress", `${SPINNER[(i * 3) % SPINNER.length]}  ${copy.compiling} ${copy.parts[i]}…`);
      }
      update(build, "ok", `✔  ${copy.components}: ${copy.parts.join(" · ")}`);
      await wait(280);
      add("ok", `✔  ${copy.ready} ${((performance.now() - started) / 1000).toFixed(2)} s`);
      await wait(260);
      add("cmd", `→  ${copy.opening}`);
      await wait(500);
      finish();
    };

    sequence().catch(() => {
      /* intro omitida */
    });

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && finish();
    window.addEventListener("keydown", onKey);
    return () => {
      cancelled.current = true;
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", onKey);
    };
  }, [copy, finish]);

  if (!visible) return null;

  return (
    <div
      className={`boot ${phase === "leaving" ? "is-leaving" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={copy.dialog}
      aria-busy={phase !== "leaving"}
    >
      {/* Línea de comando, centrada como en la terminal */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-5">
        <div className="relative mx-auto w-full max-w-150">
          <p className="m-0 font-mono text-[12px] leading-relaxed whitespace-pre-wrap text-[#a6abb2] min-[400px]:text-[13px] sm:text-[17px] md:text-[19px]">
            <span className="select-none">{PROMPT}</span>
            {typed ? (
              <>
                {" "}
                <CommandText text={typed} />
              </>
            ) : null}
            {phase === "typing" || phase === "enter" ? (
              <span className={`boot-caret ${typing ? "is-typing" : ""}`} aria-hidden="true" />
            ) : null}
            {phase === "enter" ? (
              <span className="boot-enter ml-3 font-sans text-[14px] whitespace-nowrap text-ink sm:ml-4 sm:text-[16px]">
                [enter ↵]
              </span>
            ) : null}
          </p>

          {/* Salida del "build" (debajo del prompt) */}
          {log.length > 0 && (
            <ol
              className="absolute top-full mt-5 flex w-full list-none flex-col gap-1 p-0 font-mono text-[11px] whitespace-pre min-[400px]:text-[12px] sm:text-[13.5px]"
              aria-live="polite"
            >
              {log.map((line) => (
                <li key={line.id} className={`boot-line overflow-hidden text-ellipsis ${lineColor[line.kind]}`}>
                  {line.kind === "ok" ? (
                    <>
                      <span className="text-[#16a34a]">{line.text.slice(0, 1)}</span>
                      {line.text.slice(1)}
                    </>
                  ) : (
                    line.text
                  )}
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={finish}
        className="absolute bottom-[calc(28px+env(safe-area-inset-bottom,0px))] left-1/2 -translate-x-1/2 cursor-pointer text-[14px] text-[#a9adb3] underline underline-offset-4 hover:text-ink"
      >
        {copy.skip}
      </button>
    </div>
  );
}
