import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class mascotasService {
  private baseUrl = 'http://localhost:8080/api/mascotas'; 
  private readonly _http = inject(HttpClient);
  // Método para obtener todos los mascotass
  getmascotass(): Observable<any> {
    return this._http.get(`${this.baseUrl}`);
  }
  // Método para obtener un mascotas por ID
  getmascotasPorId(id: number): Observable<any> {
    return this._http.get(`${this.baseUrl}/${id}`);
  }
  // Método para crear un nuevo mascotas
  crearmascotas(item: any): Observable<any> {
    return this._http.post(this.baseUrl, item);
  }
  // Método para actualizar un mascotas existente
  actualizarmascotas(id: number, item: any): Observable<any> {
    return this._http.put(`${this.baseUrl}/${id}`, item);
  }
  // Método para eliminar un mascotas por ID
  eliminarmascotas(id: number): Observable<any> {
    return this._http.delete(`${this.baseUrl}/${id}`);
  }
}
