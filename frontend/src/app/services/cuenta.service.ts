import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  private baseUrl = 'http://localhost:8080/api/cuenta'; 

  private readonly _http = inject(HttpClient);

  // Método para obtener todos los Cuentas
  getCuentas(): Observable<any> {
    return this._http.get(`${this.baseUrl}`);
  }

  // Método para obtener un Cuenta por ID
  getCuentaPorId(id: number): Observable<any> {
    return this._http.get(`${this.baseUrl}/${id}`);
  }

  // Método para crear un nuevo Cuenta
  crearCuenta(item: any): Observable<any> {
    return this._http.post(this.baseUrl, item);
  }

  // Método para actualizar un Cuenta existente
  actualizarCuenta(id: number, item: any): Observable<any> {
    return this._http.put(`${this.baseUrl}/${id}`, item);
  }

  // Método para eliminar un Cuenta por ID
  eliminarCuenta(id: number): Observable<any> {
    return this._http.delete(`${this.baseUrl}/${id}`);
  }
}
