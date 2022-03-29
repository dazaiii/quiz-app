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

  score: number[] = [];

  displaySubmitButton: boolean = false;

  ngOnInit(): void {
    this.getQuestions();
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

  getQuestions() {
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
          console.log(this.questions);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  nextQuestion() {
    if (this.questionNumber === this.getQuestionsAmount() - 1) {
      this.displaySubmitButton = true;
      return;
    }
    this.checkAnswer();
    this.questionNumber += 1;
    this.question = this.questions[this.questionNumber];
  }

  previousQuestion() {
    if (this.questionNumber === 0) {
      return;
    }
    this.questionNumber -= 1;
    this.score[this.questionNumber] = 0;
    this.question = this.questions[this.questionNumber];
  }

  checkAnswer() {
    const correctAnswers = (
      Object.values(this.question.correct_answers) as string[]
    ).map((x) => x.toLowerCase() === 'true');
    const values = Object.values(this.answers.value) as boolean[];
    if (values.every((val, index) => correctAnswers[index] === val)) {
      this.score[this.questionNumber] = 1;
    } else {
      this.score[this.questionNumber] = 0;
    }
    console.log('score: ', this.score);

    this.answers.reset({
      a: false,
      b: false,
      c: false,
      d: false,
      e: false,
      f: false,
    });
    this.quizService.addScore(this.score);
  }
}
