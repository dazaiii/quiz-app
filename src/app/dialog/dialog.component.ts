import { ElementSchemaRegistry } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { QuizCategory, QuizDifficulty } from 'src/models/quiz.models';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  difficulty: QuizDifficulty = QuizDifficulty.Easy;

  questionsAmount: number = 1;

  constructor() {}

  ngOnInit(): void {}

  getDifficulty(event: any) {
    switch (event.value) {
      case 1:
        this.difficulty = QuizDifficulty.Easy;
        break;
      case 2:
        this.difficulty = QuizDifficulty.Medium;
        break;
      case 3:
        this.difficulty = QuizDifficulty.Hard;
        break;
    }
  }

  getQuestionsAmount(event: any) {
    this.questionsAmount = event.value;
  }
}
