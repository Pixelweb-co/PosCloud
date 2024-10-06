import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class Productox2Service {
  private baseUrl = 'http://localhost:8080/api/Productox2'; 
  private readonly _http = inject(HttpClient);
  // Método para obtener todos los Productox2s
  getProductox2s(): Observable<any> {
    return this._http.get(`${this.baseUrl}`);
  }
  // Método para obtener un Productox2 por ID
  getProductox2PorId(id: number): Observable<any> {
    return this._http.get(`${this.baseUrl}/${id}`);
  }
  // Método para crear un nuevo Productox2
  crearProductox2(item: any): Observable<any> {
    return this._http.post(this.baseUrl, item);
  }
  // Método para actualizar un Productox2 existente
  actualizarProductox2(id: number, item: any): Observable<any> {
    return this._http.put(`${this.baseUrl}/${id}`, item);
  }
  // Método para eliminar un Productox2 por ID
  eliminarProductox2(id: number): Observable<any> {
    return this._http.delete(`${this.baseUrl}/${id}`);
  }
}
