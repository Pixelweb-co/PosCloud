import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';
import { EpsService } from '../../services/eps.service'; // Ajusta la ruta según tu estructura de proyecto
import { ModalAddEpsComponent } from './eps.modal';
import { Eps } from '../../models/eps.model';
import { DataTablesModule } from 'angular-datatables';


@Component({
  selector: 'app-eps',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalAddEpsComponent,DataTablesModule],
  templateUrl: './eps.lista.html',
  styleUrls: ['./eps.lista.css']
})
export class EpsComponent implements OnInit {
  epss: any[] = [];
  keyword: string = '';
  showModal = false;
  epsToEdit?: Eps; 
  campos: any[] = ['nombre', 'nit']

  constructor(
    private epsService: EpsService
  ) {}

  ngOnInit() {
    this.loadInitialEpss();
  }

  // Método para cargar productos desde la API
  async loadInitialEpss() {
    await this.epsService.getEpss().subscribe(
      (data) => {
        this.epss = data; 
      },
      (error) => {
        console.error('Error al cargar epss', error);
      }
    );
  }

  filteredEpss() {
    if (!this.keyword) {
      return this.epss;
    }
    return this.epss.filter(eps =>
      eps.nombre.toLowerCase().includes(this.keyword.toLowerCase())
    );
  }


  addEps() {
    this.epsToEdit = undefined;
    this.showModal = true;
  }

  handleModalClose() {
    this.showModal = false;
  }

  handleEpsAdded() {
    this.loadInitialEpss(); // Recarga los eps cuando se agrega uno nuevo
  }

  editEps(eps: Eps) {
    this.epsToEdit = eps;
    console.log(this.epsToEdit)
    this.showModal = true;
  }

 
  deleteEps(epsId: number) {
    if (confirm('Desea eiminar esta eps?')) {
      this.epsService.eliminarEps(epsId).subscribe(
        () => {
          this.loadInitialEpss();
        },
        (error) => {
          console.error('Error al eliminar la eps', error);
        }
      );
    }
  }
}
