import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuizCategory } from 'src/models/quiz.models';

import { FavoritesComponent } from './favorites.component';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoritesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.quizData = [
      {
        category: QuizCategory.Linux,
        imageUrl: '',
        favorite: false,
      },
      {
        category: QuizCategory.Code,
        imageUrl: '',
        favorite: true,
      },
      {
        category: QuizCategory.CMS,
        imageUrl: '',
        favorite: true,
      },
    ];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get favorite quizes', () => {
    expect(component.getFavoriteQuizes()).toEqual([
      {
        category: QuizCategory.Code,
        imageUrl: '',
        favorite: true,
      },
      {
        category: QuizCategory.CMS,
        imageUrl: '',
        favorite: true,
      },
    ]);
  });

  it('should set favorite property to true', () => {
    expect(
      component.addFavorite({
        category: QuizCategory.Linux,
        imageUrl: '',
        favorite: true,
      })
    );
    expect(component.quizData).toEqual([
      {
        category: QuizCategory.Linux,
        imageUrl: '',
        favorite: true,
      },
      {
        category: QuizCategory.Code,
        imageUrl: '',
        favorite: true,
      },
      {
        category: QuizCategory.CMS,
        imageUrl: '',
        favorite: true,
      },
    ]);
  });

  it('should set favorite property to false', () => {
    expect(
      component.addFavorite({
        category: QuizCategory.Code,
        imageUrl: '',
        favorite: false,
      })
    );
    expect(component.quizData).toEqual([
      {
        category: QuizCategory.Linux,
        imageUrl: '',
        favorite: false,
      },
      {
        category: QuizCategory.Code,
        imageUrl: '',
        favorite: false,
      },
      {
        category: QuizCategory.CMS,
        imageUrl: '',
        favorite: true,
      },
    ]);
  });
});
