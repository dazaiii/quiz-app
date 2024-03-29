import { Component } from '@angular/core';
import { QuizCategory, QuizDifficulty } from 'src/models/quiz.models';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  public difficulty: QuizDifficulty = QuizDifficulty.Easy;
  public questionsAmount: number = 1;
  public quizCategory: QuizCategory = QuizCategory.Linux;

  constructor(private quizService: QuizService) {}

  public saveDifficulty(event: any): void {
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

  public saveQuestionsAmount(event: any): void {
    this.questionsAmount = event.value;
    this.quizService.addQuestionsAmount(this.questionsAmount);
  }

  public saveQuizCategory(): void {
    this.quizService.addQuizCategory(this.quizCategory);
    this.setMaxNumberOfQuestions();
  }

  public setMaxNumberOfQuestions(): number {
    let maxNumberOfQuestions: number;
    if (
      this.quizCategory === QuizCategory.CMS &&
      this.difficulty === QuizDifficulty.Hard
    ) {
      maxNumberOfQuestions = 7;
    } else if (
      this.quizCategory === QuizCategory.Docker &&
      (this.difficulty === QuizDifficulty.Easy ||
        this.difficulty === QuizDifficulty.Hard)
    ) {
      maxNumberOfQuestions = 11;
    } else if (
      this.quizCategory === QuizCategory.DevOps &&
      (this.difficulty === QuizDifficulty.Easy ||
        this.difficulty === QuizDifficulty.Hard)
    ) {
      maxNumberOfQuestions = 5;
    } else {
      maxNumberOfQuestions = 15;
    }
    this.quizService.addMaxQuestionsAmount(maxNumberOfQuestions);
    return maxNumberOfQuestions;
  }
}
