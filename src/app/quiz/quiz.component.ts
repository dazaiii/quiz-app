import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QuizCategory, QuizData } from 'src/models/quiz.models';
import { CommentsSectionComponent } from '../comments-section/comments-section.component';
import { DialogComponent } from '../dialog/dialog.component';

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

  @Output() quizEvent = new EventEmitter<QuizData>();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.componentInstance.quizCategory = this.quiz.category;
    dialogRef.afterClosed().subscribe((result) => {
      return result;
    });
  }

  openCommentsSection(): void {
    const dialogRef = this.dialog.open(CommentsSectionComponent);
    dialogRef.componentInstance.quizCategory = this.quiz.category;
    dialogRef.afterClosed().subscribe((result) => {
      return result;
    });
  }

  onFavoriteClicked(): void {
    this.quiz.favorite === true
      ? (this.quiz.favorite = false)
      : (this.quiz.favorite = true);
    this.quizEvent.emit(this.quiz);
  }
}
