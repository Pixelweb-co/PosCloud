import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';
import { ProductoxService } from '../services/Productox.service'; // Ajusta la ruta según tu estructura de proyecto
import { CartService } from '../services/cart.service';  // Ajusta la ruta según tu estructura de proyecto
import { ModalAddProductComponent } from '../modal-add-product/modal-add-product.component';
import { Productox } from '../models/Productox.model';
@Component({
  selector: 'app-Productox',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalAddProductComponent],
  templateUrl: './Productox.component.html',
  styleUrls: ['./Productox.component.css']
})
export class ProductoxComponent implements OnInit {
  products: Productox[] = [];
  keyword: string = '';
  showModal = false;
  productToEdit?: Productox; 
  constructor(
    private ProductoxService: ProductoxService, // Inyecta el servicio
    private cartService: CartService
  ) {}
  ngOnInit() {
    this.loadInitialProducts();
  }
  // Método para cargar productos desde la API
  async loadInitialProducts() {
    await this.ProductoxService.getProductoxs().subscribe(
      (data) => {
        this.products = data; // Asigna los productos obtenidos a la propiedad
      },
      (error) => {
        console.error('Error al cargar productos', error);
      }
    );
  }
  filteredProducts() {
    if (this.keyword) {
      return this.products;
    }
    return this.products.filter(product =>
      product.nombre.toLowerCase().includes(this.keyword.toLowerCase())
    );
  }
  addToCart(product: Productox) {
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
  editProduct(product: Productox) {
    this.productToEdit = product;
    this.showModal = true;
  }
  deleteProduct(productId: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.ProductoxService.eliminarProductox(productId).subscribe(
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
