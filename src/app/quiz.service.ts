import { Injectable } from '@angular/core';
import { CommentData } from 'src/models/comments.models';
import { QuizCategory, QuizData, QuizDifficulty } from 'src/models/quiz.models';

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

  questions: any[] = [];

  userAnswers: any[] = [];

  comments = new Map<QuizCategory, CommentData[]>();

  quizData: QuizData[] = [
    {
      category: QuizCategory.Linux,
      imageUrl: '/assets/images/linux.jpg',
      favorite: false,
    },
    {
      category: QuizCategory.Code,
      imageUrl: '/assets/images/code.png',
      favorite: false,
    },
    {
      category: QuizCategory.CMS,
      imageUrl: '/assets/images/cms.jpg',
      favorite: false,
    },
    {
      category: QuizCategory.SQL,
      imageUrl: '/assets/images/sql.png',
      favorite: false,
    },
    {
      category: QuizCategory.Docker,
      imageUrl: '/assets/images/docker.png',
      favorite: false,
    },
    {
      category: QuizCategory.DevOps,
      imageUrl: '/assets/images/devops.png',
      favorite: false,
    },
    {
      category: QuizCategory.Random,
      imageUrl: '/assets/images/random.jpg',
      favorite: false,
    },
  ];

  addQuestionsAmount(questionAmount: number) {
    this.questionsAmount = questionAmount;
  }

  getQuestionsAmount(): number {
    return this.questionsAmount;
  }

  addDifficulty(difficulty: QuizDifficulty) {
    this.difficulty = difficulty;
  }

  getDifficulty(): QuizDifficulty {
    return this.difficulty;
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

  getScore() {
    return this.score;
  }

  addQuizCategory(quizCategory: QuizCategory) {
    this.quizCategory = quizCategory;
  }

  getQuizCategory(): QuizCategory {
    return this.quizCategory;
  }

  addQuestions(questions: any[]) {
    this.questions = questions;
  }

  getQuestions(): any[] {
    return this.questions;
  }

  questionsReset() {
    this.questions = [];
  }

  addUserAnswers(userAnswers: any[]) {
    this.userAnswers = userAnswers;
  }

  getUserAnswers(): any[] {
    return this.userAnswers;
  }

  addQuizData(quizData: QuizData[]) {
    this.quizData = quizData;
  }

  getQuizData(): QuizData[] {
    return this.quizData;
  }

  addComments(comments: CommentData[], quizCategory: QuizCategory) {
    this.comments.set(quizCategory, comments);
  }

  getComments(quizCategory: QuizCategory): CommentData[] | undefined {
    return this.comments.get(quizCategory);
  }
}
