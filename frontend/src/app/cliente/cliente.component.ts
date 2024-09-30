import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';
import { ClienteService } from '../services/cliente.service';
import { CartService } from '../services/cart.service';  // Ajusta la ruta según tu estructura de proyecto
import { ModalAddClienteComponent } from '../modal-add-cliente/modal-add-cliente.component';
import { Cliente } from '../models/cliente.model';
import { DataTablesModule } from 'angular-datatables';


@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalAddClienteComponent,DataTablesModule],
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  clientes: any[] = [];
  keyword: string = '';
  showModal = false;
  clienteToEdit?: Cliente; 

  constructor(
    private clienteService: ClienteService
  ) {}

  ngOnInit() {
    this.loadInitialClientes();
  }

  // Método para cargar productos desde la API
  async loadInitialClientes() {
    
    await this.clienteService.getClientes().subscribe(
      (data) => {
        this.clientes = data; 
      },
      (error) => {
        console.error('Error al cargar clientes', error);
      }
    );
  }

  filteredClientes() {
    if (!this.keyword) {
      return this.clientes;
    }
    return this.clientes.filter(cliente =>
      cliente.nombre.toLowerCase().includes(this.keyword.toLowerCase())
    );
  }

  addCliente() {
    this.clienteToEdit = undefined;
    this.showModal = true;
  }

  handleModalClose() {
    this.showModal = false;
  }

  handleClienteAdded() {
    this.loadInitialClientes(); // Recarga los productos cuando se agrega uno nuevo
  }

  editCliente(cliente: Cliente) {
    this.clienteToEdit = cliente;
    console.log(this.clienteToEdit)
    this.showModal = true;
  }

 
  deleteCliente(clienteId: number) {
    if (confirm('Desea eiminar esta cliente?')) {
      this.clienteService.eliminarCliente(clienteId).subscribe(
        () => {
          this.loadInitialClientes();
        },
        (error) => {
          console.error('Error al eliminar la cliente', error);
        }
      );
    }
  }
}
