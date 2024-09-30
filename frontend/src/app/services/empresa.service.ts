// empresa.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private apiUrl = 'http://localhost:8080/api/empresas';

  private readonly _http = inject(HttpClient);

  getEmpresas(): Observable<any> {
    return this._http.get<any>(this.apiUrl);
  }

    // Método para crear un nuevo empresa
    crearEmpresa(empresa: any): Observable<any> {
      return this._http.post(this.apiUrl, empresa);
    }
  
    // Método para actualizar un empresa existente
    actualizarEmpresa(id: number, empresa: any): Observable<any> {
      return this._http.put(`${this.apiUrl}/${id}`, empresa);
    }
  
    // Método para eliminar un empresa por ID
    eliminarEmpresa(id: number): Observable<any> {
      return this._http.delete(`${this.apiUrl}/${id}`);
    }
  

}
