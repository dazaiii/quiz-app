import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
import { QuizCategory } from 'src/models/quiz.models';
import { DialogComponent } from '../dialog/dialog.component';

import { QuizComponent } from './quiz.component';

describe('QuizComponent', () => {
  let component: QuizComponent;
  let fixture: ComponentFixture<QuizComponent>;
  let dialogSpy: jasmine.Spy;
  let dialogRefSpyObj = jasmine.createSpyObj({
    afterClosed: of({}),
    close: null,
  });
  dialogRefSpyObj.componentInstance = { body: '' }; // attach componentInstance to the spy object...

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizComponent],
      imports: [MatDialogModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dialogSpy = spyOn(TestBed.get(MatDialog), 'open').and.returnValue(
      dialogRefSpyObj
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open dialog', () => {
    component.openDialog();
    expect(dialogSpy).toHaveBeenCalled();
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
  });

  it('should open comments section', () => {
    component.openCommentsSection();
    expect(dialogSpy).toHaveBeenCalled();
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
  });

  it('should add quiz to favorites', () => {
    component.quiz = {
      category: QuizCategory.Linux,
      imageUrl: '',
      favorite: false,
    };
    component.onFavoriteClicked();
    expect(component.quiz.favorite).toBe(true);
  });

  it('should remove quiz from favorites', () => {
    component.quiz = {
      category: QuizCategory.Linux,
      imageUrl: '',
      favorite: true,
    };
    component.onFavoriteClicked();
    expect(component.quiz.favorite).toBe(false);
  });

  it('should emit quiz object', () => {
    spyOn(component.quizEvent, 'emit');
    component.onFavoriteClicked();
    expect(component.quizEvent.emit).toHaveBeenCalled();
  });
});
