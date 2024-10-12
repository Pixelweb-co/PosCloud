import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class demoService {
  private baseUrl = 'http://localhost:8080/api/demo'; 
  private readonly _http = inject(HttpClient);
  // Método para obtener todos los demos
  getdemos(): Observable<any> {
    return this._http.get(`${this.baseUrl}`);
  }
  // Método para obtener un demo por ID
  getdemoPorId(id: number): Observable<any> {
    return this._http.get(`${this.baseUrl}/${id}`);
  }
  // Método para crear un nuevo demo
  creardemo(item: any): Observable<any> {
    return this._http.post(this.baseUrl, item);
  }
  // Método para actualizar un demo existente
  actualizardemo(id: number, item: any): Observable<any> {
    return this._http.put(`${this.baseUrl}/${id}`, item);
  }
  // Método para eliminar un demo por ID
  eliminardemo(id: number): Observable<any> {
    return this._http.delete(`${this.baseUrl}/${id}`);
  }
}
