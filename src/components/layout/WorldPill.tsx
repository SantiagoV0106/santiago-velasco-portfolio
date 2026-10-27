/**
 * Indicador fijo del "mundo" actual + etiqueta "Tú" que sigue al cursor.
 * Ambos se actualizan desde src/scripts/scene.ts (sin JS de React).
 */
import { t, type Lang } from '@/i18n/ui';

export default function WorldPill({ lang }: { lang: Lang }) {
  const worlds = t(lang).worlds;
  return (
    <>
      <div
        className="fixed bottom-[calc(16px+env(safe-area-inset-bottom,0px))] left-[max(16px,env(safe-area-inset-left,0px))] z-40 flex items-center gap-2 rounded-full bg-fg px-3 py-2 font-mono text-xs text-world transition-colors duration-700"
        aria-live="polite"
      >
        <b className="size-[7px] rounded-full bg-sel" />
        {worlds.label} · <span data-world-name>{worlds.canvas}</span>
      </div>
      <div
        className="pointer-events-none fixed top-0 left-0 z-[70] rounded-[0_8px_8px_8px] bg-sel px-2 py-1.5 text-xs leading-none font-semibold text-white opacity-0 transition-opacity duration-300 will-change-transform"
        data-me
        aria-hidden="true"
      >
        {lang === 'es' ? 'Tú' : 'You'}
      </div>
    </>
  );
}
