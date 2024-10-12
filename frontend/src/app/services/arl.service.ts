import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArlService {

  private baseUrl = 'http://localhost:8080/api/arl'; 

  private readonly _http = inject(HttpClient);

  // Método para obtener todos los Arls
  getArls(): Observable<any> {
    return this._http.get(`${this.baseUrl}`);
  }

  // Método para obtener un Arl por ID
  getArlPorId(id: number): Observable<any> {
    return this._http.get(`${this.baseUrl}/${id}`);
  }

  // Método para crear un nuevo Arl
  crearArl(item: any): Observable<any> {
    return this._http.post(this.baseUrl, item);
  }

  // Método para actualizar un Arl existente
  actualizarArl(id: number, item: any): Observable<any> {
    return this._http.put(`${this.baseUrl}/${id}`, item);
  }

  // Método para eliminar un Arl por ID
  eliminarArl(id: number): Observable<any> {
    return this._http.delete(`${this.baseUrl}/${id}`);
  }
}

