/**
 * Consola interactiva de la sección "Sobre mí".
 * - Cada comando tiene un id interno y un nombre por idioma (NAMES).
 * - Se aceptan los nombres en ambos idiomas (ej: "ayuda" y "help").
 * - Para agregar un comando: súmalo a CommandId, NAMES y buildCommands.
 */
import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { prefersReducedMotion } from '@/lib/utils';
import type { Lang } from '@/i18n/ui';

type CommandId = 'help' | 'about' | 'stack' | 'values' | 'projects' | 'contact' | 'hi' | 'clear';

interface Entry {
  id: number;
  input?: string;
  output: ReactNode;
}

const NAMES: Record<Lang, Record<CommandId, string>> = {
  es: {
    help: 'ayuda',
    about: 'sobre',
    stack: 'stack',
    values: 'valores',
    projects: 'proyectos',
    contact: 'contacto',
    hi: 'hola',
    clear: 'limpiar',
  },
  en: {
    help: 'help',
    about: 'about',
    stack: 'stack',
    values: 'values',
    projects: 'projects',
    contact: 'contact',
    hi: 'hi',
    clear: 'clear',
  },
};

/** nombre escrito → id (acepta ambos idiomas y algunos alias) */
const LOOKUP: Record<string, CommandId> = { cls: 'clear', hello: 'hi' };
for (const names of Object.values(NAMES)) {
  for (const [id, name] of Object.entries(names)) LOOKUP[name] = id as CommandId;
}

const QUICK: CommandId[] = ['help', 'stack', 'values', 'projects', 'contact'];

type Described = 'about' | 'stack' | 'values' | 'projects' | 'contact' | 'clear';

interface TerminalText {
  welcome: string;
  available: string;
  descriptions: Record<Described, string>;
  about: string;
  values: [word: string, description: string][];
  toProjects: string;
  toContact: string;
  hi: string;
  notFound: string;
  type: string;
  placeholder: string;
  inputLabel: string;
  title: string;
}

const TEXT: Record<Lang, TerminalText> = {
  es: {
    welcome: 'Bienvenido. Escribe un comando o toca uno de abajo.',
    available: 'Comandos disponibles:',
    descriptions: {
      about: 'quién soy',
      stack: 'con qué trabajo',
      values: 'cómo construyo',
      projects: 'ir a la galería',
      contact: 'ir a contacto',
      clear: 'borrar la consola',
    },
    about: '+3 años convirtiendo diseños de Figma en productos web.',
    values: [
      ['rápido', 'cada kilobyte cuenta'],
      ['accesible', 'teclado, contraste y lectores de pantalla'],
      ['escalable', 'componentes que crecen con el producto'],
      ['mantenible', 'código que otro equipo entiende'],
    ],
    toProjects: 'Abriendo la galería…',
    toContact: 'Vamos a contacto…',
    hi: '¡Hola! Gracias por pasar por aquí.',
    notFound: 'Comando no encontrado',
    type: 'Escribe',
    placeholder: 'escribe ayuda',
    inputLabel: 'Comando de la terminal',
    title: 'santiago@portafolio: ~',
  },
  en: {
    welcome: 'Welcome. Type a command or tap one below.',
    available: 'Available commands:',
    descriptions: {
      about: 'who I am',
      stack: 'what I work with',
      values: 'how I build',
      projects: 'go to the gallery',
      contact: 'go to contact',
      clear: 'clear the console',
    },
    about: '3+ years turning Figma designs into web products.',
    values: [
      ['fast', 'every kilobyte counts'],
      ['accessible', 'keyboard, contrast and screen readers'],
      ['scalable', 'components that grow with the product'],
      ['maintainable', 'code another team can understand'],
    ],
    toProjects: 'Opening the gallery…',
    toContact: 'Heading to contact…',
    hi: 'Hi! Thanks for stopping by.',
    notFound: 'Command not found',
    type: 'Type',
    placeholder: 'type help',
    inputLabel: 'Terminal command',
    title: 'santiago@portfolio: ~',
  },
};

