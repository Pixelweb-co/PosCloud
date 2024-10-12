import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FondoCesantiasService {

  private baseUrl = 'http://localhost:8080/api/fondocesantias'; 

  private readonly _http = inject(HttpClient);

  // Método para obtener todos los FondoCesantiass
  getFondoCesantiass(): Observable<any> {
    return this._http.get(`${this.baseUrl}`);
  }

  // Método para obtener un FondoCesantias por ID
  getFondoCesantiasPorId(id: number): Observable<any> {
    return this._http.get(`${this.baseUrl}/${id}`);
  }

  // Método para crear un nuevo FondoCesantias
  crearFondoCesantias(item: any): Observable<any> {
    return this._http.post(this.baseUrl, item);
  }

  // Método para actualizar un FondoCesantias existente
  actualizarFondoCesantias(id: number, item: any): Observable<any> {
    return this._http.put(`${this.baseUrl}/${id}`, item);
  }

  // Método para eliminar un FondoCesantias por ID
  eliminarFondoCesantias(id: number): Observable<any> {
    return this._http.delete(`${this.baseUrl}/${id}`);
  }
}
