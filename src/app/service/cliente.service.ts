import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

    private basepath: string = environment.basePath;
    
    constructor(private http: HttpClient) { }

    public getClientes(): Observable<Cliente[]> {
        return this.http.get(this.basepath + '/cliente/listclientes') as Observable<Cliente[]>;
    }

    public getPromedio(): Observable<Promedio> {
        return this.http.get<Promedio>(this.basepath + '/cliente/kpideclientes') as Observable<Promedio>;
    }

    public setCliente(newCliente: Cliente): Observable<Cliente> {

        return this.http.post<Cliente>(this.basepath + '/cliente/creacliente', 
                                            newCliente, 
                                            { 
                                                headers: {
                                                    'Content-Type': 'application/json', 
                                                    'Access-Control-Allow-Origin': '*',
                                                    'Access-Control-Allow-Headers': 'Content-Type',
                                                    'Access-Control-Allow-Methods': 'POST'
                                                } 
                                            }) as Observable<Cliente>;
    }
}

export interface Cliente {
    id?: number,
    nombre?: string,
    apellido?: string,
    edad?: number,
    fechaNacimiento?: Date,
    fechaMuerte?: Date
}

export interface Promedio {
    promedio?: number,
    desvio?: number
}