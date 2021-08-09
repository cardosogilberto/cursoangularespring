import { Component, OnInit } from '@angular/core';
import { servicoPrestadoBusca } from './servicoPrestadoBusca';
import { ServicoPrestadoService } from '../../servico-prestado.service';

@Component({
  selector: 'app-servico-prestado-lista',
  templateUrl: './servico-prestado-lista.component.html',
  styles: [
  ]
})
export class ServicoPrestadoListaComponent implements OnInit {

  nome: string;
  mes: number;
  meses: number[];
  lista: servicoPrestadoBusca[];
  message: string;

  constructor(
    private service: ServicoPrestadoService
  ) {
    this.meses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  }

  ngOnInit(): void {
  }

  consultar() {
    this.service
      .buscar(this.nome, this.mes)
      .subscribe(response => {
        this.lista = response;
        if (this.lista.length <= 0) {
          this.message = "Nenhum Registro Encontrado.";
        } else {
          this.message = null;
        }
      });
  }

}
