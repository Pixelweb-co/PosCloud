import { Component, Input, Output, EventEmitter, inject, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresaService } from '../services/empresa.service'; 
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 

import { Empresa } from '../models/empresa.model';

@Component({
  selector: 'app-modal-add-empresa',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-add-empresa.component.html',
  styleUrls: ['./modal-add-empresa.component.css']
})
export class ModalAddEmpresaComponent implements OnChanges {
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() empresaAdded = new EventEmitter<void>();
  @Input() empresaToEdit?: Empresa;

  private readonly empresaSrv = inject(EmpresaService);
  empresas$ = this.empresaSrv.getEmpresas();

  private readonly fb = inject(FormBuilder); // Inyecta FormBuilder para formularios reactivos

  
  empresaForm: FormGroup;

  constructor() {
    // Inicializa el formulario con validaciones
    this.empresaForm = this.fb.group({
      razon_social: ['', Validators.required],
      nit: ['', Validators.required],
      domicilio: ['', Validators.required],
      ciudad: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      codigo_actividad: ['', Validators.required],
      tipo_regimen: ['', Validators.required],
      estado:['',Validators.required]
      });
  }

  // Método para cerrar el modal
  closeModal() {
    this.close.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['empresaToEdit'] && this.empresaToEdit) {
      this.empresaForm.patchValue({
        razon_social: this.empresaToEdit.razon_social || '',
        nit:this.empresaToEdit.nit,
        domicilio:this.empresaToEdit.domicilio,
        ciudad:this.empresaToEdit.ciudad,
        telefono:this.empresaToEdit.telefono,
        email:this.empresaToEdit.email,
        estado:this.empresaToEdit.estado,
        codigo_actividad:this.empresaToEdit.codigo_actividad,
        tipo_regimen:this.empresaToEdit.tipo_regimen
      });
    }
  }

  saveEmpresa() {
    console.log("cv ",this.empresaForm.value);
    if (this.empresaForm.valid) {
      const empresaData: Empresa = this.empresaForm.value;

      if (this.empresaToEdit && this.empresaToEdit.id) {
        // Actualizar empresa existente
        this.empresaSrv.actualizarEmpresa(this.empresaToEdit.id, empresaData).subscribe(
          () => {
            this.empresaAdded.emit();
            this.close.emit();
          },
          (error) => {
            console.error('Error actualizando el empresa', error);
          }
        );
      } else {
        // Crear nuevo empresa
        this.empresaSrv.crearEmpresa(empresaData).subscribe(
          () => {
            this.empresaAdded.emit();
            this.close.emit();
          },
          (error) => {
            console.error('Error creando el empresa', error);
          }
        );
      }
    } else {
      console.error('Form is invalid');
    }
  }

  // Getter para acceder fácilmente a los controles del formulario
  get f() {
    return this.empresaForm.controls;
  }
}
