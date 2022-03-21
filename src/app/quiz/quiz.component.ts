import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QuizCategory, QuizData, QuizDifficulty } from 'src/models/quiz.models';
import { DialogComponent } from '../dialog/dialog.component';
import { QuizHttpService } from '../quiz-http.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  @Input()
  quiz: QuizData = {
    category: QuizCategory.Linux,
    imageUrl: '',
    favorite: false,
  };

  constructor(
    private quizHttpService: QuizHttpService,
    public dialog: MatDialog
  ) {}

  quizes: any[] = [];

  ngOnInit(): void {
    this.getQuestions();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog result: ${result}');
    });
  }

  getQuestions() {
    this.quizHttpService
      .getQuestions(QuizCategory.Linux, QuizDifficulty.Hard)
      .subscribe(
        (response) => {
          this.quizes = response;
          console.log(this.quizes);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
