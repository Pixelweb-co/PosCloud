import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../services/usuario.service'; // Ajusta la ruta según tu estructura de proyecto
import {Usuario} from '../models/usuario.model';
import { ModalAddUsuario } from '../modal-add-usuario/modal-add-usuario.component';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalAddUsuario],
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  usuarios: any[] = [];
  keyword: string = '';
  showModal = false;
  usuarioToEdit?: Usuario; 

  constructor(
    private usuarioService: UsuarioService, // Inyecta el servicio
   
  ) {}

  ngOnInit() {
    this.loadInitialUsuarios();
  }

  // Método para cargar usuario desde la API
  async loadInitialUsuarios() {
    
    await this.usuarioService.getUsuarios().subscribe(
      (data) => {
        this.usuarios = data; // Asigna los usuarios obtenidos a la propiedad
      },
      (error) => {
        console.error('Error al cargar usurio', error);
      }
    );
  }

  filteredUsuarios() {
    if (!this.keyword) {
      return this.usuarios;
    }
    return this.usuarios.filter(usuario =>
      usuario.username.toLowerCase().includes(this.keyword.toLowerCase())
    );
  }

  handleModalClose() {
    this.showModal = false;
  }

  handleUsuarioAdded() {
    this.loadInitialUsuarios(); 
  }

  addUsuario() {
    this.usuarioToEdit = undefined;
    this.showModal = true;
  }


  editUsuario(usuario: Usuario) {
    this.usuarioToEdit = usuario;
    this.showModal = true;
  }


  deleteUsuario(usuarioId: number) {
    if (confirm('Desea eliminar este usuario?')) {
      this.usuarioService.eliminarUsuario(usuarioId).subscribe(
        () => {
          this.loadInitialUsuarios();
        },
        (error) => {
          console.error('Error al eliminar el usuario', error);
        }
      );
    }
  }
}
