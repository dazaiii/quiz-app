import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { QuizCategory, QuizDifficulty } from 'src/models/quiz.models';
import { QuizHttpService } from '../quiz-http.service';
import { QuizService } from '../quiz.service';
import { Subject, catchError, takeUntil, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss'],
})
export class QuizPageComponent implements OnInit, OnDestroy {
  public questions: any[] = [];
  public question: any;
  public questionNumber: number = 0;
  public answers: FormGroup;
  public answersValues: any[] = [];
  public displaySubmitButton: boolean = false;
  public score: number[] = [];
  public questionsAmount: number = this.getQuestionsAmount();

  private unsub$: Subject<void> = new Subject<void>();

  constructor(
    private quizService: QuizService,
    private quizHttpService: QuizHttpService,
    fb: FormBuilder,
    private snackbar: MatSnackBar
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

  ngOnInit(): void {
    this.quizService.questionsReset();
    this.getQuestions();
    this.answersValuesInit();
  }

  public getDifficulty(): QuizDifficulty {
    return this.quizService.getDifficulty().value;
  }

  public getQuestionsAmount(): number {
    return this.quizService.getQuestionsAmount().value;
  }

  public getQuizCategory(): QuizCategory {
    return this.quizService.getQuizCategory().value;
  }

  private getQuestions(): void {
    this.quizHttpService
      .getQuestions(
        this.getQuizCategory(),
        this.getDifficulty(),
        this.getQuestionsAmount()
      )
      .pipe(
        takeUntil(this.unsub$),
        catchError((error: HttpErrorResponse) => {
          this.snackbar.open(error.message, 'X');
          return throwError(() => error);
        })
      )
      .subscribe((response) => {
        this.questions = response;
        this.question = this.questions[0];
        this.quizService.addQuestions(this.questions);
      });
  }

  public nextQuestion(): void {
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

  public previousQuestion(): void {
    if (!this.questionNumber) {
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

  public checkAnswer(): void {
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

  private answersValuesInit(): void {
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

  public submitAnswers(): void {
    this.answersValues[this.questionNumber] = this.answers.value;
    this.quizService.addUserAnswers(this.answersValues);
  }

  public noAnswerCheck(): boolean {
    const userAnswersValues = Object.values(this.answers.value) as boolean[];
    return userAnswersValues.every((answer) => answer === false);
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.unsubscribe();
  }
}
