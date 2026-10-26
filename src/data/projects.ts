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
import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "transvego",
    name: "Transvego",
    sector: "Transporte",
    category: "Sitio web",
    stack: ["Astro", "Motion", "Figma"],
    role: "Diseño UI y desarrollo frontend",
    year: 2026,
    summary:
      "Sitio web corporativo diseñado y desarrollado de principio a fin, desde los primeros conceptos en Figma hasta su implementación en producción.",
    highlights: [
      "Diseño UI/UX desde la conceptualización hasta el prototipo en Figma",
      "Desarrollo frontend alineado con la identidad visual de la empresa",
      "Implementación de una experiencia web moderna y funcional",
    ],
    links: { live: "https://transvego.com" },
    cover: {
      type: "video",
      src: "/projects/transvego.webm",
      poster: "/projects/transvego-cover.webp",
      alt: "Transvego S.A.S",
    },
    mock: {
      layout: "landing",
      palette: { bg: "#1E1D1B", accent: "#FF6B3D", ink: "#F4EFE8" },
    },
  },

  {
    slug: "campana-sergio-fajardo",
    name: "Campaña Sergio Fajardo",
    sector: "Política",
    category: "Sitio web",
    year: 2026,
    stack: ["Next.js", "Motion", "ReactBits", "Figma"],
    role: "Desarrollo frontend",
    summary:
      "Sitio web de campaña desarrollado junto a Khaoscore para comunicar la propuesta política de Sergio Fajardo mediante una experiencia digital clara, accesible y alineada con la identidad visual de la campaña.",
    highlights: [
      "Colaboración en el diseño, la estructura y la estética del sitio web",
      "Desarrollo de componentes frontend para comunicar la propuesta de campaña",
      "Enfoque en rendimiento, accesibilidad y navegación intuitiva",
    ],
    links: {
      live: "https://www.sergiofajardo.com/",
    },

    cover: {
      type: "video",
      src: "/projects/sergio-fajardo.webm",
      poster: "/projects/sergio-fajardo-cover.webp",
      alt: "Campaña Sergio Fajardo",
    },
    mock: {
      layout: "landing",
      palette: { bg: "#1E1D1B", accent: "#FF6B3D", ink: "#F4EFE8" },
    },
  },

  {
    slug: "khaoscore",
    name: "Khaoscore",
    sector: "Agencia digital",
    category: "Sitio web",
    year: 2025,
    stack: ["Astro", "ReactBits", "Motion"],
    role: "Desarrollo frontend",
    summary:
      "Implementación frontend de sitios web y experiencias visuales para una agencia digital especializada en diseño.",
    highlights: [
      "Desarrollo de interfaces y experiencias visuales interactivas",
      "Implementación de animaciones y transiciones con Motion",
      "Optimización de la usabilidad y el rendimiento del sitio web",
    ],
    links: {
      live: "https://khaoscore.com",
    },
    cover: {
      type: "video",
      src: "/projects/khaos.webm",
      poster: "/projects/khaos-cover.webp",
      alt: "Khaoscore",
    },
    mock: {
      layout: "landing",
      palette: { bg: "#1E1D1B", accent: "#FF6B3D", ink: "#F4EFE8" },
    },
  },

  {
    slug: "jazz-design-system",
    name: "Jazz Design System",
    sector: "Foodtech",
    category: "UI/UX",
    year: 2024,
    stack: ["Figma"],
    role: "Diseño UI/UX",
    summary:
      "Sistema de diseño para Blue Apron enfocado en establecer un lenguaje visual consistente y una biblioteca de componentes reutilizables para sus experiencias digitales.",
    highlights: [
      "Definición de componentes y patrones de interfaz reutilizables",
      "Organización de estilos visuales y jerarquías tipográficas",
      "Creación de una base escalable para mantener la consistencia entre interfaces",
    ],
    links: {
      figma:
        "https://www.figma.com/design/R0euCPDfQnGlKY9JdyrK8o/Jazz-Design-System-for-Blue-Apron?node-id=0-1&p=f&t=9kzhkLih11VA8vwq-0",
    },
    cover: {
      type: "image",
      src: "projects/jazz-cover.webp",
      alt: "Jazz",
    },
    mock: {
      layout: "landing",
      palette: { bg: "#1E1D1B", accent: "#FF6B3D", ink: "#F4EFE8" },
    },
  },

  {
    slug: "portal-conectmonos-eficacia",
    name: "Portal Conectémonos",
    sector: "Recursos humanos",
    category: "Plataforma",
    year: 2024,
    stack: ["Figma"],
    role: "Diseño UI/UX",
    summary:
      "Plataforma digital para Eficacia orientada a conectar a los colaboradores con información y recursos de la organización mediante una experiencia centralizada y fácil de navegar.",
    highlights: [
      "Diseño de interfaces para facilitar el acceso a la información corporativa",
      "Organización visual de contenidos y recursos para los colaboradores",
      "Diseño de una experiencia intuitiva y coherente con la identidad de Eficacia",
    ],
    links: {
      behance:
        "https://www.behance.net/gallery/201528415/Portal-Conectmonos-Eficacia",
    },
    cover: {
      type: "image",
      src: "projects/portal-conectemonos-cover.webp",
      alt: "Portal Conectémenos",
    },
    mock: {
      layout: "landing",
      palette: { bg: "#1E1D1B", accent: "#FF6B3D", ink: "#F4EFE8" },
    },
  },

  {
    slug: "enerbit",
    name: "enerBit",
    sector: "Energía",
    category: "Plataforma",
    year: 2023,
    stack: ["Figma"],
    role: "Diseño UI/UX",
    summary:
      "Proyecto de diseño UI/UX para enerBit, enfocado en crear una experiencia digital clara e intuitiva dentro del sector energético, facilitando la interacción de los usuarios con la plataforma.",
    highlights: [
      "Diseño de interfaces centradas en las necesidades de los usuarios",
      "Organización de la información para facilitar la navegación",
      "Desarrollo de propuestas visuales y prototipos en Figma",
    ],
    links: {
      behance: "https://www.behance.net/gallery/185492437/enerBit-UIUX-Project",
    },
    cover: {
      type: "image",
      src: "projects/enerbit-cover.webp",
      alt: "enerBit",
    },
    mock: {
      layout: "landing",
      palette: { bg: "#1E1D1B", accent: "#FF6B3D", ink: "#F4EFE8" },
    },
  },

  {
    slug: "hospital-padrino",
    name: "Hospital Padrino",
    sector: "Salud",
    category: "Plataforma",
    year: 2022,
    stack: ["Figma"],
    role: "Diseño UI/UX",
    summary:
      "Proyecto de diseño UI/UX enfocado en crear una experiencia digital para el sector salud, facilitando el acceso a la información mediante interfaces claras y una navegación intuitiva.",
    highlights: [
      "Diseño de interfaces centradas en las necesidades de los usuarios",
      "Definición de una estructura visual clara y accesible",
      "Prototipado de experiencias digitales en Figma",
    ],
    links: {
      behance:
        "https://www.behance.net/gallery/145695963/Hospital-Padrino-UIUX-Project",
    },
    cover: {
      type: "image",
      src: "projects/hospital-padrino-cover.webp",
      alt: "Hospital Padrino",
    },
    mock: {
      layout: "landing",
      palette: { bg: "#1E1D1B", accent: "#FF6B3D", ink: "#F4EFE8" },
    },
  },
];
