import { Component, OnInit } from '@angular/core';
import { QuizData } from 'src/models/quiz.models';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizData = this.quizService.getQuizData();
  }

  quizData: QuizData[] = [];

  getFavoriteQuizes(): QuizData[] {
    return this.quizData.filter((quiz) => {
      return quiz.favorite === true;
    });
  }

  addFavorite(sentQuiz: QuizData): void {
    this.quizData.forEach((quiz) => {
      if (quiz.category === sentQuiz.category) {
        quiz.favorite = sentQuiz.favorite;
      }
    });
    this.quizService.addQuizData(this.quizData);
  }
}
