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

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.componentInstance.quizCategory = this.quiz.category;
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog result: ${result}');
    });
  }
}
