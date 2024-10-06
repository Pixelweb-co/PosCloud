import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class {SERVICIO}Service {

  private baseUrl = '{BASE_URL}'; 

  private readonly _http = inject(HttpClient);

  // Método para obtener todos los {SERVICIO}s
  get{SERVICIO}s(): Observable<any> {
    return this._http.get(`${this.baseUrl}`);
  }

  // Método para obtener un {SERVICIO} por ID
  get{SERVICIO}PorId(id: number): Observable<any> {
    return this._http.get(`${this.baseUrl}/${id}`);
  }

  // Método para crear un nuevo {SERVICIO}
  crear{SERVICIO}(item: any): Observable<any> {
    return this._http.post(this.baseUrl, item);
  }

  // Método para actualizar un {SERVICIO} existente
  actualizar{SERVICIO}(id: number, item: any): Observable<any> {
    return this._http.put(`${this.baseUrl}/${id}`, item);
  }

  // Método para eliminar un {SERVICIO} por ID
  eliminar{SERVICIO}(id: number): Observable<any> {
    return this._http.delete(`${this.baseUrl}/${id}`);
  }
}
