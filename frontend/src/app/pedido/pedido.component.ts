import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../services/pedido.service';
import { Pedido } from '../models/pedido.model';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';



@Component({
  selector: 'app-pedido',
  standalone: true,
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css'],
  imports:[FormsModule,CommonModule]
})
export class PedidoComponent implements OnInit {
  pedidos: Pedido[] = [];
  selectedPedido?: Pedido;
  pedidoToEdit?: Pedido;
  showModal: boolean = false;
  keyword: string = '';

  constructor(private pedidoService: PedidoService,private router: Router) {}


  ngOnInit(): void {
    this.cargarPedidos();
  }

   cargarPedidos() {
     this.pedidoService.obtenerPedidos().subscribe(
      (data) => {
        console.log("data",data)
        this.pedidos = data;
      },
      (error) => {
        console.error('Error al obtener pedidos', error);
      }
    );
  }

  filteredPedidos() {
    return this.pedidos;
  }

  agregarPedido(): void {
    this.selectedPedido = undefined;
    //this.showModal = true;
    location.href = '/principal/pos'
  }

  editarPedido(pedido: Pedido): void {
    this.selectedPedido = { ...pedido };
    
  }

  editOrder(pedido: Pedido) {
    this.pedidoToEdit = pedido;
    console.log("toedit ",this.pedidoToEdit)
    this.router.navigate(['/principal/pos'], { queryParams: {data:JSON.stringify(this.pedidoToEdit)}  });
  }


  eliminarPedido(id: any): void {
    this.pedidoService.eliminarPedido(id).subscribe(
      () => {
        this.cargarPedidos();
      },
      (error) => {
        console.error('Error al eliminar el pedido', error);
      }
    );
  }

  manejarModalClose(): void {
    this.showModal = false;
  }

  manejarPedidoGuardado(): void {
    this.cargarPedidos();
    this.showModal = false;
  }
}
