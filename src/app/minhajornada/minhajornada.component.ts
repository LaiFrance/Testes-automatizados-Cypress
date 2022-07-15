import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-minhajornada',
  templateUrl: './minhajornada.component.html',
  styleUrls: ['./minhajornada.component.css'],
})
export class MinhajornadaComponent {
  todo = [
    'Trybe',
    'Ultima School',
    'Olhar o linkedin',
    'Estudar',
    'Trabalho',
    'Ir no mercado',
    'Ler um Livro',
    'Dormir',
    'Jogar',
    'Pedir Ifood',
'Alura', 
'Udemy',
'Netflix'
  ];

  doin =[
    'Estudar Testes',
    'Ver o Gitlab',
    'Ajustar Tabelas',
    'Fazer um resumo',
    'Elaborar plano de Testes',
    'Olha o Jira',
    'Ver trello',
    'Fazer Projeto'

  ]

  done = [
    'Acordar',
    'Escovar os dentes',
    'Tomar banho',
    'Check e-mail',
    'Desenhar',
    'Ver Série'
  ];

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
    }
  }
}
