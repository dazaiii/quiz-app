import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.scss'],
})
export class QuizResultComponent implements OnInit {
  public questions: any[] = [];
  public score: number[] = this.getScore().value;
  public userAnswers: any[] = this.getUserAnswers();

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.questions = this.getQuestions();
  }

  public getCategory() {
    return this.quizService.getQuizCategory().value;
  }

  public getDifficulty() {
    return this.quizService.getDifficulty().value;
  }

  public getScore() {
    return this.quizService.getScore();
  }

  public getQuestionsAmount() {
    return this.quizService.getQuestionsAmount().value;
  }

  public getQuestions(): any[] {
    return this.quizService.getQuestions().value;
  }

  public getUserAnswers(): any[] {
    return this.quizService.getUserAnswers().value;
  }

  public calculatePoints(): number {
    let points = 0;
    this.score.forEach((point) => {
      points += point === 1 ? 1 : 0;
    });
    return points;
  }

  public correctAnswers(question: any, questionNumber: number) {
    let userAnswer = Object.values(this.userAnswers[questionNumber]);
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
