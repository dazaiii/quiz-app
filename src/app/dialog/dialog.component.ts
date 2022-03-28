import { Component, OnInit } from '@angular/core';
import { QuizCategory, QuizDifficulty } from 'src/models/quiz.models';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  difficulty: QuizDifficulty = QuizDifficulty.Easy;

  questionsAmount: number = 1;

  quizCategory: QuizCategory = QuizCategory.Linux;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {}

  saveDifficulty(event: any) {
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
    this.quizService.addDifficulty(this.difficulty);
  }

  saveQuestionsAmount(event: any) {
    this.questionsAmount = event.value;
    this.quizService.addQuestionsAmount(this.questionsAmount);
  }

  saveQuizCategory() {
    this.quizService.addQuizCategory(this.quizCategory);
  }
}
