/**
 * ─────────────────────────────────────────────────────────────
 *  TEXTOS DEL SITIO (ES / EN)
 * ─────────────────────────────────────────────────────────────
 *  - Español vive en `/` y inglés en `/en/` (src/pages/index.astro y src/pages/en/index.astro).
 *  - `en` está tipado con la forma de `es`: si agregas un texto en español,
 *    TypeScript te pedirá su traducción.
 *  - Los textos de los proyectos están en src/data/projects.ts.
 *  - Los comandos de la terminal están en src/components/about/Terminal.tsx.
 * ─────────────────────────────────────────────────────────────
 */

export const languages = { es: 'Español', en: 'English' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'es';

/** Ruta de la página principal en cada idioma */
export const routes: Record<Lang, string> = { es: '/', en: '/en/' };

const es = {
  meta: {
    title: 'Santiago Velasco · Programador frontend y diseñador UI/UX',
    description:
      'Portafolio de Santiago Velasco, programador frontend y diseñador UI/UX. Convierto diseños de Figma en productos web rápidos, accesibles y escalables con React, Next.js y Astro.',
  },
  nav: {
    label: 'Principal',
    links: [
      { href: '#proceso', label: 'Proceso' },
      { href: '#proyectos', label: 'Proyectos' },
      { href: '#sobre', label: 'Sobre mí' },
      { href: '#contacto', label: 'Contacto' },
    ],
    langSwitch: 'Cambiar el idioma a inglés',
    inspect: 'Inspeccionar',
    inspectTitle: 'Muestra capas y medidas al pasar el cursor',
  },
  worlds: {
    label: 'Mundo',
    canvas: 'Lienzo',
    design: 'Diseño',
    code: 'Código',
    product: 'Producto',
    gallery: 'Galería',
    terminal: 'Terminal',
    contact: 'Contacto',
  },
  boot: {
    dialog: 'Creando el portafolio',
    skip: 'Saltar intro',
    project: 'Proyecto',
    template: 'Plantilla',
    installing: 'Instalando dependencias',
    installed: 'Dependencias instaladas',
    compiling: 'Compilando',
    components: 'Componentes',
    parts: ['Hero', 'Proceso', 'Galería', 'Terminal', 'Contacto'],
    ready: 'Listo en',
    opening: 'Abriendo portafolio…',
  },
  hero: {
    frame: 'Frame · Inicio',
    layerName: 'Texto / Nombre',
    layerIntro: 'Texto / Intro',
    layerActions: 'Grupo / Acciones',
    pickedOne: 'capa seleccionada',
    pickedMany: 'capas seleccionadas',
    lede: 'Programador frontend y diseñador UI/UX. Convierto diseños de Figma en productos web rápidos, accesibles y escalables.',
    ctaProjects: 'Ver proyectos',
    ctaContact: 'Hablemos',
    hint: 'Mueve el cursor sobre el nombre · Arrastra sobre el lienzo para seleccionar letras',
    peer: ['¡Hola! Bienvenido', 'Revisando espaciados…', 'Este frame va a producción', 'Mira los proyectos ↓'],
  },
  process: {
    eyebrow: 'Cómo trabajo',
    title: 'De Figma a producción',
    steps: [
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
        text: 'El mismo componente, ahora con contenido real. Respeta cada medida del diseño y queda listo para usarse.',
      },
    ],
    layer: 'Componente / ProjectCard',
    frameLabel: 'Card / Proyecto',
    finalLabel: 'Card / Proyecto · producción',
    autoLayout: 'Auto layout ↓ 16',
    published: 'Publicado',
    codeComment: '// gap: var(--space-4) → 16px, igual que en Figma',
    codeCta: 'Ver proyecto',
    card: {
      title: 'Transvego',
      text: 'Sitio corporativo para una empresa de transporte',
      tags: ['Astro', 'Motion', 'Figma'],
      cta: 'Ver proyecto →',
      imageAlt: 'Portada del sitio de Transvego',
    },
  },
  gallery: {
    eyebrow: 'Proyectos seleccionados',
    title: 'Galería',
    filtersLabel: 'Filtrar proyectos',
    all: 'Todos',
    filters: { 'Sitio web': 'Sitios web', Plataforma: 'Plataformas', 'UI/UX': 'UI/UX' },
    categories: { 'Sitio web': 'Sitio web', Plataforma: 'Plataforma', 'UI/UX': 'UI/UX' },
    note: 'Proyectos · Abre una tarjeta para ver el detalle',
    swipe: ' · Desliza para ver más',
    cardAria: 'Ver detalle',
    example: 'Ejemplo',
  },
  dialog: {
    close: 'Cerrar',
    role: 'Rol',
    stack: 'Stack',
    site: 'Sitio',
    live: 'Ver en vivo ↗',
    code: 'Código',
    repo: 'Repositorio ↗',
    behance: 'Ver Behance ↗',
    figma: 'Ver archivo Figma ↗',
    exampleNote: 'Contenido de ejemplo. Reemplázalo en src/data/projects.ts con el caso real.',
  },
  about: {
    eyebrow: 'Sobre mí',
    title: 'Hola, soy Santiago.',
    p1: 'Soy programador frontend y diseñador UI/UX. Me enfoco en crear productos valiosos: interfaces que se entienden a la primera y que cargan rápido.',
    p2: 'Llevo más de 3 años convirtiendo diseños de Figma en productos web rápidos, accesibles y escalables. Desarrollo con React, Next.js y Astro, con código limpio y mantenible, y he entregado sitios y plataformas para agencias y clientes de diversos sectores.',
    layerFacts: 'Lista / Datos',
    facts: [
      { label: 'Experiencia', value: 'Más de 3 años' },
      { label: 'Stack', value: 'React · Next.js · Astro' },
      { label: 'Diseño', value: 'Figma, UI y UX' },
      { label: 'Clientes', value: 'Agencias y empresas de diversos sectores' },
    ],
    ticker: ['React', 'Next.js', 'Astro', 'TypeScript', 'Tailwind CSS', 'Figma', 'Accesibilidad', 'Rendimiento'],
  },
  contact: {
    eyebrow: 'Contacto',
    title: '¿Construimos algo valioso?',
    layerTitle: 'Texto / Título contacto',
    copy: 'Copiar correo',
    copied: 'Copiado ✓',
    selected: 'Seleccionado: usa Ctrl/Cmd + C',
    cv: 'Hoja de vida (CV)',
    footerMade: 'Diseñado en Figma, construido con Astro y React',
    backToTop: 'Volver arriba ↑',
  },
};

