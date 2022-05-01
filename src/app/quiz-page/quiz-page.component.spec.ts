import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuizPageComponent } from './quiz-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

describe('QuizPageComponent', () => {
  let component: QuizPageComponent;
  let fixture: ComponentFixture<QuizPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizPageComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.question = {
      id: 1,
      question: 'How to delete a directory in Linux?',
      description: 'delete folder',
      answers: {
        answer_a: 'ls',
        answer_b: 'delete',
        answer_c: 'remove',
        answer_d: 'rmdir',
        answer_e: null,
        answer_f: null,
      },
      multiple_correct_answers: 'false',
      correct_answers: {
        answer_a_correct: 'false',
        answer_b_correct: 'false',
        answer_c_correct: 'false',
        answer_d_correct: 'true',
        answer_e_correct: 'false',
        answer_f_correct: 'false',
      },
      explanation: 'rmdir deletes an empty directory',
      tip: null,
      tags: [],
      category: 'linux',
      difficulty: 'Easy',
    };

    component.questions = [
      {
        id: 1,
        question: 'How to delete a directory in Linux?',
        description: 'delete folder',
        answers: {
          answer_a: 'ls',
          answer_b: 'delete',
          answer_c: 'remove',
          answer_d: 'rmdir',
          answer_e: null,
          answer_f: null,
        },
        multiple_correct_answers: 'false',
        correct_answers: {
          answer_a_correct: 'false',
          answer_b_correct: 'false',
          answer_c_correct: 'false',
          answer_d_correct: 'true',
          answer_e_correct: 'false',
          answer_f_correct: 'false',
        },
        explanation: 'rmdir deletes an empty directory',
        tip: null,
        tags: [],
        category: 'linux',
        difficulty: 'Easy',
      },
      {
        id: 3,
        question: 'How to check the current disk usage on Linux?',
        description: 'check current disk usage',
        answers: {
          answer_a: 'df',
          answer_b: 'usage',
          answer_c: 'uptime',
          answer_d: 'free',
          answer_e: null,
          answer_f: null,
        },
        multiple_correct_answers: 'false',
        correct_answers: {
          answer_a_correct: 'true',
          answer_b_correct: 'false',
          answer_c_correct: 'false',
          answer_d_correct: 'false',
          answer_e_correct: 'false',
          answer_f_correct: 'false',
        },
        explanation: 'df shows you the current disk usage',
        tip: 'df',
        tags: [],
        category: 'uncategorized',
        difficulty: 'easy',
      },
    ];

    component.answers = new FormGroup({
      a: new FormControl(false),
      b: new FormControl(false),
      c: new FormControl(false),
      d: new FormControl(true),
      e: new FormControl(false),
      f: new FormControl(false),
    });

    component.answersValues = [
      {
        a: false,
        b: false,
        c: false,
        d: true,
        e: false,
        f: false,
      },
    ];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change displaySubmitButton to true', () => {
    component.displaySubmitButton = false;
    component.questionNumber = 4;
    component.questionsAmount = 5;
    component.nextQuestion();
    expect(component.displaySubmitButton).toBe(true);
  });

  it('should change displaySubmitButton to false', () => {
    component.displaySubmitButton = true;
    component.questionNumber = 4;
    component.questionsAmount = 5;
    component.previousQuestion();
    expect(component.displaySubmitButton).toBe(false);
  });

  it('should increment question number', () => {
    component.questionNumber = 2;
    component.nextQuestion();
    expect(component.questionNumber).toBe(3);
  });

  it('should decrement question number', () => {
    component.questionNumber = 2;
    component.previousQuestion();
    expect(component.questionNumber).toBe(1);
  });

  it('should not decrement question number when the question is first', () => {
    component.questionNumber = 0;
    component.previousQuestion();
    expect(component.questionNumber).toBe(0);
  });

  it('should go to the next question', () => {
    component.questionNumber = 0;
    component.questionsAmount = 2;
    component.nextQuestion();
    expect(component.questionNumber).toBe(1);
    expect(component.question).toEqual(
      component.questions[component.questionNumber]
    );
  });

  it('should go to the previous question', () => {
    component.questionNumber = 1;
    component.questionsAmount = 2;
    component.previousQuestion();
    expect(component.questionNumber).toBe(0);
    expect(component.question).toEqual(
      component.questions[component.questionNumber]
    );
  });

  it('should remove point when clicking previous', () => {
    component.questionNumber = 2;
    component.score[component.questionNumber] = 1;
    component.previousQuestion();
    expect(component.score[component.questionNumber]).toBe(0);
  });

  it('should put form in the array when clicking next', () => {
    component.questionNumber = 0;
    component.nextQuestion();
    expect(component.answers.value).toEqual(
      component.answersValues[component.questionNumber]
    );
  });

  it('should put form in the array when clicking previous', () => {
    component.questionNumber = 0;
    component.previousQuestion();
    expect(component.answers.value).toEqual(
      component.answersValues[component.questionNumber]
    );
  });

  it('should check if question has no answers', () => {
    component.answers = new FormGroup({
      a: new FormControl(false),
      b: new FormControl(false),
      c: new FormControl(false),
      d: new FormControl(false),
      e: new FormControl(false),
      f: new FormControl(false),
    });
    expect(component.noAnswerCheck()).toEqual(true);

    component.answers = new FormGroup({
      a: new FormControl(false),
      b: new FormControl(false),
      c: new FormControl(true),
      d: new FormControl(false),
      e: new FormControl(false),
      f: new FormControl(false),
    });
    expect(component.noAnswerCheck()).toEqual(false);
  });
});
