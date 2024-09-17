export interface DetallePedido {
    id: number | null; 
    idProducto: number;
    nombre:string;
    cantidad: number;
    precioVenta: number;
    observaciones: string;
  }
  