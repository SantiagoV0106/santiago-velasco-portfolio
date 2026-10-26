/**
 * Tipos de los proyectos de la galería.
 *
 * Mapa de archivos relacionados:
 *   - Datos ........... src/data/projects.ts
 *   - Galería ......... src/components/projects/Gallery.tsx        (filtros + scroll horizontal)
 *   - Tarjeta ......... src/components/projects/ProjectCard.tsx    (inclinación 3D, apertura del caso)
 *   - Vista previa .... src/components/projects/ProjectMock.tsx    (imagen, video o mock generado)
 *   - Detalle ......... src/components/projects/ProjectDialog.tsx  (ventana con el caso completo)
 */

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
  | { type: "image"; src: string; alt: string }
  | {
      type: "video";
      src: string;
      /** Imagen que se ve mientras el video carga */
      poster?: string;
      alt: string;
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
  sector: string;
  category: ProjectCategory;
  stack: string[];
  role: string;
  year?: number;
  summary: string;
  highlights: string[];
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
