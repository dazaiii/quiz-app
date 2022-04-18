import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuizCategory, QuizDifficulty } from 'src/models/quiz.models';

import { DialogComponent } from './dialog.component';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change difficulty', () => {
    component.difficulty = QuizDifficulty.Hard;
    component.saveDifficulty({ value: 2 });
    expect(component.difficulty).toBe(QuizDifficulty.Medium);
  });

  it('should save questions amount', () => {
    component.questionsAmount = 5;
    component.saveQuestionsAmount({ value: 10 });
    expect(component.questionsAmount).toBe(10);
  });

  it('should set max number of questions for particular categories and difficulties', () => {
    component.difficulty = QuizDifficulty.Hard;
    component.quizCategory = QuizCategory.CMS;
    expect(component.setMaxNumberOfQuestions()).toBe(7);

    component.difficulty = QuizDifficulty.Easy;
    component.quizCategory = QuizCategory.Docker;
    expect(component.setMaxNumberOfQuestions()).toBe(11);

    component.difficulty = QuizDifficulty.Hard;
    expect(component.setMaxNumberOfQuestions()).toBe(11);

    component.difficulty = QuizDifficulty.Easy;
    component.quizCategory = QuizCategory.DevOps;
    expect(component.setMaxNumberOfQuestions()).toBe(5);

    component.difficulty = QuizDifficulty.Hard;
    expect(component.setMaxNumberOfQuestions()).toBe(5);

    component.difficulty = QuizDifficulty.Easy;
    component.quizCategory = QuizCategory.Linux;
    expect(component.setMaxNumberOfQuestions()).toBe(15);
  });
});
