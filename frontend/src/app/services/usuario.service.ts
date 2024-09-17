import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl = 'http://localhost:8080/api/usuarios'; 

  private readonly _http = inject(HttpClient);

  // Método para obtener todos los Usuarios
  getUsuarios(): Observable<any> {
    return this._http.get(`${this.baseUrl}`);
  }

  // Método para obtener un Usuario por ID
  getUsuarioPorId(id: number): Observable<any> {
    return this._http.get(`${this.baseUrl}/${id}`);
  }

  // Método para crear un nuevo Usuario
  crearUsuario(Usuario: any): Observable<any> {
    return this._http.post(this.baseUrl, Usuario);
  }

  // Método para actualizar un Usuario existente
  actualizarUsuario(id: number, Usuario: any): Observable<any> {
    return this._http.put(`${this.baseUrl}/${id}`, Usuario);
  }

  // Método para eliminar un Usuario por ID
  eliminarUsuario(id: number): Observable<any> {
    return this._http.delete(`${this.baseUrl}/${id}`);
  }
}
