import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductoxService {
  private baseUrl = 'http://localhost:8080/api/Productox'; 
  private readonly _http = inject(HttpClient);
  // Método para obtener todos los Productoxs
  getProductoxs(): Observable<any> {
    return this._http.get(`${this.baseUrl}`);
  }
  // Método para obtener un Productox por ID
  getProductoxPorId(id: number): Observable<any> {
    return this._http.get(`${this.baseUrl}/${id}`);
  }
  // Método para crear un nuevo Productox
  crearProductox(item: any): Observable<any> {
    return this._http.post(this.baseUrl, item);
  }
  // Método para actualizar un Productox existente
  actualizarProductox(id: number, item: any): Observable<any> {
    return this._http.put(`${this.baseUrl}/${id}`, item);
  }
  // Método para eliminar un Productox por ID
  eliminarProductox(id: number): Observable<any> {
    return this._http.delete(`${this.baseUrl}/${id}`);
  }
}
