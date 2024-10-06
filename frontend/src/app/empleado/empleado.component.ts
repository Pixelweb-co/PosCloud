import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';
import { EmpleadoService } from '../services/empleado.service';
import { CartService } from '../services/cart.service';  // Ajusta la ruta según tu estructura de proyecto
import { ModalAddEmpleadoComponent } from '../modal-add-empleado/modal-add-empleado.component';
import { Empleado } from '../models/empleado.model';
import { DataTablesModule } from 'angular-datatables';


@Component({
  selector: 'app-empleado',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalAddEmpleadoComponent,DataTablesModule],
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {
  empleados: any[] = []; 
  keyword: string = '';
  showModal = false;
  empleadoToEdit?: Empleado; 

  constructor(
    private empleadoService: EmpleadoService
  ) {}

  ngOnInit() {
    this.loadInitialEmpleados();
  }

  // Método para cargar productos desde la API
  async loadInitialEmpleados() {
    
    await this.empleadoService.getEmpleados().subscribe(
      (data) => {
        this.empleados = data; 
      },
      (error) => {
        console.error('Error al cargar empleados', error);
      }
    );
  }

  filteredEmpleados() {
    if (!this.keyword) {
      return this.empleados;
    }
    return this.empleados.filter(empleado =>
      empleado.nombre.toLowerCase().includes(this.keyword.toLowerCase())
    );
  }

  addEmpleado() {
    this.empleadoToEdit = undefined;
    this.showModal = true;
  }

  handleModalClose() {
    this.showModal = false;
  }

  handleEmpleadoAdded() {
    this.loadInitialEmpleados(); // Recarga los productos cuando se agrega uno nuevo
  }

  editEmpleado(empleado: Empleado) {
    this.empleadoToEdit = empleado;
    console.log(this.empleadoToEdit)
    this.showModal = true;
  }

 
  deleteEmpleado(empleadoId: number) {
    if (confirm('Desea eiminar esta empleado?')) {
      this.empleadoService.eliminarEmpleado(empleadoId).subscribe(
        () => {
          this.loadInitialEmpleados();
        },
        (error) => {
          console.error('Error al eliminar la empleado', error);
        }
      );
    }
  }
}
