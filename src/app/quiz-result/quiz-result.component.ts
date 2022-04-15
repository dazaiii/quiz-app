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

  questions: any[] = [];

  ngOnInit(): void {
    this.questions = this.getQuestions();
  }

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

  getQuestions(): any[] {
    return this.quizService.getQuestions();
  }

  getUserAnswers(): any[] {
    return this.quizService.getUserAnswers();
  }

  calculatePoints(): number {
    let score = this.getScore();
    let points = 0;
    score.forEach((point) => {
      points += point === 1 ? 1 : 0;
    });
    return points;
  }

  correctAnswers(question: any, questionNumber: number) {
    let userAnswers = this.getUserAnswers();
    let userAnswer = Object.values(userAnswers[questionNumber]);
    const correctAnswers = Object.values(question.correct_answers);
    return Object.values(question.answers).map((val, index) => {
      return {
        answer: val,
        isCorrect: correctAnswers[index],
        isChecked: userAnswer[index],
      };
    });
  }
}
