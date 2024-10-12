import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FondoPensionService {

  private baseUrl = 'http://localhost:8080/api/fondopension'; 

  private readonly _http = inject(HttpClient);

  // Método para obtener todos los FondoPensions
  getFondoPensions(): Observable<any> {
    return this._http.get(`${this.baseUrl}`);
  }

  // Método para obtener un FondoPension por ID
  getFondoPensionPorId(id: number): Observable<any> {
    return this._http.get(`${this.baseUrl}/${id}`);
  }

  // Método para crear un nuevo FondoPension
  crearFondoPension(item: any): Observable<any> {
    return this._http.post(this.baseUrl, item);
  }

  // Método para actualizar un FondoPension existente
  actualizarFondoPension(id: number, item: any): Observable<any> {
    return this._http.put(`${this.baseUrl}/${id}`, item);
  }

  // Método para eliminar un FondoPension por ID
  eliminarFondoPension(id: number): Observable<any> {
    return this._http.delete(`${this.baseUrl}/${id}`);
  }
}
