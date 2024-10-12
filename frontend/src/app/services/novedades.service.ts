import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NovedadesService {

  private baseUrl = 'http://localhost:8080/api/novedades'; 

  private readonly _http = inject(HttpClient);

  // Método para obtener todos los Novedadess
  getNovedadess(): Observable<any> {
    return this._http.get(`${this.baseUrl}`);
  }

  // Método para obtener un Novedades por ID
  getNovedadesPorId(id: number): Observable<any> {
    return this._http.get(`${this.baseUrl}/${id}`);
  }

  // Método para crear un nuevo Novedades
  crearNovedades(item: any): Observable<any> {
    return this._http.post(this.baseUrl, item);
  }

  // Método para actualizar un Novedades existente
  actualizarNovedades(id: number, item: any): Observable<any> {
    return this._http.put(`${this.baseUrl}/${id}`, item);
  }

  // Método para eliminar un Novedades por ID
  eliminarNovedades(id: number): Observable<any> {
    return this._http.delete(`${this.baseUrl}/${id}`);
  }
}
