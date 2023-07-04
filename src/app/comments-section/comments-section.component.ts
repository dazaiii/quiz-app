import { Component, OnInit } from '@angular/core';
import { QuizCategory } from 'src/models/quiz.models';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import { CommentData } from 'src/models/comments.models';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-comments-section',
  templateUrl: './comments-section.component.html',
  styleUrls: ['./comments-section.component.scss'],
})
export class CommentsSectionComponent implements OnInit {
  public quizCategory: QuizCategory = QuizCategory.Linux;
  public commentForm: FormGroup;
  public comments: CommentData[] = [];

  constructor(fb: FormBuilder, private quizService: QuizService) {
    this.commentForm = fb.group({
      email: fb.control('', [Validators.required, Validators.email]),
      text: fb.control('', [
        Validators.required,
        Validators.minLength(20),
        Validators.maxLength(255),
        this.noWhitespaceValidator,
      ]),
    });
  }

  ngOnInit(): void {
    this.getComments();
  }

  private getComments(): void {
    const commentsData = this.quizService.getComments(this.quizCategory);
    if (commentsData) {
      this.comments = commentsData;
    }
  }

  get email(): AbstractControl | null {
    return this.commentForm.get('email');
  }

  get text(): AbstractControl | null {
    return this.commentForm.get('text');
  }

  public noWhitespaceValidator(
    control: AbstractControl
  ): { whitespace: boolean } | null {
    return (control.value || '').trim().length === 0
      ? { whitespace: true }
      : null;
  }

  public onSubmit(commentForm: FormGroup): void {
    if (
      !commentForm.value.email ||
      this.email?.hasError('email') ||
      !commentForm.value.text ||
      commentForm.value.text.trim() === ''
    ) {
      return;
    }
    this.comments.push({
      email: commentForm.value.email,
      comment: commentForm.value.text,
    });
    this.quizService.addComments(this.comments, this.quizCategory);
    this.text?.reset('');
    this.text?.setErrors(null);
  }
}
