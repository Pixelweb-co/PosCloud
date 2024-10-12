import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class camasService {
  private baseUrl = 'http://localhost:8080/api/camas'; 
  private readonly _http = inject(HttpClient);
  // Método para obtener todos los camass
  getcamass(): Observable<any> {
    return this._http.get(`${this.baseUrl}`);
  }
  // Método para obtener un camas por ID
  getcamasPorId(id: number): Observable<any> {
    return this._http.get(`${this.baseUrl}/${id}`);
  }
  // Método para crear un nuevo camas
  crearcamas(item: any): Observable<any> {
    return this._http.post(this.baseUrl, item);
  }
  // Método para actualizar un camas existente
  actualizarcamas(id: number, item: any): Observable<any> {
    return this._http.put(`${this.baseUrl}/${id}`, item);
  }
  // Método para eliminar un camas por ID
  eliminarcamas(id: number): Observable<any> {
    return this._http.delete(`${this.baseUrl}/${id}`);
  }
}
