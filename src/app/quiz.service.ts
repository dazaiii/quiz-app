import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommentData } from 'src/models/comments.models';
import { QuizCategory, QuizData, QuizDifficulty } from 'src/models/quiz.models';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor() {}

  private questionsAmount = new BehaviorSubject<number>(1);
  private difficulty = new BehaviorSubject<QuizDifficulty>(QuizDifficulty.Easy);
  private quizCategory = new BehaviorSubject<QuizCategory>(QuizCategory.Linux);
  private score = new BehaviorSubject<number[]>([]);
  private questions = new BehaviorSubject<any[]>([]);
  private userAnswers = new BehaviorSubject<any[]>([]);

  private maxQuestionsAmount: number = 15;
  private comments = new Map<QuizCategory, CommentData[]>();

  private quizData: QuizData[] = [
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

  public addQuestionsAmount(questionAmount: number) {
    this.questionsAmount.next(questionAmount);
  }

  public getQuestionsAmount(): BehaviorSubject<number> {
    return this.questionsAmount;
  }

  public addDifficulty(difficulty: QuizDifficulty) {
    this.difficulty.next(difficulty);
  }

  public getDifficulty(): BehaviorSubject<QuizDifficulty> {
    return this.difficulty;
  }

  public addMaxQuestionsAmount(maxQuestionsAmount: number) {
    this.maxQuestionsAmount = maxQuestionsAmount;
    if (this.getQuestionsAmount().value > this.maxQuestionsAmount) {
      this.addQuestionsAmount(this.maxQuestionsAmount);
    }
  }

  public addScore(score: number[]): void {
    this.score.next(score);
  }

  public getScore(): BehaviorSubject<number[]> {
    return this.score;
  }

  public addQuizCategory(quizCategory: QuizCategory) {
    this.quizCategory.next(quizCategory);
  }

  public getQuizCategory(): BehaviorSubject<QuizCategory> {
    return this.quizCategory;
  }

  public addQuestions(questions: any[]): void {
    this.questions.next(questions);
  }

  public getQuestions(): BehaviorSubject<any[]> {
    return this.questions;
  }

  public questionsReset(): void {
    this.addQuestions([]);
  }

  public addUserAnswers(userAnswers: any[]): void {
    this.userAnswers.next(userAnswers);
  }

  public getUserAnswers(): BehaviorSubject<any[]> {
    return this.userAnswers;
  }

  public addQuizData(quizData: QuizData[]) {
    this.quizData = quizData;
  }

  public getQuizData(): QuizData[] {
    return this.quizData;
  }

  public addComments(comments: CommentData[], quizCategory: QuizCategory) {
    this.comments.set(quizCategory, comments);
  }

  public getComments(quizCategory: QuizCategory): CommentData[] | undefined {
    return this.comments.get(quizCategory);
  }
}
