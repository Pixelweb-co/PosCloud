import { DetallePedido } from "./DetallePedido.model";

export interface Pedido {
    id: number | null; // Permitir null en id
    cliente: string;
    consecutivo: string;
    fecha: string;
    observaciones?: string; // Cambiado a opcional
    estado: string;
    tipo: string;
    vendedor: string;
    sucursal?: string; // Cambiado a opcional
    nroCajero?: string; // Cambiado a opcional
    total: number;
    detalles: DetallePedido[];
  }