export interface Producto {
    id?: number;          // ID del producto, opcional si no se está creando un nuevo producto
    categoria: string;   // ID de la categoría del producto
    sku: string;         // SKU del producto
    nombre: string;      // Nombre del producto
    descripcion: string; // Descripción del producto
    valor: number;       // Valor del producto
    estado: string;      // Estado del producto, por ejemplo, "Activo" o "Inactivo"
    stock: number;       // Cantidad en stock del producto
  }
  