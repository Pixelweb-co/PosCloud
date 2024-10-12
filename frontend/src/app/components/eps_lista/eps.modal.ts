import { Component, Input, Output, EventEmitter, inject, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpsService } from '../../services/eps.service'; 
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 

import { Eps } from '../../models/eps.model';

@Component({
  selector: 'app-modal-form-eps',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './eps.modal.html',
  styleUrls: ['./eps.modal.css']
})
export class ModalAddEpsComponent implements OnChanges {
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() epsAdded = new EventEmitter<void>();
  @Input() epsToEdit?: Eps;

  private readonly epsSrv = inject(EpsService);
  epss$ = this.epsSrv.getEpss();

  private readonly fb = inject(FormBuilder); // Inyecta FormBuilder para formularios reactivos

  campos:any[] = ['nombre', 'nit']  


  epsForm: FormGroup;

  constructor() {
    // Inicializa el formulario con validaciones
    this.epsForm = this.fb.group({
      nombre: ['', Validators.required], nit: ['', Validators.required]
    });
  }

  // Método para cerrar el modal
  closeModal() {
    this.close.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['epsToEdit'] && this.epsToEdit) {
      this.epsForm.patchValue({
        nombre: this.epsToEdit.nombre || '', nit: this.epsToEdit.nit || ''
      });
    }
  }

  saveEps() {
    console.log("cv ",this.epsForm.value);
    if (this.epsForm.valid) {
      const epsData: Eps = this.epsForm.value;

      if (this.epsToEdit && this.epsToEdit.id) {
        // Actualizar eps existente
        this.epsSrv.actualizarEps(this.epsToEdit.id, epsData).subscribe(
          () => {
            this.epsAdded.emit();
            this.close.emit();
          },
          (error:any) => {
            console.error('Error actualizando el eps', error);
          }
        );
      } else {
        // Crear nuevo eps
        this.epsSrv.crearEps(epsData).subscribe(
          () => {
            this.epsAdded.emit();
            this.close.emit();
          },
          (error:any) => {
            console.error('Error creando el eps', error);
          }
        );
      }
    } else {
      console.error('Form is invalid');
    }
  }

  // Getter para acceder fácilmente a los controles del formulario
  get f() {
    return this.epsForm.controls;
  }
}
