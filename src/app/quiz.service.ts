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
      imageUrl:
        'http://cdn.benchmark.pl/uploads/article/81951/MODERNICON/79c8174b200411f446931eb09ec041d332babfc9.jpg',
      favorite: false,
    },
    {
      category: QuizCategory.Code,
      imageUrl:
        'https://nofluffjobs.com/blog/wp-content/uploads/2017/01/pair-programming.png',
      favorite: false,
    },
    {
      category: QuizCategory.CMS,
      imageUrl:
        'https://www.grupa-tense.pl/wp-content/uploads/2021/03/cms_okladka-1.jpg',
      favorite: false,
    },
    {
      category: QuizCategory.SQL,
      imageUrl:
        'https://infoshareacademy.com/wp-content/uploads/2022/01/1920x1080-Wieczorowy-SQL-1.png',
      favorite: false,
    },
    {
      category: QuizCategory.Docker,
      imageUrl:
        'https://www.droptica.pl/sites/droptica.pl/files/styles/blog_banner_image/public/2018-08/docker_codeception-07.jpg?itok=gMKdUxDN',
      favorite: false,
    },
    {
      category: QuizCategory.DevOps,
      imageUrl:
        'https://www.bssolutions.pl/wp-content/uploads/2020/10/devops.png',
      favorite: false,
    },
    {
      category: QuizCategory.Random,
      imageUrl:
        'https://www.incimages.com/uploaded_files/image/1920x1080/getty_497254373_155996.jpg',
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
