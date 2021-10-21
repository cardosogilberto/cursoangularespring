import { Injectable } from '@angular/core';
import { Cliente } from './clientes/cliente';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'
import { tokenName } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  apiURL: string = environment.apiURLBase + '/api/clientes';

  constructor(private http: HttpClient) { }

  getCliente(): Cliente {
    let cliente: Cliente = new Cliente;
    cliente.nome = 'Fulano de tal';
    cliente.cpf = '888888888';
    return cliente;
  }

  salvar(cliente: Cliente): Observable<Cliente> {
    const tokenString = localStorage.getItem('access_token')
    const token = JSON.parse(tokenString)
    const headers = {
      'Authorization': 'Bearer ' + token.access_token
    }
    return this.http.post<Cliente>(`${this.apiURL}`, cliente, { headers });
  }

  atualizar(cliente: Cliente): Observable<any> {
    return this.http.put<Cliente>(`${this.apiURL}/${cliente.id}`, cliente);
  }

  getClientes(): Observable<Cliente[]> {
    const tokenString = localStorage.getItem('access_token')
    const token = JSON.parse(tokenString)
    const headers = {
      'Authorization': 'Bearer ' + token.access_token
    }
    return this.http.get<Cliente[]>(this.apiURL, { headers });
  }

  getClientesById(id: number): Observable<Cliente> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  deletar(cliente: Cliente): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${cliente.id}`);
  }
}
