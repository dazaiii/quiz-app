import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizResultComponent } from './quiz-result.component';

describe('QuizResultComponent', () => {
  let component: QuizResultComponent;
  let fixture: ComponentFixture<QuizResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizResultComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate points', () => {
    component.score = [1, 0, 0, 0, 1, 1, 1];
    expect(component.calculatePoints()).toBe(4);
  });

  it('should create correct answers object', () => {
    component.userAnswers = [
      {
        a: false,
        b: false,
        c: false,
        d: true,
        e: false,
        f: false,
      },
    ];
    let question: any = {
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
    expect(component.correctAnswers(question, 0)).toEqual([
      {
        answer: 'ls',
        isChecked: false,
        isCorrect: 'false',
      },
      {
        answer: 'delete',
        isChecked: false,
        isCorrect: 'false',
      },
      {
        answer: 'remove',
        isChecked: false,
        isCorrect: 'false',
      },
      {
        answer: 'rmdir',
        isChecked: true,
        isCorrect: 'true',
      },
      {
        answer: null,
        isChecked: false,
        isCorrect: 'false',
      },
      {
        answer: null,
        isChecked: false,
        isCorrect: 'false',
      },
    ]);
  });
});
