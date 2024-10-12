import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';
import { {COMPONENTE}Service } from '../../services/{componente}.service'; // Ajusta la ruta según tu estructura de proyecto
import { ModalAdd{COMPONENTE}Component } from './{componente}.modal';
import { {COMPONENTE} } from '../../models/{componente}.model';
import { DataTablesModule } from 'angular-datatables';


@Component({
  selector: 'app-{componente}',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalAdd{COMPONENTE}Component,DataTablesModule],
  templateUrl: './{componente}.lista.html',
  styleUrls: ['./{componente}.lista.css']
})
export class {COMPONENTE}Component implements OnInit {
  {componente}s: any[] = [];
  keyword: string = '';
  showModal = false;
  {componente}ToEdit?: {COMPONENTE}; 
  campos: any[] = [{campos}]

  constructor(
    private {componente}Service: {COMPONENTE}Service
  ) {}

  ngOnInit() {
    this.loadInitial{COMPONENTE}s();
  }

  // Método para cargar productos desde la API
  async loadInitial{COMPONENTE}s() {
    await this.{componente}Service.get{COMPONENTE}s().subscribe(
      (data) => {
        this.{componente}s = data; 
      },
      (error) => {
        console.error('Error al cargar {componente}s', error);
      }
    );
  }

  filtered{COMPONENTE}s() {
    if (!this.keyword) {
      return this.{componente}s;
    }
    return this.{componente}s.filter({componente} =>
      {componente}.nombre.toLowerCase().includes(this.keyword.toLowerCase())
    );
  }


  add{COMPONENTE}() {
    this.{componente}ToEdit = undefined;
    this.showModal = true;
  }

  handleModalClose() {
    this.showModal = false;
  }

  handle{COMPONENTE}Added() {
    this.loadInitial{COMPONENTE}s(); // Recarga los {componente} cuando se agrega uno nuevo
  }

  edit{COMPONENTE}({componente}: {COMPONENTE}) {
    this.{componente}ToEdit = {componente};
    console.log(this.{componente}ToEdit)
    this.showModal = true;
  }

 
  delete{COMPONENTE}({componente}Id: number) {
    if (confirm('Desea eiminar esta {componente}?')) {
      this.{componente}Service.eliminar{COMPONENTE}({componente}Id).subscribe(
        () => {
          this.loadInitial{COMPONENTE}s();
        },
        (error) => {
          console.error('Error al eliminar la {componente}', error);
        }
      );
    }
  }
}