export type UIStrings = typeof es;

const en: UIStrings = {
  meta: {
    title: 'Santiago Velasco · Frontend developer & UI/UX designer',
    description:
      'Portfolio of Santiago Velasco, frontend developer and UI/UX designer. I turn Figma designs into fast, accessible and scalable web products with React, Next.js and Astro.',
  },
  nav: {
    label: 'Main',
    links: [
      { href: '#proceso', label: 'Process' },
      { href: '#proyectos', label: 'Work' },
      { href: '#sobre', label: 'About' },
      { href: '#contacto', label: 'Contact' },
    ],
    langSwitch: 'Switch language to Spanish',
    inspect: 'Inspect',
    inspectTitle: 'Shows layers and measurements on hover',
  },
  worlds: {
    label: 'World',
    canvas: 'Canvas',
    design: 'Design',
    code: 'Code',
    product: 'Product',
    gallery: 'Gallery',
    terminal: 'Terminal',
    contact: 'Contact',
  },
  boot: {
    dialog: 'Creating the portfolio',
    skip: 'Skip intro',
    project: 'Project',
    template: 'Template',
    installing: 'Installing dependencies',
    installed: 'Dependencies installed',
    compiling: 'Compiling',
    components: 'Components',
    parts: ['Hero', 'Process', 'Gallery', 'Terminal', 'Contact'],
    ready: 'Done in',
    opening: 'Opening portfolio…',
  },
  hero: {
    frame: 'Frame · Home',
    layerName: 'Text / Name',
    layerIntro: 'Text / Intro',
    layerActions: 'Group / Actions',
    pickedOne: 'layer selected',
    pickedMany: 'layers selected',
    lede: 'Frontend developer and UI/UX designer. I turn Figma designs into fast, accessible and scalable web products.',
    ctaProjects: 'See projects',
    ctaContact: "Let's talk",
    hint: 'Move your cursor over the name · Drag on the canvas to select letters',
    peer: ['Hi! Welcome', 'Checking spacing…', 'This frame is going live', 'Check out the work ↓'],
  },
  process: {
    eyebrow: 'How I work',
    title: 'From Figma to production',
    steps: [
      {
        title: 'Design',
        text: 'I start from the Figma file: auto layout, variables and states. I check spacing, contrast and flows before writing any code.',
      },
      {
        title: 'Code',
        text: 'I turn each component into React, with clear props and styles that follow the design tokens.',
      },
      {
        title: 'Product',
        text: 'The same component, now with real content. It keeps every measurement from the design and is ready to use.',
      },
    ],
    layer: 'Component / ProjectCard',
    frameLabel: 'Card / Project',
    finalLabel: 'Card / Project · production',
    autoLayout: 'Auto layout ↓ 16',
    published: 'Live',
    codeComment: '// gap: var(--space-4) → 16px, same as in Figma',
    codeCta: 'View project',
    card: {
      title: 'Transvego',
      text: 'Corporate website for a transportation company',
      tags: ['Astro', 'Motion', 'Figma'],
      cta: 'View project →',
      imageAlt: 'Transvego website cover',
    },
  },
  gallery: {
    eyebrow: 'Selected work',
    title: 'Gallery',
    filtersLabel: 'Filter projects',
    all: 'All',
    filters: { 'Sitio web': 'Websites', Plataforma: 'Platforms', 'UI/UX': 'UI/UX' },
    categories: { 'Sitio web': 'Website', Plataforma: 'Platform', 'UI/UX': 'UI/UX' },
    note: 'Projects · Open a card to see the details',
    swipe: ' · Swipe to see more',
    cardAria: 'View details',
    example: 'Example',
  },
  dialog: {
    close: 'Close',
    role: 'Role',
    stack: 'Stack',
    site: 'Website',
    live: 'See it live ↗',
    code: 'Code',
    repo: 'Repository ↗',
    behance: 'View on Behance ↗',
    figma: 'Open Figma file ↗',
    exampleNote: 'Sample content. Replace it in src/data/projects.ts with the real case.',
  },
  about: {
    eyebrow: 'About me',
    title: "Hi, I'm Santiago.",
    p1: 'I’m a frontend developer and UI/UX designer. I focus on building valuable products: interfaces that make sense at first glance and load fast.',
    p2: 'For more than 3 years I’ve been turning Figma designs into fast, accessible and scalable web products. I build with React, Next.js and Astro, writing clean, maintainable code, and I’ve shipped websites and platforms for agencies and clients across many industries.',
    layerFacts: 'List / Facts',
    facts: [
      { label: 'Experience', value: '3+ years' },
      { label: 'Stack', value: 'React · Next.js · Astro' },
      { label: 'Design', value: 'Figma, UI and UX' },
      { label: 'Clients', value: 'Agencies and companies across many industries' },
    ],
    ticker: ['React', 'Next.js', 'Astro', 'TypeScript', 'Tailwind CSS', 'Figma', 'Accessibility', 'Performance'],
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Shall we build something valuable?',
    layerTitle: 'Text / Contact title',
    copy: 'Copy email',
    copied: 'Copied ✓',
    selected: 'Selected: press Ctrl/Cmd + C',
    cv: 'Resume (CV)',
    footerMade: 'Designed in Figma, built with Astro and React',
    backToTop: 'Back to top ↑',
  },
};

export const ui: Record<Lang, UIStrings> = { es, en };

export const t = (lang: Lang): UIStrings => ui[lang];

/** Elige el valor según el idioma en datos con forma { es, en } */
export type Localized<T = string> = Record<Lang, T>;
export const pick = <T,>(value: Localized<T>, lang: Lang): T => value[lang];
