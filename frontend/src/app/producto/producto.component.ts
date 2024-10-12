import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';
import { ProductoService } from '../services/producto.service'; // Ajusta la ruta según tu estructura de proyecto
import { CartService } from '../services/cart.service';  // Ajusta la ruta según tu estructura de proyecto
import { ModalAddProductComponent } from '../modal-add-product/modal-add-product.component';
import { Producto } from '../models/producto.model';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalAddProductComponent],
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  products: any[] = [];
  keyword: string = '';
  showModal = false;
  productToEdit?: Producto; 

  constructor(
    private productoService: ProductoService, // Inyecta el servicio
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.loadInitialProducts();
  }

  // Método para cargar productos desde la API
  async loadInitialProducts() {
    
    await this.productoService.getProductos().subscribe(
      (data) => {
        this.products = data; // Asigna los productos obtenidos a la propiedad
      },
      (error) => {
        console.error('Error al cargar productos', error);
      }
    );
  }

  filteredProducts() {
    if (!this.keyword) {
      return this.products;
    }
    return this.products.filter(product =>
      product.nombre.toLowerCase().includes(this.keyword.toLowerCase())
    );
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }

  priceFormat(price: number | undefined): string {
    if (price === undefined || isNaN(price)) {
      return '$0.00'; // Valor predeterminado si price es undefined o NaN
    }
    return `$${price.toFixed(2)}`;
  }

  addProduct() {
    this.productToEdit = undefined;
    this.showModal = true;
  }

  handleModalClose() {
    this.showModal = false;
  }

  handleProductAdded() {
    this.loadInitialProducts(); // Recarga los productos cuando se agrega uno nuevo
  }

  editProduct(product: Producto) {
    this.productToEdit = product;
    this.showModal = true;
  }


  deleteProduct(productId: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productoService.eliminarProducto(productId).subscribe(
        () => {
          this.loadInitialProducts();
        },
        (error) => {
          console.error('Error al eliminar el producto', error);
        }
      );
    }
  }
}
