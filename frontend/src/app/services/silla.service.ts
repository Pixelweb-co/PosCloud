import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class sillaService {
  private baseUrl = 'http://localhost:8080/api/silla'; 
  private readonly _http = inject(HttpClient);
  // Método para obtener todos los sillas
  getsillas(): Observable<any> {
    return this._http.get(`${this.baseUrl}`);
  }
  // Método para obtener un silla por ID
  getsillaPorId(id: number): Observable<any> {
    return this._http.get(`${this.baseUrl}/${id}`);
  }
  // Método para crear un nuevo silla
  crearsilla(item: any): Observable<any> {
    return this._http.post(this.baseUrl, item);
  }
  // Método para actualizar un silla existente
  actualizarsilla(id: number, item: any): Observable<any> {
    return this._http.put(`${this.baseUrl}/${id}`, item);
  }
  // Método para eliminar un silla por ID
  eliminarsilla(id: number): Observable<any> {
    return this._http.delete(`${this.baseUrl}/${id}`);
  }
}
