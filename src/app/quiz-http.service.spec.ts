import { TestBed } from '@angular/core/testing';

import { QuizHttpService } from './quiz-http.service';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { HttpClient } from '@angular/common/http';
import { QuizCategory, QuizDifficulty } from 'src/models/quiz.models';

describe('QuizHttpService', () => {
  let service: QuizHttpService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(QuizHttpService);
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should called getQuestions', () => {
    let category: QuizCategory = QuizCategory.Code;
    let difficulty: QuizDifficulty = QuizDifficulty.Medium;
    let limit = 10;

    spyOn(service, 'getQuestions').and.callThrough();
    service.getQuestions(category, difficulty, limit);
    expect(service.getQuestions).toHaveBeenCalled();
  });
});
