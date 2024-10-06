import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from '../models/empleado.model';


@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private baseUrl = 'http://localhost:8080/api/empleados'; 

  private readonly _http = inject(HttpClient);

  // Método para obtener todos los Empleados
  getEmpleados(): Observable<any> {
    return this._http.get(`${this.baseUrl}`);
  }

  // Método para obtener un Empleado por ID
  getEmpleadoPorId(id: number): Observable<any> {
    return this._http.get(`${this.baseUrl}/${id}`);
  }

  // Método para crear un nuevo Empleado
  crearEmpleado(Empleado: any): Observable<any> {
    return this._http.post(this.baseUrl, Empleado);
  }

  // Método para actualizar un Empleado existente
  actualizarEmpleado(id: number, Empleado: any): Observable<any> {
    return this._http.put(`${this.baseUrl}/${id}`, Empleado);
  }

  // Método para eliminar un Empleado por ID
  eliminarEmpleado(id: number): Observable<any> {
    return this._http.delete(`${this.baseUrl}/${id}`);
  }
}
