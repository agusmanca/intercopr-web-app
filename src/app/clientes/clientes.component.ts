import { Component, OnInit } from '@angular/core';
import { Cliente, ClienteService } from '../service/cliente.service';
import { NgxSpinnerService } from "ngx-bootstrap-spinner";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];

  constructor(public clieteService: ClienteService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
      this.spinner.show();
      this.clieteService.getClientes().subscribe((data: Cliente[]) => {
          this.clientes = data;
          this.spinner.hide();
      },
      (err) => {
          Swal.fire('Error - Carga de usuarios', 'Intente nuevamente más tarde.', 'error');
          this.spinner.hide();
      });
  }
}


