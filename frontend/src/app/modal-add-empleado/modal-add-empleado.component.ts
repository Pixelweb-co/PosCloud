import { Component, Input, Output, EventEmitter, inject, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadoService } from '../services/empleado.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 

import { Empleado } from '../models/empleado.model';

@Component({
  selector: 'app-modal-add-empleado',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-add-empleado.component.html',
  styleUrls: ['./modal-add-empleado.component.css']
})
export class ModalAddEmpleadoComponent implements OnChanges {
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() empleadoAdded = new EventEmitter<void>();
  @Input() empleadoToEdit?: Empleado;
  
  activeTab = 0; // Inicializa con la primera pestaña activa
  private readonly empleadoSrv = inject(EmpleadoService);
  private readonly fb = inject(FormBuilder); // Inyecta FormBuilder para formularios reactivos
 
  
  empleadoForm: FormGroup;

  constructor() {
    // Inicializa el formulario con validaciones
    this.empleadoForm = this.fb.group({
      nombre: ['', Validators.required], // Nombre del empleado
      telefono: ['', Validators.required], // password del empleado
     
      });
  }

  showTab(index: number) {
    this.activeTab = index;
  }

  // Método para cerrar el modal
  closeModal() {
    this.close.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['empleadoToEdit'] && this.empleadoToEdit) {
      this.empleadoForm.patchValue({
        username: this.empleadoToEdit.nombre || '',
      });
    }
  }

  saveEmpleado() {
    console.log("cv ",this.empleadoForm.value);
    if (this.empleadoForm.valid) {
      const empleadoData: Empleado = this.empleadoForm.value;

      if (this.empleadoToEdit && this.empleadoToEdit.id) {
        // Actualizar empleado existente
        this.empleadoSrv.actualizarEmpleado(this.empleadoToEdit.id, empleadoData).subscribe(
          () => {
            this.empleadoAdded.emit();
            this.close.emit();
          },
          (error) => {
            console.error('Error actualizando el empleado', error);
          }
        );
      } else {
        // Crear nuevo empleado
        this.empleadoSrv.crearEmpleado(empleadoData).subscribe(
          () => {
            this.empleadoAdded.emit();
            this.close.emit();
          },
          (error) => {
            console.error('Error creando el empleado', error);
          }
        );
      }
    } else {
      console.error('Form is invalid');
    }
  }

  // Getter para acceder fácilmente a los controles del formulario
  get f() {
    return this.empleadoForm.controls;
  }
}
