import * as e from "cors";

export interface Modelo3D {
  id?: number;
  nombre: string;
  url?: string;
  esExterno?: boolean;
  descripcion: string;
  unidadAprendizaje?: string;
  embedCode?: string;
  subidoPor?: string;
  coverPath?: string;

}
export interface Modelo3DGenerado {
  id?: string;
  nombre: string;
  url: string;
}
