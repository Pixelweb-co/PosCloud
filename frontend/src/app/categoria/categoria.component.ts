import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';
import { CategoriaService } from '../services/categoria.service'; // Ajusta la ruta según tu estructura de proyecto
import { CartService } from '../services/cart.service';  // Ajusta la ruta según tu estructura de proyecto
import { ModalAddCategoriaComponent } from '../modal-add-categoria/modal-add-categoria.component';
import { Categoria } from '../models/categoria.model';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalAddCategoriaComponent],
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  categorias: any[] = [];
  keyword: string = '';
  showModal = false;
  categoriaToEdit?: Categoria; 

  constructor(
    private categoriaService: CategoriaService
  ) {}

  ngOnInit() {
    this.loadInitialCategorias();
  }

  // Método para cargar productos desde la API
  async loadInitialCategorias() {
    
    await this.categoriaService.getCategorias().subscribe(
      (data) => {
        this.categorias = data; 
      },
      (error) => {
        console.error('Error al cargar categorias', error);
      }
    );
  }

  filteredCategorias() {
    if (!this.keyword) {
      return this.categorias;
    }
    return this.categorias.filter(categoria =>
      categoria.nombre.toLowerCase().includes(this.keyword.toLowerCase())
    );
  }

  addCategoria() {
    this.categoriaToEdit = undefined;
    this.showModal = true;
  }

  handleModalClose() {
    this.showModal = false;
  }

  handleCategoriaAdded() {
    this.loadInitialCategorias(); // Recarga los productos cuando se agrega uno nuevo
  }

  editCategoria(categoria: Categoria) {
    this.categoriaToEdit = categoria;
    this.showModal = true;
  }

 
  deleteCategoria(categoriaId: number) {
    if (confirm('Desea eiminar esta categoria?')) {
      this.categoriaService.eliminarCategoria(categoriaId).subscribe(
        () => {
          this.loadInitialCategorias();
        },
        (error) => {
          console.error('Error al eliminar la categoria', error);
        }
      );
    }
  }
}
