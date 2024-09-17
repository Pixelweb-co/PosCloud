import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new BehaviorSubject<Array<any>>([]);
  cart$ = this.cartSubject.asObservable();

  private cart: Array<any> = [];

  constructor() { }

  getCart(): Array<any> {
    return this.cart;
  }

  addToCart(product: any): void {
    const existingProduct = this.cart.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.qty += 1;
    } else {
      this.cart.push({ ...product, qty: 1,precioVenta:product.valor });
    }
    this.cartSubject.next(this.cart);
  }

  removeFromCart(productId: number): void {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.cartSubject.next(this.cart);
  }

  addItemLoadCart(product:any): void {
    const existingProduct = this.cart.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.qty += product.qty;
    } else {
      this.cart.push({ ...product, qty: product.qty,precioVenta:product.precioVenta });
    }
    this.cartSubject.next(this.cart);
  }


  updateQty(productId: number, qtyChange: number): void {
    
    const product = this.cart.find(item => item.id === productId);
    
    console.log("cart ",this.cart)
    console.log("update qty ",productId)
    if (product) {
      product.qty += qtyChange;
      if (product.qty <= 0) {
        this.removeFromCart(productId);
      } else {
        this.cartSubject.next(this.cart); 
      }
     
    }
  }

  clearCart(): void {
    this.cart = [];
    this.cartSubject.next(this.cart);
  }
  
  private loadCart(cartData:any): Array<any> {
   
    return cartData ? cartData : [];
  }

  private saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
}
