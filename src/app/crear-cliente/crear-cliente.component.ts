import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {NgbDateStruct, NgbCalendar, NgbDatepicker} from '@ng-bootstrap/ng-bootstrap';
import { Cliente, ClienteService } from '../service/cliente.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-bootstrap-spinner';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent implements OnInit {
  
  public formGroup: FormGroup;

  @ViewChild('dp') 
  dp: NgbDatepicker;
  model: NgbDateStruct;
  date: { year: number, month: number };
  today = this.calendar.getToday();
  
  constructor(private fb: FormBuilder, 
              private calendar: NgbCalendar, 
              private router: Router,
              private spinner: NgxSpinnerService,
              private clienteService: ClienteService) { 

      this.formGroup = this.fb.group({
          nombre: ['', [ Validators.required,  Validators.maxLength(60) ]],
          apellido: ['', [Validators.required, Validators.maxLength(60)]],
          edad: [0, Validators.pattern('[0-9]*')],
          fechaNacimiento: ['']
      });
  }

  ngOnInit(): void { }

  get nombreValidation() {
      return this.formGroup.get('nombre').invalid && this.formGroup.get('nombre').touched;
  }

  get apellidoValidation() {
      return this.formGroup.get('apellido').invalid && this.formGroup.get('apellido').touched;
  }

  public validarFormulario(){  

      if(this.formGroup.valid) {
          Swal.fire({
              title: 'Agregar usuario',
              text: "Desea agregar un nuevo usuario??",
              icon: 'question',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Si'
          }).then((result) => {            
                if(result.isConfirmed) {
                    let newCliente: Cliente = this.crearUsuario();
                    this.spinner.show();
                                        
                    this.clienteService.setCliente(newCliente).subscribe((data: Cliente) => {
                        if(data){
                          Swal.fire('Usuario agregado!', 'El usuario se agrego correctamente.', 'success').then(() => {
                              this.router.navigate(['clientes']);
                          });
                        } else {
                          Swal.fire('Error - proceso cancelado', 'Intente nuevamente mas tarde.', 'error');                        
                        }
                        this.spinner.hide();
                    }, 
                    (err) => {
                        Swal.fire('Error - Usuario no ingresado', 'Intente nuevamente mas tarde.', 'error');
                        this.spinner.hide();
                    });
                }
          });           
      } else {
          Swal.fire('Formulario incorrecto', 'Revise los datos ingresados e intente nuevamente.', 'error');
      }
  }

  private crearUsuario(): Cliente {
      let dateModel: DateModel = this.formGroup.get('fechaNacimiento').value as DateModel;
      let fecha = dateModel.year + '-' + dateModel.month + '-' + dateModel.day;

      let newCliente: Cliente = {
          nombre: this.formGroup.get('nombre').value,
          apellido: this.formGroup.get('apellido').value,
          edad: +this.formGroup.get('edad').value,
          fechaNacimiento: new Date(fecha)
      }
      return newCliente;
  }
}

export interface DateModel {
    day?: number;  ​
    month?: number;​
    year?: number;
}