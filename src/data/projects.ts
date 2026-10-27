/**
 * ─────────────────────────────────────────────────────────────
 *  PROYECTOS DE LA GALERÍA
 * ─────────────────────────────────────────────────────────────
 *  Rutas de trabajo:
 *   - Tipos ........... src/types/project.ts
 *   - Galería ......... src/components/projects/Gallery.tsx
 *   - Tarjeta ......... src/components/projects/ProjectCard.tsx
 *   - Vista previa .... src/components/projects/ProjectMock.tsx
 *   - Detalle ......... src/components/projects/ProjectDialog.tsx
 *
 *  Idiomas: sector, role, summary, highlights y cover.alt llevan { es, en }.
 *  La etiqueta de `category` se traduce en src/i18n/ui.ts (gallery.categories).
 *
 *  Para usar una imagen o video real:
 *   1. Guarda el archivo en /public/projects/ (ej: /public/projects/nomada.webm)
 *   2. Agrega `cover` al proyecto:
 *        cover: { type: "video", src: "/projects/nomada.webm", poster: "/projects/nomada.webp", alt: { es: "...", en: "..." } }
 * ─────────────────────────────────────────────────────────────
 */
import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "transvego",
    name: "Transvego",
    sector: { es: "Transporte", en: "Transportation" },
    category: "Sitio web",
    stack: ["Astro", "Motion", "Figma"],
    role: { es: "Diseño UI y desarrollo frontend", en: "UI design and frontend development" },
    year: 2026,
    summary: {
      es: "Sitio web corporativo diseñado y desarrollado de principio a fin, desde los primeros conceptos en Figma hasta su implementación en producción.",
      en: "Corporate website designed and built end to end, from the first concepts in Figma to its release in production.",
    },
    highlights: {
      es: [
        "Diseño UI/UX desde la conceptualización hasta el prototipo en Figma",
        "Desarrollo frontend alineado con la identidad visual de la empresa",
        "Implementación de una experiencia web moderna y funcional",
      ],
      en: [
        "UI/UX design from early concepts to a Figma prototype",
        "Frontend development aligned with the company’s visual identity",
        "A modern, functional web experience",
      ],
    },
    links: { live: "https://transvego.com" },
    cover: {
      type: "video",
      src: "/projects/transvego.webm",
      poster: "/projects/transvego-cover.webp",
      alt: { es: "Sitio web de Transvego S.A.S", en: "Transvego S.A.S website" },
    },
    mock: {
      layout: "landing",
      palette: { bg: "#1E1D1B", accent: "#FF6B3D", ink: "#F4EFE8" },
    },
  },

  {
    slug: "campana-sergio-fajardo",
    name: "Campaña Sergio Fajardo",
    sector: { es: "Política", en: "Politics" },
    category: "Sitio web",
    year: 2026,
    stack: ["Next.js", "Motion", "ReactBits", "Figma"],
    role: { es: "Desarrollo frontend", en: "Frontend development" },
    summary: {
      es: "Sitio web de campaña desarrollado junto a Khaoscore para comunicar la propuesta política de Sergio Fajardo mediante una experiencia digital clara, accesible y alineada con la identidad visual de la campaña.",
      en: "Campaign website built with Khaoscore to communicate Sergio Fajardo’s political proposal through a clear, accessible digital experience aligned with the campaign’s visual identity.",
    },
    highlights: {
      es: [
        "Colaboración en el diseño, la estructura y la estética del sitio web",
        "Desarrollo de componentes frontend para comunicar la propuesta de campaña",
        "Enfoque en rendimiento, accesibilidad y navegación intuitiva",
      ],
      en: [
        "Collaboration on the website’s design, structure and look",
        "Frontend components built to communicate the campaign proposal",
        "Focus on performance, accessibility and intuitive navigation",
      ],
    },
    links: {
      live: "https://www.sergiofajardo.com/",
    },

    cover: {
      type: "video",
      src: "/projects/sergio-fajardo.webm",
      poster: "/projects/sergio-fajardo-cover.webp",
      alt: { es: "Sitio web de la campaña de Sergio Fajardo", en: "Sergio Fajardo campaign website" },
    },
    mock: {
      layout: "landing",
      palette: { bg: "#1E1D1B", accent: "#FF6B3D", ink: "#F4EFE8" },
    },
  },

  {
    slug: "khaoscore",
    name: "Khaoscore",
    sector: { es: "Agencia digital", en: "Digital agency" },
    category: "Sitio web",
    year: 2025,
    stack: ["Astro", "ReactBits", "Motion"],
    role: { es: "Desarrollo frontend", en: "Frontend development" },
    summary: {
      es: "Implementación frontend de sitios web y experiencias visuales para una agencia digital especializada en diseño.",
      en: "Frontend implementation of websites and visual experiences for a design-focused digital agency.",
    },
    highlights: {
      es: [
        "Desarrollo de interfaces y experiencias visuales interactivas",
        "Implementación de animaciones y transiciones con Motion",
        "Optimización de la usabilidad y el rendimiento del sitio web",
      ],
      en: [
        "Interactive interfaces and visual experiences",
        "Animations and transitions built with Motion",
        "Improved usability and site performance",
      ],
    },
    links: {
      live: "https://khaoscore.com",
    },
    cover: {
      type: "video",
      src: "/projects/khaos.webm",
      poster: "/projects/khaos-cover.webp",
      alt: { es: "Sitio web de Khaoscore", en: "Khaoscore website" },
    },
    mock: {
      layout: "landing",
      palette: { bg: "#1E1D1B", accent: "#FF6B3D", ink: "#F4EFE8" },
    },
  },

  {
    slug: "jazz-design-system",
    name: "Jazz Design System",
    sector: { es: "Foodtech", en: "Foodtech" },
    category: "UI/UX",
    year: 2024,
    stack: ["Figma"],
    role: { es: "Diseño UI/UX", en: "UI/UX design" },
    summary: {
      es: "Sistema de diseño para Blue Apron enfocado en establecer un lenguaje visual consistente y una biblioteca de componentes reutilizables para sus experiencias digitales.",
      en: "Design system for Blue Apron focused on a consistent visual language and a library of reusable components for its digital experiences.",
    },
    highlights: {
      es: [
        "Definición de componentes y patrones de interfaz reutilizables",
        "Organización de estilos visuales y jerarquías tipográficas",
        "Creación de una base escalable para mantener la consistencia entre interfaces",
      ],
      en: [
        "Reusable components and interface patterns",
        "Organized visual styles and type hierarchy",
        "A scalable foundation that keeps interfaces consistent",
      ],
    },
    links: {
      figma:
        "https://www.figma.com/design/R0euCPDfQnGlKY9JdyrK8o/Jazz-Design-System-for-Blue-Apron?node-id=0-1&p=f&t=9kzhkLih11VA8vwq-0",
    },
    cover: {
      type: "image",
      src: "/projects/jazz-cover.webp",
      alt: { es: "Jazz Design System", en: "Jazz Design System" },
    },
    mock: {
      layout: "landing",
      palette: { bg: "#1E1D1B", accent: "#FF6B3D", ink: "#F4EFE8" },
    },
  },

  {
    slug: "portal-conectmonos-eficacia",
    name: "Portal Conectémonos",
    sector: { es: "Recursos humanos", en: "Human resources" },
    category: "Plataforma",
    year: 2024,
    stack: ["Figma"],
    role: { es: "Diseño UI/UX", en: "UI/UX design" },
    summary: {
      es: "Plataforma digital para Eficacia orientada a conectar a los colaboradores con información y recursos de la organización mediante una experiencia centralizada y fácil de navegar.",
      en: "Digital platform for Eficacia that connects employees with company information and resources in one central, easy-to-navigate place.",
    },
    highlights: {
      es: [
        "Diseño de interfaces para facilitar el acceso a la información corporativa",
        "Organización visual de contenidos y recursos para los colaboradores",
        "Diseño de una experiencia intuitiva y coherente con la identidad de Eficacia",
      ],
      en: [
        "Interfaces that make company information easy to reach",
        "Visual organization of content and resources for employees",
        "An intuitive experience consistent with Eficacia’s identity",
      ],
    },
    links: {
      behance: "https://www.behance.net/gallery/201528415/Portal-Conectmonos-Eficacia",
    },
    cover: {
      type: "image",
      src: "/projects/portal-conectemonos-cover.webp",
      alt: { es: "Portal Conectémonos", en: "Conectémonos portal" },
    },
    mock: {
      layout: "landing",
      palette: { bg: "#1E1D1B", accent: "#FF6B3D", ink: "#F4EFE8" },
    },
  },

  {
    slug: "enerbit",
    name: "enerBit",
    sector: { es: "Energía", en: "Energy" },
    category: "Plataforma",
    year: 2023,
    stack: ["Figma"],
    role: { es: "Diseño UI/UX", en: "UI/UX design" },
    summary: {
      es: "Proyecto de diseño UI/UX para enerBit, enfocado en crear una experiencia digital clara e intuitiva dentro del sector energético, facilitando la interacción de los usuarios con la plataforma.",
      en: "UI/UX design project for enerBit, focused on a clear, intuitive digital experience in the energy sector that makes the platform easy to use.",
    },
    highlights: {
      es: [
        "Diseño de interfaces centradas en las necesidades de los usuarios",
        "Organización de la información para facilitar la navegación",
        "Desarrollo de propuestas visuales y prototipos en Figma",
      ],
      en: [
        "User-centered interface design",
        "Information architecture that eases navigation",
        "Visual proposals and prototypes in Figma",
      ],
    },
    links: {
      behance: "https://www.behance.net/gallery/185492437/enerBit-UIUX-Project",
    },
    cover: {
      type: "image",
      src: "/projects/enerbit-cover.webp",
      alt: { es: "enerBit", en: "enerBit" },
    },
    mock: {
      layout: "landing",
      palette: { bg: "#1E1D1B", accent: "#FF6B3D", ink: "#F4EFE8" },
    },
  },

  {
    slug: "hospital-padrino",
    name: "Hospital Padrino",
    sector: { es: "Salud", en: "Healthcare" },
    category: "Plataforma",
    year: 2022,
    stack: ["Figma"],
    role: { es: "Diseño UI/UX", en: "UI/UX design" },
    summary: {
      es: "Proyecto de diseño UI/UX enfocado en crear una experiencia digital para el sector salud, facilitando el acceso a la información mediante interfaces claras y una navegación intuitiva.",
      en: "UI/UX design project for the healthcare sector, making information easier to access through clear interfaces and intuitive navigation.",
    },
    highlights: {
      es: [
        "Diseño de interfaces centradas en las necesidades de los usuarios",
        "Definición de una estructura visual clara y accesible",
        "Prototipado de experiencias digitales en Figma",
      ],
      en: [
        "User-centered interface design",
        "A clear, accessible visual structure",
        "Digital experiences prototyped in Figma",
      ],
    },
    links: {
      behance: "https://www.behance.net/gallery/145695963/Hospital-Padrino-UIUX-Project",
    },
    cover: {
      type: "image",
      src: "/projects/hospital-padrino-cover.webp",
      alt: { es: "Hospital Padrino", en: "Hospital Padrino" },
    },
    mock: {
      layout: "landing",
      palette: { bg: "#1E1D1B", accent: "#FF6B3D", ink: "#F4EFE8" },
    },
  },
];
