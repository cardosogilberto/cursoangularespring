import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ContatoService } from '../contato.service';
import { Contato } from './contato';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  formulario: FormGroup;
  contatos: Contato[] = [];
  colunas: ['foto', 'id', 'nome', 'email', 'favorito']

  constructor(
    private fb: FormBuilder,
    private service: ContatoService
  ) { }

  ngOnInit(): void {
    this.montarFormulario();
    this.listarContatos();
  }

  montarFormulario() {
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    })
  }

  submit() {
    const formValues = this.formulario.value
    const contato: Contato = new Contato(formValues.nome, formValues.email);
    this.service.save(contato).subscribe(resposta => {
      let lista: Contato[] = [... this.contatos, resposta]
      this.contatos = lista;
    })
  }

  listarContatos() {
    this.service.list().subscribe(response => {
      this.contatos = response;
    })
  }

  favoritar(contato: Contato) {
    this.service.favourite(contato).subscribe(response => {
      contato.favorito = !contato.favorito;
    })
  }

  uploadFoto(event, contato) {
    const files = event.target.files;
    if (files) {
      const foto = files[0];
      const formData: FormData = new FormData();
      formData.append("foto", foto);
      this.service
        .upload(contato, formData)
        .subscribe(response => this.listarContatos());
    }
  }

}
