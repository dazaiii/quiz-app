import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { QuizCategory } from 'src/models/quiz.models';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
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
        favorite: false,
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

  it('should change favorite property to true', () => {
    let quiz = {
      category: QuizCategory.Code,
      imageUrl: '',
      favorite: true,
    };
    component.addFavorite(quiz);
    expect(component.quizData[1]).toEqual(quiz);
  });

  it('should change favorite property to false', () => {
    let quiz = {
      category: QuizCategory.CMS,
      imageUrl: '',
      favorite: false,
    };
    component.addFavorite(quiz);
    expect(component.quizData[2]).toEqual(quiz);
  });

  it('should find quizes by category name', () => {
    component.searchForm = new FormControl('linux');
    component.filteredQuizData = [];
    component.filterQuizes();
    expect(component.filteredQuizData).toEqual([
      {
        category: QuizCategory.Linux,
        imageUrl: '',
        favorite: false,
      },
    ]);
  });

  it('should find quizes by a part of category name', () => {
    component.searchForm = new FormControl('lin');
    component.filteredQuizData = [];
    component.filterQuizes();
    expect(component.filteredQuizData).toEqual([
      {
        category: QuizCategory.Linux,
        imageUrl: '',
        favorite: false,
      },
    ]);
  });

  it('should find quizes by a letter', () => {
    component.searchForm = new FormControl('c');
    component.filteredQuizData = [];
    component.filterQuizes();
    expect(component.filteredQuizData).toEqual([
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

  it('should find quizes when its name is written in uppercase', () => {
    component.searchForm = new FormControl('LINUX');
    component.filteredQuizData = [];
    component.filterQuizes();
    expect(component.filteredQuizData).toEqual([
      {
        category: QuizCategory.Linux,
        imageUrl: '',
        favorite: false,
      },
    ]);
  });

  it('should not find a quiz', () => {
    component.searchForm = new FormControl('angular');
    component.filteredQuizData = [];
    component.filterQuizes();
    expect(component.filteredQuizData).toEqual([]);
    expect(component.quizData).toEqual([]);
  });

  it('should clear the filter', () => {
    component.searchForm = new FormControl('linux');
    component.filteredQuizData = [
      {
        category: QuizCategory.Linux,
        imageUrl: '',
        favorite: false,
      },
    ];
    component.clearFilter();
    expect(component.filteredQuizData).toEqual([]);
    expect(component.searchForm.value).toEqual('');
  });
});
