import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QuizCategory, QuizData } from 'src/models/quiz.models';
import { CommentsSectionComponent } from '../comments-section/comments-section.component';
import { DialogComponent } from '../dialog/dialog.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent {
  @Input()
  quiz: QuizData = {
    category: QuizCategory.Linux,
    imageUrl: '',
    favorite: false,
  };

  @Output() quizEvent = new EventEmitter<QuizData>();

  constructor(public dialog: MatDialog) {}

  public openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.componentInstance.quizCategory = this.quiz.category;
    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        return result;
      });
  }

  public openCommentsSection(): void {
    const dialogRef = this.dialog.open(CommentsSectionComponent);
    dialogRef.componentInstance.quizCategory = this.quiz.category;
    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        return result;
      });
  }

  public onFavoriteClicked(): void {
    this.quiz.favorite
      ? (this.quiz.favorite = false)
      : (this.quiz.favorite = true);
    this.quizEvent.emit(this.quiz);
  }
}
