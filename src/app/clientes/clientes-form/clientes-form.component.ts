import { Component, OnInit } from '@angular/core';
import { Cliente } from "../cliente"
import { ClientesService } from "../../clientes.service"
import { Router, ActivatedRoute } from '@angular/router';
import { throws } from 'assert';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  cliente: Cliente;
  success: boolean = false;
  errors: string[];
  id: number;

  constructor(
    private service: ClientesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.cliente = new Cliente();
  }

  ngOnInit(): void {
    let params = this.activatedRoute.params
      .subscribe(urlParams => {
        this.id = urlParams['id'];
        if (this.id) {
          this.service
            .getClienteById(this.id)
            .subscribe(
              response => this.cliente = response,
              errors => {
                this.errors = errors.error.errors
              })
        }
      })
  }

  voltarParaListagen() {
    this.router.navigate(['/clientes/lista'])
  }

  onSubmit() {
    if (this.id) {
      this.service
        .atualizar(this.cliente)
        .subscribe(response => {
          this.success = true;
          this.errors = null;
        }, errorResponse => {
          this.errors = ['Erro ao atualizar Cliente.']
        })

    } else {
      this.service
        .salvar(this.cliente)
        .subscribe(response => {
          this.success = true;
          this.errors = null;
          this.cliente = response;
        }, errorResponse => {
          this.success = false;
          this.errors = errorResponse.error.errors;
        }
        )
    }

  }

  voltarParaListagem() {
    this.router.navigate(['/clientes/lista'])
  }

}
