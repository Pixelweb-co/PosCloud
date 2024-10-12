import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConceptoNominaService {

  private baseUrl = 'http://localhost:8080/api/conceptonomina'; 

  private readonly _http = inject(HttpClient);

  // Método para obtener todos los ConceptoNominas
  getConceptoNominas(): Observable<any> {
    return this._http.get(`${this.baseUrl}`);
  }

  // Método para obtener un ConceptoNomina por ID
  getConceptoNominaPorId(id: number): Observable<any> {
    return this._http.get(`${this.baseUrl}/${id}`);
  }

  // Método para crear un nuevo ConceptoNomina
  crearConceptoNomina(item: any): Observable<any> {
    return this._http.post(this.baseUrl, item);
  }

  // Método para actualizar un ConceptoNomina existente
  actualizarConceptoNomina(id: number, item: any): Observable<any> {
    return this._http.put(`${this.baseUrl}/${id}`, item);
  }

  // Método para eliminar un ConceptoNomina por ID
  eliminarConceptoNomina(id: number): Observable<any> {
    return this._http.delete(`${this.baseUrl}/${id}`);
  }
}
