import { Component, Input, Output, EventEmitter, inject, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../services/cliente.service'; 
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 

import { Cliente } from '../models/cliente.model';

@Component({
  selector: 'app-modal-add-cliente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-add-cliente.component.html',
  styleUrls: ['./modal-add-cliente.component.css']
})
export class ModalAddClienteComponent implements OnChanges {
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() clienteAdded = new EventEmitter<void>();
  @Input() clienteToEdit?: Cliente;

  private readonly clienteSrv = inject(ClienteService);
  private readonly fb = inject(FormBuilder); // Inyecta FormBuilder para formularios reactivos

  
  clienteForm: FormGroup;

  constructor() {
    // Inicializa el formulario con validaciones
    this.clienteForm = this.fb.group({
      username: ['', Validators.required], // Nombre del cliente
      password: ['', Validators.required], // password del cliente
      role: ['', Validators.required], // role del cliente
      status: ['', Validators.required], // status del cliente

      });
  }

  // Método para cerrar el modal
  closeModal() {
    this.close.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['clienteToEdit'] && this.clienteToEdit) {
      this.clienteForm.patchValue({
        username: this.clienteToEdit.nombre || '',
      });
    }
  }

  saveCliente() {
    console.log("cv ",this.clienteForm.value);
    if (this.clienteForm.valid) {
      const clienteData: Cliente = this.clienteForm.value;

      if (this.clienteToEdit && this.clienteToEdit.id) {
        // Actualizar cliente existente
        this.clienteSrv.actualizarCliente(this.clienteToEdit.id, clienteData).subscribe(
          () => {
            this.clienteAdded.emit();
            this.close.emit();
          },
          (error) => {
            console.error('Error actualizando el cliente', error);
          }
        );
      } else {
        // Crear nuevo cliente
        this.clienteSrv.crearCliente(clienteData).subscribe(
          () => {
            this.clienteAdded.emit();
            this.close.emit();
          },
          (error) => {
            console.error('Error creando el cliente', error);
          }
        );
      }
    } else {
      console.error('Form is invalid');
    }
  }

  // Getter para acceder fácilmente a los controles del formulario
  get f() {
    return this.clienteForm.controls;
  }
}
