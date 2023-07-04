import { Component, OnInit } from '@angular/core';
import { QuizData } from 'src/models/quiz.models';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  private quizData: QuizData[] = [];

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizData = this.quizService.getQuizData();
  }

  public getFavoriteQuizes(): QuizData[] {
    return this.quizData.filter((quiz) => {
      return quiz.favorite === true;
    });
  }

  public addFavorite(sentQuiz: QuizData): void {
    this.quizData.forEach((quiz) => {
      if (quiz.category === sentQuiz.category) {
        quiz.favorite = sentQuiz.favorite;
      }
    });
    this.quizService.addQuizData(this.quizData);
  }
}
