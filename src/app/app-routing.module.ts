import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { CrearClienteComponent } from './crear-cliente/crear-cliente.component';
import { IndexComponent } from './index/index.component';
import { PromedioComponent } from './promedio/promedio.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', component: IndexComponent },
  { path: 'home', component: IndexComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'crear-cliente', component: CrearClienteComponent },
  { path: 'promedio', component: PromedioComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
