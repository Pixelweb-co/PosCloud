import { Component, Input, Output, EventEmitter, inject, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { empleadoservice } from '../services/empleado.service'; 
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 

import { Empleado } from '../modal-add-empleado';

@Component({
  selector: 'app-modal-add-Empleado',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-add-Empleado.component.html',
  styleUrls: ['./modal-add-Empleado.component.css']
})
export class ModalAddEmpleado implements OnChanges {
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() EmpleadoAdded = new EventEmitter<void>();
  @Input() EmpleadoToEdit?: Empleado;

  private readonly EmpleadoSrv = inject(empleadoService);
  private readonly fb = inject(FormBuilder); // Inyecta FormBuilder para formularios reactivos

  
  EmpleadoForm: FormGroup;

  constructor() {
    // Inicializa el formulario con validaciones
    this.EmpleadoForm = this.fb.group({
      username: ['', Validators.required], // Nombre del Empleado
      password: ['', Validators.required], // password del Empleado
      role: ['', Validators.required], // role del Empleado
      status: ['', Validators.required], // status del Empleado

      });
  }

  // Método para cerrar el modal
  closeModal() {
    this.close.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['EmpleadoToEdit'] && this.EmpleadoToEdit) {
      this.EmpleadoForm.patchValue({
        username: this.EmpleadoToEdit.username || '',
      });
    }
  }

  saveEmpleado() {
    console.log("cv ",this.EmpleadoForm.value);
    if (this.EmpleadoForm.valid) {
      const EmpleadoData: Empleado = this.EmpleadoForm.value;

      if (this.EmpleadoToEdit && this.EmpleadoToEdit.id) {
        // Actualizar Empleado existente
        this.EmpleadoSrv.actualizarEmpleado(this.EmpleadoToEdit.id, EmpleadoData).subscribe(
          () => {
            this.EmpleadoAdded.emit();
            this.close.emit();
          },
          (error) => {
            console.error('Error actualizando el Empleado', error);
          }
        );
      } else {
        // Crear nuevo Empleado
        this.EmpleadoSrv.crearEmpleado(EmpleadoData).subscribe(
          () => {
            this.EmpleadoAdded.emit();
            this.close.emit();
          },
          (error) => {
            console.error('Error creando el Empleado', error);
          }
        );
      }
    } else {
      console.error('Form is invalid');
    }
  }

  // Getter para acceder fácilmente a los controles del formulario
  get f() {
    return this.EmpleadoForm.controls;
  }
}
