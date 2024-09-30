import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private baseUrl = 'http://localhost:8080/api/clientes'; 

  private readonly _http = inject(HttpClient);

  // Método para obtener todos los Clientes
  getClientes(): Observable<any> {
    return this._http.get(`${this.baseUrl}`);
  }

  // Método para obtener un Cliente por ID
  getClientePorId(id: number): Observable<any> {
    return this._http.get(`${this.baseUrl}/${id}`);
  }

  // Método para crear un nuevo Cliente
  crearCliente(Cliente: any): Observable<any> {
    return this._http.post(this.baseUrl, Cliente);
  }

  // Método para actualizar un Cliente existente
  actualizarCliente(id: number, Cliente: any): Observable<any> {
    return this._http.put(`${this.baseUrl}/${id}`, Cliente);
  }

  // Método para eliminar un Cliente por ID
  eliminarCliente(id: number): Observable<any> {
    return this._http.delete(`${this.baseUrl}/${id}`);
  }
}