const Dim = ({ children }: { children: ReactNode }) => <span className="text-[#8d96a3]">{children}</span>;
const Ok = () => <span className="text-[#7ee787]">✓</span>;

const goTo = (id: string) =>
  window.setTimeout(
    () => document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' }),
    350,
  );

function buildCommands(lang: Lang): Record<CommandId, () => ReactNode | null> {
  const tx = TEXT[lang];
  const names = NAMES[lang];
  const pad = Math.max(...Object.values(names).map((n) => n.length)) + 2;
  const valuePad = Math.max(...tx.values.map(([w]) => w.length)) + 3;

  return {
    help: () => (
      <>
        <Dim>{tx.available}</Dim>
        {(Object.keys(tx.descriptions) as Described[])
          .map((id) => `\n  ${names[id].padEnd(pad, ' ')}${tx.descriptions[id]}`)
          .join('')}
      </>
    ),
    about: () => (
      <>
        Santiago Velasco · Frontend + UI/UX{'\n'}
        <Dim>{tx.about}</Dim>
      </>
    ),
    stack: () => (
      <>
        {['React', 'Next.js', 'Astro', 'TypeScript', 'Tailwind CSS', 'Figma'].map((s, i, all) => (
          <span key={s}>
            <Ok /> {s}
            {i < all.length - 1 ? '\n' : ''}
          </span>
        ))}
      </>
    ),
    values: () => (
      <>
        {tx.values.map(([word, desc], i) => (
          <span key={word}>
            {i > 0 ? '\n' : ''}
            {word.padEnd(valuePad, ' ')}
            <Dim>→ {desc}</Dim>
          </span>
        ))}
      </>
    ),
    projects: () => {
      goTo('proyectos');
      return <Dim>{tx.toProjects}</Dim>;
    },
    contact: () => {
      goTo('contacto');
      return <Dim>{tx.toContact}</Dim>;
    },
    hi: () => tx.hi,
    clear: () => null,
  };
}

let uid = 0;

export default function Terminal({ lang }: { lang: Lang }) {
  const tx = TEXT[lang];
  const names = NAMES[lang];
  const commands = useMemo(() => buildCommands(lang), [lang]);

  const [entries, setEntries] = useState<Entry[]>(() => [
    { id: ++uid, output: <Dim>{tx.welcome}</Dim> },
    { id: ++uid, input: names.about, output: commands.about() },
  ]);
  const [value, setValue] = useState('');
  const outRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    outRef.current?.scrollTo({ top: outRef.current.scrollHeight });
  }, [entries]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    const id = LOOKUP[cmd];
    if (id === 'clear') {
      setEntries([]);
      return;
    }
    const output = id ? (
      commands[id]()
    ) : (
      <>
        <span className="text-[#ff8a80]">
          {tx.notFound}: {cmd}.
        </span>{' '}
        {tx.type} <span className="text-sel">{names.help}</span>.
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
      data-layer="Terminal"
    >
      <div className="flex items-center gap-[7px] border-b border-white/[0.08] px-3.5 py-3 font-mono text-xs">
        <i className="size-2.5 rounded-full bg-[#3a404a]" />
        <i className="size-2.5 rounded-full bg-[#3a404a]" />
        <i className="size-2.5 rounded-full bg-[#3a404a]" />
        <span className="ml-2 text-[#8d96a3]">{tx.title}</span>
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
          placeholder={tx.placeholder}
          aria-label={tx.inputLabel}
          className="min-w-0 flex-1 border-0 bg-transparent text-[16px] text-snow caret-sel outline-none placeholder:text-[#5b6370] md:text-[13.5px]"
        />
      </form>

      <div className="flex flex-wrap gap-1.5 px-[18px] pb-4">
        {QUICK.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => run(names[id])}
            className="cursor-pointer rounded-md border border-white/[0.14] bg-transparent px-2.5 py-[7px] font-mono text-xs leading-none text-[#c9d0da] hover:border-sel hover:text-white"
          >
            {names[id]}
          </button>
        ))}
      </div>
    </div>
  );
}
