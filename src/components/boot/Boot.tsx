/**
 * Pantalla inicial: el visitante escribe (o copia) el comando para "crear" el portafolio.
 * - Solo se muestra una vez por sesión (sessionStorage → BOOT_STORAGE_KEY en src/data/site.ts).
 * - El script en src/layouts/Layout.astro marca <html class="booted"> antes del primer pintado
 *   si la sesión ya la vio, así no hay parpadeo al recargar.
 * - Tab autocompleta, Enter ejecuta, tocar el comando lo escribe solo (útil en móvil).
 */
import { useCallback, useEffect, useRef, useState, type ChangeEvent, type KeyboardEvent } from 'react';
import { BOOT_STORAGE_KEY, bootCommands, type PackageManager } from '@/data/site';
import { copyText, prefersReducedMotion, safeSession } from '@/lib/utils';

type Phase = 'idle' | 'running' | 'leaving' | 'done';
type LineKind = 'dim' | 'info' | 'ok' | 'err' | 'cmd' | 'progress';
interface LogLine {
  id: number;
  kind: LineKind;
  text: string;
}
interface Attempt {
  id: number;
  cmd: string;
  error: string;
}

const PROMPT = 'PS C:\\santiagoV>';
const MANAGERS = Object.keys(bootCommands) as PackageManager[];
const SPINNER = '⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏';
const normalize = (s: string) => s.trim().replace(/\s+/g, ' ').toLowerCase();
const VALID = new Set(Object.values(bootCommands).map(normalize));

const lineColor: Record<LineKind, string> = {
  dim: 'text-[#a6abb2]',
  info: 'text-[#5d636c]',
  ok: 'text-[#5d636c]',
  err: 'text-[#d14343]',
  cmd: 'text-ink',
  progress: 'text-[#5d636c]',
};

/** Resalta el ejecutable (npm, pnpm…) como lo haría una terminal. */
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

