/**
 * ─────────────────────────────────────────────────────────────
 *  PROYECTOS DE LA GALERÍA (contenido de ejemplo)
 * ─────────────────────────────────────────────────────────────
 *  Reemplaza estos datos por tus casos reales.
 *
 *  Rutas de trabajo:
 *   - Tipos ........... src/types/project.ts
 *   - Galería ......... src/components/projects/Gallery.tsx
 *   - Tarjeta ......... src/components/projects/ProjectCard.tsx
 *   - Vista previa .... src/components/projects/ProjectMock.tsx
 *   - Detalle ......... src/components/projects/ProjectDialog.tsx
 *
 *  Para usar una imagen o video real:
 *   1. Guarda el archivo en /public/projects/ (ej: /public/projects/nomada.mp4)
 *   2. Agrega `cover` al proyecto:
 *        cover: { type: 'video', src: '/projects/nomada.mp4', poster: '/projects/nomada.jpg', alt: '...' }
 *   3. Quita `isExample: true`
 * ─────────────────────────────────────────────────────────────
 */
import type { Project } from '@/types/project';

export const projects: Project[] = [
  {
    slug: 'nomada-estudio',
    name: 'Nómada Estudio',
    sector: 'Agencia creativa',
    category: 'Sitio web',
    stack: ['Astro', 'Figma'],
    role: 'Diseño UI y desarrollo frontend',
    summary:
      'Sitio institucional para una agencia que necesitaba mostrar su trabajo con imágenes grandes sin sacrificar velocidad.',
    highlights: [
      'Páginas estáticas con Astro y carga diferida de imágenes',
      'Plantilla reutilizable para casos de estudio',
      'Animaciones de entrada que respetan el movimiento reducido',
    ],
    mock: { layout: 'landing', palette: { bg: '#1E1D1B', accent: '#FF6B3D', ink: '#F4EFE8' } },
    isExample: true,
  },
  {
    slug: 'cuenta-clara',
    name: 'Cuenta Clara',
    sector: 'Fintech',
    category: 'Plataforma',
    stack: ['Next.js', 'React'],
    role: 'Desarrollo frontend',
    summary: 'Panel para que pequeñas empresas sigan sus ingresos y gastos en un solo lugar.',
    highlights: [
      'Gráficas y tablas navegables con teclado',
      'Estados de carga, vacío y error diseñados desde Figma',
      'Librería de componentes compartida con producto',
    ],
    mock: {
      layout: 'dashboard',
      palette: { bg: '#EEF3EF', accent: '#1F8A5B', ink: '#0F1F18' },
      bars: [40, 62, 48, 80, 66, 92, 74],
    },
    isExample: true,
  },
  {
    slug: 'turno',
    name: 'Turno',
    sector: 'Salud',
    category: 'UI/UX',
    stack: ['Figma'],
    role: 'Diseño UI/UX',
    summary: 'Flujo de agendamiento de citas médicas pensado para personas mayores.',
    highlights: [
      'Pruebas con usuarios y mapa del flujo',
      'Prototipo navegable en Figma',
      'Texto grande y contraste AA en todas las pantallas',
    ],
    mock: { layout: 'mobile', palette: { bg: '#DCE6FF', accent: '#2B59F0', ink: '#0B1533' } },
    isExample: true,
  },
  {
    slug: 'lana-y-lino',
    name: 'Lana & Lino',
    sector: 'Moda',
    category: 'Sitio web',
    stack: ['Next.js', 'React'],
    role: 'Desarrollo frontend',
    summary: 'Tienda en línea para una marca de ropa en fibras naturales.',
    highlights: ['Catálogo con filtros instantáneos', 'Fichas de producto pensadas para SEO', 'Checkout con menos pasos'],
    mock: { layout: 'shop', palette: { bg: '#EFE6DA', accent: '#B4532A', ink: '#2A1C14' } },
    isExample: true,
  },
  {
    slug: 'fogon-23',
    name: 'Fogón 23',
    sector: 'Restaurante',
    category: 'Sitio web',
    stack: ['Astro'],
    role: 'Diseño y desarrollo',
    summary: 'Sitio con menú, horarios y reservas para un restaurante de cocina a la brasa.',
    highlights: [
      'Menú editable sin tocar código',
      'Formulario de reservas accesible',
      'Puntaje de 100 en Lighthouse como objetivo',
    ],
    mock: { layout: 'landing', palette: { bg: '#2B0F0A', accent: '#F2A541', ink: '#FBE9D0' } },
    isExample: true,
  },
  {
    slug: 'aula-viva',
    name: 'Aula Viva',
    sector: 'Educación',
    category: 'Plataforma',
    stack: ['React', 'Figma'],
    role: 'Design system y frontend',
    summary: 'Plataforma de cursos en línea con un sistema de diseño compartido entre Figma y React.',
    highlights: [
      'Tokens de color, tipografía y espaciado sincronizados',
      'Componentes documentados con sus estados',
      'Vista de progreso para estudiantes',
    ],
    mock: {
      layout: 'dashboard',
      palette: { bg: '#1A1640', accent: '#7CE0C3', ink: '#EDEBFF' },
      bars: [30, 45, 70, 58, 84, 77, 95],
    },
    isExample: true,
  },
];
