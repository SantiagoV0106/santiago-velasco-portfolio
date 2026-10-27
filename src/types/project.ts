/**
 * Tipos de los proyectos de la galería.
 *
 * Mapa de archivos relacionados:
 *   - Datos ........... src/data/projects.ts
 *   - Galería ......... src/components/projects/Gallery.tsx        (filtros + scroll horizontal)
 *   - Tarjeta ......... src/components/projects/ProjectCard.tsx    (inclinación 3D, apertura del caso)
 *   - Vista previa .... src/components/projects/ProjectMock.tsx    (imagen, video o mock generado)
 *   - Detalle ......... src/components/projects/ProjectDialog.tsx  (ventana con el caso completo)
 *
 * Textos traducibles: los campos con tipo `Localized` llevan { es: "...", en: "..." }.
 */
import type { Localized } from "@/i18n/ui";

export type ProjectCategory = "Sitio web" | "Plataforma" | "UI/UX";

/** Distribución del mock generado cuando el proyecto aún no tiene imagen o video. */
export type MockLayout = "landing" | "dashboard" | "mobile" | "shop";

export interface ProjectPalette {
  /** Fondo del mock */
  bg: string;
  /** Color de acento (botones, gráficas) */
  accent: string;
  /** Color de texto/bloques */
  ink: string;
}

/** Medio real del proyecto. Si existe, reemplaza al mock generado. */
export type ProjectMedia =
  | { type: "image"; src: string; alt: Localized }
  | {
      type: "video";
      src: string;
      /** Imagen que se ve mientras el video carga */
      poster?: string;
      alt: Localized;
    };

export interface ProjectLinks {
  live?: string;
  repo?: string;
  figma?: string;
  behance?: string;
}

export interface Project {
  /** Identificador único, útil si luego creas páginas /proyectos/[slug] */
  slug: string;
  name: string;
  sector: Localized;
  /** Se usa para filtrar; su etiqueta traducida está en src/i18n/ui.ts → gallery.categories */
  category: ProjectCategory;
  stack: string[];
  role: Localized;
  year?: number;
  summary: Localized;
  highlights: Localized<string[]>;
  links?: ProjectLinks;
  /** Portada real (imagen o video). Guarda los archivos en /public/projects/ */
  cover?: ProjectMedia;
  /** Mock generado con CSS, se usa cuando no hay `cover` */
  mock: {
    layout: MockLayout;
    palette: ProjectPalette;
    /** Alturas (0-100) de las barras para el layout 'dashboard' */
    bars?: number[];
  };
  /** Marca la tarjeta con la etiqueta "Ejemplo" */
  isExample?: boolean;
}
