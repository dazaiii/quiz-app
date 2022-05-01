import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { QuizCategory, QuizDifficulty } from 'src/models/quiz.models';
import { QuizHttpService } from '../quiz-http.service';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss'],
})
export class QuizPageComponent implements OnInit {
  constructor(
    private quizService: QuizService,
    private quizHttpService: QuizHttpService,
    fb: FormBuilder
  ) {
    this.answers = fb.group({
      a: false,
      b: false,
      c: false,
      d: false,
      e: false,
      f: false,
    });
  }

  questions: any[] = [];

  question: any;

  questionNumber: number = 0;

  answers: FormGroup;

  answersValues: any[] = [];

  score: number[] = [];

  displaySubmitButton: boolean = false;

  questionsAmount: number = this.getQuestionsAmount();

  ngOnInit(): void {
    this.quizService.questionsReset();
    this.getQuestions();
    this.answersValuesInit();
  }

  getDifficulty(): QuizDifficulty {
    return this.quizService.getDifficulty();
  }

  getQuestionsAmount(): number {
    return this.quizService.getQuestionsAmount();
  }

  getQuizCategory(): QuizCategory {
    return this.quizService.getQuizCategory();
  }

  getQuestions(): void {
    this.quizHttpService
      .getQuestions(
        this.getQuizCategory(),
        this.getDifficulty(),
        this.getQuestionsAmount()
      )
      .subscribe(
        (response) => {
          this.questions = response;
          this.question = this.questions[0];
          this.quizService.addQuestions(this.questions);
          console.log(this.questions);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  nextQuestion(): void {
    if (this.questionNumber === this.questionsAmount - 1) {
      this.displaySubmitButton = true;
      return;
    }
    this.checkAnswer();
    this.answersValues[this.questionNumber] = this.answers.value;
    this.questionNumber += 1;
    this.answers.reset(this.answersValues[this.questionNumber]);
    this.question = this.questions[this.questionNumber];
  }

  previousQuestion(): void {
    if (this.questionNumber === 0) {
      return;
    }
    this.answersValues[this.questionNumber] = this.answers.value;
    this.questionNumber -= 1;
    this.answers.reset(this.answersValues[this.questionNumber]);
    if (this.questionNumber !== this.questionsAmount - 1) {
      this.displaySubmitButton = false;
    }
    this.score[this.questionNumber] = 0;
    this.question = this.questions[this.questionNumber];
  }

  checkAnswer(): void {
    const correctAnswers = (
      Object.values(this.question.correct_answers) as string[]
    ).map((x) => x.toLowerCase() === 'true');
    const values = Object.values(this.answers.value) as boolean[];
    if (values.every((val, index) => correctAnswers[index] === val)) {
      this.score[this.questionNumber] = 1;
    } else {
      this.score[this.questionNumber] = 0;
    }

    this.quizService.addScore(this.score);
  }

  answersValuesInit(): void {
    for (let i = 0; i < this.questionsAmount; i++) {
      this.answersValues.push({
        a: false,
        b: false,
        c: false,
        d: false,
        e: false,
        f: false,
      });
    }
  }

  submitAnswers(): void {
    this.answersValues[this.questionNumber] = this.answers.value;
    this.quizService.addUserAnswers(this.answersValues);
  }
}
