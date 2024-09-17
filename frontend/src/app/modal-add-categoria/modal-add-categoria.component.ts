import { Component, Input, Output, EventEmitter, inject, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaService } from '../services/categoria.service'; 
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 

import { Categoria } from '../models/categoria.model';

@Component({
  selector: 'app-modal-add-categoria',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-add-categoria.component.html',
  styleUrls: ['./modal-add-categoria.component.css']
})
export class ModalAddCategoriaComponent implements OnChanges {
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() categoriaAdded = new EventEmitter<void>();
  @Input() categoriaToEdit?: Categoria;

  private readonly categorySrv = inject(CategoriaService);
  categorias$ = this.categorySrv.getCategorias();

  private readonly categoriaSrv = inject(CategoriaService); // Inyecta el servicio
  private readonly fb = inject(FormBuilder); // Inyecta FormBuilder para formularios reactivos

  
  categoriaForm: FormGroup;

  constructor() {
    // Inicializa el formulario con validaciones
    this.categoriaForm = this.fb.group({
      nombre: ['', Validators.required], // Nombre del producto
      });
  }

  // Método para cerrar el modal
  closeModal() {
    this.close.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['categoriaToEdit'] && this.categoriaToEdit) {
      this.categoriaForm.patchValue({
        nombre: this.categoriaToEdit.nombre || '',
      });
    }
  }

  saveCategoria() {
    console.log("cv ",this.categoriaForm.value);
    if (this.categoriaForm.valid) {
      const categoriaData: Categoria = this.categoriaForm.value;

      if (this.categoriaToEdit && this.categoriaToEdit.id) {
        // Actualizar categoria existente
        this.categoriaSrv.actualizarCategoria(this.categoriaToEdit.id, categoriaData).subscribe(
          () => {
            this.categoriaAdded.emit();
            this.close.emit();
          },
          (error) => {
            console.error('Error actualizando el categoria', error);
          }
        );
      } else {
        // Crear nuevo categoria
        this.categoriaSrv.crearCategoria(categoriaData).subscribe(
          () => {
            this.categoriaAdded.emit();
            this.close.emit();
          },
          (error) => {
            console.error('Error creando el categoria', error);
          }
        );
      }
    } else {
      console.error('Form is invalid');
    }
  }

  // Getter para acceder fácilmente a los controles del formulario
  get f() {
    return this.categoriaForm.controls;
  }
}
