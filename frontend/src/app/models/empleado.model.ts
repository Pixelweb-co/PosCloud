export interface Empleado {
  id?: number;
  nombre: string;
  apellido: string;
  tipoDocumento: string;
  numeroDocumento: string;
  telefono: string;
  email: string;
  direccion: string;
  ciudad: string;
  fechaNacimiento: Date;
  cargo: string;
  salario: number;
  fechaContratacion: Date;
  administradoraFondoPensiones: string;
  eps: string;
  fondoCesantias: string;
  cajaCompensacion: string;
  estado: string;  // Estado del empleado (activo/inactivo, etc.)
}
