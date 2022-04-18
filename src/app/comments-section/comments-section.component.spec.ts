import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { CommentsSectionComponent } from './comments-section.component';

describe('CommentsSectionComponent', () => {
  let component: CommentsSectionComponent;
  let fixture: ComponentFixture<CommentsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentsSectionComponent],
      imports: [FormsModule, ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.commentForm = new FormGroup({
      email: new FormControl(''),
      text: new FormControl(''),
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('comments should not have multiple whitespaces', () => {
    let text = new FormControl('          ');
    expect(component.noWhitespaceValidator(text)).toEqual({ whitespace: true });

    let text2 = new FormControl('My comment');
    expect(component.noWhitespaceValidator(text2)).toBe(null);
  });

  it('should not submit empty email input', () => {
    let commentForm = new FormGroup({
      email: new FormControl(''),
      text: new FormControl('My comment'),
    });
    component.onSubmit(commentForm);
    expect(component.comments).toEqual([]);
  });

  it('should not submit empty comment input', () => {
    let commentForm = new FormGroup({
      email: new FormControl('email@example.com'),
      text: new FormControl(''),
    });
    component.onSubmit(commentForm);
    expect(component.comments).toEqual([]);
  });

  it('should not submit uncorrect email address', () => {
    let commentForm = new FormGroup({
      email: new FormControl('email'),
      text: new FormControl(''),
    });
    let commentForm2 = new FormGroup({
      email: new FormControl('email@'),
      text: new FormControl(''),
    });
    component.onSubmit(commentForm);
    expect(component.comments).toEqual([]);
    component.onSubmit(commentForm2);
    expect(component.comments).toEqual([]);
  });

  it('should not submit single whitespace as a comment', () => {
    let commentForm = new FormGroup({
      email: new FormControl('email@example.com'),
      text: new FormControl(' '),
    });
    component.onSubmit(commentForm);
    expect(component.comments).toEqual([]);
  });

  it('should submit a comment with correct email and text', () => {
    let commentForm = new FormGroup({
      email: new FormControl('email@example.com'),
      text: new FormControl('My comment'),
    });
    component.onSubmit(commentForm);
    expect(component.comments).toEqual([
      {
        email: 'email@example.com',
        comment: 'My comment',
      },
    ]);
  });
});