function CopyIcon({ done }: { done: boolean }) {
  return done ? (
    <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M3 8.5l3.2 3L13 4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg viewBox="0 0 16 16" className="size-3.5" fill="currentColor" aria-hidden="true">
      <rect x="5" y="1.5" width="9" height="10" rx="2" />
      <rect x="2" y="4.5" width="9" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export default function Boot() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [visible, setVisible] = useState(true);
  const [typed, setTyped] = useState('');
  const [pm, setPm] = useState<PackageManager>('npm');
  const [ghost, setGhost] = useState('');
  const [typing, setTyping] = useState(false);
  const [shake, setShake] = useState(false);
  const [copied, setCopied] = useState(false);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [log, setLog] = useState<LogLine[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const idRef = useRef(0);
  const typingTimer = useRef<number>(0);
  const autoTyping = useRef(false);

  const command = bootCommands[pm];
  const isValid = VALID.has(normalize(typed));
  const isEmpty = typed.length === 0;

  /* ¿Ya se creó en esta sesión? */
  useEffect(() => {
    const root = document.documentElement;
    if (safeSession.get(BOOT_STORAGE_KEY) || root.classList.contains('booted')) {
      root.classList.add('booted');
      setVisible(false);
      setPhase('done');
      return;
    }
    inputRef.current?.focus({ preventScroll: true });
  }, []);

  /* Sugerencia fantasma: escribe el comando en gris claro para invitar a hacerlo */
  useEffect(() => {
    if (phase !== 'idle' || !isEmpty) {
      setGhost('');
      return;
    }
    if (prefersReducedMotion()) {
      setGhost(command);
      return;
    }
    let cancelled = false;
    const timers: number[] = [];
    const wait = (ms: number) => new Promise<void>((resolve) => timers.push(window.setTimeout(resolve, ms)));
    (async () => {
      await wait(1800);
      while (!cancelled) {
        for (let i = 1; i <= command.length && !cancelled; i++) {
          setGhost(command.slice(0, i));
          await wait(55 + Math.random() * 65);
        }
        await wait(1900);
        for (let i = command.length; i >= 0 && !cancelled; i--) {
          setGhost(command.slice(0, i));
          await wait(16);
        }
        await wait(2600);
      }
    })();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [phase, isEmpty, command]);

  /* Si el foco se pierde (ej. tras copiar), cualquier tecla vuelve a la terminal */
  useEffect(() => {
    if (phase !== 'idle') return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('input, select, textarea')) return;
      if (e.metaKey || e.ctrlKey || e.altKey) {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'v') inputRef.current?.focus();
        return;
      }
      if (e.key.length === 1 || e.key === 'Enter' || e.key === 'Tab' || e.key === 'Backspace') {
        inputRef.current?.focus({ preventScroll: true });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase]);

  const markTyping = () => {
    setTyping(true);
    window.clearTimeout(typingTimer.current);
    typingTimer.current = window.setTimeout(() => setTyping(false), 450);
  };

  const finish = useCallback(() => {
    safeSession.set(BOOT_STORAGE_KEY, '1');
    setPhase('leaving');
    window.scrollTo(0, 0);
    document.documentElement.classList.add('booted');
    window.setTimeout(
      () => {
        setVisible(false);
        setPhase('done');
      },
      prefersReducedMotion() ? 0 : 700,
    );
  }, []);

  /* Animación de "build" */
  const run = useCallback(async () => {
    setPhase('running');
    setGhost('');
    const speed = prefersReducedMotion() ? 0.15 : 1;
    const started = performance.now();
    const wait = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms * speed));
    const add = (kind: LineKind, text: string) => {
      const id = ++idRef.current;
      setLog((l) => [...l, { id, kind, text }]);
      return id;
    };
    const update = (id: number, kind: LineKind, text: string) =>
      setLog((l) => l.map((line) => (line.id === id ? { ...line, kind, text } : line)));

    await wait(250);
    add('dim', `> ${pm === 'npm' ? 'npx' : pm} create-portfolio@latest`);
    await wait(450);
    add('info', '◇  Proyecto ········· santiago-velasco');
    await wait(280);
    add('info', '◇  Plantilla ········ Astro + React + Tailwind');
    await wait(320);

    const steps = 22;
    const bar = (n: number) => '█'.repeat(Math.round((n / steps) * 16)).padEnd(16, '░');
    const install = add('progress', `${SPINNER[0]}  Instalando dependencias  [${bar(0)}]   0%`);
    for (let i = 1; i <= steps; i++) {
      await wait(55 + Math.random() * 50);
      const pct = String(Math.round((i / steps) * 100)).padStart(3, ' ');
      update(install, 'progress', `${SPINNER[i % SPINNER.length]}  Instalando dependencias  [${bar(i)}] ${pct}%`);
    }
    update(install, 'ok', `✔  Dependencias instaladas  [${bar(steps)}] 100%`);
    await wait(250);

    const parts = ['Hero', 'Proceso', 'Galería', 'Terminal', 'Contacto'];
    const build = add('progress', `${SPINNER[0]}  Compilando componentes`);
    for (let i = 0; i < parts.length; i++) {
      await wait(190);
      update(build, 'progress', `${SPINNER[(i * 3) % SPINNER.length]}  Compilando ${parts[i]}…`);
    }
    update(build, 'ok', `✔  Componentes: ${parts.join(' · ')}`);
    await wait(300);
    add('ok', `✔  Listo en ${((performance.now() - started) / 1000).toFixed(2)} s`);
    await wait(380);
    add('cmd', '→  Abriendo portafolio…');
    await wait(650);
    finish();
  }, [finish, pm]);

  const submit = () => {
    const value = typed.trim();
    if (!value || phase !== 'idle') return;
    if (VALID.has(normalize(value))) {
      run();
      return;
    }
    const first = value.split(/\s+/)[0];
    const error = MANAGERS.includes(first.toLowerCase() as PackageManager)
      ? `${first} error 404  No se encontró el paquete. Prueba con: ${command}`
      : `${first}: El término '${first}' no se reconoce como un comando. Prueba con: ${command}`;
    setAttempts((a) => [...a.slice(-3), { id: ++idRef.current, cmd: value, error }]);
    setTyped('');
    setShake(true);
    window.setTimeout(() => setShake(false), 380);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (phase !== 'idle' || autoTyping.current) return;
    setTyped(e.target.value);
    markTyping();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submit();
    } else if (e.key === 'Tab' && phase === 'idle') {
      e.preventDefault();
      setTyped(command);
      markTyping();
    }
  };

  /* Escribe el comando letra por letra (al tocar el comando sugerido) */
  const autoType = async () => {
    if (phase !== 'idle' || autoTyping.current) return;
    autoTyping.current = true;
    inputRef.current?.focus({ preventScroll: true });
    const speed = prefersReducedMotion() ? 0 : 1;
    for (let i = 1; i <= command.length; i++) {
      setTyped(command.slice(0, i));
      markTyping();
      if (speed) await new Promise((r) => window.setTimeout(r, 32 + Math.random() * 40));
    }
    autoTyping.current = false;
  };

  const copy = async () => {
    const ok = await copyText(command);
    if (!ok) {
      // Si el navegador no permite copiar, escribimos el comando por el visitante
      autoType();
      return;
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
    inputRef.current?.focus({ preventScroll: true });
  };

  if (!visible) return null;

  return (
    <div
      className={`boot ${phase === 'leaving' ? 'is-leaving' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Crear el portafolio"
      onMouseDown={(e) => {
        if (!(e.target as HTMLElement).closest('button, select, input')) {
          e.preventDefault();
          inputRef.current?.focus({ preventScroll: true });
        }
      }}
    >
      {/* Línea de comando, centrada como en la terminal */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-5">
        <div className="relative mx-auto w-full max-w-150">
          {/* Intentos anteriores (arriba del prompt) */}
          {attempts.length > 0 && (
            <ol className="absolute bottom-full mb-4 flex w-full flex-col gap-3 font-mono text-[12px] sm:text-[13px]">
              {attempts.map((a) => (
                <li key={a.id} className="boot-line flex flex-col gap-0.5">
                  <span className="text-[#c3c7cc]">
                    {PROMPT} {a.cmd}
                  </span>
                  <span className="text-[#d14343]">{a.error}</span>
                </li>
              ))}
            </ol>
          )}

          <div className="relative">
            <p
              className={`m-0 break-all whitespace-pre-wrap font-mono text-[12px] leading-relaxed text-[#a6abb2] min-[400px]:text-[13px] sm:text-[17px] md:text-[19px] ${shake ? 'boot-shake' : ''}`}
            >
              <span className="select-none">{PROMPT}</span>
              {typed ? (
                <>
                  {' '}
                  <CommandText text={typed} />
                </>
              ) : null}
              <span className={`boot-caret ${typing ? 'is-typing' : ''}`} aria-hidden="true" />
              {isEmpty && ghost ? (
                <span className="boot-ghost" aria-hidden="true">
                  {' '}
                  {ghost}
                </span>
              ) : null}
              {isValid && phase === 'idle' ? (
                <button
                  type="button"
                  onClick={submit}
                  className="boot-enter relative z-10 ml-3 cursor-pointer font-sans text-[14px] whitespace-nowrap text-ink sm:ml-4 sm:text-[16px]"
                >
                  [enter ↵]
                </button>
              ) : null}
            </p>
            <input
              ref={inputRef}
              value={typed}
              onChange={onChange}
              onKeyDown={onKeyDown}
              disabled={phase !== 'idle'}
              aria-label={`Escribe el comando ${command} y presiona Enter para crear el portafolio`}
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              enterKeyHint="go"
              className="absolute inset-0 h-full w-full cursor-text bg-transparent text-[16px] opacity-0"
            />
          </div>

          {/* Salida del "build" (debajo del prompt) */}
          {log.length > 0 && (
            <ol className="absolute top-full mt-5 flex w-full flex-col gap-1 font-mono text-[12px] whitespace-pre sm:text-[13.5px]" aria-live="polite">
              {log.map((line) => (
                <li key={line.id} className={`boot-line overflow-hidden text-ellipsis ${lineColor[line.kind]}`}>
                  {line.kind === 'ok' ? (
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

      {/* Ayuda: gestor de paquetes, comando para copiar y salida directa */}
      <div
        className={`absolute top-[calc(50%+110px)] left-1/2 w-[min(300px,calc(100%-40px))] -translate-x-1/2 transition-opacity duration-500 ${
          phase === 'idle' ? '' : 'pointer-events-none opacity-0'
        }`}
      >
        <p className="mb-2 text-[15px] text-[#a9adb3]">Escribe para empezar,</p>
        <div className="flex items-center gap-2 rounded-lg bg-[#f0f0f1] p-1 pr-2">
          <label className="relative shrink-0">
            <span className="sr-only">Gestor de paquetes</span>
            <select
              value={pm}
              onChange={(e) => setPm(e.target.value as PackageManager)}
              className="cursor-pointer appearance-none rounded-md bg-[#e2e3e5] py-1 pr-6 pl-2 text-[14px] text-ink outline-none focus-visible:ring-2 focus-visible:ring-sel"
            >
              {MANAGERS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <svg
              viewBox="0 0 10 14"
              className="pointer-events-none absolute top-1/2 right-2 h-2.25 w-1.5 -translate-y-1/2 text-[#6b7078]"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M5 0l4 5H1zM5 14L1 9h8z" />
            </svg>
          </label>
          <button
            type="button"
            onClick={autoType}
            title="Escribir el comando"
            className="min-w-0 flex-1 cursor-pointer truncate text-left text-[14px] text-[#a9adb3] hover:text-[#7d828a]"
          >
            <CommandText text={command} />
          </button>
          <button
            type="button"
            onClick={copy}
            aria-label={copied ? 'Comando copiado' : 'Copiar comando'}
            className="grid size-6 shrink-0 cursor-pointer place-items-center rounded text-cmd hover:bg-[#e2e3e5]"
          >
            <CopyIcon done={copied} />
          </button>
        </div>
        <button
          type="button"
          onClick={finish}
          className="mt-3 cursor-pointer text-[15px] text-[#a9adb3] underline underline-offset-4 hover:text-ink"
        >
          o entra directamente.
        </button>
        <span role="status" className="sr-only">
          {copied ? 'Comando copiado. Pégalo en la terminal y presiona Enter.' : ''}
        </span>
      </div>
    </div>
  );
}
