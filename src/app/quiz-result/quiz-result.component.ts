import { Component, OnInit } from '@angular/core';
import { QuizCategory, QuizDifficulty } from 'src/models/quiz.models';
import { QuizService } from '../quiz.service';
import { QuizComponent } from '../quiz/quiz.component';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.scss'],
})
export class QuizResultComponent implements OnInit {
  constructor(private quizService: QuizService) {}

  ngOnInit(): void {}

  getCategory() {
    return this.quizService.getQuizCategory();
  }

  getDifficulty() {
    return this.quizService.getDifficulty();
  }

  getScore() {
    return this.quizService.getScore();
  }

  getQuestionsAmount() {
    return this.quizService.getQuestionsAmount();
  }

  calculatePoints(): number {
    let score = this.getScore();
    let points = 0;
    score.forEach((point) => {
      points += point === 1 ? 1 : 0;
    });
    return points;
  }
}
