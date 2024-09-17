import { Component, Input, Output, EventEmitter, inject,OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { CommonModule ,Location} from '@angular/common';
import { CartService } from '../services/cart.service';  // Ajusta la ruta según tu estructura de proyecto
import { Pedido } from '../models/pedido.model';
import { PedidoService } from '../services/pedido.service';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: Array<any> = [];
  cash: number = 0;
  moneys: Array<number> = [1000, 5000, 10000, 50000, 100000];
  change: number = 0;
  pedidoToEdit?:Pedido | null; 
  pedidoData:any


  constructor(
    private route: ActivatedRoute, 
    private location: Location,
    private cartService: CartService, 
    private pedidoService: PedidoService
  ) {}  // Inyectar el servicio de pedidos

  ngOnInit(): void {
    console.log("init cart ")
    
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
      this.updateChange();
    });


    this.route.queryParams.subscribe(params => {
      

      if(params['data']){
      const decoded_cart = JSON.parse(params['data']);
      this.pedidoToEdit = decoded_cart;
      this.pedidoData = decoded_cart;
  
      const detalles = decoded_cart.detalles.map((item:any,index:any)=>{
        console.log("item c" ,decoded_cart.detalles)
        
        this.cartService.addItemLoadCart({
          idProducto:item.idProducto,
          id:item.idProducto,
          qty:item.cantidad,
          nombre:item.nombre,
          precioVenta:item.precioVenta
        })
    
      });
      

    
      this.updateChange();
    
    } 
    
    });

  }




  priceFormat(value: number): string {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'COP',
    }).format(value);
  }

  numberFormat(value: number): string {
    return new Intl.NumberFormat().format(value);
  }

  getTotalPrice(): number {
    return this.cart.reduce((total, item) => total + item.precioVenta * item.qty, 0);
  }

  getItemsCount(): number {
    return this.cart.reduce((count, item) => count + item.qty, 0);
  }

  addQty(item: any, qtyChange: number): void {
    this.cartService.updateQty(item.id, qtyChange);
  }

  clear(): void {
    this.cartService.clearCart();
  }

  updateCash(value: string): void {
    this.cash = parseInt(value.replace(/\D/g, '')) || 0;
    this.updateChange();
  }

  addCash(value: number): void {
    this.cash += value;
    this.updateChange();
  }

  updateChange(): void {
    this.change = this.cash - this.getTotalPrice();
  }

  submitable(): boolean {
    return this.cash >= this.getTotalPrice() && this.cart.length > 0;
  }

  submit(): void {
    if (this.submitable()) {

      
      if(!this.pedidoToEdit){
        console.log("pedt",this.pedidoToEdit)


      const pedido: Pedido = {
        id: null,
        fecha: new Date().toISOString(), 
        consecutivo: '12345', 
        vendedor: 'Juan Pérez', 
        cliente: 'GENERAL',
        observaciones: '',
        estado: 'Pagado', 
        tipo: 'Venta', 
        sucursal: 'Sucursal 1', 
        nroCajero: 'Cajero 5', 
        total:this.getTotalPrice(),
        detalles: this.cart.map(item => ({
          id:null,
          idProducto: item.id,
          nombre:item.nombre,
          cantidad: item.qty,
          precioVenta: item.precioVenta, 
          observaciones: item.observaciones || ''
        }))
      };


      this.pedidoService.crearPedido(pedido).subscribe(
        (response) => {
          alert('Pedido creado con éxito');
          this.clear();
          this.pedidoToEdit = null 
          this.cash = 0;
          this.change = 0;
        },
        (error) => {
          console.error('Error al crear el pedido', error);
          alert('Error al crear el pedido');
        }
      );

      
    }else{

      const pedido: Pedido = {
        id: this.pedidoToEdit.id,
        fecha: this.pedidoToEdit.fecha, 
        consecutivo: this.pedidoToEdit.consecutivo, 
        vendedor: this.pedidoToEdit.vendedor, 
        cliente: this.pedidoToEdit.cliente,
        observaciones: '',
        estado: this.pedidoToEdit.estado, 
        tipo: this.pedidoToEdit.tipo, 
        sucursal: 'Sucursal 1', 
        nroCajero: 'Cajero 5', 
        total:this.getTotalPrice(),
        detalles: this.cart.map(item => ({
          id:null,
          idProducto: item.id,
          nombre:item.nombre,
          cantidad: item.qty,
          precioVenta: item.precioVenta, 
          observaciones: item.observaciones || ''
        }))
      };


      this.pedidoService.actualizarPedido(pedido.id,pedido).subscribe(
        (response) => {
          alert('Pedido creado con éxito');
          this.clear();
          this.pedidoToEdit = null 
          this.cash = 0;
          this.change = 0;
        },
        (error) => {
          console.error('Error al crear el pedido', error);
          alert('Error al crear el pedido');
        }
      );

    }

      alert('Transaction submitted');
      // Add transaction logic here
      this.clear();
      this.cash = 0;
      this.change = 0;
    }
  }

  trackByProductId(index: number, item: any): number {
    return item.productId;
  }

  generateConsecutivo(){
    return '1';
  }
}
