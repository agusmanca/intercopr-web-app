import { Component, OnInit } from '@angular/core';
import { ClienteService, Promedio } from '../service/cliente.service';

@Component({
  selector: 'app-promedio',
  templateUrl: './promedio.component.html',
  styleUrls: ['./promedio.component.css']
})
export class PromedioComponent implements OnInit {

  public promedio: Promedio;

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
      this.clienteService.getPromedio().subscribe((data: Promedio) => {
          this.promedio = data;
      });
  }



}
