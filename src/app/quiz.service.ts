import { Injectable } from '@angular/core';
import { QuizCategory, QuizDifficulty } from 'src/models/quiz.models';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor() {}

  questionsAmount: number = 1;

  difficulty: QuizDifficulty = QuizDifficulty.Easy;

  quizCategory: QuizCategory = QuizCategory.Linux;

  maxQuestionsAmount: number = 15;

  score: number[] = [];

  points: number = 0;

  addQuestionsAmount(questionAmount: number) {
    this.questionsAmount = questionAmount;
  }

  getQuestionsAmount(): number {
    return this.questionsAmount;
  }

  addDifficulty(difficulty: QuizDifficulty) {
    this.difficulty = difficulty;
  }

  addMaxQuestionsAmount(maxQuestionsAmount: number) {
    this.maxQuestionsAmount = maxQuestionsAmount;
    if (this.questionsAmount > this.maxQuestionsAmount) {
      this.questionsAmount = this.maxQuestionsAmount;
    }
  }

  addScore(score: number[]) {
    this.score = score;
  }

  getDifficulty(): QuizDifficulty {
    return this.difficulty;
  }

  addQuizCategory(quizCategory: QuizCategory) {
    this.quizCategory = quizCategory;
  }

  getQuizCategory(): QuizCategory {
    return this.quizCategory;
  }

  getScore() {
    return this.score;
  }
}