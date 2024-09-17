// categoria.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl = 'http://localhost:8080/api/categorias';

  private readonly _http = inject(HttpClient);

  getCategorias(): Observable<any> {
    return this._http.get<any>(this.apiUrl);
  }

    // Método para crear un nuevo categoria
    crearCategoria(categoria: any): Observable<any> {
      return this._http.post(this.apiUrl, categoria);
    }
  
    // Método para actualizar un categoria existente
    actualizarCategoria(id: number, categoria: any): Observable<any> {
      return this._http.put(`${this.apiUrl}/${id}`, categoria);
    }
  
    // Método para eliminar un categoria por ID
    eliminarCategoria(id: number): Observable<any> {
      return this._http.delete(`${this.apiUrl}/${id}`);
    }
  

}
