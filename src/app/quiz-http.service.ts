import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { QuizCategory, QuizDifficulty } from 'src/models/quiz.models';

@Injectable({
  providedIn: 'root',
})
export class QuizHttpService {
  private url = 'https://quizapi.io/api/v1/questions';

  private headers = new HttpHeaders()
    .set('content-type', 'application-json')
    .set('X-Api-Key', 'OO5fMhp4JFaJb1gREsJ8Zsbpv8N9HI5Zr3O9NS6A');

  private params = new HttpParams()
    .append('limit', 10)
    .append('category', 'Linux')
    .append('difficulty', 'easy');

  constructor(private http: HttpClient) {}

  getQuestions(
    category: QuizCategory,
    difficulty: QuizDifficulty,
    limit: number
  ): Observable<any> {
    let params;
    if (category === QuizCategory.Random) {
      params = new HttpParams()
        .append('limit', limit)
        .append('difficulty', difficulty);
    } else {
      params = new HttpParams()
        .append('limit', limit)
        .append('category', category)
        .append('difficulty', difficulty);
    }
    return this.http.get(this.url, {
      headers: this.headers,
      params: params,
    });
  }
}
