import { Component, OnInit } from '@angular/core';
import { Cliente, ClienteService } from '../service/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];

  constructor(public clieteService: ClienteService) { }

  ngOnInit() {
      this.clieteService.getClientes().subscribe((data: Cliente[]) => {
          this.clientes = data;     
      });
  }
}


