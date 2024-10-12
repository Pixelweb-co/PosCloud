import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CajaCompensacionService {

  private baseUrl = 'http://localhost:8080/api/cajacompensacion'; 

  private readonly _http = inject(HttpClient);

  // Método para obtener todos los CajaCompensacions
  getCajaCompensacions(): Observable<any> {
    return this._http.get(`${this.baseUrl}`);
  }

  // Método para obtener un CajaCompensacion por ID
  getCajaCompensacionPorId(id: number): Observable<any> {
    return this._http.get(`${this.baseUrl}/${id}`);
  }

  // Método para crear un nuevo CajaCompensacion
  crearCajaCompensacion(item: any): Observable<any> {
    return this._http.post(this.baseUrl, item);
  }

  // Método para actualizar un CajaCompensacion existente
  actualizarCajaCompensacion(id: number, item: any): Observable<any> {
    return this._http.put(`${this.baseUrl}/${id}`, item);
  }

  // Método para eliminar un CajaCompensacion por ID
  eliminarCajaCompensacion(id: number): Observable<any> {
    return this._http.delete(`${this.baseUrl}/${id}`);
  }
}
