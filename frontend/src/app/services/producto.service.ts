import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private baseUrl = 'http://localhost:8080/api/productos'; 

  private readonly _http = inject(HttpClient);

  // Método para obtener todos los productos
  getProductos(): Observable<any> {
    return this._http.get(`${this.baseUrl}`);
  }

  // Método para obtener un producto por ID
  getProductoPorId(id: number): Observable<any> {
    return this._http.get(`${this.baseUrl}/${id}`);
  }

  // Método para crear un nuevo producto
  crearProducto(producto: any): Observable<any> {
    return this._http.post(this.baseUrl, producto);
  }

  // Método para actualizar un producto existente
  actualizarProducto(id: number, producto: any): Observable<any> {
    return this._http.put(`${this.baseUrl}/${id}`, producto);
  }

  // Método para eliminar un producto por ID
  eliminarProducto(id: number): Observable<any> {
    return this._http.delete(`${this.baseUrl}/${id}`);
  }
}
