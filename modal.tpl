import { Component, Input, Output, EventEmitter, inject, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { {COMPONENTE}Service } from '../../services/{componente}.service'; 
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 

import { {COMPONENTE} } from '../../models/{componente}.model';

@Component({
  selector: 'app-modal-form-{componente}',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './{componente}.modal.html',
  styleUrls: ['./{componente}.modal.css']
})
export class ModalAdd{COMPONENTE}Component implements OnChanges {
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() {componente}Added = new EventEmitter<void>();
  @Input() {componente}ToEdit?: {COMPONENTE};

  private readonly {componente}Srv = inject({COMPONENTE}Service);
  {componente}s$ = this.{componente}Srv.get{COMPONENTE}s();

  private readonly fb = inject(FormBuilder); // Inyecta FormBuilder para formularios reactivos

  campos:any[] = [{campos}]  


  {componente}Form: FormGroup;

  constructor() {
    // Inicializa el formulario con validaciones
    this.{componente}Form = this.fb.group({
      {CAMPOS_FORMULARIO}
    });
  }

  // Método para cerrar el modal
  closeModal() {
    this.close.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['{componente}ToEdit'] && this.{componente}ToEdit) {
      this.{componente}Form.patchValue({
        {CAMPOS_PATCH}
      });
    }
  }

  save{COMPONENTE}() {
    console.log("cv ",this.{componente}Form.value);
    if (this.{componente}Form.valid) {
      const {componente}Data: {COMPONENTE} = this.{componente}Form.value;

      if (this.{componente}ToEdit && this.{componente}ToEdit.id) {
        // Actualizar {componente} existente
        this.{componente}Srv.actualizar{COMPONENTE}(this.{componente}ToEdit.id, {componente}Data).subscribe(
          () => {
            this.{componente}Added.emit();
            this.close.emit();
          },
          (error:any) => {
            console.error('Error actualizando el {componente}', error);
          }
        );
      } else {
        // Crear nuevo {componente}
        this.{componente}Srv.crear{COMPONENTE}({componente}Data).subscribe(
          () => {
            this.{componente}Added.emit();
            this.close.emit();
          },
          (error:any) => {
            console.error('Error creando el {componente}', error);
          }
        );
      }
    } else {
      console.error('Form is invalid');
    }
  }

  // Getter para acceder fácilmente a los controles del formulario
  get f() {
    return this.{componente}Form.controls;
  }
}
