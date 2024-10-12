import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ElianService {

  private baseUrl = 'http://localhost:8080/api/elian'; 

  private readonly _http = inject(HttpClient);

  // Método para obtener todos los Elians
  getElians(): Observable<any> {
    return this._http.get(`${this.baseUrl}`);
  }

  // Método para obtener un Elian por ID
  getElianPorId(id: number): Observable<any> {
    return this._http.get(`${this.baseUrl}/${id}`);
  }

  // Método para crear un nuevo Elian
  crearElian(item: any): Observable<any> {
    return this._http.post(this.baseUrl, item);
  }

  // Método para actualizar un Elian existente
  actualizarElian(id: number, item: any): Observable<any> {
    return this._http.put(`${this.baseUrl}/${id}`, item);
  }

  // Método para eliminar un Elian por ID
  eliminarElian(id: number): Observable<any> {
    return this._http.delete(`${this.baseUrl}/${id}`);
  }
}
