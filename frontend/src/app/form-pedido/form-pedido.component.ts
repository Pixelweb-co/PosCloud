import { Component } from '@angular/core';
import { ProductoComponent } from '../producto/producto.component';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-form-pedido',
  standalone: true,
  imports: [ProductoComponent,CartComponent],
  templateUrl: './form-pedido.component.html',
  styleUrl: './form-pedido.component.css'
})
export class FormPedidoComponent {

}
