import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';
import { EmpresaService } from '../services/empresa.service'; // Ajusta la ruta según tu estructura de proyecto
import { CartService } from '../services/cart.service';  // Ajusta la ruta según tu estructura de proyecto
import { ModalAddEmpresaComponent } from '../modal-add-empresa/modal-add-empresa.component';
import { Empresa } from '../models/empresa.model';
import { DataTablesModule } from 'angular-datatables';


@Component({
  selector: 'app-empresa',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalAddEmpresaComponent,DataTablesModule],
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {
  empresas: any[] = [];
  keyword: string = '';
  showModal = false;
  empresaToEdit?: Empresa; 

  constructor(
    private empresaService: EmpresaService
  ) {}

  ngOnInit() {
    this.loadInitialEmpresas();
  }

  // Método para cargar productos desde la API
  async loadInitialEmpresas() {
    
    await this.empresaService.getEmpresas().subscribe(
      (data) => {
        this.empresas = data; 
      },
      (error) => {
        console.error('Error al cargar empresas', error);
      }
    );
  }

  filteredEmpresas() {
    if (!this.keyword) {
      return this.empresas;
    }
    return this.empresas.filter(empresa =>
      empresa.nombre.toLowerCase().includes(this.keyword.toLowerCase())
    );
  }

  addEmpresa() {
    this.empresaToEdit = undefined;
    this.showModal = true;
  }

  handleModalClose() {
    this.showModal = false;
  }

  handleEmpresaAdded() {
    this.loadInitialEmpresas(); // Recarga los productos cuando se agrega uno nuevo
  }

  editEmpresa(empresa: Empresa) {
    this.empresaToEdit = empresa;
    console.log(this.empresaToEdit)
    this.showModal = true;
  }

 
  deleteEmpresa(empresaId: number) {
    if (confirm('Desea eiminar esta empresa?')) {
      this.empresaService.eliminarEmpresa(empresaId).subscribe(
        () => {
          this.loadInitialEmpresas();
        },
        (error) => {
          console.error('Error al eliminar la empresa', error);
        }
      );
    }
  }
}
