import { Component, OnInit } from '@angular/core';
import { QuizData } from 'src/models/quiz.models';
import { QuizService } from '../quiz.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public filteredQuizData: QuizData[] = [];
  public searchForm = new FormControl('');
  public quizNotFound: boolean = false;
  public quizData: QuizData[] = [];

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizData = this.quizService.getQuizData();
  }

  public getQuizData(): QuizData[] {
    return this.quizService.getQuizData();
  }

  public addFavorite(sentQuiz: QuizData): void {
    this.quizData.forEach((quiz) => {
      if (quiz.category === sentQuiz.category) {
        quiz.favorite = sentQuiz.favorite;
      }
    });
    this.quizService.addQuizData(this.quizData);
  }

  public filterQuizes(): void {
    this.filteredQuizData = [];
    this.quizData.filter((quiz) => {
      if (
        quiz.category
          .toLowerCase()
          .includes(this.searchForm.value.toLowerCase())
      ) {
        this.filteredQuizData.push(quiz);
      }
    });
    if (this.filteredQuizData.length === 0) {
      this.quizData = [];
    }
  }

  public clearFilter(): void {
    this.filteredQuizData = [];
    this.searchForm.setValue('');
    this.quizData = this.quizService.getQuizData();
  }
}
