export interface Book {
  id?: number;
  title: string;
  description: string;
  unidadAprendizaje?: string;
  coverPath: string;
  filePath: string| null;
  createdAt?: Date;
}

export enum UnidadAprendizajeEnum {

  COMPOSICION_SERES_VIVOS = "'¿De qué estamos compuestos los seres vivos?'",
  ESTRUCTURA_CELULAR = "'Explicamos la estructura, características y funciones de la célula.'",
  NUTRICION_SERES_VIVOS = "'Comprendemos la importancia de la función de nutrición para los seres vivos.'",
  RELACION_Y_COORDINACION = "'Fundamentamos la función de relación y coordinación en los seres vivos.'",
  REPRODUCCION_SERES_VIVOS = "'Exploramos la función de reproducción en los seres vivos.'",
  VARIABILIDAD_GENETICA = "'Explicamos la variabilidad genetica a través de las leyes de Mendel.'",
  EVOLUCION_VIDA = "'Exploramos sobre la evolución de la vida en nuestro planeta'",
  EQUILIBRIO_ECOLOGICO = "'Proponemos acciones para mantener el Equilibrio ecológico'",
  ESPIRITU_MATERIA = "'Somos espíritu materia'",
  SOMOS_CARBONO = "'¿Somos carbono?'",
  SALUD_O_ALCOHOL = "'Salud o alcohol'",
  IMPORTANCIA_MAGNITUDES_FISICAS = "'Conocemos la importancia de las magnitudes físicas'",
  CINEMATICA = "'Explicamos la relación entre los elementos del movimiento de los cuerpos 'cinemática'  '",
  LEYES_NEWTON = "'Explicamos la dinámica a través de las leyes de Newton'",
  TRABAJO_POTENCIA_ENERGIA = "'Explicamos los fenómenos relacionados con el trabajo, la potencia y la energía'",
  PRINCIPIOS_FISICOS_LIQUIDOS = "'Analizamos los principios físicos que rigen el comportamiento de los líquidos en equilibrio'",
  VARIADOS = "'Varios'"
}
