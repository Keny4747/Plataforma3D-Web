export interface Estudiante {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  telefono: string;
  dni: string;

}

export interface Pageable {
  sort:       Sort;
  offset:     number;
  pageSize:   number;
  pageNumber: number;
  unpaged:    boolean;
  paged:      boolean;
}

export interface Sort {
  empty:    boolean;
  sorted:   boolean;
  unsorted: boolean;
}
