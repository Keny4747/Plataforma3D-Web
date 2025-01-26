export interface Estudiante {
  id?: number;
  nombre: string;
  apellido: string;
  email: string;
  username: string;
  password: string;
  telefono: string;
  dni: string;
  role: string;

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
