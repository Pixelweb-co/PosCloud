import { Component, Input, Output, EventEmitter, inject, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../services/usuario.service'; 
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 

import { Usuario } from '../models/usuario.model';

@Component({
  selector: 'app-modal-add-usuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-add-usuario.component.html',
  styleUrls: ['./modal-add-usuario.component.css']
})
export class ModalAddUsuario implements OnChanges {
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() usuarioAdded = new EventEmitter<void>();
  @Input() usuarioToEdit?: Usuario;

  private readonly usuarioSrv = inject(UsuarioService);
  private readonly fb = inject(FormBuilder); // Inyecta FormBuilder para formularios reactivos

  
  usuarioForm: FormGroup;

  constructor() {
    // Inicializa el formulario con validaciones
    this.usuarioForm = this.fb.group({
      username: ['', Validators.required], // Nombre del usuario
      password: ['', Validators.required], // password del usuario
      role: ['', Validators.required], // role del usuario
      status: ['', Validators.required], // status del usuario

      });
  }

  // Método para cerrar el modal
  closeModal() {
    this.close.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['usuarioToEdit'] && this.usuarioToEdit) {
      this.usuarioForm.patchValue({
        username: this.usuarioToEdit.username || '',
      });
    }
  }

  saveUsuario() {
    console.log("cv ",this.usuarioForm.value);
    if (this.usuarioForm.valid) {
      const usuarioData: Usuario = this.usuarioForm.value;

      if (this.usuarioToEdit && this.usuarioToEdit.id) {
        // Actualizar usuario existente
        this.usuarioSrv.actualizarUsuario(this.usuarioToEdit.id, usuarioData).subscribe(
          () => {
            this.usuarioAdded.emit();
            this.close.emit();
          },
          (error) => {
            console.error('Error actualizando el usuario', error);
          }
        );
      } else {
        // Crear nuevo usuario
        this.usuarioSrv.crearUsuario(usuarioData).subscribe(
          () => {
            this.usuarioAdded.emit();
            this.close.emit();
          },
          (error) => {
            console.error('Error creando el usuario', error);
          }
        );
      }
    } else {
      console.error('Form is invalid');
    }
  }

  // Getter para acceder fácilmente a los controles del formulario
  get f() {
    return this.usuarioForm.controls;
  }
}
