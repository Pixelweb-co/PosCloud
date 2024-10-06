import { Component, Input, Output, EventEmitter, inject, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../services/producto.service'; // Servicio para productos
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Formulario reactivo
import { CategoriaService } from '../services/categoria.service';
import { Producto } from '../models/productox.model';

@Component({
  selector: 'app-modal-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-add-product.component.html',
  styleUrls: ['./modal-add-product.component.css']
})
export class ModalAddProductComponent implements OnChanges {
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() productAdded = new EventEmitter<void>();
  @Input() productToEdit?: Producto;

  private readonly categorySrv = inject(CategoriaService);
  categorias$ = this.categorySrv.getCategorias();

  private readonly productoSrv = inject(ProductoService); // Inyecta el servicio
  private readonly fb = inject(FormBuilder); // Inyecta FormBuilder para formularios reactivos

  // Definir el formulario
  productForm: FormGroup;

  constructor() {
    // Inicializa el formulario con validaciones
    this.productForm = this.fb.group({
      categoria: ['', Validators.required], // Campo categoría
      sku: ['', [Validators.required, Validators.pattern(/^\d+$/)]], // SKU debe ser un número
      nombre: ['', Validators.required], // Nombre del producto
      descripcion: ['', Validators.required], // Descripción
      valor: [0, [Validators.required, Validators.min(0)]], // Precio debe ser mayor o igual a 0
      estado: ['Activo', Validators.required], // Estado del producto
      stock: [0, [Validators.required, Validators.min(0)]] // Stock debe ser mayor o igual a 0
    });
  }

  // Método para cerrar el modal
  closeModal() {
    this.close.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['productToEdit'] && this.productToEdit) {
      this.productForm.patchValue({
        categoria: this.productToEdit.categoria || '',
        sku: this.productToEdit.sku || '',
        nombre: this.productToEdit.nombre || '',
        descripcion: this.productToEdit.descripcion || '',
        valor: this.productToEdit.valor || 0,
        estado: this.productToEdit.estado || 'Activo',
        stock: this.productToEdit.stock || 0
      });
    }
  }

  saveProduct() {
    console.log("pv ",this.productForm.value);
    if (this.productForm.valid) {
      const productData: Producto = this.productForm.value;

      if (this.productToEdit && this.productToEdit.id) {
        // Actualizar producto existente
        this.productoSrv.actualizarProducto(this.productToEdit.id, productData).subscribe(
          () => {
            this.productAdded.emit();
            this.close.emit();
          },
          (error) => {
            console.error('Error actualizando el producto', error);
          }
        );
      } else {
        // Crear nuevo producto
        this.productoSrv.crearProducto(productData).subscribe(
          () => {
            this.productAdded.emit();
            this.close.emit();
          },
          (error) => {
            console.error('Error creando el producto', error);
          }
        );
      }
    } else {
      console.error('Form is invalid');
    }
  }

  // Getter para acceder fácilmente a los controles del formulario
  get f() {
    return this.productForm.controls;
  }
}
