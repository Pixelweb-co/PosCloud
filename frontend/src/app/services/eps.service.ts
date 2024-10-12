import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EpsService {

  private baseUrl = 'http://localhost:8080/api/epss'; 

  private readonly _http = inject(HttpClient);

  // Método para obtener todos los Epss
  getEpss(): Observable<any> {
    return this._http.get(`${this.baseUrl}`);
  }

  // Método para obtener un Eps por ID
  getEpsPorId(id: number): Observable<any> {
    return this._http.get(`${this.baseUrl}/${id}`);
  }

  // Método para crear un nuevo Eps
  crearEps(item: any): Observable<any> {
    return this._http.post(this.baseUrl, item);
  }

  // Método para actualizar un Eps existente
  actualizarEps(id: number, item: any): Observable<any> {
    return this._http.put(`${this.baseUrl}/${id}`, item);
  }

  // Método para eliminar un Eps por ID
  eliminarEps(id: number): Observable<any> {
    return this._http.delete(`${this.baseUrl}/${id}`);
  }
}
