
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  nome!: string;
  senha!: number;
  formulario: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    // **************************************************
    // Abaixo utilizamos o formBuilder para construir
    // vários FormControls que fazem parte do formulário.
    // Cada FormControl valida um input do formulário
    // **************************************************
    this.formulario = this.formBuilder.group({
    nome: ['', Validators.required],
        senha: ['', Validators.required],
        email: ['', [
            Validators.required,
            Validators.email
      ]]
    });
  }

  login() {
    if (!this.formulario.valid) {
      console.log("Formulário inválido");
      return;
    }
    console.log("Formulário válido", this.formulario.value);
  }
}