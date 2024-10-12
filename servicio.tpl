import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class {COMPONENTE}Service {

  private baseUrl = 'http://localhost:8080/api/{componente}s'; 

  private readonly _http = inject(HttpClient);

  // Método para obtener todos los {COMPONENTE}s
  get{COMPONENTE}s(): Observable<any> {
    return this._http.get(`${this.baseUrl}`);
  }

  // Método para obtener un {COMPONENTE} por ID
  get{COMPONENTE}PorId(id: number): Observable<any> {
    return this._http.get(`${this.baseUrl}/${id}`);
  }

  // Método para crear un nuevo {COMPONENTE}
  crear{COMPONENTE}(item: any): Observable<any> {
    return this._http.post(this.baseUrl, item);
  }

  // Método para actualizar un {COMPONENTE} existente
  actualizar{COMPONENTE}(id: number, item: any): Observable<any> {
    return this._http.put(`${this.baseUrl}/${id}`, item);
  }

  // Método para eliminar un {COMPONENTE} por ID
  eliminar{COMPONENTE}(id: number): Observable<any> {
    return this._http.delete(`${this.baseUrl}/${id}`);
  }
}
