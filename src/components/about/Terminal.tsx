/**
 * Consola interactiva de la sección "Sobre mí".
 * Agrega comandos en el objeto COMMANDS.
 */
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { prefersReducedMotion } from '@/lib/utils';

interface Entry {
  id: number;
  input?: string;
  output: ReactNode;
}

const Dim = ({ children }: { children: ReactNode }) => <span className="text-[#8d96a3]">{children}</span>;
const Ok = () => <span className="text-[#7ee787]">✓</span>;

const goTo = (id: string) =>
  window.setTimeout(
    () => document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' }),
    350,
  );

const COMMANDS: Record<string, () => ReactNode | null> = {
  ayuda: () => (
    <>
      <Dim>Comandos disponibles:</Dim>
      {'\n  sobre      quién soy\n  stack      con qué trabajo\n  valores    cómo construyo\n  proyectos  ir a la galería\n  contacto   ir a contacto\n  limpiar    borrar la consola'}
    </>
  ),
  sobre: () => (
    <>
      Santiago Velasco · Frontend + UI/UX{'\n'}
      <Dim>+3 años convirtiendo diseños de Figma en productos web.</Dim>
    </>
  ),
  stack: () => (
    <>
      <Ok /> React{'\n'}
      <Ok /> Next.js{'\n'}
      <Ok /> Astro{'\n'}
      <Ok /> TypeScript{'\n'}
      <Ok /> Tailwind CSS{'\n'}
      <Ok /> Figma
    </>
  ),
  valores: () => (
    <>
      rápido       <Dim>→ cada kilobyte cuenta</Dim>
      {'\n'}accesible    <Dim>→ teclado, contraste y lectores de pantalla</Dim>
      {'\n'}escalable    <Dim>→ componentes que crecen con el producto</Dim>
      {'\n'}mantenible   <Dim>→ código que otro equipo entiende</Dim>
    </>
  ),
  proyectos: () => {
    goTo('proyectos');
    return <Dim>Abriendo la galería…</Dim>;
  },
  contacto: () => {
    goTo('contacto');
    return <Dim>Vamos a contacto…</Dim>;
  },
  hola: () => '¡Hola! Gracias por pasar por aquí.',
  limpiar: () => null,
};
const ALIASES: Record<string, string> = { help: 'ayuda', clear: 'limpiar', cls: 'limpiar', about: 'sobre' };
const QUICK = ['ayuda', 'stack', 'valores', 'proyectos', 'contacto'];

let uid = 0;

export default function Terminal() {
  const [entries, setEntries] = useState<Entry[]>(() => [
    { id: ++uid, output: <Dim>Bienvenido. Escribe un comando o toca uno de abajo.</Dim> },
    { id: ++uid, input: 'sobre', output: COMMANDS.sobre() },
  ]);
  const [value, setValue] = useState('');
  const outRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    outRef.current?.scrollTo({ top: outRef.current.scrollHeight });
  }, [entries]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    const key = ALIASES[cmd] ?? cmd;
    if (key === 'limpiar') {
      setEntries([]);
      return;
    }
    const fn = COMMANDS[key];
    const output = fn ? (
      fn()
    ) : (
      <>
        <span className="text-[#ff8a80]">Comando no encontrado: {cmd}.</span> Escribe <span className="text-sel">ayuda</span>.
      </>
    );
    setEntries((e) => [...e, { id: ++uid, input: cmd, output }]);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    run(value);
    setValue('');
  };

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#090b0f] text-[#d5dae2] shadow-[0_30px_80px_rgba(0,0,0,0.4)] lg:sticky lg:top-24"
      data-layer="Terminal / Consola"
    >
      <div className="flex items-center gap-[7px] border-b border-white/[0.08] px-3.5 py-3 font-mono text-xs">
        <i className="size-2.5 rounded-full bg-[#3a404a]" />
        <i className="size-2.5 rounded-full bg-[#3a404a]" />
        <i className="size-2.5 rounded-full bg-[#3a404a]" />
        <span className="ml-2 text-[#8d96a3]">santiago@portafolio: ~</span>
      </div>

      <div
        ref={outRef}
        className="h-[300px] overflow-auto px-[18px] pt-4 pb-1.5 font-mono text-[13px] leading-[1.65] break-words whitespace-pre-wrap md:h-[330px] md:text-[13.5px]"
        aria-live="polite"
      >
        {entries.map((entry) => (
          <div key={entry.id} className="mb-3">
            {entry.input && (
              <div>
                <span className="text-sel">~ $</span> {entry.input}
              </div>
            )}
            <div>{entry.output}</div>
          </div>
        ))}
      </div>

      <form onSubmit={onSubmit} className="flex items-center gap-2 px-[18px] pt-2.5 pb-4 font-mono text-[13.5px]" autoComplete="off">
        <label htmlFor="terminal-input" className="whitespace-nowrap text-sel">
          ~ $
        </label>
        <input
          id="terminal-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          spellCheck={false}
          placeholder="escribe ayuda"
          aria-label="Comando de la terminal"
          className="min-w-0 flex-1 border-0 bg-transparent text-[16px] text-snow caret-sel outline-none placeholder:text-[#5b6370] md:text-[13.5px]"
        />
      </form>

      <div className="flex flex-wrap gap-1.5 px-[18px] pb-4">
        {QUICK.map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={() => run(cmd)}
            className="cursor-pointer rounded-md border border-white/[0.14] bg-transparent px-2.5 py-[7px] font-mono text-xs leading-none text-[#c9d0da] hover:border-sel hover:text-white"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}
