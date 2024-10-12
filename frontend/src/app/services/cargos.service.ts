import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CargosService {

  private baseUrl = 'http://localhost:8080/api/cargos'; 

  private readonly _http = inject(HttpClient);

  // Método para obtener todos los Cargoss
  getCargoss(): Observable<any> {
    return this._http.get(`${this.baseUrl}`);
  }

  // Método para obtener un Cargos por ID
  getCargosPorId(id: number): Observable<any> {
    return this._http.get(`${this.baseUrl}/${id}`);
  }

  // Método para crear un nuevo Cargos
  crearCargos(item: any): Observable<any> {
    return this._http.post(this.baseUrl, item);
  }

  // Método para actualizar un Cargos existente
  actualizarCargos(id: number, item: any): Observable<any> {
    return this._http.put(`${this.baseUrl}/${id}`, item);
  }

  // Método para eliminar un Cargos por ID
  eliminarCargos(id: number): Observable<any> {
    return this._http.delete(`${this.baseUrl}/${id}`);
  }
}
