/**
 * Correo visible + botón para copiarlo.
 * El correo se muestra como texto seleccionable y también como enlace mailto.
 */
import { useRef, useState } from 'react';
import { copyText } from '@/lib/utils';
import { t, type Lang } from '@/i18n/ui';

export default function CopyEmail({ email, lang }: { email: string; lang: Lang }) {
  const text = t(lang).contact;
  const [status, setStatus] = useState('');
  const mailRef = useRef<HTMLAnchorElement>(null);

  const copy = async () => {
    if (await copyText(email)) {
      setStatus(text.copied);
      window.setTimeout(() => setStatus(''), 2400);
      return;
    }
    // Sin acceso al portapapeles: seleccionamos el texto para copiarlo a mano
    const node = mailRef.current;
    if (node) {
      const range = document.createRange();
      range.selectNodeContents(node);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
    setStatus(text.selected);
  };

  return (
    <div className="mt-12 flex flex-wrap items-center gap-3.5 md:mt-14">
      <a
        ref={mailRef}
        href={`mailto:${email}`}
        className="border-b-2 border-fg pb-1 text-[clamp(18px,2.4vw,30px)] leading-tight font-semibold break-all no-underline"
      >
        {email}
      </a>
      <button type="button" className="btn btn-primary" onClick={copy}>
        {text.copy}
      </button>
      <span className="font-mono text-[13px]" role="status">
        {status}
      </span>
    </div>
  );
}
